

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


