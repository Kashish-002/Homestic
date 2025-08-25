const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const wrapAsync=require("./utils/wrapAsync.js");
const {listingSchema}=require("./schema.js");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));


main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{console.log(err);});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderHut");
}

//index route
app.get("/listings", wrapAsync(async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//new listing
app.get("/listings/new",wrapAsync(async (req,res)=>{
    res.render("listings/new.ejs");
}));

//create route
app.post("/listings",wrapAsync(async (req,res)=>{
    const result=listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error);
    }
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");}
) );

//show route
app.get("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listings=await Listing.findById(id);
    res.render("listings/show.ejs",{listings});
}));

//edit route
app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//put request for edit
app.put("/listings/:id",wrapAsync(async (req,res)=>{
     if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing");
    }
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

// app.get("/testlisting",(req,res)=>{
//     res.send("working");
// });

// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"Page not found"));
// });

app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong"}=err;
   
    res.render("listings/error.ejs",{message});
});

app.listen(8080,()=>{
    console.log("Listening");
});