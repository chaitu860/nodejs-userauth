const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const infoSchema= new Schema({
name:{
    type:String,
    required:true,
},
age:{
    type:Number,
    required:true,
},

}, {timestamps:true});
const Info=mongoose.model('Info',infoSchema,"NameOfCollection");
module.exports= Info;