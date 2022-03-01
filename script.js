let player1 = true;    /* c'est à player1 de jouer */
let onePlayer = true;  /* partie à 1 joueur */
let easyGame = false;
let middleGame = false;
let hardGame = false;
let parade = false;
let counterattack = false;
let audioPlayer1 = new Audio('audio/clic.mp3');

let btnRadio1 = document.getElementById('flexRadioDefault1');
let btnRadio2 = document.getElementById('flexRadioDefault2');

// tableaux des couleurs de Player1 et Player2
let colorTop = document.getElementsByClassName('color_top');
let colorBottom = document.getElementsByClassName('color_bottom');
let colorsPlayer1 = document.getElementById('colors_player1');
let colorsPlayer2 = document.getElementById('colors_player2');
colorsPlayer1.style.cursor = 'pointer';
colorsPlayer2.style.cursor = 'pointer';

// let Grid = document.getElementById('grid');
// Grid.style.background = 'rgba(0,0,0,0.4)';

/* ------------------------------------------------------------------------*/
/* chaque joueur clique sur la couleur de son choix */
let choiceColorTop = () => {
  for (let element of colorTop){
    clicColorTop(element);
  };
};

let choiceColorBottom = () => {
  for (let element of colorBottom){
    clicColorBottom(element);
  };
};

let colorPlayer1 = '';
let colorPlayer2 = '';

/* les joueurs ne peuvent pas avoir la même couleur */
let clicColorTop = (event) => {
  event.addEventListener('click', () => {

    colorPlayer1 = event.style.backgroundColor;

    for (let element of colorTop){
      element.style.padding = '0px';      
    };    

    if (colorPlayer1 === colorPlayer2){
      event.disabled = true;
    } else {
      event.style.padding = '15px';
    }      

    for (let element of colorBottom){
      if (colorPlayer2 === colorPlayer1){
        element.disabled = true;
      }
    };    
  });  
};

let clicColorBottom = (event) => {
  event.addEventListener('click', () => {

    colorPlayer2 = event.style.backgroundColor;

    for (let element of colorBottom){
      element.style.padding = '0px';      
    }; 

    if (colorPlayer2 == colorPlayer1){
      event.disabled = true;
      } else {
        event.style.padding = '15px';
      }

    for (let element of colorTop){
      if (colorPlayer1 === colorPlayer2){
        element.disabled = true;
      }
    };        
  });  
};

choiceColorTop();
choiceColorBottom();
/* ------------------------------------------------------------------------*/

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

  /*------------------*/
  
  /* conversion de l'objet tableBox en tableau */
  tableBoxes = [];

  /* création d'autant de sous-tableaux qu'il y a de lignes */
  for (let i = 0 ; i < numberRows ; i++){
    tableBoxes[i] = [];
  };

  /* répartition dans le tableau tableBoxes des différentes cases */
  for (let i = 0 ; i < tableBox.length ; i++){
    let index = Math.floor(i / numberCols);
    tableBoxes[index].push(tableBox[i]);
  };

  /* ---------------- */

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
      if ((i+j) === tableBoxes.length - 1){
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

/* création d'une copie de la table des combinaisons gagnantes */
let copyTableCombinations = [...tableWinningCombinations];

// let tableBoxPlayer1 = [];
let tableBoxMorpion = [];
// let tablePossibleCombinations = [];
let tablePossibleCombinationsPlayer1 = [];
let tablePossibleCombinationsPlayer2 = [];
let tablePossibleCombinationsMorpion = [];
let defense = false;

let start = document.getElementById('start');
let restart = document.getElementById('restart');

// initialisation de l'affichage du tableau
let displayTableDark = () => {  
  for (let element of tableBox){
    element.style.background = 'rgba(0,0,0,0.3)';
  }
  // for (let i = 0 ; i < tableBox.length ; i++){
  //   tableBox[i].style.background = 'rgba(0,0,0,0.3)';
  // };
};

// Affichage du tableau en mode jeu
let displayTableClear = () => {  
  for (let i = 0 ; i < tableBox.length ; i++){
    tableBox[i].style.background = 'rgba(0,0,0,0)';
  };
};

let endGame = false;
let handNumber = 0;
let displayPlayer1 = document.getElementById('player1');
let displayPlayer2 = document.getElementById('player2');
let round = document.getElementById('round');
let cross = document.getElementById('cross');
let startGame = document.getElementById('start_game');

/* -------------------------------------*/
/* le bouton commencer clignote à l'ouverture de la page */
let intervalId;

let changeBorderColor = () => {  
  if (!intervalId) {
    intervalId = setInterval(flashColor, 500);
  }
}

let flashColor = () => {  
    if (startGame.style.borderColor === 'white'){
      startGame.style.borderColor = 'transparent';
    } else {
    startGame.style.borderColor = 'white';
    }
};

changeBorderColor();
/* --------------------------------------*/

let victoriesPlayer1 = 0;
let victoriesMorpion = 0;
let victoriesPlayer2 = 0;
let player1Win = true;
let morpionWin = false;
let namePlayer1 = document.getElementById('namePlayer1');
let namePlayer2 = document.getElementById('namePlayer2');

let initialParameters = () => {
  for (let element of tableBox){
    element.innerText = '';
    displayTableDark(); 
  };
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
  colorPlayer1 = '';
  colorPlayer2 = '';

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

  /* toutes les couleurs sont au petit format */
  for (let element of colorTop){
    element.style.padding = '0px';
  };
  for (let element of colorBottom){
    element.style.padding = '0px';
  };

};
initialParameters();

let initialParametersBegin = () => {  

  // réinitialisation de la grille
  for (let element of tableBox){
    element.innerText = '';
    displayTableClear(); 
  };
  // for (let i = 0 ; i < tableBox.length ; i++){
  //   tableBox[i].innerText = '';
  //   displayTableClear();
  // };
  
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

// let hand1 = document.getElementById('hand1');

// let svgHand1 = document.getElementById('svgHand1');
// let svgPlayer1 = document.getElementById('svgHand1');
// let svgHand2 = document.getElementById('svgHand1');
// let svgPlayer2 = document.getElementById('svgHand1');
// svgHand1.style.fill = 'chocolate';

// let hand2 = document.getElementById('hand2');
// let img = document.getElementById('img');
// img.style.fill = "red";


// initialise l'affichage de la main 
// let initializedHand = () => {
//   hand1.textContent = '';
//   hand2.textContent = '';
// };

let gameWon = false;

let play1 = document.getElementById('player1');
let play2 = document.getElementById('player2');
let modal0 = document.getElementById("window-winner");
let modal1 = document.getElementById("window-open");
let modal2 = document.getElementById("window-equality");
let modal3 = document.getElementById("window-honor");
// let modalContent = document.getElementById("modalContent");
let modalContent1 = document.getElementById("modalContent1");
let modalContent2 = document.getElementById("modalContent2");
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

/*  ---------------------------------------------------------------*/
// fonction pour régler le temps de réponse du joueur morpion
let boxToPlay = '';
let timeOutResponseMorpion = '';
let delayResponseMorpion = () => {
  boxToPlay.innerText = "X";
  boxToPlay.style.fontSize = "75px";
  boxToPlay.style.color = colorPlayer2;
};
let responseMorpion = ()=>{
  timeOutResponseMorpion = window.setTimeout(delayResponseMorpion, 0);
};
/*  ---------------------------------------------------------------*/

// fonction pour fixer le délai d'affichage de la fenêtre "honneur au perdant"
let timeOutWindowHonor = '';
let delayWindowHonor = () => {
  modal3.style.display = "none";
};
let TimeWindowHonor = ()=>{
  timeOutResponseMorpion = window.setTimeout(delayWindowHonor, 2000);
};

/* -------------------------------------------------------------------------------------------------------------*/
/* on remplit un tableau à mesure que les joueurs jouent à partir du tableau des combinaisons vierges */
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
/* -------------------------------------------------------------------------------------------------------------*/

let simpleGame = () => {
  for (let element of tableBox){
    clic(element);
  };
};

// fonction appelée lorsqu'on clique sur une case. Suivant le joueur, on met un rond ou une croix et on détermine le gagnant ou l'égalité.
let clic = (event) => { 
  event.addEventListener('click', (e)=>{   
    if (endGame || event.innerText !== ''){
      e.preventDefault();
    } 
    
    else if (!onePlayer){ /* partie à 2 joueurs */
      if (player1){
        handNumber ++;
        audioPlayer1.play();
        event.innerText = "O"; 
        event.style.fontSize = "75px";
        event.style.color = colorPlayer1;

        /* actualisation du tableau des cases restantes */
        let index = tableBoxRemaining.indexOf(event);
        tableBoxRemaining.splice(index, 1);    
        
        /* on remplit un tableau de combinaisons vierge des différentes cases jouées par les joueurs */
        // boxPlayed = event;
        // blankTableCombinationsCompleted();    
        win();             /* on appelle la fonction pour savoir si le joueur a gagné après avoir joué son coup */
        messageEquality(); /* on appelle la fonction si les joueurs ont fait égalité */
        displayPlayer1.style.opacity = 0.3;          
        displayPlayer2.style.opacity = 1;
        player1 = false;

      } else {
        handNumber ++;
        event.innerText = "X"; 
        event.style.fontSize = "75px";
        event.style.color = colorPlayer2;
        // boxPlayed = event;
        // blankTableCombinationsCompleted();
        /* actualisation du tableau des cases restantes */
        let index = tableBoxRemaining.indexOf(event);
        tableBoxRemaining.splice(index, 1);
        win();
        messageEquality();
        displayPlayer1.style.opacity = 1;
        displayPlayer2.style.opacity = 0.3;
        player1 = true;
        
      };
      console.log(handNumber);
      console.log(tableBoxRemaining[0]);
      console.log(endGame);
    }           
    
    else if (onePlayer && player1){ /* partie à 1 joueur, player 1 commence la partie */     
      displayPlayer1.style.opacity = 0.3;
      displayPlayer2.style.opacity = 1;          
      handNumber ++;
      event.innerText = "O";   
      event.style.fontSize = "75px"; 
      event.style.color = colorPlayer1;   

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
      // whoPlay(); /* on indique quel joueur commence */

      // if (onePlayer){
      //   displayPlayer1.style.opacity = 1;
      //   displayPlayer2.style.opacity = 0.3;  
      // } else {
      //   displayPlayer1.style.opacity = 0.3;  
      //   displayPlayer2.style.opacity = 1;
      // };

      
      player1 = false;

      if (easyGame && tableBoxRemaining.length > 1 && !endGame){
        
        
        setTimeout(()=>{
          handNumber++;        
          // player1 = false;
          let numberBoxRemaining = tableBoxRemaining.length; /* on récupère le nombre de cases restantes */
          /* on cherche un nombre aléatoire pour cocher au hasard une des cases restantes */
          let randomNumber = function() { 
            return Math.floor(Math.random() * (numberBoxRemaining-1));
          };        
          let nb = randomNumber();
          boxToPlay = tableBoxRemaining[nb];
          tableBoxMorpion.push(boxToPlay);    /* on rajoute au tableau des cases déjà jouées par morpion la case jouée */
          boxToPlay.innerText = 'X';          /* on joue la case */
          boxToPlay.style.fontSize = "75px"; 
          boxToPlay.style.color = colorPlayer2;   
          tableBoxRemaining.splice(nb, 1);    /* on enlève la case du tableau des cases restantes */   
          displayPlayer1.style.opacity = 1;
          displayPlayer2.style.opacity = 0.3;
        }, 1000);                
        
        setTimeout(()=>{
          win(); 
          messageEquality(); 
          // whoPlay();    
          player1 = true;
        }, 1100);          
        


      } 
      else  if (easyGame && handNumber < 9 && !endGame){    
        
        setTimeout(()=>{
          handNumber ++;
          player1 = false;
          boxToPlay = tableBoxRemaining[0];
          boxToPlay.innerText = 'X';          /* on joue la case */
          boxToPlay.style.fontSize = "75px";
          boxToPlay.style.color = colorPlayer2;   
          tableBoxRemaining.splice(0, 1);    /* on enlève la case du tableau des cases restantes */   
          displayPlayer1.style.opacity = 1;
          displayPlayer2.style.opacity = 0.3;
        }, 1000);                
        
        setTimeout(()=>{
          win(); 
          messageEquality(); 
          // whoPlay();    
          displayPlayer1.style.opacity = 1;
          displayPlayer2.style.opacity = 0.3;
          player1 = true;
        }, 1100);          
      } 
      else if (middleGame && !endGame){
        handNumber ++;

        /* pour le premier coup de morpion, si la case du milieu est vide, il la joue sinon ce sera un coup aléatoire */
        if (handNumber === 2){ 

          if (box5.innerText === ''){
            
            setTimeout(()=>{
              boxToPlay = box5;
              boxToPlay.innerText = 'X';
              boxToPlay.style.fontSize = '75px';
              boxToPlay.style.color = colorPlayer2;

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

            /* actualisation du tableau des cases jouées par Morpion */
            tableBoxMorpion.push(boxToPlay);

            player1 = true;

            }, 1000)

          } 
          
          else {
            let numberBoxRemaining = tableBoxRemaining.length; /* on récupère le nombre de cases restantes */
            /* on cherche un nombre aléatoire pour cocher au hasard une des cases restantes */
            let randomNumber = function() { 
              return Math.floor(Math.random() * (numberBoxRemaining-1));
            };        
            let nb = randomNumber();
            boxToPlay = tableBoxRemaining[nb];
            boxToPlay.innerText = "X";          /* on joue la case */
            boxToPlay.style.fontSize = "75px";
            boxToPlay.style.Color = colorPlayer2;
            tableBoxRemaining.splice(nb, 1);    /* on enlève la case du tableau des cases restantes */

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

            /* actualisation du tableau des cases jouées par Morpion */
            tableBoxMorpion.push(boxToPlay);

            player1 = true;
          };             
        } 
        
        else if (tablePossibleCombinationsPlayer2 != '' || tablePossibleCombinationsPlayer1 != ''){
          
          /* Morpion joue une combinaison gagnante s'il peut */
          for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length ; i++){ /* dans le tableau des combinaisons possibles du joueur 2 */
            if (tablePossibleCombinationsPlayer2[i].length === 1 && counterattack === false){             /* si le tableau a une seule valeur */
              boxToPlay = tablePossibleCombinationsPlayer2[i][0];              /* on joue la case du tableau correspondant */ 
              boxToPlay.innerText = 'X';
              boxToPlay.style.fontSize = '75px';
              boxToPlay.style.color = colorPlayer2;
              counterattack = true;
            };
          };

          win();
        
          if (tablePossibleCombinationsPlayer1 != '' && !endGame){      
            
            parade = false;
            /* Morpion contre le joueur 1 s'il a 2 cases sur 3 */
            for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length ; i++){ /* dans le tableau des combinaisons possibles du joueur 1 */
              if (tablePossibleCombinationsPlayer1[i].length === 1 && !parade){  /* si le tableau a une seule valeur */
                boxToPlay = tablePossibleCombinationsPlayer1[i][0];              /* on joue la case du tableau correspondant */ 
                console.log(boxToPlay);
                boxToPlay.innerText = 'X';
                boxToPlay.style.fontSize = '75px';
                boxToPlay.style.color = colorPlayer2;
                parade = true;
                let index = tableBoxRemaining.indexOf(boxToPlay);
                tableBoxRemaining.splice(index, 1);
              };
            };            

            if (parade){
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

            player1 = true;
            }  
          
            if (!parade && !endGame){ /* si le prochain coup de joueur 1 ne le fait pas gagner, Morpion joue une case au hasard */
              
              let numberBoxRemaining = tableBoxRemaining.length; /* on récupère le nombre de cases restantes */
              /* on cherche un nombre aléatoire pour cocher au hasard une des cases restantes */
              let randomNumber = function() { 
                return Math.floor(Math.random() * (numberBoxRemaining-1));
              };        
              let nb = randomNumber();
              boxToPlay = tableBoxRemaining[nb];
              boxToPlay.innerText = "X";          /* on joue la case */
              boxToPlay.style.fontSize = "75px";
              boxToPlay.style.color = colorPlayer2;
              tableBoxRemaining.splice(nb, 1);    /* on enlève la case tu tableau des cases restantes */
  
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
              player1 = true;
            }
          }          
          
          else if (!endGame){ /* plus de victoire possible, MORPION joue la case restante */
            boxToPlay = tableBoxRemaining[0];
            boxToPlay.innerText = "X";
            boxToPlay.style.fontSize = "75px";
            boxToPlay.style.color = colorPlayer2;
            tableBoxRemaining.splice(0, 1);
            messageEquality();
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
            boxToPlay.style.fontSize = '75px';
            boxToPlay.style.color = colorPlayer2;

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
            boxToPlay.innerText = "X";           /* on joue la case */
            boxToPlay.style.fontSize = "75px";
            boxToPlay.style.color = colorPlayer2;
            tableBoxRemaining.splice(0, 1);      /* on enlève la case du tableau des cases restantes */

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
              boxToPlay.style.fontSize = '75px';
              boxToPlay.style.color = colorPlayer2;
              counterattack = true;
            };
          };
          win();
          messageEquality();
          // whoPlay();
          player1 = true;         
        
          if (tablePossibleCombinationsPlayer1 != '' && !endGame){ 
            console.log(parade);
            console.log(tablePossibleCombinationsPlayer1);
            
            parade = false;
            /* Morpion contre le joueur 1 s'il a 2 cases sur 3 */
            for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length ; i++){ /* dans le tableau des combinaisons possibles du joueur 1 */
              if (tablePossibleCombinationsPlayer1[i].length === 1 && !parade){  /* si le tableau a une seule valeur */
                boxToPlay = tablePossibleCombinationsPlayer1[i][0];              /* on joue la case du tableau correspondant */ 
                boxToPlay.innerText = 'X';
                boxToPlay.style.fontSize = '75px';
                boxToPlay.style.color = colorPlayer2;
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
                boxToPlay.innerText = "X";          /* on joue la case */
                boxToPlay.style.fontSize = "75px";
                boxToPlay.style.color = colorPlayer2;
                tableBoxRemaining.splice(nb, 1);    /* on enlève la case tu tableau des cases restantes */
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
            // whoPlay();
            player1 = true;
          }           
          else if (!endGame){ /* plus de victoire possible, MORPION joue la case restante */
            boxToPlay = tableBoxRemaining[0];
            boxToPlay.innerText = "X";
            boxToPlay.style.fontSize = "75px";
            boxToPlay.style.color = colorPlayer2;
            tableBoxRemaining.splice(0, 1);

            win();
            messageEquality();
            // whoPlay();
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
  clearInterval(intervalId);
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
    // hand1.innerText = 'O';
    // hand2.innerText = '';
    player1 = true;  
    displayPlayer1.style.opacity = 1;
    onePlayer = false;
  } else if (playerBegin === "player2"){
    // hand2.innerText = 'X';
    // hand1.innerText = '';
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

  if (onePlayer){
    play2.innerText = "morpion";
  };
  if (firstGame){
    simpleGame();
    displayTableClear();
    if (player1){
      // hand1.innerText = 'O';
      play1.style.opacity = 1;
    };
    firstGame = false;
  } else {
    displayTableClear();
    // hand1.innerText = 'O';
    play1.style.opacity = 1;
    event.preventDefault();
  };

  startGame.disabled = true;

  displayPlayer1.style.backgroundColor = colorPlayer1;
  round.style.color = colorPlayer1;
  displayPlayer2.style.backgroundColor = colorPlayer2;
  cross.style.color = colorPlayer2;

  console.log(colorPlayer1);
  console.log(colorPlayer2);
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
// let whoPlay = () => {  
//   if (onePlayer){
//     hand1.innerText = 'O';
//     // hand1.innerHTML = svg1;
//     hand2.innerText = '';
//   } else if (player1){
    
//     hand1.innerText = '';
//     hand2.innerText = 'X';
//     // hand2.innerHTML = svg3;
    
//   } else {
//     hand1.innerText = 'O';
//     // hand1.innerHTML = svg1;
//     hand2.innerText = '';
//   }
// };

// ouvre la fenêtre annoncant le vainqueur
let messageWinner = () => {
  if (player1){
    victoriesPlayer1 ++;
    displayPlayer2.style.opacity = 0.3;
    displayPlayer1.style.opacity = 0.3;
    if (onePlayer){
      if (victoriesPlayer1 > victoriesMorpion){
        messageWinPlayer.innerText = "Bravo " + play1.innerText + " !!!\nVous menez " + victoriesPlayer1 + " à " + victoriesMorpion + '.';
      } else if (victoriesPlayer1 < victoriesMorpion){
        messageWinPlayer.innerText = "Bravo " + play1.innerText + " !!!\n" + play2.innerText + " mène " + victoriesMorpion + " à " + victoriesPlayer1 + '.';
      } else {
        messageWinPlayer.innerText = "Bravo " + play1.innerText + " !!!\nVous êtes à " + victoriesPlayer1 + " partout.";
      };
    } else {
      if (victoriesPlayer1 > victoriesPlayer2){
        messageWinPlayer.innerText = "Bravo " + play1.innerText + " !!!\nVous menez " + victoriesPlayer1 + " à " + victoriesPlayer2 + '.';
      } else if (victoriesPlayer1 < victoriesPlayer2){
        messageWinPlayer.innerText = "Bravo " + play1.innerText + " !!!\n" + play2.innerText + " mène " + victoriesPlayer2 + " à " + victoriesPlayer1 + '.';
      } else {
        messageWinPlayer.innerText = "Bravo " + play1.innerText + " !!!\nVous êtes à " + victoriesPlayer1 + " partout P1.";
      };
    }    
    modal0.style.display = 'block';
    player1Win = true;
    endGame = true;
  } else if (onePlayer){    
    victoriesMorpion ++;
    displayPlayer2.style.opacity = 0.3;
    displayPlayer1.style.opacity = 0.3;
    modal0.style.display = 'block';
    if (victoriesMorpion > victoriesPlayer1){
      messageWinPlayer.innerText = "Bravo " + play2.innerText + " !!! \nVous menez " + victoriesMorpion + " à " + victoriesPlayer1 + '.';
    } else if (victoriesMorpion < victoriesPlayer1){
      messageWinPlayer.innerText = "Bravo " + play2.innerText + " !!! \n" + play1.innerText + " mène " + victoriesPlayer1 + " à " + victoriesMorpion + '.';;
    } else {
      messageWinPlayer.innerText = "Bravo " + play2.innerText + " !!! \nVous êtes à " + victoriesPlayer1 + " manche(s) partout.";
    };
    morpionWin = true;
    endGame = true;
    player1Win = false;
  } else {
    victoriesPlayer2 ++;
    displayPlayer2.style.opacity = 0.3;
    displayPlayer1.style.opacity = 0.3;
    if (victoriesPlayer2 > victoriesPlayer1){
      messageWinPlayer.innerText = "Bravo " + play2.innerText + " !!! \n\nvous menez " + victoriesPlayer2 + " à " + victoriesPlayer1 + '.';
    } else if (victoriesPlayer2 < victoriesPlayer1){
      messageWinPlayer.innerText = "Bravo " + play2.innerText + " !!! \n\n" + play1.innerText + " mène " + victoriesPlayer1 + " à " + victoriesPlayer2 + '.';;
    } else {
      messageWinPlayer.innerText = "Bravo " + play2.innerText + " !!! \n\nVous êtes à " + victoriesPlayer1 + " manche(s) partout.";
    };
    modal0.style.display = 'block'; 
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
    // ((box1.innerHTML === svg2) && (box1.innerHTML === box2.innerHTML) && (box1.innerHTML === box3.innerHTML)) || 
    // ((box4.innerHTML === svg2) && (box4.innerHTML === box5.innerHTML) && (box4.innerHTML === box6.innerHTML)) || 
    // ((box7.innerHTML === svg2) && (box7.innerHTML === box8.innerHTML) && (box7.innerHTML === box9.innerHTML)) || 
    // ((box1.innerHTML === svg2) && (box1.innerHTML === box4.innerHTML) && (box1.innerHTML === box7.innerHTML)) || 
    // ((box2.innerHTML === svg2) && (box2.innerHTML === box5.innerHTML) && (box2.innerHTML === box8.innerHTML)) || 
    // ((box3.innerHTML === svg2) && (box3.innerHTML === box6.innerHTML) && (box3.innerHTML === box9.innerHTML)) || 
    // ((box1.innerHTML === svg2) && (box1.innerHTML === box5.innerHTML) && (box1.innerHTML === box9.innerHTML)) || 
    // ((box3.innerHTML === svg2) && (box3.innerHTML === box5.innerHTML) && (box3.innerHTML === box7.innerHTML)) ||
    // ((box1.innerHTML === svg4) && (box1.innerHTML === box2.innerHTML) && (box1.innerHTML === box3.innerHTML)) || 
    // ((box4.innerHTML === svg4) && (box4.innerHTML === box5.innerHTML) && (box4.innerHTML === box6.innerHTML)) || 
    // ((box7.innerHTML === svg4) && (box7.innerHTML === box8.innerHTML) && (box7.innerHTML === box9.innerHTML)) || 
    // ((box1.innerHTML === svg4) && (box1.innerHTML === box4.innerHTML) && (box1.innerHTML === box7.innerHTML)) || 
    // ((box2.innerHTML === svg4) && (box2.innerHTML === box5.innerHTML) && (box2.innerHTML === box8.innerHTML)) || 
    // ((box3.innerHTML === svg4) && (box3.innerHTML === box6.innerHTML) && (box3.innerHTML === box9.innerHTML)) || 
    // ((box1.innerHTML === svg4) && (box1.innerHTML === box5.innerHTML) && (box1.innerHTML === box9.innerHTML)) || 
    // ((box3.innerHTML === svg4) && (box3.innerHTML === box5.innerHTML) && (box3.innerHTML === box7.innerHTML))
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
  modal0.style.display = "none";
  modal3.style.display = "block";
  TimeWindowHonor(); /* affiche la fenêtre 'honneur au perdant' */
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
    setTimeout(()=>{
      boxToPlay.innerText = 'X';
      boxToPlay.style.fontSize = "75px"; 
      boxToPlay.style.color = colorPlayer2;     
    }, 2100);
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
  // initializedHand();  
  modal0.style.display = "none";
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
  // initializedHand();  
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


