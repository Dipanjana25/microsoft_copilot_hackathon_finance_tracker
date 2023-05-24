let expenses = [];
let totalAmount = 0;
//for both expense and income we will use same code

//expense-code
const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <=0 ) {
        alert('Please enter a valid amoun')
        return;
    }
    if(date === '') {
        alert('Please select a date')
        return;
    }
    expenses.push({category, amount, date});

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
    });

    const expense = expenses[expenses.length - 1];
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);

});

for (const expense of expenses) {
    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.inserRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
    });
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}

//incomes-code
let incomes = [];
let totalAmountIncome = 0;
const categorySelectIncome = document.getElementById('category-select-income');
const amountInputIncome = document.getElementById('amount-input-income');
const dateInputIncome = document.getElementById('date-input-income');
const addBtnIncome = document.getElementById('add-btn-income');
const IncomesTableBody = document.getElementById('income-table-body');
const totalAmountCellIncome = document.getElementById('total-amount-income');

addBtnIncome.addEventListener('click', function() {
    const category_in = categorySelectIncome.value;
    const amount_in = Number(amountInputIncome.value);
    const date_in = dateInputIncome.value;

    if (category_in === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount_in) || amount_in <=0 ) {
        alert('Please enter a valid amoun')
        return;
    }
    if(date_in === '') {
        alert('Please select a date')
        return;
    }
    incomes.push({category_in, amount_in, date_in});

    totalAmountIncome += amount_in;
    totalAmountIncome -= totalAmount;
    totalAmountCellIncome.textContent = totalAmountIncome;

    const newRow_in = IncomesTableBody.insertRow();

    const categoryCell_in = newRow_in.insertCell();
    const amountCell_in = newRow_in.insertCell();
    const dateCell_in = newRow_in.insertCell();
    const deleteCell_in = newRow_in.insertCell();
    const deleteBtn_in = document.createElement('button');

    deleteBtn_in.textContent = 'Delete';
    deleteBtn_in.classList.add('delete-btn');
    deleteBtn_in.addEventListener('click', function() {
        incomes.splice(incomes.indexOf(income), 1);

        totalAmountIncome -= income.amount;
        totalAmountCellIncome.textContent = totalAmountIncome;

        IncomesTableBody.removeChild(newRow_in);
    });

    const income = incomes[incomes.length - 1];
    categoryCell_in.textContent = income.category_in;
    amountCell_in.textContent = income.amount_in;
    dateCell_in.textContent = income.date_in;
    deleteCell_in.appendChild(deleteBtn_in);

});

for (const income of incomes) {
    totalAmountIncome += income.amount_in;
    totalAmountCellIncome.textContent = totalAmountIncome;

    const newRow_in = IncomesTableBody.inserRow();
    const categoryCell_in = newRow_in.insertCell();
    const amountCell_in = newRow_in.insertCell();
    const dateCell_in = newRow_in.insertCell();
    const deleteCell_in = newRow_in.insertCell();
    const deleteBtn_in = document.createElement('button');
    deleteBtn_in.textContent = 'Delete';
    deleteBtn_in.classList.add('delete-btn');
    deleteBtn_in.addEventListener('click', function() {
        incomes.splice(incomes.indexOf(income), 1);

        totalAmountIncome -= income.amount_in;
        totalAmountCellIncome.textContent = totalAmountIncome;

        IncomesTableBody.removeChild(newRow_in);
    });
    categoryCell_in.textContent = income.category_in;
    amountCell_in.textContent = income.amount_in;
    dateCell_in.textContent =  income.date_in;
    deleteCell_in.appendChild(deleteBtn_in);
}

//pie-chart-code
anychart.onDocumentReady(function() {
    var incomearr = JSON.parse(localStorage.getItem("incomearr"))
    var expensearr = JSON.parse(localStorage.getItem("expensearr"))
    var ins=0;var exs=0;
    incomearr.forEach((element) => {
        ins+=element;
    });
    expensearr.forEach((element) => {
        exs+=element
    });
    // set the data
    var data = [
        {x: "Income", value: ins},
        {x: "Expense", value: exs}
    ];
  
    // create the chart
    var chart = anychart.pie();
  
    // set the chart title
    chart.title("Income vs Expense");
  
    // add the data
    chart.data(data);
  
    // display the chart in the container
    chart.container('container');
    chart.draw();
  
  });