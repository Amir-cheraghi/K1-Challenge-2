const express = require('express')
const router = express.Router()
const axios = require('axios').default



router.get( '/' , async (req,res,next)=>{
    const data = await axios.get(`${req.protocol}://${req.hostname}:3000/api/tasks` , {headers : req.headers})
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

router.get('/resetpassword/:token' ,async (req,res)=>{
    let vaild = false
   const result =  await axios.get(`${req.protocol}://${req.hostname}:3000/api/user/resetPassword/${req.params.token}`)
   if(result.data.status === 'success') vaild = true
   if(result.data.status === 'error') vaild = false
   res.render('resetPassword' , {
       vaild ,
       msg : result.data.msg
   })

})


module.exports = router