import "aframe";
import { Scene, Entity } from "aframe-react";
import React, { useState, useEffect } from 'react';

export default function Intro({ setIsIntro, setIsVideoManager }) {

    const [isLearningOutcomes, setLearningOutcomes] = useState(false);
    const [isBegin, setIsBegin] = useState(false);

    const [isVRMode, setIsVRMode] = useState(false);

    useEffect(() => {
        const enterVRHandler = () => {
            console.log("VR Mode Enabled");

            // const entity = document.getElementById('camera');
            // entity.removeAttribute('cursor');
            // console.log("entity", entity);

            setIsVRMode(true);
        };

        const exitVRHandler = () => {

            console.log("VR Mode Disabled");
            setIsVRMode(false);
        };

        window.addEventListener("enter-vr", enterVRHandler);
        window.addEventListener("exit-vr", exitVRHandler);

        // return () => {
        //     window.removeEventListener("enter-vr", enterVRHandler);
        //     window.removeEventListener("exit-vr", exitVRHandler);
        // };

    }, []);


    const handleStart = () => {
        console.log("Start btn clicked");
        setLearningOutcomes(true);
    }

    const handleNext = () => {
        console.log("Next btn clicked");
        setLearningOutcomes(false);
        setIsBegin(true);
    }

    const handleBegin = () => {
        console.log("Begin btn clicked");

        setIsIntro(false);
        setIsVideoManager(true);
    }

    return (
        <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <div id="AFrameScene" style={{ height: window.innerHeight, width: window.innerWidth, border: '1px solid black' }}>


                <Scene vr-mode-ui="enabled:true" embedded >
                    <a-assets>
                        <a-image id="skyImg" src="https://umety-dev.s3.amazonaws.com/unicef/skyImg.jpg" />
                        <a-image id="tempon" src="https://umety-dev.s3.amazonaws.com/unicef/Tampon.png" />
                        <a-image id="sanitary" src="https://umety-dev.s3.amazonaws.com/unicef/Sanitary Pad.png" />
                        <a-image id="menstrual" src="https://umety-dev.s3.amazonaws.com/unicef/Menstrual_Cup.png" />
                        <a-image id="egg" src="https://umety-dev.s3.amazonaws.com/unicef/Egg.png" />
                        <a-image id="uterus" src="https://umety-dev.s3.amazonaws.com/unicef/Uterus.png" />
                    </a-assets>

                    <Entity id="camera1" primitive="a-camera" cursor="rayOrigin: mouse;"></Entity>
                    <Entity id="camera2" primitive="a-camera">

                        <a-entity cursor="fuse: false;"
                            position="0 0 -1"
                            geometry="primitive: ring"
                            material="color: white; shader: flat"
                            scale={isVRMode ? "0.01 0.01 0.01" : "0 0 0"}
                            raycaster="objects: .raycastable"
                        />
                    </Entity>


                    {!isLearningOutcomes && !isBegin ?

                        (
                            <Entity id="IntroContainer" position="0 1.7 -1.5">
                                <Entity id="IntroContainerBgPanel" geometry="primitive: plane; width: 1.8; height: 1.2"
                                    material="color: #FFFFFF; opacity:1"
                                    position="0 0 0">
                                    <Entity primitive="a-image" id="sanitary" src="#sanitary" position="-0.66 0.16 0.1" scale=".5 .4 .3" />
                                    <Entity primitive="a-image" id="menstrual" src="#menstrual" position="-0.22 0.3 0.1" scale=".5 .4 .3" />
                                    <Entity primitive="a-image" id="uterus" src="#uterus" position="0.22 0.3 0.1" scale=".5 .4 .3" />
                                    <Entity primitive="a-image" id="temponImage" src="#tempon" position="0.66 0.16 0.1" scale=".5 .4 .3" />

                                    <Entity
                                        id="IntroTextDiv"
                                        position="0 -0.2 0.1"
                                        text={{ color: 'black', align: 'center', value: "Get ready to embark on an adventurous journey with your period pals to explore menstrual health and hygiene!", width: 1.6 }}
                                        scale="1 0.5 0.5"
                                    ></Entity>

                                    <Entity id="StartBtnBgPanel"
                                        geometry="primitive: plane; width: 0.5; height: 0.15"
                                        material={{ color: 'royalblue' }}
                                        position="0 -0.4 0.1"
                                        className="raycastable"
                                        events={{
                                            click: () => handleStart()
                                        }}
                                    >

                                        <Entity id="StartBtnDiv"
                                            text={{ value: 'START', align: 'center' }}
                                            position="0 0 0"
                                        />
                                    </Entity>

                                </Entity>

                            </Entity>) :

                        !isBegin && isLearningOutcomes ?
                            (
                                <Entity id="LearningOutcomesContainer" position="0 1.7 -1.5">
                                    <Entity id="LearningOutcomesContainerBgPanel" geometry="primitive: plane; width: 2; height: 1.5"
                                        material="color: #FFFFFF; opacity:1"
                                        position="0 0 0">


                                        {/* input images here */}

                                        <Entity
                                            id="IntroTextDiv"
                                            position="0 0.55 0.1"
                                            text={{ color: 'black', align: 'center', value: "Learning OutComes", width: 1.5 }}
                                            scale="1 1 1"
                                        ></Entity>
                                        <Entity
                                            id="IntroTextDiv"
                                            position="-0.08 0.12 0.1"
                                            text={{
                                                color: 'black', align: 'left', value: "Knowledge:\n"
                                                    + "Understanding menstruation: \n"
                                                    + "Exploring menstrual hygiene practices and their importance: \n\n"
                                                    + "Skills:\n"
                                                    + "Learning how to use different menstrual products \n\n"
                                                    + "Values: \n"
                                                    + "Promoting understanding and acceptance of menstruation as a natural process\n"
                                                    + "Fostering empathy and compassion towards girls experiencing menstruation\n"
                                                    + "Encouraging confidence, empowerment, and reduced shame when managing periods", width: 1.5
                                            }}
                                            scale="1 0.6 0.6"
                                        ></Entity>

                                        <Entity id="NextBtnBgPanel"
                                            geometry="primitive: plane; width: 0.5; height: 0.15"
                                            material={{ color: 'royalblue' }}
                                            position="0 -0.55 0.1"
                                            className="raycastable"
                                            events={{
                                                click: handleNext
                                            }}
                                        >

                                            <Entity id="NextBtnDiv"
                                                text={{ value: 'NEXT', align: 'center' }}
                                                position="0 0 0"
                                            />
                                        </Entity>
                                    </Entity>
                                </Entity>

                            ) : isBegin ?
                                (
                                    <Entity id="LearningOutcomesContainer" position="0 1.7 -1.5">
                                        <Entity id="LearningOutcomesContainerBgPanel" geometry="primitive: plane; width: 2; height: 1.5"
                                            material="color: #FFFFFF; opacity:1"
                                            position="0 0 0">


                                            {/* input images here */}

                                            <Entity
                                                id="IntroTextDiv"
                                                position="0 0.55 0.1"
                                                text={{ color: 'black', align: 'center', value: "", width: 1.5 }}
                                                scale="1 1 1"
                                            ></Entity>
                                            <Entity
                                                id="IntroTextDiv"
                                                position="-0.08 0.12 0.1"
                                                text={{
                                                    color: 'black', align: 'left', value: "Join this enlightening adventure with Mary, your virtual companion, as we explore the importance of menstrual health and hygiene. Together, we'll help you gain valuable understanding about this essential aspect of women's health, fostering a positive and informed approach to periods."
                                                    , width: 1.5
                                                }}
                                                scale="1 0.6 0.6"
                                            ></Entity>

                                            <Entity id="NextBtnBgPanel"
                                                geometry="primitive: plane; width: 0.5; height: 0.15"
                                                material={{ color: 'royalblue' }}
                                                position="0 -0.55 0.1"
                                                className="raycastable"
                                                events={{
                                                    click: handleBegin
                                                }}
                                            >

                                                <Entity id="NextBtnDiv"
                                                    text={{ value: 'LET\'S BEGIN', align: 'center' }}
                                                    position="0 0 0"
                                                />
                                            </Entity>
                                        </Entity>
                                    </Entity>
                                ) : null


                    };

                    <Entity primitive="a-sky" src="#skyImg" />
                </Scene>
            </div>

        </div>
    )
}
