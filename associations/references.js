var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/blog_demo_ref',{ useNewUrlParser: true });

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
    posts : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]
});

var Post = mongoose.model("Post",postSchema);

var User = mongoose.model("User",userSchema);

/*User.create({
    email:"bob@gmail.com",
    name:"Bob Fox"
});

*/
/*
Post.create({
    title:"How to cook the best ertertger part 3",
    content:"kjhkjhkjhblertertah blah blah "
},function (err,post) {
    if(err){
       console.log(err);
   }else{
       User.findOne({email:"bob@gmail.com"},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            foundUser.posts.push(post);
            foundUser.save(function(err,data){
            if(err){
                console.log(err);
            }else{
                console.log(data);
            }
    
            });
            
            
        }
       });
   }
}

);


*/


//Find User
//Find all post for that user

User.findOne({email:"bob@gmail.com"}).populate("posts").exec(function(err,user){
   if(err){
       console.log(err);
   }else{
       console.log(user);
   }
    
});

