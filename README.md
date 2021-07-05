# MERN-Wanderlust-App

Wanderlust-App is a Travel package booking application developed using MERN Stack (MongoDB, Express js, React js, Node js)

https://user-images.githubusercontent.com/85893398/124443767-95555900-dd9b-11eb-8349-752bb88d6653.mp4

## Developed With

* [Visual Studio Code](https://code.visualstudio.com/) - A source code editor developed by Microsoft for Windows, Linux and macOS. It includes support for debugging, embedded Git control, syntax highlighting, intelligent code completion, snippets, and code refactoring
* [Node.js](https://nodejs.org/en/) - Javascript runtime
* [React](https://reactjs.org/) - A javascript library for building user interfaces
* [Babel](https://babeljs.io/) - A transpiler for javascript
* [Bootstrap 4](https://getbootstrap.com/) - Bootstrap is an open source toolkit for developing with HTML, CSS, and JS
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [Express js](http://expressjs.com/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [MongoDB](https://www.mongodb.com/) - MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. 
---
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The following software is required to be installed on your system:

* Node 8.x
* Npm 3.x

Type the following commands in the terminal to verify your node and npm versions

```bash
node -v
npm -v
```

### Install

Follow the following steps to get development environment running.

* Clone _'MERN-Wanderlust-App.git'_ repository from GitHub

  ```bash
  git clone https://github.com/apoorva-sajjanar/MERN-Wanderlust-App
  ```

   _OR USING SSH_

  ```bash
  git clone git@github.com:apoorva-sajjanar/MERN-Wanderlust-App.git
  ```

* Install node modules

   ```bash
   cd wanderlust-react-ui
   npm install
   cd..
   cd wanderlust-web-service
   npm install
   ```


### Starting both front end and back end servers

* Build application

  This command will start the mongodb and the front end part.

  ```bash
  cd wanderlust-react-ui
  npm start
  cd..
  cd wanderlust-web-service
  cd src
  npm node app.js
  ```


