var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app  = express();
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

//App Config
mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser:true});

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE/MODEL Config
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date,default: Date.now()}
});

var Blog = mongoose.model("Blog",blogSchema);
/*
Blog.create({
    title:"Test Blog",
    image:"https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=755&q=80",
    body:"This is a test Blog"
});

*/
//RESTFUL ROUTES


app.get("/",function(req,res){
    res.redirect("/blogs");
});
//INDEX ROUT
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }else{
             res.render("index",{blogs:blogs});
        }
    });
});


//NEW ROUT

app.get("/blogs/new",function(req,res){
    res.render("new");
});


//CREATE ROUTE

app.post("/blogs",function(req,res){
    //Create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newblog){
        if(err){
            res.render("new");
        }else{
    //AND Redirect        
            res.redirect("/blogs");
        }
    });
});


//Show Route
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,founBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show",{blog:founBlog});
        }
    })
});


//EDIT ROUTE

app.get("/blogs/:id/edit",function(req, res) {
    Blog.findById(req.params.id,function(err,founBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit",{blog:founBlog});
        }
    });
});

//UPDATE ROUTE

app.put("/blogs/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }    
    });
});


//DELETE ROUTE

app.delete("/blogs/:id",function(req,res){
   Blog.findByIdAndRemove(req.params.id,function(err){
       if(err){
           res.redirect("/blogs");
       }else{
            res.redirect("/blogs");
       }
   });
});

//title
//image
//body
//created




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Blog Server is Running");
})
