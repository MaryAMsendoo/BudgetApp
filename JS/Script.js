// constants variables
const budgetAmount = document.getElementById("calculate");
const expenses = document.getElementById("expenses");
const expenseAmount = document.getElementById("expense_amount");
const errorMessage = document.getElementById('error_message');

// global variable
let num = 0;
let totalExpensesAmount = 0;
let budgetValue = 0;
let balanceValue = 0;

// functions
function budget() {
  if (budgetAmount.value === "") {
    errorMessage.innerHTML = "Enter Budget Amount";
    errorMessage.style.color = "red";
  } else if(budgetAmount.value !== ""){
    errorMessage.innerHTML = "";
  
    // Set the budget value and initialize the balance
    budgetValue = parseFloat(budgetAmount.value);
    balanceValue = budgetValue;  // Initially, balance = budget
    document.getElementById("displayAmount").innerHTML = "₦  " + budgetValue.toLocaleString();
    // Setting the initial balance display
    updateBalance();  
    // To clear the input field
    budgetAmount.value = "";  
  }
}

function exp() {
  // checking for empty fields
  if (expenses.value === "" || expenseAmount.value === "") {
    errorMessage.innerHTML = "Please enter both an expense description and amount";
    errorMessage.style.color = "red";
    return;
  } else {
    errorMessage.innerHTML = ""; // Clear the error message if fields are not empty
  }

  // Check if the balance is sufficient
  let amountValue = parseFloat(expenseAmount.value);
  if (amountValue > balanceValue) {
    errorMessage.innerHTML = "Insufficient balance to add this expense!";
    errorMessage.style.color = "red";
    return; // Stop execution if the balance is insufficient
  }


 //displaying the budget details
  let listItems = document.getElementById('list_item');

  let items = document.createElement('p');
  items.setAttribute("class", "paragraph");
  listItems.appendChild(items);

  // Expenses Description
  let expDesc = document.createElement("span");
  expDesc.innerHTML = serialNo() + ". " + expenses.value;
  items.appendChild(expDesc);
  expenses.value = "";

  // Expenses Amount
  let expAmount = document.createElement("span");
  expAmount.innerHTML = "₦  " + amountValue.toLocaleString();
  items.appendChild(expAmount);
  expenseAmount.value = "";

  // Update the total expenses and balance
  updateTotalExpenses(amountValue);

  // Edit and delete button container
  let spanButtons = document.createElement("span");
  items.appendChild(spanButtons);

  // Edit button
  let editButton = document.createElement("button");
  editButton.setAttribute("class", "grn_btn");
  editButton.textContent = "Edit";
  spanButtons.appendChild(editButton);

  // Delete button
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("class", "red_btn");
  spanButtons.appendChild(deleteButton);

  // Delete button functionality
  deleteButton.addEventListener("click", function () {
    deleteExpense(amountValue, items);
  });

  // Edit button functionality
  editButton.addEventListener("click", function () {
    editExpense(expDesc, expAmount, amountValue);
  });
}

// Delete expense function
function deleteExpense(amount, listItem) {
  // Subtract the expense from the total expenses amount and balance
  totalExpensesAmount -= amount;
  balanceValue += amount;

  // Update the UI
  updateTotalExpenses(0); // To refresh the total expenses
  updateBalance();

  // Remove the list item
  listItem.remove();
}

// Edit expense function
function editExpense(expDesc, expAmount, oldAmount) {
  // Subtract the old amount from total and balance
  totalExpensesAmount -= oldAmount;
  balanceValue += oldAmount;

  // Prompt user to input new description and amount
  let newDescription = prompt("Edit description:", expDesc.textContent.split(". ")[1]);
  let newAmount = parseFloat(prompt("Edit amount:", oldAmount));

  // Check if the new amount is valid and doesn't exceed the balance
  if (newAmount > balanceValue) {
    alert("Insufficient balance to update this expense.");
    return;
  }

  // Update the expense description and amount
  expDesc.innerHTML = expDesc.textContent.split(". ")[0] + ". " + newDescription;
  expAmount.innerHTML = "₦  " + newAmount.toLocaleString();

  // Add the new amount to total and deduct from balance
  totalExpensesAmount += newAmount;
  balanceValue -= newAmount;

  // Update the UI
  updateTotalExpenses(0); // To refresh the total expenses
  updateBalance();
}

// Serial number function
function serialNo() {
  num++;
  return num;
}

// Update total expenses amount function
function updateTotalExpenses(amount) {
  totalExpensesAmount += amount; // Adding the new expense to the total
  document.getElementById("displayexpense").innerHTML = "₦  " + totalExpensesAmount.toLocaleString();

  // Deducting the amount from the balance
  balanceValue -= amount;
  updateBalance(); // Update the balance whenever the total expenses change
}

// Function to update the remaining balance
function updateBalance() {
  document.getElementById('balance').innerHTML = "₦  " + balanceValue.toLocaleString(); // Update balance display
}