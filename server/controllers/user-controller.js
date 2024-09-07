const User = require('../models/user')

const getUser = async (req,res) => {
    const userId = req.id
    let user;
    try {
        user = await User.findById(userId, '-password')
    } catch (error) {
        console.log(error.message);
    }
    if(!user){
        return res.status(404).json({message: "User not found"})
    }
    return res.status(200).json({message: user})
}

module.exports = getUser