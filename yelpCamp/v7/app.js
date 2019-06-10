var express     = require("express"),
 app         = express(),
 bodyParser  = require('body-parser'),
mongoose        = require("mongoose"),
passport        = require("passport"),
LocalStrategy   = require("passport-local"),

Campground      = require("./models/campground"),
Comment         = require("./models/comment"),
User            = require("./models/user");
var seedDB      = require("./seeds");
var commentRoutes = require("./routes/comments"),
campgroundRoutes = require("./routes/campgrounds"),
indexRoutes = require("./routes/index")

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


app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT,process.env.I, function(){
    console.log("Yelp Camp Server Started");
});