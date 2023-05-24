let menuOpenBtn=document.querySelector(".navbar .bx-menu");
let closeOpenBtn=document.querySelector(".navlinks .bx-x");
let navLinks=document.querySelector(".navlinks");
 
menuOpenBtn.addEventListener("click",()=>{
    navLinks.style.left="0";
});
closeOpenBtn.addEventListener("click",()=>{
    navLinks.style.left="-100%";
});
//expense table
function GenerateTable() {
    //Build an array containing Customer records.
    var customers = new Array();
    customers.push(["Serial No.", "Amount"]);
    // customers.push([1, "John Hammond", "United States"]);
    // customers.push([2, "Mudassar Khan", "India"]);
    // customers.push([3, "Suzanne Mathews", "France"]);
    // customers.push([4, "Robert Schidner", "Russia"]);

    //Create a HTML Table element.
    var table = document.createElement("TABLE");
    table.border = "1";

    //Get the count of columns.
    var columnCount = customers[0].length;

    //Add the header row.
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = customers[0][i];
        row.appendChild(headerCell);
    }

    //Add the data rows.
    var incomearr = JSON.parse(localStorage.getItem("incomearr"))
    var expensearr = JSON.parse(localStorage.getItem("expensearr"))
    var k=0;
    for (var i = 1; i <=incomearr.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            if(j===0)
            cell.innerHTML=k++;
            else
            cell.innerHTML = incomearr[i-1];
        }
    }
    for (var i = 1; i <=expensearr.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            if(j===0)
            cell.innerHTML=k++;
            else
            cell.innerHTML = expensearr[i-1];
        }
    }

    var dvTable = document.getElementById("dvTable");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
}