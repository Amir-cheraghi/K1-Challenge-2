const express = require('express')
const passport = require('passport')
require('./../passport/local')
module.exports = new class authController{

    async login(req,res,next){
       await passport.authenticate('local-login',{
            successFlash : true ,
            successRedirect : '/api/user/result',
            failureFlash : true ,
            failureRedirect : '/api/user/result'
        })(req,res,next)
    }
    async register(req,res,next){
        await passport.authenticate('local-register',{
            successFlash : true ,
            successRedirect : '/api/user/result',
            failureFlash : true,
            failureRedirect : '/api/user/result'
        })(req,res,next)
    }


    sendResult(req,res){
        res.json({
            status : req.flash('status'),
            msg : req.flash('message')
        })
    }

    logout(req,res){
        req.session.destroy()
        res.json({
            status : 'success',
            msg : 'Successfully Logout'
        })
    }

}