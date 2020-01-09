var faker = require('faker');

  console.log("========================")
  console.log("WELCOME TO MY SHOP!")
  console.log("========================")
for(var i=0; i<=10;i++){
    var randomName = faker.commerce.productName(); // Rowan Nikolaus
    var price=faker.commerce.price();

  
    console.log(randomName + " - " + "$" + price);
    
}