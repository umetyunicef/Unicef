import "aframe";
import { Scene, Entity } from "aframe-react";
import React, { useEffect, useState } from 'react';

function VideoManager({ setIsVideoManager, setIsQuestionManager }) {

    const [isVideoStarted, setIsVideoStarted] = useState(false);


    useEffect(() => {
        console.log("isVideoStarted", isVideoStarted);
    }, [isVideoStarted])


    const [isVRMode, setIsVRMode] = useState(false);

    useEffect(() => {
        const enterVRHandler = () => {
            console.log("VR Mode Enabled");

            setIsVRMode(true);
        };

        const exitVRHandler = () => {

            console.log("VR Mode Disabled");
            setIsVRMode(false);
        };

        window.addEventListener("enter-vr", enterVRHandler);
        window.addEventListener("exit-vr", exitVRHandler);

    }, []);

    const handleVideoComplete = () => {
        console.log("Video Ended");

        const videoBtn = document.querySelector('#videoControls');
        videoBtn.setAttribute('visible', false);
        setIsVideoStarted(false);

        // update states here
        setIsVideoManager(false);
        setIsQuestionManager(true);

    };


    return (
        <>
            <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <div id="AFrameScene" style={{ height: window.innerHeight, width: window.innerWidth, border: '1px solid black' }}>


                    <Scene vr-mode-ui="enabled:true" embedded >

                        <a-assets>


                            <img id="play" src="https://umety-dev.s3.amazonaws.com/unicef/play.png" alt='playImg'></img>
                            <img id="pause" src="https://umety-dev.s3.amazonaws.com/unicef/pause.png" alt='pauseImg'></img>

                            <video id="myVideo" src="https://s3-dev.umety.com/unicef/Unicef.mp4"> </video>

                        </a-assets>

                        <Entity id="camera1" primitive="a-camera">

                            <a-entity cursor="fuse: false;"
                                position="0 0 -1"
                                geometry="primitive: ring"
                                material="color: white; shader: flat"
                                scale={isVRMode ? "0.01 0.01 0.01" : "0 0 0"}
                                raycaster="objects: .raycastable"
                            />
                        </Entity>

                        <Entity id="camera2" primitive="a-camera" cursor="rayOrigin: mouse;"></Entity>

                        <Entity primitive="a-image" id="videoControls" className="raycastable" src={isVideoStarted ? "#pause" : "#play"} position="0 0.5 -2" scale=".3 .3 .3"
                            events={{
                                click: () => {

                                    console.log("clicked");
                                    const myVideo = document.querySelector('#myVideo');
                                    const videoControls = document.querySelector('#videoControls');


                                    console.log("Play pause btn clicked");
                                    if (myVideo.paused) {

                                        setIsVideoStarted(true);
                                        myVideo.play();
                                        videoControls.setAttribute('src', '#pause');
                                    } else {

                                        setIsVideoStarted(false);
                                        myVideo.pause();
                                        videoControls.setAttribute('src', '#play');
                                    }



                                    // Add event listener for video completion
                                    myVideo.addEventListener('ended', handleVideoComplete);

                                }
                            }}
                        ></Entity>

                        <Entity primitive="a-videosphere" src="#myVideo" rotation="0 -90 0"></Entity>
                    </Scene>
                </div>

            </div>

        </>
    );
}

export default VideoManager;