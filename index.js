var playing = false;
var patron = [];
var posJug = 0;
var colorMap = ['UL', 'UR', 'DL', 'DR'];
var score = 0;
var tiempo = 1500;

function btnPressed(){
  if (this.id == colorMap[patron[posJug]]){
    posJug++;
    if (posJug == patron.length){
      score++;
      gabyDice();
    }
  }else{
    document.getElementById("titulo").innerHTML = "PERDISTE";
    deactivateGame();
    endGame();
    playing = false;
  }
  document.getElementById("count").innerHTML = score;
}

function deactivateGame(){
  document.getElementById("centro").classList.add('centro-block');
  var butons = document.getElementsByClassName('btn')
  for (var i=0; i<butons.length; i++){
    butons[i].removeEventListener("click", btnPressed);
    butons[i].classList.remove(butons[i].id);
    butons[i].classList.add(butons[i].id + "-inactive");
  }
  document.getElementById("titulo").innerHTML = "Gaby dice:";
}
function activateGame(){
  document.getElementById("centro").classList.remove('centro-block');
  var butons = document.getElementsByClassName('btn')
  for (var i=0; i<butons.length; i++){
    butons[i].addEventListener("click", btnPressed);
    butons[i].classList.add(butons[i].id);
    butons[i].classList.remove(butons[i].id + "-inactive");
  }
  document.getElementById("titulo").innerHTML = "Tu dices:";
}

function apagar() {
  document.getElementById(colorMap[patron[posJug]]).classList.remove(colorMap[patron[posJug]] + "-active");
  posJug++;
  if (posJug < patron.length){
    setTimeout(encender, tiempo/3);
  }else{
    activateGame();
    posJug = 0;
  }
}
function encender() {
  document.getElementById(colorMap[patron[posJug]]).classList.add(colorMap[patron[posJug]] + "-active");  
  setTimeout(apagar, tiempo);
}
function gabyDice(){
  posJug = 0;
  var valor = parseInt(Math.random()*4);
  tiempo = parseInt(1800*(5/(6 + score)));
  patron.push(valor);
  deactivateGame();
  setTimeout(encender, 1000);
}

function endGame(){
  document.getElementById("b-start").classList.add('start');
  document.getElementById("b-start").classList.remove('startPressed');
  document.getElementById("count").innerHTML = "Pulsa";
}

function startgame(){
  if (!playing){
    document.getElementById("b-start").classList.add('startPressed');
    document.getElementById("b-start").classList.remove('start');
    document.getElementById("titulo").innerHTML = "Gaby dice:";     
    patron = [];
    posJug = 0;
    score = 0;
    document.getElementById("count").innerHTML = score;
    gabyDice();
  }else{
    endGame();
    
  }
  playing = !playing;
}
window.addEventListener('load', function () {
  document.getElementById("b-start").addEventListener("click", startgame);
});

