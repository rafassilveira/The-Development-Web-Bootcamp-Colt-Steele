var express = require("express")
var app = express();
//Para funcionar a linha 18
var bodyParser = require("body-parser");


var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/", function(req,res){
    res.render("home")
    
})

app.post("/addfriend",function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", function (req,res) {
   res.render("friends",{friends: friends}); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log(" Server is listening")
})