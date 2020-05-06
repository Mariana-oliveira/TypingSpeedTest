const TEXTAREA = document.querySelector(".text-typed");
const TIME = document.querySelector(".time");
const ERRORS = document.querySelector(".errors");
const RESET = document.querySelector(".reset");
const REFRESH_TEXT = document.querySelector(".refresh-text");
const TEXT_TO_TYPE = document.querySelector(".text-to-type");


var time = [0,0,0];
var timerRunning = false;


// Function that starts the timer:
function StartTime(){
    console.log("Time started");
}


// Function to check if the text entered matches the text to type: 
function CheckSpelling(){

}


// Function to reset the timer
function ResetTimer(){

}


// Function to change the text to type
function ChangeTextToType(){

}




// Event Listener
TEXTAREA.addEventListener("keypress", StartTime, false);
TEXTAREA.addEventListener("keyup", CheckSpelling, false);
RESET.addEventListener("click", ResetTimer, false);
REFRESH_TEXT.addEventListener("click", ChangeTextToType, false);