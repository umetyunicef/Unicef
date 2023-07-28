import "aframe";
import { Scene, Entity } from "aframe-react";
import React, { useEffect, useState } from 'react';
import { firebase } from "../DataManager";

export default function SceneManager({ formData }) {


  const [introPanel, setIntroPanel] = useState(true);
  const [learningObjPanel, setLearningObjPanel] = useState(false);
  const [beginPanel, setBeginPanel] = useState(false);
  const [videoPanel, setVideoPanel] = useState(false);
  const [quizStartPanel, setQuizStartPanel] = useState(false);
  const [quizPanel, setQuizPanel] = useState(false);
  const [scorePanel, setScorePanel] = useState(false);


  const [isVideoStarted, setIsVideoStarted] = useState(false);

  const [currOptionHovered, setCurrOptionHovered] = useState();
  const [isSubmit, setIsSubmit] = useState(true);
  const [isNext, setIsNext] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [pickedOptionIndex, setPickedOptionIndex] = useState(0);

  const [score, setScore] = useState(0);

  const [clickedOption, setClickedOption] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false);


  const [questionData] = useState([
    {
      "id": 1,
      "ques": "How do you think Jiya was feeling by the end of the story?",
      "options": ["Comforted and excited", "No noticeable changes in emotions", "A sense of sadness", "Felt angry"],
      "correctOption": "Comforted and excited"
    },
    {
      "id": 2,
      "ques": "What is the function of the uterus during menstruation?",
      "options": ["To absorb the menstrual blood", "To prevent pregnancy", "To provide nutrients to the egg", "To build up a lining to keep the egg safe"],
      "correctOption": "To build up a lining to keep the egg safe"
    },
    {
      "id": 3,
      "ques": "How long does a typical menstrual period last?",
      "options": ["1-2 days", "3-6 days", "7-10 days", "12-15 days"],
      "correctOption": "3-6 days"
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


  const ResetState = () => {

    setIntroPanel(false);
    setLearningObjPanel(false);
    setBeginPanel(false);
    setVideoPanel(false);
    setQuizStartPanel(false);
    setQuizPanel(false);
    setScorePanel(false);
    setIsVideoStarted(false);
    setIsSubmit(false);
    setIsNext(false);
    setCurrentQuestionIndex(0);
    setPickedOptionIndex(0);
    setScore(0);
    setClickedOption(0);
    setIsOptionSelected(false);
    setIsVRMode(false);
  }

  useEffect(() => {

    console.log("FormData", formData)

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


  const handleIntroClick = () => {
    console.log("Start btn clicked");
    setIntroPanel(false);
    setLearningObjPanel(true);
  }

  const handleLearningObjClick = () => {
    console.log("Next btn clicked");
    setLearningObjPanel(false);
    setBeginPanel(true);
  }

  const handleBeginClick = () => {
    console.log("Begin btn clicked");

    setBeginPanel(false);
    setVideoPanel(true);
  }

  const handleVideoComplete = () => {
    console.log("Video Ended");

    const videoBtn = document.querySelector('#videoControls');
    videoBtn.setAttribute('visible', false);
    // setIsVideoEnded(true);
    setIsVideoStarted(false);
    setVideoPanel(false);
    setQuizStartPanel(true);

  };

  const handleQuizStartClick = () => {

    console.log("Start Button Click");
    setClickedOption(0);
    setIsOptionSelected(false);
    setQuizStartPanel(false);
    setQuizPanel(true);
  }

  const handleSubmit = () => {


    if (isOptionSelected) {
      console.log("Submit Button Clicked");
      const correctAns = questionData[currentQuestionIndex].correctOption;
      if (questionData[currentQuestionIndex].options[pickedOptionIndex - 1] === correctAns) {
        console.log("Correct Answer");
        setScore(prev => prev + 1);
      } else {
        console.log("Wrong Answer");
      }

      setIsNext(true);
      setIsSubmit(false);
      setIsOptionSelected(false);
    } else {
      console.log("No option is selected")
    }



  }


  const handleNext = () => {

    setClickedOption(0);


    console.log("Next Button Clicked", currentQuestionIndex);
    if (currentQuestionIndex === 4) {


      console.log("User Data....", formData);

      const UserData = {
        name: formData.name?.toLowerCase(),
        score: score,
        grade: formData.grade || 0,
        age: formData.age,
        gender: formData.gender?.toLowerCase(),
        country: formData.country?.toUpperCase(),
        created_on: Math.floor(Date.now() / 1000)
      }

      console.log("User Data....", UserData);

      firebase.setData(UserData);
      firebase.getData();

      setQuizPanel(false);
      setScorePanel(true);

    } else {
      setPickedOptionIndex(0);
      setCurrentQuestionIndex(prev => prev + 1);
      setIsNext(false);
      setIsSubmit(true);
    }

    console.log("2", currentQuestionIndex);



  }

  const handleOptionClick = (index) => {

    setIsOptionSelected(true);

    if (!isNext) {
      setClickedOption(index);
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


  const handleReportClick = () => {
    console.log("Report Click", formData);

    ResetState();

    window.location.href = 'https://umetyunicef.github.io/Unicef/report';
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

            <img id="img1" src="https://umety-dev.s3.amazonaws.com/unicef/Menstrual_Cup.png" alt='img1'></img>
            <img id="img2" src="https://umety-dev.s3.amazonaws.com/unicef/Sanitary-Pad.png" alt='img2'></img>

            <img id="play" src="https://umety-dev.s3.amazonaws.com/unicef/play.png" alt='playImg'></img>
            <img id="pause" src="https://umety-dev.s3.amazonaws.com/unicef/pause.png" alt='pauseImg'></img>
            <img id="correctTick" src="https://umety-dev.s3.amazonaws.com/unicef/correctTick.png" alt='correctTickTmg'></img>
            <img id="incorrectTick" src="https://umety-dev.s3.amazonaws.com/unicef/incorrectTick.png" alt='incorrectTickImg'></img>


            <video id="myVideo" src="https://s3-dev.umety.com/unicef/unicef_video.mp4"> </video>
            {/* <video id="myVideo" src="https://s3-dev.umety.com/unicef/video360.mp4"> </video> */}


          </a-assets>

          {
            !videoPanel &&
            < Entity id="skyBox" primitive="a-sky" src="#skyImg" />
          }

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




          {introPanel &&
            <>

              <Entity id="IntroContainer" position="0 1.7 -1.5">
                <Entity id="IntroContainerBgPanel" geometry="primitive: plane; width: 2; height: 1.3"
                  material="color: #000000; opacity:0.8"
                  position="0 0 0" />
                <Entity primitive="a-image" id="sanitary" src="#sanitary" position="-0.65 0.1 0.1" scale="1 1 1" width="0.5" height="0.5" />
                <Entity primitive="a-image" id="menstrual" src="#menstrual" position="-0.22 0.2 0.1" scale="1 1 1" width="0.5" height="0.5" />
                <Entity primitive="a-image" id="uterus" src="#uterus" position="0.33 0.2 0.1" scale="1 1 1" width="0.5" height="0.5" />
                <Entity primitive="a-image" id="temponImage" src="#tempon" position="0.73 0.1 0.1" scale="1 1 1" width="0.5" height="0.5" />

                <Entity
                  id="TextDiv"
                  position="0 -0.25 0.1"
                  text={{
                    color: 'white', align: 'center', value: "Get ready to embark on an adventurous journey with your period pals to explore menstrual health and hygiene!"
                    , width: 1.5, wrapCount: 55, lineHeight: 55
                  }}
                  scale="1 1 1"
                ></Entity>

                <Entity id="IntroBtnBgPanel"
                  geometry="primitive: plane; width: 0.5; height: 0.15"
                  material={{ color: 'royalblue' }}
                  position="0 -0.45 0.1"
                  className="raycastable"
                  events={{
                    click: () => handleIntroClick()
                  }}
                >

                  <Entity id="IntroBtnDiv"
                    text={{ value: 'START', align: 'center' }}
                    position="0 0 0"
                  />
                </Entity>

              </Entity>
            </>

          }


          {learningObjPanel &&
            <>
              <Entity id="BgPanel" geometry="primitive: plane; width: 3.5; height: 2"
                material="color: #404040 ; opacity:1"
                position="0 1.7 -2" />
              <Entity id="LearningOutcomesContainer" position="0 1.7 -1.5">

                <Entity id="LearningOutcomesDiv" position="0 0.55 0">
                  <Entity id="LearningOutcomesBgPanel" geometry="primitive: plane; width: 1.1; height: 0.2"
                    material="color: #000000; opacity:0.8"
                    position="0 0 0" />
                  <Entity
                    id="LearningOutcomesHeadingText"
                    position="0 0 0"
                    text={{ color: 'white', align: 'center', value: "LEARNING OUTCOMES", width: 1, height: 1, wrapCount: 20 }}
                    scale="1 1 1"
                  ></Entity>
                </Entity>


                <Entity id="knowledgeDiv" position="-0.85 0 0" scale="0.8 0.8 0.8">

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


                <Entity id="SkillsDiv" position="0 0 0" scale="0.8 0.8 0.8">

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


                <Entity id="ValuesDiv" position="0.85 0 0" scale="0.8 0.8 0.8">

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
                  position="0 -0.55 0.1"
                  className="raycastable"
                  events={{
                    click: handleLearningObjClick
                  }}
                >

                  <Entity id="NextBtnDiv"
                    text={{ value: 'NEXT', align: 'center' }}
                    position="0 0 0"
                  />
                </Entity>

              </Entity>
            </>
          }

          {beginPanel &&
            <>

              <Entity id="BeginContainer" position="0 1.7 -1.5">
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
                    click: () => handleBeginClick()
                  }}
                >

                  <Entity id="BeginBtnDiv"
                    text={{ value: 'LET\'S BEGIN', align: 'center' }}
                    position="0 0 0"
                  />
                </Entity>


              </Entity>
            </>
          }

          {videoPanel &&
            <Entity primitive="a-image" id="videoControls" className="raycastable" src={isVideoStarted ? "#pause" : "#play"} position="0 0.3 -2" scale=".3 .3 .3"
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
          }

          {videoPanel &&
            <Entity primitive="a-videosphere" src="#myVideo" rotation="0 -90 0"></Entity>
          }

          {quizStartPanel &&
            <>

              <Entity id="StartContainer" position="0 1.7 -1.5">
                <Entity id="StartContainerBgPanel" geometry="primitive: plane; width: 2; height: 1.3"
                  material="color: #000000; opacity:0.8"
                  position="0 0 0" />
                <Entity primitive="a-image" id="sanitary" src="#sanitary" position="-0.65 0.1 0.1" scale="1 1 1" width="0.5" height="0.5" />
                <Entity primitive="a-image" id="menstrual" src="#menstrual" position="-0.22 0.2 0.1" scale="1 1 1" width="0.5" height="0.5" />
                <Entity primitive="a-image" id="uterus" src="#uterus" position="0.33 0.2 0.1" scale="1 1 1" width="0.5" height="0.5" />
                <Entity primitive="a-image" id="temponImage" src="#tempon" position="0.73 0.1 0.1" scale="1 1 1" width="0.5" height="0.5" />

                <Entity
                  id="TextDiv"
                  position="0 -0.25 0.1"
                  text={{
                    color: 'white', align: 'center', value: "Hey there! Wasn't Jiya's adventure simply fantastic! "
                      + "Let\'s celebrate the understanding that you've gained on this amazing journey."
                    , width: 1.5, wrapCount: 55, lineHeight: 55
                  }}
                  scale="1 1 1"
                ></Entity>

                <Entity id="StartBtnBgPanel"
                  geometry="primitive: plane; width: 0.5; height: 0.15"
                  material={{ color: 'royalblue' }}
                  position="0 -0.45 0.1"
                  className="raycastable"
                  events={{
                    click: () => handleQuizStartClick()
                  }}
                >

                  <Entity id="StartBtnDiv"
                    text={{ value: 'START', align: 'center' }}
                    position="0 0 0"
                  />
                </Entity>

              </Entity>
            </>
          }

          {quizPanel &&
            <>

              <Entity id="QuizContainer" position="0 1.7 -1.5">
                <Entity id="QuestionContainerBgPanel" geometry="primitive: plane; width: 1.8; height: 1.2"
                  material="color: #000000; opacity:0.8"
                  position="0 0 0" />

                <Entity
                  id="QuestionHeadingDiv"
                  position="0.05 0.4 0.1"
                  text={{ color: 'white', align: 'left', value: questionData[currentQuestionIndex].ques, width: 1.5 }}
                  scale="1 1 1"
                ></Entity>

                <Entity id="OptionsDiv" position="-0.05 0 0.1">


                  <Entity id="OptionBgPanel1"
                    geometry="primitive: plane; width: 1.3; height: 0.1"
                    material={clickedOption === 1 ? "color: royalblue" : "color: white"}
                    position="0 0.22 0"
                    className="raycastable"
                    events={{
                      click: () => handleOptionClick(1),
                      mouseenter: () => handleMouseEnter("#OptionBgPanel1"),
                      mouseleave: () => handleMouseExit()

                    }}
                  >

                    <Entity
                      id="option0"
                      position="0.14 0 0"
                      text={{ color: 'black', align: 'left', value: questionData[currentQuestionIndex].options[0], align: "left", width: 1.5, wrapCount: 65 }}
                      scale="1 1 1"
                    />

                    {isNext && tickGenerator(0)}
                  </Entity>
                  <Entity id="OptionBgPanel2"
                    geometry="primitive: plane; width: 1.3; height: 0.1"
                    material={clickedOption === 2 ? "color: royalblue" : "color: white"}
                    position="0 0.09 0"
                    className="raycastable"
                    events={{
                      click: () => handleOptionClick(2),
                      mouseenter: () => handleMouseEnter("#OptionBgPanel2"),
                      mouseleave: () => handleMouseExit()

                    }}
                  >
                    <Entity
                      id="option1"
                      position="0.14 0 0"
                      text={{ color: 'black', align: 'left', value: questionData[currentQuestionIndex].options[1], align: "left", width: 1.5, wrapCount: 65 }}
                      scale="1 1 1"
                    />
                    {isNext && tickGenerator(1)}
                  </Entity>
                  <Entity id="OptionBgPanel3"
                    geometry="primitive: plane; width: 1.3; height: 0.1"
                    material={clickedOption === 3 ? "color: royalblue" : "color: white"}
                    position="0 -0.04 0"
                    className="raycastable"
                    events={{
                      click: () => handleOptionClick(3),
                      mouseenter: () => handleMouseEnter("#OptionBgPanel3"),
                      mouseleave: () => handleMouseExit()
                    }}
                  >
                    <Entity
                      id="option2"
                      position="0.14 0 0"
                      text={{ color: 'black', align: 'left', value: questionData[currentQuestionIndex].options[2], align: "left", width: 1.5, wrapCount: 65 }}
                      scale="1 1 1"
                    />
                    {isNext && tickGenerator(2)}
                  </Entity>
                  <Entity id="OptionBgPanel4"
                    geometry="primitive: plane; width: 1.3; height: 0.1"
                    material={clickedOption === 4 ? "color: royalblue" : "color: white"}
                    position="0 -0.17 0"
                    className="raycastable"
                    events={{
                      click: () => handleOptionClick(4),
                      mouseenter: () => handleMouseEnter("#OptionBgPanel4"),
                      mouseleave: () => handleMouseExit()
                    }}
                  >
                    <Entity
                      id="option3"
                      position="0.14 0 0"
                      text={{ color: 'black', align: 'left', value: questionData[currentQuestionIndex].options[3], align: "left", width: 1.5, wrapCount: 65 }}
                      scale="1 1 1"
                    />
                    {isNext && tickGenerator(3)}
                  </Entity>

                </Entity>

                {isSubmit &&
                  <Entity id="SubmitBtnBgPanel"
                    geometry="primitive: plane; width: 0.5; height: 0.15"
                    material={{ color: 'royalblue' }}
                    position="0 -0.4 0.1"
                    className="raycastable"
                    disabled="true"
                    events={{
                      click: handleSubmit
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
                    material={{ color: '#107869' }}
                    position="0 -0.4 0.1"
                    className="raycastable"
                    events={{
                      click: () => handleNext()
                    }}
                  >

                    <Entity id="NextBtnDiv"
                      text={{ value: 'NEXT', align: 'center' }}
                      position="0 0 0"
                    />
                  </Entity>
                }

              </Entity>
            </>
          }

          {scorePanel &&
            <>
              <Entity id="FinalContainer" position="0 1.7 -1.5">
                <Entity id="FinalContainerBgPanel" geometry="primitive: plane; width: 2; height: 1.3"
                  material="color: #000000; opacity:0.8"
                  position="0 0 0" />
                <Entity primitive="a-image" id="sanitary" src="#sanitary" position="-0.65 0.1 0.1" scale="1 1 1" width="0.5" height="0.5" />
                <Entity primitive="a-image" id="menstrual" src="#menstrual" position="-0.22 0.2 0.1" scale="1 1 1" width="0.5" height="0.5" />
                <Entity primitive="a-image" id="uterus" src="#uterus" position="0.33 0.2 0.1" scale="1 1 1" width="0.5" height="0.5" />
                <Entity primitive="a-image" id="temponImage" src="#tempon" position="0.73 0.1 0.1" scale="1 1 1" width="0.5" height="0.5" />

                <Entity
                  id="TextDiv"
                  position="0 -0.25 0.1"
                  text={{
                    color: 'white', align: 'center', value: " Woo-hoo! You have completed this adventure! \n"
                      + "Your quest for knowledge has unlocked a brighter, more informed path. Onward to the next thrilling escapade!", width: 1.5, wrapCount: 55, lineHeight: 55
                  }}
                  scale="1 1 1"
                ></Entity>

                <Entity
                  id="ScoreTextDiv"
                  position="0 -0.45 0.1"
                  text={{ color: 'white', align: 'center', value: `Score : ${score}`, width: 1.5 }}
                  scale="1 1 1"
                ></Entity>



                <Entity id="ReportDivBgPanel"
                  geometry="primitive: plane; width: 0.35; height: 0.13"
                  material="color: royalblue"
                  position="0.63 -0.46 0.1"
                  className="raycastable"
                  events={{
                    click: () => handleReportClick()
                  }}
                >
                  <Entity
                    id="ReportTextDiv"
                    position="0 0 0"
                    text={{ color: 'white', align: 'center', value: "Report", width: 1.5 }}
                    scale="1 1 1"
                  ></Entity>

                </Entity>

              </Entity>
            </>
          }



        </Scene>
      </div>

    </div>
  )
}
