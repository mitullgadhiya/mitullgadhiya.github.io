
// --------------------- S T A R T --------------------------

const cross_class  		 = "cross";
const circle_class 		 = "circle";
const WinninCombinations = [

	// horizontal
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],

	// vertical
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],

	// diagonal
	[0, 4, 8],
	[2, 4, 6]
];

const cellElements 				= document.querySelectorAll("[data-cell]");
const board        				= document.getElementById("board");
const winningMessageElement 	= document.getElementById("winningMessage");
const restartButton				= document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
	circleTurn = false;
	cellElements.forEach(cell =>  {
		cell.classList.remove(cross_class);
		cell.classList.remove(circle_class);
		cell.removeEventListener("click", handleClick);
		cell.addEventListener("click", handleClick, { once: true })
 	});
	setBoardHoverClass();
	winningMessageElement.classList.remove("show");
}


// handling the clicks on the board while game is running.
function handleClick(e) {
	const cell 			= e.target;
	const currentClass	= (circleTurn?circle_class:cross_class);
	// place the mark
	placeMark(cell, currentClass)
	// check for win
	if (checkWin(currentClass)) {
		endGame(false);
	// check for Draw
	} else if (isDraw()) {
		endGame(true);
	} else {
	// switch turns
	swapTurns()
	setBoardHoverClass()
	}
} 

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText 	=  "Draw !";
	} else {
		winningMessageTextElement.innerText = `${circleTurn?"O":"X"} wins`;
	}
	winningMessageElement.classList.add("show");
}

// @dev logic for draw game.
function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(cross_class) ||
		cell.classList.contains(circle_class);
	});
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

// @dev swapTurns
function swapTurns() {
	circleTurn = !circleTurn;
}

// @dev maintains the position of actions even after refreshing.
function setBoardHoverClass() {
	board.classList.remove(cross_class);
	board.classList.remove(circle_class);
	if (circleTurn) {
		board.classList.add(circle_class);
	} else {
		board.classList.add(cross_class);
	}
}

// @dev checking if player wins !
function checkWin(currentClass) {
	return WinninCombinations.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}