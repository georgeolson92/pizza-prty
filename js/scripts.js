






$(document).ready(function(){


  $("form#pizza-order").submit(function(event){
    event.preventDefault();
    var pizzaSize = $(".radio-size input").val();
    var pizzaToppings = [];
    $.each($("input[name='topping']:checked"), function(){
      pizzaToppings.push($(this).val());
    });

    console.log(pizzaSize);
    console.log(pizzaToppings);
  });





});
