const express = require('express')
const passport = require('passport')
const User = require('../Models/user')
require('./../passport/local')
const nodeMailer = require('nodemailer')
const crypto = require('crypto')
module.exports = new class authController {

    async login(req, res, next) {
        await passport.authenticate('local-login', {
            successFlash: true,
            successRedirect: '/api/user/result',
            failureFlash: true,
            failureRedirect: '/api/user/result'
        })(req, res, next)
    }
    async register(req, res, next) {
        await passport.authenticate('local-register', {
            successFlash: true,
            successRedirect: '/api/user/result',
            failureFlash: true,
            failureRedirect: '/api/user/result'
        })(req, res, next)
    }


    sendResult(req, res) {
        res.json({
            status: req.flash('status'),
            msg: req.flash('message')
        })
    }

    logout(req, res) {
        req.session.destroy()
        res.json({
            status: 'success',
            msg: 'Successfully Logout'
        })
    }

    async resetPassword(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email
            })
            if (!user) return res.json({
                status: 'error',
                msg: 'The Entred Email Dont Have Account !!! '
            })
            const transport = nodeMailer.createTransport({
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                },
                host: process.env.MAIL_HOSTNAME,
                port: process.env.MAIL_PORT,
            })
            const token = crypto.randomBytes(32).toString('hex')
            const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
            user.passwordToken = hashedToken
            user.passwordTokenExpire = Date.now() + 10 * 60 * 1000
            await user.save()
            const link = `${req.protocol}://${req.hostname}:3000/resetPassword/${token}`
            await transport.sendMail({
                sender: process.env.MAIL_SENDER_NAME,
                subject: 'Reset Password Link (Valid For 10 Min)',
                text: `Please Go To The Following Link To Reset Password \n\n ${link} \n\n If You Dont Request For This , Please Ignore This Message`,
                to: 'google@gmail.com'
            })
            res.json({
                status: 'success',
                msg: `The Reset Password Link Has Been Sent To "${req.body.email}" .`
            })
        } catch (err) {
            res.json({
                status: 'error',
                msg: `While Process Some Error Has Been Apeared Please Try Againg " .`
            })
        }
    }
    async resetPasswordShow(req, res) {
        try {
            const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
            const user = await User.findOne({
                passwordToken: token
            })
            if (!user || new Date(user.passwordTokenExpire).getTime() < Date.now()) {
                return res.json({
                    staus: 'error',
                    msg: 'The Link Expired Or Invalid !!!'
                })
            }
            res.json({
                status: 'success',
                msg: 'Please Enter New Password And Confrim Password'
            })
        } catch (err) {
            res.json({
                staus: 'error',
                msg: 'The Link Expired Or Invalid !!!'
            })
        }
    }
    async resetPasswordProcess(req, res) {
        try {
            const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
            const user = await User.findOne({
                passwordToken: token
            })
            if (!user || new Date(user.passwordTokenExpire).getTime() < Date.now()) {
                return res.json({
                    staus: 'error',
                    msg: 'The Link Expired Or Invalid !!!'
                })
            }
            user.passwordToken = undefined
            user.passwordTokenExpire = undefined
            user.passwordChangeDate = Date.now()
            user.password = req.body.password
            await user.save()
            return res.json({
                status: 'success',
                msg: 'Password Successfully Changed .'
            })
        } catch (err) {
            res.json({
                staus: 'error',
                msg: 'While Processing Request Some Error Has Been Apeared Please Try Agian'
            })
        }
    }

}