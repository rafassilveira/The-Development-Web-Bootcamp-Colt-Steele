var express = require("express")
var app = express();

//add um pasta no projeto com express
app.use(express.static("public"));

//deixa como padrao arquivo ejs, não precisando colocar ejs no fim do arquivo, exemplo.ejs
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home")

})
//Torna thing uma variavel no expresss
app.get("/fallinginlove/:thing",function(req, res){
    //cria uma variavel e guarda o que vou digitado no brower
    var thing = req.params.thing;
    //pega a variavel thing e joga ela pro arquivo love.ejs
    res.render("love",{thingVar:thing});
});

app.get("/posts", function(req, res) {
    var posts =[
        {title:"Post 1", author:"Susy"},
        {title:"My adorable dog", author:"Charlie"},
        {title:"Can you believe that?", author:"Someone"}
        ];
        res.render("posts",{posts:posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is listening")
})