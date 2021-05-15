const express = require('express')
const router = express.Router()
const axios = require('axios').default
const app = express()


router.get('/', async (req,res,next)=>{
    const data = await axios.get(`${req.protocol}://${req.hostname}:3000/api/tasks`)
    res.render('index',{
        data : data.data.data
    })
})

router.get('/login', async (req,res,next)=>{
    res.render('login-register')
})


module.exports = router