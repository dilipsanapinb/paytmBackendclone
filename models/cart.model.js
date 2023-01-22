const mongoose=require("mongoose");

const cartSchema=mongoose.Schema({
brand:String,
name:String,
price:String,
strike_price:String,
discount:String,
image_url:String,
userID:String

})

const CartModel=mongoose.model("cart",cartSchema);

module.exports={CartModel}