var exp_detail = JSON.parse(localStorage.getItem("expenses") || "[]");
console.log(exp_detail);

function delete_from_LocalStorage(){
    exp_detail.slice(exp_detail.indexOf(expense), 1);
    balEl.innerText=`balance: ${bal}`;
}

let totalAmount = 0;
const exp_detailTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
const balEl = document.getElementById("balance");

let bal = parseInt(localStorage.getItem("bal"));

if(!bal)
bal=0;

balEl.innerText=`balance: ${bal}`;

exp_detail.reverse();
var expense = exp_detail[0];
for (expense of exp_detail) {
    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = exp_detailTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        exp_detail.splice(exp_detail.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        exp_detailTableBody.removeChild(newRow);
        localStorage.setItem("expenses", JSON.stringify(exp_detail));
    });
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}

//pie-chart-code
anychart.onDocumentReady(function() {
    var exp = JSON.parse(localStorage.getItem("expenses"))
    var food=0, travel=0, investment=0, relax=0;

    exp.forEach(item => {
        if(item.category === "Food") food = food + 1;
        if(item.category === "Travel") travel = travel + 1;
        if(item.category === "Investment")  investment = investment + 1;
        if(item.category === "Relax")  relax = relax + 1;
    })

    // set the data
    var data = [
        {x: "Travel", value: travel},
        {x: "Food", value: food},
        {x: "Investment", value: investment},
        {x: "Relax", value: relax},
    ];
  
    // create the chart
    var chart = anychart.pie();
  
    // set the chart title
    chart.title("Expenses chart");
  
    // add the data
    chart.data(data);
  
    // display the chart in the container
    chart.container('container');
    chart.draw();
  
  });