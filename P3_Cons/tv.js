
var canvas, c, video;
var timeBar,volumbar;
var cameras = [];
var second, minutes;

function init() {
  canvas = document.getElementById("canvas");
  c = canvas.getContext("2d");
  initCnt();
  c.drawImage(video, 0, 0, canvas.width, canvas.height);
  video.addEventListener('play', render);
  timeBar.addEventListener('change', timeBar);
  volumbar.addEventListener('change', volumeCnt);
}

function initCnt() {
  timeBar = document.getElementById("time-bar");
  timeBar.value = 0;
  volumbar = document.getElementById("volume-bar");
  volumbar.value = 1;
  camera();
  chooseCam(1);
}

function camera() {
  var c1 = document.getElementById("aux1");
  var c2 = document.getElementById("aux2");
  var c3 = document.getElementById("aux3");
  var c4 = document.getElementById("aux4");

  cameras.push(c1,c2,c3,c4);
}

function chooseCam(x) {
  switch (x) {
    case 1:
      Select(1);
      break;
    case 2:
      Select(2);
      break;
    case 3:
      Select(3);
      break;
    case 4:
      Select(4);
      break;
    default:
      Select(1);
  }

  function Select(y) {
    if (video != undefined){
      video.muted = true;
    }

    video = document.getElementById("aux" + y);
    video.muted = false;
    //Borde camara selecionada
    for (var i = 1; i <= cameras.length; i++) {
      if (i == y) {
          document.getElementById("aux" + i).style.border = "thick solid  #d6d483 ";
      }else {
        document.getElementById("aux" + i).style.border = "none";
      }
    }
  }
}

function render() {
  c.drawImage(video, 0, 0, canvas.width, canvas.height);
  refreshBar();
  clock();
  requestAnimationFrame(render);
}

function Play() {
  if (video.paused || video.ended) {
    document.getElementById("play-pause").innerHTML = "u";
    for (var i = 0; i < cameras.length; i++) {
      cameras[i].play();
    }
  }else {
    document.getElementById("play-pause").innerHTML = "P";
    for (var i = 0; i < cameras.length; i++) {
      cameras[i].pause();
    }
  }
}

function timeBar() {
  //Inicializa barra con video
  var time = timeBar.value * (video.duration/timeBar.max)
  for (var i = 0; i < cameras.length; i++) {
    cameras[i].currentTime = time;
  }
}

function refreshBar() {
  var value = video.currentTime * (timeBar.max/video.duration)
  timeBar.value = value;
}

function volumeCnt() {
  video.volume = volumbar.value;
}

function Mute() {
  if (video.muted) {
    video.muted = false;
    document.getElementById("mute").innerHTML = "Q"
  }else {
    video.muted = true;
    document.getElementById("mute").innerHTML = "g";
  }
}

function clock() {
  var second;
  var minutes;
  second = Math.round(video.currentTime);
  if (second >= 10) {
      document.getElementById("counter").innerHTML = "00:" + second;
  }else {
      document.getElementById("counter").innerHTML = "00:0" + second;
  }
  if (second >= 60) {
    second = (Math.round(video.currentTime)) - 60;
    if (second >= 10) {
        document.getElementById("counter").innerHTML = "01:" + second;
    }else {
        document.getElementById("counter").innerHTML = "01:0" + second;
    }
  }
}
