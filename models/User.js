const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    age:{
        type:Number,
        required:true,
        trim:true,

    },
    isowner:{
        type:Boolean,
        required:true
    },
    address:{
        type:String,
        required:true,
        trim:true,
    }
}, {timestamps:true});



let User = mongoose.model('User' , userSchema);
module.exports = User;