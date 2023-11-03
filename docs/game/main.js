title = "Number Cruncher";

description = `
`;

characters = [];

const G = {
	WIDTH: 100,
	HEIGHT: 150
};

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	isPlayingBgm: true,
};

/** 
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Star ):
 */

/**
 * @type { Star [] }
*/
let stars;





let isPressing;
let held;
let nextQ;
let timeout;
let answer;
let correctAnswer;
let txt;
let test;


//From the moment I understood the weakness of the flesh, it disgusted me https://www.youtube.com/watch?v=9gIMZ0WyY88

// difficulty = digits
function Generator(digits){
	let resD = 0;
	for(let x in range(digits)){
		correctAnswer[parseInt(x)] = floor(Math.random()*2);
		resD += correctAnswer[parseInt(x)] * Math.pow(2, digits - parseInt(x) - 1);
	}
	return resD;
} 

function altGen(){
	let max = 32;
	let answer = Math.random() * max;

	let result = (answer >>> 0).toString(2);

//	result = ;

	return result;
}

function update() {
	if (!ticks) {
		console.log("rat"); //me when, you when, me https://www.youtube.com/shorts/H63ZboU92c4
		isPressing = false;
		held = 0;
		nextQ = true;
		timeout = 0;
		answer = [];
		correctAnswer = [];
		txt = "testing";
		test = "saa";
	}
	// Gen prompt
	if (nextQ) {
		timeout = 600;
		// ask question
		//txt = String(Generator(5));
		txt = String(Generator(5));
		console.log(txt);
		console.log(correctAnswer);
		//correctAnswer = [1, 0, 1, 0, 1];
		nextQ = false;
	}
	box(vec(timeout*100/600, 10), 2);
	text(String(floor(timeout*10/60)/10), vec(50-5, 2));
	text(txt, vec(45, 15));
	text(String(answer), vec(45, 22));
	line(vec(0, G.HEIGHT/2), vec(G.WIDTH, G.HEIGHT/2));
	text("Cancel", vec(G.WIDTH/2, G.HEIGHT*3/4));
	if(held > 10)
	{
		box(vec(input.pos), 2);
	}




	// Input Handling
	if (input.isJustPressed) {
		isPressing = true;
		held = 0;
	}
	if (isPressing) {
		held += 1;
	}
	if (input.isJustReleased) {
		isPressing = false;
		if(input.pos.y > G.HEIGHT/2)
		{
			console.log("canceled");
		}
		else
		{
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
		held = 0;
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
	// Check if prompt timed out
	if (timeout <= 0) {
		nextQ = true;
		answer = [];
	} else {
		timeout -= 1;
	}

}
