var numSquares =6;
//Array com todas as cores dos quadrados
var colors = generateRandomColors(numSquares);
//pega todos as classe com.square,ou seja todos os quadrados
var squares = document.querySelectorAll(".square");
// escolhe um cor que o jogador terá que acerta
var pickedColor = pickColor();
// variavel para armazenar o rgb a ser acertado
var colorDisplay = document.getElementById("colorDisplay");
// variavel para mostrar se o usuario acertou ou nao
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode")

for(var i=0; i < modeButtons.length;i++ ){
    modeButtons[i].addEventListener("click", function () {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        this.textContent === "Easy" ? numSquares = 3: numSquares =6;
        reset();
    });
       

}

function reset() {
    colors = generateRandomColors(numSquares);
    // pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay tp match picked color;
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    //change colors of squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }

    }
    h1.style.background = "steelblue";

}

// inclui no html os numeros do RGB, para que o usuario 
//tente advinhar qual é a cor

resetButton.addEventListener("click", function () {
    reset();    
})
colorDisplay.textContent = pickedColor;

//
for (var i = 0; i < squares.length; i++) {
    //add intial colors to squares
    squares[i].style.backgroundColor = colors[i];

    //add click listeners to squares
    squares[i].addEventListener("click", function () {
        // grab color of clicked square
        var clickedColor = this.style['background-color'];
        // console.log(this.style.background-color.);O exemplo de cima é pra funcionar no firefox
        //compare color to picked color
        if (clickedColor === pickedColor) {
            messageDisplay.textContent = "Correct!!"
            resetButton.textContent = "Play Again?";
            // usa a cor clicada com parametro
            changeColors(clickedColor)
            h1.style.background = clickedColor;

        } else {
            this.style.backgroundColor = "#232323"
            messageDisplay.textContent = "Try Again!"
        }

    });
}

// Assim que ousuarioacerta a cor todos os
// quadrados restante faicam da mesma cor
function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}

// essa função faz gerar um numero de 0 a 5 aleatorio, e colocar na variavel color
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

//Essa função faz qu vc escolha a quantidade de quadrados  e pega a as cores aleatrorias
//geradas pela função random colors
function generateRandomColors(num) {
    //make an array
    var arr = []
    //add random color to array
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor())
    }
    //returnthat array
    return arr;
}

//gera cores aleatorias
function randomColor() {
    //PICK A "RED" from 0-255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from 0-255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from 0-255
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}