class Flowers {
    constructor(x,y){
        this.position = [x,y];
        this.width = 50;
        this.height = 50;
        this.speed = "normal";
    }

    moveFlower(){
        switch (this.speed) {
            case "fast":
                this.position[1] += 7;
                break;
            case "slow":
                this.position[1] += 3;
                break;
            default:
                this.position[1] += 5;
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
        $newFlower.style.width = "15%";
        $newFlower.style.height = "auto";
        $newFlower.style.position = "fixed";
        $section.appendChild($newFlower);
        // console.log(`flower: ${this.position[0]} , ${this.position[1]}`);
    }

    gettasted(){

    }
}