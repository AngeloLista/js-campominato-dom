



// Getting elements
const select = document.getElementById("select");
const grid = document.getElementById("grid");
const button = document.getElementById("play");
const resultMessage = document.getElementById('game-over-message');

const getRandNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Game Starting Funcion
function start() {
    grid.innerHTML = '';
    button.innerText = 'RESTART'

    // Variables
    let attempts = 0;
    const totalBombs = 16;

    let col;

    switch (select.value) {
        case "easy":
            col = 10;
            break;
        case "hard":
            col = 7;
            break;
        case "normal":
            col = 9;
            break;
    }

    const totalCells = col * col;

    const maxAttempts = totalCells - totalBombs;


    // FUNCTIONS
    // GenerateBombs
    const generateBombs = (totalBombs, totalNumber) => {
        const bombs = [];
        while (bombs.length < totalBombs) { // il numero di bombe è inferiore a 16
            const randNumber = getRandNum(1, totalNumber);
            if (!bombs.includes(randNumber)) { // Controllo se c'è nell'array di bombe
                bombs.push(randNumber);
            }
        }
        return bombs;
    }

    // GenerateGrid
    const generateGrid = (cellsNumber, cellsPerRow, bombs) => {
        for (let i = 1; i <= cellsNumber; i++) {
            const cell = createCell(i, cellsPerRow);
            cell.addEventListener('click', (event) => onCellClick(event.target, bombs, i));
            grid.appendChild(cell);
        }
    }

    // CreateCell
    const createCell = (cellNumber, cellsPerRow) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.innerText = cellNumber;
        const wh = `calc(100% / ${cellsPerRow})`;
        cell.style.height = wh;
        cell.style.width = wh;
        return cell;
    }

    // OnCellClick
    const onCellClick = (clickedCell, bombs, number) => {
        const disabledCell = disableCell(clickedCell);

        if (bombs.includes(number)) {
            gameOver(bombs, attempts, true);
        } else {
            disabledCell.classList.add("safe")
            attempts++;
            if (attempts === maxAttempts) {
                gameOver(bombs, attempts, false);
            }
        }
    }

    // DisableCell
    const disableCell = cell => {
        const clone = cell.cloneNode(); //! .cloneNode() copia l'ememnto senza nulla dentro
        clone.innerText = cell.innerText;
        clone.classList.add('disabled');
        cell.parentNode.replaceChild(clone, cell);

        return clone;
    }

    // ShowBombs
    const showBombs = (bombs) => {
        const cells = document.querySelectorAll('.cell');
        for (let i = 0; i < totalCells; i++) {
            const cell = cells[i];
            const disabledCell = disableCell(cell);
            const cellNumber = parseInt(disabledCell.innerText);
            if (bombs.includes(cellNumber)) {
                disabledCell.classList.add('bomb');
            }
        }
    }

    // GameOver
    const gameOver = (bombs, attempts) => {
        const allCells = grid.querySelectorAll('.cell');

        for (let i = 0; i < allCells.length; i++) {
            allCells[i].removeEventListener('click', onCellClick);
        }

        showBombs(bombs);

        // Game Over Message
        const GameOverMessageGenerator = () => {
            return (attempts === maxAttempts) ? `You Won! You score is ${attempts}.` : `You lost... Your score is ${attempts}.`;
        }
        resultMessage.innerHTML = GameOverMessageGenerator();
    }

    // Calling functions
    const bombs = generateBombs(totalBombs, totalCells)
    generateGrid(totalCells, col, bombs);
}

// Event Listener for the play button
button.addEventListener("click", () => start());