var express = require("express");
var app = express();
var bodyParser = require('body-parser')
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

    var campgrounds = [
        { name:"Strone Woods", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
        { name:"Granite Hills",image:"https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg"},
       { name:"Strone Woods", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
        { name:"Granite Hills",image:"https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg"},
       { name:"Strone Woods", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
        { name:"Granite Hills",image:"https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg"}
        ];


app.get("/",function(req,res){
    //res.send("This will be the Landing PAge");
     res.render("landing");
})


app.get("/campgrounds",function(req,res){

    
     res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    //res.send("You hit the post rout");
    var name = req.body.name;
    var image = req.body.image;
    var newCampGround = {name:name,image:image};
    campgrounds.push(newCampGround);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req, res) {
   res.render("new") 
});

app.listen(process.env.PORT,process.env.I, function(){
    console.log("Yelp Camp Server Started");
});