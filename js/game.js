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
    }
    start(){
        var newGame = this;
        this.intervalIdBee = setInterval(function(){
            if (newGame.bee.stuck == false) {
                if (newGame.evilWebIx > -1) {
                    newGame.webs.splice(newGame.evilWebIx,1);
                    newGame.evilWebIx = -1;
                }
                newGame.renderAll();
            } else {
                newGame.bee.getStuck();
            }
        },200);

        this.intervalIdWebs = setInterval(function(){
            let randNum = Math.random()*100;
            if (randNum < 20) {
                randNum += 20;
            } else if (randNum > 80) {
                randNum -= 20;
            }
            let randChance = newGame.giveRandNum(1,10);;
            let rand1 = Math.floor(randNum);
            let rand2 = Math.round(randNum);
            if (newGame.flowers.length <= 2) {
                if (randChance > 7){
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
            let randNum = Math.random()*8;
            if (randNum < 2) {
                randNum += 2;
            } 
            let randChance = newGame.giveRandNum(1,8);
            let rand1 = Math.floor(randNum);
            let rand2 = Math.round(randNum);
            if (newGame.fans.length == 0) {
                if (rand1 > 6){
                    let width = 15;
                    if (rand1 > 85-width){
                        rand1 = 85-width;
                    }
                    if (rand2 == rand1) {
                        newGame.fans.push(new Fan(40,-20,15));
                    } else {
                        newGame.fans.push(new Fan(70,-20,15));
                    }   
                };
            }
            
        },700);

    }

    renderAll(){
        
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
        } else if (this.collideBee(this.flowers) >= 0) {
            this.bee.feed();
            console.log('Bee feed')
        } 
        else if (this.collideBee(this.fans) >= 0) {
            this.bee.life = 0;
            console.log('Bee in the fan')
        }
        if (this.bee.life > 0) {
            this.bee.renderBee();
        } else {
            this.stop();
        }
    }

    collideBee(elements){
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

    pushedByWind(){
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

    slowDown() {

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

    accelerate(){
        
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

    stop(){
        clearInterval(this.intervalIdBee);
        clearInterval(this.intervalIdWebs);
        clearInterval(this.intervalIdFlowers);
        clearInterval(this.intervalIdFans);
        this.showLastScreen();

    }

    showLastScreen(){

    }

    showFirstScreen(){
        let $section = document.querySelector("section");
        $section.style.backgroundImage = "none";
        $section.style.backgroundColor = "burlywood";
        let $buttonDiv = $section.querySelector("#btn");
        $section.removeChild($buttonDiv);
        let $intro = document.querySelector("#intro");
        $section.removeChild($intro);
        let $beginMessage = document.createElement("h1");
        $beginMessage.style.color = "green";
        $beginMessage.style.position = "fixed";
        $beginMessage.style.top = "30vh";
        $beginMessage.style.left = "40vw";
        $beginMessage.innerHTML = "press Enter to start";
        $section.appendChild($beginMessage);
        
    }

    giveRandNum(min,max) {
        let rand = Math.floor(Math.random()*max);
        if (rand < min) {
            rand += min;
        }
        return rand;
    }

}