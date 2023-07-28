# Overview

Our 360 immersive solution involves thoughtfully curated content, a user-friendly interface, and interaction aimed at touching various social impact themes to bring awareness and understanding of social issues to users of all age groups, particularly pre-adolescents.

# Functions  

A diverse range of educational modules for exploring thematic areas of social impact, designed on the principle of design thinking and innovation. The AI-enabled solution encompasses interactive 3D objects, text visuals & quizzes, and assessments. 

# Components

An immersive and interactive user experience that transports users to captivating virtual worlds. Through panoramic views and spatial audio, users are enveloped in a lifelike environment where the exploration of different paths shapes the narrative through intuitive controls and responsive interactions. 

# Self-paced 
experience that allows learners to solidify their understanding by pausing, rewinding, and repeating the module before moving forward. 

# Analytics and evaluation 
system that tracks performance data and enables further product optimization. 

# Cross-platform accessibility 
ensures access to the app from their preferred devices, including smartphones, tablets, and computers.

# Age-appropriate content 
caters to not only pre-adolescents but a diverse set of users whilst maintaining sensitivity.

# Personification 
makes learning enjoyable by breathing life into inanimate objects and relatable characters, thereby facilitating meaningful connections.

# Engaging Dashboard 
presents data and insights in a visually captivating and interactive manner with customizable features and user-friendly navigation through complex information.

# Users

The app's versatility and accessibility make it suitable for a wide range of demographics: pre-adolescents, teenagers, educators, and parents, allowing users to engage with the content and foster empathy and awareness. 

![UmetyWebVR](https://i.ibb.co/86Yn6S3/Readme-UNICEF.png)

## Technology Used

Framework : A-Frame
IDE       :	Atom
Scripting : JavaScript

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Demo

* [Menstrual Health and Hygiene Prototype](https://umetyunicef.github.io/poc/)
* [Report](https://umetyunicef.github.io/poc/report)

## Working with this project

### How to set up Atom

Install Atom : Download the file from https://atom.io/ and Install  AtomSetup-x64 in your pc.

Install html-preview package: To show Output on editor we will have to add html-preview package to Atom editor:

Step 1. Open Atom editor.

Step 2. Go to Packages Tab >> Setting View >> Install Packages/Themes

Step 3. Search for atom-html-preview Package

Step 4. Install first one from showing list.

Step 5. After installation we can show output of web page

Use html-preview package: To use html preview Go to Packages Tab >> Preview HTML >> Enable Preview. By enabling preview you can show the output of your project.


### How to create new Project

Step1: Create folder structure same as below

Module Id (Root Directory)

○images

○models

○scripts

○sounds

○loginform

○index.html (welcome page)

○login.html (login form)

○manifest.json

○Appdata.js

Step2: Create index.html text file under the root directory, it will be Game Play page.

Step3: Copy login.html, manifest.json, appdata.js file and loginform folder to your project

Step4: Open Atom editor and Select File tab then select Add Project Folder and select project directory.


### Uses and Description of Downloaded Project

Step1: Open Atom editor and Select File tab then select Add Project Folder and select downloaded project directory

Login page (login.html)

If login cookie does not find in browser, Application shows Login form
  
Fill below detail to the form
User name, user age , avatar and gender

After submitting the form user will be redirected to module. User will login for 24 hour with login name.
 

### Creating Game play (Using Index.html)


### Linking Manifest


Linking manifest file to add below line

```
< link rel="manifest" href="manifest.json" >
```

### Add Module Title


Add Title to page to add below line

```
<Title>Menstrual Health and Hygiene Prototype</Title>
```

### Load scripts

Load Script using `<script>` tag

```
<script src="scripts/aframe.min.js"></script>
<script src="scripts/utility.js"></script>
<script src="scripts/voiceover.js"></script>
<script src="scripts/gamemanager.js"></script>
<script src="scripts/cardboardjoystick.js"></script>
<script src="scripts/colorchange.js"></script>
<script src="scripts/questionmanager.js"></script>
<script src="scripts/scoremanager.js"></script>
<script src="scripts/databasemanager.js"></script>
<script src="scripts/login.js"></script>
<script src="scripts/cursorzoom.js"></script>
<script src="appdata.js"></script>
```

### Create Scene

 
Create Scene by adding a-scene Tag like below line

```
< a-scene renderer="antialias: true;">  code here    </a-scene> >
```


### Add Camera

Add following code:
```
<a-scene renderer="antialias: true;">
	<a-camera look-controls wasd-controls>
		<a-cursor 
			fuse="false" 
			fuseTimeout='60000' 
			rayOrigin= "mouse" 
			geometry="primitive: ring" 
			material="color: white;  shader: flat">
		</a-cursor>
	</a-camera>
</a-scene>
```

### Load sound in scene

Write code to load sound inside a-scene Tag.
Load sound with a-sound 

Note: This is recommended if clip name is ‘click.wav’ then sound id sound be ‘s_click’ 
(s_NameOfClip).

```
<a-scene renderer="antialias: true;">
	<a-sound id="s_click" src="src: url(sounds/click.mp3)" poolSize=5></a-sound> 
	<a-sound id="s_hover" src="src: url(sounds/hover.wav)" poolSize=5></a-sound> 
	<a-sound id="s_btn_lo" src="src: url(sounds/btn_lo.wav)" poolSize=5></a-sound> 
	<a-sound id="s_btn_l1" src="src: url(sounds/btn_l1.wav)" poolSize=5></a-sound> 
</a-scene>
```

### Load Assets

Write code to load assets inside a-scene Tag.
Load assets with a-sound 

Note: This is recommended if loading file name is ‘dog.png’ then id should be ‘dog’ .

```
<a-scene renderer="antialias: true;">
<a-assets id="assets"  timeout="3600000">
<img id="tex_menu_off" src="images/Btn_Off.png">   // Load texture
<img id="img360" src="images/skybox.jpg">    // Load 360 Image
<audio id="bgsound" src="sounds/bg.mp3"></audio>  //Load audio
<a-asset-item id="butterFly_full" src="models/Butterfly/ButterFly_Full.glb"></a-asset-item>  // Load 3D model (.gltf)
</a-assets>
</a-scene">
```

### Add Background music

Add Background music with a-sound tag in a-scene tag.

Note: To disable autoplay change property autoplay="false"

```
<a-scene renderer="antialias: true;">
<a-sound src="#bgsound" autoplay="true" volume="0.5" loop='true'></a-sound>
<a-scene>
```

### Add Skybox	

Add Skybox in with a-sky tag inside a-scene tag.

Note: Change rotation with rotation property.

```
<a-scene renderer="antialias: true;">
<a-sky src="#img360" rotation="0 -130 0"></a-sky>
<a-scene>
```

### Add Level

Add level inside a-scene tag with a-entity tag.
Note: To active/deactive level as default use property setactive="value:true/false"

```
<a-scene renderer="antialias: true;">
<a-entity id="MainMenu" setactive="value:true"> Code for main menu level  </a-entity>
<a-entity id="LO" setactive="value:false"> Code for LO level  </a-entity>
<a-entity id="L1" setactive="value:false"> Code for L1 level  </a-entity>
<a-entity id="AS" setactive="value:false"> Code for AS level  </a-entity>
<a-scene>
```

### Add MainMenu

```
<a-entity id="MainMenu" setactive="value:true">

<!-- Title -->
<a-entity  position="0 2.5 -3"
  geometry="primitive: plane; width: 3; height: 0.35;"
  material="color: black; opacity:0.53"
  text="value: Line and Plane of Symmetry; align:center; width: 5 ">
</a-entity>

<a-image id="btn_lo" position="-1.3 1.5 -3"
  geometry="primitive: plane; width: 1.2; height: 0.65"
  material="color: white; opacity:1 ; src: #tex_menu_off ;"
  text="value: View learning \n objectives; align:center; width: 3"
  click_sound cardboard_input vo_hover color_hover onclick="OnClickObjective();">
</a-image>

<!-- <a-image src="#tex_menu_off" position="0.7 1.5 -3"></a-image> -->

<a-image id="btn_l1" position="0 1.5 -3"
  geometry="primitive: plane; width: 1.2; height: 0.65"
  material="color: white; opacity:1 ; src: #tex_menu_off ;"
  text="value: Learn about lines\n and planes\n of symmetry; align:center; width: 3"
  click_sound cardboard_input vo_hover color_hover onclick="OnClickL1();">
</a-image>

<a-image id="btn_as" position="1.3 1.5 -3"
  geometry="primitive: plane; width: 1.2; height: 0.65"
  material="color: white; opacity:1 ; src: #tex_menu_off ;"
  text="value: Assess your \n knowledge; align:center; width: 3"
  click_sound  cardboard_input vo_hover color_hover  onclick="OnClickAS();">
</a-image>

</a-entity>
```

### Add Panel With OK Button

Note: Method execute on ok click should name PanelIdName_click().
Eg. if panel id is ‘p_comp_as’ method should be declared ‘p_comp_as_click()’

```
<a-entity id="p_comp_as" position="0 2 -3"
    setactive="value:false"
    geometry="primitive: plane; width: 2.4; height: 1.1"
    material="color: black; opacity:0.53">

    <a-text value="You have completed the assessment. 
    Here is your score:" position="0 0.3 0" align="center"  
     width="2.8"></a-text>

    <a-image id="btn_ok" position="0 -0.56 0.01"
   src="#tex_menu_off"
  geometry="primitive: plane; width: 0.6; height: 0.3"
  text="value: OK; align:center; width: 3; color: white"
  click_sound cardboard_input color_hover onclick="p_comp_as_click();">
  </a-image>
</a-entity>
```

### Add Panel In Camera

Add panel inside <a-camera> tag.

Note: Panel in camera should have scale ‘0.1’ for xyz.

```
<a-entity id="i_nextToProceed" 
  setactive="value:false ; scale: 0.1"
  vo_enable
  position="0 -0.13 -0.3"
  scale="0.1 0.1 0.1"
  geometry="primitive: plane; width: 1.7; height: 0.27"
  material="color: black; opacity:0.53"
  text="value:Select NEXT to proceed.; align:center; width: 2.8;">
</a-entity>
```

### Add Controller For GearVR, Oculus and Daydream

```
<!-- Controllers -->
    <a-entity setactive="value:false" gearvr-controls laser-controls="hand: right"  
           id="gvrc" line="color: #00ffff; opacity: 0.75"></a-entity>
    <a-entity setactive="value:false" daydream-controls laser-controls="hand: right" 
id="ddc" line="color: #00ffff; opacity: 0.75"></a-entity>
    <a-entity setactive="value:false" oculus-go-controls laser-controls="hand: right" 
id="oc" line="color: #00ffff; opacity: 0.75"></a-entity>
 <!-- /Controllers -->
```



### Controller setting for different platforms (Cardboard,DayDream,GearVR and OculusGo)

Add below code in index.html file at last

```
	<script>
	    var assetsId = '#assets';
	    var entity = document.querySelector(assetsId);
	    var controllerId = null;

    if (entity != null) {
        entity.addEventListener("loaded", function() {
            console.log("All Assets loaded");
            setTimeout(ShowMainMenu, 2000);
            setInterval(ActivateController, 1000);
            login_isUserAuthenticated();

        });

        entity.addEventListener("timeout", function() {
            console.log("Time up to load assets");
            setTimeout(location.reload.bind(location), 500);
        });

    } else {
        console.log("Exception : Id not found ID: ", assetsId);
    }


    function ShowMainMenu() {
        SetActive('#MainMenu', true);
        if (!login_isReferred()) {
            SetActive('#btn_close', false);
        }
    }


    function ActivateController() {
        let cId = "";

        if (AFRAME.utils.device.isGearVR()) {
            cId = '#gvrc';
            app_device_platform = "GearVR";
        } else if (isDayDream()) {
            cId = '#ddc';
            var gvrc = document.querySelector('#gvrc');
            var oc = document.querySelector('#oc');
            gvrc.parentNode.removeChild(gvrc);
            oc.parentNode.removeChild(oc);
            SetActive('#cursor', false);
            app_device_platform = "Daydream";
        } else if (AFRAME.utils.device.isOculusGo()) {
            cId = '#oc';
            app_device_platform = "OculusGo";
        } else {
            cId = '#cursor';

            let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (isMobile) {
                app_device_platform = "Cardboard";
                let scene = document.querySelector('a-scene');
                //scene.setAttribute('vr-mode-ui','enabled',true);
            } else {
                app_device_platform = "Desktop";
                let scene = document.querySelector('a-scene');
                //scene.setAttribute('vr-mode-ui','enabled',false);
            }

        }

        if (cId != controllerId) {
            SetActive(controllerId, false);
            controllerId = cId;
            SetActive(controllerId, true);
            console.log("controller id is ", controllerId);
        }
    }

    function isDayDream() {
        let isDayDream = false;
        let gamepad = navigator.getGamepads()[0];
        if (gamepad != undefined) {
            let gamepadId = gamepad.id;
            isDayDream = gamepadId.includes("Daydream") || gamepadId.includes("daydream");
        }
        return isDayDream;
    }


    window.onload = function() {

        login_referred_set();

        if (!login_isUserAuthenticated()) {
            window.location.href = "login.html";
        } else {
            console.log("User Name : ", login_getCookie('unicef_name'));
        }
    };
	</script>
```

#### Used parameter 

```
function questiondata() {
    this.USER_OID = "UUID";
    this.GL_MODULE_ID = "SSD";
    this.GL_MODULE_NAME = "SOCIO-EMOTIONAL LEARNING | UMETY";
    this.GL_LEVEL_ID = 1;
    this.GL_LEVEL_NAME = "L1";
    this.GL_LEVEL_KNOWLEDGE_DOMAIN = "Seeing";
    this.GL_LEVEL_COGNITIVE_DOMAIN = "CFM-7";
    this.GL_LEVEL_TYPE = "T1";
    this.GL_LEVEL_INTERACTIVITY = "GL_L1";
    this.GL_QUESTION_ID = "1";
    this.GL_QUESTION_COGNITIVE = "TOUCH";
    this.GL_QUESTION_ACTION_VERB = "CLICK";
    this.LL_QUESTION_TYPE = "QT1";
    this.TR_USER_SCORE = "1";
    this.HOST_IP = "";
    this.DEVICE_BROWSER_VERSION = "";
    this.DEVICE_MODEL = "NA";
    this.DEVICE_KERNEL_VERSION = "NA";
    this.DEVICE_SERIAL_NUMBER = "NA";
    this.DEVICE_PLATFORM = "";
    this.ATTEMPTED_ON = "";
}
```


#### Save data to local DB in Json format
```
function saveScoreToLocalDB() {
    let dataInJson = JSON.stringify(data);
    data = new datamodel();
    localStorage.setItem("UserScoreData", "");
    localStorage.setItem("UserScoreData", dataInJson);

    if (app_unicef_user_id != null) {
        setTimeout(sendDataToServer, 1000);
    }
}
```
#### Sending data to server
```
function sendDataToServer() {
    xhr.open(method, url.concat(saveActivity), true);
    xhr.setRequestHeader("Authorization", "Basic " + btoa(userNamePassword));
    xhr.setRequestHeader("Content-type", "application/json");
    let scoreDate = localStorage.getItem("UserScoreData");
    xhr.send(scoreDate);
}
```
### Builds

To use the latest stable build of A-Frame, include [`aframe.min.js`](https://aframe.io/releases/1.4.2/aframe.min.js):

```js
<head>
  <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
</head>
```

To check out the stable and master builds, see the [`dist/` folder](dist/).

### npm

```sh
npm install --save aframe
# Or yarn add aframe
```

```js
require('aframe')  // e.g., with Browserify or Webpack.
```

## Local Development

```sh
git clone [https://github.com/aframevr/aframe.git](https://github.com/umetyunicef/poc.git)  # Clone the repository.
cd aframe && npm install  # Install dependencies.
npm start  # Start the local development server.
```

And open in your browser **[http://localhost:9000](http://localhost:9000)**.

### Generating Builds

```sh
npm run dist
```
