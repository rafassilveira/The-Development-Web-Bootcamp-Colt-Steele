//requires
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");
const app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/blogSolution", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
  // mongoose.Promise = global.Promise;
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// mongoose/model config
blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTFULL ROUTES
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log("oh no, error :(");
      // com o { blogs: blogs } podemos usar esses dados na pagina da render
    } else res.render("index", { blogs: blogs });
  });
});

app.get("/blogs/new", (req, res) => {
  res.render("new");
});

app.post("/blogs", (req, res) => {
  req.body.blog.body = req.sanitizer(req.body.blog.body);
  // req.body.blog, é o objeto criado quando colocamos os dados no blog[****]
  // assim dessa forma ele retorna algo como{title:"algumacoisa",description:"alguma
  // coisa"}

  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      console.log(err);
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

// SHOW ROUTES
app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id, (err, blogFound) => {
    if (err) {
      console.log(err);
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: blogFound });
    }
  });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      console.log(err);
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

//UPDATE ROUTE

app.put("/blogs/:id", (req, res) => {
  req.body.blog.body = req.sanitizer(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

// DELETE ROUTE
app.delete("/blogs/:id", (req, res) => {
  // destroy blog
  Blog.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});
// PORT LISTEN
app.listen(3000, () => {
  console.log("rodando");
});
