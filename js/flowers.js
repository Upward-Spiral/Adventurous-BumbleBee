class Flowers {
    constructor(x,y,w){
        this.position = [x,y];
        this.width = w;
        this.height = 0;
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
        let realWidth = `${this.width}%`;
        let $section = document.querySelector("#flower")
        let $newFlower = document.createElement("img");
        $newFlower.src = "./images/flower.png";
        let xvw = `${this.position[0]}vw`;
        let yvh = `${this.position[1]}vh`;
        $newFlower.style.top = yvh;
        $newFlower.style.left = xvw;
        $newFlower.style.width = realWidth;
        $newFlower.style.height = "auto";
        $newFlower.style.position = "fixed";
        $section.appendChild($newFlower);
        let rh = window.getComputedStyle($newFlower,null).getPropertyValue("height");
        let realHeight = Number (rh.slice(rh.length-1,2));
        this.height = Math.floor((realHeight * 100)/(window.innerHeight));
        // console.log(`flower: ${this.position[0]} , ${this.position[1]}`);
    }

    gettasted(){

    }
}