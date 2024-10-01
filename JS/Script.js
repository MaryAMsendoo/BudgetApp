// collecting budget stake amount
let budgetAmount = document.getElementById("calculate");
let expenses = document.getElementById("expenses");
let expenseAmount = document.getElementById("expense_amount");
let num = 0;
let totalExpensesAmount = 0;
let budgetValue = 0;
let balanceValue = 0;



function budget() {
  if (budgetAmount.value === "") {
    alert("Enter Budget Amount");
  } else {
    // Set the budget value and initialize the balance
    budgetValue = parseFloat(budgetAmount.value);
    balanceValue = budgetValue;  // Initially, balance = budget
    document.getElementById("displayAmount").innerHTML = "$ " + budgetValue.toFixed(2);
    // Setting the initial balance display
    updateBalance();  
    // To clear the input field
    budgetAmount.value = "";  
  }
}




function exp() {
  // checking for empty field
  if (expenses.value === "" || expenseAmount.value === "") {
    alert("Please enter both an expense description and amount");
    return;
  }


  // / Check if the balance is sufficient
  let amountValue = parseFloat(expenseAmount.value);
  if (amountValue > balanceValue) {
    alert("Insufficient balance to add this expense!");
    return;  // Stop execution if the balance is insufficient
  }

  console.log("hello world");
  listItems = document.getElementById('list_item');

  let items = document.createElement('p');
  items.setAttribute("class", "paragraph");
  listItems.appendChild(items);

  // expenses Description
  let expDesc = document.createElement("span");
  expDesc.innerHTML = serialNo() + ". " + expenses.value;
  items.appendChild(expDesc);
  expenses.value = "";

  // expenses Amount
  // let amountValue = parseFloat(expenseAmount.value);
  let expAmount = document.createElement("span");
  expAmount.innerHTML = "$ " + amountValue.toFixed(2);
  items.appendChild(expAmount);
  expenseAmount.value = "";

 // Update the total expenses and balance
 updateTotalExpenses(amountValue);


  // Edit and delete button

  let spanButtons = document.createElement("span");
 items.appendChild(spanButtons);
  // Edit button
  let editButton = document.createElement("button");
  editButton.setAttribute("class", "grn_btn");
  editButton.textContent = "Edit";
  spanButtons.appendChild(editButton);
  // delete button
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("class", "red_btn");
  spanButtons.appendChild(deleteButton);
}


// getting serial number
function serialNo() {
  num++;
  return num;
}

// getting the total expenses amount
function updateTotalExpenses(amount) {
  totalExpensesAmount += amount;  // Adding the new expense to the total
  document.getElementById("displayexpense").innerHTML = "$ " + totalExpensesAmount.toFixed(2);


  // Deducting the amount from the balance
balanceValue -= amount;  
updateBalance();  // Update the balance whenever the total expenses change
  }


// Function to update the remaining balance
function updateBalance() {
  document.getElementById('balance').innerHTML = "$ " + balanceValue.toFixed(2);  // Update balance display
}


