const express=require("express");
const {ProductModel}=require("../models/paytm.product");
const productRouter=express.Router();
productRouter.use(express.json())

//GET product
productRouter.get("/",async(req,res)=>{
    try {
        const product=await ProductModel.find();
        res.send(product)
        console.log("Allproduct")
    } catch (error) {
        res.send("err:not able to get the data of all product");
        console.log(error);
    }
})

//POST product
productRouter.post("/add",async(req,res)=>{
    const payload=req.body;
    try {
        const newproduct=ProductModel.insertMany(payload);
        //await newproduct.save();
        res.send("new product added to Database")
        console.log(newproduct)
    } catch (error) {
        res.send("err:not able to post the data of Product");
        console.log(error);
    }
})

//PATCH product

productRouter.patch("/update/:id",async(req,res)=>{
    let id=req.params.id
    const payload=req.body;
    try {
        await ProductModel.findByIdAndUpdate({_id:id},payload);
        res.send("new product updated to Database")
    } catch (error) {
        res.send("err:not able to update the data of car");
        console.log(error);
    }
})

//delete product

productRouter.delete("/delete/:id",async(req,res)=>{
    let id=req.params.id
    try {
        await ProductModel.findByIdAndDelete({_id:id});
        res.send(" product deleted from Database")
    } catch (error) {
        res.send("err:not able to delete the data of car");
        console.log(error);
    }
})

module.exports={productRouter}

