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
            let rand = Math.floor(Math.random()*10);
            if (rand > 4){
                if (rand > 7) {
                    newGame.webs.push(new SpiderWeb(1,1));
                } else {
                    newGame.webs.push(new SpiderWeb(60,1));
                } 
            };
        },300);

        this.intervalIdFlowers = setInterval(function(){
            let rand = Math.floor(Math.random()*10);
            if (rand > 6){
                if (rand > 8){
                    newGame.flowers.push(new Flowers(rand*10,1));
                }else {
                    newGame.flowers.push(new Flowers(rand*10,1));
                }  
            };
        },350);

        this.intervalIdFans = setInterval(function(){
            let rand = Math.floor(Math.random()*10);
            if (rand > 7){
                if (rand >= 8) {
                    newGame.fans.push(new Fan(1,1));
                } else {
                    newGame.fans.push(new Fan(90,1));
                }   
            };
        },400);

    }

    renderAll(){
        this.bee.renderBee();

        let $websDiv = document.querySelector("#web");
        $websDiv.innerHTML = ""
        for (let i=0; i<this.webs.length;i++){
            this.webs[i].renderWeb();  // check the scope of this!
            if (this.webs.length > 0) {
                if (this.webs[i].position[1]<95){
                    this.webs[i].moveWeb("normal");
                } else {
                    this.webs.splice(i,1);
                }
            } 
        }

        let $flowersDiv = document.querySelector("#flower");
        $flowersDiv.innerHTML = ""
        for (let i=0; i<this.flowers.length;i++){
            this.flowers[i].renderFlower();
            if (this.flowers.length > 0) {
                if (this.flowers[i].position[1]<95){
                    this.flowers.moveFlower("normal");
                } else {
                    this.flowers.splice(i,1);
                }
            } 
        }
        
        let $fansDiv = document.querySelector("#fan");
        $fansDiv.innerHTML = ""
        for (let i=0; i<this.fans.length;i++){
            this.fans[i].renderFans();
            if (this.fans.length > 0) {
                if (this.fans[i].position[1]<95){
                    this.fans.moveFans("normal");
                } else {
                    this.fans.splice(i,1);
                }
            }  
        } 

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

    accelerate(){

        for (let i=0; i<this.webs.length;i++) {
            if (this.webs.length > 0) {
                web.moveWeb("fast");
            }
        }

        for (let i=0; i<this.flowers.length;i++) {
            if (this.flowers.length > 0) {
                flower.moveFlower("fast");
            }
        }

        for (let i=0; i<this.fans.length;i++) {
            if (this.fans.length > 0) {
                fan.moveAC("fast");
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
        let $beginMessage = document.createElement("h1");
        $beginMessage.style.color = "green";
        $beginMessage.style.position = "fixed";
        $beginMessage.style.top = "30vh";
        $beginMessage.style.left = "50vw";
        $beginMessage.innerHTML = "press Enter to start";
        $section.appendChild($beginMessage);
        
    }

}