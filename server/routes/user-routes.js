const express = require('express')
const { signUp, login } = require('../controllers/auth-controller')
const varifytoken = require('../middlewares/varify-Token')
const getUser = require('../controllers/user-controller')

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.get('/user', varifytoken, getUser)

module.exports = router