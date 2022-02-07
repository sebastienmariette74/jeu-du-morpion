let box1 = document.getElementById('box1');
let box2 = document.getElementById('box2');
let box3 = document.getElementById('box3');
let box4 = document.getElementById('box4');
let box5 = document.getElementById('box5');
let box6 = document.getElementById('box6');
let box7 = document.getElementById('box7');
let box8 = document.getElementById('box8');
let box9 = document.getElementById('box9');
box1.innerHTML = '';
box2.innerHTML = '';
box3.innerHTML = '';
box4.innerHTML = '';
box5.innerHTML = '';
box6.innerHTML = '';
box7.innerHTML = '';
box8.innerHTML = '';
box9.innerHTML = '';

let table = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

let hand1 = document.getElementById('hand1');
let hand2 = document.getElementById('hand2');

let gameWon = false;

let player1 = true;

let restart = document.getElementById('restart');

let displayPlayer1 = document.getElementById('player1');
let displayPlayer2 = document.getElementById('player2');
displayPlayer1.style.opacity = 0.3;
displayPlayer2.style.opacity = 0.3;

let handNumber = 0;

let play1 = document.getElementById('player1');
let play2 = document.getElementById('player2');

let modal = document.getElementById("window-winner");
let modal1 = document.getElementById("window-open");
let modal2 = document.getElementById("window-equality");
let modalContent = document.getElementById("modalContent");

let closeWindowWinner = document.getElementById('close-window-winner');
let closeWindowEquality = document.getElementById("close-window-equality");
console.log(closeWindowWinner);

let firstPlayer = document.getElementById('firstPlayer');
console.log(firstPlayer.value);

let textJoueur1 = document.getElementById('textJoueur1');
let textJoueur2 = document.getElementById('textJoueur2');

let messageWinPlayer1 = document.getElementById('messageWinPlayer1');
// let messageWinPlayer2 = document.getElementById('messageWinPlayer2');
let equality = document.getElementById('messageEquality');

// ouvre la fenêtre demandant les noms des joueurs
(() => {   
  modal1.style.display = 'block';
})();

console.log(firstPlayer.value);

// bouton valider de la fenêtre d'entrée - les joueurs donnent leur nom, choisissent qui commence
btn1.addEventListener('click', () => {
  let namePlayer1 = document.getElementById('namePlayer1');
  play1.textContent = namePlayer1.value;
  let namePlayer2 = document.getElementById('namePlayer2');
  play2.textContent = namePlayer2.value; 
  let playerBegin = firstPlayer.options[firstPlayer.selectedIndex].value;
  console.log(playerBegin); 
  if (playerBegin === "player1"){
    hand1.innerHTML = 'O';
    hand2.innerHTML = '';
    player1 = true;  
    displayPlayer1.style.opacity = 1;
  } else {
    hand2.innerHTML = 'X';
    hand1.innerHTML = '';
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
    hand1.innerHTML = 'O';
    hand2.innerHTML = '';
    
  } else {
    hand2.innerHTML = 'X';
    hand1.innerHTML = '';
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
    messageWinPlayer1.innerHTML = "Bravo " + namePlayer1.value + ", vous avez gagné la partie !!!";
    modal.style.display = 'block';
  } else {
    displayPlayer2.style.opacity = 0.3;
    displayPlayer1.style.opacity = 0.3;
    // let bloc = document.createElement('div');
    // bloc.id = 'bloc';  
    // let texte = document.createTextNode("Bravo Player 2, vous avez gagné la partie !!!");
    // bloc.appendChild(texte);
    // modalContent.prepend(bloc);
    messageWinPlayer1.innerHTML = "Bravo " + namePlayer2.value + ", vous avez gagné la partie !!!";
    modal.style.display = 'block'; 
  };
};

// ouvre la fenêtre d'égalité
let messageEquality = () => {
  if (handNumber === 9){
    equality.innerHTML = "Pas de gagnant !!!";
    modal2.style.display = 'block';
  };
};

// ouvre la fenêtre du vainqueur s'il y a un vainqueur
let win = () => {
  if (
    ((box1.innerHTML === 'O') && (box1.innerHTML === box2.innerHTML) && (box1.innerHTML === box3.innerHTML)) || 
    ((box4.innerHTML === 'O') && (box4.innerHTML === box5.innerHTML) && (box4.innerHTML === box6.innerHTML)) || 
    ((box7.innerHTML === 'O') && (box7.innerHTML === box8.innerHTML) && (box7.innerHTML === box9.innerHTML)) || 
    ((box1.innerHTML === 'O') && (box1.innerHTML === box4.innerHTML) && (box1.innerHTML === box7.innerHTML)) || 
    ((box2.innerHTML === 'O') && (box2.innerHTML === box5.innerHTML) && (box2.innerHTML === box8.innerHTML)) || 
    ((box3.innerHTML === 'O') && (box3.innerHTML === box6.innerHTML) && (box3.innerHTML === box9.innerHTML)) || 
    ((box1.innerHTML === 'O') && (box1.innerHTML === box5.innerHTML) && (box1.innerHTML === box9.innerHTML)) || 
    ((box3.innerHTML === 'O') && (box3.innerHTML === box5.innerHTML) && (box3.innerHTML === box7.innerHTML)) ||
    ((box1.innerHTML === 'X') && (box1.innerHTML === box2.innerHTML) && (box1.innerHTML === box3.innerHTML)) || 
    ((box4.innerHTML === 'X') && (box4.innerHTML === box5.innerHTML) && (box4.innerHTML === box6.innerHTML)) || 
    ((box7.innerHTML === 'X') && (box7.innerHTML === box8.innerHTML) && (box7.innerHTML === box9.innerHTML)) || 
    ((box1.innerHTML === 'X') && (box1.innerHTML === box4.innerHTML) && (box1.innerHTML === box7.innerHTML)) || 
    ((box2.innerHTML === 'X') && (box2.innerHTML === box5.innerHTML) && (box2.innerHTML === box8.innerHTML)) || 
    ((box3.innerHTML === 'X') && (box3.innerHTML === box6.innerHTML) && (box3.innerHTML === box9.innerHTML)) || 
    ((box1.innerHTML === 'X') && (box1.innerHTML === box5.innerHTML) && (box1.innerHTML === box9.innerHTML)) || 
    ((box3.innerHTML === 'X') && (box3.innerHTML === box5.innerHTML) && (box3.innerHTML === box7.innerHTML))

    ){
      messageWinner();
  }
};




// fonction appelée lorsqu'on clique sur une case. Suivant le joueur, on met un rond ou une croix et on détermine le gagnant ou l'égalité.
let clic = (event) => {
  event.addEventListener('click', ()=>{
    if (player1){
      handNumber ++;
      event.innerHTML = "O"; 
      win();
      messageEquality();
      player1 = false;
      whoPlay();
      displayPlayer2.style.opacity = 1;
      displayPlayer1.style.opacity = 0.3;

    } else {
      handNumber++;
      event.innerHTML = "X";
      win();
      messageEquality();
      player1 = true;
      whoPlay();
      displayPlayer2.style.opacity = 0.3;
      displayPlayer1.style.opacity = 1;


    };
  });
};

// Lorsqu'on clique sur une case du tableau, on appelle la fonction clic.
for (i = 0 ; i < table.length ; i++){
  clic(table[i]);
};





closeWindowWinner.addEventListener('click', () => {
  modal.style.display = "none";
});

closeWindowEquality.addEventListener('click', () => {
  modal2.style.display = "none";
});

restart.addEventListener('click', () => {
  box1.innerHTML = '';
  box2.innerHTML = '';
  box3.innerHTML = '';
  box4.innerHTML = '';
  box5.innerHTML = '';
  box6.innerHTML = '';
  box7.innerHTML = '';
  box8.innerHTML = '';
  box9.innerHTML = '';
  handNumber = 0;

});

// // When the user clicks anywhere outside of the modal, close it
// window.addEventListener ('click', function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// });

