const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Array com dos dados, que logo estão no banco de dados
var campgrounds = [
  {
    name: "Naruto",
    image:
      "https://img.quizur.com/f/img5d7e82aae2ede9.52928847.jpg?lastEdited=1568572087"
  },
  {
    name: "Itachi",
    image:
      "https://nerdhits.com.br/wp-content/uploads/2019/11/cats-6-750x410.jpg"
  },
  {
    name: "Sasuke",
    image:
      "https://img.quizur.com/f/img5ce0a5bd0cc8d6.58477652.jpg?lastEdited=1558226371"
  },
  {
    name: "Naruto",
    image:
      "https://img.quizur.com/f/img5d7e82aae2ede9.52928847.jpg?lastEdited=1568572087"
  },
  {
    name: "Itachi",
    image:
      "https://nerdhits.com.br/wp-content/uploads/2019/11/cats-6-750x410.jpg"
  },
  {
    name: "Sasuke",
    image:
      "https://img.quizur.com/f/img5ce0a5bd0cc8d6.58477652.jpg?lastEdited=1558226371"
  }
];
// Para que o express entenda o bovy-parser
app.use(bodyParser.urlencoded({ extended: true }));
// Dizendo para express que arquivos ejs não precisar digitar a extensão ejs
app.set("view engine", "ejs");
// rota inicial, rederiza o landing.ejs
app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  // enviando o array campgrounds como campgrounds
  res.render("campgrounds", { campgrounds: campgrounds });
});
app.post("/campgrounds", (req, res) => {
  // pegando o name do formulario e armazenando na variavel name
  var name = req.body.name;
  // pegando a url da imagem do formulario e armazenando na variavel imagem
  var image = req.body.image;
  // armazenando em uma nova variavel o obejto contendo o nome e image anteriormente armazenado
  var newCampground = { name: name, image: image };
  // jogando os novos registros para a arrya campgrounds
  campgrounds.push(newCampground);
  // depois de enviar redireciona para a pagina campgrounds
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

app.listen(3000, () => {
  console.log("rodando");
});
