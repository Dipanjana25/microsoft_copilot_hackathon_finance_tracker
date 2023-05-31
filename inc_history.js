// localStorage.clear();
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

   google.charts.load('current', {'packages':['corechart']});
   google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var sal_exp= 0;
    var rent_exp= 0;
    var subs_exp= 0;
    var tax_exp= 0;

    var item = JSON.parse(localStorage.getItem("incomes") || "[]");
    item.map((item) => {
      if(item.category === "Salary")  sal_exp+=item.amount;
      else if(item.category === "Income tax return") tax_exp+=item.amount;
      else if(item.category === "Rent") rent_exp+=item.amount;
      else if(item.category === "Subsidy") subs_exp+=item.amount;
    })
    console.log(sal_exp + " " + rent_exp + " " + subs_exp + " " + tax_exp+ "done");
    var data = google.visualization.arrayToDataTable([
      ['Answer', 'Percentage'],
      ['Salary',  sal_exp], 
      ['Rent',  rent_exp],
      ['Subsidy',  subs_exp],
      ['Income tax return',  tax_exp],  
    ]);

    var options = {
      title: 'Category based Income Visualization',
      fontSize: 10,
      height: 500,
      width: 500
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }

  //hamburger
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