

let game = new Game();

function getMinutes(currentTime) {
    let mins = Math.floor(currentTime / 60);
    return mins;
};
function getSeconds(currentTime) {
    let secs = currentTime % 60;
    return secs;
}
function twoDigitsNumber(timeElement) {
    let twoDgtTime = "";
    if (timeElement >= 100) {
        timeElement = timeElement % 100;
    }
    if (timeElement<10) {
      twoDgtTime = "0"+timeElement.toString();
    } else {
      twoDgtTime = timeElement.toString();
    };
    
    return twoDgtTime;
}

var $bgSound = document.getElementById("background-music");
var $winSound = document.getElementById("win-sound");
var $loseSound = document.getElementById("lose-music");
var $introSound = document.getElementById("intro-music");
function playEffect($effectNode){
  $effectNode.play();
}

function pauseEffect($effectNode){
  $effectNode.pause();
}



