import React, {useState, ChangeEvent, useRef, useCallback, useEffect} from "react"
import SearchIcon from "@material-ui/icons/Search"
import VoiceSearch from "./VoiceSeacrch"

import {BootstrapInput} from "./bootstrapInput"
import {InputAdornment} from "@material-ui/core"

export interface SearchProps {
    toggleIsLoading: () => void
}

const Search: React.FC<SearchProps> = ({toggleIsLoading}) => {

    const [query, setQuery] = useState("")
    const ref = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown, false)

        return () => {
            document.removeEventListener("keydown", onKeyDown, false)
        }
    }, [])

    const onQuery = () => {
        if (ref.current) {
            ref.current.click()
            setQuery("")
        }
    }

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.code === "Enter") onQuery()
    }, [])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value)
    }

    return (
        <div className="inputContainer">
            <BootstrapInput startAdornment={
                <InputAdornment position="end">
                    <VoiceSearch toggleIsLoading={toggleIsLoading} setQuery={setQuery} onQuery={onQuery}/>
                </InputAdornment>
            } endAdornment={
                <InputAdornment position="end">
                    <a href={`https://www.google.com/search?q=${query}&oq=${query}&aqs=chrome.0.69i59j46j0j46j0l2j46j0.1016j0j7&sourceid=chrome&ie=UTF-8`}
                       ref={ref}>
                        <SearchIcon className="icon" fontSize="large" onClick={() => setQuery("")}/>
                    </a>
                </InputAdornment>
            } defaultValue={query} onChange={onChange} autoFocus/>
        </div>
    )
}

export default Search