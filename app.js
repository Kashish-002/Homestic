const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("../models/listing.js");

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{console.log(err);});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderHut");
}

app.get("/testlisting",(req,res)=>{
    
})

app.listen(8080,()=>{
    console.log("Listening");
});