const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
let MDB_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then((res)=>{console.log("connected to DB.");}).catch((err)=>{console.log(err);});
async function main(){
    await mongoose.connect(MDB_URL);
};

const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);     //'data' is a key pair @ last in data.js file N initData is obj in itself.
    console.log("database was initialised.")
};
initDB();

