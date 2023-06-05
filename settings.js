// localStorage.clear();
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
//expense table
const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };
  let calendar = document.querySelector('.calendar');
  const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var p=0; var q=0;
  let month_picker = document.querySelector('#month-picker');
  const dayTextFormate = document.querySelector('.day-text-formate');
  const timeFormate = document.querySelector('.time-formate');
  const dateFormate = document.querySelector('.date-formate');
  let calendar_limit = document.querySelector('.calendar-limit');
  let calendar_days = document.querySelector('.calendar-days');
  month_picker.onclick = () => {
    // var rect = dayTextFormate.getBoundingClientRect();
    if(p===0
    // rect.top >= 0 &&
    // rect.left >= 0 &&
    // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    // dayTextFormate.classList.contains('showtime')// did not work :(
    ){
      month_list.classList.remove('hideonce');
      month_list.classList.remove('hide');
      month_list.classList.add('show');
      dayTextFormate.classList.remove('showtime');
      dayTextFormate.classList.add('hidetime');
      timeFormate.classList.remove('showtime');
      timeFormate.classList.add('hideTime');
      dateFormate.classList.remove('showtime');
      dateFormate.classList.add('hideTime');
      calendar_days.innerHTML=' ';
  } 
  };
  var m = JSON.parse(localStorage.getItem("m") || "[]");
  console.log(m);
  const generateCalendar = (month, year) => {
    
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    
    let currentDate = new Date();
    
    month_picker.innerHTML = month_names[month];
    
    calendar_header_year.innerHTML = year;
    
    let first_day = new Date(year, month);
    // console.log(first_day.getDay()-1);//4-1=3,34 slots to be filled so 0 to 33
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

      let day = document.createElement('button');
      day.style.border="none";
      if (i >= first_day.getDay()) {
        let s1=String(i-first_day.getDay() + 1).concat(".");
        let s2=String(month+1).concat(".");
        let s3=String(year);
        let str=s1.concat(s2);
        let fstr=str.concat(s3);
        // console.log(fstr);
        day.innerHTML = i - first_day.getDay() + 1;

        if (i - first_day.getDay() + 1 === currentDate.getDate() &&
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth()
        ) {
          day.classList.add('current-date');
        }
          m.forEach(j => {
            if(j.datee === fstr){
              if(year >= currentDate.getFullYear()){
                if(month>currentDate.getMonth()||(month===currentDate.getMonth() && day.textContent>=currentDate.getDate())){
                  // console.log(j.amount);
                  // console.log(j.datee);
                  var circle = document.createElement('div');
                  circle.classList.add('notif');
                  day.appendChild(circle);
                }}
            }
          });
      }
      var count=0;
      day.addEventListener("click", function(){
        if(year >= currentDate.getFullYear()){
          if(month>currentDate.getMonth()||(month===currentDate.getMonth() && day.textContent>=currentDate.getDate())){
            let s1=String(day.textContent).concat(".");
            let s2=String(month+1).concat(".");
            let s3=String(year);
            let str=s1.concat(s2);
            let fstr=str.concat(s3);
              var flag=0;
              var j;
              m.some(j => {
                if(j.datee === fstr){
                  count++;
                  p++;q++;
                  if(count>1)
                  {
                    // alert("please click on go back if this is not the date you want to set a limit for");
                    return;
                  }
                  // head.scrollIntoView({ behavior: 'smooth' });
                  let head = document.getElementById("heading");
                  head.scrollIntoView({ behavior: 'smooth' });
                  head.innerHTML=`Your Expense Limit is  \u20B9${j.amount} for ${j.event}`;
                  flag++;
                  var ok=document.createElement('button');
                  ok.textContent="OK";
                  ok.id='ok';
                  var br = document.createElement("br");
                  let del = document.createElement('button');
                  del.id='delete';
                  del.textContent="Delete";
                  let ed = document.createElement('button');
                  // ed.classList.add('cross');
                  ed.id='edit';
                  ed.innerHTML = 'Edit';
                  head.appendChild(br.cloneNode());
                  head.appendChild(ok);
                  // head.appendChild(br.cloneNode());
                  // head.appendChild(ed);
                  head.appendChild(del);
                  dayTextFormate.classList.remove('showtime');
                  dayTextFormate.classList.add('hidetime');
                  timeFormate.classList.remove('showtime');
                  timeFormate.classList.add('hideTime');
                  dateFormate.classList.remove('showtime');
                  dateFormate.classList.add('hideTime');
                  ok.addEventListener('click',function(){
                    location.reload();
                  });
                  del.addEventListener('click',function(){
                    // location.reload();
                    if (confirm("Confirm Delete?")){
                    const indexToDelete = m.findIndex((entry) => entry.datee === fstr);
                      m.splice(indexToDelete, 1);
                      localStorage.setItem("m", JSON.stringify(m));
                      location.reload();
                    }
                  });
                }
              })
            if(flag===0){
              count++;p++;q++;
              if(count>1)
              {
                // alert("please click on go back if this is not the date you want to set a limit for");
                return;
              }
              let head = document.getElementById("heading");
              calendar_limit.scrollIntoView({ behavior: 'smooth' });
              // head.innerHTML=`Set Your Expense Limit for ${day.textContent}/${month+1}/${year} `;
              let f=document.createElement('form');
              var fn = document.createElement("input");
              fn.setAttribute("input", "value");
              fn.setAttribute("placeholder", "Amount");
              var note = document.createElement("input");
              note.setAttribute("input", "text");
              note.setAttribute("placeholder", "Subject for reminder");
              let s = document.createElement('button');
              s.id='sub';
              s.textContent="Set Limit for " + `${day.textContent}/${month+1}/${year}`;
              let gb = document.createElement('button');
              gb.classList.add('cross');
              gb.id='goback';
              gb.innerHTML = '&times;';
              // gb.textContent="Go Back";
              var br = document.createElement("br");
              // f.appendChild(head);
              f.appendChild(br.cloneNode());
              f.appendChild(fn);
              f.appendChild(br.cloneNode());
              f.appendChild(note);
              f.appendChild(br.cloneNode());
              f.appendChild(s);
              f.appendChild(br.cloneNode());
              f.appendChild(gb);
              f.appendChild(br.cloneNode());
              calendar_limit.appendChild(f);
              calendar_limit.classList.remove('hideonce');
              calendar_limit.classList.remove('hide');
              calendar_limit.classList.add('show');
              dayTextFormate.classList.remove('showtime');
              dayTextFormate.classList.add('hidetime');
              timeFormate.classList.remove('showtime');
              timeFormate.classList.add('hideTime');
              dateFormate.classList.remove('showtime');
              dateFormate.classList.add('hideTime');
              s.addEventListener('click', function() {
              if (confirm("Confirm Save?")) 
              {
                const am = Number(fn.value);
                if (isNaN(am) || am <=0 ) {
                  alert('Please enter a valid amount')
                  return;
                }
                const n= note.value;
                if (n === '') {
                  alert('Please enter what you want to be reminded of');
                  return;
                }
                m.push({
                  datee:fstr,
                  amount:am,
                  event:n
                });
                calendar_limit.classList.replace('show', 'hide');
                dayTextFormate.classList.remove('hideTime');
                dayTextFormate.classList.add('showtime');
                timeFormate.classList.remove('hideTime');
                timeFormate.classList.add('showtime');
                dateFormate.classList.remove('hideTime');
                dateFormate.classList.add('showtime');
                calendar_limit.classList.add('hideonce');
                localStorage.setItem("m", JSON.stringify(m));
                // const msg = document.createElement('div');
                // msg.innerText = "Expense limit and its reminder added successfully";
                // setTimeout(() => msg.innerText = "", 1500);
              } 
              else {
                // const msg = document.createElement('div');
                // msg.innerText = "You pressed Cancel";
                // setTimeout(() => msg.innerText = "", 1500);
              }
              });
              gb.addEventListener('click',function(){
                return;
              });
            }
            // calendar_limit.removeChild(f);
          }  
        }
      });
      calendar_days.appendChild(day);
    }
  };
  
  let month_list = calendar.querySelector('.month-list');
  month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;
    month_list.append(month);
    month.onclick = () => {
      // if(count<0){
      currentMonth.value = index;
      generateCalendar(currentMonth.value, currentYear.value);
      month_list.classList.replace('show', 'hide');
      dayTextFormate.classList.remove('hideTime');
      dayTextFormate.classList.add('showtime');
      timeFormate.classList.remove('hideTime');
      timeFormate.classList.add('showtime');
      dateFormate.classList.remove('hideTime');
      dateFormate.classList.add('showtime');
      // }
    };
  });
  
  (function () {
    month_list.classList.add('hideonce');
  })();

  document.querySelector('#pre-year').onclick = () => {
    var rect = dateFormate.getBoundingClientRect();
    if (
      q===0
      // rect.top >= 0 &&
      // rect.left >= 0 &&
      // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      // dayTextFormate.classList.contains('showtime')
    ) {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  }
  };
  document.querySelector('#next-year').onclick = () => {
    // var rect = dateFormate.getBoundingClientRect();
    if (
      q===0
      // f.style.display==="none"
      // rect.top >= 0 &&
      // rect.left >= 0 &&
      // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      // dayTextFormate.classList.contains('showtime')
    ) {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  }
  };
  
  let currentDate = new Date();
  let currentMonth = { value: currentDate.getMonth() };
  let currentYear = { value: currentDate.getFullYear() };
  generateCalendar(currentMonth.value, currentYear.value);

  const todayShowTime = document.querySelector('.time-formate');
  const todayShowDate = document.querySelector('.date-formate');
  
  const currshowDate = new Date();
  const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
  ).format(currshowDate);
  todayShowDate.textContent = currentDateFormate;
  setInterval(() => {
    const timer = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
      2,
      '0'
    )}:${`${timer.getMinutes()}`.padStart(
      2,
      '0'
    )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
    todayShowTime.textContent = formateTimer;
  }, 1000);



