const gridElement = document.querySelector('.container');
const mainElement = document.querySelector('main');
const playButton = document.getElementById('play');
const CellsEasy = 100;
const bombsCount = 10;
const bombs = [];
const headerDomElement = document.querySelector('.header');
const counterDomElement = document.getElementById('counter');
const bombSound = document.getElementById('bombSound');

let celleSelezionateSenzaBomba = 0;
let bombeCliccate = 0;
const maxBombePerdute = 5;

playButton.addEventListener('click', startGame);

function startGame() {
    // Resetting the bombs array and other variables
    bombs.length = 0;
    celleSelezionateSenzaBomba = 0;
    bombeCliccate = 0;
    counterDomElement.innerHTML = `${celleSelezionateSenzaBomba}`;

    // Remove opacity class from grid element
    gridElement.classList.remove('opacity-25');

    while (bombs.length < bombsCount) {
        const bomb = Math.floor(Math.random() * 100) + 1;
        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    }

    console.log(bombs);
    gridElement.innerHTML = '';

    for (let i = 0; i < CellsEasy; i++) {
        let num = i + 1;

        const cellEl = document.createElement('div');
        cellEl.className = 'cell';
        cellEl.innerHTML = num;
        gridElement.append(cellEl);

        cellEl.addEventListener('click', function () {
            if (bombs.includes(num)) {
                // Play bomb sound
                bombSound.play();

                cellEl.classList.add('bg-red', 'animate-bomb');
                bombeCliccate++;

                if (bombeCliccate >= maxBombePerdute) {
                    gridElement.classList.add('opacity-25');
                    revealAllBombs();
                    const messageLose = document.createElement('div');
                    messageLose.className = 'opacity-100 position-absolute';
                    messageLose.innerHTML = `
                        <h1 class="d-flex justify-content-center">Hai perso!</h1>`;
                    const restartButton = document.createElement('button');
                    restartButton.className = 'btn btn-primary m-auto d-flex';
                    restartButton.innerHTML = `Restart`;
                    messageLose.appendChild(restartButton);
                    mainElement.appendChild(messageLose);

                    restartButton.addEventListener('click', restartGame);

                    // Disable further clicks on grid
                    const allCells = document.querySelectorAll('.cell');
                    allCells.forEach(cell => {
                        cell.style.pointerEvents = 'none';
                    });
                }
            } else if (!cellEl.classList.contains('bg-cyan')) {
                cellEl.classList.add('bg-cyan');
                celleSelezionateSenzaBomba++;
                console.log(celleSelezionateSenzaBomba);
                counterDomElement.innerHTML = `${celleSelezionateSenzaBomba}`;

                if (celleSelezionateSenzaBomba === CellsEasy - bombsCount) {
                    const messageWin = document.createElement('div');
                    messageWin.className = 'm-auto d-flex flex-column';
                    gridElement.innerHTML = '';
                    messageWin.innerHTML = `
                        <h1 class="d-flex justify-content-center">Hai vinto!</h1>
                        <button class="restart btn btn-primary m-auto d-flex">Restart</button>
                    `;
                    gridElement.appendChild(messageWin);

                    const restartButtonWin = messageWin.querySelector('.restart');
                    restartButtonWin.addEventListener('click', restartGame);
                }
            }
        });
    }
}

function revealAllBombs() {
    const allCells = document.querySelectorAll('.cell');
    allCells.forEach(cell => {
        if (bombs.includes(parseInt(cell.innerHTML))) {
            cell.classList.add('bg-red', 'animate-bomb');
        }
    });
}

function restartGame() {
    // Remove the lose/win message
    const messageElement = document.querySelector('.position-absolute') || document.querySelector('.m-auto.d-flex.flex-column');
    if (messageElement) {
        messageElement.remove();
    }
    // Restart the game
    startGame();
}
