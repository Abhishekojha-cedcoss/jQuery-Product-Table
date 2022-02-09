var products = { product: [] };
$(document).ready(function () {
  $("#add_product").on("click", function () {
    var id = $("#product_sku");
    var Name = $("#product_name");
    var price = $("#product_price");
    var qty = $("#product_quantity");
    if (checkData(id, Name, price, qty)) {$("#notification").fadeOut();

    if (getProduct(id.val()).length == 0) {
      add(id.val(), Name.val(), price.val(), qty.val());

      displayMsg("Product added Successfully.");
      display(products.product);
    } else {
      displayError(
        "Product with this id already exist!",
        0
      );
    }
  }else {
    displayError(error, 1);
  }
}
  );
});

//Adding to json
function add(pid, pName, price, qty) {
  products.product.push({
    Id: pid,
    productName: pName,
    productPrice: price,
    productQty: qty,
  });
  ;
}

//Display the success message
function displayMsg(msg) {
  $("#notification").fadeIn();
  $("#notification").removeClass("error-msg");
  $("#notification").addClass("success-msg");
  $("#notification").css("background-color","green");
  $("#notification").html(error);
  $("#notification").fadeOut(30);
}


//Validating the data
function checkData(pid, Name, price, qty) {
  var flag = true;

  if (pid.val().length == 0) {
    error.push({ type: "error", msg: "SKU field is empty." });
    flag = false;
  } else if (Name.val().length == "") {
    error.push({ type: "error", msg: "Name filed is empty." });
    flag = false;
  } else if (price.val().length == 0) {
    error.push({ type: "error", msg: "Price field is empty" });
    flag = false;
  } else if (qty.val().length == 0) {
    error.push({ type: "error", msg: "Quantity field is empty" });
    flag = false;
  } else if (isNaN(pid.val())) {
    error.push({ type: "error", msg: "SKU field should be integer." });
    flag = false;
  } else if (!isNaN(Name.val())) {
    error.push({ type: "error", msg: "Name filed should be string." });
    flag = false;
  } else if (isNaN(price.val())) {
    error.push({ type: "error", msg: "Price field should be integer" });
    flag = false;
  } else if (isNaN(qty.val())) {
    error.push({ type: "error", msg: "Quantity field should be integer" });
    flag = false;
  } else {
    error.shift();
  }

  return flag;
}

//Accessing The Product
function getProduct(pid) {
  var prod = products.product.filter((element, idx) => {
    return element.Id === String(pid);
  });
  // console.log(pr);
  return prod;
}

//Displaying the table
function display(pr) {
  var str = `<table>
    <tr><th>SKU</th><th>Name</th><th>Price</th><th>Quantity</th><th>Action</th></tr>`;
  for (let i = 0; i < pr.length; i++) {
    str += `<tr><td>${pr[i].Id}</td><td>${pr[i].productName}</td><td>${pr[
      i
    ].productPrice}</td><td>${pr[i].productQty}</td>
    <td><a href="#" data-pid="${pr[i].Id}" id='edit'>Edit</a>
    <a href="#" data-pid="${pr[i].Id}" id='delete'>Delete</a></td></tr>`;
  }
  str += `</table>`;
  $("#product_list").html(str);
}
var error = [];


//Error Message
function displayError(error, flag) {
  $("#notification").fadeIn();
  $("#notification").removeClass("success-msg");
  $("#notification").addClass("error-msg");
  $("#notification").css("background-color","red")
  var errMsg = "";

  if (flag == 1) {
    for (let i = 0; i < error.length; i++) {
      errMsg += `${error[i].msg}`;
    }
  } else {
    errMsg = error;
  }

  $("#notification").html(errMsg); 
  $("#notification").fadeOut("slow");
  error.length = 0; 
}

//Updating the product details
$("#update_product").on("click", function(){
  var id = $("#product_sku");
  var Name = $("#product_name");
  var price = $("#product_price");
  var qty = $("#product_quantity");
  if (checkData(id, Name, price, qty)) {
    var prod = getProduct(id.val());
    console.log(prod);
    prod[0].productName = Name.val();
    prod[0].productPrice = price.val();
    prod[0].productQty = qty.val();
    display(products.product);
  }
  else {
    displayError(error, 1);
  }
  
})

//Edit Task
$("body").on("click", "#edit", function () {
  $("#add_product_form .update").show();
  $("#add_product_form .submit").hide();
  var id = $(this).data("pid");
  for (let i = 0; i < products.length; i++) {
    if (products[index].productId == id) {
      $("#product_sku").val(products[i].Id);
      $("#product_name").val(products[i].productName);
      $("#product_price").val(products[i].productPrice);
      $("#product_quantity").val(products[i].productQty);
      console.log(products[i]);
      break;
    }
  }
});
//Delete product
$("body").on("click", "#delete", function () {
  $("#add_product_form .update").hide();
  $("#add_product_form .submit").show();
  var id = $(this).data("pid");
  console.log(id);
  var prod = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].Id == id) {
      prod = products[i];
    }
  }
  products.splice(products.indexOf(prod), 1);
  displayTable();
});