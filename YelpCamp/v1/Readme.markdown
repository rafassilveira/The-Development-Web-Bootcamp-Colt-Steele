```javascript
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
      - [x] usando o ?\_method=PUT
      - [x] mudando os placeholder por value, para carregar os dados
      - [x] inserindo em um objeto chamda campgroud[] os nomes do input
  - [x] criando a rota update method PUT
    - [x] usando findByidAndUpdate para atualizar os dados
  - [x] Inserindo link para edit
  -
  - [x] Fix \$set problme

## 354. Campground Destroy

**Deleting Camgrounds** - [x] Criando a rota delete - [x] Usando o mentodo do mongoose findByIDAndRemove para deletar - Obs: tiveque usar o delete, porque é deprecado o Remo - [x] Criando um form com action method delete abaixo do edit
**Estilizando o botão delete** - [x] inserindo um id no form- delete-form

## 356. Campground Authorization

**Authorization**

- Autorização é assegurar o que determinado usuário tem acesso,
- Começando pela rota edit
  - Verificar se o usuário está logado
    - req.isAuthenticated()
    - Se esse usuário é dono do camp
  - se não redireciona
  - obs:foundCampground.author.id === req.user.\_id
    - foundCampground.author.id.equals(req.user.\_id)
- criando a função checkCampgroundOwnership para ummiddleware e ser reutilizado nas outras rotas
- Escondendo os botões de EDIT adn DELETE
  - arquivo show.ejs
    - criando um if verificando o usuário dono é o mesmo que está logado

## 358.Comment Edit and Update

**Editing Comments** 
- Add Edit route for comments - Lembrar que a rota está com curta porque já pré-definimos no app.js - "/:comment_id/edit" - render commnets/edit - Add Edit button - show.ejs

    - add template views/comments/edit.ejs
        - mudar o place holder por comment_text
      - Na action do form  não precisamos do objeto campground inteiro, apens do id, para isso vamos simplificar a forma que enviamos o id para esse template, para ter acesso apenas no no id campground
      - Como o req.params.id se refere ao campground, então podemos dar uma nome e enviar para o template ao renderiza-lo
      - Usando o findById em Comment, sobre req.params.comment_id para pegar o id
      -


    - Add Update route
      - Usando o metodo put,
      - Ficará parecido com o put do campgrounds, porém alguns dados são diferentes, como o array, o id do params e do doby
      -

## 360. Comment Destroy

**Deliting Comments**
  - Add Destroy route
    - 
  - Add Delete button
  - obs:
    - Campground Destroy Route: /campground/:id
    - Comment Destroy Route:    /campground/:id/comment/:comment_id
