const jwt = require('jsonwebtoken')
const User = require('../Models/user')

const checkJwt = async (req, res, next) => {
    req.user = {login: false};

    if (req.session['jwt']) {

        const verify = jwt.verify(req.session['jwt'], process.env.JWT_SECRET)
        if (verify) {
            req.user = undefined
            const user = await User.findById(verify.id)
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