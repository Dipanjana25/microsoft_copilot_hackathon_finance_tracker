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

balEl.innerText=`Current balance: ${bal}`;

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
    // deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        var txt; //useless variable for now
        if (confirm("Confirm Delete?")) {
            exp_detail.splice(exp_detail.indexOf(expense), 1);
            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount;
            bal+=expense.amount;
            exp_detailTableBody.removeChild(newRow);
            localStorage.setItem("expenses", JSON.stringify(exp_detail));
            localStorage.setItem("bal", JSON.stringify(bal));
            balEl.innerText=`Current Balance: ${bal}`;
            txt = "You pressed OK!";
        } else {
            txt = "You pressed Cancel!";
        }
    })
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}

//pie-chart-code

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
var inc=bal+expense.amount
 var data = google.visualization.arrayToDataTable([
   ['Answer', 'Percentage'],
   ['Income',     inc], //This static data needs to reflect dynamic data from html table
   ['Expense',   expense.amount], //This static data needs to reflect dynamic data from html table
 //   ['Balance',  ], //This static data needs to reflect dynamic data from html table
 ]);

 var options = {
   title: 'Income Vs Expense Visualization',
   fontSize: 25,
   height: 800,
   width: 800
 };

 var chart = new google.visualization.PieChart(document.getElementById('piechart'));

 chart.draw(data, options);
}



  //hamnurger
  const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}