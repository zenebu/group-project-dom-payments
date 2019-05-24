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
  paymentsUrl: "/data/payments.json",
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


function render(account) {
  // Display the account number
  document.querySelector("#accountNumber").innerText = account.number;
  createPaymentList(account);
  createCancelbutton(account);
   totalIncomMay(account.payments);
  maxPaymentinMay(account.payments);
    payBal(account);
    pendPay(account);
  

    function payBal (account) {

  var completedPay =  account.payments.filter(payment => payment.completed).map(payment => payment.amount)
  .reduce((accumulator, currentValue) => accumulator + currentValue );

  var Bal = account.initialBalance + completedPay ;
  document.querySelector('#balanceAmount')
  .innerText = "£" + Bal.toFixed(2);

  };

// Question 3 // 
    function pendPay(account) {
  
      var pendPaySum = account.payments.map(payment => payment.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  
      var totalPay = account.initialBalance + pendPaySum ;
      document.querySelector ('#pendingBalance').innerText = "£" + totalPay.toFixed(2);
       
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

// task 2
console.log(paymentsList);
function createPaymentList(account) {
  var paymentsList = document.querySelector("#paymentsList");
  paymentsList.innerHTML = "";
  account.payments.forEach(function(payment) {
    var tableRow = document.createElement("tr");
    tableRow.setAttribute("id", account.payments.indexOf(payment).toString());
    var dateCell = document.createElement("td");
    dateCell.textContent = payment.date;
    tableRow.appendChild(dateCell);
    paymentsList.appendChild(tableRow);

    var status = document.createElement("td");
    //status.textContent = payment.completed;
    if (payment.completed) {
      status.innerText = "completed";
    } else {
      status.innerText = "pending";
      tableRow.setAttribute("class", "pending");
    }
    tableRow.appendChild(status);

    var description = document.createElement("td");
    description.textContent = payment.description;
    tableRow.appendChild(description);

    var amount = document.createElement("td");
    amount.textContent = "£" + payment.amount.toFixed(2);
    tableRow.appendChild(amount);
  });
}

// task 6
function createCancelbutton(account) {
  var allPendingPayment = document.querySelectorAll(".pending");
  allPendingPayment.forEach(function(payment) {
    var button = document.createElement("td");
    var cancelButton = document.createElement("button");
    cancelButton.innerText = "cancel";
    button.appendChild(cancelButton);
    payment.appendChild(button);
  });
  var allButton = document.querySelectorAll(".pending button");
  console.log(allButton);
  allButton.forEach(function(button) {
    button.addEventListener("click", function(event) {
      var rowToBeDeleted = event.target.parentElement.parentElement;
      var indexOfObjectToBeDelated = rowToBeDeleted.getAttribute("id");
      account.payments.splice(indexOfObjectToBeDelated, 1);
      render(account);
    });
  });
//      TASK 4
function totalIncomMay(payments) {
  var paymentsInMay = payments
    .filter(isInMay)
    .reduce((accumulator, payment) => accumulator + payment.amount, 0);
  document.querySelector("#totalIncome").textContent =
    "£" + paymentsInMay.toFixed(2);
}

function isInMay(payment) {
  var d = new Date(Date.parse(payment.date));
  if (d.getMonth() === 4) {
    return payment;
  }
}

//      TASK 5
function maxPaymentinMay(payments) {
  var completedPaymentsInMay = payments
    .filter(isInMay)
    .filter(payment => payment.completed)
    .map(payment => payment.amount);
  document.querySelector("#mostValuablePayment").textContent =
    "£" + Math.max(...completedPaymentsInMay).toFixed(2);

}
