
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
  $cciout_cci= $("#cciout_cci");
  var original_color = 'rgb (73, 80, 87)';

  //$("#cciout_cci")
  //  .animate({borderColor:'red'}, 400, 'linear')
  //  .delay(400)
  //  .animate({borderColor:original_color}, 400, 'easeOutCirc');
  var options = {};
  $( "#cciout_cci" )..toggle( "highlight" );
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
    $("#cci_price_copy_button").prop('disabled', false);
    $("#cci_price_copy_button").removeClass('btn-outline-secondary');
    $("#cci_price_copy_button").addClass('btn-primary');
  
  }
  
  $("#cciout_cci").val(output.cci.toFixed(2));
  $("#cciout_price").val(output.price.toFixed(2));
  $("#cciout_cost").val(output.cost);
  
}

$(function()
 {
    $(".ccipct").on("change keyup",calculateCCIfrompct)
})

function calculatecostfrompriceCCI()
{
  let values={}
  let output={}
  
  values.price = ($("#cci_price").val())
  values.cost = ($("#cci_cost").val())
  values.cci = ($("#cci_cci").val())
  values.ccipct = ($("#cci_ccipct").val()/100)

  output.cost = values.price * (1-values.ccipct)
  
  $("#cciout_cost").val(output.cost.toFixed(2));

  
  $("#cci_cost_copy_button").prop('disabled', false);
  $("#cci_cost_copy_button").removeClass('btn-outline-secondary');
  $("#cci_cost_copy_button").addClass('btn-primary');
}

$(function()
 {
    $(".ccipct").on("change keyup",calculatecostfrompriceCCI)
})

function copyOutputPrice () {
  
  let output={}
  
  output.price = ($("#cciout_price").val());
  $("#cci_price").val(output.price);
  
  $("#cci_price_copy_button").prop('disabled', true);
  $("#cci_price_copy_button").addClass('btn-outline-secondary');
  $("#cci_price_copy_button").removeClass('btn-primary');
  
  calculateCCI();
  
}

$(function()
 {
    $("#cci_price_copy_button").on("click", copyOutputPrice)
})

function copyOutputCost () {
  
  let output={}
  
  output.cost = ($("#cciout_cost").val());
  $("#cci_cost").val(output.cost);
  
  $("#cci_cost_copy_button").prop('disabled', true);
  $("#cci_cost_copy_button").addClass('btn-outline-secondary');
  $("#cci_cost_copy_button").removeClass('btn-primary');
  
  calculateCCI();
  
}

$(function()
 {
    $("#cci_cost_copy_button").on("click", copyOutputCost)
})

function flashInput(inputElement) {
  inputElement.classList.remove('flash-gradient'); // Reset animation
  void inputElement.offsetWidth; // Force reflow
  inputElement.classList.add('flash-gradient');
}



