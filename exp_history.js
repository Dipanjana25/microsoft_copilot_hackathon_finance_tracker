// localStorage.clear();
var exp_detail = JSON.parse(localStorage.getItem("expenses") || "[]");
console.log(exp_detail);


let totalAmount = 0;
const exp_detailTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
// const balEl = document.getElementById("balance");

let bal = parseInt(localStorage.getItem("bal"));
if(!bal)
bal=0;
// balEl.innerText=`Balance: ${bal}`;

const viewBtn = document.getElementById("view-balance");

viewBtn.addEventListener('click', () => {
if(viewBtn.innerText === "View balance"){
        viewBtn.innerText = `Balance: ₹${bal}`;
}
else {
        viewBtn.innerText = "View balance";
}
})


exp_detail.reverse();
var expense = exp_detail[0];
for (expense of exp_detail) {
    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = exp_detailTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    
    const amountCell = newRow.insertCell();
    const noteCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const editCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    editBtn.textContent = 'Edit';
    // deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function (e) {
        var txt; //useless variable for now
        if (confirm("Confirm Delete?")) {
            // // console.log(exp_detail.indexOf(expense));
            // // console.log(e.target.closest('tr').rowIndex);
            // var ind = e.target.closest('tr').rowIndex;
            // ind--;
            // console.log(ind);


            // // console.log(exp_detail[ind].amount);
            
            // totalAmount -= exp_detail[ind].amount;
            // totalAmountCell.textContent = totalAmount;
            // bal+=exp_detail[ind].amount;
            // exp_detail.splice(ind, 1);
            // inc_detailTableBody.removeChild(newRow);
            // localStorage.setItem("expenses", JSON.stringify(exp_detail));
            // localStorage.setItem("bal", JSON.stringify(bal));
            // balEl.innerText=`Current Balance: \u20B9${bal}`;
            // txt = "You pressed OK!";
            // location.reload();


            var ind = e.target.closest('tr').rowIndex;
            ind--;
            console.log(ind);
            console.log(exp_detail[ind].amount)
            
            totalAmount -= exp_detail[ind].amount;
            totalAmountCell.textContent = totalAmount;
            bal+=exp_detail[ind].amount;
            if(viewBtn.innerText === "View balance"){
              viewBtn.innerText = "View balance";
            }
            else {
              viewBtn.innerText = `Balance: ₹${bal}`;
            }
            exp_detail.splice(ind, 1);
            exp_detailTableBody.removeChild(newRow);
            localStorage.setItem("expenses", JSON.stringify(exp_detail));
            localStorage.setItem("bal", JSON.stringify(bal));
            // balEl.innerText=`Current Balance: \u20B9${bal}`;
            txt = "You pressed OK!";
            location.reload();
        } else {
            txt = "You pressed Cancel!";
        }
    })
    categoryCell.textContent = expense.category;
    noteCell.textContent = expense.note;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
    editCell.appendChild(editBtn);
}

//pie-chart-code

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var food_exp= 0;
    var travel_exp= 0;
    var relax_exp= 0;
    var invest_exp= 0;

    var item = JSON.parse(localStorage.getItem("expenses") || "[]");
    item.map((item) => {
      if(item.category === "Food & Beverage")  food_exp+=item.amount;
      else if(item.category === "Relaxing") relax_exp+=item.amount;
      else if(item.category === "Investment") invest_exp+=item.amount;
      else if(item.category === "Transport") travel_exp+=item.amount;
    })
    // console.log(sal_exp + " " + rent_exp + " " + subs_exp + " " + tax_exp+ "done");
    var data = google.visualization.arrayToDataTable([
      ['Answer', 'Percentage'],
      ['Food & Beverage',  food_exp], 
      ['Investment',  invest_exp],
      ['Transport',  travel_exp],
      ['Relaxing',  relax_exp],  
    ]);

 var options = {
   title: 'Category wise expenses visualization',
   fontSize: 10,
   height: 500,
   width: 500,
   is3D: true
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


