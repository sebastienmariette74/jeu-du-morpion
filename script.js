let player1 = true;    /* c'est à player1 de jouer */
let onePlayer = true;  /* partie à 1 joueur */
let easyGame = false;
let middleGame = false;
let hardGame = false;
let parade = false;
let counterattack = false;
let soundBegin = new Audio('audio/begin.mp3');
let soundPlayer1 = new Audio('audio/player1.mp3');
let soundPlayer2 = new Audio('audio/player2.mp3');
let soundEndGame = new Audio('audio/gagnant.mp3');
let soundOn = false;

let primaryColor = 'turquoise';

let btnRadio1 = document.getElementById('flexRadioDefault1');
let btnRadio2 = document.getElementById('flexRadioDefault2');

/* ------------------------- bouton son ---------------------------------------------*/
let sound = document.getElementById('sound');
sound.style.backgroundColor = primaryColor;
sound.innerHTML = '<img src="images/volume-mute.svg" alt="" srcset="">';

sound.addEventListener('click', () => {
  if (soundOn){
    soundOn = false;
    sound.innerHTML = '<img src="images/volume-mute.svg" alt="" srcset="">';
  } else {
    soundOn = true;
    sound.innerHTML = '<img src="images/volume-off.svg" alt="" srcset="">';
  }
});
/* ------------------------- bouton son ---------------------------------------------*/

/* ---------------------------------- LES COULEURS DES JOUEURS -----------------------------*/
/* tableaux des couleurs de Player1 et Player2 */
let colorTop = document.getElementsByClassName('color_top');
let colorBottom = document.getElementsByClassName('color_bottom');

let colorsPlayer1 = document.getElementById('colors_player1');
let colorsPlayer2 = document.getElementById('colors_player2');

colorsPlayer1.style.cursor = 'pointer';
colorsPlayer2.style.cursor = 'pointer';

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


/* ---------------------------------- LES COULEURS DES JOUEURS -----------------------------*/

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

/* ----------------------------------------------- LES TABLEAUX --------------------------------*/
let tableBox;
let tableBoxes = [];
let tabHorizontalCombinations = [];
let tabVerticalCombinations = [];
let tabDiagonalCombinations = [];
let tableCombinations = [];
let TableCombinationsCopy = [];
let blankTableCombinations = [];
let tableBoxRemaining;
let tableBoxMorpion = [];
let tablePossibleCombinationsPlayer1 = [];
let tablePossibleCombinationsPlayer2 = [];
let tablePossibleCombinationsMorpion = [];

let initialisationTables = () => {

  tableBox = [];
  tableBoxes = [];
  tabHorizontalCombinations = [];
  tabVerticalCombinations = [];
  tabDiagonalCombinations = [];
  tableCombinations = [];
  TableCombinationsCopy = [];
  blankTableCombinations = [];
  tableBoxRemaining = [];
  tableBoxMorpion = [];
  tablePossibleCombinationsPlayer1 = [];
  tablePossibleCombinationsPlayer2 = [];
  tablePossibleCombinationsMorpion = [];

  /* ---------------------------------------- initialisation de tous les tableaux --------------------------- */

  /* creation du tableau des cases */
  tableBox = document.getElementsByClassName('box');

  /* copie du tableau des cases = tableau des cases restantes */
  tableBoxRemaining = [...tableBox];

  /* initialisation du tableau restant*/
  tableBoxRemaining = [...tableBox];  

  /* ------- conversion de l'objet tableBox en tableau conforme à la grille ------ */
  /* création d'autant de sous-tableaux qu'il y a de lignes */
  for (let i = 0 ; i < numberRows ; i++){
    tableBoxes[i] = [];
  };

  /* répartition dans le tableau tableBoxes des différentes cases */
  for (let i = 0 ; i < tableBox.length ; i++){
    let index = Math.floor(i / numberCols);
    tableBoxes[index].push(tableBox[i]);
  };
  /* ------------------------------------------------------------------------------- */

  /* ---------- TABLEAU DES COMBINAISONS GAGNANTES----------------*/ 
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

  /* tableau des combinaisons gagnantes */
  tableCombinations = tabHorizontalCombinations.concat(tabVerticalCombinations).concat(tabDiagonalCombinations);

  /* copie de tableCombinations */    
  for (let i = 0 ; i < tableCombinations.length; i++){
    TableCombinationsCopy[i] = tableCombinations[i].slice();
  };

  /* tableau vierge des combinaisons */
  for (let i =0; i < tableCombinations.length; i++){
    blankTableCombinations[i] = []
    for (let j =0; j < tableCombinations[i].length; j++){
      blankTableCombinations[i].push(tableCombinations[i][j].innerText)
    };
  };   
};



initialisationTables();

// initialisation de l'affichage du tableau
let displayTableDark = () => {  
  for (let element of tableBox){
    element.style.background = 'rgba(0,0,0,0.3)';
  }
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

/* ---------------------------- le bouton commencer clignote à l'ouverture de la page -----------------------------*/
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
/* ---------------------------- le bouton commencer clignote à l'ouverture de la page -----------------------------*/

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
  // colorPlayer1 = '';
  // colorPlayer2 = '';

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
  
  handNumber = 0;
  endGame = false;
  counterattack = false;

  /* réinitialisation de tous les tableaux */
  tableBoxMorpion = [];  
  tableBoxRemaining = [...tableBox];  
  tablePossibleCombinationsPlayer1 = [];  
  tablePossibleCombinationsPlayer2 = [];  
};

let gameWon = false;

let play1 = document.getElementById('player1');
let play2 = document.getElementById('player2');
let modal0 = document.getElementById("window-winner");
let modal1 = document.getElementById("window-open");
let modal2 = document.getElementById("window-equality");
let modal3 = document.getElementById("window-honor");
let btnBeginWindowWinner = document.getElementById('begin_Button_window_winner');
let btnRestartWindowWinner = document.getElementById('restart_Button_window_winner');
let btnBeginWindowEquality = document.getElementById('begin_Button_window_equality');
let btnRestartWindowEquality = document.getElementById('restart_Button_window_equality');
let firstPlayer = document.getElementById('firstPlayer');
let selected = document.getElementById('selected');
let textJoueur1 = document.getElementById('textJoueur1');
let textJoueur2 = document.getElementById('textJoueur2');
let messageWinPlayer = document.getElementById('messageWinPlayer');
let equality = document.getElementById('messageEquality');
let btnGames = document.getElementById('btnGames');
let boxPlayed = '';

/* ------- fonction pour fixer le délai d'affichage de la fenêtre "honneur au perdant" ---------------- */
let timeOutWindowHonor = '';
let delayWindowHonor = () => {
  modal3.style.display = "none";
};
let TimeWindowHonor = ()=>{
  timeOutResponseMorpion = window.setTimeout(delayWindowHonor, 2000);
};
/* -------------------------------------------------------------------------------------------------------------*/

/* ------ on remplit un tableau à mesure que les joueurs jouent à partir du tableau des combinaisons vierges ------ */
let blankTableCombinationsCompleted = () => {

  for (let i = 0 ; i < TableCombinationsCopy.length; i++){
    for (let j = 0 ; j < TableCombinationsCopy[i].length; j++){

      if (boxPlayed === TableCombinationsCopy[i][j] && blankTableCombinations[i][j] === ""){
        blankTableCombinations[i][j] = roundOrCross();
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

/* ------------------------------------------------ JEU -------------------------------------------------------------------------------- */
let simpleGame = () => {                  /* lorsqu'un joueur clique sur une case, la fonction clic est activée */
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
        if (soundOn){
          soundPlayer1.play();
        }
        event.innerText = "O"; 
        event.style.fontSize = "75px";
        event.style.color = colorPlayer1;

        /* actualisation du tableau des cases restantes */
        let index = tableBoxRemaining.indexOf(event);
        tableBoxRemaining.splice(index, 1);    
        
        boxPlayed = event;
        blankTableCombinationsCompleted();   

        win();             /* on appelle la fonction pour savoir si le joueur a gagné après avoir joué son coup */
        messageEquality(); /* on appelle la fonction si les joueurs ont fait égalité */
        displayPlayer1.style.opacity = 0.3;          
        displayPlayer2.style.opacity = 1;
        endGame === true ? player1 = true : player1 = false ;
      } else {
        handNumber ++;
        if (soundOn){
          soundPlayer2.play();
        }
        event.innerText = "X"; 
        event.style.fontSize = "75px";
        event.style.color = colorPlayer2;

        /* actualisation du tableau des cases restantes */
        let index = tableBoxRemaining.indexOf(event);
        tableBoxRemaining.splice(index, 1);

        boxPlayed = event;
        blankTableCombinationsCompleted();
        
        win();
        messageEquality();
        displayPlayer1.style.opacity = 1;
        displayPlayer2.style.opacity = 0.3;
        endGame === true ? player1 = false : player1 = true ;        
      };
    }           
    
    else if (onePlayer && player1){ /* partie à 1 joueur, player 1 commence la partie */     
                
      handNumber ++;
      if (soundOn){
          soundPlayer1.play();
      };
      event.innerText = "O";   
      event.style.fontSize = "75px"; 
      event.style.color = colorPlayer1;   
      boxPlayed = event;
      let index = tableBoxRemaining.indexOf(event); /* on récupère l'index de la case jouée pour la retirer du tableau */
      tableBoxRemaining.splice(index, 1);           /* des cases restantes */
      blankTableCombinationsCompleted();

      

      // 6
      /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
      for (let i = 0 ; i < tableCombinations.length; i++){
        if (tableCombinations[i].includes(event)){                     /* si la case jouée par P1 est dans le tableau des combinaisons */
          tablePossibleCombinationsPlayer1.push(tableCombinations[i]); /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
          let index = tableCombinations.indexOf(tableCombinations[i]);
          tableCombinations.splice(index, 1);                          /* on retire la combinaison du tableau des combinaisons */
          i=-1;
        }
      }

      // 7
      /* on réduit la taille des combinaisons possibles du joueur 1 à 2 cases */
      for (let element of tablePossibleCombinationsPlayer1){
        if (element.includes(event)){         /* si la case jouée par P1 est dans le tableau des combinaisons possibles du joueur 1*/
          let index = element.indexOf(event); 
          element.splice(index, 1);           /* on retire la case des combinaisons possibles */         
        };
      };

      // 1 
      /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
      for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length; i++){
        if(tablePossibleCombinationsPlayer2[i].includes(event)){                                        /* si la case jouée par P1 est dans le tableau des combinaisons possibles de P2 */
          let index = tablePossibleCombinationsPlayer2.indexOf(tablePossibleCombinationsPlayer2[i]);    
          tablePossibleCombinationsPlayer2.splice(index, 1);                /* on retire la combinaison du tableau des combinaisons possibles de P2*/
          i=-1;
        };
      };
      
      win(); 
      messageEquality();
      displayPlayer1.style.opacity = 0.3;
      displayPlayer2.style.opacity = 1;
      endGame === true ? player1 = true : player1 = false ;

      if (easyGame && tableBoxRemaining.length > 1 && !endGame){        
        
        setTimeout(()=>{
          handNumber++;       
          if (soundOn){
          soundPlayer2.play();
          } 
          /* Morpion joue une case au hasard parmi les cases restantes */
          let numberBoxRemaining = tableBoxRemaining.length; 
          let randomNumber = function() { 
            return Math.floor(Math.random() * (numberBoxRemaining-1));
          };        
          let nb = randomNumber();
          boxPlayed = tableBoxRemaining[nb];
          tableBoxMorpion.push(boxPlayed);    /* on rajoute au tableau des cases déjà jouées par morpion la case jouée */
          boxPlayed.innerText = 'X';          /* on joue la case */
          boxPlayed.style.fontSize = "75px"; 
          boxPlayed.style.color = colorPlayer2;  
          blankTableCombinationsCompleted(); 
          tableBoxRemaining.splice(nb, 1);    /* on enlève la case du tableau des cases restantes */   
          displayPlayer1.style.opacity = 1;
          displayPlayer2.style.opacity = 0.3;
          win(); 
          messageEquality(); 
          endGame === true ? player1 = false : player1 = true ;
        }, 1000);                
      } 
      else  if (easyGame && handNumber < 9 && !endGame){    

        setTimeout(()=>{
          handNumber ++;
          if (soundOn){
          soundPlayer2.play();
          ;}
          player1 = false;
          boxPlayed = tableBoxRemaining[0];
          boxPlayed.innerText = 'X';          /* on joue la case */
          boxPlayed.style.fontSize = "75px";
          boxPlayed.style.color = colorPlayer2;   
          blankTableCombinationsCompleted();
          tableBoxRemaining.splice(0, 1);    /* on enlève la case du tableau des cases restantes */  
          win(); 
          messageEquality(); 
          displayPlayer1.style.opacity = 1;
          displayPlayer2.style.opacity = 0.3;
          endGame === true ? player1 = false : player1 = true ;
        }, 1000);                
        
      } 
      else if (middleGame && !endGame){
        
        handNumber ++;
        setTimeout(() => {          
          /* pour le premier coup de morpion, si la case du milieu est vide, il la joue sinon ce sera un coup aléatoire */
          if (handNumber === 2){ 

            if (box5.innerText === ''){

              if (soundOn){
                soundPlayer2.play();
              };              
              boxPlayed = box5;
              boxPlayed.innerText = 'X';
              boxPlayed.style.fontSize = '75px';
              boxPlayed.style.color = colorPlayer2;                
              blankTableCombinationsCompleted();

              // 1
              /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
              for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length; i++){
                if(tablePossibleCombinationsPlayer2[i].includes(event)){                                        /* si la case jouée par P1 est dans le tableau des combinaisons possibles de P2 */
                  let index = tablePossibleCombinationsPlayer2.indexOf(tablePossibleCombinationsPlayer2[i]);    
                  tablePossibleCombinationsPlayer2.splice(index, 1);                /* on retire la combinaison du tableau des combinaisons possibles de P2*/
                  i=-1;
                };
              };

              // 2
              /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
              for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length; i++){
                if (tablePossibleCombinationsPlayer1[i].includes(boxPlayed)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                let index = tablePossibleCombinationsPlayer1.indexOf(tablePossibleCombinationsPlayer1[i]);
                  tablePossibleCombinationsPlayer1.splice(index, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
                  i=-1;
                };
              };  

              // 3
              /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
              for (let i = 0 ; i < tableCombinations.length; i++){
                if (tableCombinations[i].includes(boxPlayed)){                     /* si la case jouée par P1 est dans le tableau des combinaisons */
                  tablePossibleCombinationsPlayer2.push(tableCombinations[i]); /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
                  let index = tableCombinations.indexOf(tableCombinations[i]);
                  tableCombinations.splice(index, 1);                        /* on retire la combinaison du tableau des combinaisons */
                  i=-1;
                };
              };

              // 4
              /* on réduit la taille des combinaisons possibles du joueur 2 à 2 cases */
              for (let element of tablePossibleCombinationsPlayer2){
                if (element.includes(boxPlayed)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                  let index = element.indexOf(boxPlayed); 
                  element.splice(index, 1);               /* on retire la case des combinaisons possibles */
                };
              };

              /* actualisation du tableau des cases restantes */
              let index = tableBoxRemaining.indexOf(box5);
              tableBoxRemaining.splice(index, 1);

              /* actualisation du tableau des cases jouées par Morpion */
              tableBoxMorpion.push(boxPlayed);

              displayPlayer1.style.opacity = 1;
              displayPlayer2.style.opacity = 0.3; 
              endGame === true ? player1 = false : player1 = true ;
            } 
            
            else {
              if (soundOn){
                soundPlayer2.play();
              };
              /* Morpion joue une case au hasard parmi les cases restantes */
              let numberBoxRemaining = tableBoxRemaining.length; 
              let randomNumber = function() { 
                return Math.floor(Math.random() * (numberBoxRemaining-1));
              };        
              let nb = randomNumber();
              boxPlayed = tableBoxRemaining[nb];
              boxPlayed.innerText = "X";          
              boxPlayed.style.fontSize = "75px";
              boxPlayed.style.Color = colorPlayer2;
              blankTableCombinationsCompleted();
              tableBoxRemaining.splice(nb, 1);    /* on enlève la case du tableau des cases restantes */

              // 1
              /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
              for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length; i++){
                if(tablePossibleCombinationsPlayer2[i].includes(event)){                                        /* si la case jouée par P1 est dans le tableau des combinaisons possibles de P2 */
                  let index = tablePossibleCombinationsPlayer2.indexOf(tablePossibleCombinationsPlayer2[i]);    
                  tablePossibleCombinationsPlayer2.splice(index, 1);                /* on retire la combinaison du tableau des combinaisons possibles de P2*/
                  i=-1;
                };
              };

              // 2
              /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
              for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length; i++){
                if (tablePossibleCombinationsPlayer1[i].includes(boxPlayed)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                let index = tablePossibleCombinationsPlayer1.indexOf(tablePossibleCombinationsPlayer1[i]);
                  tablePossibleCombinationsPlayer1.splice(index, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
                  i=-1;
                };
              };  

              // 3
              /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
              for (let i = 0 ; i < tableCombinations.length; i++){
                if (tableCombinations[i].includes(boxPlayed)){                     /* si la case jouée par P1 est dans le tableau des combinaisons */
                  tablePossibleCombinationsPlayer2.push(tableCombinations[i]); /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
                  let index = tableCombinations.indexOf(tableCombinations[i]);
                  tableCombinations.splice(index, 1);                        /* on retire la combinaison du tableau des combinaisons */
                  i=-1;
                };
              };

              // 4
              // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
              for (let element of tablePossibleCombinationsPlayer2){
                if (element.includes(boxPlayed)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                  let index = element.indexOf(boxPlayed); /* on retire la case des combinaisons possibles */
                  element.splice(index, 1);
                };
              };

              /* actualisation du tableau des cases jouées par Morpion */
              tableBoxMorpion.push(boxPlayed);

              displayPlayer1.style.opacity = 1;
              displayPlayer2.style.opacity = 0.3; 
              endGame === true ? player1 = false : player1 = true ;
            };             
          } 
          
          else  /*if (tablePossibleCombinationsPlayer2 != '' || tablePossibleCombinationsPlayer1 != '')*/{
            
            /* Morpion joue une combinaison gagnante s'il peut */
            for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length ; i++){ /* dans le tableau des combinaisons possibles du joueur 2 */
              if (tablePossibleCombinationsPlayer2[i].length === 1 && counterattack === false){             /* si le tableau a une seule valeur */
                if (soundOn){
                  soundPlayer2.play();
                };
                boxPlayed = tablePossibleCombinationsPlayer2[i][0];              /* on joue la case du tableau correspondant */ 
                boxPlayed.innerText = 'X';
                boxPlayed.style.fontSize = '75px';
                boxPlayed.style.color = colorPlayer2;
                blankTableCombinationsCompleted();
                counterattack = true;
                win();
              };
            };          
          
            if (tablePossibleCombinationsPlayer1 != '' && !endGame){   
              
              parade = false;
              /* Morpion contre le joueur 1 s'il a 2 cases sur 3 */
              for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length ; i++){ /* dans le tableau des combinaisons possibles du joueur 1 */
                if (tablePossibleCombinationsPlayer1[i].length === 1 && !parade){  /* si le tableau a une seule valeur */
                  if (soundOn){
                    soundPlayer2.play();
                  };
                  boxPlayed = tablePossibleCombinationsPlayer1[i][0];              /* on joue la case du tableau correspondant */ 
                  boxPlayed.innerText = 'X';
                  boxPlayed.style.fontSize = '75px';
                  boxPlayed.style.color = colorPlayer2;
                  let index = tableBoxRemaining.indexOf(boxPlayed);
                  tableBoxRemaining.splice(index, 1);
                  blankTableCombinationsCompleted();
                  parade = true;                  
                  messageEquality();
                };
              };            

              if (parade){
                // 2
                /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
                for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length; i++){
                  if (tablePossibleCombinationsPlayer1[i].includes(boxPlayed)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                  let index = tablePossibleCombinationsPlayer1.indexOf(tablePossibleCombinationsPlayer1[i]);
                    tablePossibleCombinationsPlayer1.splice(index, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
                    i=-1;
                  };
                };  

                // 3
                /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
                for (let i = 0 ; i < tableCombinations.length; i++){
                  if (tableCombinations[i].includes(boxPlayed)){                     /* si la case jouée par P1 est dans le tableau des combinaisons */
                    tablePossibleCombinationsPlayer2.push(tableCombinations[i]); /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
                    let index = tableCombinations.indexOf(tableCombinations[i]);
                    tableCombinations.splice(index, 1);                        /* on retire la combinaison du tableau des combinaisons */
                    i=-1;

                  };
                };

                // 4
                // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
                for (let element of tablePossibleCombinationsPlayer2){
                  if (element.includes(boxPlayed)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                    let index = element.indexOf(boxPlayed); /* on retire la case des combinaisons possibles */
                    element.splice(index, 1);
                  };
                };

                displayPlayer1.style.opacity = 1;
                displayPlayer2.style.opacity = 0.3; 
                endGame === true ? player1 = false : player1 = true ;          
              }  
            
              if (!parade && !endGame){ /* si le prochain coup de joueur 1 ne le fait pas gagner, Morpion joue une case au hasard */
                
                if (soundOn){
                  soundPlayer2.play();
                };
                let numberBoxRemaining = tableBoxRemaining.length; /* on récupère le nombre de cases restantes */
                /* on cherche un nombre aléatoire pour cocher au hasard une des cases restantes */
                let randomNumber = function() { 
                  return Math.floor(Math.random() * (numberBoxRemaining-1));
                };        
                let nb = randomNumber();
                boxPlayed = tableBoxRemaining[nb];
                boxPlayed.innerText = "X";          /* on joue la case */
                boxPlayed.style.fontSize = "75px";
                boxPlayed.style.color = colorPlayer2;
                tableBoxRemaining.splice(nb, 1);    /* on enlève la case tu tableau des cases restantes */              
                blankTableCombinationsCompleted();
    
                /* actualisation du tableau des cases jouées par Morpion */
                tableBoxMorpion.push(boxPlayed);
    
                // 1
                for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length; i++){
                  if(tablePossibleCombinationsPlayer2[i].includes(event)){                                        /* si la case jouée par P1 est dans le tableau des combinaisons possibles de P2 */
                    let index = tablePossibleCombinationsPlayer2.indexOf(tablePossibleCombinationsPlayer2[i]);    
                    tablePossibleCombinationsPlayer2.splice(index, 1);                /* on retire la combinaison du tableau des combinaisons possibles de P2*/
                    i=-1;
                  };
                };
    
                // 2
                /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
                for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length; i++){
                  if (tablePossibleCombinationsPlayer1[i].includes(boxPlayed)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                  let index = tablePossibleCombinationsPlayer1.indexOf(tablePossibleCombinationsPlayer1[i]);
                    tablePossibleCombinationsPlayer1.splice(index, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
                    i=-1;
                  };
                };  
    
                // 3
                /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
                for (let i = 0 ; i < tableCombinations.length; i++){
                  if (tableCombinations[i].includes(boxPlayed)){                     /* si la case jouée par P1 est dans le tableau des combinaisons */
                    tablePossibleCombinationsPlayer2.push(tableCombinations[i]); /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
                    let index = tableCombinations.indexOf(tableCombinations[i]);
                    tableCombinations.splice(index, 1);                        /* on retire la combinaison du tableau des combinaisons */
                    i=-1;
                  };
                };
    
                // 4
                // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
                for (let element of tablePossibleCombinationsPlayer2){
                  if (element.includes(boxPlayed)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                    let index = element.indexOf(boxPlayed); /* on retire la case des combinaisons possibles */
                    element.splice(index, 1);
                  };
                };
                displayPlayer1.style.opacity = 1;
                displayPlayer2.style.opacity = 0.3; 
                endGame === true ? player1 = false : player1 = true ;            
              }
            }   
            else if (!endGame){ /* plus de victoire possible, MORPION joue la case restante */
              if (soundOn){
                soundPlayer2.play();
              };
              boxPlayed = tableBoxRemaining[0];
              boxPlayed.innerText = "X";
              boxPlayed.style.fontSize = "75px";
              boxPlayed.style.color = colorPlayer2;
              tableBoxRemaining.splice(0, 1);
              messageEquality();
              endGame === true ? player1 = false : player1 = true ;          
            };
          }; 
        }, 1000);

          
      } 
      else if (hardGame && !endGame){
        handNumber ++;
        setTimeout(()=>{
          /* pour le premier coup de morpion, si la case du milieu est vide, il la joue sinon ce sera un coup dans le coin supérieur gauche*/
          if (handNumber === 2){ 

            if (box5.innerText === ''){
              if (soundOn){
                soundPlayer2.play();
              };
              boxPlayed = box5;
              boxPlayed.innerText = 'X';
              boxPlayed.style.fontSize = '75px';
              boxPlayed.style.color = colorPlayer2;
              blankTableCombinationsCompleted();

              // 1
              /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
              for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length; i++){
                if(tablePossibleCombinationsPlayer2[i].includes(event)){                                        /* si la case jouée par P1 est dans le tableau des combinaisons possibles de P2 */
                  let index = tablePossibleCombinationsPlayer2.indexOf(tablePossibleCombinationsPlayer2[i]);    
                  tablePossibleCombinationsPlayer2.splice(index, 1);                /* on retire la combinaison du tableau des combinaisons possibles de P2*/
                  i=-1;
                };
              };

              // 2
              /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
              for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length; i++){
                if (tablePossibleCombinationsPlayer1[i].includes(boxPlayed)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                let index = tablePossibleCombinationsPlayer1.indexOf(tablePossibleCombinationsPlayer1[i]);
                  tablePossibleCombinationsPlayer1.splice(index, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
                  i=-1;
                };
              };  

              // 3
              /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
              for (let i = 0 ; i < tableCombinations.length; i++){
                if (tableCombinations[i].includes(boxPlayed)){                     /* si la case jouée par P1 est dans le tableau des combinaisons */
                  tablePossibleCombinationsPlayer2.push(tableCombinations[i]); /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
                  let index = tableCombinations.indexOf(tableCombinations[i]);
                  tableCombinations.splice(index, 1);                        /* on retire la combinaison du tableau des combinaisons */
                  i=-1;
                };
              };
            
              // 4
              /* on réduit la taille des combinaisons possibles du joueur 2 à 2 cases */
              for (let element of tablePossibleCombinationsPlayer2){
                if (element.includes(boxPlayed)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                  let index = element.indexOf(boxPlayed); 
                  element.splice(index, 1);               /* on retire la case des combinaisons possibles */
                };
              };
                          
              /* actualisation du tableau des cases restantes */
              let index = tableBoxRemaining.indexOf(box5);
              tableBoxRemaining.splice(index, 1);

              /* actualisation du tableau des cases jouées par Morpion */
              tableBoxMorpion.push(boxPlayed);

              displayPlayer1.style.opacity = 1;
              displayPlayer2.style.opacity = 0.3; 
              endGame === true ? player1 = false : player1 = true ;
            } 
            
            else {
              if (soundOn){
                soundPlayer2.play();
              };
              if(tablePossibleCombinationsPlayer2 !=''){                /* si le tableau des combinaisons possibles de P2 contient au moins une combinaison */
                boxPlayed = tablePossibleCombinationsPlayer2[0][0];
                boxPlayed.innerText = "X";                              /* on joue une case faisant partie d'une combinaison*/
                boxPlayed.style.fontSize = "75px";
                boxPlayed.style.color = colorPlayer2;
                blankTableCombinationsCompleted();
                tableBoxRemaining.splice(0, 1);                         /* on enlève la case du tableau des cases restantes */

                // 1
                /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
                for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length; i++){
                  if(tablePossibleCombinationsPlayer2[i].includes(event)){                                        /* si la case jouée par P1 est dans le tableau des combinaisons possibles de P2 */
                    let index = tablePossibleCombinationsPlayer2.indexOf(tablePossibleCombinationsPlayer2[i]);    
                    tablePossibleCombinationsPlayer2.splice(index, 1);                /* on retire la combinaison du tableau des combinaisons possibles de P2*/
                    i=-1;
                  };
                };

                // 2
                /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
                for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length; i++){
                  if (tablePossibleCombinationsPlayer1[i].includes(boxPlayed)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                  let index = tablePossibleCombinationsPlayer1.indexOf(tablePossibleCombinationsPlayer1[i]);
                    tablePossibleCombinationsPlayer1.splice(index, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
                    i=-1;
                  };
                };  

                // 3
                /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
                for (let i = 0 ; i < tableCombinations.length; i++){
                  if (tableCombinations[i].includes(boxPlayed)){                     /* si la case jouée par P1 est dans le tableau des combinaisons */
                    tablePossibleCombinationsPlayer2.push(tableCombinations[i]); /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
                    let index = tableCombinations.indexOf(tableCombinations[i]);
                    tableCombinations.splice(index, 1);                        /* on retire la combinaison du tableau des combinaisons */
                    i=-1;
                  };
                };

                // 4
                // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
                for (let element of tablePossibleCombinationsPlayer2){
                  if (element.includes(boxPlayed)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                    let index = element.indexOf(boxPlayed); 
                    element.splice(index, 1);               /* on retire la case des combinaisons possibles */
                  };
                };

                /* actualisation du tableau des cases jouées par Morpion */
                tableBoxMorpion.push(boxPlayed);
                displayPlayer1.style.opacity = 1;
                displayPlayer2.style.opacity = 0.3; 
                endGame === true ? player1 = false : player1 = true ; 

              } else {
                boxPlayed = tableBoxRemaining[0];
                boxPlayed.innerText = "X";           /* on joue la case */
                boxPlayed.style.fontSize = "75px";
                boxPlayed.style.color = colorPlayer2;
                blankTableCombinationsCompleted();
                tableBoxRemaining.splice(0, 1);      /* on enlève la case du tableau des cases restantes */

                // 1
                /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
                for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length; i++){
                  if(tablePossibleCombinationsPlayer2[i].includes(event)){                                        /* si la case jouée par P1 est dans le tableau des combinaisons possibles de P2 */
                    let index = tablePossibleCombinationsPlayer2.indexOf(tablePossibleCombinationsPlayer2[i]);    
                    tablePossibleCombinationsPlayer2.splice(index, 1);                /* on retire la combinaison du tableau des combinaisons possibles de P2*/
                    i=-1;
                  };
                };

                // 2
                /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
                for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length; i++){
                  if (tablePossibleCombinationsPlayer1[i].includes(boxPlayed)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                  let index = tablePossibleCombinationsPlayer1.indexOf(tablePossibleCombinationsPlayer1[i]);
                    tablePossibleCombinationsPlayer1.splice(index, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
                    i=-1;
                  };
                };  

                // 3
                /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
                for (let i = 0 ; i < tableCombinations.length; i++){
                  if (tableCombinations[i].includes(boxPlayed)){                     /* si la case jouée par P1 est dans le tableau des combinaisons */
                    tablePossibleCombinationsPlayer2.push(tableCombinations[i]); /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
                    let index = tableCombinations.indexOf(tableCombinations[i]);
                    tableCombinations.splice(index, 1);                        /* on retire la combinaison du tableau des combinaisons */
                    i=-1;
                  };
                };

                // 4
                // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
                for (let element of tablePossibleCombinationsPlayer2){
                  if (element.includes(boxPlayed)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                    let index = element.indexOf(boxPlayed); 
                    element.splice(index, 1);               /* on retire la case des combinaisons possibles */
                  };
                };

                /* actualisation du tableau des cases jouées par Morpion */
                tableBoxMorpion.push(boxPlayed);
                displayPlayer1.style.opacity = 1;
                displayPlayer2.style.opacity = 0.3; 
                endGame === true ? player1 = false : player1 = true ;
              };                              
            };                
          } else {

            /* Morpion joue une combinaison gagnante s'il peut */
            for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length ; i++){                  /* dans le tableau des combinaisons possibles du joueur 2 */
              if (tablePossibleCombinationsPlayer2[i].length === 1 && counterattack === false){   /* si le tableau a une seule valeur */
                if (soundOn){
                  soundPlayer2.play();
                };
                boxPlayed = tablePossibleCombinationsPlayer2[i][0];                               /* on joue la case du tableau correspondant */ 
                boxPlayed.innerText = 'X';
                boxPlayed.style.fontSize = '75px';
                boxPlayed.style.color = colorPlayer2;
                counterattack = true;
                blankTableCombinationsCompleted();
                win();
              };
            };                
          
            if (tablePossibleCombinationsPlayer1 != '' && !endGame){ 

              parade = false;

              /* Morpion contre le joueur 1 s'il a 2 cases sur 3 */
              for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length ; i++){ /* dans le tableau des combinaisons possibles du joueur 1 */
                if (tablePossibleCombinationsPlayer1[i].length === 1 && !parade){  /* si le tableau a une seule valeur */
                  if (soundOn){
                    soundPlayer2.play();
                  };
                  boxPlayed = tablePossibleCombinationsPlayer1[i][0];              /* on joue la case du tableau correspondant */ 
                  boxPlayed.innerText = 'X';
                  boxPlayed.style.fontSize = '75px';
                  boxPlayed.style.color = colorPlayer2;
                  let index = tableBoxRemaining.indexOf(boxPlayed);
                  tableBoxRemaining.splice(index, 1);
                  blankTableCombinationsCompleted();
                  messageEquality();
                  parade = true;
                  
                };
              };            

              if (parade){
                // 2
                /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
                for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length; i++){
                  if (tablePossibleCombinationsPlayer1[i].includes(boxPlayed)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                  let index = tablePossibleCombinationsPlayer1.indexOf(tablePossibleCombinationsPlayer1[i]);
                    tablePossibleCombinationsPlayer1.splice(index, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
                    i=-1;
                  };
                };  

                // 3
                /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
                for (let i = 0 ; i < tableCombinations.length; i++){
                  if (tableCombinations[i].includes(boxPlayed)){                     /* si la case jouée par P1 est dans le tableau des combinaisons */
                    tablePossibleCombinationsPlayer2.push(tableCombinations[i]); /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
                    let index = tableCombinations.indexOf(tableCombinations[i]);
                    tableCombinations.splice(index, 1);                        /* on retire la combinaison du tableau des combinaisons */
                    i=-1;
                  };
                };

                // 4
                // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
                for (let element of tablePossibleCombinationsPlayer2){
                  if (element.includes(boxPlayed)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                    let index = element.indexOf(boxPlayed); /* on retire la case des combinaisons possibles */
                    element.splice(index, 1);
                  };
                };

                displayPlayer1.style.opacity = 1;
                displayPlayer2.style.opacity = 0.3; 
                endGame === true ? player1 = false : player1 = true ;            
              };

              if (!parade && !endGame){ /* si le prochain coup de joueur 1 ne le fait pas gagner, Morpion joue une case de son choix */
                
                if(tablePossibleCombinationsPlayer1 != ''){

                  boxPlayed = tablePossibleCombinationsPlayer1[0][0];
                  boxPlayed.innerText = "X";              /* on joue une case faisant partie du tableau des combinaisons de P1*/
                  boxPlayed.style.fontSize = "75px";
                  boxPlayed.style.color = colorPlayer2;
                  let index = tableBoxRemaining.indexOf(boxPlayed);
                  tableBoxRemaining.splice(index, 1);        /* on enlève la case tu tableau des cases restantes */
                  blankTableCombinationsCompleted();

                  /* actualisation du tableau des cases jouées par Morpion */
                  tableBoxMorpion.push(boxPlayed);

                  // 1
                  /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
                  for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length; i++){
                    if(tablePossibleCombinationsPlayer2[i].includes(event)){                                        /* si la case jouée par P1 est dans le tableau des combinaisons possibles de P2 */
                      let index = tablePossibleCombinationsPlayer2.indexOf(tablePossibleCombinationsPlayer2[i]);    
                      tablePossibleCombinationsPlayer2.splice(index, 1);                /* on retire la combinaison du tableau des combinaisons possibles de P2*/
                      i=-1;
                    };
                  };

                  // 2
                  /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
                  for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length; i++){
                    if (tablePossibleCombinationsPlayer1[i].includes(boxPlayed)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                    let index = tablePossibleCombinationsPlayer1.indexOf(tablePossibleCombinationsPlayer1[i]);
                      tablePossibleCombinationsPlayer1.splice(index, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
                      i=-1;
                    };
                  };  

                  // 3
                  /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
                  for (let i = 0 ; i < tableCombinations.length; i++){
                    if (tableCombinations[i].includes(boxPlayed)){                     /* si la case jouée par P1 est dans le tableau des combinaisons */
                      tablePossibleCombinationsPlayer2.push(tableCombinations[i]); /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
                      let index = tableCombinations.indexOf(tableCombinations[i]);
                      tableCombinations.splice(index, 1);                        /* on retire la combinaison du tableau des combinaisons */
                      i=-1;
                    };
                  };

                  // 4
                  // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
                  for (let element of tablePossibleCombinationsPlayer2){
                    if (element.includes(boxPlayed)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                      let index = element.indexOf(boxPlayed); /* on retire la case des combinaisons possibles */
                      element.splice(index, 1);
                    };
                  };
                  displayPlayer1.style.opacity = 1;
                  displayPlayer2.style.opacity = 0.3; 
                  endGame === true ? player1 = false : player1 = true ;
                    
                } else if (tablePossibleCombinationsPlayer2 != ''){

                  boxPlayed = tablePossibleCombinationsPlayer2[0][0];
                  boxPlayed.innerText = "X";              /* on joue une case faisant partie du tableau des combinaisons de P2*/
                  boxPlayed.style.fontSize = "75px";
                  boxPlayed.style.color = colorPlayer2;
                  let index = tableBoxRemaining.indexOf(boxPlayed);
                  tableBoxRemaining.splice(index, 1);        /* on enlève la case tu tableau des cases restantes */
                  blankTableCombinationsCompleted();

                  /* actualisation du tableau des cases jouées par Morpion */
                  tableBoxMorpion.push(boxPlayed);

                  // 1
                  /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
                  for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length; i++){
                    if(tablePossibleCombinationsPlayer2[i].includes(event)){                                        /* si la case jouée par P1 est dans le tableau des combinaisons possibles de P2 */
                      let index = tablePossibleCombinationsPlayer2.indexOf(tablePossibleCombinationsPlayer2[i]);    
                      tablePossibleCombinationsPlayer2.splice(index, 1);                /* on retire la combinaison du tableau des combinaisons possibles de P2*/
                      i=-1;
                    };
                  };

                  // 2
                  /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
                  for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length; i++){
                    if (tablePossibleCombinationsPlayer1[i].includes(boxPlayed)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                    let index = tablePossibleCombinationsPlayer1.indexOf(tablePossibleCombinationsPlayer1[i]);
                      tablePossibleCombinationsPlayer1.splice(index, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
                      i=-1;
                    };
                  };  

                  // 3
                  /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
                  for (let i = 0 ; i < tableCombinations.length; i++){
                    if (tableCombinations[i].includes(boxPlayed)){                     /* si la case jouée par P1 est dans le tableau des combinaisons */
                      tablePossibleCombinationsPlayer2.push(tableCombinations[i]); /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
                      let index = tableCombinations.indexOf(tableCombinations[i]);
                      tableCombinations.splice(index, 1);                        /* on retire la combinaison du tableau des combinaisons */
                      i=-1;
                    };
                  };

                  // 4
                  // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
                  for (let element of tablePossibleCombinationsPlayer2){
                    if (element.includes(boxPlayed)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                      let index = element.indexOf(boxPlayed); /* on retire la case des combinaisons possibles */
                      element.splice(index, 1);
                    };
                  };
                  displayPlayer1.style.opacity = 1;
                  displayPlayer2.style.opacity = 0.3; 
                  endGame === true ? player1 = false : player1 = true ;
                     
                } else { /* Morpion joue une case au hasard */
                  let numberBoxRemaining = tableBoxRemaining.length; /* on récupère le nombre de cases restantes */
                  if (soundOn){
                    soundPlayer2.play();
                  };
                  /* on cherche un nombre aléatoire pour cocher au hasard une des cases restantes */
                  let randomNumber = function() { 
                    return Math.floor(Math.random() * (numberBoxRemaining-1));
                  };        
                  let nb = randomNumber();
                  boxPlayed = tableBoxRemaining[nb];
                  boxPlayed.innerText = "X";          /* on joue la case */
                  boxPlayed.style.fontSize = "75px";
                  boxPlayed.style.color = colorPlayer2;
                  tableBoxRemaining.splice(nb, 1);    /* on enlève la case tu tableau des cases restantes */
                  blankTableCombinationsCompleted();

                  /* actualisation du tableau des cases jouées par Morpion */
                  tableBoxMorpion.push(boxPlayed);

                  // 1
                  /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
                  for (let i = 0 ; i < tablePossibleCombinationsPlayer2.length; i++){
                    if(tablePossibleCombinationsPlayer2[i].includes(event)){                                        /* si la case jouée par P1 est dans le tableau des combinaisons possibles de P2 */
                      let index = tablePossibleCombinationsPlayer2.indexOf(tablePossibleCombinationsPlayer2[i]);    
                      tablePossibleCombinationsPlayer2.splice(index, 1);                /* on retire la combinaison du tableau des combinaisons possibles de P2*/
                      i=-1;
                    };
                  };

                  // 2
                  /* actualisation du tableau des combinaisons possibles pour le joueur 1 */
                  for (let i = 0 ; i < tablePossibleCombinationsPlayer1.length; i++){
                    if (tablePossibleCombinationsPlayer1[i].includes(boxPlayed)){ /* si la case jouée par player 2 est dans le tableau des combinaisons possibles du joueur 1*/
                    let index = tablePossibleCombinationsPlayer1.indexOf(tablePossibleCombinationsPlayer1[i]);
                      tablePossibleCombinationsPlayer1.splice(index, 1);              /* on retire la combinaison du tableau des combinaisons possibles du player 1 */                
                      i=-1;
                    };
                  };  

                  // 3
                  /* actualisation du tableau des combinaisons possibles pour le joueur 2 */
                  for (let i = 0 ; i < tableCombinations.length; i++){
                    if (tableCombinations[i].includes(boxPlayed)){                     /* si la case jouée par P1 est dans le tableau des combinaisons */
                      tablePossibleCombinationsPlayer2.push(tableCombinations[i]); /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
                      let index = tableCombinations.indexOf(tableCombinations[i]);
                      tableCombinations.splice(index, 1);                        /* on retire la combinaison du tableau des combinaisons */
                      i=-1;
                    };
                  };

                  // 4
                  // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
                  for (let element of tablePossibleCombinationsPlayer2){
                    if (element.includes(boxPlayed)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
                      let index = element.indexOf(boxPlayed); /* on retire la case des combinaisons possibles */
                      element.splice(index, 1);
                    };
                  };
                  displayPlayer1.style.opacity = 1;
                  displayPlayer2.style.opacity = 0.3; 
                  endGame === true ? player1 = false : player1 = true ;   
                };     
              };
            } else if (!endGame){ /* plus de victoire possible, MORPION joue la case restante */
              if (soundOn){
                soundPlayer2.play();
              };
              boxPlayed = tableBoxRemaining[0];
              boxPlayed.innerText = "X";
              boxPlayed.style.fontSize = "75px";
              boxPlayed.style.color = colorPlayer2;
              tableBoxRemaining.splice(0, 1);
              messageEquality();
              endGame === true ? player1 = false : player1 = true ;   
            };  
          };      
        }, 1000);        
      };
    };
  });
};

let firstGame = true;

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
  colorTop[0].style.padding = '15px';
  // colorTop[0].style.backgroundColor = 'chocolate';
  colorBottom[1].style.padding = '15px';
  // colorBottom[1].style.backgroundColor = 'orange';

  colorPlayer1 = 'chocolate';
  colorPlayer2 = 'orange';
});

// bouton valider de la fenêtre d'entrée - les joueurs donnent leur nom, choisissent qui commence
btn1.addEventListener('click', (event) => { 
  play1.textContent = namePlayer1.value;
  if (btnRadio1.checked){
    play2.textContent = "morpion";
  } else {
    play2.textContent = namePlayer2.value;
  };
  let playerBegin = firstPlayer.options[firstPlayer.selectedIndex].value; /* pour connaître la valeur du bouton radio sélectionné */  
  
  if (playerBegin === "player1" && btnRadio2.checked){
    player1 = true;  
    displayPlayer1.style.opacity = 1;
    onePlayer = false;
  } else if (playerBegin === "player2"){
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
      play1.style.opacity = 1;
    };
    firstGame = false;
  } else {
    displayTableClear();
    play1.style.opacity = 1;
    event.preventDefault();
  };

  startGame.disabled = true;
  displayPlayer1.style.backgroundColor = colorPlayer1;
  round.style.color = colorPlayer1;
  displayPlayer2.style.backgroundColor = colorPlayer2;
  cross.style.color = colorPlayer2;
  if (soundOn){
    soundBegin.play();
  };
});

// lorsque le joueur 1 entre son nom, ce dernier s'ajoute à la liste select
namePlayer1.addEventListener('change', () => {
  textJoueur1.text = namePlayer1.value /* + ' commence'*/ ;
});namePlayer1.value = "";
namePlayer2.value = "";
textJoueur1.text = "";
textJoueur2.text = "";
// lorsque le joueur 2 entre son nom, ce dernier s'ajoute à la liste select
namePlayer2.addEventListener('change', () => {
  textJoueur2.text = namePlayer2.value /* + ' commence'*/ ;
});

// ouvre la fenêtre annoncant le vainqueur
let messageWinner = () => {
  clearInterval(interval);
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
      messageWinPlayer.innerText = "Bravo " + play2.innerText + " !!! \n\nVous menez " + victoriesPlayer2 + " à " + victoriesPlayer1 + '.';
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
  if (/*handNumber === 9*/ tableBoxRemaining[0] === undefined && !endGame ){
    setTimeout(()=>{
      equality.innerText = "Pas de gagnant !!!";
    modal2.style.display = 'block';
    endGame = true;
    },1000);
  };
};

let interval = '';
// ouvre la fenêtre du vainqueur s'il y a un vainqueur
let win = () => {  

  function egalP1 (P1)  {
    return P1 === "O"; 
  };
  function egalP2 (P2) {
    return P2 === "X"; 
  };

  for (let i = 0 ; i < blankTableCombinations.length; i++){
    if (blankTableCombinations[i].every(egalP1) || blankTableCombinations[i].every(egalP2)){
      if (soundOn){
        soundEndGame.play();
      };
      endGame = true; 
      /* ---------------- la combinaison gagnante clignotte ---------------------------- */
      let winnerBlink = () => {  
        interval = setInterval(blink, 300);
      };      

      let blink = () => {  
        for (let element of TableCombinationsCopy[i]){
          if (element.style.color !== "white" ){ 
            element.style.color = "white"; 
          } 
          else { 
            if (player1){
              element.style.color = colorPlayer1; 
            } else {
              element.style.color = colorPlayer2; 
            }
          } 
        }
      };
      winnerBlink();
      /* ------------------------------------------------------------------------------- */

      setTimeout(()=>{
        messageWinner();
      }, 2000)
    } ;
  };
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
  initialisationTables();
  if (onePlayer && player1Win){
    handNumber++;
    boxPlayed = box5;
    setTimeout(()=>{
      if (soundOn){
        soundPlayer2.play();
      };
      boxPlayed.innerText = 'X';
      boxPlayed.style.fontSize = "75px"; 
      boxPlayed.style.color = colorPlayer2; 
      player1 = false;
      blankTableCombinationsCompleted();    
      player1 = true;

      // 3
      /* actualisation du tableau des combinaisons possibles pour le joueur 2 */      
      for (let i = 0 ; i < tableCombinations.length; i++){
        if (tableCombinations[i].includes(boxPlayed)){                     /* si la case jouée par P1 est dans le tableau des combinaisons */
          tablePossibleCombinationsPlayer2.push(tableCombinations[i]); /* on insère la combinaison dans le tableau des combinaisons possibles du player 1 */
          let index = tableCombinations.indexOf(tableCombinations[i]);
          tableCombinations.splice(index, 1);                        /* on retire la combinaison du tableau des combinaisons */
          i=-1;
        };
      };

      // 4
      // on réduit la taille des combinaisons possibles du joueur 2 à 2 cases
      for (let element of tablePossibleCombinationsPlayer2){
        if (element.includes(boxPlayed)){         /* si la case jouée est dans le tableau des combinaisons possibles du joueur 2*/
          let index = element.indexOf(boxPlayed); /* on retire la case des combinaisons possibles */
          element.splice(index, 1);
        };
      };

      // 5
      /* actualisation du tableau des combinaisons */
      for (let element of tableCombinations){
        if (element.includes(boxPlayed)){                  /* si la case jouée par P2 est dans le tableau des combinaisons */
          let index = tableCombinations.indexOf(element);
          tableCombinations.splice(index, 1);                         /* on retire la combinaison du tableau des combinaisons */
        }; 
      };

      /* actualisation du tableau des cases restantes */
      let index = tableBoxRemaining.indexOf(box5);
      tableBoxRemaining.splice(index, 1);
      
    }, 2100);  
  }
  if (soundOn){
    soundBegin.play();
  };       
});

/* bouton continuer de la la fenêtre "égalité" */
btnBeginWindowEquality.addEventListener('click', () => {
  modal2.style.display = "none";
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
  initialisationTables();
  if (soundOn){
    soundBegin.play();
  };     
});

/* bouton réinitialiser de la la fenêtre "partie gagnée" */
btnRestartWindowWinner.addEventListener('click', () => {
  initialParameters();
  initialisationTables();
  modal0.style.display = "none";
  modal1.style.display = 'block';
  namePlayer1.value = "";
  namePlayer2.value = "";
  textJoueur1.text = "";
  textJoueur2.text = "";
  firstPlayer.selectedIndex = '0';
  namePlayer2.style.display = 'none';
  firstPlayer.style.display = 'none';  
  if (btnRadio1.checked){
    namePlayer2.style.display = 'none';
    firstPlayer.style.display = 'none';
    level.style.display = 'block';
  } else {
    namePlayer2.style.display = 'block';
    firstPlayer.style.display = 'block';
    level.style.display = 'none';
  }

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

  for (let element of colorTop){
    if (element.style.backgroundColor === colorPlayer1){
      element.style.padding = '15px';
    }
  }
  for (let element of colorBottom){
    if (element.style.backgroundColor === colorPlayer2){
      element.style.padding = '15px';
    }
  }
});

/* bouton réinitialiser de la la fenêtre "égalité" */
btnRestartWindowEquality.addEventListener('click', () => {
  initialParameters();
  initialisationTables();
  modal2.style.display = "none";
  modal1.style.display = 'block';
  namePlayer1.value = "";
  namePlayer2.value = "";
  textJoueur1.text = "";
  textJoueur2.text = "";  
  firstPlayer.selectedIndex = '0';
  namePlayer2.style.display = 'none';
  firstPlayer.style.display = 'none';  
  if (btnRadio1.checked){
    namePlayer2.style.display = 'none';
    firstPlayer.style.display = 'none';
    level.style.display = 'block';
  } else {
    namePlayer2.style.display = 'block';
    firstPlayer.style.display = 'block';
    level.style.display = 'none';
  }
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


