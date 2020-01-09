console.log("CONNECTED")//conectando com o html

var id = document.getElementById("first");//by id
console.log(id)

//Byclass
var second = document.getElementsByClassName("special")[0];
console.log(second)

//queryselector
var query = document.querySelector("p")
console.log(query)

//queryselectorAll

var queryall = document.querySelectorAll("p")[0];
console.log(queryall)

var queryall1 = document.querySelectorAll("#first");
console.log(queryall1);

var queryall2 = document.querySelectorAll(".special")[0];
console.log(queryall2);

