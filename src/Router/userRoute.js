const router = require('../core/routeConfig')
const User = require('../controller/userController')

router.post('/user', User.createUser)

module.exports = router