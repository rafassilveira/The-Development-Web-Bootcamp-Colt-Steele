var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");


var postSchema = new mongoose.Schema({
   title:String,
   content:String
    
});

var Post = mongoose.model("Post", postSchema);

//User - Email, name

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email:"rafael@rafael.com",
//     name:"Rafael Silveira"
// });

// newUser.posts.push({
//     title:"how to bre ",
//     content:"just kidding"
    
// })

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// })

// var newPost = new Post({
//     title:"Reflections on Apples",
//     content:"They are delicius"
    
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(err)
        
//     }
// });

//POST Title, content


User.findOne({ name: "Rafael Silveira"}, function(err, user){
    if(err){
        // console.log(err);
    } else {
        user.posts.push({
            title: "3 Thing I really Hate",
            content:"Voldemort Voldemort Voldemort"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
    
});
