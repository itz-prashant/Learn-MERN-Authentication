const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY


const signUp = async (req,res) => {

    const { name, email, password } = req.body
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        console.log(error.message);
    }

    if(existingUser){
        return res.status(400).json({message: 'User already exist'})
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = new User({
        name,
        email,
        password : hashPassword
    })
    await user.save()
    return res.status(201).json({message: user})
}

const login  = async (req, res) =>{
    const {email, password} = req.body
    let existinguser;
    try {
        existinguser = await User.findOne({email})
    } catch (error) {
        console.log(error.message)
    }

    if(!existinguser){
        return res.status(400).json({
            message: 'User not exist ! Invalid email'
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, existinguser.password)

    if(!isPasswordCorrect){
        return res.status(400).json({
            message: 'Invalid password'
        })
    }

    const token = jwt.sign({id: existinguser.id}, SECRET_KEY, {expiresIn: '1h'})

    res.cookie(String(existinguser.id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000*30),
        httpOnly: true,
        sameSite:'lax'
    })

    return res.status(200).json({
        message: 'Successfully Login'
    })
}

module.exports = {
    signUp,
    login
}