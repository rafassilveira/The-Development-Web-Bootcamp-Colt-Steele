var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name:String,
    age:Number,
    temperament:String
});

var Cat = mongoose.model("Cat",catSchema);
/*
var george = new Cat ({
    name:"George",
    age:11,
    temperament:"grouchy"
})

george.save(function(err, cat){
    if(err){
        console.log("Something went wrong!");
    } else{
        console.log("We just saved a at to the DB:")
        console.log(cat)
    }
        
    
})
*/

Cat.create({
    name:"Show white",
    age:15,
    temperament:"nice"
},function (err,cat) {
    if(err){
        console.log(err)
        
    }else{
        console.log(cat);
    }
    // body...
})

Cat.find({}, function(err, cats){
    if(err){
        console.log("Oh no, error");
        console.log(err);
    }else{
        console.log("all the cats..")
        console.log(cats);
    }
})