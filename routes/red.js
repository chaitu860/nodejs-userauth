require("dotenv").config();
const path=require('path');
const jwt=require('jsonwebtoken');
const express=require('express');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose')
const router=express.Router();
const Info=require('../models/Info');
const dbURI='mongodb+srv://chai:predator@cluster0.gwrfb.mongodb.net/node_tu?retryWrites=true&w=majority';
mongoose.connect(dbURI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('succesful');
}).catch((err)=>{
    console.log(err);
})
router.get('/add-info',(req,res)=>{
    var info=new Info({
         email:'chai',
        age:19
    })
    info.save()
    .then((results)=>{
        res.send(results);
    })
    .catch((err)=>{
        res.send(err);
    })
})

router.get('/',(req,res) =>{
    res.render('index');
})

router.post('/info-up',(req,res)=>{
    var info=new Info(
        {
            name:req.body['name'],
            age:req.body['age']
        }
    );
    info.save()
    .then((results)=>{
        res.render('inf');
    })
    .catch((err)=>{
        res.send(err);
    })

    console.log(req.body['name'])
})
Info.find({name:'chai'})
.then((res)=>{
    console.log(res)
})
const User=require('../models/User');
if (User){
    console.log('user');
}
router.get('/add-user',(req,res)=>{
    res.render('register');
})
router.post('/register',async (req,res)=>{
    const {name,phone_no,age,email,password,cpassword}=req.body;
    if (!name || ! email || !phone_no || !password ||!cpassword){
        return res.status(422).json({error:'pls fill this field'});
    
    }
    if (password!=cpassword){
        return res.status(422).json({error:'password does not match'});
    }
    try{
    const userExist= await  User.findOne({email:email})
    if (userExist){
        return res.status(422).json({error:'email already exist'});
    }
  const encryptpassword=await bcrypt.hash(password,12)
const encryptcpassword= await bcrypt.hash(cpassword,12);
    // const user= new User(req.body);
  
    const user=await User.create({
        name:name,
        phone_no:phone_no,
        age:age,
        email:email,
        password:encryptpassword,
        cpassword:encryptcpassword,
        token:'token'
    })
    const tokene = jwt.sign(
        { user_id: user._id, email },
        '12345678900987654321123456789009',
        {
          expiresIn: "2h",
        }
      );
      user.token=tokene;
      // save user token
      await user.save();
  
      // return new user
    
    res.status(200).json({message:'registered in succesfully'})
    
    }
    catch(err){
    console.log(err);
    }
})


User.find({name:'ram'})
.then((res)=>{
    console.log(res);
})
//LOgin
router.get('/login',(req,res)=>{
    res.render('login');
})
router.post('/log',async(req,res)=>{
    console.log(req.body)
    const {email,password}=req.body;
    try {
        let token;
        if (!email || !password){
            return res.status(400).json({error:"pls fill the data"});
        }
        const uslog=  await User.findOne({email:email})
        if(uslog && (await bcrypt.compare(password,uslog.password))){
            const tokenl = jwt.sign(
                { uslog_id: uslog._id, email },
                '12345678900987654321123456789009',
                {
                  expiresIn: "2h",
                }
              );
              uslog.token = tokenl;
                res.cookie('jwtoken',token,{
                    expires:new Date(Date.now()+2000000),
                    httpOnly:true
                })
              // user
              res.status(200).json({message:"logged in"});
        }
        else{
            return res.status.length(400).json({err:'incorrect credentials'})
        }
       console.log(uslog);
     

       
       
    } catch (error) {
        console.log(error);
    }
})  
module.exports=router;