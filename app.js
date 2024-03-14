const gridElement = document.querySelector('.container')
const bodyElement = document.body
const playButton = document.getElementById('play')
const CellsEasy = 100
const CellsNormal = 81
const CellsHard = 49
const bombsCount = 16
const bombs = []
const headerDomElement = document.querySelector('.header')
const celleSenzaBomba = 9;
let celleSelezionateSenzaBomba = 0
let bombsTotal = 0

playButton.addEventListener('click', function () {



    while (bombs.length < bombsCount) {
        const bomb = Math.floor(Math.random() * 100) + 1


        let trovato = false;
        for (let x = 0; x < bombs.length; x++) {
            if (bombs[x] === bomb) {
                trovato = true;
                bombsTotal = bombs[x]
            }
        }
        if (trovato === false) {
            bombs.push(bomb)
        }

    }
    console.log(bombs)
    gridElement.innerHTML = '';
    for (let i = 0; i < CellsEasy; i++) {
        // console.log("FOR", i)
        let num = i + 1

        const cellEl = document.createElement('div')
        cellEl.className = 'cell'
        cellEl.innerHTML = num
        gridElement.append(cellEl)


        cellEl.addEventListener('click', function () {
            if (bombs.includes(num)) {
                gridElement.classList.add('opacity-25');
                cellEl.classList.add('bg-red')
                const messageLose = document.createElement('div')
                messageLose.className = 'm-auto d-flex flex-column opacity-100'
                messageLose.className += ' position-absolute top-50 start-50';
                messageLose.innerHTML = `
            <h1 class= "d-flex justify-content-center">Hai perso!</h1>
            <button class="restart btn btn-primary m-auto d-flex">Restart</button>
            `
                bodyElement.appendChild(messageLose)
                for (let i = 0; i < bombs.length; i++) {
                    console.log(bombs[i]);
                }

            }
            else {
                cellEl.classList.add('bg-cyan')
                celleSelezionateSenzaBomba++
                
                
            }
            if (celleSelezionateSenzaBomba === CellsEasy - bombsCount) {
                const messageWin = document.createElement('div')
                messageWin.className = 'm-auto d-flex flex-column'
                gridElement.innerHTML = ''
                messageWin.innerHTML = `
            <h1 class= "d-flex justify-content-center">Hai vinto!</h1>
            <button class="restart btn btn-primary m-auto d-flex">Restart</button>
            `
            gridElement.appendChild(messageWin)
            
            }
            
            //In seguito l’utente clicca su una cella:
            //se il numero è presente nella lista dei numeri generati

            //- abbiamo calpestato una bomba - la cella si colora di rosso.


        })

    }

})



//Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.







