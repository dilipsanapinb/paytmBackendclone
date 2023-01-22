const express=require("express");
const {CartModel}=require("../models/cart.model");
const cartRouter=express.Router();
cartRouter.use(express.json())

//GET product
cartRouter.get("/",async(req,res)=>{
    try {
        const product=await CartModel.find();
        res.send(product)
        console.log("Allproduct")
    } catch (error) {
        res.send("err:not able to get the data of all product");
        console.log(error);
    }
})

//POST product
cartRouter.post("/add",async(req,res)=>{
    const payload=req.body;
    try {
        const newproduct=new CartModel(payload);
        await newproduct.save();
        res.send("new product added to cart")
        console.log(newproduct)
    } catch (error) {
        res.send("err:not able to post the data of Product");
        console.log(error);
    }
})

//PATCH product

cartRouter.patch("/update/:id",async(req,res)=>{
    let id=req.params.id
    const payload=req.body;
    try {
        await CartModel.findByIdAndUpdate({_id:id},payload);
        res.send("new product updated to Database")
    } catch (error) {
        res.send("err:not able to update the data of car");
        console.log(error);
    }
})

//delete product

cartRouter.delete("/delete/:id",async(req,res)=>{
    let id=req.params.id
    try {
        await CartModel.findByIdAndDelete({_id:id});
        res.send(" product deleted from Database")
    } catch (error) {
        res.send("err:not able to delete the data of car");
        console.log(error);
    }
})

module.exports={cartRouter}

