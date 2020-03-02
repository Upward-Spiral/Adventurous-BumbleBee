class SpiderWeb {
    constructor (x,y){
        this.position = [x,y];
        this.width = 10;
        this.height = 10;
    }

    moveWeb(speed){
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

    renderWeb(){
        console.log(`web: ${this.position[0]} , ${this.position[1]}`);
    }

    getTorn(){

    }
}