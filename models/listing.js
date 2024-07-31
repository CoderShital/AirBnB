const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    img: {
        type: String,
        default: "https://media.istockphoto.com/id/136917788/photo/xl-migrating-canada-geese.jpg?s=1024x1024&w=is&k=20&c=ZJaOWuC9MHrVA1s2ZShEQusWNsvUpUi4WF-nzpDCBeI=",
        set: (v) => v === "" ? "https://media.istockphoto.com/id/136917788/photo/xl-migrating-canada-geese.jpg?s=1024x1024&w=is&k=20&c=ZJaOWuC9MHrVA1s2ZShEQusWNsvUpUi4WF-nzpDCBeI="
         : v
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
});

const Listing = new mongoose.model("Listing", listSchema);
module.exports = Listing;