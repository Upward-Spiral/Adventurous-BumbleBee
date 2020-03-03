class Game {
    constructor(){
        this.bee = new Bee();
        this.webs = [];
        this.flowers = [];
        this.fans = [];
        this.intervalIdBee = 0;
        this.intervalIdWebs = 0;
        this.intervalIdFlowers = 0;
        this.intervalIdFans = 0;
    }
    start(){
        var newGame = this;
        this.intervalIdBee = setInterval(function(){
            newGame.renderAll();
        },200);

        this.intervalIdWebs = setInterval(function(){
            let randNum = Math.random()*9;
            if (randNum <2) {
                randNum += 2;
            } 
            let randChance = Math.floor(Math.random()*8);
            let rand1 = Math.floor(randNum);
            let rand2 = Math.round(randNum);
            if (newGame.flowers.length <= 1) {
                if (randChance > 5){
                    if (rand2 == rand1) {
                        newGame.webs.push(new SpiderWeb(rand1*10,-20));
                    } else {
                        newGame.webs.push(new SpiderWeb(rand1*10,-20));
                    } 
                };
            }
            
        },600);

        this.intervalIdFlowers = setInterval(function(){
            let randNum = Math.random()*8;
            if (randNum < 2) {
                randNum += 2;
            } 
            let randChance = Math.floor(Math.random()*8);
            let rand1 = Math.floor(randNum);
            let rand2 = Math.round(randNum);
            if (newGame.flowers.length <= 1) {
                if (randChance > 6){
                    if (rand2 == rand1){
                        newGame.flowers.push(new Flowers(rand1*10,-20));
                    }else {
                        newGame.flowers.push(new Flowers(rand1*10,-20));
                    }  
                };
            } 
            
        },650);

        this.intervalIdFans = setInterval(function(){
            let randNum = Math.random()*8;
            if (randNum < 2) {
                randNum += 2;
            } 
            let randChance = Math.floor(Math.random()*8);
            let rand1 = Math.floor(randNum);
            let rand2 = Math.round(randNum);
            if (newGame.fans.length == 0) {
                if (rand1 > 6){
                    if (rand2 == rand1) {
                        newGame.fans.push(new Fan(40,-20));
                    } else {
                        newGame.fans.push(new Fan(70,-20));
                    }   
                };
            }
            
        },700);

    }

    renderAll(){
        
        if (this.collideBee(this.webs)) {
            this.bee.stuck = true;
        } else if (this.collideBee(this.flowers)) {
            this.bee.feeding = true;
        } else if (this.collideBee(this.fans)) {
            this.bee.life = 0;
        }
        this.bee.renderBee();

        let $websDiv = document.querySelector("#web");
        $websDiv.innerHTML = ""
        for (let i=0; i<this.webs.length;i++){
            this.webs[i].renderWeb();  // check the scope of this!
            if (this.webs.length > 0) {
                if (this.webs[i].position[1]<98){
                    this.webs[i].moveWeb();
                } else {
                    this.webs.splice(i,1);
                };
            };
        };

        let $flowersDiv = document.querySelector("#flower");
        $flowersDiv.innerHTML = ""
        for (let i=0; i<this.flowers.length;i++){
            this.flowers[i].renderFlower();
            if (this.flowers.length > 0) {
                if (this.flowers[i].position[1]<98){
                    this.flowers[i].moveFlower();
                } else {
                    this.flowers.splice(i,1);
                };
            }; 
        };
        
        let $fansDiv = document.querySelector("#fan");
        $fansDiv.innerHTML = ""
        for (let i=0; i<this.fans.length;i++){
            this.fans[i].renderFans();
            if (this.fans.length > 0) {
                if (this.fans[i].position[1]<98){
                    this.fans[i].moveFans();
                } else {
                    this.fans.splice(i,1);
                };
            };
        }; 

    }

    collideBee (elements){
        let beeNodePosition = [this.bee.position[0]+5,this.bee.position[1]+5];
        let xBee = beeNodePosition[0];
        let yBee = beeNodePosition[1];
        for (let i=0;i<elements.length; i++){
            if (xBee > elements[i].position[0] && 
                xBee < elements[i].position[0]+10 && 
                yBee < elements[i].position[1] &&
                yBee > elements[i].position[1]-10 ) {
                    return true;
            };
        };  
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

        for (let i=0; i<this.webs.length;i++) {
            if (this.webs.length > 0) {
                web.moveWeb("slow");
            }
        }

        for (let i=0; i<this.flowers.length;i++) {
            if (this.flowers.length > 0) {
                flower.moveFlower("slow");
            }
        }
            
        for (let i=0; i<this.fans.length;i++) {
            if (this.fans.length > 0) {
                fan.moveFans("slow");
            }
        }

    }

    // accelerate(){

    //     for (let i=0; i<this.webs.length;i++) {
    //         if (this.webs.length > 0) {
    //             web.moveWeb("fast");
    //         }
    //     }

    //     for (let i=0; i<this.flowers.length;i++) {
    //         if (this.flowers.length > 0) {
    //             flower.moveFlower("fast");
    //         }
    //     }

    //     for (let i=0; i<this.fans.length;i++) {
    //         if (this.fans.length > 0) {
    //             fan.moveAC("fast");
    //         }
    //     }

    // }

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

}