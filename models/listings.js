const mongoose=require("mongoose");

const listingSchema=mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        set:(v)=>v===""?"default":v,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
        require:true,
    },
    country:{
        type:String,
    }

});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
