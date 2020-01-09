var express = require("express")
var app = express();

app.get("/", function(req, res){
    res.send(" Hi there, welcom to my assigment!")
});

app.get("/speak/:animal", function(req, res){
    var sounds ={
        pig:"Oink",
        cow:"Moo",
        dog:"Woof Woof!",
        cat:"I hate yo human",
        goldfish: "..."
    }
   
   
    var animal = req.params.animal.toLowerCase();
    var sound =sounds[animal];

     res.send("The "+ animal +" says '" + sound + "'");
});

app.get("/repeat/:message/:times", function(req, res) {
   var message = req.params.message;
   var times = Number(req.params.times);
   var result =""
   
   for(var i=0; i < times; i++){
       // Usamos essa variável  poruqe podemos fazer uma reqeste somente uma vez, 
     result+=message +" " ;
   };
   res.send(result)
});




app.get("*", function(req, res){
    res.send(" Sorry , page not found.. what are you doing with your life?");
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started");
});