class Bee {
    constructor (){
        this.position = [50,30];
        this.life = 100;
        this.stuck = false;
        this.pushed = false;
        this.feeding = false;
    }
    
    renderBee(){
        let bumbleBee = this;
        
        if (bumbleBee.life>0){
            let $bee = document.querySelector("#bee-img");
            let xvw = `${this.position[0]}vw`;
            let yvh = `${this.position[1]}vh`;
            $bee.style.bottom = yvh;

            $bee.style.left = xvw;
            console.log(xvw,yvh);
        }

    }


    resist(){
        
    }

    keepRight(){
        this.position[0] += 2;
    }

    keepLeft(){
        this.position[0] -= 2;
    }

    feed(){

    }

    getCrushed(){

    }

    getWounded(){

    }

    getStuck(){

    }

}