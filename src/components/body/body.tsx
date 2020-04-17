import React, {useState} from 'react'
import Menu from "../menu/menu"

import FavoriteSites from "../favoriteSites/favoriteSites"
import Search from '../search/Search'

import svg from "../../assets/anim.svg"
import {App, doodleServices} from "../../data/data"
import {LinearProgress} from "@material-ui/core"

const Body = () => {

    const [isLoading, setIsLoading] = useState(false)

    const toggleIsLoading = () => {
        setIsLoading(!isLoading)
    }

    const mapApps = (apps: App[]) => <>
        {apps.map(a => <a href={a.link} key={Math.random()}>
            <img src={a.img} alt={a.title}/>
            <span>{a.title}</span>
        </a>)}
    </>

    return (
        <div className="container">
            {isLoading && <LinearProgress/>}
            <Menu>
                {mapApps(doodleServices)}
            </Menu>
            <div className="main">
                <div className="logo">
                    <h1>Doodle</h1>
                    <img src={svg} alt="animation"/>
                </div>

                <Search toggleIsLoading={toggleIsLoading}/>

                <FavoriteSites mapApps={mapApps}/>
            </div>

            <div className="author">
                <h4>Author: Pantus Oleg</h4>
            </div>
        </div>
    )
}

export default Body