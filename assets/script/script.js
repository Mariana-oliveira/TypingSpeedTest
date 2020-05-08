const TEXTAREA = document.querySelector(".text-typed");
const TIME = document.querySelector(".time");
const ERRORS = document.querySelector(".errors");
const RESET = document.querySelector(".reset");
const REFRESH_TEXT = document.querySelector(".refresh-text");
const TEXT_P = document.querySelector(".text-to-type");
const TEXT_TO_TYPE = document.querySelector(".text-to-type ").innerHTML;


var time = [0,0,0,0];  //min, sec, csec, csec
var timerRunning = false;
var totalErrors = 0;
var typedLength = [0,0]; // min, max
var interval;

var textArray = [
	"Text to type.", 
	"The most common way people give up their power is by thinking they don’t have any.", 
	"Great things never come from comfort zones.",
	"Push yourself, because no one else is going to do it for you.",
	"It's going to be hard, but hard does not mean impossible.",
	"Learning never exhausts the mind.",
  	"The only way to do great work is to love what you do."
];
var currentText = 0;

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
function ErrorCounter(textTyped, originalText){
	
	let errorCount =0

	for(i = 0; i < textTyped.length; i++){
		textTyped[i] != originalText[i] ? errorCount++ : errorCount;
	}
	totalErrors += errorCount;
	ERRORS.textContent = totalErrors;
}


// Function that starts the timer:
function StartTime(){
	if(!timerRunning && TEXTAREA.value.length === 0){
		timerRunning = true;
		interval = setInterval(CountingTime, 10);
	}
}


// Function to check if the text entered matches the text to type: 
function CheckSpelling(){
	let textTyped = TEXTAREA.value;
	let originalTextSub = TEXT_TO_TYPE.substring(0, textTyped.length);

	if(textTyped == TEXT_TO_TYPE)
	{
		clearInterval(interval);
		TEXTAREA.style.borderColor = "#429890";

	} else if(textTyped == originalTextSub){

		TEXTAREA.style.borderColor = "#4285f4";
		
	}else{
		TEXTAREA.style.borderColor = "#EA4335";
				
		
		// To be sure that when deleting it's not counting errors


		if(typedLength[1] < textTyped.length){
			typedLength[1] = textTyped.length;
			typedLength[0] = textTyped.length;
		}else{
			typedLength[0] = textTyped.length;
		}

		// if(textTyped.length >= typedLength[0])

		if(typedLength[0] == typedLength[1]){
			ErrorCounter(textTyped, originalTextSub);
		}

		console.log("Current: " + textTyped.length);
		console.log("MAX: " + typedLength[1]);
		console.log("MIN: " + typedLength[0]);
		
	}

}


// Function to reset the timer
function ResetTimer(){
	clearInterval(interval);
	interval = null;
	time = [0,0,0,0];
	totalErrors = 0;
	timerRunning = false;

	ERRORS.innerHTML = "0";
	TEXTAREA.value = "";
	TIME.innerHTML = "00:00:00";
	TEXTAREA.style.borderColor = "#1E1D21";
}


// Function to change the text to type
function ChangeTextToType(){
	ResetTimer()
	currentText < (textArray.length-1) ? currentText++ : currentText =0;
	console.log(textArray.length);
	console.log(currentText);
	TEXT_P.innerHTML = textArray[currentText];
}




// Event Listener
TEXTAREA.addEventListener("keypress", StartTime, false);
TEXTAREA.addEventListener("keyup", CheckSpelling, false);
RESET.addEventListener("click", ResetTimer, false);
REFRESH_TEXT.addEventListener("click", ChangeTextToType, false);