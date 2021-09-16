const { Int32 } = require('mongodb');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const config = require('config');
const userSchema=mongoose.Schema({
 
    name:{
        type:String,
        required:true,
    },
    phone_no:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true

    },
    token:{
        type:String,
        required:true
    }
})
const User=mongoose.model('User',userSchema);
module.exports=User;
