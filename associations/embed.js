var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/blog_demo',{ useNewUrlParser: true });

//Two Models 
//POST - title , content- Define first so this can be sued in users
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

//USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name:String,
    posts : [postSchema]
});

var Post = mongoose.model("Post",postSchema);

var User = mongoose.model("User",userSchema);

/*


var newUser = new User({
    email:"abc@admin.edu",
    name:"Thia Stilton",
});

newUser.posts.push({
    title:"Jack Rabbit",
    content:"Adventure Stories"
});

newUser.save(function(err,user){
   if(err){
       console.log(err);
   }else{
       console.log(user);
   }
    
});
*/
/*
var newPOst = new Post({
    title:"Mobi dick",
    content:"Story of a whale"
});

newPOst.save(function(err,post){
   if(err){
       console.log(err);
   } else{
       console.log(post);
   }
});
*/

//Find User
/*
User.findOne({name:"Thia Stilton"},function(err,user){
   if(err){
       console.log(err);
   } else{
       console.log(user);
   }
});

*/

//Add additional post

User.findOne({name:"Thia Stilton"},function(err,user){
   if(err){
       //console.log(err);
   } else{
       user.posts.push({
           title:"Jack Rabbit",
           content:"Its a awsome book"
       });
       user.save(function(err,user){
         if(err){
               console.log(err);
           } else{
               console.log(user);
           }
         });
   }
});

