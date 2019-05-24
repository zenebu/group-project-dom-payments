/**
 * The code to fetch the payments data has already been written
 * for you below. To complete this group project, your group
 * will need to write code to make this app do the following:
 *
 * 1. Show the current balance based on the initial balance and
 *    any completed payments. Each completed payment will add to
 *    the balance.
 * 2. Add the payments to the table. Each payment should show
 *    the date of the payment, its status (whether is pending or
 *    complete), the description, the amount, and the balance
 *    after that payment was completed.
 *
 *    Pending payments should appear with a pink background.
 *    This can be applied by adding the `pending` class to the
 *    table row (`<tr>`) for each pending payment.
 * 3. Show what the balance will be after pending payments are
 *    completed.
 * 4. Show the total income of all payments that were received
 *    this month (May, 2019), including pending payments.
 * 5. Show the amount of the most valuable payment that was
 *    received this month (May 2019).
 * 6. For each PENDING payment, add a button that says "cancel"
 *    to the end of that payment's row. When the button is
 *    clicked, the payment should be removed from the account
 *    and the render function should be called again to update
 *    the page.
 */

/**
 * This is the account details that you will use with this
 * exercise.
 *
 * Do not edit this code.
 */
var account = {
  number: 100402153,
  initialBalance: 100,
  paymentsUrl: '/data/payments.json',
  payments: []
};

/**
 * The code below has been written for you. When the "Load"
 * button is clicked, it will get the payments details, assign
 * them to the account variable, and call the render function
 * to update details in the DOM.
 *
 * You may edit this code.
 */
document.querySelector('#loadButton')
  .addEventListener('click', function () {
    fetch(account.paymentsUrl)
      .then(response => response.json())
      .then(payments => {
        console.log(payments);
        account.payments = payments;
        render(account);
      });
  });
  
/**
 * Write a render function below that updates the DOM with the
 * account details.
 *
 * EVERY update to the DOM should be contained in this
 * function so that you can call it over and over again
 * whenever there is an update to the account details.
 *
 * We have completed one of the DOM updates already by
 * entering the account number on the page.
 *
 * @param {Object} account The account details
 */

// Question 1 // 
function render(account) {
  // Display the account number
  document.querySelector('#accountNumber')
    .innerText = account.number;

    // document.querySelector('#balanceAmount')
    // .innerText = account.initialBalance;
    // console.log(account);

    payBal(account);
    table(account);
    pendPay(account);
    allIncome(account);
    mostVal(account);

// Question 3 // 
    function pendPay(account) {
  
      var pendPaySum = account.payments.map(payment => payment.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  
      var totalPay = account.initialBalance + pendPaySum ;
      console.log(totalPay);
      document.querySelector ('#pendingBalance').innerText = "£" + totalPay.toFixed(2);
       
    };

// Question 4 // 
  function allIncome (account) {
    document.querySelector ('#totalIncome');
    var allIn = pendPaySum.innerText = '£' + allIn.toFixed(2);
    // account.payments.map(payment => payment.amount)
    // .reduce((accumulator, currentValue) => accumulator + currentValue);
   //  allIn.
  }
// Question 5 //
  function mostVal (account) {
    document.querySelector ('#mostValuablePayment');
    var mostValuablePayment = account.paymnets.map(payment => payment.amount)
        if ( mostValuablePayment > 100 ) {
      return mostValuablePayment;
    }
    else {
      return "";
    }
   
  };


};
// Question 2 // 
function payBal (account) {

  var completedPay =  account.payments.filter(payment => payment.completed).map(payment => payment.amount)
  .reduce((accumulator, currentValue) => accumulator + currentValue );
  console.log(completedPay);

  var Bal = account.initialBalance + completedPay ;
  document.querySelector('#balanceAmount')
  .innerText = "£" + Bal.toFixed(2);

  console.log (Bal);
  };

function table (account) {
  document.querySelector("#paymentsList").innerHTML = "";
  account.payments.forEach(payment => {
    var row = document.createElement("tr");
    // row.setAttribute("id", "paymentsList");
    document.getElementById("paymentsList").appendChild(row);
     var cellDate = document.createElement("td");
     cellDate.innerText = payment.date ; 
    row.appendChild(cellDate);
    
    var cellStatus = document.createElement("td");
    if ( payment.completed ) {
      cellStatus.innerText = "completed";
    }
    else {
      cellStatus.innerText =  "Pending" ;
      row.setAttribute("class", "pending");
    }
    row.appendChild (cellStatus);

    var cellDescription = document.createElement("td");
    cellDescription.innerText = payment.description ;
    row.appendChild(cellDescription);

    var cellAmount = document.createElement("td");
    cellAmount.innerText = payment.amount ;
    row.appendChild(cellAmount);

    var cellAction = document.createElement ("td");
    if (payment.completed) {
      cellAction.innerText = "" ;
    } else {
     var cancelBtn = document.createElement ("button");
     cancelBtn.innerText = "Cancel";
     cellAction.appendChild(cancelBtn);
     
     row.appendChild (cellAction);

     // Question 6 // 

     cancelBtn.addEventListener("click", cancelPay);

     function cancelPay (){
       if (payment.completed != 'true') {
        delete account.payments.completed ; 
     }

     render(account);
    });

  };

  
 
};





/**
 * Write any additional functions that you need to complete
 * the group project in the space below.
 *
 * For example, you might want to have functions that
 * calculate balances, find completed or pending payments,
 * add up payments, and more.
 */
