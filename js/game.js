class Game {
    constructor(){
        this.bee = new Bee();
        this.webs = [];
        this.flowers = [];
        this.fans = [];
        this.evilWebIx = -1;
        this.intervalIdBee = 0;
        this.intervalIdWebs = 0;
        this.intervalIdFlowers = 0;
        this.intervalIdFans = 0;
        this.intervalIdInfo = 0;
        this.elapsedTime = 0;
        this.bgPercent = 100;
        this.rotation = 0;
        this.stopWatch = 0;
    }
    start(){   // Starts the intervals which call renderAll() and create random obstacles, also plays background sound
        var newGame = this;
        this.intervalIdBee = setInterval(function(){
            if (newGame.bee.stuck == false) {
                if (newGame.evilWebIx > -1) {
                    newGame.webs.splice(newGame.evilWebIx,1);
                    newGame.evilWebIx = -1;
                }
                newGame.stopWatch++;
                newGame.renderAll();
            } else if (newGame.bee.life > 0) { 
                newGame.bee.getStuck();
            } else {
                newGame.stop();
            }
        },80);

        this.intervalIdWebs = setInterval(function(){
            let randNum = Math.random()*100;
            if (randNum < 15) {
                randNum += 15;
            } else if (randNum > 80) {
                randNum -= 20;
            }
            let randChance = newGame.giveRandNum(1,10);;
            let rand1 = Math.floor(randNum);
            let rand2 = Math.round(randNum);
            if (newGame.webs.length <= 2) {
                if (randChance > 6){
                    let width = newGame.giveRandNum(10,20);
                    if (rand1 > 85-width){
                            rand1 = 85-width;
                        }
                    if (rand2 == rand1) {
                        
                        newGame.webs.push(new SpiderWeb(rand1,-20,width));
                    } else {
                        newGame.webs.push(new SpiderWeb(rand1,-20,width));
                    } 
                };
            }
            
        },600);

        this.intervalIdFlowers = setInterval(function(){
            let randNum = Math.random()*100;
            if (randNum < 20) {
                randNum += 20;
            } else if (randNum > 80) {
                randNum -= 20;
            }
            let randChance = newGame.giveRandNum(1,9);
            let rand1 = Math.floor(randNum);
            let rand2 = Math.round(randNum);
            if (newGame.flowers.length <= 1) {
                if (randChance > 6){
                    let width = newGame.giveRandNum(10,20);
                    if (rand1 > 85-width){
                        rand1 = 85-width;
                    }
                    if (rand2 == rand1){
                        newGame.flowers.push(new Flowers(rand1,-20,width));
                    }else {
                        newGame.flowers.push(new Flowers(rand1,-20,width));
                    }  
                };
            } 
            
        },650);

        this.intervalIdFans = setInterval(function(){
            let randNum = Math.random()*100;
            if (randNum < 20) {
                randNum += 20;
            } else if (randNum > 80) {
                randNum -= 20;
            }
            let randChance = newGame.giveRandNum(1,8);
            let rand1 = Math.floor(randNum);
            let rand2 = Math.round(randNum);
            if (newGame.fans.length == 0) {
                if (rand1 > 5){
                    let width = 25;
                    if (rand1 > 85-width){
                        rand1 = 85-width;
                    }
                    if (rand2 == rand1) {
                        newGame.fans.push(new Fan(rand1,-20,width));
                    } else {
                        newGame.fans.push(new Fan(rand1,-20,width));
                    }   
                };
            }
            
        },700);

        this.intervalIdInfo = setInterval(function(){
            newGame.elapsedTime++;
            newGame.updateGameInfo(newGame.bee.life,newGame.elapsedTime)
        },1000);

        playEffect($bgSound);
        $bgSound.loop = true;

    }

    renderAll(){  //  Renders everything and handles background loop, collisions, and win/lose conditions

        // Renders the scrolling background
        if (this.bgPercent<= 0) {
            this.bgPercent = 100;
            this.rotation++;
        } else /*if ((this.stopWatch % 3) == 0)*/ {
            this.bgPercent -= 1;
        }
        this.renderBackground(this.bgPercent);
        
        // Renders Webs ----------------------
        let $websDiv = document.querySelector("#web");
        $websDiv.innerHTML = ""
        for (let i=0; i<this.webs.length;i++){
            this.webs[i].renderWeb(); 
            if (this.webs.length > 0) {
                if (this.webs[i].position[1]<(95-this.webs[i].height)){
                    this.webs[i].moveWeb();
                } else {
                    this.webs.splice(i,1);
                };
            };
        };

        // Renders Flowers ---------------------
        let $flowersDiv = document.querySelector("#flower");
        $flowersDiv.innerHTML = ""
        for (let i=0; i<this.flowers.length;i++){
            this.flowers[i].renderFlower();
            if (this.flowers.length > 0) {
                if (this.flowers[i].position[1]<(95-this.flowers[i].height)){
                    this.flowers[i].moveFlower();
                } else {
                    this.flowers.splice(i,1);
                };
            }; 
        };
        

        // Renders Fans ---------------------
        let $fansDiv = document.querySelector("#fan");
        $fansDiv.innerHTML = ""
        for (let i=0; i<this.fans.length;i++){
            this.fans[i].renderFans();
            if (this.fans.length > 0) {
                if (this.fans[i].position[1]<(95-this.fans[i].height)){
                    this.fans[i].moveFans();
                } else {
                    this.fans.splice(i,1);
                };
            };
        }; 

        if (this.collideBee(this.webs) >= 0) {
            this.evilWebIx = this.collideBee(this.webs);
            this.bee.stuck = true;
            this.bee.stuckLevel = 10; 
            playEffect($stuckSound);           
        } else if (this.collideBee(this.flowers) >= 0) {
            this.bee.feed();
            console.log('Bee feed')
        } 
        else if (this.collideBee(this.fans) >= 0) {
            this.bee.life = 0;
            console.log('Bee in the fan')
        }
        if (this.bee.life > 0) {
            if (this.rotation < 5){
                this.bee.renderBee();
            } else {
                this.stop();
                // this.showWinScreen();
            }
            
        } else{
            this.stop();
            // this.showGameOverScreen();
        }
    }

    collideBee(elements){  // Detects collision / returns the index or -1
        let beeNodePosition = [this.bee.position[0]+5,this.bee.position[1]+5];
        let xBee = beeNodePosition[0];
        let yBee = beeNodePosition[1];
        let result = -1;
        for (let i=0;i<elements.length; i++){
            
            if (xBee > elements[i].position[0] && xBee < elements[i].position[0]+(elements[i].width -2) && 
                yBee > elements[i].position[1] && yBee < elements[i].position[1]+(elements[i].height -2) ) {
                    result = i;
            } 
        };
        return result;    
    }

    pushedByWind(){  // Emulates the effect of the air flow on the bee
        let beeNodePosition = [this.bee.position[0]+5,this.bee.position[1]+5];
        let xBee = beeNodePosition[0];
        let yBee = beeNodePosition[1];
        for (let i=0;i<this.fans.length; i++){
            if (xBee < this.fans[i].position[0] &&  
                yBee > this.fans[i].position[1] &&
                yBee > this.fans[i].position[1]-10 ) {
                    return true;
            };
        };  
    }

    slowDown() {  // Slows down the game per user's input

        if (this.webs.length > 0) {
            for (let i=0; i<this.webs.length;i++) {
            
                this.webs[i].speed = "slow";
            }
        }
        if (this.flowers.length > 0) {
            for (let i=0; i<this.flowers.length;i++) {
           
                this.flowers[i].speed = "slow";
            }
        }
        if (this.fans.length > 0) {    
            for (let i=0; i<this.fans.length;i++) {
            
                this.fans[i].speed = "slow";
            }
        }

    }

    accelerate(){  // Accelerates the game per user's input
        
        if (this.webs.length > 0) {
            for (let i=0; i<this.webs.length;i++) {
                this.webs[i].speed = "fast";
            }
        }
        if (this.flowers.length > 0) {
            for (let i=0; i<this.flowers.length;i++) {
                this.flowers[i].speed = "fast";
            }
        }
        if (this.fans.length > 0) {
            for (let i=0; i<this.fans.length;i++) {
                this.fans[i].speed = "fast";
            }
        }

    }

    stop(){  // Stops the game, clears intervals, and calls the function that renders the last screen
        clearInterval(this.intervalIdBee);
        clearInterval(this.intervalIdWebs);
        clearInterval(this.intervalIdFlowers);
        clearInterval(this.intervalIdFans);
        clearInterval(this.intervalIdInfo);
        this.showLastScreen();

    }

    showLastScreen(){ // Detects win/lose situation and calls the related function
        if (this.bee.life <= 0) {
            this.showGameOverScreen();
        } else if (this.rotation >= 5) {
            this.showWinScreen();
        }
        
    }

    showFirstScreen(){  // Clears the intro screen and renders the first(and only!) game screen
        let $section = document.querySelector("section");
        $section.style.backgroundImage = "url('../images/background.png')";
        $section.style.backgroundOrigin = "border-box";
        $section.style.backgroundPositionY = "100%,0px";
        $section.style.backgroundSize = "cover";
        let $buttonDiv = $section.querySelector("#btn");
        $section.removeChild($buttonDiv);
        let $intro = document.querySelector("#intro");
        $section.removeChild($intro);
        let $beginMessage = document.createElement("h1");
        $beginMessage.style.color = "black";
        $beginMessage.style.fontSize = "3em";
        $beginMessage.style.fontWeight = "800";
        $beginMessage.style.position = "fixed";
        $beginMessage.style.top = "30vh";
        $beginMessage.style.left = "32vw";
        $beginMessage.style.padding = "30px";
        $beginMessage.style.backgroundColor = "rgba(201, 142, 65, 0.75)";
        $beginMessage.style.borderRadius = "5px";
        $beginMessage.innerHTML = "press Enter to start";
        $section.appendChild($beginMessage);
        $introSound.pause();
        
    }

    updateGameInfo(life,time){ // Updates the information on sidebars (life and time)
        let $lifePanel = document.querySelector("#life span");
        let $minPanel = document.querySelector("#minutes");
        let $secPanel = document.querySelector("#seconds");
        $minPanel.innerHTML = twoDigitsNumber(getMinutes(time));
        $secPanel.innerHTML =twoDigitsNumber(getSeconds(time));
        $lifePanel.innerHTML = life;
    }

    renderBackground(bgPercent){ // renders game's scrolling background

        let $section = document.querySelector("section");
        $section.style.backgroundPositionY =  `${bgPercent}%,0px`;
    }

    showGameOverScreen (){ // Renders the Game Over screen/sound
        this.removeBee();
        let $modalParent = document.querySelector("#gameOverModal");
        $modalParent.setAttribute("class","modal visible");
        pauseEffect($bgSound);
        playEffect($loseSound);
    }

    showWinScreen() {  // Renders the Win screen/sound
        this.removeBee();
        let $modalParent = document.querySelector("#winModal");
        $modalParent.setAttribute("class","modal visible");
        pauseEffect($bgSound);
        playEffect($winSound);
    }

    removeBee () { // Removes the bee after it's dead
        let $section = document.querySelector("section");
        let $deadBee = document.querySelector("#bee");
        $section.removeChild($deadBee);
    }
    
    giveRandNum(min,max) { // take a minimum and a maximum and returns a random number in between
        let rand = Math.floor(Math.random()*max);
        if (rand < min) {
            rand += min;
        }
        return rand;
    }
}

