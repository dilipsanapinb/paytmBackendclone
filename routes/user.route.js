const express=require("express");
const {UserModel}=require("../models/user.model")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")
const userRouter=express.Router();
require('dotenv').config()

userRouter.use(express.json());
//GET
userRouter.get("/",async(req,res)=>{
    try {
        const user=await UserModel.find();
        res.send(user);
        console.log("All users data");
    } catch (error) {
        res.send("err:not able to get the data of all cars");
        console.log(error);
    }
})

//POST
userRouter.post("/register",async(req,res)=>{
    const {firstname,lastname,email,pass,gender}=req.body;
    try {
        bcrypt.hash(pass,5, async(err, hash)=> {
            if(err){
                console.log(err);
            }else{
                const user=new UserModel({firstname,lastname,email,pass:hash,gender});
                await user.save()
                res.send("Sign Up is sucessfull");
                console.log(user);
            }
        });
    } catch (error) {
        res.send("Registration is not successfull");
        console.log(error);
    }
})

//Login

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await UserModel.find({email});
        const hs_pass=user[0].pass;
        console.log(hs_pass);
        if(user.length>0){
            bcrypt.compare(pass,hs_pass,(err, result)=> {
                if(result){
                    jwt.sign({userID:user[0]._id }, process.env.key,(err, token)=> {
                        res.send({"msg":"Sign in Successfull","token":token})
                      });
                }else{
                    res.send("ERR:Wrong Credentials");
                }
            });
        }else{
        res.send("ERR:Wrong Credentials");
        }
    } catch (error) {
        res.send("Login is not successfull");
        console.log(error);
    }
});

module.exports={userRouter}
