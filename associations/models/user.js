var mongoose = require("mongoose");
//var post = require("./model/post");
//USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name:String,
    posts : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]
});


//var User = mongoose.model("User",userSchema);

module.exports = mongoose.model("User",userSchema);

