/* eslint-disable no-plusplus */
import postData from './apiManipulation.js';

const newPlayerForm = document.querySelector('#input-container');
const newPlayerInput = document.querySelector('#player-input');
const newScoreInput = document.querySelector('#score-input');
const leaderBoard = document.querySelector('#leaderBoard-input');

const users = [];
const LOCAL_STORAGE_LIST_KEY = 'game.list';
let outList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

const createTask = ((playerName, playerScore) => ({ user: playerName, score: playerScore }));

const clearElement = ((element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
});

const save = (() => {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(outList));
});

const compare = ((a, b) => {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
});

export const displayElements = (() => {
  outList.sort(compare);
  const haley = document.getElementById('score_table');
  clearElement(haley);
  for (let i = 0; i < outList.length; i++) {
    const hale = document.getElementById('score_table');
    hale.innerHTML += `
        <li>${outList[i].user} :  ${outList[i].score}</li>`;
  }
  save();
});

export const addContent = (() => {
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

    postData('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/LrmdcBBQKQpvHIpn6Vpd/scores', users[0])
      .then((data) => data);
  });
});

export const refreshList = (() => {
  leaderBoard.addEventListener('click', () => {
    async function thisIsIt() {
      const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/LrmdcBBQKQpvHIpn6Vpd/scores');
      const scoreLine = await response.json();
      const playerData = scoreLine.result;
      outList = [...playerData];
      displayElements();
    }
    const result = thisIsIt();
    return result;
  });
});