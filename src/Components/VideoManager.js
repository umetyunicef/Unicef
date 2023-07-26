
import "aframe";
import { Scene, Entity } from "aframe-react";
import React, { useEffect, useState } from 'react';
import { firebase } from "../DataManager";

function VideoManager({ formData }) {

    const [currOptionHovered, setCurrOptionHovered] = useState();


    const [isVideoRunning, setIsVideoRunning] = useState(true);

    const [isSubmit, setIsSubmit] = useState(true);
    const [isNext, setIsNext] = useState(false);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [pickedOptionIndex, setPickedOptionIndex] = useState(0);

    const [score, setScore] = useState(0);

    const [isQuesCompleted, setIsQuesCompleted] = useState(false);

    const [clickedOption, setSetClickedOption] = useState(null);


    const [questionData] = useState([
        {
            "id": 1,
            "ques": "How long does a typical menstrual period last?",
            "options": ["1-2 days", "3-6 days", "7-10 days", "12-15 days"],
            "correctOption": "3-6 days"
        },
        {
            "id": 2,
            "ques": "What is the function of the uterus during menstruation?",
            "options": ["To absorb the menstrual blood", "To prevent pregnancy", "To provide nutrients to the egg", "To build up a lining to keep the egg safe"],
            "correctOption": "To build up a lining to keep the egg safe"
        },
        {
            "id": 3,
            "ques": "What is the recommended way to discard used pads?",
            "options": ["Wrap in toilet paper or newspaper and throw them in the trash bin", "Flush them down the toilet", "Burn them", "Bury them in the ground"],
            "correctOption": "Wrap in toilet paper or newspaper and throw them in the trash bin"
        },
        {
            "id": 4,
            "ques": "Can you perform physical activities during menstruation?",
            "options": ["Yes", "No", "Only light activities", "Only activities that don't involve running"],
            "correctOption": "Yes"
        },
        {
            "id": 5,
            "ques": "Let’s say a classmate got her period during school hours. What would you do?",
            "options": ["I will start feeling awkward and say nothing", "I will ask her to talk slowly because others might hear", "I will reassure her and take her to the medical room", "I will make fun of her"],
            "correctOption": "I will reassure her and take her to the medical room"
        }
    ]);

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


    const handleSubmit = () => {


        if (clickedOption !== null) {
            console.log("Submit Button Clicked");
            const correctAns = questionData[currentQuestionIndex].correctOption;
            if (questionData[currentQuestionIndex].options[pickedOptionIndex] === correctAns) {
                console.log("Correct Answer");
                setScore(prev => prev + 1);
            } else {
                console.log("Wrong Answer");
            }

            setIsNext(true);
            setIsSubmit(false);
        }



    }

    const handleNext = () => {

        setSetClickedOption(null);

        console.log("Next Button Clicked", currentQuestionIndex);
        if (currentQuestionIndex === 4) {
            setIsQuesCompleted(true);
            const UserData = {
                name: formData.name,
                score: score,
                grade: formData.grade,
                age: formData.age,
                gender: formData.gender,
                country: formData.country,
                created_on: Math.floor(Date.now() / 1000)

            }

            console.log("User Data....", UserData);

            firebase.setData(UserData);
            firebase.getData();
        } else {
            setPickedOptionIndex(0);
            setCurrentQuestionIndex(prev => prev + 1);
            setIsNext(false);
            setIsSubmit(true);
        }

        console.log("2", currentQuestionIndex);



    }

    useEffect(() => {
        console.log("Score", score);
    }, [score])



    const handleVideoComplete = () => {
        console.log("Video Ended");

        const videoBtn = document.querySelector('#videoControls');
        videoBtn.setAttribute('visible', false);
        setIsVideoRunning(false);

    };


    const handleOptionClick = (index) => {

        if (!isNext) {
            setSetClickedOption(Number(index));
            console.log("OPtion click", index)
            setPickedOptionIndex(index);
        }


    };

    const handleMouseEnter = (index) => {

        if (isSubmit) {
            setCurrOptionHovered(index);

            const currButton = document.querySelector(index);
            currButton.setAttribute("scale", "1.05 1.05 1.05");
        }



    };

    const handleMouseExit = () => {


        if (isSubmit) {
            if (currOptionHovered) {
                const currButton = document.querySelector(currOptionHovered);
                currButton.setAttribute("scale", "1 1 1");
            }
        }


    };



    const tickGenerator = (res) => {

        const correctAns = questionData[currentQuestionIndex].correctOption;
        const index = questionData[currentQuestionIndex].options.findIndex(opt => opt === correctAns);

        if (index === res) {
            return (
                <a-image id="rightTickImg" src="#correctTick" position="0.75 0 0" scale=".1 .1 .1"  ></a-image>
            )
        } else {
            return (
                <a-image id="rightTickImg" src="#incorrectTick" position="0.75 0 0" scale=".1 .1 .1"  ></a-image>
            )
        }

    }



    return (
        <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <div id="AFrameScene" style={{ height: window.innerHeight - 200, width: window.innerWidth, border: '1px solid black' }}>


                <Scene vr-mode-ui="enabled:true" embedded >

                    <a-assets>

                        <img id="img1" src="https://umety-dev.s3.amazonaws.com/unicef/Menstrual_Cup.png" alt='img1'></img>
                        <img id="img2" src="https://umety-dev.s3.amazonaws.com/unicef/Sanitary Pad.png" alt='img2'></img>

                        <img id="play" src="https://umety-dev.s3.amazonaws.com/unicef/play.png" alt='playImg'></img>
                        <img id="pause" src="https://umety-dev.s3.amazonaws.com/unicef/pause.png" alt='pauseImg'></img>
                        <img id="correctTick" src="https://umety-dev.s3.amazonaws.com/unicef/correctTick.png" alt='correctTickTmg'></img>
                        <img id="incorrectTick" src="https://umety-dev.s3.amazonaws.com/unicef/incorrectTick.png" alt='incorrectTickImg'></img>


                        <video id="myVideo" src="https://s3-dev.umety.com/unicef/Unicef.mp4"> </video>

                    </a-assets>

                    <Entity id="camera" primitive="a-camera">
                        {isVRMode ? (
                            <a-entity
                                cursor="fuse: false;"
                                position="0 0 -1"
                                geometry="primitive: ring"
                                material="color: white; shader: flat"
                                scale="0.01 0.01 0.01"
                                raycaster="objects: .raycastable"
                            />
                        ) : (
                            <Entity cursor="rayOrigin: mouse;" />
                        )}
                    </Entity>

                    {/* <Entity id="camera" primitive="a-camera">
                        <a-entity cursor="fuse: false;"
                            position="0 0 -1"
                            geometry="primitive: ring"
                            material="color: white; shader: flat"
                            scale="0.01 0.01 0.01"
                            raycaster="objects: .raycastable"
                        />
                    </Entity>

                    <Entity id="camera" primitive="a-camera" cursor="rayOrigin: mouse;">

                    </Entity> */}




                    {!isVideoRunning && <Entity id="QuizContainer" position="0 1.7 -1.5">
                        {!isQuesCompleted ?

                            (<Entity id="QuestionContainerBgPanel" geometry="primitive: plane; width: 1.8; height: 1.2"
                                material="color: #FFFFFF; opacity:1"
                                position="0 0 0">

                                <Entity
                                    id="QuestionHeadingDiv"
                                    position="0 0.4 0.1"
                                    text={{ color: 'black', align: 'center', value: questionData[currentQuestionIndex].ques, width: 1.5 }}
                                    scale="1 1 1"
                                ></Entity>

                                <Entity id="OptionsDiv" position="-0.05 0 0.1">


                                    <Entity id="OptionBgPanel1"
                                        geometry="primitive: plane; width: 1.3; height: 0.1"
                                        material={clickedOption === 0 ? "color: black" : "color: blue"}
                                        position="0 0.22 0"
                                        className="raycastable"
                                        events={{
                                            click: () => handleOptionClick("0"),
                                            mouseenter: () => handleMouseEnter("#OptionBgPanel1"),
                                            mouseleave: () => handleMouseExit()

                                        }}
                                    >

                                        <Entity
                                            id="option"
                                            position="0 0 0"
                                            text={{ color: 'white', align: 'center', value: questionData[currentQuestionIndex].options[0], align: "left" }}
                                            scale="1 1 1"
                                        />

                                        {isNext && tickGenerator(0)}
                                    </Entity>
                                    <Entity id="OptionBgPanel2"
                                        geometry="primitive: plane; width: 1.3; height: 0.1"
                                        material={clickedOption === 1 ? "color: black" : "color: blue"}
                                        position="0 0.09 0"
                                        className="raycastable"
                                        events={{
                                            click: () => handleOptionClick("1"),
                                            mouseenter: () => handleMouseEnter("#OptionBgPanel2"),
                                            mouseleave: () => handleMouseExit()

                                        }}
                                    >
                                        <Entity
                                            id="option"
                                            position="0 0 0"
                                            text={{ color: 'white', align: 'center', value: questionData[currentQuestionIndex].options[1], align: "left" }}
                                            scale="1 1 1"
                                        />
                                        {isNext && tickGenerator(1)}
                                    </Entity>
                                    <Entity id="OptionBgPanel3"
                                        geometry="primitive: plane; width: 1.3; height: 0.1"
                                        material={clickedOption === 2 ? "color: black" : "color: blue"}
                                        position="0 -0.04 0"
                                        className="raycastable"
                                        events={{
                                            click: () => handleOptionClick("2"),
                                            mouseenter: () => handleMouseEnter("#OptionBgPanel3"),
                                            mouseleave: () => handleMouseExit()
                                        }}
                                    >
                                        <Entity
                                            id="option"
                                            position="0 0 0"
                                            text={{ color: 'white', align: 'center', value: questionData[currentQuestionIndex].options[2], align: "left" }}
                                            scale="1 1 1"
                                        />
                                        {isNext && tickGenerator(2)}
                                    </Entity>
                                    <Entity id="OptionBgPanel4"
                                        geometry="primitive: plane; width: 1.3; height: 0.1"
                                        material={clickedOption === 3 ? "color: black" : "color: blue"}
                                        position="0 -0.17 0"
                                        className="raycastable"
                                        events={{
                                            click: () => handleOptionClick("3"),
                                            mouseenter: () => handleMouseEnter("#OptionBgPanel4"),
                                            mouseleave: () => handleMouseExit()
                                        }}
                                    >
                                        <Entity
                                            id="option"
                                            position="0 0 0"
                                            text={{ color: 'white', align: 'center', value: questionData[currentQuestionIndex].options[3], align: "left" }}
                                            scale="1 1 1"
                                        />
                                        {isNext && tickGenerator(3)}
                                    </Entity>

                                </Entity>

                                {isSubmit &&
                                    <Entity id="SubmitBtnBgPanel"
                                        geometry="primitive: plane; width: 0.5; height: 0.15"
                                        material={{ color: 'black' }}
                                        position="0 -0.4 0.1"
                                        className="raycastable"
                                        events={{
                                            click: () => handleSubmit()
                                        }}
                                    >

                                        <Entity id="SubmitBtnDiv"
                                            text={{ value: 'SUBMIT', align: 'center' }}
                                            position="0 0 0"
                                        />
                                    </Entity>
                                }

                                {isNext &&
                                    <Entity id="NextBtnBgPanel"
                                        geometry="primitive: plane; width: 0.5; height: 0.15"
                                        material={{ color: 'black' }}
                                        position="0 -0.4 0.1"
                                        className="raycastable"
                                        events={{
                                            click: () => handleNext()
                                        }}
                                    >

                                        <Entity id="SubmitBtnDiv"
                                            text={{ value: 'NEXT', align: 'center' }}
                                            position="0 0 0"
                                        />
                                    </Entity>
                                }

                            </Entity>)

                            :
                            (
                                <Entity id="QuestionContainerBgPanel" geometry="primitive: plane; width: 1.8; height: 1.2"
                                    material="color: #FFFFFF; opacity:1"
                                    position="0 0 0">


                                    <Entity
                                        id="RemarkDiv"
                                        position="0 -0.1 0.1"
                                        text={{ color: 'black', align: 'center', value: " Woo-hoo! You have completed this adventure!", width: 1.5 }}
                                        scale="1 1 1"
                                    ></Entity>

                                    <Entity id="RestartBtnBgPanel"
                                        geometry="primitive: plane; width: 0.4; height: 0.15"
                                        material="color: blue"
                                        position="0.4 -0.4 0.1"
                                        className="raycastable"
                                        events={{
                                            click: () => { window.location.reload(0) },
                                            mouseEnter: "material.color: white"
                                        }}
                                    >
                                        <Entity
                                            id="RestartBtnDiv"
                                            position="0 0 0"
                                            text={{ color: 'white', align: 'center', value: "Restart", width: 1.5 }}
                                            scale="1 1 1"
                                        ></Entity>

                                    </Entity>

                                    <Entity id="ScoreBtBgnPanel"
                                        geometry="primitive: plane; width: 0.4; height: 0.15"
                                        material="color: black; opacity:0.9 "
                                        position="-0.4 -0.4 0.1"
                                    >
                                        <Entity
                                            position="0 0 0"
                                            text={{ color: 'white', align: 'center', value: `Score : ${score}`, width: 1.5 }}
                                            scale="1 1 1"
                                        ></Entity>

                                    </Entity>
                                </Entity>)

                        }

                    </Entity>}


                    <Entity primitive="a-image" id="videoControls" className="raycastable" src="#play" position="0 0.5 -2" scale=".3 .3 .3"
                        events={{
                            click: () => {
                                console.log("clicked");
                                const myVideo = document.querySelector('#myVideo');
                                const videoControls = document.querySelector('#videoControls');


                                console.log("Play pause btn clicked");
                                if (myVideo.paused) {
                                    myVideo.play();
                                    videoControls.setAttribute('src', '#pause');
                                } else {
                                    myVideo.pause();
                                    videoControls.setAttribute('src', '#play');
                                }



                                // Add event listener for video completion
                                myVideo.addEventListener('ended', handleVideoComplete);

                            }
                        }}
                    ></Entity>



                    <Entity primitive="a-videosphere" src="#myVideo" rotation="0 -90 0"></Entity>
                    {/* <Entity primitive="video" id="myVideo" crossOrigin="anonymous" src='/video360.mp4'></Entity> */}
                </Scene>
            </div>

        </div>
    );
}

export default VideoManager;