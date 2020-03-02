document.addEventListener("keydown", function(event){
    switch(event.code){
        case "ArrowRight":
            game.bee.keepRight();
            console.log("keeping right!");
            break;
        case "ArrowLeft":
            game.bee.keepLeft(); 
            console.log("keeping left!"); 
            break;
        case "ArrowUp":
            game.accelerate();
            console.log("Moving fast!");
            break;
        case "ArrowDown":
            game.slowDown();
            console.log("Slowing down!");
            break;
        case "Space":
            game.bee.resist();
            console.log("Resisting the wind!");
            break;
        case "Enter":
            game.start();
            console.log("Game started!");
            break;
        default:
            console.log("unknown controls");   
    }
})

let $newGameButton = document.querySelector("#newGame-btn");
$newGameButton.addEventListener("click",function(event){
    game.showFirstScreen();
    console.log("Game started!");

});
