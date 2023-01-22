const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
brand:String,
name:String,
price:Number,
strike_price:String,
discount:String,
image_url:String,
userID:String

})

const ProductModel=mongoose.model("product",productSchema);

module.exports={ProductModel}