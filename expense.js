let expenses = [];
const categoryEl = document.getElementById("category-select");
const inputEl = document.getElementById("amount-input");
const dateEl = document.getElementById("date-input");
const subBtn = document.getElementById("sub-btn");

const balEl = document.getElementById("balance");

let bal = parseInt(localStorage.getItem("bal"));

if(!bal)
bal=0;

balEl.innerText=`balance: ${bal}`;

subBtn.addEventListener('click', () => {

    const category = categoryEl.value;
    const amount = Number(inputEl.value);
    const date = dateEl.value;

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
    // expenses.push({category, amount, date});


    // const val = inputEl.value //here val is the string form of the amount
    bal-=amount;
    updateLocalStorage();
    console.log(amount);
    console.log(categoryEl.value);
    console.log(dateEl.value);
    console.log(bal);    

    var expensearr = JSON.parse(localStorage.getItem("expensearr") || "[]");
    expensearr.push(amount);
    // Saving
    localStorage.setItem("expensearr", JSON.stringify(expensearr));
    console.log(expensearr);

    var expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    expenses.push({category, amount, date, bal});
    // Saving
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log(expenses);
})
function updateLocalStorage(){
    localStorage.setItem("bal", JSON.stringify(bal))//local storage only stores strings for security purpose
    balEl.innerText=`balance: ${bal}`;
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