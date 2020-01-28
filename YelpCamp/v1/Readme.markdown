```javascript

router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
router.put("/:id", checkCampgroundOwnership, function(req, res) {
router.delete("/:id", checkCampgroundOwnership, (req, res) => {

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
  - [x] criando a rota update method PUT
    - [x] usando findByidAndUpdate para atualizar os dados
  - [x] Inserindo link para edit
  -
  - [x] Fix \$set problme
## 354. Campground Destroy
  **Deleting Camgrounds**
    - [x] Criando a rota delete
      - [x] Usando o mentodo do mongoose findByIDAndRemove para deletar
	  - Obs: tiveque usar o delete, porque é deprecado o Remo
    - [x] Criando um form com action method delete abaixo do edit
  **Estilizando o botão delete**
  	- [x] inserindo um id no form- delete-form
## 356. Campground Authorization 
  **Authorization**
  - Autorização é assegurar o que determinado usuário tem acesso,
  - Começando pela rota edit
    - Verificar se o usuário está logado
      - req.isAuthenticated()
      - Se esse usuário é dono do camp
    - se não redireciona
    - obs:foundCampground.author.id === req.user._id
      - foundCampground.author.id.equals(req.user._id)
  - criando a função checkCampgroundOwnership para ummiddleware e ser reutilizado nas outras rotas
  - Escondendo os botões de EDIT adn DELETE
    - arquivo show.ejs
      - criando um if verificando o usuário dono é o mesmo que está logado




