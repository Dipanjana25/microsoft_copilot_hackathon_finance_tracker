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

exp_detail.sort(function(a, b) {
  return a.date - b.date;
});
// exp_detail.reverse();
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
    deleteBtn.addEventListener('click', function (e) {
        var txt; //useless variable for now
        if (confirm("Confirm Delete?")) {
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
    var f=0;var count=0;var datecount=0;
    editBtn.addEventListener('click', function (e) {
      f++;
      if((f%2)===1){
        noteCell.classList.add('avatar');
        amountCell.classList.add('avatar');
        categoryCell.classList.add('avatar');
        dateCell.classList.add('avatar');
        noteCell.setAttribute('contenteditable', 'true');
        amountCell.setAttribute('contenteditable', 'true');
        categoryCell.addEventListener('click',function(){
          categoryCell.setAttribute('contenteditable', 'true');
          var dropdown = document.createElement('div');
          dropdown.className = 'dropdown';
          var select = document.createElement('select');
          select.onchange = function() {
            count++;
            replaceValue(this);
            // count++;
          };
          var options = ['Category','Food & Beverage','Transport','Investment','Relaxing'];
          for (var i = 0; i < options.length; i++) {
            var option = document.createElement('option');
            option.value = options[i];
            option.text = options[i];
            select.appendChild(option);
          }
          dropdown.appendChild(select);
          categoryCell.innerText = '';
          categoryCell.appendChild(dropdown);
          dropdown.style.display = 'block';
          dropdown.onclick = function(event) {
            event.stopPropagation();
          };
          function replaceValue(select) {
            var selectedOption = select.value;
            if(count!==0)
            categoryCell.innerText = selectedOption;
          }
        });
        dateCell.addEventListener('click',function(){
          dateCell.setAttribute('contenteditable', 'true');
          var datePicker=document.createElement("input");
          datePicker.type="date";
          datePicker.value = dateCell.innerText;
          datePicker.onblur = function() {
            datecount++;
            replace(this);
          };
          // if(datecount!==0){
          dateCell.innerText = '';
          dateCell.appendChild(datePicker);
          datePicker.onclick = function(event) {
            event.stopPropagation();
          };
          datePicker.focus();
          function replace(datePicker) {
            var selectedDate = datePicker.value;
            var pattern = /^\d{4}-\d{2}-\d{2}$/;
            // if(pattern.test(selectedDate))
            if(datecount!==0)
            dateCell.innerText = selectedDate;
            // else
            // alert("please enter a valid format of date which is yyyy-mm-dd");
          }
        // }
        });
        editBtn.textContent = 'Save';
        editBtn.style.backgroundColor="green";
        var ind = e.target.closest('tr').rowIndex;
        ind--;
        totalAmount -= exp_detail[ind].amount;
        bal+=exp_detail[ind].amount;
    }
    else{
      noteCell.classList.remove('avatar');
      amountCell.classList.remove('avatar');
      categoryCell.classList.remove('avatar');
      dateCell.classList.remove('avatar');
      var ind = e.target.closest('tr').rowIndex;
      ind--;
      var newamount=amountCell.innerText;
      var newnote=noteCell.innerText;
      if(count!==0)
      {var newcategory=categoryCell.innerText;
        exp_detail[ind].category=newcategory;
      }
      // if(datecount!==0){
        var newdate=dateCell.innerText;
        exp_detail[ind].date=newdate;
      // }
      exp_detail[ind].note=newnote;
      totalAmount += Number(newamount);
      totalAmountCell.textContent = totalAmount;
      noteCell.textContent=newnote;
      exp_detail[ind].amount=Number(newamount);
      bal-=exp_detail[ind].amount;
      amountCell.removeAttribute('contenteditable');
      editBtn.innerText = 'Edit';
      localStorage.setItem("expenses", JSON.stringify(exp_detail));
      localStorage.setItem("bal", JSON.stringify(bal));
      txt = "You pressed OK!";
      location.reload();
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


