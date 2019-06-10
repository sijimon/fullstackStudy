var express     = require("express"),
 app         = express(),
 bodyParser  = require('body-parser'),
mongoose        = require("mongoose"),
passport        = require("passport"),
LocalStrategy   = require("passport-local"),

Campground      = require("./models/campground"),
Comment         = require("./models/comment"),
User            = require("./models/user");
var seedDB      = require("./seeds")
mongoose.connect('mongodb://localhost:27017/yelp_cam_v6',{ useNewUrlParser: true });
app.use(express.static(__dirname+"/public"));
seedDB();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret:"This text can be any thing , used for hashing",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   next();
});

//PASSPORT CONFIGURATION


app.get("/",function(req,res){
    //res.send("This will be the Landing PAge");
     res.render("landing");
})


//INDEX Page show all Camp grounds

app.get("/campgrounds",function(req,res){
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
   res.render("campgrounds/new") 
});

//SHOW
app.get("/campgrounds/:id",function(req, res) {
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
//===============================
// COMMENTS ROUTES
//=================================

app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req, res) {
    //Find camp ground by id
    Campground.findById(req.params.id,function(err,campground){
       if(err){
          console.log(err);
      } else{
        res.render("comments/new",{campground:campground});
      }
    });
})


app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
    //lookup campground using id
    //create new comments
    //connect new comment to campground
    //redirect campground show page
    
    
    Campground.findById(req.params.id,function(err,campground){
       if(err){
          console.log(err);
      } else{
            Comment.create(req.body.comment,function(err,comment){
             if(err){
                console.log(err);
            } else{ 
                campground.comments.push(comment);
                campground.save();
                res.redirect('/campgrounds/'+campground._id);
            }
            
            });
      }
    });
    
    
    
    
});


//=======================COMMENT ROUTE==================


//================AUTH ROUTE=========================

//Show Register Form
app.get("/register",function(req, res) {
   res.render("register"); 
});

//Handle Signup Logic
app.post("/register",function(req, res) {
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

app.get("/login",function(req, res) {
    res.render("login");
});

//Handle Login request logic using Middle ware
app.post("/login",passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
    
}),function(req, res) {
   //res.send("Login Logic happens here"); 
});


//Log out Route

app.get("/logout",function(req, res) {
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


app.listen(process.env.PORT,process.env.I, function(){
    console.log("Yelp Camp Server Started");
});