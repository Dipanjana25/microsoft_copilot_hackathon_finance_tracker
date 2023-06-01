// localStorage.clear();
let expenses = [];
const categoryEl = document.getElementById("category-select");
const inputEl = document.getElementById("amount-input");
const dateEl = document.getElementById("date-input");
const noteEl = document.getElementById("note-input");
const subBtn = document.getElementById("sub-btn");

const balEl = document.getElementById("balance");

let bal = parseInt(localStorage.getItem("bal"));

if(!bal)
bal=0;

balEl.innerText=`Balance: ${bal}`;

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


    bal-=amount;
    if(bal<0)
    alert('Insufficient balance');
    else
    updateLocalStorage();
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

    categoryEl.value = '';
    inputEl.value = '';
    dateEl.value = '';
    noteEl.value = '';

    const msg = document.getElementById("msg");
    msg.innerText = "Expense added successfully";
    setTimeout(() => msg.innerText = "", 1500);
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