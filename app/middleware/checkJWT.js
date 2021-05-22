const session = require('express-session');
const jwt = require('jsonwebtoken')
const User = require('../Models/user')

const checkJwt = async (req, res, next) => {
    req.user = {login: false};

    if (req.session['jwt']) {

        const verify = jwt.verify(req.session['jwt'], process.env.JWT_SECRET)
        if (verify) {
            const user = await User.findById(verify.id)
            if(new Date(user.passwordChangeDate).getTime()/1000>verify.iat){
                req.session.jwt = ''
                req.user = {login: false};
                return next()
            }
            req.user = undefined
            req.user = {
                ...user._doc,
                login: true
            }
            return next()
        } else {
            req.user = {login: false};
            return next()
        }
    }
    next()
    
}
module.exports = checkJwt