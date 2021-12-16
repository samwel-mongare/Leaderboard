import { outList, save } from '../js/addRefresh.js';

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function displayElements() {
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

