// localStorage.clear();
let incomes=[];
const categoryEl = document.getElementById("category-select-income");
const inputEl = document.getElementById("amount-input-income");
const dateEl = document.getElementById("date-input-income");
const noteEl = document.getElementById("note-input-income");
const subBtn = document.getElementById("sub-btn");
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    editBtn.textContent = 'Edit';

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
var item_id = -1;
subBtn.addEventListener('click', () => {

    const category = categoryEl.value;
    const amount = Number(inputEl.value);
    const date = dateEl.value;
    const note = noteEl.value;
    item_id = parseInt(item_id) + 1;
    const d_b = deleteBtn;
    const e_b = editBtn;

    d_b.value = item_id;
    e_b.value = item_id;

    
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
    console.log(noteEl.value);
    console.log(bal);  
    // console.log(item_id); 
    console.log(d_b.value);
    console.log(e_b.value); 
    //to store all the incomes in the income array(not balance)

    var incomes = JSON.parse(localStorage.getItem("incomes") || "[]");
    incomes.push({category, amount, date, note, bal, item_id});
    // Saving
    localStorage.setItem("incomes", JSON.stringify(incomes));
    console.log(incomes);

    categoryEl.value = '';
    inputEl.value = '';
    dateEl.value = '';
    noteEl.value = '';

    const msg = document.getElementById("msg");
    msg.innerText = "Income added successfully";
    setTimeout(() => msg.innerText = "", 1500);
})
function updateLocalStorage(){
    localStorage.setItem("bal", JSON.stringify(bal))
    //local storage only stores string for security purpose
    balEl.innerText=`Balance: ${bal}`;
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

