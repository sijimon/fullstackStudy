var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/",function(req,res){
    //res.send("This will be the Landing PAge");
     res.render("landing");
})



//================AUTH ROUTE=========================

//Show Register Form
router.get("/register",function(req, res) {
   res.render("register"); 
});

//Handle Signup Logic
router.post("/register",function(req, res) {
   // res.send("Signing you up");
   
    var newUser = new User({username:req.body.username});
    
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
    });
});

//Show login form

router.get("/login",function(req, res) {
    res.render("login");
});

//Handle Login request logic using Middle ware
router.post("/login",passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
    
}),function(req, res) {
   //res.send("Login Logic happens here"); 
});


//Log out Route

router.get("/logout",function(req, res) {
   req.logout();
   res.redirect("/campgrounds");
});

//Middle ware to  check logged in user
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){    
        return next();
    }
    res.redirect("/login");
}


module.exports = router;