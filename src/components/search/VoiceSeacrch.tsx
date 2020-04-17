import React, {useState} from "react"
import MicIcon from "@material-ui/icons/Mic"
import {API} from "../../api"
import {SearchProps} from "./Search"

interface IProps extends SearchProps {
    setQuery: (query: string) => void
    onQuery: () => void
}

const VoiceSearch: React.FC<IProps> = ({toggleIsLoading, setQuery, onQuery}) => {

    const [isRecording, setIsRecording] = useState(false)
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)

    const clickHandler = () => {
        if (isRecording) {
            return mediaRecorder?.stop()
        }

        navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => onRecord(stream))
            .catch(e => console.log(e))

        const onRecord = (stream: MediaStream) => {
            const recorder = new MediaRecorder(stream)
            setMediaRecorder(recorder)

            recorder.start()

            recorder.onstart = () => {
                setIsRecording(true)
            }

            recorder.onstop = () => {
                setIsRecording(false)
            }

            recorder.ondataavailable = async (e) => {
                toggleIsLoading()
                const audio = new File([e.data], "audio.webm")
                const data = await API.speechToText(audio)
                toggleIsLoading()
                setQuery(data)
                onQuery()
            }
        }
    }

    return (
        <div className={isRecording ? "micro" : ""}>
            <MicIcon className={isRecording ? "icon recorder" : "icon"} fontSize="large" onClick={clickHandler}/>
            {isRecording && <span>Recording ...</span>}
        </div>
    )
}

export default VoiceSearch