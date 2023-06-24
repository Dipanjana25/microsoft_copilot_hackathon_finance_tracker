// localStorage.clear();
var exp_detail = JSON.parse(localStorage.getItem("expenses") || "[]");
var inc_detail = JSON.parse(localStorage.getItem("incomes") || "[]");

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const viewBtn = document.getElementById("view-balance");

viewBtn.addEventListener('click', () => {
if(viewBtn.innerText === "View balance"){
        viewBtn.innerText = `Balance: ₹${bal}`;
}
else {
        viewBtn.innerText = "View balance";
}
})

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

let bal = parseInt(localStorage.getItem("bal"));

let currentDate = new Date();
var m = JSON.parse(localStorage.getItem("m") || "[]");
console.log("m is");
console.log(m);
let mm=currentDate.getMonth()+1;
console.log(mm);
let dd=currentDate.getDate();
let yy=currentDate.getFullYear();
let s1=String(dd).concat(".");
let s2=String(mm).concat(".");
let s3=String(yy);
let str=s1.concat(s2);
let fstr=str.concat(s3);
// console.log(fstr);
//j.datee: (2+3).6.2023 because 4 spaces and then calendar is starting, now it is fixed
var am=0;
m.forEach(j => {
  if(j.datee === fstr){
    // console.log(j.amount);
    am+=Number(j.amount);
    // console.log(am);
  }
});

//pie-chart-code for income vs expense

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
async function drawChart() {
  var e=0;
  var i=0;
  var e_item = JSON.parse(localStorage.getItem("expenses") || "[]");
  var i_item = JSON.parse(localStorage.getItem("incomes") || "[]");

  e_item.map((e_item) => {
    e+=e_item.amount;
  })
  i_item.map((i_item) => {  
    i+=i_item.amount;
  })

  var data = google.visualization.arrayToDataTable([
    ['Answer', 'Percentage'],
    ['Income',  i],
    ['Expense',  e],  
  ]);

 var options = {
   title: 'Income Vs Expense Visualization',
   fontSize: 16,
   fontName: 'Poppins',
   height: 500,
   width: 500,
   is3D: true
 };

 var chart = new google.visualization.PieChart(document.getElementById('incvsexpchart'));
 chart.draw(data, options);
}
drawChart();

//pie-chart-code for expense limit
// var text=document.createElement('div');
// text.innerHTML=`Expense vs Expense Limit`;
if(am>0){
titl.classList.toggle('show');
google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawexpChart);
async function drawexpChart() {
  var sa,sa1,sa2;
  if(dd<10){
    sa1="0".concat(String(dd));
  }
  else{
    sa1=String(dd);
  }
  if(mm<10){
    sa="0".concat(String(mm));
    sa2=sa.concat("-");
  }
  else{
    sa2=String(mm).concat("-");
  }
  let sa3=String(yy).concat("-");
  let star=sa3.concat(sa2);
  let fastr=star.concat(sa1);
  var e=0;
  var e_item = JSON.parse(localStorage.getItem("expenses") || "[]");
  e_item.map((k) => {
    // console.log(j.date): 2023-06-02;
    // fastr is yyyy-mm-dd
    if(k.date=== fastr)
    e+=k.amount;
  })
  console.log(fastr);
  console.log(e);
  console.log(am);
  var data = google.visualization.arrayToDataTable([
    [{label: 'Label', type: 'string'},
    {label: 'Value', type: 'number'}],
    ['Expense', e]
  ]);

  var options = {

    min:0,max:am,
    fontSize: 25,
    height: 350,
    width: 350,
    redFrom: (am/2), redTo: am,
    yellowFrom:0, yellowTo: (am/2),
    minorTicks: am/5,
    animation: {
      duration: 1000,
      easing: 'inAndOut'
    }
  };
  var chart = new google.visualization.Gauge(document.getElementById('explimitchart'));
  chart.draw(data, options);
  // setInterval(function() {
  //   data.setValue(0, 1, Math.round(100 * Math.random()));
  //   chart.draw(data, options);
  // }, 2000);
}
drawexpChart();
}
