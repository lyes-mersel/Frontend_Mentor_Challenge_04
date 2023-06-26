
var bill = 0, tipPerc = 0, numberPeople = 1, tipAmount = 0, totalAmount = 0;
var tipExist = false, nbPeopleExist = false, dataExist = false;


    /*** ( The Event Listenners ) ***/

// User clicks 'Enter' : Update the page
$(document).on("keypress", (event)=> {
    if (event.key == "Enter") {
        updateAmountsToUser();
    }
})

// User clicks on the RESET button
$(".reset-btn").on("click", ()=> {
    resetData();
})

// User choose the tip
$(".tip-btn").on("click", (event)=> {
    if (!dataExist) {
        dataExist = true;
        $(".reset-btn").prop('disabled', false);
    }
    $(".tip-btn").removeClass("tip-selected");
    $(event.target).addClass("tip-selected");
    $("#tip-custom").val("");
    let tipString = $(event.target).text();
    tipPerc = +tipString.replace("%", "");
    tipExist = true;
    updateAmountsToUser();
})

// User customises the tip
$("#tip-custom").on("click", ()=> {
    $(".tip-btn").removeClass("tip-selected");
    tipExist = false;
})
$("#tip-custom").on("keypress", (event)=> {
    if (event.key.match(/[0-9.]/)) {
        if (!dataExist) {
            dataExist = true;
            $(".reset-btn").prop('disabled', false);
        }
    } else {
        event.preventDefault();
    }
})

// User types the bill amount
$("#bill").on("keypress", (event)=> {
    if (event.key.match(/[0-9.]/)) {
        if (!dataExist) {
            dataExist = true;
            $(".reset-btn").prop('disabled', false);
        }
    } else {
        event.preventDefault();
    }
})

// User types the number of people
$("#nb-people").on("keypress", (event)=> {
    if (event.key.match(/[0-9]/)) {
        if (!dataExist) {
            dataExist = true;
            $(".reset-btn").prop('disabled', false);
        } else {
            if (event.key != "0") {
                $(".zero").addClass("hide");
                $("#nb-people").removeClass("input-red");
                $("#nb-people:focus").css("outline", "solid 2px hsl(172, 66%, 45%)");
            }
        }
    } else {
        event.preventDefault();
    }
})


    /*** ( The Functions ) ***/

// Do the calculations & update it on the screen
function updateAmountsToUser() {
    // Number of People == 0
    if ($("#nb-people").val() == "0" || $("#nb-people").val() == "") {
        $(".zero").removeClass("hide");
        $("#nb-people").addClass("input-red");
        $("#nb-people").css("outline", "none");
        if (!dataExist) {
            $(".reset-btn").prop('disabled', false);
        }
    } else {
        nbPeopleExist = true;
    }

    // The Tip% is not selected
    if ($("#tip-custom").val() != "") {
        tipPerc = +$("#tip-custom").val();
        tipExist = true;
    }
    if (tipExist) {
        $(".select-tip p").removeClass("text-red");
    } else {
        $(".select-tip p").addClass("text-red");
        if (!dataExist) {
            $(".reset-btn").prop('disabled', false);
        }
    }
    
    // Data is ready : Do the calculations
    if (tipExist && nbPeopleExist) {
        bill = +$("#bill").val();
        numberPeople = +$("#nb-people").val();
        tipAmount = (bill * tipPerc / 100) / numberPeople;
        totalAmount = (bill + tipAmount) / numberPeople;
        // Show the amounts with 2 decimals
        tipAmount = (Math.round(tipAmount * 100) / 100).toFixed(2);
        totalAmount = (Math.round(totalAmount * 100) / 100).toFixed(2);
        $("#tip-amount").text("$" + tipAmount);
        $("#total-amount").text("$" + totalAmount);
    }
}

// Reset Data
function resetData() {
    dataExist = false;
    tipExist = false; nbPeopleExist = false; 
    bill = 0; tipPerc = 0; numberPeople = 1;
    $("#bill").val("");
    $(".select-tip p").removeClass("text-red");
    $(".tip-btn").removeClass("tip-selected");
    $("#tip-custom").val("");
    $("#nb-people").val("");
    $("#nb-people").removeClass("input-red");
    $(".zero").addClass("hide");
    $("#tip-amount").text("$0.00");
    $("#total-amount").text("$0.00");
    $(".reset-btn").prop("disabled", true);
}
