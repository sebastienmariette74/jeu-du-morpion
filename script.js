let player1 = true;    /* c'est à player1 de jouer */
let onePlayer = true;  /* partie à 1 joueur */
// let firstGamer = true; /* player 1 est le premier joueur à jouer contre MORPION - partie à 1 joueur */
let easyGame = false;
let middleGame = false;
let hardGame = false;
let parade = true;
let counterattack = false;
let audioPlayer1 = new Audio('audio/clic.mp3');

let btnRadio1 = document.getElementById('flexRadioDefault1');
let btnRadio2 = document.getElementById('flexRadioDefault2');

// let Grid = document.getElementById('grid');
// Grid.style.background = 'rgba(0,0,0,0.4)';

let numberRows = 3;
let numberCols = 3;
let numberDiags = 2;

// création de la grille MORPION
for (let i = 1 ; i <= numberRows ; i++){
  let createDiv = document.createElement('div');
  createDiv.id = 'row';  
  grid.appendChild(createDiv);
  createDiv.style.display = 'flex';
  createDiv.style.justifyContent = 'center';
  createDiv.style.textAlign = 'center';
  createDiv.style.lineHeight = '150px';
  // createDiv.style.textAlign = 'center';
  for (let j = 1 ; j <= numberCols; j++){
    let creatBox = document.createElement('div');
    creatBox.id = 'box'+ (j + numberCols*(i-1));
    creatBox.classList = 'box';    
    createDiv.appendChild(creatBox);    
  };
};
let tableBox;
let tableBoxes = [];
let tabHorizontalCombinations = [];
let tabVerticalCombinations = [];
let tabDiagonalCombinations = [];

let initialisationTables = () => {

  /* creation du tableau des cases */
  tableBox = document.getElementsByClassName('box');

  // /* conversion de l'objet tableBox en tableau */
  // tableBoxes = [];

  /* création d'autant de sous-tableaux qu'il y a de lignes */
  for (let i = 0 ; i < numberRows ; i++){
    tableBoxes[i] = [];
  };

  /* répartition dans le tableau tableBoxes des différentes cases */
  for (let i = 0 ; i < tableBox.length ; i++){
    let index = Math.floor(i / numberCols);
    tableBoxes[index].push(tableBox[i]);
  };

  /* tableau des combinaisons gagnantes horizontales */
  for (let i = 0; i < tableBoxes.length; i++){
    tabHorizontalCombinations.push(tableBoxes[i])
  };

  /* tableau des combinaisons gagnantes verticales */
  /* création d'autant de sous-tableaux qu'il y a de lignes */
  for (let i = 0 ; i < numberCols ; i++){
    tabVerticalCombinations[i] = [];
  };
  for (let i = 0; i < tableBoxes.length; i++){
    for (let j = 0; j < tableBoxes[i].length; j++){
      tabVerticalCombinations[j].push(tableBoxes[i][j]);
    };
  };

  /* tableau des combinaisons gagnantes diagonales */
  /* création d'autant de sous-tableaux qu'il y a de diagonales */
  for (let i = 0 ; i < numberDiags ; i++){
    tabDiagonalCombinations[i] = [];
  };
  for (let i = 0; i < tableBoxes.length; i++){
    for (let j = 0; j < tableBoxes[i].length; j++){
      let k = 0;
      if (i === j){
        tabDiagonalCombinations[k].push(tableBoxes[i][j]);
      };
      k++;
      if ((i === 1 && j === 1) || (i-j ===2) || (j-i ===2)){
        tabDiagonalCombinations[k].push(tableBoxes[i][j]);
      };
    };
  };
};

initialisationTables();

/* tableau des combinaisons gagnantes */
let concat = tabHorizontalCombinations.concat(tabVerticalCombinations).concat(tabDiagonalCombinations);

/* tableau vierge des combinaisons */
let concatInnerText = [];
let blankTableCombinations = () => {
  for (let i =0; i < concat.length; i++){
    concatInnerText[i] = []
  };
  for (let i =0; i < concat.length; i++){
    for (let j =0; j < concat[i].length; j++){
    concatInnerText[i].push(concat[i][j].innerText)
    };
  };
};

/* copie du tableau des cases = tableau des cases restantes */
let tableBoxRemaining = [...tableBox];

/* création du tableau des combinaisons gagnantes */
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

// création d'une copie de la table des combinaisons gagnantes

let copyTableCombinations = [...tableWinningCombinations];

// let tableBoxPlayer1 = [];
let tableBoxMorpion = [];
let tablePossibleCombinations = [];
let tablePossibleCombinationsPlayer1 = [];
let tablePossibleCombinationsPlayer2 = [];
let tablePossibleCombinationsMorpion = [];
let defense = false;

let start = document.getElementById('start');
let restart = document.getElementById('restart');
// restart.disabled = true;    

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

let endGame = false;

// let minimisedGameActivated = false;
// let startGameActivated = false;
let handNumber = 0;
let displayPlayer1 = document.getElementById('player1');
let displayPlayer2 = document.getElementById('player2');
// let minimisedGame = document.getElementById('minimisedGame');
let startGame = document.getElementById('start_game');
let victoriesPlayer1 = 0;
let victoriesMorpion = 0;
let victoriesPlayer2 = 0;
let player1Win = true;
let morpionWin = false;
let namePlayer1 = document.getElementById('namePlayer1');
let namePlayer2 = document.getElementById('namePlayer2');
// let gameWinned = false;

let initialParameters = () => {
  for (let i = 0 ; i < tableBox.length ; i++){
    tableBox[i].innerText = '';
    // tableBox[i].style.cursor = 'default';
    displayTableDark();
  };
  // minimisedGameActivated = false;
  // startGameActivated = false;
  handNumber = 0;
  displayPlayer1.style.opacity = 0.3;
  displayPlayer2.style.opacity = 0.3;
  player1 = true;
  onePlayer = false;
  easyGame = false;
  middleGame = false;
  hardGame = false;
  victoriesPlayer1 = 0;
  victoriesPlayer2 = 0;
  victoriesMorpion = 0;
  endGame = false;
  counterattack = false;

  /* réinitialisation de tous les tableaux */

  tableWinningCombinations = [
    [tableBox[0], tableBox[1],tableBox[2]],
    [tableBox[3], tableBox[4],tableBox[5]],
    [tableBox[6], tableBox[7],tableBox[8]],
    [tableBox[0], tableBox[3],tableBox[6]],
    [tableBox[1], tableBox[4],tableBox[7]],
    [tableBox[2], tableBox[5],tableBox[8]],
    [tableBox[0], tableBox[4],tableBox[8]],
    [tableBox[2], tableBox[4],tableBox[6]],
  ];
  tableBoxMorpion = [];  
  // réinitialisation du tableau restant
  tableBoxRemaining = [...tableBox];  
  // réinitialisation du tableau des combinaisons
  copyTableCombinations = [...tableWinningCombinations];  
  tablePossibleCombinationsPlayer1 = [];  
  tablePossibleCombinationsPlayer2 = [];  

  /* réinitialisation du tableau vierge des combinaisons */
  blankTableCombinations();

  // for (let i =0; i < concat.length; i++){
  //   concatInnerText[i] = []
  // };
  // for (let i =0; i < concat.length; i++){
  //   for (let j =0; j < concat[i].length; j++){
  //   concatInnerText[i].push(concat[i][j].innerText)
  //   };
  // };

};
initialParameters();

let initialParametersBegin = () => {  

  // réinitialisation de la grille
  for (let i = 0 ; i < tableBox.length ; i++){
    tableBox[i].innerText = '';
    // tableBox[i].style.cursor = 'default';
    displayTableClear();
  };
  
  handNumber = 0;
  endGame = false;
  counterattack = false;

  /* réinitialisation de tous les tableaux */
  tableWinningCombinations = [
    [tableBox[0], tableBox[1],tableBox[2]],
    [tableBox[3], tableBox[4],tableBox[5]],
    [tableBox[6], tableBox[7],tableBox[8]],
    [tableBox[0], tableBox[3],tableBox[6]],
    [tableBox[1], tableBox[4],tableBox[7]],
    [tableBox[2], tableBox[5],tableBox[8]],
    [tableBox[0], tableBox[4],tableBox[8]],
    [tableBox[2], tableBox[4],tableBox[6]],
  ];
  tableBoxMorpion = [];  
  // réinitialisation du tableau restant
  tableBoxRemaining = [...tableBox];  
  // réinitialisation du tableau des combinaisons
  copyTableCombinations = [...tableWinningCombinations];  
  tablePossibleCombinationsPlayer1 = [];  
  tablePossibleCombinationsPlayer2 = [];  

  /* réinitialisation du tableau vierge des combinaisons */
  blankTableCombinations();
  // for (let i =0; i < concat.length; i++){
  //   concatInnerText[i] = []
  // };
  // for (let i =0; i < concat.length; i++){
  //   for (let j =0; j < concat[i].length; j++){
  //   concatInnerText[i].push(concat[i][j].innerText)
  //   };
  // };
};

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
// minimisedGame.addEventListener('click', () => {
//   minimisedGameActivated = true;
//   btnStarts.style.display = 'block';
//   btnGames.style.display = 'none';
//   endGame = false;
//   // start.disabled = false;  
// });

let simpleGame = () => {
  for (i = 0 ; i < tableBox.length ; i++){
    clic(tableBox[i]);
  };
};

// fonction pour régler le temps de réponse du joueur morpion
let boxToPlay = '';
let timeOutResponseMorpion = '';
let delayResponseMorpion = () => {
  boxToPlay.innerText = "X";
};
let responseMorpion = ()=>{
  timeOutResponseMorpion = window.setTimeout(delayResponseMorpion, 0);
};

/* on remplit un tableau de combinaisons vierge des différentes cases jouées par les joueurs */
let boxPlayed = "";
let blankTableCombinationsCompleted = () => {

  for (let i = 0 ; i < concat.length; i++){
    for (let j = 0 ; j < concat[i].length; j++){
      if ((boxPlayed === concat[i][j] || boxToPlay === concat[i][j]) && concatInnerText[i][j] === ""){
        // concatInnerText[i][j] = "O";
        concatInnerText[i][j] = roundOrCross();
      };
    };
  };
};
let roundOrCross = () => {
  if (player1){
    return "O";
  } else {
    return "X";
  }
};

// fonction appelée lorsqu'on clique sur une case. Suivant le joueur, on met un rond ou une croix et on détermine le gagnant ou l'égalité.
let clic = (event) => { 
  // start.disabled = false; 
  event.addEventListener('click', (e)=>{   
    if (endGame || event.innerText !== '' /*|| start.disabled === false*/){
      e.preventDefault();
    } 
    
    else if (!onePlayer){ /* partie à 2 joueurs */
      if (player1){
        handNumber ++;
        // audioPlayer1.play();
        event.innerText = "O"; 

        
        /* on remplit un tableau de combinaisons vierge des différentes cases jouées par les joueurs */
        boxPlayed = event;
        blankTableCombinationsCompleted();    
        win();             /* on appelle la fonction pour savoir si le joueur a gagné après avoir joué son coup */
        messageEquality(); /* on appelle la fonction si les joueurs ont fait égalité */
        whoPlay();         /* on indique quel joueur commence */
        displayPlayer2.style.opacity = 1;
        displayPlayer1.style.opacity = 0.3;          
        player1 = false;
      } else {
        handNumber ++;
        event.innerText = "X"; 
        // boxPlayed = event;
        // blankTableCombinationsCompleted();
        win();
        messageEquality();
        whoPlay();
        displayPlayer2.style.opacity = 0.3;
        displayPlayer1.style.opacity = 1;
        player1 = true;
      };
    }           
    
    else if (onePlayer && player1){ /* partie à 1 joueur, player 1 commence la partie */     
      handNumber ++;
      event.innerText = "O";       

      let index = tableBoxRemaining.indexOf(event); /* on récupère l'index de la case jouée pour la retirer du tableau */
      tableBoxRemaining.splice(index, 1);           /* des cases restantes */

      // tableBoxPlayer1.push(event); /* on créé un tableau des cases jouées par Player 1 */

      // 6
      /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
      for (let i = 0; i < copyTableCombinations.length ; i++){
        if (copyTableCombinations[i].includes(event)){                      /* si la case jouée par P1 est dans le tableau des combinaisons */
          tablePossibleCombinationsPlayer1.push(copyTableCombinations[i]);  /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
          copyTableCombinations.splice(i, 1);
          i = 0; 
        };     
      };

      // 7
      /* on réduit la taille des combinaisons possibles du joueur 1 à 2 cases */
      for (let j = 0; j < tablePossibleCombinationsPlayer1.length ; j++){
        if (tablePossibleCombinationsPlayer1[j].includes(event)){         /* si la case jouée par P1 est dans le tableau des combinaisons possibles du joueur 1*/
          let index = tablePossibleCombinationsPlayer1[j].indexOf(event); /* on retire la case des combinaisons possibles */
          tablePossibleCombinationsPlayer1[j].splice(index, 1);
        };
      };

      // 8
      /* actualisation du tableau des combinaisons */
      for (let i = 0; i < copyTableCombinations.length ; i++){
        if (copyTableCombinations[i].includes(event)){            /* si la case jouée par P1 est dans le tableau des combinaisons */
          copyTableCombinations.splice(i, 1);                     /* on retire la combinaison du tableau des combinaisons */
          i = 0; 
        };      
      };

      // 1 
      /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
      for (let element of tablePossibleCombinationsPlayer2){
        if(element.includes(event)){                                        /* si la case jouée par P1 est dans le tableau des combinaisons possibles de P2 */
          let index = tablePossibleCombinationsPlayer2.indexOf(element);    
          tablePossibleCombinationsPlayer2.splice(index, 1);                /* on retire la combinaison du tableau des combinaisons possibles de P2*/
        };
      };

      // boxPlayed = event;
      // blankTableCombinationsCompleted();
      win(); /* on appelle la fonction pour savoir si le joueur a gagné après avoir joué son coup */
      messageEquality(); /* on appelle la fonction si les joueurs ont fait égalité */
      whoPlay(); /* on indique quel joueur commence */

      if (onePlayer){
        displayPlayer1.style.opacity = 1;
        displayPlayer2.style.opacity = 0.3;  
      } else {
        displayPlayer2.style.opacity = 1;
        displayPlayer1.style.opacity = 0.3;  
      };
      player1 = false;

      if (easyGame && tableBoxRemaining.length > 1 && !endGame){
        handNumber++;
        // player1 = false;
        let numberBoxRemaining = tableBoxRemaining.length; /* on récupère le nombre de cases restantes */
        /* on cherche un nombre aléatoire pour cocher au hasard une des cases restantes */
        let randomNumber = function() { 
          return Math.floor(Math.random() * (numberBoxRemaining-1));
        };        
        let nb = randomNumber();
        boxToPlay = tableBoxRemaining[nb];
        tableBoxMorpion.push(boxToPlay); /* on rajoute au tableau des cases déjà jouées par morpion la case jouée */
        boxToPlay.innerText = "X";       /* on joue la case */
        tableBoxRemaining.splice(nb, 1); /* on enlève la case du tableau des cases restantes */

        win(); 
        messageEquality(); 
        whoPlay(); 
        player1 = true;
      } else  if (easyGame && handNumber < 9 && !endGame){        
        handNumber ++;
        player1 = false;
        boxToPlay = tableBoxRemaining[0];
        boxToPlay.innerText = "X";
        win();
        messageEquality();
        whoPlay();
        player1 = true;
      };     
      
      if (middleGame && !endGame){
        handNumber ++;

        /* pour le premier coup de morpion, si la case du milieu est vide, il la joue sinon ce sera un coup aléatoire */
        if (handNumber === 2){ 

          if (box5.innerText === ''){
            boxToPlay = box5;
            boxToPlay.innerText = 'X';

            // 1
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < tablePossibleCombinationsPlayer2.length ; i++){
              if (tablePossibleCombinationsPlayer2[i].includes(event)){     /* si la case jouée par player 1 est dans le tableau des combinaisons possibles du joueur 2*/
                tablePossibleCombinationsPlayer2.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 2 */
              };
            };   

            // 2
            /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
            for (let i = 0; i < tablePossibleCombinationsPlayer1.length ; i++){
              if (tablePossibleCombinationsPlayer1[i].includes(boxToPlay)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                tablePossibleCombinationsPlayer1.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
              };
            };    

            // 3
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(boxToPlay)){                  /* si la case jouée par P2 est dans le tableau des combinaisons */
                tablePossibleCombinationsPlayer2.push(copyTableCombinations[i]);  /* on insère la combinaison dans le tableau des combinaisons possibles de P2 */
                copyTableCombinations.splice(i, 1);
                i = 0; 
              }; 
            };

            // 4
            // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
            for (let j = 0; j < tablePossibleCombinationsPlayer2.length ; j++){
              if (tablePossibleCombinationsPlayer2[j].includes(boxToPlay)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                let index = tablePossibleCombinationsPlayer2[j].indexOf(boxToPlay); /* on retire la case des combinaisons possibles */
                tablePossibleCombinationsPlayer2[j].splice(index, 1);
              };
            };

            // 5
            /* actualisation du tableau des combinaisons */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(event)){            /* si la case jouée est dans le tableau des combinaisons */
                copyTableCombinations.splice(i, 1);                     /* on retire la combinaison du tableau des combinaisons */
                i = 0; 
              };      
            };
            
            /* actualisation du tableau des cases restantes */
            let index = tableBoxRemaining.indexOf(box5);
            tableBoxRemaining.splice(index, 1);

          } 
          
          else {
            let numberBoxRemaining = tableBoxRemaining.length; /* on récupère le nombre de cases restantes */
            /* on cherche un nombre aléatoire pour cocher au hasard une des cases restantes */
            let randomNumber = function() { 
              return Math.floor(Math.random() * (numberBoxRemaining-1));
            };        
            let nb = randomNumber();
            boxToPlay = tableBoxRemaining[nb];
            boxToPlay.innerText = "X";       /* on joue la case */
            tableBoxRemaining.splice(nb, 1); /* on enlève la case du tableau des cases restantes */

            // 1
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < tablePossibleCombinationsPlayer2.length ; i++){
              if (tablePossibleCombinationsPlayer2[i].includes(event)){     /* si la case jouée par player 1 est dans le tableau des combinaisons possibles du joueur 2*/
                tablePossibleCombinationsPlayer2.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 2 */
              };
            };   

            // 2
            /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
            for (let i = 0; i < tablePossibleCombinationsPlayer1.length ; i++){
              if (tablePossibleCombinationsPlayer1[i].includes(boxToPlay)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                tablePossibleCombinationsPlayer1.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
              };
            };    

            // 3
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(boxToPlay)){                  /* si la case jouée par P2 est dans le tableau des combinaisons */
                tablePossibleCombinationsPlayer2.push(copyTableCombinations[i]);  /* on insère la combinaison dans le tableau des combinaisons possibles de P2 */
                copyTableCombinations.splice(i, 1);
                i = 0; 
              };      
            };

            // 4
            // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
            for (let j = 0; j < tablePossibleCombinationsPlayer2.length ; j++){
              if (tablePossibleCombinationsPlayer2[j].includes(boxToPlay)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                let index = tablePossibleCombinationsPlayer2[j].indexOf(boxToPlay); /* on retire la case des combinaisons possibles */
                tablePossibleCombinationsPlayer2[j].splice(index, 1);
              };
            };

            // 5
            /* actualisation du tableau des combinaisons */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(event)){            /* si la case jouée est dans le tableau des combinaisons */
                copyTableCombinations.splice(i, 1);                     /* on retire la combinaison du tableau des combinaisons */
                i = 0; 
              };      
            };
          };   

          /* actualisation du tableau des cases jouées par Morpion */
          tableBoxMorpion.push(boxToPlay);

          player1 = true;
        } 
        
        else /*if (tablePossibleCombinationsPlayer2 != '')*/{
          
          /* Morpion joue une combinaison gagnante s'il peut */
          for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length ; i++){ /* dans le tableau des combinaisons possibles du joueur 2 */
            if (tablePossibleCombinationsPlayer2[i].length === 1 && counterattack === false){             /* si le tableau a une seule valeur */
              boxToPlay = tablePossibleCombinationsPlayer2[i][0];              /* on joue la case du tableau correspondant */ 
              boxToPlay.innerText = 'X';
              counterattack = true;
            };
          };
          win();
          messageEquality();
          whoPlay();
          player1 = true;         
        
          if (tablePossibleCombinationsPlayer1 != '' && !endGame){      

            parade = false;
            /* on contre le joueur 1 s'il a 2 cases sur 3 */
            for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length ; i++){ /* dans le tableau des combinaisons possibles du joueur 1 */
              if (tablePossibleCombinationsPlayer1[i].length === 1 && !parade){  /* si le tableau a une seule valeur */
                boxToPlay = tablePossibleCombinationsPlayer1[i][0];              /* on joue la case du tableau correspondant */ 
                boxToPlay.innerText = 'X';
                parade = true;
                let index = tableBoxRemaining.indexOf(boxToPlay);
                tableBoxRemaining.splice(index, 1);
                // parade = false;   
              };
            };            

            // 2
            /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
            for (let i = 0; i < tablePossibleCombinationsPlayer1.length ; i++){
              if (tablePossibleCombinationsPlayer1[i].includes(boxToPlay)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                tablePossibleCombinationsPlayer1.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
              };
            };    

            // 3
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(boxToPlay)){                  /* si la case jouée par P2 est dans le tableau des combinaisons */
                tablePossibleCombinationsPlayer2.push(copyTableCombinations[i]);  /* on insère la combinaison dans le tableau des combinaisons possibles de P2 */
                copyTableCombinations.splice(i, 1);
                i = 0; 
              };      
            };

            // 4
            // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
            for (let j = 0; j < tablePossibleCombinationsPlayer2.length ; j++){
              if (tablePossibleCombinationsPlayer2[j].includes(boxToPlay)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                let index = tablePossibleCombinationsPlayer2[j].indexOf(boxToPlay); /* on retire la case des combinaisons possibles */
                tablePossibleCombinationsPlayer2[j].splice(index, 1);
              };
            };

            // 5
            /* actualisation du tableau des combinaisons */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(event)){            /* si la case jouée est dans le tableau des combinaisons */
                copyTableCombinations.splice(i, 1);                     /* on retire la combinaison du tableau des combinaisons */
                i = 0; 
              };      
            };

            if (!parade && !endGame){ /* si le prochain coup de joueur 1 ne le fait pas gagner, Morpion joue une case au hasard */
              
              let numberBoxRemaining = tableBoxRemaining.length; /* on récupère le nombre de cases restantes */
                /* on cherche un nombre aléatoire pour cocher au hasard une des cases restantes */
                let randomNumber = function() { 
                  return Math.floor(Math.random() * (numberBoxRemaining-1));
                };        
                let nb = randomNumber();
                boxToPlay = tableBoxRemaining[nb];
                // tableBoxMorpion.push(boxToPlay); /* on rajoute au tableau des cases déjà jouées par morpion la case jouée */
                // tableBoxMorpion.push(tableBoxRemaining[nb]);
                // responseMorpion();
                boxToPlay.innerText = "X"; /* on joue la case */
                tableBoxRemaining.splice(nb, 1); /* on enlève la case tu tableau des cases restantes */
            };

            /* actualisation du tableau des cases jouées par Morpion */
            tableBoxMorpion.push(boxToPlay);

            // 1
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < tablePossibleCombinationsPlayer2.length ; i++){
              if (tablePossibleCombinationsPlayer2[i].includes(event)){     /* si la case jouée par player 1 est dans le tableau des combinaisons possibles du joueur 2*/
                tablePossibleCombinationsPlayer2.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 2 */
              };
            };   

            // 2
            /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
            for (let i = 0; i < tablePossibleCombinationsPlayer1.length ; i++){
              if (tablePossibleCombinationsPlayer1[i].includes(boxToPlay)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                tablePossibleCombinationsPlayer1.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
              };
            };    

            // 3
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(boxToPlay)){                  /* si la case jouée par P2 est dans le tableau des combinaisons */
                tablePossibleCombinationsPlayer2.push(copyTableCombinations[i]);  /* on insère la combinaison dans le tableau des combinaisons possibles de P2 */
                copyTableCombinations.splice(i, 1);
                i = 0; 
              };     
            };

            // 4
            // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
            for (let j = 0; j < tablePossibleCombinationsPlayer2.length ; j++){
              if (tablePossibleCombinationsPlayer2[j].includes(boxToPlay)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                let index = tablePossibleCombinationsPlayer2[j].indexOf(boxToPlay); /* on retire la case des combinaisons possibles */
                tablePossibleCombinationsPlayer2[j].splice(index, 1);
              };
            };

            // 5
            /* actualisation du tableau des combinaisons */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(event)){            /* si la case jouée est dans le tableau des combinaisons */
                copyTableCombinations.splice(i, 1);                     /* on retire la combinaison du tableau des combinaisons */
                i = 0; 
              };      
            };
            win();
            messageEquality();
            whoPlay();
            player1 = true;
          } 
          
          else if (!endGame){ /* plus de victoire possible, MORPION joue la case restante */
            boxToPlay = tableBoxRemaining[0];
            boxToPlay.innerText = "X";
            tableBoxRemaining.splice(0, 1);
            win();
            messageEquality();
            whoPlay();
            player1 = true;
          };
        };              
      };
      
      if (hardGame && !endGame){
        handNumber ++;

        /* pour le premier coup de morpion, si la case du milieu est vide, il la joue sinon ce sera un coup dans le coin  */
        if (handNumber === 2){ 

          if (box5.innerText === ''){
            boxToPlay = box5;
            boxToPlay.innerText = 'X';

            // 1
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < tablePossibleCombinationsPlayer2.length ; i++){
              if (tablePossibleCombinationsPlayer2[i].includes(event)){     /* si la case jouée par player 1 est dans le tableau des combinaisons possibles du joueur 2*/
                tablePossibleCombinationsPlayer2.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 2 */
              };
            };   

            // 2
            /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
            for (let i = 0; i < tablePossibleCombinationsPlayer1.length ; i++){
              if (tablePossibleCombinationsPlayer1[i].includes(boxToPlay)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                tablePossibleCombinationsPlayer1.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
              };
            };    

            // 3
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(boxToPlay)){                  /* si la case jouée par P2 est dans le tableau des combinaisons */
                tablePossibleCombinationsPlayer2.push(copyTableCombinations[i]);  /* on insère la combinaison dans le tableau des combinaisons possibles de P2 */
                copyTableCombinations.splice(i, 1);
                i = 0; 
              }; 
            };

            // 4
            // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
            for (let j = 0; j < tablePossibleCombinationsPlayer2.length ; j++){
              if (tablePossibleCombinationsPlayer2[j].includes(boxToPlay)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                let index = tablePossibleCombinationsPlayer2[j].indexOf(boxToPlay); /* on retire la case des combinaisons possibles */
                tablePossibleCombinationsPlayer2[j].splice(index, 1);
              };
            };

            // 5
            /* actualisation du tableau des combinaisons */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(event)){            /* si la case jouée est dans le tableau des combinaisons */
                copyTableCombinations.splice(i, 1);                     /* on retire la combinaison du tableau des combinaisons */
                i = 0; 
              };      
            };
            
            /* actualisation du tableau des cases restantes */
            let index = tableBoxRemaining.indexOf(box5);
            tableBoxRemaining.splice(index, 1);

          } 
          
          else {
            boxToPlay = tableBoxRemaining[0];
            boxToPlay.innerText = "X";       /* on joue la case */
            tableBoxRemaining.splice(0, 1); /* on enlève la case du tableau des cases restantes */

            // 1
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < tablePossibleCombinationsPlayer2.length ; i++){
              if (tablePossibleCombinationsPlayer2[i].includes(event)){     /* si la case jouée par player 1 est dans le tableau des combinaisons possibles du joueur 2*/
                tablePossibleCombinationsPlayer2.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 2 */
              };
            };   

            // 2
            /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
            for (let i = 0; i < tablePossibleCombinationsPlayer1.length ; i++){
              if (tablePossibleCombinationsPlayer1[i].includes(boxToPlay)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                tablePossibleCombinationsPlayer1.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
              };
            };    

            // 3
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(boxToPlay)){                  /* si la case jouée par P2 est dans le tableau des combinaisons */
                tablePossibleCombinationsPlayer2.push(copyTableCombinations[i]);  /* on insère la combinaison dans le tableau des combinaisons possibles de P2 */
                copyTableCombinations.splice(i, 1);
                i = 0; 
              };      
            };

            // 4
            // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
            for (let j = 0; j < tablePossibleCombinationsPlayer2.length ; j++){
              if (tablePossibleCombinationsPlayer2[j].includes(boxToPlay)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                let index = tablePossibleCombinationsPlayer2[j].indexOf(boxToPlay); /* on retire la case des combinaisons possibles */
                tablePossibleCombinationsPlayer2[j].splice(index, 1);
              };
            };

            // 5
            /* actualisation du tableau des combinaisons */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(event)){            /* si la case jouée est dans le tableau des combinaisons */
                copyTableCombinations.splice(i, 1);                     /* on retire la combinaison du tableau des combinaisons */
                i = 0; 
              };      
            };
          };   

          /* actualisation du tableau des cases jouées par Morpion */
          tableBoxMorpion.push(boxToPlay);

          player1 = true;          
        } 

        else /*if (tablePossibleCombinationsPlayer2 != '')*/{

          /* Morpion joue une combinaison gagnante s'il peut */
          for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length ; i++){                  /* dans le tableau des combinaisons possibles du joueur 2 */
            if (tablePossibleCombinationsPlayer2[i].length === 1 && counterattack === false){   /* si le tableau a une seule valeur */
              boxToPlay = tablePossibleCombinationsPlayer2[i][0];                               /* on joue la case du tableau correspondant */ 
              boxToPlay.innerText = 'X';
              counterattack = true;
            };
          };
          win();
          messageEquality();
          whoPlay();
          player1 = true;         
        
          if (tablePossibleCombinationsPlayer1 != '' && !endGame){ 
            
            parade = false;
            /* on contre le joueur 1 s'il a 2 cases sur 3 */
            for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length ; i++){ /* dans le tableau des combinaisons possibles du joueur 1 */
              if (tablePossibleCombinationsPlayer1[i].length === 1 && !parade){  /* si le tableau a une seule valeur */
                boxToPlay = tablePossibleCombinationsPlayer1[i][0];              /* on joue la case du tableau correspondant */ 
                boxToPlay.innerText = 'X';
                parade = true;
                let index = tableBoxRemaining.indexOf(boxToPlay);
                tableBoxRemaining.splice(index, 1);
                // parade = false;   
              };
            };            

            // 2
            /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
            for (let i = 0; i < tablePossibleCombinationsPlayer1.length ; i++){
              if (tablePossibleCombinationsPlayer1[i].includes(boxToPlay)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                tablePossibleCombinationsPlayer1.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
              };
            };    

            // 3
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(boxToPlay)){                  /* si la case jouée par P2 est dans le tableau des combinaisons */
                tablePossibleCombinationsPlayer2.push(copyTableCombinations[i]);  /* on insère la combinaison dans le tableau des combinaisons possibles de P2 */
                copyTableCombinations.splice(i, 1);
                i = 0; 
              };     
            };

            // 4
            // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
            for (let j = 0; j < tablePossibleCombinationsPlayer2.length ; j++){
              if (tablePossibleCombinationsPlayer2[j].includes(boxToPlay)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                let index = tablePossibleCombinationsPlayer2[j].indexOf(boxToPlay); /* on retire la case des combinaisons possibles */
                tablePossibleCombinationsPlayer2[j].splice(index, 1);
              };
            };

            // 5
            /* actualisation du tableau des combinaisons */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(event)){            /* si la case jouée est dans le tableau des combinaisons */
                copyTableCombinations.splice(i, 1);                     /* on retire la combinaison du tableau des combinaisons */
                i = 0; 
              };      
            };

            if (!parade && !endGame){ /* si le prochain coup de joueur 1 ne le fait pas gagner, Morpion joue une case au hasard */
              
              let numberBoxRemaining = tableBoxRemaining.length; /* on récupère le nombre de cases restantes */
                /* on cherche un nombre aléatoire pour cocher au hasard une des cases restantes */
                let randomNumber = function() { 
                  return Math.floor(Math.random() * (numberBoxRemaining-1));
                };        
                let nb = randomNumber();
                boxToPlay = tableBoxRemaining[nb];
                // tableBoxMorpion.push(boxToPlay); /* on rajoute au tableau des cases déjà jouées par morpion la case jouée */
                // tableBoxMorpion.push(tableBoxRemaining[nb]);
                // responseMorpion();
                boxToPlay.innerText = "X"; /* on joue la case */
                tableBoxRemaining.splice(nb, 1); /* on enlève la case tu tableau des cases restantes */
            };

            /* actualisation du tableau des cases jouées par Morpion */
            tableBoxMorpion.push(boxToPlay);

            // 1
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < tablePossibleCombinationsPlayer2.length ; i++){
              if (tablePossibleCombinationsPlayer2[i].includes(event)){     /* si la case jouée par player 1 est dans le tableau des combinaisons possibles du joueur 2*/
                tablePossibleCombinationsPlayer2.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 2 */
              };
            };   

            // 2
            /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
            for (let i = 0; i < tablePossibleCombinationsPlayer1.length ; i++){
              if (tablePossibleCombinationsPlayer1[i].includes(boxToPlay)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                tablePossibleCombinationsPlayer1.splice(i, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
              };
            };    

            // 3
            /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(boxToPlay)){                  /* si la case jouée par P2 est dans le tableau des combinaisons */
                tablePossibleCombinationsPlayer2.push(copyTableCombinations[i]);  /* on insère la combinaison dans le tableau des combinaisons possibles de P2 */
                copyTableCombinations.splice(i, 1);
                i = 0; 
              };     
            };

            // 4
            // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
            for (let j = 0; j < tablePossibleCombinationsPlayer2.length ; j++){
              if (tablePossibleCombinationsPlayer2[j].includes(boxToPlay)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                let index = tablePossibleCombinationsPlayer2[j].indexOf(boxToPlay); /* on retire la case des combinaisons possibles */
                tablePossibleCombinationsPlayer2[j].splice(index, 1);
              };
            };

            // 5
            /* actualisation du tableau des combinaisons */
            for (let i = 0; i < copyTableCombinations.length ; i++){
              if (copyTableCombinations[i].includes(event)){            /* si la case jouée est dans le tableau des combinaisons */
                copyTableCombinations.splice(i, 1);                     /* on retire la combinaison du tableau des combinaisons */
                i = 0; 
              };      
            };
            win();
            messageEquality();
            whoPlay();
            player1 = true;
          }           
          else if (!endGame){ /* plus de victoire possible, MORPION joue la case restante */
            boxToPlay = tableBoxRemaining[0];
            boxToPlay.innerText = "X";
            tableBoxRemaining.splice(0, 1);

            win();
            messageEquality();
            whoPlay();
            player1 = true;
          };  
        };
        
        player1 = true;
      };
    };
  });
};

let firstGame = true;

// start.addEventListener('click', (event) => {
//   if (onePlayer){
//     play2.innerText = "morpion";
//   };
//   if ((minimisedGameActivated && firstGame) || (startGameActivated && firstGame) ){
//     simpleGame();
//     displayTableClear();
//     start.disabled = true;  
//     if (player1){
//       hand1.innerText = 'O';
//       play1.style.opacity = 1;
//     };
//     firstGame = false;
//   } else {
//     displayTableClear();
//     hand1.innerText = 'O';
//     play1.style.opacity = 1;
//     start.disabled = true;
//     event.preventDefault();
//   };
// });

let level = document.getElementById('level');
let easyLevel = document.getElementById('easyLevel');
let middleLevel = document.getElementById('middleLevel');

// ouvre la fenêtre demandant les noms des joueurs ...
startGame.addEventListener('click', () => {
  modal1.style.display = 'block';
  namePlayer2.style.display = 'none';
  firstPlayer.style.display = 'none';  
  btnRadio2.addEventListener('click', () => {
    namePlayer2.style.display = 'block';
    firstPlayer.style.display = 'block';
    level.style.display = 'none';
  });
  btnRadio1.addEventListener('click', () => {
    namePlayer2.style.display = 'none';
    firstPlayer.style.display = 'none';
    level.style.display = 'block';

  });
  btnGames.style.display = 'block';
});

// bouton valider de la fenêtre d'entrée - les joueurs donnent leur nom, choisissent qui commence
btn1.addEventListener('click', (event) => { 
  play1.textContent = namePlayer1.value;
  if (btnRadio1.checked){
    play2.textContent = "morpion";
  } else {
    play2.textContent = namePlayer2.value;
  };
  // play2.textContent = namePlayer2.value; 
  let playerBegin = firstPlayer.options[firstPlayer.selectedIndex].value; /* pour connaître la valeur du bouton radio sélectionné */
  // namePlayer2.style.display = 'none';  
  
  
  if (playerBegin === "player1" && btnRadio2.checked){
    hand1.innerText = 'O';
    hand2.innerText = '';
    player1 = true;  
    displayPlayer1.style.opacity = 1;
    onePlayer = false;
  } else if (playerBegin === "player2"){
    hand2.innerText = 'X';
    hand1.innerText = '';
    player1 = false;
    onePlayer = false;
    displayPlayer2.style.opacity = 1;
  } else if (btnRadio1.checked && easyLevel.checked === true){
    onePlayer = true;
    easyGame = true;
  } else if (btnRadio1.checked && middleLevel.checked === true){
    onePlayer = true;
    middleGame = true;
  } else {
    onePlayer = true;
    hardGame = true;
  };

  // let chosenLevel = firstPlayer.options[firstPlayer.selectedIndex].value; /* pour connaître la valeur du bouton radio sélectionné */

  modal1.style.display = 'none';
  displayTableDark();
  endGame = false;
  // firstGamer = true;

  if (onePlayer){
    play2.innerText = "morpion";
  };
  if (firstGame){
    simpleGame();
    displayTableClear();
    if (player1){
      hand1.innerText = 'O';
      play1.style.opacity = 1;
    };
    firstGame = false;
  } else {
    displayTableClear();
    hand1.innerText = 'O';
    play1.style.opacity = 1;
    event.preventDefault();
  };

  startGame.disabled = true;

});

// lorsque le joueur 1 entre son nom, ce dernier s'ajoute à la liste select
namePlayer1.addEventListener('change', () => {
  textJoueur1.text = namePlayer1.value /* + ' commence'*/ ;
});
// lorsque le joueur 2 entre son nom, ce dernier s'ajoute à la liste select
namePlayer2.addEventListener('change', () => {
  textJoueur2.text = namePlayer2.value /* + ' commence'*/ ;
});

// affiche une icone en face du joueur qui a la main
let whoPlay = () => {  
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
  if (player1){
    victoriesPlayer1 ++;
    displayPlayer2.style.opacity = 0.3;
    displayPlayer1.style.opacity = 0.3;
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
    // start.disabled = true;  
    // restart.disabled = true; 
    player1Win = true;
    // gameWinned = true;
    endGame = true;
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
    // start.disabled = true;  
    // restart.disabled = true; 
    morpionWin = true;
    // gameWinned = true;
    endGame = true;
    player1Win = false;
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
    player1Win = false;
    endGame = true;
  };
};

// ouvre la fenêtre d'égalité
let messageEquality = () => {
  if (handNumber === 9 && tableBoxRemaining[0] === undefined && !endGame ){
    equality.innerText = "Pas de gagnant !!!";
    modal2.style.display = 'block';
    endGame = true;
  };
};

// ouvre la fenêtre du vainqueur s'il y a un vainqueur
let win = () => {  

  // function egalP1 (P1)  {
  //   return P1 === "O"; 
  // };
  // function egalP2 (P2) {
  //   return P2 === "X"; 
  // };
  // for (let i = 0 ; i < concatInnerText.length; i++){
  //   if (concatInnerText[i].every(egalP1) || concatInnerText[i].every(egalP2) /*&& !gameWon */){
  //     messageWinner();
  //     // gameWon = true;
  //   };
  // };

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

/* bouton continuer de la la fenêtre "partie gagnée" */
btnBeginWindowWinner.addEventListener('click', () => {
  modal.style.display = "none";
  // gameWinned = false;
  endGame = false;
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
  initialParametersBegin();
  // initializedHand();
  if (onePlayer && player1Win){
    handNumber++;
    boxToPlay = box5;
    boxToPlay.innerText = 'X';
    /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
    for (let i = 0; i < tablePossibleCombinationsPlayer1.length ; i++){
      if (tablePossibleCombinationsPlayer1[i].includes(boxToPlay)){ /* si la case jouée est dans le tableau des combinaisons possibles du joueur 1*/
        tablePossibleCombinationsPlayer1.splice(i, 1); /* on retire la combinaison du tableau des combinaisons possibles du player 1 */
        // let index = copyTableCombinations[i].indexOf(event);
        // copyTableCombinations.splice(index, 1);           
      };
    };    
    
    /* actualisation du tableau des cases restantes */
    let index = tableBoxRemaining.indexOf(box5);
    tableBoxRemaining.splice(index, 1);    
  }
});

/* bouton continuer de la la fenêtre "égalité" */
btnBeginWindowEquality.addEventListener('click', () => {
  modal2.style.display = "none";
  endGame = false;
  // btnGames.style.display = 'none';
  // btnStarts.style.display = 'block';
  // start.disabled = true;  
  // restart.disabled = false;  
  if (onePlayer){
    player1 = true;      
  } else if (player1Win){
    player1 = false;
  } else {
    player1 = true;
  };
  initialParametersBegin();
  // initializedHand();
});

/* bouton réinitialiser de la la fenêtre "partie gagnée" */
btnRestartWindowWinner.addEventListener('click', () => {
  initialParameters();
  initializedHand();  
  modal.style.display = "none";
  modal1.style.display = 'block';
  play1.textContent = 'Player 1';
  play2.textContent = 'Player 2'; 
  namePlayer2.style.display = 'none';
  firstPlayer.style.display = 'none';  
  btnRadio2.addEventListener('click', () => {
    namePlayer2.style.display = 'block';
    firstPlayer.style.display = 'block';
    level.style.display = 'none';
  });
  btnRadio1.addEventListener('click', () => {
    namePlayer2.style.display = 'none';
    firstPlayer.style.display = 'none';
    level.style.display = 'block';
  });
  btnGames.style.display = 'block';
});

/* bouton réinitialiser de la la fenêtre "égalité" */
btnRestartWindowEquality.addEventListener('click', () => {
  initialParameters();
  initializedHand();  
  modal2.style.display = "none";
  modal1.style.display = 'block';
  play1.textContent = 'Player 1';
  play2.textContent = 'Player 2'; 
  namePlayer2.style.display = 'none';
  firstPlayer.style.display = 'none';  
  btnRadio2.addEventListener('click', () => {
    namePlayer2.style.display = 'block';
    firstPlayer.style.display = 'block';
    level.style.display = 'none';
  });
  btnRadio1.addEventListener('click', () => {
    namePlayer2.style.display = 'none';
    firstPlayer.style.display = 'none';
    level.style.display = 'block';
  });
  btnGames.style.display = 'block';
});


// // When the user clicks anywhere outside of the modal, close it
// window.addEventListener ('click', function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// });


