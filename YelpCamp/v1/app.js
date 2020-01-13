const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const seedDB = require("./seed");

seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
  // mongoose.Promise = global.Promise;
});

// Para que o express entenda o bovy-parser
app.use(bodyParser.urlencoded({ extended: true }));
// Dizendo para express que arquivos ejs não precisar digitar a extensão ejs
app.set("view engine", "ejs");

// rota inicial, rederiza o landing.ejs
app.get("/", (req, res) => {
  res.render("landing");
});
// INDEX - SHOW ALL DE CAMPGROUDNS
app.get("/campgrounds/", (req, res) => {
  //mostrando todos os campgrounds
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      // enviando o array campgrounds como campgrounds
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});
// CREATE-ADD TO CAMPGROUND TO DB
app.post("/campgrounds/", (req, res) => {
  // pegando o name do formulario e armazenando na variavel name
  var name = req.body.name;
  // pegando a url da imagem do formulario e armazenando na variavel imagem
  var image = req.body.image;
  var desc = req.body.description;

  // armazenando em uma nova variavel o obejto contendo o nome e image anteriormente armazenado
  var newCampground = { name: name, image: image, description: desc };
  // Create a new campground adn save to DB
  Campground.create(newCampground, (err, newcreated) => {
    if (err) {
      console.log(err);
    } else {
      // depois de enviar redireciona para a pagina campgrounds
      res.redirect("/campgrounds/");
    }
  });
});

// NEW - FORM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

//SHOW show more info about one campground
app.get("/campgrounds/:id", (req, res) => {
  // params:dado da url
  // foundCampground:campground que encontrou;
  // Usando o populate para add o comments
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);

        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});


//----- Comments Route ---------\\

app.get('/campgrounds/:id/comments/new', (req, res)=>{
	res.send('Rá pegadinha do malanndro')
})

app.listen(3000, () => {
  console.log("rodando");
});
