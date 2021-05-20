const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    creator : {type : String , required : true},
    name : {type : String , required : true},
    type : {type : String , enum : ['TODO' , 'DOING' , 'DONE'] , required : true  , uppercase : true},
    description : {type : String}

},{timestamps:true})

const TASK = mongoose.model('TASK',taskSchema)

module.exports = TASK