const express=require("express");
require('dotenv').config();
const {connection}=require("./config/db")
const {productRouter}=require("./routes/product.route.js");
const { userRouter}=require("./routes/user.route");
const { cartRouter}=require("./routes/cart.route");
const {authenticate}=require("./middlewares/authenticate.middleware");
const cors = require('cors')
const app=express();

//middlewares
app.use(express.json())
app.use(cors({
    origin:"*"
}))
//routes
app.get("/",(req,res)=>{
    res.send("Welcome to Home Page")
})
app.use('/user',userRouter)
app.use(authenticate)
app.use('/product',productRouter);
app.use('/cart',cartRouter)


//port
app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log({"err":"not able to cooct the database"});
    }
    console.log(`server is running on port:${process.env.port}`);
})