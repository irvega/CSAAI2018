var change = "";
var pacman = "";
var seconds = 0;
var minutes = 0;
var hours = 0;
var countingGame = 0;
var countingInterval = 0;
var totaltime = 0;
var pause = false;
var ghostsArray;
var blueGhost, redGhost, pinkGhost, clydeGhost;
var soundtrack= "";
var maxScore = 2170;
var maxTime = 90;
var miStorage = localStorage;

function GameMapConstructor(wallSrc, cocoSrc, floorSrc, fruitSrc) {
    //1:pared, 2:bola, 3:bola grande , 4:fruta .
    this.gameAreaMatrix = [                                                       // límite horizontal
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1, 2, 2, 3, 4, 1],
        [1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 1, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 1],
        [1, 4, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1, 2, 2, 2, 4, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
    this.numColumns = 25;
    this.numRows = 17;
    //Parámetros que determinan anchura/altura del rectángulo basico para dibujar el mapa
    this.basicWidth = gameArea.canvas.width/this.numColumns;
    this.basicHeight = gameArea.canvas.height/this.numRows;
    this.basicColor = " #e4c32d" //Color pared
    this.wall = new Image();
    this.wall.src = wallSrc;
    this.coco = new Image();
    this.coco.src = cocoSrc;
    this.cocoStyle = "#d4d9d7";
    this.floor = new Image();
    this.floor.src = floorSrc;
    this.fruit = new Image();
    this.fruit.src = fruitSrc;
    this.updateMap = function(c) {
        c.drawImage(this.floor, j*Math.floor(this.basicWidth), i*Math.floor(this.basicHeight), this.basicWidth, this.basicHeight);
        for(var i=0; i<this.numRows; i++){
            for(var j=0; j<this.numColumns; j++){
                //Aquí tamaño objetos
                if(this.gameAreaMatrix[i][j]==1){ //Pared
                    c.fillStyle = this.basicColor;
                    c.drawImage(this.wall, j*Math.floor(this.basicWidth), i*Math.floor(this.basicHeight), this.basicWidth, this.basicHeight);
                    //Mete el color, si quiero textura quitar
                    c.fillRect(j*Math.floor(this.basicWidth), i*Math.floor(this.basicHeight), this.basicWidth, this.basicHeight);
                }else if (this.gameAreaMatrix[i][j]==2) {//punto pequeño
                    c.fillStyle =this.cocoStyle;
                    c.fillRect(j*Math.floor(this.basicWidth)+8, i*Math.floor(this.basicHeight)+8, this.basicWidth/4, this.basicHeight/4);
                }else if (this.gameAreaMatrix[i][j]==3) {//punto grande
                    c.fillStyle =this.cocoStyle;
                    c.fillRect(j*Math.floor(this.basicWidth)+4, i*Math.floor(this.basicHeight)+4, this.basicWidth/2, this.basicHeight/2);
                }else if (this.gameAreaMatrix[i][j]==4) {//fruta, sitio y tamaño
                    c.fillStyle = this.cocoStyle;
                    c.drawImage(this.fruit, j*Math.floor(this.basicWidth)-0, i*Math.floor(this.basicHeight)-0, 30, 30);
                }
            }
        }
    }
}

function Sound(src) {
    this.Sound = document.createElement("audio");
    this.Sound.src = src;
    this.Sound.setAttribute("preload", "auto");
    this.Sound.setAttribute("controls", "none");
    this.Sound.style.display = "none";
    document.body.appendChild(this.Sound);
    this.play = function(){
        this.Sound.play();
    }
    this.stop = function(){
        this.Sound.pause();
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function(c) {
        c.fillStyle = color;
        c.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

//Score text
function TextComponent(size, font, x , y, color) {
    this.size = size; // en pixeles
    this.font = font;
    this.x = x;
    this.y = y;
    this.text = "";
    this.update = function() {
        gameArea.c.font = this.size + " " + this.font;
        gameArea.c.fillStyle = color;
        gameArea.c.fillText(this.text, this.x, this.y);
    }
}

function DynamicElemt(width, height, x , y) {
    this.gameElement = new Image();
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.acceleration = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.maxSpeed = 6;
    this.minSpeed = -6;
    this.angle = 0;
    this.viewAngle = 0;
    this.vectorX = Math.cos(this.angle);
    this.vectorY = Math.sin(-this.angle);
    this.update = function() {
        gameArea.c.save();
        gameArea.c.translate(this.x, this.y);
        gameArea.c.rotate(this.viewAngle);
        gameArea.c.drawImage(this.gameElement, this.width / -2, this.height / -2, this.width, this.height);
        gameArea.c.restore();
    }
    this.move = function() {
        this.x += this.speed * this.vectorX;
        this.y += this.speed * this.vectorY;
    }
    this.rote = function() {
        this.vectorX = Math.cos(this.angle);
        this.vectorY = Math.sin(-this.angle); //seno es impar
    }
}

function startGame(){
    gameArea.stop();
}

//Contexto, control movimiento player, y creacion de objeto para mapa
var gameArea = {
    canvas:  document.getElementById("game"),
    start: function() {
        this.c = this.canvas.getContext('2d');
        //Funcion para escuchar teclado
        window.addEventListener("keydown", function(event){keyHandler(event, pacman)}, false);
        var gameMatrix = new GameMapConstructor("wall_canvas2.jpg", "cocoNeon.png", "fondo_canvas.jpg", "fresa.png");
        //Pacman a partir de Dynamic element y +
        pacman = new DynamicElemt(27, 27, 100, 100); //Tamaño y posicion
        pacman.gameElement.src = "amarilloA.png"
        pacman.fruit = false; //control poder de fruta
        //Tiempo que tarda en abrir y cerrar boca
        pacman.closeMouth = function() {
            pacman.gameElement.src = "amarilloC.png"
            if (change!="") {
              pacman.gameElement.src= change + "C.png";
            }
            setTimeout(pacman.openMouth, 300)
        }
        pacman.openMouth = function() {
            pacman.gameElement.src = "amarilloA.png"
            if (change!="") {
              pacman.gameElement.src= change + "A.png";
            }
            setTimeout(pacman.closeMouth, 300)
        }
        pacman.closeMouth();

        //Parte dedicada a la creación de los fantasmas a partir de DynamicElemt
        //Tomamos posición central mapa
        var mapWidthCenter = gameMatrix.numColumns*gameMatrix.basicWidth/2;
        var mapHeightCenter = gameMatrix.numRows*gameMatrix.basicHeight/2;
        blueGhost = new DynamicElemt(32, 32, 250, 328);
        redGhost = new DynamicElemt(32, 32, 100, 200);
        pinkGhost = new DynamicElemt(32, 32, 150, 154);
        clydeGhost = new DynamicElemt(32, 32, 500, 50);
        blueGhost.gameElement.src = "blueGhost.png";
        redGhost.angle = Math.PI/2; //Math.PI/2 para movimiento hacia arriba y abajo
        redGhost.gameElement.src = "redGhost.png";
        pinkGhost.gameElement.src = "pinkGhost.png";
        clydeGhost.angle = Math.PI/2;
        clydeGhost.gameElement.src = "clydeGhost.png";
        ghostsArray = [blueGhost, redGhost, pinkGhost, clydeGhost];
        //Inicializo fantasmas
        ghostsArray.forEach(function(element){
            element.speed = 1.5;
            element.weak = false; //control de debilidad
            element.alive = true; // comecocos vivo
        });

        var score = new TextComponent("30px", "scoreLetter", 0, 27, "black");
        pacman.scoreCount = 0; //añadimos scoreCount a pacman, facilidad posterior en choques
        score.text = "SCORE: " + pacman.scoreCount;

        soundtrack = new Audio("pacManStart.mp3");
        soundtrack.loop = true;
        soundtrack.play();
        this.updateGameInterval = setInterval(function(){if (!pause){updateGame(gameMatrix, pacman, ghostsArray, score)}}, 20);
        countingGame = setInterval(function(){if (!pause){start_counting()}}, 1000);

    },
    clear: function() {
        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.updateGameInterval);
        clearInterval(countingGame);
        totaltime = 0;
        seconds = 0;
        hours = 0;
        minutes = 0;
    }
}

function buttonStart(){
  points();
  gameArea.stop();
  soundtrack.volume = 0;
  gameArea.start();
}

function buttonPause(){
    if (!pause){
      pause = true;
      soundtrack.pause();
    }else{
      pause = false;
      soundtrack.play();
    }
}

//Fantasmas normal
function ghostInit(fant){
  setTimeout(function okey(){
      blueGhost.gameElement.src = "blueGhost.png";
      redGhost.gameElement.src = "redGhost.png";
      pinkGhost.gameElement.src = "pinkGhost.png";
      clydeGhost.gameElement.src = "clydeGhost.png";
      fant[0].weak = false;
      fant[1].weak = false;
      fant[2].weak = false;
      fant[3].weak = false;
      pacman.fruit = false;
  },10000);
}

//Mover con teclas
function keyHandler(event, pacman) {
    switch(event.key) {
        //Selecionar otras teclas: case "Escape":, case "a":,
        case "ArrowUp":
            pacman.speed = 2;
            pacman.angle = Math.PI/2;
            pacman.viewAngle = -Math.PI/2;
            pacman.rote();
            break;
        case "ArrowDown":
            pacman.speed = 2;
            pacman.angle = -Math.PI/2;
            pacman.viewAngle = Math.PI/2;
            pacman.rote()
            break;
        case "ArrowLeft":
            pacman.speed = 2;
            pacman.angle = Math.PI;
            pacman.viewAngle = Math.PI;
            pacman.rote()
            break;
        case "ArrowRight":
            pacman.speed = 2;
            pacman.angle = 0;
            pacman.viewAngle = 0;
            pacman.rote()
            break;
        case "c":
            localStorage.clear();
            sessionStorage.clear();
        case " ":
            break;
        default:
            console.log("Key not handled");
    }
}

function crash(whoCrash, theCrashed) {
    var myleft = whoCrash.x;
    var myright = whoCrash.x + (whoCrash.width/1.35);
    var mytop = whoCrash.y;
    var mybottom = whoCrash.y + (whoCrash.height/1.35);
    var otherleft = theCrashed.x;
    var otherright = theCrashed.x + (theCrashed.width/1.35);
    var othertop = theCrashed.y;
    var otherbottom = theCrashed.y + (theCrashed.height/1.35);
    var crash = true;
    if ((mybottom < othertop) ||
           (mytop > otherbottom) ||
           (myright < otherleft) ||
           (myleft > otherright)) {
       crash = false;
    }
    return crash;
}

//Mira si pacman colisiona y toma medidas control. Devuelve boolean si choque para extras.
function crashWithMapControl(mapa, obj, isPlayer) {
    var crashed = false;
    var mapValue = mapa.gameAreaMatrix[Math.floor((obj.y+5)/mapa.basicHeight)][Math.floor((obj.x)/mapa.basicWidth)];
    if(mapValue == 1){
        obj.speed *= -1;
        obj.move();
        obj.speed *= -1;
        crashed = true;
    }else if((mapValue == 2 || mapValue == 3) && isPlayer) {
        mapa.gameAreaMatrix[Math.floor((obj.y+5)/mapa.basicHeight)][Math.floor((obj.x)/mapa.basicWidth)] = 0;
        obj.scoreCount += 10;
        if (mapValue == 3){
            obj.scoreCount += 20;
            var points = new TextComponent("45px", "italic", obj.x, obj.y, "yellow");
            points.text = "+30";
            for (var i=0; i<1550; i++){
                points.update();
            }
        }
    }
    if(mapValue == 4 && isPlayer) {
        var posh = [Math.floor((obj.y+5)/mapa.basicHeight)];
        var posv =[Math.floor((obj.x)/mapa.basicWidth)];
        //Sigue pacman
        mapa.gameAreaMatrix[Math.floor((obj.y+5)/mapa.basicHeight)][Math.floor((obj.x)/mapa.basicWidth)] = 0;
        obj.fruit = true;
        var p = document.createElement("p"); //css
        var message = document.createTextNode(" ¡HUNT THE GHOSTS! ");

        var soundfruit = new Audio("soundfruit.mp3");
        soundfruit.play();
        p.style.color = " #eac82e";
        p.style.font = "italic bold 20px arial,serif";
        //Quita menaje fantasmas vuelven color
        setTimeout(function okey(){
          p.removeChild(message);
        },10000);

        p.appendChild(message);
        p.setAttribute('id', 'message')
        document.body.appendChild(p);
        console.log(p.childNodes[0])
        p.childNodes[0].value = message;

        //Vuelve fruta misma posicion que antes pasado x segudos
        var num = Math.floor(Math.random() * 10);
        setTimeout(function newfruit(){
          mapa.gameAreaMatrix[posh][posv] = 4;
        },num*1000);
    }
    return crashed;
}

//Contador para mi pagina
function start_counting(){
    totaltime = seconds + 60*minutes + 3600*hours;
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

function updateGame(mapa, pacman, ghostsArray, score, mapValue) {
    var win = document.createElement("img");
    //Actualizamos fondo, mapa y score
    var fondo = new component(gameArea.canvas.width, gameArea.canvas.height, "black", 0,0);
    fondo.update(gameArea.c);
    gameArea.c.drawImage(mapa.floor, 0,0, gameArea.canvas.width, gameArea.canvas.height);
    mapa.updateMap(gameArea.c);
    score.text = "SCORE: " + pacman.scoreCount;
    score.update()

    //movimiento y dibujado pacman
    pacman.move();
    crashWithMapControl(mapa, pacman, true)
    pacman.update();
    //control y dibujado de los fantasmas
    ghostsArray.forEach(function(element){
        element.move()
        if (crashWithMapControl(mapa, element, false)) {
            var direction = Math.floor(Math.random() * 4)
            element.angle += Math.PI/2 * direction;
            element.rote();
        }
        //Come fruta
        if (pacman.fruit && !element.weak){
            element.angle += Math.PI; //fantasmas cambio de sentido
            element.rote();
            element.gameElement.src = "oldGhost.gif";
            element.weak = true;
            console.log("Cambio fantasmas normal")
            ghostInit(ghostsArray);
        }
        if (pacman.fruit && element.weak && mapValue == 4){
          console.log("Doblete")
          ghostInit(ghostsArray);
        }
        //Si chocan dos elementos
        if (crash(element, pacman)){
            //Si es debil se lo come
            if (element.weak){
                element.alive = false;
            }else if (element.alive){
                gameArea.stop()
                win.src = "lost.gif";
                gif(win);
                win.setAttribute("onclick", "ventana3()");
            }
        }

        //Restricion de tiempo para acabar EN SEGUNDOS (1min y medio)
        //if (gameArea.start) {
            if (totaltime >= maxTime){
              gameArea.stop()
              win.src = "lost.gif";
              gif(win);
              console.log("Haz click")
              win.setAttribute("onclick", "ventana1()");
            }
        //}

        //Fin de juego por puntos
        if (pacman.scoreCount == maxScore) {
        //if (pacman.scoreCount == 20) {
          var extraPoint = maxTime - totaltime;
          pacman.scoreCount += extraPoint;

          gameArea.stop()
          win.src = "winner.gif";
          gif(win);
          win.setAttribute("onclick", "ventana2()");

          var user = prompt("YOU WIN! New Highscore! Write your name", "Your Name");
          if (localStorage.getItem(localStorage.key(0)) < pacman.scoreCount){
            localStorage.setItem(user, pacman.scoreCount);
            document.getElementById("hSession").innerHTML = localStorage.key(0) + "->" + localStorage.getItem(user);
          }

          sessionStorage.setItem(user, pacman.scoreCount);
          document.getElementById("hUser").innerHTML = sessionStorage.key(0) + "->" + sessionStorage.getItem(user);
        }

        if (element.alive){
            element.update();
        }
    });
}
function ventana1(){
  if (window.confirm("Time out, Play again?") == true) {
      location.reload(true);
      //gameArea.start();
  }
}
function ventana2(){
  if (window.confirm("¿Quieres volver a jugar?") == true) {
      location.reload(true);
      //gameArea.start();
  }
}
function ventana3(){
    if (window.confirm("You lost, ¿Quieres volver a jugar?") == true) {
        location.reload(true);
        //gameArea.start();
    }
}

function gif(win){
  win.id = "winner";
  win.width = window.innerWidth;
  win.height = window.innerHeight;
  document.getElementById("slider").appendChild(win);
}

function points(){
  if (typeof(Storage) !== "undefined"){
    if (sessionStorage.key(0)!= null ){
      document.getElementById("hSession").innerHTML = sessionStorage.key(0) + ":  " + sessionStorage.getItem(sessionStorage.key(0));
    }else{
      document.getElementById("hSession").innerHTML = "No data";
    }
    if (localStorage.key(0)!= null ){
      document.getElementById("hUser").innerHTML = localStorage.key(0) + ":  " + localStorage.getItem(localStorage.key(0));
    }else{
      document.getElementById("hUser").innerHTML = "No data";
    }
  }else{
    document.getElementById("highscore_total").innerHTML = "Tu navegador no lo soporta";
  }
}

//Selector color pacman
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {

    var anterior = document.getElementById("amarillo").src;
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    change = ev.target.appendChild(document.getElementById(data)).src;
    document.getElementById("amarillo").src = change;
    change = change.split("/");
  	change = change[change.length-1].split(".")[0].split("A")[0];
    console.log(change);
    document.getElementById(data).src = anterior;

    var input = document.createElement("img");
    input.setAttribute("id", data);
    input.setAttribute("draggable", "true");
    input.setAttribute("ondragstart", "drag(event)");
    input.setAttribute("src", anterior);
    input.setAttribute("width", "50px");
    input.setAttribute("height", "40px");
    $(".change").appendChild(input);
    function $ (selector){
      return document.querySelector(selector);
    }
}
