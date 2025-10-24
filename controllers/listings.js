const Listing=require("../models/listing.js");

module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm=async (req,res)=>{
   res.render("listings/new.ejs");
}

module.exports.createListing=async (req,res)=>{
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New listing is created");
    res.redirect("/listings");
}

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listings=await Listing.findById(id).populate({path:"reviews", populate:{path:"author"},});
    if(!listings){
        req.flash("error","Listing does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listings});
}

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}

module.exports.updateListing=async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted");
    res.redirect("/listings");
}