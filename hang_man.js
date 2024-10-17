const words = {
  programing: [
    "php",
    "css",
    "javascript",
    "html",
    "go",
    "python",
    "mysql",
    "r",
    "fortren",
    "scale",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  famous: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
// Create letters
let lettersContainer = document.querySelector(".letters");
let categoryEle = document.querySelector(".category span");
let lettersGuess = document.querySelector(".letters-guess");
let theHangMan = document.querySelector(".hangman-draw");
let letters = [..."abcdefghijklmnopqrstuvwxyz"].sort(() => Math.random() - 0.5);

function setletters() {
  let drawletters = letters.map((el) => {
    return `
    <span class ='letter-box'>${el}</span>
    `;
  });
  lettersContainer.innerHTML = drawletters.join("");
}
setletters();

let [category, word] =Object.entries(words)[Math.floor(Math.random() * Object.keys(words).length)];
let getWord = [...word[Math.floor(Math.random() * word.length)]];
categoryEle.textContent = category;

// create Guess Content
function createGuessContent() {
  getWord.forEach((el) => {
    let span = document.createElement("span");
    span.innerHTML = el == " " ? "_" : "";
    lettersGuess.append(span);
  });
}
createGuessContent();

// let allLetters = document.querySelectorAll(".letter-box");
let letterGuess = document.querySelectorAll(".letters-guess span");
let wrongs = 0;
document.addEventListener("click", checkChoosen);

function checkChoosen(Event) {
  if (Event.target.classList.contains("letter-box")) {
    let status = false;
    Event.target.classList.add("clicked");
    getWord.forEach((el1, i1) => {
      if (Event.target.innerHTML.toLowerCase() == el1.toLowerCase()) {
        status = true;
        letterGuess.forEach((el2, i2) => {
          if (i1 == i2) {
            el2.innerHTML = Event.target.innerHTML;
          }
        });
      } 
    });
    checkWorngsAndEndGame( status) 
  }
}
// check Worngs And End Game
function checkWorngsAndEndGame( status) {
  if ([...letterGuess].map((el) => el.innerHTML).join("") == getWord.join("")) {
    endGame(true);
  }
  if (status === false) {
    wrongs++;
    theHangMan.classList.add(`wrong-${wrongs}`);
    endGame(false);
    document.querySelector("#fail").play();
  } else document.querySelector("#success").play();
}

// end game function
function endGame(value) {
  if (wrongs == 8||value==true) {
    lettersContainer.classList.add("finished");
    document.body.innerHTML += `
    <div class = 'popup'>
    ${
      value == false
        ? `GAME OVER  The Word Is ( ${getWord.join("")} )`
        : "NICE GAME"
    }
    </div>
    `;
  }
}
