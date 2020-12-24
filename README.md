
![enter image description here](https://i.ibb.co/cttVXcq/Driveltv-logo-V1-small.png)

# Drivel-tv

Drivel-tv lets you browse and create live broadcasts with your favourite YouTube videos. Curate your content using YouTube playlists, submit them to Drivel and get a live broadcast link (with group chat) to share with your community. 🔴
<br/>



![Drivel home](https://i.ibb.co/mh3wqBW/drivel-home-small.png)

![Drivel broadcast](https://i.ibb.co/vBHxpWh/drivel-broadcast-small.png)

![Drivel IOS](https://i.ibb.co/m8L6ks3/drivel-all-IOS.png)

<br/>

## Getting started

This is a project ready for deployment to Heroku. After cloning the project, run **npm install** in the **root folder** as well as the **client folder**.

Create a .env file in your **root folder** and enter your desired backend port, MongoDB database and YouTube API key:

    PORT = 4000
    MONGO_DB = mongodb://localhost:27017/driveltv_localhost_development
    YT_API_KEY = YOURAPIKEYHERE



Start your backend in **root folder**:

    node server.js

Start your frontend in **client folder**:

    npm run start


Open [http://localhost:3000](http://localhost:3000/) (frontend) in your browser, and get broadcasting!



## Tech stack


![Drivel tech stack](https://i.ibb.co/hVM0LzG/stack-drivel-small.png)

Node.js, Express, MongoDB, Socket-io, Heroku, React, YouTube API



## Looking to the future

 - Implement user authentication & user profiles
 - Search broadcast functionality
 - Share-on-social-media widget
 - Video upload
