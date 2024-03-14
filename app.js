const gridElement = document.querySelector('.container')
const playButton = document.getElementById('play')
const CellsEasy = 100
const CellsNormal = 81
const CellsHard = 49
const bombsCount = 16
const bombs = []


playButton.addEventListener('click', function () {
    generateBombs()
    
    
    gridElement.innerHTML = '';
    for (let i = 0; i < CellsEasy; i++) {
        // console.log("FOR", i)
        let num = i + 1

        const cellEl = document.createElement('div')
        cellEl.className = 'cell'
        cellEl.innerHTML = num
        gridElement.append(cellEl)

        cellEl.addEventListener('click', function () {
            console.log('click sulla casella numero:', num)
            cellEl.classList.toggle('bg-black')

            
        })

    }

})

//Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.





    

    



 function generateBombs() { //FUNZIONE PER GENERARE LE BOMBE
    while(bombs.length < bombsCount){
    const bomb = Math.floor(Math.random() * 99) + 1
        

    let trovato = false;
    for(let x = 0; x < bombs.length; x++){
        if(bombs[x] === bomb){
            trovato = true;
        }
    }
        if(trovato === false){
            bombs.push(bomb)
        }
       
    }
    
}


