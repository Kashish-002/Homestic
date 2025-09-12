const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
};

//index route
router.get("/", wrapAsync(async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//new listing
router.get("/new",wrapAsync(async (req,res)=>{
    res.render("listings/new.ejs");
}));

//create route
router.post("/",validateListing ,wrapAsync(async (req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New listing is created");
    res.redirect("/listings");}
) );

//show route
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listings=await Listing.findById(id).populate("reviews");
    if(!listings){
        req.flash("error","Listing does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listings});
}));

//edit route
router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//put request for edit
router.put("/:id",validateListing ,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

router.delete("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted");
    res.redirect("/listings");
}));

module.exports=router;