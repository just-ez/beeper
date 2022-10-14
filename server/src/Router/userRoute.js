const router = require('../core/routeConfig')
const User = require('../controller/userController')
const { request } = require('express')
const hasToken = require('../core/userAuth')
router.post('/user', User.createUser)

router.get('/user', hasToken, User.getUserById)

module.exports = router