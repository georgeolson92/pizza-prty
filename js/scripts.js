
// Create order object
function Order(size, toppings){
  this.size = size;
  this.toppings = toppings;
}

// Declare global variables
var pizzaToppings = [];
var price = 0;

// Calculate price of order
Order.prototype.priceCalculate = function() {
  var orderPrice = 0;
  if (this.size === "Large"){
    var orderPrice = 16;
    console.log("large price: " + orderPrice);
  } else {
    var orderPrice = 12;
    console.log("reg price: " + orderPrice);
  }
  console.log("Outside of conditional: " + orderPrice);
  for (var index = 0; index < pizzaToppings.length; index += 1) {
    var orderPrice = orderPrice + 1;
  }
  this.price = orderPrice;
  return orderPrice;
}


$(document).ready(function(){
  $("form#pizza-order").submit(function(event){
    debugger;
    event.preventDefault();

    // collect info from user and create new object
    var pizzaSize = $(".radio-size input[type='radio']:checked").val();
    console.log(pizzaSize);
    console.log(pizzaToppings);
    var neworder = new Order(pizzaSize, pizzaToppings);
    console.log("Size of pizza: " + neworder.size);

    // loop through toppings and add to array
    $.each($("input[name='topping']:checked"), function(){
      pizzaToppings.push($(this).val());
    });

    // call on price calculation
    var orderPrice = (neworder.priceCalculate());
    console.log(neworder.price);
    console.log(neworder);
    console.log(neworder.size, neworder.toppings);

    // display results in receipt section
    $("#pizza-size-result").text(pizzaSize);
    for (var index = 0; index < pizzaToppings.length; index += 1) {
      $("#toppings-result").append("<li>" + pizzaToppings[index] + "</li>");
    }
    $(".price").text("$" + neworder.price);
    $("#receipt").slideDown();

  });

});
