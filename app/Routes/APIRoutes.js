const express = require('express')
const validationData = require('../Controller/validationData')
const taskController = require('./../Controller/taskController')
const router = express.Router()


router.route('/api/tasks')
.get(taskController.showAllTask)
.post(taskController.createTask)

router.route('/api/tasks/:id')
.get(taskController.showTaskById)
.put(taskController.editTask)
.delete(taskController.deleteTask)


router.route('/api/user/login')
.post(validationData.loginValid(),validationData.loginValidation)

router.route('/api/user/register')
.post(validationData.registerValid(),validationData.registerValidation)


module.exports = router