var express = require("express");
var app = express();


app.get("/",function(req,res){
    
    res.send("Hi there, welcome to my assignment");
});


app.get("/speak/:animal",function(req,res){
    var selectedAnimal = req.params.animal;

    if(selectedAnimal ==='pig'){
        res.send(":Oink!");
    }else if(selectedAnimal ==='cow'){
        res.send(":Moo!!");
    }else if(selectedAnimal ==='dog'){
        res.send(":Woof Woof!!");
    }
});

app.get("/repeat/:hello/:count",function(req,res){
    var selCount = req.params.count;
    var count =  parseInt(selCount);
    console.log("Count"+count);
    var message = "";
    for(var iCount = 0;iCount < count; iCount++){
       message = message+  req.params.hello+"<br>"
    }
     res.send(message);
});

 app.get("*",function(req, res) {
     res.send("Sorry page not found..what are you doing with your life ?");
 });

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has Started");
});
