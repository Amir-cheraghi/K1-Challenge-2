const express = require('express')
const router = express.Router()
const axios = require('axios').default



router.get( '/' , async (req,res,next)=>{
    const data = await axios.get(`${req.protocol}://${req.hostname}:3000/api/tasks` , {headers :{Cookie : req.headers.cookie}})
    if(data.data.status === 'error' && data.data.msg === 'Please Login to access') return res.redirect('/login')
    res.render('index',{
        data : data.data.data,
        message : req.flash('message'),
        login : req.user.login
    })
})

router.get('/login', async (req,res,next)=>{
    if(req.user.login) return res.redirect('/')
    res.render('login-register')
})


module.exports = router