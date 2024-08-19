# Metropolitan Market Setup and Deployment Guide

Metropolitan Market is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application. As such, the step-by-step instructions for setting up and deploying a full-stack MERN application are mostly standardized, with a few modifications shown below.

[https://beam.seven88.racing:55560/](https://beam.seven88.racing:55560/) (Currently Inactive Due to Server Costs!)
## Local Project Setup
### 1. Pre-requisites:
- Ensure you have Node.js and npm installed on your system.
- A stable internet/ethernet connection.
### 2. Download the full-stack project
Download the project as a .zip or pull the code to a location of your choice on your machine.
### 3. Install dependencies:
Navigate into the project directory and run:
`cd CPS630-Project`
`npm install --force`
### 4. Run the backend and frontend locally
Using the “local deployment” code folder…
`nodemon server/server.js`

---

If nodemon does not work then use:
`node server/server.js`
  
In another terminal use:
`npm start`
### 5. Enjoy!
The react app should be running on `localhost:3000` and the server should be running on `localhost:3001`
# Deploy the app on a server
1. Using the “server deployment” code folder…
2. **Install Docker:** Ensure Docker is installed on your server.
3. **Prepare Dockerfile** found in the repo
4. **Build Docker Image**: Run docker build -t your-app-name . in your project directory.
5. **Push Docker Image (Optional)**: If built locally, push the image to a Docker registry using docker push your-dockerhub-username/your-app-name.
6. **Pull and Run on Server**: If pushed to a registry, pull the image on your server with docker pull your-dockerhub-username/your-app-name, then run it using docker run -d -p 80:3001 your-app-name.
7. **Verify Deployment**: Access your server's IP or domain in a browser to check the app.

[https://beam.seven88.racing:55560/](https://beam.seven88.racing:55560/) (Currently Inactive Due to Server Costs!)
