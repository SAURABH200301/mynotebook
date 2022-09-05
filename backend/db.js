const mongoose = require('mongoose'); //MongoDB uses the mongoose to connect with applications.  
const mongoURI = "mongodb://localhost:27017/mynotebook" //URL used to make connection between mongodb and dev env

const connectToMongo = () => { //an arrow function to be runned when any changes occur in dev env 
      mongoose.connect(mongoURI,()=>{ //a mongoose function connect() to connect the mongo to env
        console.log("connected to mongoDB")
      })
}

module.exports = connectToMongo;