const TEXTAREA = document.querySelector(".text-typed");
const TIME = document.querySelector(".time");
const ERRORS = document.querySelector(".errors");
const RESET = document.querySelector(".reset");
const REFRESH_TEXT = document.querySelector(".refresh-text");
const TEXT_P = document.querySelector(".text-to-type");
const MODAL = document.querySelector(".modal");
const CLOSE_MODAL_BUTTON = document.querySelector(".close-button");
const OVERLAY = document.querySelector("#overlay");
const MODAL_TIME = document.querySelector(".modal-time");
const MODAL_ERRORS = document.querySelector(".modal-errors");
const MODAL_WORDS = document.querySelector(".modal-words");
const MODAL_CHAR = document.querySelector(".modal-char");
const MODAL_ACCURACY = document.querySelector(".modal-accuracy");


// Global variables
var time = [0,0,0,0];  //min, sec, csec, csec
var timerRunning = false;
var totalErrors = 0;
var interval;

// Array with quotes to type - set he first to the element
var textArray = [
	"The most common way people give up their power is by thinking they don't have any.", 
	"Great things never come from comfort zones.",
	"Push yourself, because no one else is going to do it for you.",
	"It's going to be hard, but hard does not mean impossible.",
	"Learning never exhausts the mind.",
	"The only way to do great work is to love what you do."
];
var currentText = 0;
var TEXT_TO_TYPE = textArray[currentText];
TEXT_P.innerHTML = textArray[currentText];




// Open Modal 
function OpenModal(){
	MODAL.classList.add("active");
	OVERLAY.classList.add("active");
}

//Close Modal
function CloseModal(){
	MODAL.classList.remove("active");
	OVERLAY.classList.remove("active");
	ResetTimer();
}

//Populate Modal with info
function PopulateModal(){
	let words = Math.round(textArray[currentText].split(" ").length / ((time[3]/100) / 60));
	let chars = Math.round(textArray[currentText].length / ((time[3]/100) / 60));
	let accuracy = Math.round( (1 - totalErrors / textArray[currentText].length) * 100);
	console.log(time[0]);

	MODAL_TIME.innerHTML = TIME.innerText;
	MODAL_ERRORS.innerHTML = totalErrors;
	MODAL_WORDS.innerHTML = words;
	MODAL_CHAR.innerHTML = chars;
	MODAL_ACCURACY.innerHTML = accuracy + "%";
}



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
function ErrorCounter(typedText, originalText){

	let length = typedText.length -1;

	if( typedText[length] != originalText[length] ){
		totalErrors++;
		ERRORS.textContent = totalErrors;
	}

}


// Function that starts the timer:
function StartTime(){

	if(!timerRunning && TEXTAREA.value.length === 0){
		timerRunning = true;
		interval = setInterval(CountingTime, 10);
	}
}


// Function to check if the text entered matches the text to type: 
function CheckSpelling(e){
	let textTyped = TEXTAREA.value;
	let originalTextSub = TEXT_TO_TYPE.substring(0, textTyped.length);

	let key = e.keyCode || e.CharCode;

	if(textTyped == TEXT_TO_TYPE)
	{
		clearInterval(interval);
		TEXTAREA.style.borderColor = "#429890";
		PopulateModal();
		OpenModal();

	} else if(textTyped == originalTextSub){

		TEXTAREA.style.borderColor = "#4285f4";
		
	}else{
		TEXTAREA.style.borderColor = "#EA4335";
			
		if( ![8,37,38,39,40,46].includes(key)){	
			ErrorCounter(textTyped, originalTextSub);
		}
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
	ResetTimer();
	currentText < (textArray.length-1) ? currentText++ : currentText =0;

	TEXT_P.innerHTML = textArray[currentText];
	TEXT_TO_TYPE = textArray[currentText];
}




// Event Listener
TEXTAREA.addEventListener("keypress", StartTime, false);
TEXTAREA.addEventListener("keyup", CheckSpelling, false);
RESET.addEventListener("click", ResetTimer, false);
REFRESH_TEXT.addEventListener("click", ChangeTextToType, false);
CLOSE_MODAL_BUTTON.addEventListener("click", CloseModal, false);
OVERLAY.addEventListener("click", CloseModal, false);