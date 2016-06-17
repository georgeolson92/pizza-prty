
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
  $(".radio-delivery #delivery").click(function(){
    $("#address-section").addClass("yespls").fadeIn();
  });
  $(".radio-delivery #pickup").click(function(){
    $("#address-section").removeClass("yespls").fadeOut();
  });

  $("form#pizza-order").submit(function(event){
    debugger;
    event.preventDefault();

    // collect info from user and create new object
    var pizzaSize = $(".radio-size input[type='radio']:checked").val();
    var pizzaName = $("input#name").val();
    var pizzaDelivery = $("input[name='radio-delivery']:checked").val();
    console.log(pizzaDelivery);
    var pizzaAddress = $("input#street").val();
    var pizzaCity = $("input#city").val();
    var pizzaState = $("select#state").val();
    var pizzaZip = $("input#zip-code").val();
    console.log(pizzaName);
    console.log("Street: " + pizzaAddress);
    console.log("City: " + pizzaCity);
    console.log("State: " + pizzaState);
    console.log("ZIP: " + pizzaZip);

    if (pizzaName === "") {
      $(".form-group-name").addClass("has-error").append("<span class='errormsg'>Please enter your name.</span>");
      return false;
    } else {
      $(".errormsg").remove();
      $(".form-group-name").removeClass("has-error");
    }

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
    $(".name").text(pizzaName);
    $("#pizza-size-result").text(pizzaSize);
    if (pizzaToppings != ""){
      for (var index = 0; index < pizzaToppings.length; index += 1) {
        $("#toppings-result").append("<li>" + pizzaToppings[index] + "</li>");
      }
      $("#withtoppings").show();
    } else {
        $("#withtoppings").hide();
    }
    $(".price").text("$" + neworder.price);

    if ($("#address-section").hasClass("yespls")){
      $("#address-result").show();
      $(".address-result").text(pizzaAddress + ", " + pizzaCity + ", " + pizzaState + ". " + pizzaZip);
    }


    $("#receipt").slideDown();

    $("input").attr('checked', false);

  });

});
