//check =off specifics todo by clicking
//Em jQuery o método on só funciona no codigo já existente.
//Ou seja quando a pagina carrega
//por isso temos que selecionar o ul, que já existe
// e addcionar aquilo que queremos que o li que esta dentro do ul
$("ul").on("click","li",function(){
    $(this).toggleClass("completed");    
});

//click on x to delete todo
//Faz desaparcer devagar os todos, e remove essa parte do codigo assim que clicado
$("ul").on("click","span",function (event) {
    //isso evita que ative outros elementos do codigo.
    // body,container,li,span
    //faz com que quando span é clicado somente ele é ativado.
    event.stopPropagation();
    $(this).parent().fadeOut(500,function () { 
      $(this).remove();
     });
});

$("input[type='text']").keypress(function (event) {
    //verifica se a tecla enter foi clicada no input
    if (event.which === 13 ) {
    //pega o que foi digitado no input coloca na variável todoText
    var todoText = ( $(this).val()); 
    $(this).val("");
      //criar um novo li e add a ul
      $("ul").append("<li><span> <i class = 'fa fa-trash' > </i> </span>"+ todoText + "</li > ")
    }
    
})

$("#toggle-form").click(function() {
  $("input[type='text']").fadeToggle();
});