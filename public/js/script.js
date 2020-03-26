/* * * * * BMI calculation  * * * * */

//listening to the BMI button click
$("#calculate_btn").on("click",displayBMI);

//to display the BMI result with color coded
function displayBMI(req){
  var feet = $("#feet").val(),
      inches = $("#inches").val(),
      weight = $("#weight").val();
       
       var BMI = calculateBMI(feet, inches, weight);
       $("#BMI_result").text(BMI);

       var result = $("#result_progress");
       if( BMI<18.5 ){
         result.css("background-color", "#ffc107");
       }else if( BMI>=18.5 && BMI<25 ){
         result.css("background-color", "#28a745");
       }else if( BMI>=25 && BMI< 30 ){
         result.css("background-color", "#ef737f");
       }else{
         result.css("background-color", "#dc3545");
       }
}

//Function to calculate BMI
function calculateBMI(feet, inch, weight){
    var height = parseInt(feet)*12+parseInt(inch);
    var BMI = parseInt(weight)*703/Math.pow(height, 2);
    return BMI.toFixed(1);
}



/* * * * * Calendar  * * * * */

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let selectedDate = today.getDate()+" "+months[today.getMonth()]+" "+today.getFullYear();
let monthYear=document.getElementById("form-monthYear");
let monthAndYear = document.getElementById("monthAndYear");
let day=document.getElementById("form-day");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    monthYear.innerHTML =months[month] + " " + year;
    day.innerHTML =today.getDate();
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let a1=document.createElement("button");
                let cellText = document.createTextNode("");
                cell.appendChild(a1);
                a1.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }
            else {
                let cell = document.createElement("td");
                let a2=document.createElement("button");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-warning");
                } // color today's date
                cell.appendChild(a2);
                a2.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }

}

$("#calendar-body").on("click","button",function(){
    event.preventDefault();
    let newDay = $(this).text();
    day.innerHTML=newDay;
    populateActivities();
})

//getting new activities and saving to db
$("#form-submit").on("click",function(){
    event.preventDefault();
    var selectedDay=$("#form-day").text();
    var monthYear=$("#form-monthYear").text();
    selectedDate=selectedDay+" "+monthYear;
    var activity=$("#form-activity").val();
    var calories=$("#form-calories").val();

   $.post("add", {activity: activity, calories: calories, timestamp: selectedDate }, function(data){
    console.log(data);
   })
   location.reload();
})



//fetch all activities and display
function populateActivities(){
    var timestamp=day.innerHTML+" "+monthYear.innerHTML;
    $.get("activities", { date: timestamp }, function(result){
        var parent = $("#activity-list");
        parent.empty();

        if(result.length==0){
            parent.text("No activities found on this day");
        }else{
       for(var i=0; i<result.length; i++){
        var line1 = $("<li></li>").text("Activity: " + result[i].name);
        var line2 = $("<li></li>").text("Calories: " + result[i].calories)
        var line3=$("<br>");
        parent.prepend(line1, line2, line3);
       }
    }
       
    });

}
populateActivities();

