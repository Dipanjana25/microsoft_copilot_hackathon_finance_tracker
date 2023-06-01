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