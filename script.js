let btnStarts = document.getElementById('btnStarts');
btnStarts.style.display = 'none';

// let Grid = document.getElementById('grid');
// Grid.style.background = 'rgba(0,0,0,0.4)';
let numberRows = 3;
let numbercols = 3;

// création d'une grille
for (let i = 1 ; i <= numberRows ; i++){
  let createDiv = document.createElement('div');
  createDiv.id = 'row';  
  grid.appendChild(createDiv);
  createDiv.style.display = 'flex';
  createDiv.style.justifyContent = 'center';
  createDiv.style.textAlign = 'center';
  createDiv.style.lineHeight = '150px';
  // createDiv.style.textAlign = 'center';
  for (let j = 1 ; j <= numbercols; j++){
    let creatBox = document.createElement('div');
    creatBox.id = 'box'+ (j + numbercols*(i-1));
    creatBox.classList = 'box';    
    createDiv.appendChild(creatBox);    
  };
};

// creation du tableau des cases
let tableBox = document.getElementsByClassName('box');
let tab = [];
for (let i = 0 ; i < tableBox.length ; i++){
  tab.push(tableBox[i].id);
};
console.log(tableBox);
console.log(tab);


let start = document.getElementById('start');
let restart = document.getElementById('restart');
restart.disabled = true;    
// start.disabled = false;    
console.log(start.disabled);

// initialisation de l'affichage du tableau
let displayTableDark = () => {  
  for (let i = 0 ; i < tableBox.length ; i++){
    tableBox[i].style.background = 'rgba(0,0,0,0.3)';
  };
};

// Affichage du tableau en mode jeu
let displayTableClear = () => {  
  for (let i = 0 ; i < tableBox.length ; i++){
    tableBox[i].style.background = 'rgba(0,0,0,0)';
  };
};

let gameEnd = false;

let minimisedGameActivated = false;
let maximisedGameActivated = false;
let handNumber = 0;
let displayPlayer1 = document.getElementById('player1');
let displayPlayer2 = document.getElementById('player2');
let minimisedGame = document.getElementById('minimisedGame');
let maximisedGame = document.getElementById('maximisedGame');
let player1 = true;

let initialParameters = () => {
  for (let i = 0 ; i < tableBox.length ; i++){
    tableBox[i].innerText = '';
    // tableBox[i].style.cursor = 'default';
    displayTableDark();
  };
  // gameEnd = false;
  minimisedGameActivated = false;
  maximisedGameActivated = false;
  handNumber = 0;
  displayPlayer1.style.opacity = 0.3;
  displayPlayer2.style.opacity = 0.3;
  maximisedGame.disabled = true;
  player1 = true;
};

initialParameters();

// for (let i = 0 ; i < tableBox.length ; i++){
//   tableBox[i].disabled = true;
//   console.log(tableBox[i].disabled);
// };

let hand1 = document.getElementById('hand1');
let hand2 = document.getElementById('hand2');

// initialise l'affichage de la main 
let initializedHand = () => {
  hand1.textContent = '';
  hand2.textContent = '';
};

let gameWon = false;


let play1 = document.getElementById('player1');

let play2 = document.getElementById('player2');

let modal = document.getElementById("window-winner");
let modal1 = document.getElementById("window-open");
let modal2 = document.getElementById("window-equality");
let modalContent = document.getElementById("modalContent");

let closeWindowWinner = document.getElementById('close-window-winner');
let closeWindowEquality = document.getElementById("close-window-equality");

let firstPlayer = document.getElementById('firstPlayer');

let textJoueur1 = document.getElementById('textJoueur1');
let textJoueur2 = document.getElementById('textJoueur2');

let messageWinPlayer1 = document.getElementById('messageWinPlayer1');
let equality = document.getElementById('messageEquality');

let btnGames = document.getElementById('btnGames');

// 
minimisedGame.addEventListener('click', () => {
  minimisedGameActivated = true;
  btnStarts.style.display = 'block';
  btnGames.style.display = 'none';
  gameEnd = false;
  // start.disabled = false;  
  // console.log(minimisedGameActivated);
  // console.log(maximisedGameActivated);
});

//
maximisedGame.addEventListener('click', () => {
  maximisedGameActivated = true;
  btnGames.style.display = 'none';
});

let simpleGame = () => {
  for (i = 0 ; i < tableBox.length ; i++){
    clic(tableBox[i]);
    console.log('if simple game')
    console.log(tableBox[i]);
  };
};

let nbClic = 0;
let force = 0;
// fonction appelée lorsqu'on clique sur une case. Suivant le joueur, on met un rond ou une croix et on détermine le gagnant ou l'égalité.
let clic = (event) => { 
  start.disabled = false;  
  event.addEventListener('click', (e)=>{    
    force ++;
    console.log(force);
    if (gameEnd || event.innerText !== '' || start.disabled === false){
      e.preventDefault();
    } else if (player1){
      handNumber ++;
      nbClic ++;
      console.log('handnumber P1:' + handNumber);
      console.log('nbClic P1:' + nbClic);
      console.log('premier clic');
      event.innerText = "O"; 
      win();
      messageEquality();
      player1 = false;
      whoPlay();
      displayPlayer2.style.opacity = 1;
      displayPlayer1.style.opacity = 0.3;
    } else {
      handNumber ++;
      nbClic ++;
      console.log('handnumber P2:' + handNumber);
      console.log('nbClic P2:' + nbClic);
      event.innerText = "X"; 
      win();
      messageEquality();
      player1 = true;
      whoPlay();
      displayPlayer2.style.opacity = 0.3;
      displayPlayer1.style.opacity = 1;
    };
  });
  // event.addEventListener('click', ()=>{
  //   if (player1){
  //     handNumber ++;
  //     event.innerText = "O"; 
  //     win();
  //     messageEquality();
  //     player1 = false;
  //     whoPlay();
  //     displayPlayer2.style.opacity = 1;
  //     displayPlayer1.style.opacity = 0.3;
  //   } else {
  //     handNumber++;
  //     event.innerText = "X";
  //     win();
  //     messageEquality();
  //     player1 = true;
  //     whoPlay();
  //     displayPlayer2.style.opacity = 0.3;
  //     displayPlayer1.style.opacity = 1;
  //   };
  // });
};

let firstGame = true;

start.addEventListener('click', (event) => {
  // gameEnd = false;
  if ((minimisedGameActivated && firstGame) || (maximisedGameActivated && firstGame) ){
    // console.log(start.disabled);
    // console.log(restart.disabled);
    // console.log(tableBox);
    simpleGame();
    // console.log(tableBox);
    console.log('if start');
    displayTableClear();
    start.disabled = true;  
    hand1.innerText = 'O';
    play1.style.opacity = 1;
    firstGame = false;
    // for (let i = 0 ; i < tableBox.length ; i++){
    //   tableBox[i].style.cursor = 'pointer';
    // };
    // console.log(start.disabled);
    // console.log(restart.disabled);
  } else {
    displayTableClear();
    hand1.innerText = 'O';
    play1.style.opacity = 1;
    start.disabled = true;
    event.preventDefault();
    console.log('else');
  }
});

// ouvre la fenêtre demandant les noms des joueurs
maximisedGame.addEventListener('click', () => {
  modal1.style.display = 'block';
  btnGames.style.display = 'none';
  maximisedGameActivated = true;
  btnStarts.style.display = 'block';
});
// (() => {   
//   modal1.style.display = 'block';
// })();

// console.log(firstPlayer.value);

// bouton valider de la fenêtre d'entrée - les joueurs donnent leur nom, choisissent qui commence
btn1.addEventListener('click', () => {
  let namePlayer1 = document.getElementById('namePlayer1');
  play1.textContent = namePlayer1.value;
  let namePlayer2 = document.getElementById('namePlayer2');
  play2.textContent = namePlayer2.value; 
  let playerBegin = firstPlayer.options[firstPlayer.selectedIndex].value;
  console.log(playerBegin); 
  if (playerBegin === "player1"){
    hand1.innerText = 'O';
    hand2.innerText = '';
    player1 = true;  
    displayPlayer1.style.opacity = 1;
  } else {
    hand2.innerText = 'X';
    hand1.innerText = '';
    player1 = false;
    displayPlayer2.style.opacity = 1;

  };
  modal1.style.display = 'none';
});

// lorsque le joueur 1 entre son nom, ce dernier s'ajoute à la liste select
namePlayer1.addEventListener('change', () => {
  textJoueur1.text = namePlayer1.value + ' commence';
});
// lorsque le joueur 2 entre son nom, ce dernier s'ajoute à la liste select
namePlayer2.addEventListener('change', () => {
  textJoueur2.text = namePlayer2.value + ' commence';
});

// affiche une icone en face du joueur qui a la main
let whoPlay = () => {
  if (player1){
    hand1.innerText = 'O';
    hand2.innerText = '';
    
  } else {
    hand2.innerText = 'X';
    hand1.innerText = '';
  }
}

// ouvre la fenêtre annoncant le vainqueur
let messageWinner = () => {
  if (player1){
    displayPlayer2.style.opacity = 0.3;
    displayPlayer1.style.opacity = 0.3;
    // let bloc = document.createElement('div');
    // bloc.id = 'bloc';
    // let texte = document.createTextNode("Bravo Player 1, vous avez gagné la partie !!!");
    // bloc.appendChild(texte);
    // modalContent.prepend(bloc);
    messageWinPlayer1.innerText = "Bravo " + play1.innerText + ", vous avez gagné la partie !!!";
    modal.style.display = 'block';
    start.disabled = true;  
    restart.disabled = true; 
    gameEnd = true;
    // for (let i = 0 ; i < tableBox.length ; i++){
    //   tableBox[i].style.cursor = 'default';
    // };
  } else {
    displayPlayer2.style.opacity = 0.3;
    displayPlayer1.style.opacity = 0.3;
    // let bloc = document.createElement('div');
    // bloc.id = 'bloc';  
    // let texte = document.createTextNode("Bravo Player 2, vous avez gagné la partie !!!");
    // bloc.appendChild(texte);
    // modalContent.prepend(bloc);
    messageWinPlayer1.innerText = "Bravo " + play2.innerText + ", vous avez gagné la partie !!!";
    modal.style.display = 'block'; 
    start.disabled = true;    
    restart.disabled = true; 
    gameEnd = true;
    // for (let i = 0 ; i < tableBox.length ; i++){
    //   tableBox[i].style.cursor = 'default';
    // };
  };
};

// ouvre la fenêtre d'égalité
let messageEquality = () => {
  if (handNumber === 9){
    equality.innerText = "Pas de gagnant !!!";
    modal2.style.display = 'block';
    start.disabled = true;    
    gameEnd = true;
    // for (let i = 0 ; i < tableBox.length ; i++){
    //   tableBox[i].style.cursor = 'default';
    // };
  };
};

// ouvre la fenêtre du vainqueur s'il y a un vainqueur
let win = () => {
  if (
    ((box1.innerText === 'O') && (box1.innerText === box2.innerText) && (box1.innerText === box3.innerText)) || 
    ((box4.innerText === 'O') && (box4.innerText === box5.innerText) && (box4.innerText === box6.innerText)) || 
    ((box7.innerText === 'O') && (box7.innerText === box8.innerText) && (box7.innerText === box9.innerText)) || 
    ((box1.innerText === 'O') && (box1.innerText === box4.innerText) && (box1.innerText === box7.innerText)) || 
    ((box2.innerText === 'O') && (box2.innerText === box5.innerText) && (box2.innerText === box8.innerText)) || 
    ((box3.innerText === 'O') && (box3.innerText === box6.innerText) && (box3.innerText === box9.innerText)) || 
    ((box1.innerText === 'O') && (box1.innerText === box5.innerText) && (box1.innerText === box9.innerText)) || 
    ((box3.innerText === 'O') && (box3.innerText === box5.innerText) && (box3.innerText === box7.innerText)) ||
    ((box1.innerText === 'X') && (box1.innerText === box2.innerText) && (box1.innerText === box3.innerText)) || 
    ((box4.innerText === 'X') && (box4.innerText === box5.innerText) && (box4.innerText === box6.innerText)) || 
    ((box7.innerText === 'X') && (box7.innerText === box8.innerText) && (box7.innerText === box9.innerText)) || 
    ((box1.innerText === 'X') && (box1.innerText === box4.innerText) && (box1.innerText === box7.innerText)) || 
    ((box2.innerText === 'X') && (box2.innerText === box5.innerText) && (box2.innerText === box8.innerText)) || 
    ((box3.innerText === 'X') && (box3.innerText === box6.innerText) && (box3.innerText === box9.innerText)) || 
    ((box1.innerText === 'X') && (box1.innerText === box5.innerText) && (box1.innerText === box9.innerText)) || 
    ((box3.innerText === 'X') && (box3.innerText === box5.innerText) && (box3.innerText === box7.innerText))

    ){
      messageWinner();
  }
};

// Lorsqu'on clique sur une case du tableau, on appelle la fonction clic.
// for (i = 0 ; i < tableBox.length ; i++){
//   clic(tableBox[i]);
// };




closeWindowWinner.addEventListener('click', () => {
  modal.style.display = "none";
  restart.disabled = false;   
  gameEnd = true;
});

closeWindowEquality.addEventListener('click', () => {
  modal2.style.display = "none";
  restart.disabled = false;  
  // for (let i = 0 ; i < tableBox.length ; i++){
  //   tableBox[i].disabled = true;
  //   console.log(tableBox[i].disabled);
  // }; 
  gameEnd = true;

});

restart.addEventListener('click', () => {
  btnGames.style.display = 'block';
  btnStarts.style.display = 'none';
  start.disabled = false;  
  restart.disabled = true;  
  gameEnd = true;
  

  initialParameters();
  initializedHand();
});

// // When the user clicks anywhere outside of the modal, close it
// window.addEventListener ('click', function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// });

// for (let i = 0 ; i < tableBox.length ; i++){
  
//   console.log(tableBox[i]);
//   console.log(typeof(tableBox[i]));

// }; 

