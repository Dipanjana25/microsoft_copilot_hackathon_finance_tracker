let income=[];
const categoryEl = document.getElementById("category-select-income");
const inputEl = document.getElementById("amount-input-income");
const dateEl = document.getElementById("date-input-income");
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

  
    bal+=amount;
    updateLocalStorage();
    console.log(amount);
    console.log(categoryEl.value);
    console.log(dateEl.value);
    console.log(bal);    
    //to store all the incomes in the income array(not balance)
    var incomearr = JSON.parse(localStorage.getItem("incomearr") || "[]");
    incomearr.push(parseInt(amount));
    // Saving
    localStorage.setItem("incomearr", JSON.stringify(incomearr));
    var income = JSON.parse(localStorage.getItem("income") || "[]");
    income.push({category, amount, date, bal});
    // Saving
    localStorage.setItem("incomearr", JSON.stringify(incomearr));
    console.log(income);
})
function updateLocalStorage(){
    localStorage.setItem("bal", JSON.stringify(bal))
    //local storage only stores string for security purpose
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