import axios from "axios"

const ax = axios.create({
    baseURL: "http://localhost:3003"
})

export const API = {
    speechToText(audio: File) {
        const formData = new FormData()
        formData.append("audio", audio)

        return ax.post("/speech", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(res => res.data.message)
    }
}