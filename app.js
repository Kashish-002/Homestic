const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{console.log(err);});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderHut");
}

//index route
app.get("/listings",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//new listing
app.get("/listings/new",async (req,res)=>{
    res.render("listings/new.ejs");
});

//create route
app.post("/listings",async (req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//show route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listings=await Listing.findById(id);
    res.render("listings/show.ejs",{listings});
});

//edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//put request for edit
app.put("/listings/:id", async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

// app.get("/testlisting",(req,res)=>{
//     res.send("working");
// });

app.listen(8080,()=>{
    console.log("Listening");
});