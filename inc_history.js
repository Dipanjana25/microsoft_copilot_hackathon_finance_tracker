// localStorage.clear();
var inc_detail = JSON.parse(localStorage.getItem("incomes") || "[]");
console.log(inc_detail);

const toggleDropdown = function () {
  dropdownMenu.classList.toggle("show");
  toggleArrow.classList.toggle("arrow");
};

let totalAmount = 0;
const inc_detailTableBody = document.getElementById('income-table-body');
const totalAmountCell = document.getElementById('total-amount-income');
const balEl = document.getElementById("balance");

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
inc_detail.sort(function(a, b) {
  return a.date - b.date;
});
// inc_detail.reverse();
var income = inc_detail[0];
for (income of inc_detail) {
    totalAmount += income.amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = inc_detailTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const noteCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const editCell = newRow.insertCell();

    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    editBtn.textContent = 'Edit';
    // deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function(e) {
        var txt; //useless variable for now
        if (confirm("Confirm Delete?")) {

            var ind = e.target.closest('tr').rowIndex;
            ind--;
            console.log(ind);
            console.log(inc_detail[ind].amount)
            
            totalAmount -= inc_detail[ind].amount;
            totalAmountCell.textContent = totalAmount;
            bal-=inc_detail[ind].amount;
            if(viewBtn.innerText === "View balance"){
              viewBtn.innerText = "View balance";
            }
            else {
              viewBtn.innerText = `Balance: ₹${bal}`;
            }
            inc_detail.splice(ind, 1);
            inc_detailTableBody.removeChild(newRow);
            localStorage.setItem("incomes", JSON.stringify(inc_detail));
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
            replaceValue(this);
            count++;
          };
          var options = ['Salary','Income tax return','Rent','Subsidy'];
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
            categoryCell.innerText = selectedOption;
          }
        });
        dateCell.addEventListener('click',function(){
          dateCell.setAttribute('contenteditable', 'true');
          var datePicker=document.createElement("input");
          datePicker.type="date";
          datePicker.value = dateCell.innerText;
          datePicker.onblur = function() {
            replace(this);
            // datecount++;
          };
          // if(datecount!==0){
          dateCell.innerText = '';
          dateCell.appendChild(datePicker);
          // datePicker.focus();
          function replace(datePicker) {
            var selectedDate = datePicker.value;
            var pattern = /^\d{4}-\d{2}-\d{2}$/;
            // if(pattern.test(selectedDate))
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
        totalAmount -= inc_detail[ind].amount;
        bal-=inc_detail[ind].amount;
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
        inc_detail[ind].category=newcategory;
      }
      if(datecount!==0){
        var newdate=dateCell.innerText;
        inc_detail[ind].date=newdate;
      }
      inc_detail[ind].note=newnote;
      totalAmount += Number(newamount);
      totalAmountCell.textContent = totalAmount;
      noteCell.textContent=newnote;
      inc_detail[ind].amount=Number(newamount);
      bal+=inc_detail[ind].amount;
      amountCell.removeAttribute('contenteditable');
      editBtn.innerText = 'Edit';
      localStorage.setItem("incomes", JSON.stringify(inc_detail));
      localStorage.setItem("bal", JSON.stringify(bal));
      txt = "You pressed OK!";
      location.reload();
    }
    })
// var value = parseInt(income.amount);
    // editBtn.addEventListener('click', function() {
    //     if(editBtn.innerHTML.toLowerCase() == "edit"){
    //         amountCell.focus();
    //         amountCell.style.backgroundColor = "beige";
    //         amountCell.contentEditable = true;
    //         editBtn.innerHTML = "Save";
    //         value = amountCell.innerHTML;
    //     }

    //     else if(editBtn.innerHTML.toLowerCase() == "save"){
    //         amountCell.innerHTML = value;
    //         console.log(value);
    //         amountCell.contentEditable = false;
    //         amountCell.style.backgroundColor = "white";
    //         editBtn.innerHTML = "Edit";

    //         localStorage.setItem("incomes", JSON.stringify(inc_detail));
    //         localStorage.setItem("bal", JSON.stringify(bal));
    //         balEl.innerText=`Current Balance: \u20B9${bal}`;
    //         location.reload();
    //         console.log(inc_detail);
    //         console.log(bal);
    //     }
    // })

    categoryCell.textContent = income.category;
    noteCell.textContent = income.note;
    amountCell.textContent = income.amount;
    dateCell.textContent = income.date;
    deleteCell.appendChild(deleteBtn);
    editCell.appendChild(editBtn);
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
    console.log(sal_exp + " " + rent_exp + " " + subs_exp + " " + tax_exp+ " done");
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

