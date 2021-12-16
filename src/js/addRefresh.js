import { postData } from '../js/apiManipulation.js';
import { displayElements } from '../js/display.js';

const newPlayerForm = document.querySelector('#input-container');
const newPlayerInput = document.querySelector('#player-input');
const newScoreInput = document.querySelector('#score-input');
const leaderBoard = document.querySelector('#leaderBoard-input');


let users = []
const LOCAL_STORAGE_LIST_KEY = 'game.list';
export let outList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];


function createTask(playerName, playerScore) {
  return { user: playerName, score: playerScore };
}

export function addContent() {
  newPlayerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const playerName = newPlayerInput.value;
    if (playerName == null || playerName === '') {
      return;
    }
    const playerScore = newScoreInput.value;
    if (playerScore == null || playerScore === '') {
      return;
    }
    const user = createTask(playerName, playerScore);
    newPlayerInput.value = null;
    newScoreInput.value = null;
    users.length = 0;
    users.push(user);

    postData('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/VVYbdCnAjuyb4bkxCqkJ/scores', users[0])
  .then(data => {
    return data;
  });
  });
}

export function refreshList() {
leaderBoard.addEventListener('click', (e) => {
async function thisIsIt(eserId) {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/VVYbdCnAjuyb4bkxCqkJ/scores');
    const scoreLine = await response.json()
    const playerData = scoreLine.result
    outList = [...playerData]
    displayElements()
};
    const result = thisIsIt(123)
return result;
});
}

export function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(outList));
}
