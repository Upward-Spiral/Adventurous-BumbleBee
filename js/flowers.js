class Flowers {
    constructor(x,y){
        this.position = [x,y];
        this.width = 50;
        this.height = 50;
    }

    moveFlower(speed){
        switch (speed) {
            case "fast":
                this.position[1] += 15;
                break;
            case "slow":
                this.position[1] += 5;
                break;
            default:
                this.position[1] += 10;
        }
        
    }

    renderFlower(){
        console.log(`flower: ${this.position[0]} , ${this.position[1]}`);
    }

    gettasted(){

    }
}