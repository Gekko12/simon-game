
let sequence = [];
let humanSequence = [];
let level = 0;

const start_butt = document.getElementById('start-butt');
const info = document.querySelector('.js-info');
const lvl = document.querySelector('.js-level');
const tileContainer = document.querySelector('.js-container');

function resetGame(text) {
  alert(text);
  sequence = [];
  humanSequence = [];
  level = 0;
  start_butt.classList.remove('hide-butt');
  lvl.innerHTML = '&nbsp;';
  info.classList.add('hidden');
  tileContainer.classList.add('unclickable');
}


function humanTurn(level) {
  tileContainer.classList.remove('unclickable');
  info.textContent = `Your turn: ${level} Tap${level > 1 ? 's' : ''}`;
}


function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('activated');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}


function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}


function nextStep() {
  const tiles = ['red', 'green', 'blue', 'yellow'];
  const random = tiles[Math.floor(Math.random() * 4)];
  return random;
}


function nextRound() {
  level += 1;

  tileContainer.classList.add('unclickable');
  info.textContent = 'Wait for the computer';
  lvl.textContent = `Level ${level} of 20`;

  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}


function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - humanSequence.length;

  if (humanSequence[index] !== sequence[index]) {
    resetGame('Oops! Game over, you pressed the wrong tile');
    return;
  }

  if (humanSequence.length === sequence.length) {
    if (humanSequence.length === 20) {
      resetGame('Congrats! You completed all the levels');
      return;
    }

    humanSequence = [];
    info.textContent = 'Success! Keep going!';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Your turn: ${remainingTaps} Tap${
    remainingTaps > 1 ? 's' : ''
  }`;
}


function startGameFun() {
  start_butt.classList.add('hide-butt');
  info.classList.remove('hidden');
  info.textContent = 'Wait for the computer';
  nextRound();
}


start_butt.addEventListener('click', startGameFun);


tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;
  if (tile) handleClick(tile);
});

// txt = document.getElementById("highscore");
// txt.innerHTML = "Counts remaining : 5 ! &nbsp; You Win ...... Huraah !!!! ";
