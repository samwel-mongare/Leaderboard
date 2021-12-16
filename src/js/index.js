import '../styles/style.css';

const id = 'VVYbdCnAjuyb4bkxCwkJ'
const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/mklcO7kjPIAMkypqYEBC/scores'

const newPlayerForm = document.querySelector('#input-container');
const newPlayerInput = document.querySelector('#player-input');
const newScoreInput = document.querySelector('#score-input');
const leaderBoard = document.querySelector('#leaderBoard-input');


let users = []
const LOCAL_STORAGE_LIST_KEY = 'game.list';
let outList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];


function createTask(playerName, playerScore) {
  return { user: playerName, score: playerScore };
}

// export function addContent() {
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

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  return response.json();
}

postData('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/VVYbdCnAjuyb4bkxCqkJ/scores', users[0])
  .then(data => {
    return data;
  });
  });
// }

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

function displayElements() {
    outList.sort((a,b) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0))
    const haley = document.getElementById('score_table');
    clearElement(haley)
    for(let i=0; i<outList.length; i++){
        const hale = document.getElementById('score_table');
        hale.innerHTML += `
        <li>${outList[i].user} :  ${outList[i].score}</li>`
}
save()
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}


function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(outList));
}


displayElements();
