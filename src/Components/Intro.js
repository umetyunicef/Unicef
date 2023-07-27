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
        // setIsQuestionManager(true);
    }

    return (
        <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <div id="AFrameScene" style={{ height: window.innerHeight, width: window.innerWidth, border: '1px solid black' }}>


                <Scene vr-mode-ui="enabled:true" embedded >

                    <a-assets>
                        <a-image id="skyImg" src="https://umety-dev.s3.amazonaws.com/unicef/skyImg.jpg" />
                        <a-image id="tempon" src="https://umety-dev.s3.amazonaws.com/unicef/Tampon.png" />
                        <a-image id="sanitary" src="https://umety-dev.s3.amazonaws.com/unicef/Sanitary-Pad.png" />
                        <a-image id="menstrual" src="https://umety-dev.s3.amazonaws.com/unicef/Menstrual_Cup.png" />
                        <a-image id="uterus" src="https://umety-dev.s3.amazonaws.com/unicef/Egg_Uterus.png" />
                    </a-assets>
                    <Entity primitive="a-sky" src="#skyImg" />


                    <Entity id="camera1" primitive="a-camera">
                        <a-entity cursor="rayOrigin: mouse;"
                            raycaster="objects: .raycastable"
                        />
                    </Entity>
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
                                    material="color: #000000; opacity:0.8"
                                    position="0 0 0">
                                    {/* <Entity primitive="a-image" id="sanitary" src="#sanitary" position="-0.66 0.16 0.1" scale=".5 .4 .3" />
                                    <Entity primitive="a-image" id="menstrual" src="#menstrual" position="-0.22 0.3 0.1" scale=".5 .4 .3" />
                                    <Entity primitive="a-image" id="uterus" src="#uterus" position="0.22 0.3 0.1" scale=".5 .4 .3" />
                                    <Entity primitive="a-image" id="temponImage" src="#tempon" position="0.66 0.16 0.1" scale=".5 .4 .3" /> */}



                                </Entity>
                                <Entity primitive="a-image" id="sanitary" src="#sanitary" position="-0.66 0.16 0.1" scale=".5 .4 .3" />
                                <Entity primitive="a-image" id="menstrual" src="#menstrual" position="-0.22 0.3 0.1" scale=".5 .4 .3" />
                                <Entity primitive="a-image" id="uterus" src="#uterus" position="0.22 0.3 0.1" scale=".5 .4 .3" />
                                <Entity primitive="a-image" id="temponImage" src="#tempon" position="0.66 0.16 0.1" scale=".5 .4 .3" />
                                <Entity
                                    id="IntroTextDiv"
                                    position="0 -0.20 0.1"
                                    text={{
                                        color: 'white', align: 'center', value: "Get ready to embark on an adventurous journey with your period pals to explore menstrual health and hygiene!",
                                        width: 1.2,
                                        lineHeight: 55,
                                        wrapCount: 50
                                    }}
                                    scale="1 1 1"
                                ></Entity>

                                <Entity id="StartBtnBgPanel"
                                    geometry="primitive: plane; width: 0.5; height: 0.15"
                                    material={{ color: 'royalblue' }}
                                    position="0 -0.45 0.1"
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


                            </Entity>) :

                        !isBegin && isLearningOutcomes ?
                            (
                                <Entity id="LearningOutcomesContainer" position="0 1.7 -1.5">

                                    <Entity id="LearningOutcomesDiv" position="0 0.6 0">
                                        <Entity id="LearningOutcomesBgPanel" geometry="primitive: plane; width: 3.4; height: 0.2"
                                            material="color: #000000; opacity:0.8"
                                            position="0 0 0" />
                                        <Entity
                                            id="LearningOutcomesHeadingText"
                                            position="0 0 0"
                                            text={{ color: 'white', align: 'center', value: "LEARNING OUTCOMES", width: 1, height: 1, wrapCount: 20 }}
                                            scale="1 1 1"
                                        ></Entity>
                                    </Entity>


                                    <Entity id="knowledgeDiv" position="-1.2 0 0">

                                        <Entity id="knowledgeDivBgPanel" geometry="primitive: plane; width: 1; height: 0.7"
                                            material="color: #000000; opacity:0.8"
                                            position="0 0 0" />

                                        <Entity
                                            id="KnowledgeHeadingTextDiv"
                                            position="0 0.25 0"
                                            text={{ color: 'white', align: 'center', value: "Knowledge", width: 1, height: 1, lineHeight: 55, wrapCount: 25 }}
                                            scale="1 1 1"
                                        ></Entity>

                                        <Entity
                                            id="KnowledgeContentTextDiv"
                                            position="0.08 0.065 0"
                                            text={{
                                                color: 'white', align: 'left',
                                                value:
                                                    "Understanding menstruation \n" +
                                                    "Exploring menstrual hygiene practices and \n their importance", width: 1, height: 1,
                                                lineHeight: 60,
                                                wrapCount: 40
                                            }}
                                            scale="1 1 1"
                                        ></Entity>
                                        <Entity
                                            id="KnowledgeSpaceDiv1"
                                            position="0.05 0.135 0"
                                            text={{
                                                color: 'white', align: 'left',
                                                value: "-", width: 1, height: 1,
                                                wrapCount: 40

                                            }}
                                            scale="1 1 1"
                                        ></Entity>
                                        <Entity
                                            id="KnowledgeSpaceDiv2"
                                            position="0.05 0.065 0"
                                            text={{
                                                color: 'white', align: 'left',
                                                value: "-", width: 1, height: 1,
                                                wrapCount: 40

                                            }}
                                            scale="1 1 1"
                                        ></Entity>

                                    </Entity>


                                    <Entity id="SkillsDiv" position="0 0 0">

                                        <Entity id="SkillsDivBgPanel" geometry="primitive: plane; width: 1; height: 0.7"
                                            material="color: #000000; opacity:0.8"
                                            position="0 0 0" />

                                        <Entity
                                            id="SkillsHeadingTextDiv"
                                            position="0 0.25 0"
                                            text={{ color: 'white', align: 'center', value: "Skills", width: 1, height: 1, lineHeight: 55, wrapCount: 25 }}
                                            scale="1 1 1"
                                        ></Entity>

                                        <Entity
                                            id="SkillsContentTextDiv"
                                            position="0.08 0.08 0"
                                            text={{
                                                color: 'white', align: 'left',
                                                value:
                                                    "Learning how to use different \n menstrual products", width: 1, height: 1,
                                                lineHeight: 60,
                                                wrapCount: 40
                                            }}
                                            scale="1 1 1"
                                        ></Entity>
                                        <Entity
                                            id="SkillsSpaceDiv1"
                                            position="0.05 0.115 0"
                                            text={{
                                                color: 'white', align: 'left',
                                                value: "-", width: 1, height: 1,
                                                wrapCount: 40

                                            }}
                                            scale="1 1 1"
                                        ></Entity>

                                    </Entity>


                                    <Entity id="ValuesDiv" position="1.2 0 0">

                                        <Entity id="knowledgeDivBgPanel" geometry="primitive: plane; width: 1; height: 0.7"
                                            material="color: #000000; opacity:0.8"
                                            position="0 0 0" />

                                        <Entity
                                            id="ValuesHeadingTextDiv"
                                            position="0 0.25 0"
                                            text={{ color: 'white', align: 'center', value: "Values", width: 1, height: 1, lineHeight: 55, wrapCount: 25 }}
                                            scale="1 1 1"
                                        ></Entity>

                                        <Entity
                                            id="ValuesContentTextDiv"
                                            position="0.08 -0.03 0"
                                            text={{
                                                color: 'white', align: 'left',
                                                value:
                                                    "Promoting understanding and acceptance of menstruation as a natural process \n" +
                                                    "Fostering empathy and compassion towards \n girls experiencing menstruation \n" +
                                                    "Encouraging confidence, empowerment, and reduced shame when managing periods \n", width: 1, height: 1,
                                                lineHeight: 60,
                                                wrapCount: 40
                                            }}
                                            scale="1 1 1"
                                        ></Entity>
                                        <Entity
                                            id="ValuesSpaceDiv1"
                                            position="0.05 0.12 0"
                                            text={{
                                                color: 'white', align: 'left',
                                                value: "-", width: 1, height: 1,
                                                wrapCount: 40

                                            }}
                                            scale="1 1 1"
                                        ></Entity>
                                        <Entity
                                            id="ValuesSpaceDiv2"
                                            position="0.05 -0.12 0"
                                            text={{
                                                color: 'white', align: 'left',
                                                value: "-", width: 1, height: 1,
                                                wrapCount: 40

                                            }}
                                            scale="1 1 1"
                                        ></Entity>
                                        <Entity
                                            id="ValuesSpaceDiv3"
                                            position="0.05 0 0"
                                            text={{
                                                color: 'white', align: 'left',
                                                value: "-", width: 1, height: 1,
                                                wrapCount: 40

                                            }}
                                            scale="1 1 1"
                                        ></Entity>

                                    </Entity>

                                    <Entity id="NextBtnBgPanel"
                                        geometry="primitive: plane; width: 0.5; height: 0.15"
                                        material={{ color: 'royalblue' }}
                                        position="0 -0.63 0.1"
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

                            ) : isBegin ?
                                // (
                                //     <Entity id="BeginContainer" position="0 1.7 -1.5">
                                //         <Entity id="BeginBgPanel" geometry="primitive: plane; width: 1.5; height: 0.8"
                                //             material="color: #000000; opacity:0.8"
                                //             position="0 0 0" />

                                //         <Entity
                                //             id="BeginTextDiv"
                                //             position="0 0.12 0.1"
                                //             text={{
                                //                 color: 'white', align: 'left', value: "Join this enlightening adventure with Mary, your virtual companion, as we explore the importance of menstrual health and hygiene. Together, we'll help you gain valuable understanding about this essential aspect of women's health, fostering a positive and informed approach to periods."
                                //                 , width: 1.2, height: 1,
                                //                 lineHeight: 55,
                                //                 wrapCount: 50
                                //             }}
                                //             scale="1 1 1"
                                //         ></Entity>

                                //         <Entity id="BeginBtnBgPanel"
                                //             geometry="primitive: plane; width: 0.5; height: 0.15"
                                //             material={{ color: 'royalblue' }}
                                //             position="0 -0.24 0.1"
                                //             className="raycastable"
                                //             events={{
                                //                 click: () => handleBegin()
                                //             }}
                                //         >

                                //             <Entity id="BeginBtnDiv"
                                //                 text={{ value: 'LET\'S BEGIN', align: 'center' }}
                                //                 position="0 0 0"
                                //             />

                                //         </Entity>


                                //     </Entity>
                                // ) 

                                (<Entity id="BeginContainer" position="0 1.7 -1.5">
                                    <Entity id="BeginContainerBgPanel" geometry="primitive: plane; width: 1.5; height: 0.8"
                                        material="color: #000000; opacity:0.8"
                                        position="0 0 0">


                                    </Entity>
                                    <Entity primitive="a-image" id="sanitary" src="#sanitary" position="-0.66 0.16 0.1" scale="0" />
                                    <Entity primitive="a-image" id="menstrual" src="#menstrual" position="-0.22 0.3 0.1" scale="0" />
                                    <Entity primitive="a-image" id="uterus" src="#uterus" position="0.22 0.3 0.1" scale="0" />
                                    <Entity primitive="a-image" id="temponImage" src="#tempon" position="0.66 0.16 0.1" scale="0" />

                                    <Entity
                                        id="BeginTextDiv"
                                        position="0 0.12 0.1"
                                        text={{
                                            color: 'white', align: 'left', value: "Join this enlightening adventure with Mary, your virtual companion, as we explore the importance of menstrual health and hygiene. Together, we'll help you gain valuable understanding about this essential aspect of women's health, fostering a positive and informed approach to periods."
                                            , width: 1.2, height: 1,
                                            lineHeight: 55,
                                            wrapCount: 50
                                        }}
                                        scale="1 1 1"
                                    ></Entity>

                                    <Entity id="BeginBtnBgPanel"
                                        geometry="primitive: plane; width: 0.5; height: 0.15"
                                        material={{ color: 'royalblue' }}
                                        position="0 -0.24 0.1"
                                        className="raycastable"
                                        events={{
                                            click: () => handleBegin()
                                        }}
                                    >

                                        <Entity id="BeginBtnDiv"
                                            text={{ value: 'LET\'S BEGIN', align: 'center' }}
                                            position="0 0 0"
                                        />
                                    </Entity>


                                </Entity>)

                                : null


                    };

                </Scene>
            </div>

        </div>
    )
}
