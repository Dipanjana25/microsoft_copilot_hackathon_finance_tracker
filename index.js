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

const viewBtn = document.getElementById("view-balance");

viewBtn.addEventListener('click', () => {
if(viewBtn.innerText === "View balance"){
        viewBtn.innerText = `Balance: ₹${bal}`;
}
else {
        viewBtn.innerText = "View balance";
}
})

const bubble = document.getElementById('bubble');
var m = JSON.parse(localStorage.getItem("m") || "[]");
let reminderList = document.getElementById('reminderList');
const boxContent = document.querySelector('.contents');
const tri=document.querySelector('.triangle');
let currentDate = new Date();
let mm=currentDate.getMonth()+1;
let dd=currentDate.getDate();
let yy=currentDate.getFullYear();
let s1=String(dd).concat(".");
let s2=String(mm).concat(".");
let s3=String(yy);
let str=s1.concat(s2);
let fstr=str.concat(s3);
// reminderList.innerHTML = '';
var flag=0;
m.forEach(j => {
  if(j.datee === fstr){
    flag++;
    // const space = document.createElement('br');
    const newContent = document.createElement('p');
    newContent.innerHTML = `Subject: ${j.event} <br> Amount: ${j.amount} <br> Date:${dd}/${mm}/${yy}`;
    boxContent.appendChild(newContent);
    // boxContent.appendChild(space);
  }
});
if(flag===0){
  const listItem = document.createElement('p');
  listItem.textContent="You have no reminders for today !!";
  const redirect = document.createElement('p');
  const content='In order to set one, go to <a href="settings.html" class="link">Settings</a>';
  redirect.innerHTML=content;
  boxContent.appendChild(listItem);
  boxContent.appendChild(redirect);
}


bubble.addEventListener('click',function(){
  reminderList.classList.toggle('show');
  tri.classList.toggle('show');
  // const myTimeout = setTimeout(hide,6000);

  
});
function hide(){
  reminderList.classList.toggle('hide');
  tri.classList.toggle('hide');

}
// window.addEventListener('click', (event) => {
//   if (!bubble.contains(event.target) && !reminderList.contains(event.target)) {
//     location.reload();
//   }
// });
