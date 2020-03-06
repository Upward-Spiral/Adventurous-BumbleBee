document.addEventListener("keydown", function(event){  // Sets event listener for all the navigation buttons
    switch(event.code){
        case "ArrowRight":
            game.bee.keepRight();
            break;
        case "ArrowLeft":
            game.bee.keepLeft();  
            break;
        case "ArrowUp":
            game.accelerate();
            break;
        case "ArrowDown":
            game.slowDown();
            break;
        case "Space":
            game.bee.resist();
            break;
        case "Enter":
            game.start();
            let $section = document.querySelector("section");
            let $beginMessage = $section.querySelector("h1");
            $section.removeChild($beginMessage);
            console.log("Game started!");
            break;
        default:
            // console.log("unknown controls");   
    }
})

let $newGameButton = document.querySelector("#newGame-btn");
$newGameButton.addEventListener("click",function(event){      // Sets the listener on the new game button
    game.showFirstScreen();
    // console.log("Whenever you are ready!");

});

let $startOverButtons = document.querySelectorAll(".start-over");
for (let i = 0; i < $startOverButtons.length; i++){            //  Sets the listener on start over buttons
    $startOverButtons[i].addEventListener("click",function(event){
        let $parentModal = event.target.closest(".modal");
        $parentModal.setAttribute("class","modal invisible");
        location.reload();
        // console.log("Whenever you are ready!");

    });
}



