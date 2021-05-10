import Player from "xgplayer/dist/core_player";
import tzzb from "../video/v.mp4"
import "./xg.scss"
import progress from "xgplayer/dist/controls/progress";
import volume from "xgplayer/dist/controls/volume";
import time from "xgplayer/dist/controls/time";
import replay from "xgplayer/dist/controls/replay";
import poster from "xgplayer/dist/controls/poster";
import play from "xgplayer/dist/controls/play";
import fullscreen from "xgplayer/dist/controls/fullscreen";

import flex from "xgplayer/dist/controls/flex";


import posterPng from "../video/poster.jpg"
import React from "react";

class XGPlayer extends React.Component {

    componentDidMount() {
        this.player = new Player({
            id            : 'video',
            url           : tzzb,
            fitVideoSize  : "fixHeight",
            width         : "100vw",
            height        : "100vh",
            poster        : posterPng,
            autoplay      : true,
            controls      : true,
            lang          : "zh-cn",
            playsinline   : true,
            ignores       : ['loading'],
            controlPlugins: [
                volume,
                progress,
                time,
                replay,
                poster,
                play,
                flex,
                fullscreen,
            ]
        });

        this.player.on("ended", () => {
            console.log("onEnded")
        })
        this.player.on("timeupdate", () => {
            console.log("timeupdate:" + this.player.currentTime)
        })
    }

    componentWillUnmount() {
        this.player.destroy(true)
    }

    render() {
        return (
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",background:posterPng,backgroundRepeat:"no-repeat"}}>
                <div id={"video"}/>
                <div className={"xgplayer-enter"}/>
            </div>
        )
    }
}

export default XGPlayer
