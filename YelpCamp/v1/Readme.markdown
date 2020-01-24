```javascript
routesroutes\camgrounds.js;

router.get("/:id/edit", (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/edit", { campground: foundCampground });
    }
  });
});

viewsviews\campgroundsviews\campgrounds\edit.ejs;
```

# YelpCamp: Update and Destroy

## 353. Campground Edit and Update

- **Editing Camgrounds**
  - [x] yarn add method-override --save
    - [x] require no app.js
    - [x] app.use(methodOverride('\_method'))
  - [ ] Add Edit Route for Canpground
    - [x] criando a rota edit
      - [x] Usando o findById no arrayy de Campgrond pelo req.params.id
      - [x] se encontrar o campground(foundCmapground) atribuir ao campground
      - [x] para que o formulário tenha acesso
    - [x] criando o arquivo edit view/campgrounds
    - [x] criando o formulario
      - [x] usando o ?_method=PUT
      - [x] mudando os placeholder por value, para carregar os dados
      - [x] inserindo em um objeto chamda campgroud[] os nomes do input
  - [ ] criando a rota update method PUT
    - [ ] usando findByidAndUpdate para atualizar os dados
  - [ ] Inserindo link para edit
  -
  - [ ] Fix \$set problme
## 354. Campground Destroy
  **Deleting Camgrounds**
    - [ ] Criando a rota delete
      - [ ] Usando o mentodo do mongoose findByIDAndRemove para deletar
    - [ ] Criando um form com action method delete abaixo do edit
    - [ ] 
