const PUZZLE_DIFFICULTY = 3;
var _canvas;
var c;
var img;
var _pieces;
var _puzzleWidth;
var _puzzleHeight;
var _pieceWidth;
var _pieceHeight;
var seconds = 0;
var minutes = 0;
var hours = 0;
var countingInterval;
var carouselInterval;
var myIndex1 = 0;
var myIndex2 = 0;
var myIndex3 = 0;
var highscore;
var winning = [];
var player;

var clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;
var emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

function init(){
  img = new Image();
  img.src = "harry.jpg";
  img.addEventListener('load', initPuzzle, false);
  carousel();
  carouselInterval = setInterval(carousel, 8000); // Change image every 8 seconds
  countingInterval = setInterval(start_counting, 1000);
}
//Gestionar mi slider
function carousel() {
    var i;
		var x = document.getElementsByClassName("box1");
		for(i=0; i<x.length; i++) {
				x[i].style.display = "none";
		}
		myIndex1++;
		if (myIndex1 > x.length) {myIndex1 = 1};
		x[myIndex1-1].style.display = "inline";

		x = document.getElementsByClassName("box2");
		for(i=0; i<x.length; i++) {
				x[i].style.display = "none";
		}
		myIndex2++;
		if (myIndex2 > x.length) {myIndex2 = 1};
		x[myIndex2-1].style.display = "inline";

		x = document.getElementsByClassName("box3");
		for(i=0; i<x.length; i++) {
				x[i].style.display = "none";
		}
		myIndex3++;
		if (myIndex3 > x.length) {myIndex3 = 1};
		x[myIndex2-1].style.display = "inline";
}
// Para seleccionar la imagen de mi slider.
function displayID(clicked){
	var change = clicked.src.split("/");
	change = change[change.length-1].split(".")[0];
	clicked.src = document.getElementById("imageType").src;
	document.getElementById("imageType").src = change + ".jpg"; //Cambia imagen izq
  img.src= change + ".jpg"; //Cambia imagen canvas
	images = [];
	clearInterval(countingInterval); // para iniciar mi contador de nuevo
	clearInterval(carouselInterval); // para iniciar mi slider
	seconds = 0;
	hours = 0;
	minutes = 0;
  carouselInterval = setInterval(carousel, 8000); // Change image every 8 seconds
  countingInterval = setInterval(start_counting, 1000);
  carousel();
}
function initPuzzle(e){
  _pieceWidth = Math.floor(img.width / PUZZLE_DIFFICULTY)
  _pieceHeight = Math.floor(img.height / PUZZLE_DIFFICULTY)
  _puzzleWidth = _pieceWidth * PUZZLE_DIFFICULTY;
  _puzzleHeight = _pieceHeight * PUZZLE_DIFFICULTY;
  setCanvas();
  buildPieces();
}

function setCanvas(){
  _canvas = document.getElementById('canvas');
  c = _canvas.getContext('2d');
  _canvas.width = _puzzleWidth;
  _canvas.height = _puzzleHeight;
  _canvas.style.border = "2px solid black";
}
//Guarda array corrdenadas piezas en orden (objeto cada pieza)
function buildPieces(){
  var i;
  var j;
  //posición actual en el rompecabezas donde se debe dibujar pieza
  _pieces = new Array(PUZZLE_DIFFICULTY);
  for (var i = 0; i < PUZZLE_DIFFICULTY; ++i) {
    _pieces[i] = new Array(PUZZLE_DIFFICULTY);
    for (var j = 0; j < PUZZLE_DIFFICULTY; ++j) {
      _pieces[i][j] = new Object;
      //Desordena las piezas, siempre el mismo orden
      _pieces[i][j].x = (PUZZLE_DIFFICULTY - 1) - i;
      _pieces[i][j].y = (PUZZLE_DIFFICULTY - 1) - j;
      //Ordenadas, ver si esta bien ganar
      //_pieces[i][j].x =  i;
      //_pieces[i][j].y = j;
    }
  }
  //Posicion donde dejar vacio
  emptyLoc.x = _pieces[PUZZLE_DIFFICULTY - 1][PUZZLE_DIFFICULTY - 1].x;
  emptyLoc.y = _pieces[PUZZLE_DIFFICULTY - 1][PUZZLE_DIFFICULTY - 1].y;
  console.log("Piezas: ")
  console.log(_pieces)
  console.log("Empty: ")
  console.log(emptyLoc.x)
  console.log(emptyLoc.y)
  shufflePuzzle() //descoloca
  drawPuzzle(); //pinta
}

function shufflePuzzle(){
  _pieces = shuffleArray(_pieces);
}
//desordena las piezas del array
function shuffleArray(o){
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function drawPuzzle(){
  c.clearRect(0,0,_puzzleWidth,_puzzleHeight);
  var i;
  for (var i = 0; i < PUZZLE_DIFFICULTY; ++i) {
    for (var j = 0; j < PUZZLE_DIFFICULTY; ++j) {
      var x = _pieces[i][j].x;
      var y = _pieces[i][j].y;
      //Borre ver original
      //Pinta todas menos hueco
      if(i != emptyLoc.x || j != emptyLoc.y) {
        c.drawImage(img, x * _pieceWidth, y * _pieceHeight, _pieceWidth, _pieceHeight,
            i * _pieceWidth, j * _pieceHeight, _pieceWidth, _pieceHeight);
      }
    }
  }
  document.onmousedown = onPuzzleClick;
}

//Pieza clicada + busca hueco.
function onPuzzleClick(e){
  if ((e.pageX > 500 && e.pageX <(500 + _puzzleWidth)) && (e.pageY > 210 && e.pageY <(210 + _puzzleHeight))) {
      if(e.layerX || e.layerX == 0){
          clickLoc.x = e.layerX - _canvas.offsetLeft + 500;
          clickLoc.y = e.layerY - _canvas.offsetTop + 210;
          clickLoc.x = Math.floor(clickLoc.x/_pieceWidth);
          clickLoc.y = Math.floor(clickLoc.y/_pieceHeight);
      }
      else if(e.offsetX || e.offsetX == 0){
          clickLoc.x = e.offsetX - _canvas.offsetLeft + 500;
          clickLoc.y = e.offsetY - _canvas.offsetTop + 210;
          clickLoc.x = Math.floor(clickLoc.x/_pieceWidth);
          clickLoc.y = Math.floor(clickLoc.y/_pieceHeight);
      }
    }
  console.log(clickLoc.x)
  console.log(clickLoc.y)
  if (findEmpty(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
    updatePuzzle(emptyLoc, clickLoc);
    drawPuzzle();
  }
}
//Si es !=1 no puede cambiar
function findEmpty(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function updatePuzzle(toLoc, fromLoc){
  gameWin = false
    if (!gameWin) {
      _pieces[toLoc.x][toLoc.y].x = _pieces[fromLoc.x][fromLoc.y].x;
      _pieces[toLoc.x][toLoc.y].y = _pieces[fromLoc.x][fromLoc.y].y;
      _pieces[fromLoc.x][fromLoc.y].x = PUZZLE_DIFFICULTY - 1;
      _pieces[fromLoc.x][fromLoc.y].y = PUZZLE_DIFFICULTY - 1;
      toLoc.x = fromLoc.x;
      toLoc.y = fromLoc.y;
    }
  resetPuzzleAndCheckWin();
}
// Contador para mi pagina
function start_counting(){
	var counter = hours + ":" + minutes + ":" + seconds;
	seconds += 1;
	if (seconds == 60) {
		minutes += 1;
		seconds = 0;
		if (minutes == 60){
			hours += 1;
			minutes = 0;
		}
	}
	document.getElementById("counter").innerHTML = counter;
}

function resetPuzzleAndCheckWin(){
  c.clearRect(0,0,_puzzleWidth,_puzzleHeight);
  var gameWin = true;
  var i;
  for (var i = 0; i < PUZZLE_DIFFICULTY; ++i) {
    for (var j = 0; j < PUZZLE_DIFFICULTY; ++j) {
      if (_pieces[i][j].x != i || _pieces[i][j].y != j) {
          drawPuzzle();
          gameWin = false;
      }
    }
  }
  if(gameWin){
    console.log("YOU WIN !");
    setTimeout(gameFinnish,500);
    winTime();
  }
}

function winTime(){
		var win = document.createElement("img");
  	win.src = "winner.gif";
		win.id = "winner";
		win.width = window.innerWidth;
		win.height = window.innerHeight;
    document.getElementById("slider").appendChild(win);
		win.setAttribute("onclick", "record()");
}

function record(){
	document.getElementById("slider").removeChild(document.getElementById("winner"));
	// hay que hacerlo condicional por si se supera el highscore
	var nickname = prompt("New Highscore! Write your name", "Name");
	if (nickname != "" && nickname != null) {
    player = nickname;
  } else {
		player = "* Ghost *";
	};
	// hay que hacerlo condicional por si se supera el highscore
	images = [];
	clearInterval(countingInterval); // para iniciar mi contador de nuevo
	seconds = 0;
	hours = 0;
	minutes = 0;
  carouselInterval = setInterval(carousel, 8000); // Change image every 8 seconds
  countingInterval = setInterval(start_counting, 1000);
  carousel();
  buildPieces();
  showhighscore();

}

function showhighscore(){
	if (player == undefined){
		alert("No one finished yet!\n Try you NOW");
	}else{
		alert("THE BEST PLAYER IS:\n\n" + player + "\nFinished in: " + highscore);
	}
}

function gameFinnish(){
  document.onmousedown = null;
  highscore = String(hours) + ":" + String(minutes) + ":" + String(seconds);
  //buildPieces();
  //record();
  //showhighscore();
}
