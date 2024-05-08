const mongoose = require('mongoose');


const carSchema = new mongoose.Schema({
    company:{
        type:String,
        trim:true,
        required:true
    },
    model:{
        type:String,
        trim:true,
        required:true
    },
    year:{
        type:Number,
        required:true,
        trim:true,
    
    },
    mileage:{
        type:String,
        required:true
    }
}, {timestamps:true});



let Car = mongoose.model('Car' , carSchema);
module.exports = Car;