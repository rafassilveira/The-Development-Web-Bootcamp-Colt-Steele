const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");
const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

//INDEX - show all campgrounds
router.get("/", function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: allCampgrounds,
        page: "campgrounds"
      });
    }
  });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var price = req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  //Usando callback pra trazer todo o endereço enctrado pelo gogle e 
  // colocando no data
  geocoder.geocode(req.body.location, function(err, data) {
    // se existir um erro ou não existir nenhum dado de endereço irá voltar
    if (err || !data.length) {
      req.flash("error", "Invalid address");
      return res.redirect("back");
    }
    // armazenando a latitude,longitude e endero completo
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress; 

    var newCampground = {
      name: name,
      image: image,
      price: price,
      description: desc,
      author: author,
      location: location,
      lat: lat,
      lng: lng
    };
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        //redirect back to campgrounds page
        console.log(newlyCreated);
        res.redirect("/campgrounds");
      }
    });
  });
});
// New - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

//SHOW show more info about one campground
router.get("/:id", (req, res) => {
  // params:dado da url
  // foundCampground:campground que encontrou;
  // Usando o populate para add o comments
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err || !foundCampground) {
        req.flash("error", "Campground not found");
        res.redirect("back");
      } else {
        console.log(foundCampground);

        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

// Edit campground route

router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    //se encontrar o campground(foundCmapground) atribuir ao campground
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  geocoder.geocode(req.body.location, function(err, data) {
    if (err || !data.length) {
      req.flash("error", "Invalid address");
      return res.redirect("back");
    }
    // usando req.body.campground. poque na rota do edit estamos recebendo
    // o campground encontrado que esta n bando de dados com as informações 
    // já salvas
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
      err,
      campground
    ) {
      if (err) {
        req.flash("error", err.message);
        res.redirect("back");
      } else {
        req.flash("success", "Successfully Updated!");
        res.redirect("/campgrounds/" + campground._id);
      }
    });
  });
});

//Destroy route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndDelete(req.params.id, err => {
    if (err) {
      console.log(err);
    }
    req.flash("error", "Campground Deleted");
    res.redirect("/campgrounds");
  });
});

module.exports = router;
