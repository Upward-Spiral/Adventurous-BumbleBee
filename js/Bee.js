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
    
    renderBee(){
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


    resist(){
        if (this.stuckLevel > 0) {
            this.stuckLevel -= 2;
            console.log(`Stuck Level = ${this.stuckLevel}`)
        } else {
            this.breakFree();
        }
        
    }
    
    breakFree(){
        this.stuck = false; 
        // console.log("Zeebee is free!")
    }

    getStuck(){
            this.life -= 1;

        }

    keepRight(){
        if (this.position[0] < 72){
            this.position[0] += 3;
        }
    }

    keepLeft(){
        if (this.position[0] > 15){
            this.position[0] -= 3;
        }  
    }

    feed(){
        this.feeding = true;
        this.life += 3;
    }

    getCrushed(){
        this.life = 0;
    }

    getWounded(){
        this.life -= 20;

    }

    
}