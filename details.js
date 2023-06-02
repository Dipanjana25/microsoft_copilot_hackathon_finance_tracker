var exp_detail = JSON.parse(localStorage.getItem("expenses") || "[]");
var inc_detail = JSON.parse(localStorage.getItem("incomes") || "[]");

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
let currentDate = new Date();
var m = JSON.parse(localStorage.getItem("m") || "[]");
let mm=currentDate.getMonth()+1;
let dd=currentDate.getDate();
let yy=currentDate.getFullYear();
let sa1=String(dd).concat(".");
let sa2=String(mm).concat(".");
let sa3=String(yy);
let star=sa1.concat(sa2);
let fastr=star.concat(sa3);
var am=0;
m.forEach(j => {
  if(j.datee === fastr){
    am=Number(j.amount);
    
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
   fontSize: 10,
   height: 500,
   width: 500
 };

 var chart = new google.visualization.PieChart(document.getElementById('incvsexpchart'));
 chart.draw(data, options);
}
drawChart();

//pie-chart-code for expense limit
var text=document.createElement('div');
text.innerHTML=`Expense vs Expense Limit`;
google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawexpChart);
async function drawexpChart() {
  var data = google.visualization.arrayToDataTable([
    [{label: 'Label', type: 'string'},
    {label: 'Value', type: 'number'}],
    ['Expense', am]
  ]);

  var options = {
    title:'Titlekiunhidikhrhagawddddddddddd',
    fontSize: 25,
    height: 350,
    width: 350,
    redFrom: am/2, redTo: am,
    yellowFrom:0, yellowTo: am,
    minorTicks: 5
  };
  var chart = new google.visualization.Gauge(document.getElementById('explimitchart'));
  chart.draw(data, options);
  setInterval(function() {
    data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
    chart.draw(data, options);
  }, 13000);
}
drawexpChart();

//sticky navbar
window.onscroll = function() {myFunction()};
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}