var bodyParser  = require("body-parser"),
methodOverride  = require("method-override"),
expressSanitizer= require("express-sanitizer"),
mongoose        = require("mongoose"),
express         = require("express"),
app             = express();
//APP CONFIG 
mongoose.connect("mongodb://localhost/restful_blog_app");
//ejs
app.set("view engine", "ejs")
app.use(express.static("public"));
//body parser
app.use(bodyParser.urlencoded({extended:true}));

app.use(expressSanitizer());

//method override server para sobescrever as informações jogadas no get ou post
app.use(methodOverride("_method"));

//DATA BASE SCHEMA// MONGOOSE /MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{
        type: Date,default: Date.now}
});


var Blog = mongoose.model("Blog", blogSchema);



//RESTFUL ROUTES

app.get("/", function(req, res){
    res.redirect("/blogs")// redireciona para outra rota
});
//INDEX ROUTE
app.get("/blogs",function(req, res) {
     // recupera todos os dados do banco de dados
    Blog.find({},function(err, blogs){
        if(err){
            console.log("ERROR")
        } else {
            //dados banco passados para blogs, sao armazenados nessa variavel de 
            // mesmo nome, depois usamosna outra pagina para puxar os dados
           res.render("index", {blogs: blogs});
        }
    });
});

//NEW ROUTE
app.get("/blogs/new",function(req, res) {
    res.render("new");
})
//CREATE ROUTE
app.post("/blogs", function(req,res){
    //create
        Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new")
        } else {
            res.redirect("/blogs")
        }
    });
});


//show Routes
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            
            res.render("blogs")
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
})

//EDIT ROUTE 
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err){
            
        }else {
            res.render("edit", {blog: foundBlog});
        }
        
    })
})

//UPDATEROUTE
app.put("/blogs/:id",function(req, res){
                         //id--            --data       --callback
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateDBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE ROUTE

app.delete("/blogs/:id", function(req,res){
    //destroy
    Blog.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
})
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING");
})



