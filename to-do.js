// localStorage.clear();
const inputEl = document.getElementById("input1");
const tasksEl= document.getElementById("tasks");

function addtask(){
    if(inputEl.value ==='')
    {
        alert('You must enter some text!')
        return;
    }
    else
    {
        let val=inputEl.value;

        //creating the main div
        const taskjs = document.createElement("div");
        taskjs.classList.add("task");

        //creating the checkbox
        const checkboxjs = document.createElement("input");
        checkboxjs.classList.add("check");
        checkboxjs.type = "checkbox";
        // checkboxjs.setAttribute('unchecked','unchecked');

        //content element
        const contentjs = document.createElement("div");
        contentjs.classList.add("content");

        const actualjs = document.createElement("div");
        actualjs.classList.add("actual");
        actualjs.innerHTML=val;


        // const inputjs = document.createElement("input");
        // inputjs.classList.add("task-text");
        // inputjs.type = "text";
        // inputjs.innerHTML=val;
        // inputjs.value = val;
        // inputjs.setAttribute("readonly", "readonly");

     

        const actionsjs = document.createElement("div");
        actionsjs.classList.add("actions");

         //delete element
         const deljs = document.createElement("button");
         deljs.classList.add("delete");
         deljs.innerHTML = "Delete";


         // by appendChild we add the child within the parent div
            taskjs.appendChild(checkboxjs);
            // contentjs.appendChild(inputjs);
            contentjs.appendChild(actualjs);
            taskjs.appendChild(contentjs);
            actionsjs.appendChild(deljs);
            taskjs.appendChild(actionsjs);
            tasksEl.appendChild(taskjs);
            savedata();



    }

    
    savedata(); 
    inputEl.value="";
}



tasksEl.addEventListener("click", function(e){
    
    if(e.target.tagName === "BUTTON")
    {
        if(confirm("Delete this task?"))
        {
    e.target.parentElement.parentElement.remove();
        }
    }
    else if(e.target.tagName === "INPUT")
    {
        if(e.target.checked===true)
        {
            e.target.setAttribute('checked', 'checked');
        }
        else 
        {
            e.target.removeAttribute('checked','checked');
        }
    }
    savedata();


},false)

        



function savedata(){
    localStorage.setItem("data",tasksEl.innerHTML);
    // localStorage.clear("data")
}

function showtasks(){

    tasksEl.innerHTML=localStorage.getItem("data");
    // console.log(localStorage.getItem("data"));
}

showtasks();

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


