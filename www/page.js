
function calculateCCI()
{

  let values={}
  let output={}
  
  values.price = (calculate($("#cci_price").val()))
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




function calculate(expression) {
    // Allow only numbers, arithmetic operators, brackets,
    // decimal points, whitespace and the % operator is excluded.
    if (!/^[\d+\-*/().\s]+$/.test(expression)) {
        return null;
    }

    // Parse using a restricted arithmetic grammar.
    const tokens = expression.match(
        /\d*\.?\d+|[+\-*/()]|\s+/g
    );

    if (!tokens) return null;

    const input = tokens.join('').replace(/\s/g, '');
    if (input !== expression.replace(/\s/g, '')) return null;

    let pos = 0;

    function parseExpression() {
        let value = parseTerm();

        while (tokens[pos] === '+' || tokens[pos] === '-') {
            const op = tokens[pos++];
            const right = parseTerm();
            value = op === '+' ? value + right : value - right;
        }

        return value;
    }

    function parseTerm() {
        let value = parseUnary();

        while (tokens[pos] === '*' || tokens[pos] === '/') {
            const op = tokens[pos++];
            const right = parseUnary();

            if (op === '/' && right === 0) {
                throw new Error('Division by zero');
            }

            value = op === '*' ? value * right : value / right;
        }

        return value;
    }

    function parseUnary() {
        if (tokens[pos] === '+') {
            pos++;
            return parseUnary();
        }

        if (tokens[pos] === '-') {
            pos++;
            return -parseUnary();
        }

        if (tokens[pos] === '(') {
            pos++;
            const value = parseExpression();

            if (tokens[pos++] !== ')') {
                throw new Error('Missing closing bracket');
            }

            return value;
        }

        const token = tokens[pos++];

        if (!token || !/^\d*\.?\d+$/.test(token)) {
            throw new Error('Invalid number');
        }

        return Number(token);
    }

    try {
        const value = parseExpression();

        if (pos !== tokens.length || !Number.isFinite(value)) {
            return null;
        }

        return value;
    } catch {
        return null;
    }
}

$('#cci_mathinput').on('input', function () {
    const expression = $(this).val().trim();
    const result = calculate(expression);

    $('#cci_mathoutput').val(
        expression !== '' && result !== null ? result : ''
    );
});




