const express = require("express")
const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://omnistack:omnistack@cluster0-se1sy.mongodb.net/AuthDemo?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
  // mongoose.Promise = global.Promise;
});
const app = express()

app.set("view engine", "ejs")

app.get('/',(req,res)=>{
	res.render("home")
})
app.get('/secret',(req,res)=>{
	res.render('secret')
})

app.listen(3000)