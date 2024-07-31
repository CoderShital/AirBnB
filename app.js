const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

app.set("views" , path.join(__dirname, "views"));
app.set("view engine", "views");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

let port = 8080;
let MDB_URL = "mongodb://127.0.0.1:27017/wanderlust";


main().then((res)=>{console.log("connected to DB");}).catch((err)=>{console.log(err);});
async function main(){
    await mongoose.connect(MDB_URL);
};

app.delete("/listing/:id", async(req, res)=>{
    let {id} = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/listing");
})

app.put("/listing/:id", (req, res)=>{
    let {id} = req.params;
    let {title:newTitle,description:newDescription,image:newImage,price:newPrice,location:newLocation,country:newCountry} = req.body;
    Listing.findByIdAndUpdate(id, {title:newTitle,description:newDescription,image:newImage,price:newPrice,location:newLocation,country:newCountry}, {runValidators:true, new:true});
    res.redirect("./listing");
});

app.get("/listing/:id/edit", async(req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing});

});

app.post("/listing", async (req, res)=>{
    let {title,description,image,price,location,country} = req.body;
    let newListing = new Listing({
        title:title,
        description:description,
        image:image,
        price:price,
        location:location,
        country:country
    });
    await newListing.save()
    res.redirect("/listing");
})

app.get("/listing/new", (req, res)=>{
    res.render("./listings/new.ejs");
})

app.get("/listing/:id", async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", {listing});
});

app.get("/listing", async (req, res)=>{
    //taking entire list
    let allListing = await Listing.find({});
    res.render("./listings/index.ejs", {allListing});
});









// app.get("/list", async(req,res)=>{
//     let testlst = new Listing({
//         title:"Own Iland",
//         descrip:"Entire cabin in iland",
//         //img:"https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3Njk1NTQxOTQ4NjUxNzg5OQ%3D%3D/original/7636476c-83d6-4420-becf-d807d846274c.jpeg?im_w=720",    
//         price:21801,
//         country:"Finland",
//         loc:"Lohja,Finland"
//     });

//     await testlst.save()
//     console.log("testing successful");
//     res.send("successful testing");
// });

app.get("/", (req, res)=>{
    res.send("Welcome to ROOT");
});

app.listen(port, ()=>{
    console.log(`app is listening on the port ${port}.`)
});