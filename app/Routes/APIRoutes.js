const express = require('express')
const authController = require('../Controller/authController')
const validationData = require('../Controller/validationData')
const checkLogin = require('../middleware/checkLogin')
const taskController = require('./../Controller/taskController')
const router = express.Router()

router.route('/api/tasks')
.get(checkLogin,taskController.showAllTask)
.post(taskController.createTask)

router.route('/api/tasks/:id')
.get(checkLogin,taskController.showTaskById)
.put(checkLogin,taskController.editTask)
.delete(checkLogin,taskController.deleteTask)


router.route('/api/user/login')
.post(validationData.loginValid(),validationData.loginValidation,authController.login,authController.sendResult)

router.route('/api/user/register')
.post(validationData.registerValid(),validationData.registerValidation,authController.register,authController.sendResult)

router.route('/api/user/logout')
.get(checkLogin,authController.logout)

router.route('/api/user/resetpassword')
.post(validationData.resetPasswordValid(),validationData.resetPasswordValidation,authController.resetPassword)

router.route('/api/user/resetpassword/:token')
.get(authController.resetPasswordShow)
.post(validationData.validResetPasswordField(),validationData.validationResetPasswordField,authController.resetPasswordProcess)

router.route('/api/user/result')
.get(authController.sendResult)


module.exports = router