const jwt = require('jsonwebtoken')

const varifytoken = (req,res,next) =>{
    // const header = req.headers['authorization']
    // const token = header.split(" ")[1]

    const cookie = req.headers.cookie;
    token = cookie.split("=")[1]
    
    if(!token){
        return res.status(400).json({
            message: 'No token found'
        })
    }
    jwt.verify(String(token), process.env.SECRET_KEY, (error, user)=>{
        if(error){
            return res.status(400).json({
                message: 'Invalid token found'
            })
        }
        req.id = user.id
    })
    next()
}

module.exports = varifytoken