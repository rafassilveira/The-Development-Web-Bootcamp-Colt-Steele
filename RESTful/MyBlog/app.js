var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/myblog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//DATA BASE SCHEMA // MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    created:{
        type:Date,default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//ROUTES

//index
app.get("/",function(req,res){
    res.redirect("/blogs")// redireciona para rota "blogs"
})

//new
app.get("/blogs/new", function(req, res) {
    res.render("new");
})

//create
app.post("/blogs", function(req,res){
    //crete
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new")
        } else {
            res.redirect("/blogs")
        }
    });
});

//show
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            res.render("blogs")
        }else{
            res.render("show", {blog: foundBlog});
        }   
    })
})
//edit
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            
        }else{
            res.render("edit", {blog: foundBlog});
        }
    })
})

//Update
app.put("/blogs/:id", function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateDBlog){
        if(err){
            res.redirect("/blogs/");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

//delete

app.delete("/blogs/:id", function(req, res){
    //destroy
     Blog.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
})


app.get("/blogs/",function(req,res){
    // recupera todos os dados do banco de dados
    Blog.find({},function(err, blogs){
        if(err){
            console.log("ERROR")
        }else {
            res.render("index",{blogs:blogs});
        }
    })
})





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING");
})