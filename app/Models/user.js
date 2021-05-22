const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email : {required : true , unique : true , type : String},
    fName : {type : String},
    lName : {type : String},
    phoneNumber : {type : String},
    password : {type : String , required : true },
    passwordToken : {type : String},
    passwordTokenExpire : {type : Date},
    passwordChangeDate : {type : Date}
},{timestamps:true})

userSchema.pre('save',async function (next){
    if(this.isModified('password'))
    this.password =await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.comparePassword = async (formPass,userPass)=>{
    return await bcrypt.compare(formPass,userPass)
}

const User = mongoose.model('User' , userSchema)

module.exports = User