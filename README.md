<h1 align="center">HABX CHAT ROOM </h1>

<h5 align="center">A REAL TIME CHAT ROOM EXPRESS-REACT APP
<a href="https://github.com/shenlin192/habx-chatroom/blob/master/doc/sendMessage.gif?raw=true">| Demo1</a>
<a href="https://github.com/shenlin192/habx-chatroom/blob/master/doc/changeName.gif?raw=true">| Demo2</a>
<a href="https://github.com/shenlin192/habx-chatroom/blob/master/doc/refresh.gif?raw=true">| Demo3</a>
</h5>


<p align="center">
<img src="https://github.com/shenlin192/habx-chatroom/blob/master/doc/sendMessage.gif?raw=true" alt="demo1" style="max-width:100%">
</p>

<p align="center">
<img src="https://github.com/shenlin192/habx-chatroom/blob/master/doc/changeName.gif?raw=true" alt="demo2" style="max-width:100%">
</p>

<p align="center">
<img src="https://github.com/shenlin192/habx-chatroom/blob/master/doc/refresh.gif?raw=true" alt="demo3" style="max-width:200px">
</p>


## Overview
This application mainly contains 4 functionality:

- A user can join the chat room after choosing a pseudo
- Send and receive messages in real time
- Changes of user name in real time
- Messages are persistent, reloading the page does not erase its contents

Whenever a user closes the current tab, the user will be **disconnected** from chat room.
The next time this user come back from chat room, the system will consider it as a **new user**.

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
    
**Note:** 

An `.env` file, which contains database username and password, needs to be added in the project's root directory.  

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
    # you will need a java jdk installed if you don't have one
    
    npm run start:test
    
    # in a new tab
    npm run test:e2e
    
    
## How do I build this app
This section is dedicated to explaining architecture of the application, 
technologies/tools that were used and the reason why I chose them.

### Preparation
After reading carefully the aim of this test and fully understand its demands, 
the first thing I do is to decide the application's architecture.

Since objective of this test is not only **realising functionality** 
but also providing a reasonable **project organization**, following aspects are 
taken into consideration.

- Extendability/Scalability 
- Maintenance complexity
- Developer teamwork complexity
- Robustness

In order to achieve these goals, architecture is designed with the concept of **separation 
of front and back (communication via API in JSON)**, while keeping the possibility to be developed in 
an **classical way (backend template and serve-side rendering)**.

### Express application file structure


### React application file structure

### File structure

Scalability
 
skeleton: Express application generator
services: database, email, online payment ...
