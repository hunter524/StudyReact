import React from "react";
import poster from "../video/poster.jpg";
import videoMp4 from "../video/v.mp4";

class VideoPlay extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef()
    }

    onPlayEnded() {
        console.log("play ended")
    }

    componentDidMount() {
        this.intervalId = setInterval(()=>{
            let playedTime = this.videoRef.current.currentTime;
            console.log("played time:"+playedTime)
        },1000)

        setTimeout(()=>{if (this.videoRef.current){
            this.videoRef.current.play()
        }})
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {
        return (
            <div style={{width: "100vw", height: "100vh",overflow: "hidden"}}>
                <video style={{width: "100vw", height: "100vh", overflow: "hidden"}}
                       ref={this.videoRef}
                       controls={true}
                       playsInline={true}
                       autoPlay={true}
                       poster={poster}
                       onEnded={this.onPlayEnded.bind(this)}>
                    <source src={videoMp4} type={"video/mp4"}/>
                </video>
            </div>
        )
    }
}

export default VideoPlay
