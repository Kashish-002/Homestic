const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{console.log(err);});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderHut");
}

const initDB=async ()=>{
    await Listing.deleteMany({});
    initdata.data= initdata.data.map((obj)=>({...obj, owner: "68d2cefe68ce6519d48d7904",
    }));
    await Listing.insertMany(initdata.data);
    console.log("Done"); 
}

initDB();