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
    - Criando um rota delete
      - deletando pelo id do comentadio
  - Add Delete button
  - obs:
    - Campground Destroy Route: /campground/:id
    - Comment Destroy Route:    /campground/:id/comment/:comment_id

## 361. Comment Authorization
**Authorization Part 2: Comments**
  - User can only edit and delete his/her comments
  - Hide/Show edit and delete buttons
  - Usando o midleware como referência

# Seção 38: YelpCamp: UI Improvements
  ## 362. Refactoring Middleware
  **Refactoring Middleware**
    - Criando uma pasta na raiz middlaware
      - criando um arquivo index.js
        - index.js porque por padrão o express já entende que é o arquivo padrão
      - criar um objeto onde ficaram os middlewares middlewareObj={}
      - exportar o objeto
      - Importar os os middlewares nos arquivos em que vao ser usados
        - Colocar o caminho correto
      - Importar os models de campgrounds e comments
  ## 363. Flash Messages: Installation
    - Instalando o pacote connect-flash
    - Require no app.js como flash, antes do passport
      - app.use(flash())  
    - Essa biblioteca irá nos ajudar a trabalhar menssagens para o usuário, pode ser menssagem de sucesso ou de error
    - Basicamente vamos usar a seguinte sintaxe
      - req.flash("key","mensagem")
        - Key será a chave para acessarmos a flash da referida menssagem
        - é importante configurar o req.flash antes de redirecionar para o template ou route

  ## 365.Flash Messages: Adding Bootstrap
    - Invés de colocarmos a variável message em todas as possiveis paginas, vamos coloca-la no nosso final head
    - Vamos usar o res.locals.message=req.flash('error'), para deixar essa mensagem disponivel para todas as nossas rotas
      - Assim como no currentUser
    - Criando um nova mesagem depois do logout
    - add bootstrap sucess
    - mudando os nomes da variavel do flash
      - criando uma para error e outra para sucess
      - criando if para mostrar apenas uma flash

  ## 366. Flash Messages: Helpful Errors
    - colcando flash message nos middleware
  
  ## 367 . Erro Handling erro in production
    - Inserindo um operador OR e negação de comentários e campgrounds para verificar se existem
  ## 368 .Landing Page Refactor
  obs: Vamos criar imagens em fullscreen no background, com transições a cada 10s
    - Edit the landing.ejs 
      - add bootstrap
      - new stylesheets, landing.css
    - edit public\stylesheets\landing.css
      - add background color
      -  Usando z index para colocar o botão na frente das imgens do fundo,
         -  O z index serve para ter essa perspectiva de de dentro para fora, fundo e perto
      - Para que funcione o z index temos que usar o position relative, porque por padrao é static
      - Estilizar as listas para que fica inteira atráves da página
      - incluir as urls das imagens na lista
        -  com a duração de delay de 10 em 10s para cada imagem
     - Criando keyframe
       - As imagens tem 10s de delay para aparecer,
       - Quando começa uma nova imagen, inicia o fadein que 0% a 10% da duração da animação
       - fica 10% com a imagem sólida
       - inicia o fadeout da imagem atual e o fadein da proxima imagem
       - por um breve periodo de tempo fica asduas imagens na tela um em fadein e outra fadeout
     - usando o modernizer para fazer que a nossa aplicação possa ser visualizda em outros navegadores sem maiores problemas
       - Setamosno head do html, colocamos async para queo javascript possa fazer outras coisas simultaneamente
       - 
  ## Dynamic Price Feature
  Agora vamos fazer que o usuário possa editar o preço di campground e para isso vamos ter que fazer algumas alterações no nosso código
      -  Incluir no model campground a propriedade price como string
      -  Incluir no Input do formulário de criação e edição o campo price
         -  type number
         -  min 0.01 
         -  step 0.01
      - Não esquecer de trazer o campground[price] no edit
      - editar show.ejs
      - inserir a variavel price no routes posr campground
  ## Login and Sign Up
  






  