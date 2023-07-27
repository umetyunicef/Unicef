import React, { useEffect, useState } from 'react';
import LoginPage from './LoginPage';
import Intro from './Intro';
import VideoManager from './VideoManager';
import QuestionManager from './QuestionManager';


export default function RouteManager() {

  const [isLogin, setIsLogin] = useState(true);
  const [isIntro, setIsIntro] = useState(false);
  const [isVideoManager, setIsVideoManager] = useState(false);
  const [isQuestionManager, setIsQuestionManager] = useState(false);

  const [formData, setFormData] = useState({});



  useEffect(() => {
    console.log("Form Data", formData)
  }, [formData])


  return (
    <>

      {isLogin && <LoginPage setIsLogin={setIsLogin} setIsIntro={setIsIntro} setFormData={setFormData} />}

      {isIntro && <Intro setIsIntro={setIsIntro} setIsVideoManager={setIsVideoManager} />}

      {isVideoManager && <VideoManager setIsVideoManager={setIsVideoManager} setIsQuestionManager={setIsQuestionManager} />}

      {isQuestionManager && <QuestionManager formData={formData} />}


    </>
  )
}
