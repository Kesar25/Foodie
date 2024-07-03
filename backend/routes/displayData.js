const express=require("express");
const Router=express.Router();

Router.get("/foodData", async(req,res)=>{
    try{
        console.log(global.food_items);
        res.send([global.food_items, global.food_category])

    }catch(e){
        console.log(e);
        res.send("Server Error")
    }
})

module.exports=Router