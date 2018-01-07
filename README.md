<h1 align="center">HABX CHAT ROOM </h1>

<h5 align="center">A REAL TIME CHAT ROOM EXPRESS-REACT APP
<a href="https://github.com/shenlin192/habx-chatroom/blob/master/doc/sendMessage.gif?raw=true">| Demo1</a>
<a href="https://github.com/shenlin192/habx-chatroom/blob/master/doc/changeName.gif?raw=true">| Demo2</a>
<a href="https://github.com/shenlin192/habx-chatroom/blob/master/doc/refresh.gif?raw=true">| Demo3</a>
</h5>



<h5 align="center">Chose username and send messages</h5>
<p align="center">
<img src="https://github.com/shenlin192/habx-chatroom/blob/master/doc/sendMessage.gif?raw=true" alt="demo1" style="max-width:100%">
</p>



<h5 align="center">Change user name on real time</h5>
<p align="center">
<img src="https://github.com/shenlin192/habx-chatroom/blob/master/doc/changeName.gif?raw=true" alt="demo2" width="110%">
</p>



<h5 align="center">Messages are persistent, reloading the page does not erase its contents</h5>
<p align="center">
<img src="https://github.com/shenlin192/habx-chatroom/blob/master/doc/refresh.gif?raw=true" alt="demo3" width="30%">
</p>


## Overview
This application mainly contains 4 functionality:

- A user can join the chat room after choosing a pseudo
- Send and receive messages in real time
- Changes of username in real time
- Messages are persistent, reloading the page does not erase its contents

Whenever a user closes the current tab, the user will be **disconnected** from the chat room.
The next time this user comes back to the chat room, the system will consider it as a **new user**.

The application is fully **responsive** and can be used on mobile, iPad and desktop.


## Usage

### Quick start
Clone this repo via git

    git clone git@github.com:shenlin192/habx-chatroom.git
    
Install express dependencies via npm.

    cd habx-chatroom
    npm install 
        
Install react dependencies via npm.

     cd ./client-app/chat-room-app
     npm install 
     
Build react app for production 

    npm run build
    
Start the express server
    
    cd ../../
    npm run start
    
Open a browser and go to `localhost:8080/chat-room` 

**Note:** 

A `.env` file, which contains database username and password, needs to be added to the project's root directory.  

In order to assure security, this file is not tracked by git.
    
### Test (optional)

Test of react app    
    
    cd ./client-app/chat-room-app
    npm run test
    
Integration test of the entire app (express)
    
    cd project_root
    npm run test:int
    
End-to-end test of the entire app (express)
    
    cd project_root
    npm install selenium-standalone@latest -g
    selenium-standalone install
    selenium-standalone start
    # you will need a java JDK installed if you don't have one
    
    npm run start:test
    
    # in a new tab
    npm run test:e2e
    
    
## How do I build this app
This section is dedicated to explaining architecture of the application, 
technologies/tools that were used and the reason why I chose them.

### Preparation
After reading carefully the aim of this test and fully understand its demands, 
the first thing I do is to decide the application's architecture.

Since objective of this test is not only **realizing functionality** 
but also providing a reasonable **project organization**, following aspects are 
taken into consideration.

- Extendability/Scalability 
- Maintenance complexity
- Developer teamwork complexity
- Robustness

In order to achieve these goals, architecture is designed with the concept of **separation 
of front and back (communication via API in JSON)**, while keeping the possibility to be developed in 
a **classical way (backend template and serve-side rendering)**.

### Express application file structure
To quick start an express application, `express-generator` is chosen without any doubt. 
`mlab`, a cloud database server, is chosen for storing MongoDB data because it's free and easy to use.
As for testing `mocha`, `chai`, `webdriver.io` are used as they are so populated.
In order to guaranty code quality, `eslint-airbnb` is used.

The following structure is created by `express-generator` by default:

````
\bin
\public
\routes
\views
   app.js
````
This structure is designed to develop site webs in a classical way which uses backend template. 
We will keep it because it's perfect for developing simple web pages along with `jQuery`, `Bootstrap` ...


Next, a `client-app` folder is added in order to achieve the concept of front-end, back-end separation. 
This folder contains all front-end applications and it's framework neutral. If one day we want to change the **implementation
from `react` to `vue` to `angular`, or using all of them, nothing in the back-end needs to be changed since they consume API only**.

````
\bin
\client-apps
    \react-app
    \vue-app
    \angular-app
    \...
\public
\routes
\views
   app.js
````

To better modularise the code, a `services` folder containing functionality about `database`, `WebSocket`, `email` or `payment` is needed.
In order to guarantee robustness, a `test` folder is added for `integration` and `e2e` test.
Finally, a `doc` folder is added for documentation.  

````
\bin
\client-apps
\doc
\public
\routes
\services
\test
\views
   app.js
````

### React application file structure
To quick start a dynamic and **data-driven** react application, `create-react-app` and `Redux` are chosen immediately without a doubt. 
As for testing, jest is used as it comes along with `create-react-app`. To achieve the goal of "reloading the page without erasing its contents",
`sessionStorage` is used since it's easier for development and test compared with `localStorage` and `cookie`

The files in this project are organized in a classical `React-Redux` application way like:

````
\src
    \actions
    \components
    \reducers
    \test
````

This structure is perfect for developing small and middle react applications.
However, for really complicated projects, it's recommended to organize files as node_modules does. 
Which means each component, scene or service has everything it needs to work on its own, such as its own styles, images, translations, 
set of actions as well as the unit or integration tests.

The idea is well described in the article 
[How to better organize your React applications? ](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)

