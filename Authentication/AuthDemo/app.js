const express = require("express")
const mongoose = require("mongoose")
const User = require('./models/user')
const passport = require('passport')
const bodyParser = require('body-parser')
const LocalStrategy = require ('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')


mongoose.connect("mongodb+srv://omnistack:omnistack@cluster0-se1sy.mongodb.net/AuthDemo?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
  // mongoose.Promise = global.Promise;
});
const app = express()
app.set("view engine", "ejs")


app.use(require('express-session')({
	secret:"Bula the best dog",
	resave:false,
	saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser)
app.get('/',(req,res)=>{
	res.render("home")
})
app.get('/secret',(req,res)=>{
	res.render('secret')
})

app.listen(3000)