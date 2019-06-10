var express     = require("express"),
 app         = express(),
 bodyParser  = require('body-parser'),
mongoose        = require("mongoose"),
Campground      = require("./models/campground"),
Comment         = require("./models/comment");
var seedDB      = require("./seeds")
mongoose.connect('mongodb://localhost:27017/yelp_cam_v3',{ useNewUrlParser: true });

seedDB();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
//SCHEMA SETUP

/*var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);*/

/*
Campground.create({
name:"Strone Woods", 
image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"
}, function(err,campground){
    if(err){
        console.log(err);
    }else{
        console.log("Camp Ground Added ");
        console.log(campground);
    }
});

*/
/*
    var campgrounds = [
        { name:"Strone Woods", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
        { name:"Granite Hills",image:"https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg"},
       { name:"Strone Woods", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
        { name:"Granite Hills",image:"https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg"},
       { name:"Strone Woods", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
        { name:"Granite Hills",image:"https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg"}
        ];
*/

app.get("/",function(req,res){
    //res.send("This will be the Landing PAge");
     res.render("landing");
})


app.get("/campgrounds",function(req,res){

    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index",{campgrounds:allcampgrounds});
        }
    });
    //
});

app.post("/campgrounds",function(req,res){
    //res.send("You hit the post rout");
    var name = req.body.name;
    var image = req.body.image;
    var dsc = req.body.description;
    var newCampGround = {name:name,image:image,description:dsc};
   // campgrounds.push(newCampGround);
   //Create a new campground and save to DB
   Campground.create(newCampGround,function(err,newcampground){
       if(err){
           console.log(err);
       }else{
             res.redirect("/campgrounds");
       }
   });
});

app.get("/campgrounds/new",function(req, res) {
   res.render("new") 
});

//SHOW
app.get("/campgrounds/:id",function(req, res) {
    //find the campground that provided ID
   //res.send("This will be the show page ") NEED TO UNDERSTAND 
   Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
      if(err){
          console.log(err);
      } else{
        res.render("show",{campground:foundCampground});
      }
   });
});


app.listen(process.env.PORT,process.env.I, function(){
    console.log("Yelp Camp Server Started");
});