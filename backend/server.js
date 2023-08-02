require('dotenv').config()

const express =require('express')
const mongoose= require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes= require('./routes/user')
const cors = require('cors')

//express app
const app=express()

// cors
app.use(cors())

//middleware
app.use(express.json())

app.use((req,res,next)=> {
    console.log(res.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
    console.log('db &', process.env.PORT)
    })  
 })
.catch((error)=>{
    console.log(error)
})

