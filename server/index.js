const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routes/user-routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config()

const app = express()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', userRouter)

mongoose.connect(MONGO_URI, ).then(()=>{
    console.log('MongoDB connected');
})

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`);
})

