const mongoose=require("mongoose");

const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{     
    filename: String,
    url:{
        type:String,
        default:"https://plus.unsplash.com/premium_photo-1678286771657-cf22aa97faf0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    set:(v)=>
        v ===""
    ? "https://plus.unsplash.com/premium_photo-1678286771657-cf22aa97faf0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    },
    },

    price:{
        type:Number,
    },
    location:{
        type:String,
       required:true,
    },
    country:{
        type:String,
    }

});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
