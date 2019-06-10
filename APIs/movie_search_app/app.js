var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");


app.get("/",function(req,res){
    res.render("search");
});

app.get("/results", function (req,res){
    
    console.log(req.query.search);
    var state  = req.query.search;
    
    var reqURL1 = "http://www.omdbapi.com/?i=tt3896198&apikey=thewdb";
    var reqURL2 = "http://www.omdbapi.com/?s="+state+"&apikey=thewdb";
    request(reqURL2,function(error,response,body){
       if(!error && response.statusCode == 200){
           //var results = JSON.parse(body);
           //res.send(results["Search"][1]["Title"])
           var data = JSON.parse(body);
           res.render("results",{data:data});
       } 
    });
  // res.send("Hello, it Works"); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started !");
});