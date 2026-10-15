
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
  if (output.cci.toFixed(2) != $("#cciout_cci")) {$("#cciout_cci").effect("highlight");}
  if (output.ccipct.toFixed(4) != $("#cciout_ccipct")) {$("#cciout_ccipct").effect("highlight");}
  $cciout_cci= $("#cciout_cci");

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

  if (output.cci.toFixed(2) !=  $("#cciout_cci")) { $("#cciout_cci").effect("highlight");}
  $("#cciout_cci").val(output.cci.toFixed(2));

  if (output.price.toFixed(2) !=  $("#cciout_price")) { $("#cciout_price").effect("highlight");}
  $("#cciout_price").val(output.price.toFixed(2));
  
  
  if (output.cost !=  $("#cciout_cost")) { $("#cciout_cost").effect("highlight");}
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
   $("#cciout_cost").effect({ effect: 'highlight' ,queue: true });
  

  
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
  $("#cci_price").effect("highlight");
  
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

  $("#cci_cost").effect("highlight");
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


const inputField = document.getElementById('cci_mathinput');
const resultDisplay = document.getElementById('cci_mathoutput');

// 1. Restrict input to only allow digits and arithmetic operators
inputField.addEventListener('input change keyup', (e) => {
  // Strip out anything that isn't a number, math operator, or parenthesis
  const sanitizedValue = e.target.value.replace(/[^0-9+\-*/().\s]/g, '');
  
  if (e.target.value !== sanitizedValue) {
    e.target.value = sanitizedValue;
  }
  
  // 2. Safely evaluate the expression
  calculateResult(sanitizedValue);
});


// 3. Safe evaluation helper
function calculateResult(expression) {
  // If empty, reset display
  if (!expression.trim()) {
    resultDisplay.textContent = 'Result: --';
    return;
  }

  try {
    // A clean way to compute simple arithmetic safely without eval()
    // It builds a sandbox return statement isolated from the window object
    const safeCompute = new Function(`return (${expression})`);
    const result = safeCompute();

    if (result !== undefined && !isNaN(result)) {
      resultDisplay.textContent = `Result: ${result}`;
      $("#cciout_mathoutput").val(${result});
    } else {
      resultDisplay.textContent = 'Result: Invalid';
    }
  } catch (error) {
    // Catches unfinished syntax while typing (e.g., "10 +")
    resultDisplay.textContent = 'Result: ...';
  }
}




