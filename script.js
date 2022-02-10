let btnStarts = document.getElementById('btnStarts');
btnStarts.style.display = 'none';
let onePlayer = true;
let easyGame = false
let hardGame = true;

let btnRadio1 = document.getElementById('flexRadioDefault1');
let btnRadio2 = document.getElementById('flexRadioDefault2');

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


// expected output: true
// creation du tableau des cases
let tableBox = document.getElementsByClassName('box');
let box1 = document.getElementById('box1');
let box2 = document.getElementById('box2');
let box3 = document.getElementById('box3');
let box4 = document.getElementById('box4');
let box5 = document.getElementById('box5');
let box6 = document.getElementById('box6');
let box7 = document.getElementById('box7');
let box8 = document.getElementById('box8');
let box9 = document.getElementById('box9');
// let exemple = [box1];
// console.log(exemple);

// copie du tableau des cases
let tableBoxRemaining = new Array();
for (let i = 0 ; i < tableBox.length ; i++ ){
  tableBoxRemaining[i] = tableBox[i]; 
};
// console.log (tableBoxRemaining);
let tab = [];
for (let i = 0 ; i < tableBox.length ; i++){
  tab.push(tableBox[i].id);
};

// création du tableau des combinaisons gagnantes
let tableWinningCombinations = [
  [tableBox[0], tableBox[1],tableBox[2]],
  [tableBox[3], tableBox[4],tableBox[5]],
  [tableBox[6], tableBox[7],tableBox[8]],
  [tableBox[0], tableBox[3],tableBox[6]],
  [tableBox[1], tableBox[4],tableBox[7]],
  [tableBox[2], tableBox[5],tableBox[8]],
  [tableBox[0], tableBox[4],tableBox[8]],
  [tableBox[2], tableBox[4],tableBox[6]],
];
let copyTableCombinations = new Array();
for (let i = 0 ; i < tableWinningCombinations.length ; i++ ){
  copyTableCombinations[i] = tableWinningCombinations[i]; 
};

// console.log(tableWinningCombinations[0][0]);
// console.log(typeof(tableWinningCombinations));
let tableBoxPlayer1 = [box1];
console.log(tableBoxPlayer1);
let tableBoxMorpion = [box5];
let tablePossibleCombinations = [];
console.log()

// for (let i = 0; i < copyTableCombinations.length ; i++){
//   for (let j = 0; j < copyTableCombinations[i].length ; j++){
//     for (let element of tableBoxPlayer1){
//       if (copyTableCombinations[i].includes(element)){
//         tablePossibleCombinations.push(tableWinningCombinations[i]);
//         let index = copyTableCombinations[i].indexOf(element);
//         console.log(index);
//         copyTableCombinations[i].splice(index, 1);       
//         // console.log ('ok' + ' ' + [i] + ' ' + [j]);
//       };      
//       // else {
//       //   console.log ('bad' + ' ' + [i] + ' ' + [j]);
//       // };
//       // console.log (tablePossibleCombinations);
//       // break;      
//     };
//   };
// };

// console.log (tablePossibleCombinations);
// console.log (copyTableCombinations);





let start = document.getElementById('start');
let restart = document.getElementById('restart');
restart.disabled = true;    
// start.disabled = false;    
// console.log(start.disabled);

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
let victoriesPlayer1 = 0;
let victoriesMorpion = 0;
let victoriesPlayer2 = 0;
let gameInProgress = true;
let player1Win = true;
let morpionWin = false;
let gameWinned = false;

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
  // maximisedGame.disabled = true;
  player1 = true;
  // victoriesPlayer1 = 0;
  // victoriesPlayer2 = 0;

  // réinitialisation du tableau restant
  for (let i = 0 ; i < tableBox.length ; i++ ){
    tableBoxRemaining[i] = tableBox[i]; 
  };
};
let initialParametersBegin = () => {  
  for (let i = 0 ; i < tableBox.length ; i++){
    tableBox[i].innerText = '';
    // tableBox[i].style.cursor = 'default';
    displayTableClear();
  };
  gameInProgress = true;
  // gameEnd = false;
  minimisedGameActivated = false;
  maximisedGameActivated = false;
  handNumber = 0;
  gameWinned = false;
  // displayPlayer1.style.opacity = 0.3;
  // displayPlayer2.style.opacity = 0.3;
  // if (player1Win){
  //   player1 = false;
  // } else {
  //   player1 = true;
  // };
  // maximisedGame.disabled = true;
  // player1 = true;
  // victoriesPlayer1 = 0;
  // victoriesPlayer2 = 0;

  tableBoxPlayer1 = [];
  tableBoxMorpion = [];

  // réinitialisation du tableau restant
  for (let i = 0 ; i < tableBox.length ; i++ ){
    tableBoxRemaining[i] = tableBox[i]; 
  };
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

let btnBeginWindowWinner = document.getElementById('begin_Button_window_winner');
let btnRestartWindowWinner = document.getElementById('restart_Button_window_winner');
let btnBeginWindowEquality = document.getElementById('begin_Button_window_equality');
let btnRestartWindowEquality = document.getElementById('restart_Button_window_equality');

let firstPlayer = document.getElementById('firstPlayer');

let textJoueur1 = document.getElementById('textJoueur1');
let textJoueur2 = document.getElementById('textJoueur2');

let messageWinPlayer = document.getElementById('messageWinPlayer');
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
// maximisedGame.addEventListener('click', () => {
//   maximisedGameActivated = true;
//   btnGames.style.display = 'none';
// });

// let tab2 = () => {
//   for (i = 0 ; i < tableBoxRemaining.length ; i++){
//     clic2(tableBoxRemaining[i]);
//   // for (let element of tableBoxRemaining){
//   //   clic2(tableBoxRemaining[element])
//     console.log(tableBoxRemaining[i]);
//   };
// };

// let clic2 = (event) => {
//   let index = tableBoxRemaining.indexOf(event);
//   console.log(tableBoxRemaining.indexOf(event));
//   tableBoxRemaining.splice(index, 1);
//   // tableBoxRemaining.push("5");
// };

let simpleGame = () => {
  for (i = 0 ; i < tableBox.length ; i++){
    clic(tableBox[i]);
    console.log('if simple game')
    console.log(tableBox[i]);
  };
};

// fonction pour régler le temps de réponse du joueur morpion
let boxToPlay = '';
let timeOutResponseMorpion = '';
let delayResponseMorpion = () => {
  console.log('boxToPlay dans formule = ' + boxToPlay);
  boxToPlay.innerText = "X";
};
let responseMorpion = ()=>{
  timeOutResponseMorpion = window.setTimeout(delayResponseMorpion, 0);
};

let nbClic = 0;
let force = 0;
// fonction appelée lorsqu'on clique sur une case. Suivant le joueur, on met un rond ou une croix et on détermine le gagnant ou l'égalité.
let clic = (event) => { 
  start.disabled = false; 
  // clic2(event); 
  event.addEventListener('click', (e)=>{  
    console.log('one player debut clic = ' + onePlayer);
    console.log('gameWinned debut clic = ' + gameWinned);
    // console.log('box 1 = ' + box1.innerText);
    // console.log('box 2 = ' + box2.innerText);
    // console.log('box 3 = ' + box3.innerText);
    // console.log('box 4 = ' + box4.innerText);
    // console.log('box 5 = ' + box5.innerText);
    // console.log('box 6 = ' + box6.innerText);
    // console.log('box 7 = ' + box7.innerText);
    // console.log('box 8 = ' + box8.innerText);
    // console.log('box 9 = ' + box9.innerText);
    if (event.innerText === ''){
      let index = tableBoxRemaining.indexOf(event);
      tableBoxRemaining.splice(index, 1);
    } else {
      tableBoxRemaining;
    };
    if (gameEnd || event.innerText !== '' || start.disabled === false){
      e.preventDefault();
    } else if (player1){
      handNumber ++;
      nbClic ++;
      event.innerText = "O"; 
      tableBoxPlayer1.push(event); /* on créé un tableau des cases jouées par Player 1 */
      console.log(tableBoxPlayer1);
      win();
      messageEquality();
      whoPlay();
      if (onePlayer){
        displayPlayer1.style.opacity = 1;
        displayPlayer2.style.opacity = 0.3;  
      } else {
        displayPlayer2.style.opacity = 1;
        displayPlayer1.style.opacity = 0.3;  
      };
      player1 = false;
      if (onePlayer && easyGame && tableBoxRemaining.length > 1 && gameWinned === false){
        handNumber ++;
        player1 = false;
        let numberBoxRemaining = tableBoxRemaining.length; /* on récupère le nombre de cases restantes */
        /* on cherche un nombre aléatoire pour cocher au hasard une des cases restantes */
        let randomNumber = function() { 
          return Math.floor(Math.random() * (numberBoxRemaining-1));
        };        
        let nb = randomNumber();
        boxToPlay = tableBoxRemaining[nb];
        tableBoxMorpion.push(boxToPlay); /* on rajoute au tableau des cases déjà jouées par morpion la case jouée */
        // tableBoxMorpion.push(tableBoxRemaining[nb]);
        // responseMorpion();
        boxToPlay.innerText = "X"; /* on joue la case */
        tableBoxRemaining.splice(nb, 1); /* on enlève la case tu tableau des cases restantes */
        win(); /* on appelle la fonction pour savoir si le joueur a gagné après avoir joué son coup */
        messageEquality(); /* on appelle la fonction si les joueurs ont fait égalité */
        whoPlay(); /* on détermine le prochain joueur qui commence */
        player1 = true;
      } else if (onePlayer && easyGame && !gameWinned && handNumber < 9){
        handNumber ++;
        player1 = false;
        boxToPlay = tableBoxRemaining[0];
        responseMorpion();
        console.log('reponse 2');

        // player1 = true;
        win();
        messageEquality();
        whoPlay();
        player1 = true;
      } else if (onePlayer && hardGame){
        console.log (handNumber);
        // box5.innerText = 'X';
        handNumber ++;
        console.log ('hardgame handnumber = ' + handNumber);
        if (handNumber == 2){
          if (box5.innerText === ''){
            box5.innerText = 'X';
          };

        };
        player1 = false;
        
        // for (let i = 0; i < copyTableCombinations.length ; i++){
        //   for (let j = 0; j < copyTableCombinations[i].length ; j++){
        //     // for (let element of tableBoxPlayer1){
        //       if (copyTableCombinations[i].includes(event)){
        //         tablePossibleCombinations.push(tableWinningCombinations[i]);
        //         // let index = copyTableCombinations[i].indexOf(element);
        //         // console.log(index);
        //         // copyTableCombinations[i].splice(index, 1);       
        //         // console.log ('ok' + ' ' + [i] + ' ' + [j]);
        //       };      
        //       // else {
        //       //   console.log ('bad' + ' ' + [i] + ' ' + [j]);
        //       // };
        //       // console.log (tablePossibleCombinations);
        //       // break;      
        //     // };
        //   };
        // };
        win();
        messageEquality();
        whoPlay();
        player1 = true;
      };
    } else {
      handNumber ++;
      nbClic ++;
      // console.log('handnumber P2:' + handNumber);
      // console.log('nbClic P2:' + nbClic);
      event.innerText = "X"; 
      win();
      messageEquality();
      whoPlay();
      displayPlayer2.style.opacity = 0.3;
      displayPlayer1.style.opacity = 1;
      player1 = true;
    };
    // console.log('handnumber = ' + handNumber);
    // console.log('box 1 = ' + box1.innerText);
    // console.log('box 2 = ' + box2.innerText);
    // console.log('box 3 = ' + box3.innerText);
    // console.log('box 4 = ' + box4.innerText);
    // console.log('box 5 = ' + box5.innerText);
    // console.log('box 6 = ' + box6.innerText);
    // console.log('box 7 = ' + box7.innerText);
    // console.log('box 8 = ' + box8.innerText);
    // console.log('box 9 = ' + box9.innerText);
  });
};

console.log (tablePossibleCombinations);
console.log (copyTableCombinations);

let firstGame = true;

start.addEventListener('click', (event) => {
  // gameEnd = false;
  if (onePlayer){
    play2.innerText = "morpion";
  };
  if ((minimisedGameActivated && firstGame) || (maximisedGameActivated && firstGame) ){
    // console.log(start.disabled);
    // console.log(restart.disabled);
    // console.log(tableBox);
    simpleGame();
    // tab2();
    // console.log(tableBox);
    console.log('if start');
    displayTableClear();
    start.disabled = true;  
    if (player1){
      hand1.innerText = 'O';
      play1.style.opacity = 1;
    };
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
  namePlayer2.style.display = 'none';
  firstPlayer.style.display = 'none';  
  btnRadio2.addEventListener('click', () => {
    namePlayer2.style.display = 'block';
    firstPlayer.style.display = 'block';
  });
  btnRadio1.addEventListener('click', () => {
    namePlayer2.style.display = 'none';
    firstPlayer.style.display = 'none';

  });

  // btnGames.style.display = 'block';
  maximisedGameActivated = true;
  // btnStarts.style.display = 'block';
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
  if (btnRadio1.checked){
    console.log(btnRadio1.checked);
    play2.textContent = "morpion";
  } else {
    play2.textContent = namePlayer2.value;
  };
  // play2.textContent = namePlayer2.value; 
  let playerBegin = firstPlayer.options[firstPlayer.selectedIndex].value;
  namePlayer2.style.display = 'none';
  
  // console.log(btnRadio1.checked);
  // if (btnRadio1.checked ){
  //   namePlayer2.style.display = 'none';
  // }
  console.log(playerBegin); 
  if (playerBegin === "player1" || btnRadio1.checked){
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
  btnGames.style.display = 'none';
  // maximisedGameActivated = true;
  btnStarts.style.display = 'block';
  // start.disabled = true;
  restart.disabled = true;
  displayTableDark();
  // hand1.innerText = 'O';
  // play1.style.opacity = 1;
  gameEnd = false;
  btnRadio1.checked = true;
  player1 = true;
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
  // console.log("player 1 whoplay = " + player1);
  // console.log('oneplayer whoplay = ' + onePlayer);
  if (onePlayer){
    hand1.innerText = 'O';
    hand2.innerText = '';
  } else if (player1){
    
    hand1.innerText = '';
    hand2.innerText = 'X';
    
  } else {
    hand1.innerText = 'O';
    hand2.innerText = '';
  }
};

// ouvre la fenêtre annoncant le vainqueur
let messageWinner = () => {
  // console.log('player1 message winner = ' + player1);
  // console.log('onePlayer = ' + onePlayer);
  if (player1){
    victoriesPlayer1 ++;
    displayPlayer2.style.opacity = 0.3;
    displayPlayer1.style.opacity = 0.3;
    // let bloc = document.createElement('div');
    // bloc.id = 'bloc';
    // let texte = document.createTextNode("Bravo Player 1, vous avez gagné la partie !!!");
    // bloc.appendChild(texte);
    // modalContent.prepend(bloc);
    if (onePlayer){
      if (victoriesPlayer1 > victoriesMorpion){
        messageWinPlayer.innerText = "Bravo " + play1.innerText + ", vous avez gagné la partie !!! \nvous menez " + victoriesPlayer1 + " à " + victoriesMorpion;
      } else if (victoriesPlayer1 < victoriesMorpion){
        messageWinPlayer.innerText = "Bravo " + play1.innerText + ", vous avez gagné la partie !!! \n" + play2.innerText + " mène " + victoriesMorpion + " à " + victoriesPlayer1;
      } else {
        messageWinPlayer.innerText = "Bravo " + play1.innerText + ", vous avez gagné la partie !!! \nVous êtes à " + victoriesPlayer1 + " partout P1.";
      };
    } else {
      if (victoriesPlayer1 > victoriesPlayer2){
        messageWinPlayer.innerText = "Bravo " + play1.innerText + ", vous avez gagné la partie !!! \nvous menez " + victoriesPlayer1 + " à " + victoriesPlayer2;
      } else if (victoriesPlayer1 < victoriesPlayer2){
        messageWinPlayer.innerText = "Bravo " + play1.innerText + ", vous avez gagné la partie !!! \n" + play2.innerText + " mène " + victoriesPlayer2 + " à " + victoriesPlayer1;
      } else {
        messageWinPlayer.innerText = "Bravo " + play1.innerText + ", vous avez gagné la partie !!! \nVous êtes à " + victoriesPlayer1 + " partout P1.";
      };
    }    
    modal.style.display = 'block';
    start.disabled = true;  
    restart.disabled = true; 
    player1Win = true;
    gameWinned = true;
    // gameEnd = true;   
  } else if (onePlayer){    
    victoriesMorpion ++;
    displayPlayer2.style.opacity = 0.3;
    displayPlayer1.style.opacity = 0.3;
    modal.style.display = 'block';
    if (victoriesMorpion > victoriesPlayer1){
      messageWinPlayer.innerText = "Bravo " + play2.innerText + ", vous avez gagné la partie !!! \nvous menez " + victoriesMorpion + " à " + victoriesPlayer1 + '.';
    } else if (victoriesMorpion < victoriesPlayer1){
      messageWinPlayer.innerText = "Bravo " + play2.innerText + ", vous avez gagné la partie !!! \n" + play1.innerText + " mène " + victoriesPlayer1 + " à " + victoriesMorpion + '.';;
    } else {
      messageWinPlayer.innerText = "Bravo " + play2.innerText + ", vous avez gagné la partie !!! \nVous êtes à " + victoriesPlayer1 + " manche(s) partout.";
    };
    start.disabled = true;  
    restart.disabled = true; 
    morpionWin = true;
    gameWinned = true;
  } else {
    victoriesPlayer2 ++;
    displayPlayer2.style.opacity = 0.3;
    displayPlayer1.style.opacity = 0.3;
    if (victoriesPlayer2 > victoriesPlayer1){
      messageWinPlayer.innerText = "Bravo " + play2.innerText + ", vous avez gagné la partie !!! \nvous menez " + victoriesPlayer2 + " à " + victoriesPlayer1 + '.';
    } else if (victoriesPlayer2 < victoriesPlayer1){
      messageWinPlayer.innerText = "Bravo " + play2.innerText + ", vous avez gagné la partie !!! \n" + play1.innerText + " mène " + victoriesPlayer1 + " à " + victoriesPlayer2 + '.';;
    } else {
      messageWinPlayer.innerText = "Bravo " + play2.innerText + ", vous avez gagné la partie !!! \nVous êtes à " + victoriesPlayer1 + " manche(s) partout.";
    };
    modal.style.display = 'block'; 
    start.disabled = true;    
    restart.disabled = true; 
    player1Win = false;
    gameWinned = true;
    // gameEnd = true;
    // for (let i = 0 ; i < tableBox.length ; i++){
    //   tableBox[i].style.cursor = 'default';
    // };
  };
};

// ouvre la fenêtre d'égalité
let messageEquality = () => {
  // console.log('handNumber = ' + handNumber);
  // console.log('gameWinned = ' + gameWinned);
  if (handNumber === 9 && gameWinned === false){
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

btnBeginWindowWinner.addEventListener('click', () => {
  modal.style.display = "none";
  // restart.disabled = false;   
  gameEnd = false;
  btnGames.style.display = 'none';
  btnStarts.style.display = 'block';
  start.disabled = true;  
  restart.disabled = false; 
  if (onePlayer){
    player1 = true;
    displayPlayer1.style.opacity = 1;
    displayPlayer2.style.opacity = 0.3;  
  } else if (player1Win){
    player1 = false;
    displayPlayer1.style.opacity = 0.3;
    displayPlayer2.style.opacity = 1;
  } else {
    player1 = true;
    displayPlayer1.style.opacity = 1;
    displayPlayer2.style.opacity = 0.3;
  };
  console.log(player1);
  initialParametersBegin();
  // initializedHand();
});

btnRestartWindowWinner.addEventListener('click', () => {
  modal.style.display = "none";
  restart.disabled = false;   
  gameEnd = true;
  btnGames.style.display = 'block';
  btnStarts.style.display = 'none';
  start.disabled = false;  
  restart.disabled = true;  
  initialParameters();
  initializedHand();
  victoriesPlayer1 = 0;
  victoriesPlayer2 = 0;
  play1.textContent = 'Player 1';
  play2.textContent = 'Player 2';
});

btnBeginWindowEquality.addEventListener('click', () => {
  modal2.style.display = "none";
  // restart.disabled = false;   
  gameEnd = false;
  btnGames.style.display = 'none';
  btnStarts.style.display = 'block';
  start.disabled = true;  
  restart.disabled = false;  
  if (onePlayer){
    player1 = true;      
  } else if (player1Win){
    player1 = false;
  } else {
    player1 = true;
  };
  console.log(player1);
  initialParametersBegin();
  gameWinned = false;
  // initializedHand();
});

btnRestartWindowEquality.addEventListener('click', () => {
  modal2.style.display = "none";
  restart.disabled = false;  
  // for (let i = 0 ; i < tableBox.length ; i++){
  //   tableBox[i].disabled = true;
  //   console.log(tableBox[i].disabled);
  // }; 
  gameEnd = true;
  btnGames.style.display = 'block';
  btnStarts.style.display = 'none';
  start.disabled = false; 
  initialParameters();
  initializedHand();
  victoriesPlayer1 = 0;
  victoriesPlayer2 = 0; 
  play1.textContent = 'Player 1';
  play2.textContent = 'Player 2';
});

restart.addEventListener('click', () => {
  btnGames.style.display = 'block';
  btnStarts.style.display = 'none';
  start.disabled = false;  
  restart.disabled = true;  
  gameEnd = true;
  initialParameters();
  initializedHand();
  victoriesPlayer1 = 0;
  victoriesPlayer2 = 0;
  
});

// // When the user clicks anywhere outside of the modal, close it
// window.addEventListener ('click', function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// });


