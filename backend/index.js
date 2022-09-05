const connectToMongo = require('./db'); //This is how we connect mongo with db.js
const express = require('express'); //express connection

connectToMongo();

const app = express() //created an object of express
const port = 5000 //setup port num

//to use re.body in aplied in auth.js
app.use(express.json());

app.use('/api/auth', require('./routes/auth')); // app is object of express which is running apis, first parameter is url path and other is the path of that file
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})