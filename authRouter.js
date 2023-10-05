const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration', [
     check('username', "username cannot be empty").notEmpty(),
     check('email', "email cannot be empty").notEmpty(),
     check('email', "not is an email address").isEmail(),
     check ('password', "The password must be more than 4 and less than 10 characters")
     .isLength({min:4, max:10}, )
     ], controller.registration) //вызываем функцию из контроллера authController
router.post('/login', controller.login)

router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)
// router.get('/songs', controller.getSongsById)
router.get('/songs', controller.getSongs)
router.post('/songs',  [
     check('artist', "cannot be empty").notEmpty(),
], roleMiddleware(['ADMIN']), controller.postSong)
router.put('/songs', roleMiddleware(['ADMIN']), controller.updateSongs)
router.put('/users', roleMiddleware(['ADMIN']), controller.updateUser)

router.delete('/songs', roleMiddleware(['ADMIN']), controller.deleteSongs)
router.delete('/users', roleMiddleware(['ADMIN']), controller.deleteUser)



module.exports = router