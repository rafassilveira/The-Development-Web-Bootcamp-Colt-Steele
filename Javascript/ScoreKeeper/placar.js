var p1Button = document.querySelector("#p1");
var p2Button = document.getElementById("p2");
var resetButton = document.getElementById("reset");
var p1board = document.getElementById("p1board");
var p2board = document.getElementById("p2board");
var input = document.querySelector("input")
var winningScoreDisplay= document.querySelector("p span");
var p1score = 0;
var p2score = 0;
var gameOver = false;
var winningScore = 5;

p1Button.addEventListener("click", function() {
  if (gameOver === false) {
    p1score++;
    if (p1score === winningScore) {
      p1board.classList.add("winner");
      gameOver = true;
    }
    p1board.textContent = p1score;
  }
});

p2Button.addEventListener("click", function() {
  if (gameOver === false) {
    p2score++;
    if (p2score === winningScore) {
      p2board.classList.add("winner");
      gameOver = true;
    }
  }

  p2board.textContent = p2score;
});

resetButton.addEventListener("click", function() {
  p1score = 0;
  p2score = 0;
  p1board.textContent = 0;
  p1board.textContent = 0;
  gameOver = false;
  p1board.classList.remove("winner");
  p2board.classList.remove("winner");
});

input.addEventListener("change",function () {
  //change é usado quandoo usuario muda qualquer valor no input
  winningScoreDisplay.textContent=this.value;
  //pega o valor do inpu
  winningScore =Number(this.value);
  //number transforma o dado do input em um numero ao inves a string
  
})
