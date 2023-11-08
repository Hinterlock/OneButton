title = "Morse Encoder!";

description = `
`;

characters = [];

const G = {
	WIDTH: 100,
	HEIGHT: 100
};

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	isPlayingBgm: true,
};

// constants
const questionTime = 1000;

// variables
let isPressing;		// checking if button is held
let held; 			// counts how long button is held, to differentiate dots and dashes
let nextQ;			// check to ask next question
let timeout;		// keeping track of time till timeout into next question
let answer; 		// player input
let correctAnswer;	// what input should match
let txt;			// display text

// difficulty = digits
function Generator(digits){
	let resD = 0;
	for(let x in range(digits)){
		correctAnswer[parseInt(x)] = floor(Math.random()*2);
		resD += correctAnswer[parseInt(x)] * Math.pow(2, digits - parseInt(x) - 1);
	}
	txt = String(resD);
}

function update() {
	if (!ticks) { // Initialize variables
		isPressing = false;
		held = 0;
		nextQ = true;
		timeout = 0;
		answer = [];
		correctAnswer = [];
		txt = "testing";
	}
	// Gen prompt
	if (nextQ) {
		timeout = questionTime;
		// ask question
		Generator(5);
		console.log(txt);
		console.log(correctAnswer);
		nextQ = false;
	}
	
	box(vec(timeout*100/questionTime, 10), 2); // timeout bar
	text(String(floor(timeout*10/60)/10), vec(50-5, 2)); // timeout number

	text(txt, vec(G.WIDTH/4, 15)); // question
	text(String(answer), vec(G.WIDTH/4, 22)); // input so far

	line(vec(0, G.HEIGHT*3/4), vec(G.WIDTH, G.HEIGHT*3/4)); // separator line for cancel area
	text("Cancel", vec(G.WIDTH/4, G.HEIGHT*7/8)); // cancel text

	if(held > 10 && isPressing) { // indicator that youve held long enough
		box(vec(input.pos), 2);
	}

	// Input Handling
	if (input.isJustPressed) {
		isPressing = true;
		held = 0;
	}
	held += 1;
	if (input.isJustReleased) {
		isPressing = false;
		if(input.pos.y > G.HEIGHT*3/4) { // cancel input
			console.log("canceled");
			answer = [];
		} else {
			if (held > 10) { //held
				console.log("held");
				console.log(held);
				play("lucky");
				answer.push(1);
			} else { //tapped
				play("select");
				console.log("tapped");
				console.log(held);
				answer.push(0);
			}
		}
		console.log(answer);
	}

	if (answer.length == 5) { // Check if answer correct
		let correct = true;
		// compare to correct answer
		for (let i = 0; i < answer.length; i++) {
			if (answer[i] != correctAnswer[i]) {
				correct = false;
			}
		}
		if (correct) {
			nextQ = true;
			console.log("YIPPEEE!");
			score += 1;
		}
		// empty answer
		answer = [];
	}
	if (timeout <= 0) { // Check if prompt timed out
		nextQ = true;
		answer = [];
	} else {
		timeout -= 1;
	}
}
