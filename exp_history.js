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
    totalAmountCell.textContent = "₹"+totalAmount;

    const newRow = exp_detailTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    
    const amountCell = newRow.insertCell();
    const noteCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const editCell = newRow.insertCell();
    const downloadCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const downloadBtn=document.createElement('button');
    var icon = document.createElement('i');
    icon.className = 'fa-solid fa-trash';
    deleteBtn.appendChild(icon); 
    var icon = document.createElement('i');
    icon.className = 'fa-regular fa-pen-to-square';
    editBtn.appendChild(icon); 
    var icon = document.createElement('i');
    icon.className = 'fa-solid fa-download';
    downloadBtn.appendChild(icon); 
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
          var options = ['Category','Food & Beverage','Transport','Investment','Relaxing','Others'];
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
      console.log(exp_detail[ind].amount);
      amountCell.removeAttribute('contenteditable');
      editBtn.innerText = 'Edit';
      localStorage.setItem("expenses", JSON.stringify(exp_detail));
      localStorage.setItem("bal", JSON.stringify(bal));
      txt = "You pressed OK!";
      location.reload();
    }
    })
    downloadBtn.addEventListener('click', function (e) {
      var ind = e.target.closest('tr').rowIndex;
      ind--;
      var category =exp_detail[ind].category;
      var amount=exp_detail[ind].amount;
      var note=exp_detail[ind].note;
      var date=exp_detail[ind].date;
      var contentDiv = document.createElement('div');
      contentDiv.className='previewpdf';
      var contenthead=document.createElement('div');
      contenthead.innerHTML='<h1 class="headd">My expense record</h1>';
      contentDiv.innerHTML = '<h3 class="cheading">Category: <span class="cvalue">' + category + '</span></h3>\n<h3 class="cheading">Amount: <span class="cvalue">' + ' ₹'+amount + '</span></h3>\n<h3 class="cheading">Note: <span class="cvalue">' + note + '</span></h3>\n<h3 class="cheading">Date: <span class="cvalue">' + date + '</span></h3>';
      var previewWindow = window.open('');
      previewWindow.document.open();
      previewWindow.document.write('<html><head><title>PDF Preview</title></head><body>');
      previewWindow.document.write('<style>');
      // previewWindow.document.write('body{background:beige;}');
      previewWindow.document.write('.headd{text-align:center;color:black;font-weight:light;}','.cheading { color: #030547; font-size:18px;font-weight: bolder;}','.cvalue {color: #0e5d0e; font-size: 16px; font-weight: 200;}');
      previewWindow.document.write('</style><body>');
      previewWindow.document.write('<img src="images/fin.jpg" alt="Logo" height="60px" style="border-radius: 50%; padding-top: 10px;">');
      previewWindow.document.write(contenthead.innerHTML);
      previewWindow.document.write(contentDiv.innerHTML);
      previewWindow.document.write('</body></html>');
      previewWindow.print();
      previewWindow.close();
      location.reload();
    })
    categoryCell.textContent = expense.category;
    noteCell.textContent = expense.note;
    amountCell.textContent =expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
    editCell.appendChild(editBtn);
    downloadCell.appendChild(downloadBtn);
}

//pie-chart-code

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var food_exp= 0;
    var travel_exp= 0;
    var relax_exp= 0;
    var invest_exp= 0;
    var oth_expp=0;

    var item = JSON.parse(localStorage.getItem("expenses") || "[]");
    item.map((item) => {
      if(item.category === "Food & Beverage")  food_exp+=item.amount;
      else if(item.category === "Relaxing") relax_exp+=item.amount;
      else if(item.category === "Investment") invest_exp+=item.amount;
      else if(item.category === "Transport") travel_exp+=item.amount;
      else if (item.category === "Others") oth_expp+=item.amount;
    })
    // console.log(sal_exp + " " + rent_exp + " " + subs_exp + " " + tax_exp+ "done");
    var data = google.visualization.arrayToDataTable([
      ['Answer', 'Percentage'],
      ['Food & Beverage',  food_exp], 
      ['Investment',  invest_exp],
      ['Transport',  travel_exp],
      ['Relaxing',  relax_exp], 
      ['Others',  oth_expp] 
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


//pdf
function printData()
{
  var divToPrint=document.getElementById("content");
  var table = document.getElementById("table_my");
  var th = table.getElementsByTagName("th");
  var tr = table.getElementsByTagName("tr");
  var totCol = th.length;
  var colex = 3;
  var exin = totCol-colex;
  for (var i = exin; i < totCol; i++) {
    th[i].style.display = "none";
  }
  for(var i=0;i<exin;i++){
    th[i].classList.add("cheading");
    console.log(th[i]);
  }
  for (var i = 1; i < tr.length-1; i++) {
    for (var j = exin; j < totCol; j++) {
      var col= tr[i].cells[j];
      col.style.display="none";
    }
    for (var j = 0; j < exin; j++) {
      tr[i].cells[j].classList.add("cvalue");
    }
  }
  for(var i=0;i<2;i++){
    tr[tr.length-1].cells[i].classList.add("cheading");
  }
  tr[tr.length-1].cells[2].style.display="none";
  newWin= window.open("");
  var contenthead=document.createElement('div');
  contenthead.innerHTML='<h1 class="headd">My expense list</h1>';
  newWin.document.write('<html><head><title>PDF Preview</title></head><body>');
  newWin.document.write('<style>');
  newWin.document.write('.headd{text-align:center;color:black;font-weight:light; padding:10px;}','.cheading { color: #030547; font-size:18px;font-weight: bolder;padding:10px;}','.cvalue {color: #0e5d0e; font-size: 16px; font-weight: 200;padding:10px;}');
  newWin.document.write('</style><body>');
  newWin.document.write('<img src="images/fin.jpg" alt="Logo" height="60px" style="border-radius: 50%; padding-top: 10px;">');
  newWin.document.write(contenthead.innerHTML);
  newWin.document.write(divToPrint.outerHTML);
  newWin.document.write('</body></html>');
  newWin.print();
  newWin.close();
  location.reload();
}


//search
var p=0;
var categoryFilter = document.getElementById('categoryFilter');
var input = document.getElementById("input_my");
var dateInput = document.getElementById("dateInput");
categoryFilter.addEventListener('change', updatePlaceholder);
var placeholder="Search...";
function updatePlaceholder(){
  var selectedCategory = categoryFilter.value;
  switch (selectedCategory) {
    case 'category1':
      placeholder = 'Search by category';
      p=0;
      break;
    case 'category2':
      placeholder = 'Search by amount';
      p=1;
      break;
    case 'category3':
      placeholder = 'Search by note';
      p=2;
      break;
    case 'category4':
      p=3;
      break;
    default:
    placeholder = 'Search...';
  }
if(p===3){
  input.style.display = "none";
  dateInput.style.display = 'block';
}
else{
  input.style.display = 'block';
  dateInput.style.display = 'none';
  input.placeholder = placeholder;
}
}
dateInput.addEventListener("change", function() {
  var filter, table, tr, td, i, txtValue;
  dateInput = document.getElementById("dateInput"); 
  filter = dateInput.value;
  table = document.getElementById("table_my");
  tr = table.getElementsByTagName("tr");
  console.log(filter);
  for (i = 0; i < tr.length-1; i++) {
    td = tr[i].getElementsByTagName("td")[p];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
});
function myFunction_() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("input_my");
  filter = input.value.toUpperCase();
  table = document.getElementById("table_my");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length-1; i++) {
    td = tr[i].getElementsByTagName("td")[p];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

const convert = document.getElementById("convert");
const result = document.getElementById("result");
let balance = parseInt(localStorage.getItem("bal"));
var coo=0;
convert.addEventListener("click", function() {
  coo++;
  if(coo%2===1){
    result.style.display="block";
   let fromCurrency ="INR";
   let toCurrency = "USD";
   let amt = balance;
   fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
   .then(response => {
         return response.json();
   })
   .then(data => {
      let rate = data.rates[toCurrency];
      let total = rate * amt;
      // result.innerHTML = `${amt} ${fromCurrency} = ${total}
      result.innerHTML = `${total}
      ${toCurrency}`;
      
   });
  }
  else{
    result.style.display="none";
  }
});


