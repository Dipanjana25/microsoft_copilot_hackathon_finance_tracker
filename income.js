const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const balEl = document.getElementById("balance");
let bal = parseInt(localStorage.getItem("bal"));

if(!bal)
bal=0;

balEl.innerText=`balance: ${bal}`;

formEl.addEventListener("submit",() => {

    const val = inputEl.value
    bal+=parseInt(val);// converting string to integer
    updateLocalStorage();
    console.log(val);
    console.log(bal);
})
function updateLocalStorage(){
    localStorage.setItem("bal", JSON.stringify(bal))//local storage only stores string for security purpose
}