const passport = require('passport')
const strategy = require('passport-local').Strategy
const User = require('./../Models/user')
const jwt = require('jsonwebtoken')


passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    await User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use('local-login', new strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const user = await User.findOne({
            email
        })
        //Check User
        if (!user) {
            return done(null, false, req.flash('status', 'Validation Error'), req.flash('message', 'Email Or Password Not Correct !!!'))
        }

        //Check Password
        const verifyPass = await user.comparePassword(password, user.password)
        if (verifyPass) {
            req.session.jwt = jwt.sign({id : user._id},process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRE}) 
            return done(null, user, req.flash('status', 'success'), req.flash('message', 'Welcome To The Task Manager'))
        } else {
            return done(null, false, req.flash('status', 'Validation Error'), req.flash('message', 'Email Or Password Not Correct !!!'))
        }

        //Error
    } catch (err) {
        console.log(err)
        return done(null, false, req.flash('status', 'Validation Error'), req.flash('message', 'Some Error Has Been Apeared !!!'))

    }
}))


passport.use('local-register' , new strategy({
    usernameField : 'email' ,
    passwordField : 'password',
    passReqToCallback : true 
}, async(req,email,password,done)=>{
    let user = await User.findOne({email})
    if (user) {
        return done(null,false,req.flash('status' , 'Validation Error'),req.flash('message' , 'Email Is Already Used Please Try Another Email Or Login'))
    }
     user = await User.create({
         fName : req.body.fName,
         lName : req.body.lName,
         email : req.body.email,
         password : req.body.password,
         phoneNumber : req.body.phoneNumber
     })
     req.session.jwt = jwt.sign({id : user._id},process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRE})
    return done(null , user ,req.flash('status', 'success'),req.flash('message' , `Welcome ${user.fName || ''} ${user.lName || ''} To Task Manager`))
}))