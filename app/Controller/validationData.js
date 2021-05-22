
const {validationResult,check} = require('express-validator')

module.exports = new class Validation{

    loginValid(req,res){
        return [
        check('email')
        .isEmail()
        .withMessage('Your Email Is Not Vaild')
        .notEmpty()
        .withMessage('Please Enter Your Email'),
        check('password')
        .isLength({min:8 , max:32})
        .withMessage('Password Must Be Between 8 And 32 Character')
        ]
    }

    loginValidation(req,res,next){
        const check = validationResult(req).array()
        if(check.length != 0) {
            const msg = check.map(el=>el.msg)
            res.json({
                status : 'Validation Error',
                msg
            })
        }
        else next()
        
    }


    registerValid(req,res){
        return [
        check('email')
        .isEmail()
        .withMessage('Your Email Is Not Vaild')
        .notEmpty()
        .withMessage('Please Enter Your Email'),
        check('password')
        .isLength({min:8 , max:32})
        .withMessage('Password Must Be Between 8 And 32 Character')
        .custom((input,{req})=>{return input===req.body.repassword})
        .withMessage('Password Is Not Same'),
        check('phoneNumber')
        .matches(/^(\+989|9|09|98)(12|19|35|36|37|38|39|32|21|01|10)\d{7}$/)
        .withMessage('Your Mobile Phone Number Is Not Valid (Only Iranian Mobile Phone Supported)')
        ]
    }

    registerValidation(req,res,next){
        const check = validationResult(req).array()
        if(check.length != 0) {
            const msg = check.map(el=>el.msg)
            res.json({
                status : 'Validation Error',
                msg
            })
        }
        else next()
        
    }


    resetPasswordValid(req,res,next){
        return [
            check('email' , 'The Entered Email Is Not Valid').isEmail()
        ]
    }

    resetPasswordValidation(req,res,next){
        const check = validationResult(req).array()
        if (check.length !=  0){
            const msg = check.map((el)=>{return el.msg})
            return res.json ({
                status : 'validation error',
                msg
            })
        }
        next()
    }

    validResetPasswordField(req){
        return[
        check('password')
        .isLength({min:8 , max:32})
        .withMessage('Password Must Be Between 8 And 32 Character')
        .custom((input,{req})=>{return input===req.body.repassword})
        .withMessage('Password Is Not Same'),
        check('repassword')
        .notEmpty()
        .withMessage('Please Confrim Your Password')
        ]
    }
    validationResetPasswordField(req,res,next){
        const check = validationResult(req).array()
        if(check.length != 0) {
            const msg = check.map(el=>el.msg)
            return res.json ({
                status : 'validation error',
                msg
            })
        }
        next()
    }
}