const dotenv=require('dotenv');
const path=require('path');
const jwt=require('jsonwebtoken');

const router=require('./routes/red')
const express=require('express');
const app=express();
const mongoose=require('mongoose')
require("dotenv").config();
const auth = require("./middleware/auth.js");
app.listen(4000,()=>{
    console.log('listening on this pport')
})
app.set('view engine','ejs');

const Info=require('./models/Info');
app.use(express.urlencoded({extended:true}));
//to get post requests and accept datamiddleware 
//is important
app.use(router);
app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

