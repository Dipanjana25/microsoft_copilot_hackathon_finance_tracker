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

// const balEl = document.getElementById("balance");
let bal = parseInt(localStorage.getItem("bal"));
if(!bal)
bal=0;
// balEl.innerText=`Balance: ${bal}`;

const viewBtn = document.getElementById("v");

viewBtn.addEventListener('click', () => {
if(viewBtn.innerText === "View balance"){
        viewBtn.innerText = `₹${bal}`;
}
else if(viewBtn.innerText === `₹${bal}`){
        viewBtn.innerText = "View balance";
}
})

const bubble = document.getElementById('bubble');
var m = JSON.parse(localStorage.getItem("m") || "[]");
const reminderList = document.getElementById('reminderList');
let currentDate = new Date();
let mm=currentDate.getMonth()+1;
let dd=currentDate.getDate();
let yy=currentDate.getFullYear();
let s1=String(dd).concat(".");
let s2=String(mm).concat(".");
let s3=String(yy);
let str=s1.concat(s2);
let fstr=str.concat(s3);
reminderList.innerHTML = '';
var flag=0;
m.forEach(j => {
  if(j.datee === fstr){
    flag++;
    var br = document.createElement("br");
    const listItem = document.createElement('div');
    // listItem.textContent = j.amount;
    listItem.innerHTML=`Subject: ${j.event}\nAmount: ${j.amount}\nDate:${dd}/${mm}/${yy}`;
    reminderList.appendChild(listItem);
    reminderList.appendChild(br.cloneNode());
      // remind.style.display='block';
  }
});
if(flag!==0){
  const listItem = document.createElement('div');
  listItem.innerHTML=`You have no reminders for today`;
  reminderList.appendChild(listItem);
}
bubble.addEventListener('click',function(){
  reminderList.style.display = 'block';
});
window.addEventListener('click', (event) => {
  if (!bubble.contains(event.target) && !reminderList.contains(event.target)) {
    reminderList.style.display = 'none';
  }
});

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