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
    //to store all the incomes in the income array(not balance)
    var incomearr = JSON.parse(localStorage.getItem("incomearr") || "[]");
    incomearr.push(parseInt(val));
    // Saving
    localStorage.setItem("incomearr", JSON.stringify(incomearr));
})
function updateLocalStorage(){
    localStorage.setItem("bal", JSON.stringify(bal))//local storage only stores string for security purpose
}