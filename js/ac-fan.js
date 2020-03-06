class Fan {
    constructor(x,y,w){
        this.position = [x,y];
        this.width = w;
        this.height = w;
        this.power = 2; // can have a value between 1 and 5
        this.speed = "normal";
    }

    moveFans(){  // Adjusts fan's position by setting the relevant properties
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

    renderFans(){  // Renders fans      
        let realWidth = `${this.width}%`;
        let $section = document.querySelector("#fan")
        let $newFan = document.createElement("img");
        $newFan.src = "./images/fan.png";
        let xvw = `${this.position[0]}vw`;
        let yvh = `${this.position[1]}vh`;
        $newFan.style.top = yvh;
        $newFan.style.left = xvw;
        $newFan.style.width = realWidth;
        $newFan.style.height = "auto";
        $newFan.style.position = "fixed";
        $section.appendChild($newFan);
        // console.log(`Fan: ${this.position[0]} , ${this.position[1]}`);
    }

}