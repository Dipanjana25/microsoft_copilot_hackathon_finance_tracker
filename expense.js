// localStorage.clear();
let expenses = [];
const categoryEl = document.getElementById("category-select");
const inputEl = document.getElementById("amount-input");
const dateEl = document.getElementById("date-input");
const noteEl = document.getElementById("note-input");
const subBtn = document.getElementById("sub-btn");


let bal = parseInt(localStorage.getItem("bal"));

if(!bal)
bal=0;


const viewBtn = document.getElementById("view-bal");

viewBtn.addEventListener('click', () => {
if(viewBtn.innerText === "View balance"){
        viewBtn.innerText = `₹${bal}`;
        // alert(`Your balance is ${bal}`);
}
else if(viewBtn.innerText === `₹${bal}`){
        viewBtn.innerText = "View balance";
        // alert(`Your balance is ${bal}`);
}
})

let currentDate = new Date();
var m = JSON.parse(localStorage.getItem("m") || "[]");
let mm=currentDate.getMonth()+1;
let dd=currentDate.getDate();
let yy=currentDate.getFullYear();
let s1=String(dd).concat(".");
let s2=String(mm).concat(".");
let s3=String(yy);
let str=s1.concat(s2);
let fstr=str.concat(s3);
var am=-1;
m.forEach(j => {
    if(j.datee === fstr){
        // console.log(j.amount);
        am=Number(j.amount);
        // console.log(am);
    }
});
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

subBtn.addEventListener('click', () => {
    const category = categoryEl.value;
    const amount = Number(inputEl.value);
    const date = dateEl.value;
    const note = noteEl.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <=0 ) {
        alert('Please enter a valid amount')
        return;
    }
    if(date === '') {
        alert('Please select a date')
        return;
    }
    if(amount>bal)
    {
        alert('Insufficient balance');
        return;
    }
    
    bal-=amount;
    updateLocalStorage();
    viewBtn.innerText = "View balance";
    console.log(amount);
    console.log(categoryEl.value);
    console.log(dateEl.value);
    console.log(noteEl.value);
    console.log(bal);    

    var expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    expenses.push({category, amount, date, note, bal});
    // Saving
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log(expenses);
    var e=0;
    expenses.map((k) => {
        if(k.date=== fastr)
        e+=k.amount;
    })
    console.log(e);var stat;
    if(am>=0 && e>0)
    {
        if(e<=am)
        {
            stat = document.getElementById("status");
            stat.innerText = "Good going, expenses are within the limit";
            stat.style.color="green";
            setTimeout(() => stat.innerText = "", 2000);
        }
        else{
            stat=document.getElementById("status");
            stat.innerText = "Umm, seems like today's expenses have gone overboard!!";
            stat.style.color="red";
            setTimeout(() => stat.innerText = "", 2000);
        }
    }
    categoryEl.value = '';
    inputEl.value = '';
    dateEl.value = '';
    noteEl.value = '';

    const msg = document.getElementById("msg");
    msg.innerText = "Expense added successfully";
    setTimeout(() => msg.innerText = "", 2000);
})
function updateLocalStorage(){
    localStorage.setItem("bal", JSON.stringify(bal))
    if(viewBtn.innerText === "View balance"){
        viewBtn.innerText = "View balance";
}
else if(viewBtn.innerText === `₹${bal}`){
        viewBtn.innerText = `₹${bal}`;
}
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


