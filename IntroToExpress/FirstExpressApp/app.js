var express = require("express")

var app = express();

// "/" => "hi there"
app.get("/", function(req, res) {
    
    res.send("hi there");
    
});
// "\" => "Bye"
app.get("/bye", function(req,res){
    res.send("Good Bye")
});
// "/dog" => "mewow"

app.get("/dog",function(req, res) {
    res.send("MEow")
});

app.get("/r/:subredditName", function(req, res){
    var subredditName = req.params.subredditName;
    res.send("Welcome to " + subredditName.toUpperCase() + " subreddit")
    
});

app.get("/r/:subredditName/coments/:id/:title/", function(req, res) {
    res.send("Welcome to comments pagge")
})

app.get("*", function(req, res){
    res.send("YOU ARE STAR!!")
});

//tell Express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});