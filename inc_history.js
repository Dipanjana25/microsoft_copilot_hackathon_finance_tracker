var inc_detail = JSON.parse(localStorage.getItem("incomes") || "[]");
console.log(inc_detail);

function delete_from_LocalStorage(){
    inc_detail.pop(inc_detail.indexOf(income), 1);
    balEl.innerText=`Current Balance: ${bal}`;
}

let totalAmount = 0;
const inc_detailTableBody = document.getElementById('income-table-body');
const totalAmountCell = document.getElementById('total-amount-income');
const balEl = document.getElementById("balance");

let bal = parseInt(localStorage.getItem("bal"));

if(!bal)
bal=0;

balEl.innerText=`Current Balance: ${bal}`;

inc_detail.reverse();
var income = inc_detail[0];
for (income of inc_detail) {
    totalAmount += income.amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = inc_detailTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    // deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        var txt; //useless variable for now
        if (confirm("Confirm Delete?")) {
            inc_detail.splice(inc_detail.indexOf(income), 1);
            totalAmount -= income.amount;
            totalAmountCell.textContent = totalAmount;
            bal-=income.amount;
            inc_detailTableBody.removeChild(newRow);
            localStorage.setItem("incomes", JSON.stringify(inc_detail));
            localStorage.setItem("bal", JSON.stringify(bal));
            balEl.innerText=`Current Balance: ${bal}`;
            txt = "You pressed OK!";
        } else {
            txt = "You pressed Cancel!";
        }
    })
    categoryCell.textContent = income.category;
    amountCell.textContent = income.amount;
    dateCell.textContent = income.date;
    deleteCell.appendChild(deleteBtn);
}

//pie-chart-code
anychart.onDocumentReady(function() {
    var inc_detail = JSON.parse(localStorage.getItem("incomes"))
    var ins=0;var exs=0;
    inc_detail.forEach((element) => {
        ins+=element;
    });
    // expenses.forEach((element) => {
    //     exs+=element
    // });
    
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