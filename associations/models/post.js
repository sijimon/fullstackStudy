var mongoose = require("mongoose");
//POST - title , content-
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
//var Post = mongoose.model("Post",postSchema);
//Export the Model
module.exports = mongoose.model("Post",postSchema);
