const TEXTAREA = document.querySelector(".text-typed");
const TIME = document.querySelector(".time");
const ERRORS = document.querySelector(".errors");
const RESET = document.querySelector(".reset");
const REFRESH_TEXT = document.querySelector(".refresh-text");
const TEXT_TO_TYPE = document.querySelector(".text-to-type");


var time = [0,0,0,0];
var timerRunning = false;
var errorCount = 0;

//Function that adds zero leading
function LeadingZero(time){
	if(time<=9){
		time= "0"+time;
	}
	return time;
}


// Function that counts the time running:
function CountingTime(){
	TIME.innerText = `${LeadingZero(time[0])}:${LeadingZero(time[1])}:${LeadingZero(time[2])} `;
	time[3]++;

	time[0] = Math.floor( (time[3]/100) / 60) ;
	time[1] = Math.floor( (time[3]/100) - (time[0]*60));
	time[2] = Math.floor( time[3] - (time[1]*100) - (time[0]*6000));
}

//Function to count errors
function ErrorCounter(){
    errorCount++;
    ERRORS.textContent = errorCount;
}


// Function that starts the timer:
function StartTime(){
	
	if(!timerRunning && TEXTAREA.value.length === 0){
		timerRunning = true;
		setInterval(CountingTime, 10);
	}
}


// Function to check if the text entered matches the text to type: 
function CheckSpelling(){
	let textTyped = TEXTAREA.value;
	let originalText = TEXT_TO_TYPE.textContent.substring(0, textTyped.length);

	if(  textTyped == originalText){
		TEXTAREA.style.borderColor = "#4285f4";
	}else{
		TEXTAREA.style.borderColor = "#EA4335";
		ErrorCounter();
	}

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