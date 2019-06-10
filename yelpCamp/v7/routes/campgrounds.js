var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX Page show all Camp grounds

router.get("/campgrounds",function(req,res){
    console.log(req.user);
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allcampgrounds});
        }
    });
    //
});

router.post("/campgrounds",function(req,res){
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

router.get("/campgrounds/new",function(req, res) {
   res.render("campgrounds/new") 
});

//SHOW
router.get("/campgrounds/:id",function(req, res) {
    //find the campground that provided ID
   //res.send("This will be the show page ") NEED TO UNDERSTAND 
   Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
      if(err){
          console.log(err);
      } else{
        res.render("campgrounds/show",{campground:foundCampground});
      }
   });
});


module.exports = router;