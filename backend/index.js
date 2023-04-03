require('dotenv').config()
const connectToMongo = require("./db")
const express = require('express')
var cors = require('cors') 

const app = express()
app.use(cors({
  origin:"*",
}))

//connect to mongoDB
connectToMongo();

// middleware
app.use(express.json());


// Routes
// app.get('/',function(req,res){
//     res.send('This is home page')
// })
app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));


app.listen(5000, () => {
  console.log(`App listening on port 5000`)
})