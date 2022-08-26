const ting = new Audio('./ting.mp3');
const clickAudio = new Audio('./click.wav');
const victoryAudio = new Audio('./victory.mp3');
const music = new Audio('./music.mp3');
const inputArea = document.getElementsByClassName('inputArea')
let victoryBox = document.getElementById('victory');
let content = document.querySelector('.content');
let btn = document.getElementById('btnClick');
let details =document.getElementById('details')
let playerTurn =document.getElementById('playerTurn');

let player1 = prompt('Enter 1st Player Name');
let player2 = prompt('Enter 2nd player Name');

if(player1 === '')
player1 = prompt('Enter 1st Player Name Again');
if(player2 === '')
player2 = prompt('Enter 2nd Player Name Again');

player1 =player1.toUpperCase();
player2 = player2.toUpperCase();

var nextplayer = player1;
var initialTurn ="X";
playerTurn.innerText= nextplayer +" turn " + `(${initialTurn})`;

Array.from(inputArea).forEach(e=>{
    e.addEventListener('click',()=>{
        let value =initialTurn;
        if(e.innerText === ""){
            e.innerHTML = value;
            e.style.backgroundColor = `rgb(${255*Math.random()},${255*Math.random()},${255*Math.random()})`;
            clickAudio.play();
            victory();
            changePlayer();
            checkIfComplete();
            
        }
        else{
            console.log("Connot aadd");
            addTurn();
            ting.play();
        }
    })
    e.addEventListener('mouseover',()=>{
        e.classList.add('hovered')
    })
    e.addEventListener('mouseout',()=>{
        e.classList.remove('hovered')
    })
   
})

let addTurn= ()=>{
   return initialTurn= initialTurn === "O" ? "X" :"O";
}

let changePlayer=()=>{
     nextplayer = nextplayer === player1 ? player2 : player1;
    playerTurn.innerText = nextplayer + " turn " + `(${initialTurn})`;
    addTurn();
    playerTurn.innerText= nextplayer +" turn " + `(${initialTurn})`;
}


let win = [[0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]];
let victory=()=>{
    win.forEach(e=>{
        if( (inputArea[e[0]].innerText != "")&&(inputArea[e[0]].innerText === inputArea[e[1]].innerText) && (inputArea[e[1]].innerText === inputArea[e[2]].innerText) ){
        console.log("Victory")
        details.innerHTML = `${nextplayer} Wins ✊✊😁😂`;
        victoryAudio.play();
        inputArea[e[0]].classList.add('victoryAnimate');
        inputArea[e[1]].classList.add('victoryAnimate');
        inputArea[e[2]].classList.add('victoryAnimate');
        victoryBox.classList.add('victory');
        victoryBox.style.display = 'block';
        music.play();
        }
    })
}

let checkIfComplete =()=>{
    let count =9;
    Array.from(inputArea).forEach(e=>{
        if(e.innerText != ""){
        count--;
        }
        if(count ===0){
            details.innerHTML = 'DRAW 😂😂';
            victoryAudio.play();
            victoryBox.classList.add('victory');
            victoryBox.style.display = 'block';
        }
        console.log("Completed")
        // console.log(inputArea[e].innerText)
    })
}

btn.addEventListener('click',()=>{
    victoryBox.classList.remove('victory');
    victoryBox.style.display = 'none';
    
    Array.from(inputArea).forEach(e=>{
        e.innerText = "";
        e.style.backgroundColor = '';
        e.classList.remove('victoryAnimate');
    })
    
    initialTurn ="X";
    nextplayer = player1;
    playerTurn.innerText= nextplayer +" turn " + `(${initialTurn})`;
    music.pause();
})

