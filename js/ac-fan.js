class Fan {
    constructor(x,y){
        this.position = [x,y];
        this.power = 2; // can have a value between 1 and 5
    }

    moveFans(speed){
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

    renderFans(){
        console.log(`Fan: ${this.position[0]} , ${this.position[1]}`);

    }
}