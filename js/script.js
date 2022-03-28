console.log('JS OK');

// Consegna
// L'utente indica TRAMITE DOM un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

// ! RECUPERO GLI ELEMENTI DAL DOM
let difficulty;
const grid = document.getElementById('grid');
const generateButton = document.getElementById('generate');

let col;

generateButton.addEventListener('click', function () {

    grid.innerText = '';
    generateButton.innerText = 'Ricomincia';

    difficulty = document.getElementById('number-of-cells').value;
    // if (difficulty === 100) {
    //     col = Math.sqrt(difficulty);
    // } else if (difficulty === 81){
    //     col = Math.sqrt(difficulty);
    // } else {
    //     col = Math.sqrt(difficulty);
    // };
    col = Math.sqrt(difficulty);
    console.log(col);
    for (i = 0; i < difficulty; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = `calc(100% / ${col})`
        cell.style.height = `calc(100% / ${col})`
        cell.innerText = i + 1;
        cell.addEventListener('click', function () {
            cell.classList.toggle('clicked');
        })

        grid.appendChild(cell);
    }

});

// cell.addEventListener('toggle', function(cell) {
//     cell.classList.add = 'clicked';
// });