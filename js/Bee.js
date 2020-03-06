class Bee {
    constructor (){
        this.position = [50,75];
        this.life = 100;
        this.stuck = false;
        this.stuckLevel = 0 ;
        this.pushed = false;
        this.feeding = false;
        this.stuckedIn = 0;
    }
    
    renderBee(){ // Renders bee and handles its image change while being stuck
        let bumbleBee = this;
        let $bee = document.querySelector("#bee-img");
        if (bumbleBee.stuck) {
            $bee.setAttribute("src","./images/bee3.gif");
            console.log(`Zeebee is stuck! Stuck level = ${this.stuckLevel}`)
        } else {
            $bee.setAttribute("src","https://media.giphy.com/media/LSET97hcXZK9i/source.gif");
        }
        
        if (bumbleBee.life>0){
            let xvw = `${this.position[0]}vw`;
            let yvh = `${this.position[1]}vh`;
            $bee.style.top = yvh; 
            $bee.style.left = xvw;
            // console.log(xvw,yvh);
        }

    }

    resist(){  // Emulates the bee's resistance against the air flow of the fans
        if (this.stuckLevel > 0) {
            this.stuckLevel -= 2;
            playEffect("tearing-sound");
            // console.log(`Stuck Level = ${this.stuckLevel}`)
        } else {
            this.breakFree();
        }  
    }
    
    breakFree(){  // Sets the stuck property and plays the relevant sound
        this.stuck = false; 
        playEffect($bgSound);
        // console.log("Zeebee is free!")
    }

    getStuck(){  // Decreases life and plays relevant sound when the bee is stuck in a web
            this.life -= 1;
            pauseEffect($bgSound);
        }

    keepRight(){  // Applies user's input (right arrow key)
        if (this.position[0] < 72){
            this.position[0] += 3;
        }
    }

    keepLeft(){  // Applies user's input (left arrow key)
        if (this.position[0] > 15){
            this.position[0] -= 3;
        }  
    }

    feed(){  //  Increases life and sets the feeding property
        this.feeding = true;
        this.life += 3;
    }

    getCrushed(){ // Sets life to zero
        this.life = 0;
    }

    getWounded(){  // Decreases life and plays relevant sound when the bee hits the wall
        this.life -= 20;

    }

    
}