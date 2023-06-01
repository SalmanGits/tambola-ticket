require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const ticketRouter = require('./routes/ticketRoute.js')
const userRouter = require('./routes/userRoute.js')
const {authenticate} = require('./middleware/auth.js')
const connectToDB = require('./db/db.js')
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000 

//Db Connection
connectToDB()

app.use("/api/user",userRouter)
app.use("/api/ticket",authenticate,ticketRouter)



// Server Listening
app.listen(port,()=>{
    console.log("listening on port " + port)
})

