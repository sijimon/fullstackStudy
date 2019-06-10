var express = require("express");
var app = express();

//Order of rout will make this run always 
// app.get("*",function(req, res) {
//     res.send("YOU ARE A STAR!!!");
// });


app.get("/",function(req,res){
   res.send("Hi There!"); 
});

app.get("/bye",function(req,res){
    res.send("Bye for Now");
});

app.get("/dog",function(req,res){
    res.send("Woof");
});



app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has Started");
});
