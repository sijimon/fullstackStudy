var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app',{ useNewUrlParser: true });


var catSchema = new mongoose.Schema({
   name:String,
   age:Number,
   temperament:String
});


var Cat = mongoose.model("Cat", catSchema);

var george = new Cat({
   name:"George",
   age:"11",
   temperament:"Grouchy"
});

george.save(function(err,cat){
    if(err){
        console.log("Something went Wrong");
    }else{
        console.log("We just saved a Cat");
        console.log(cat);
    }    
});

