class Flowers {
    constructor(x,y,w){
        this.position = [x,y];
        this.width = w;
        this.height = w;
        this.speed = "normal";
    }

    
    moveFlower(){  // Adjusts flower's position by setting the relevant properties
        switch (this.speed) {
            case "fast":
                this.position[1] += 6;
                break;
            case "slow":
                this.position[1] += 2;
                break;
            default:
                this.position[1] += 4;
        }
        
    }

    renderFlower(){  // Renders flower

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
   
        // console.log(`flower: ${this.position[0]} , ${this.position[1]}`);
    }
    
}