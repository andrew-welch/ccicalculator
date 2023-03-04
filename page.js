
function calculateCCI()
{

  
  let values={}
  let output={}
  
  values.price = ($("#cci_price").val())
  values.cost = ($("#cci_cost").val())
  values.cci = ($("#cci_cci").val())
  values.ccipct = ($("#cci_ccipct").val())



  output.cci = values.price - values.cost;
  output.ccipct = 0;
  if (values.price != 0){
    output.ccipct = 100* output.cci / values.price ; }
 
  $("#cciout_cci").val(output.cci.toFixed(2));
  $("#cciout_ccipct").val(output.ccipct.toFixed(4));
  
}



$(function()
 {
    $(".cci").on("change keyup",calculateCCI)
})

function calculateCCIfrompct()
{

  
  let values={}
  let output={}
  
  values.price = ($("#cci_price").val())
  values.cost = ($("#cci_cost").val())
  values.cci = ($("#cci_cci").val())
  values.ccipct = ($("#cci_ccipct").val()/100)

  if (values.ccipct != 1) {
    output.price = values.cost / (1-values.ccipct);
    output.cci = values.ccipct * output.price;
    output.cost = values.cost
    $("#cci_price_copy_button").removeClass("d-none");
  }
  
 
  $("#cciout_cci").val(output.cci.toFixed(2));
  $("#cciout_price").val(output.price.toFixed(2));
  $("#cciout_cost").val(output.cost);
  
}

$(function()
 {
    $(".ccipct").on("change keyup",calculateCCIfrompct)
})

function copyOutputPrice () {
  
  let output={}
  
  output.price = ($("#cciout_price").val());
  
  $("#cci_price").val(output.price);
  
  $("#cci_price_copy_button").addClass("d-none");
  
}

$(function()
 {
    $("#cci_price_copy_button").on("click", copyOutputPrice)
})


