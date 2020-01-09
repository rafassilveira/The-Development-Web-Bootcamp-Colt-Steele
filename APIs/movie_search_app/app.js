var express = require("express");
var app = express();
var request = require("request");
//pacote pra não precisa digitar "ejs"
app.set("view engine", "ejs");


app.get("/", function(req, res) {
    //arquivo views/search.ejs
    res.render("search");
})

//route para results
app.get("/results", function(req , res){
    //armazena na variavel o que o usuario digitar na formulario com o nome search
    var query = req.query.search;
     //o filmes que estou fazendo a pesquisa mais a chave ,
    var url = "http://www.omdbapi.com/?s="+ query + "&apikey=thewdb";
   
    request(url, function(error,response,body){
        //apenas seguiar se não tiver erro
        if(!error && response.statusCode ==200){
            //colocar o json do resultado em variavel,objeto
            var data = JSON.parse(body);
            
        
            //{name:dados} o primeiro é o nome o segundo sao os dados que queremos passar 
            res.render("results", {data:data});
        }
    })
})



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started");
})