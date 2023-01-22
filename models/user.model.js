const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    pass:String,
    gender:String
})

const UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}