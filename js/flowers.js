class Flowers {
    constructor(x,y){
        this.position = [x,y];
        this.width = 50;
        this.height = 50;
    }

    moveFlower(speed){
        switch (speed) {
            case "fast":
                this.position[1] += 5;
                break;
            case "slow":
                this.position[1] -= 5;
                break;
            default:
                this.position[1] += 10;
        }
        
    }

    renderFlower(){
        let $section = document.querySelector("#flower")
        let $newFlower = document.createElement("img");
        $newFlower.src = "./images/flower.png";
        let xvw = `${this.position[0]}vw`;
        let yvh = `${this.position[1]}vh`;
        $newFlower.style.top = yvh;
        $newFlower.style.left = xvw;
        $newFlower.style.width = "30%";
        $newFlower.style.height = "30%";
        $newFlower.style.position = "fixed";
        $section.appendChild($newFlower);
        console.log(`flower: ${this.position[0]} , ${this.position[1]}`);
    }

    gettasted(){

    }
}