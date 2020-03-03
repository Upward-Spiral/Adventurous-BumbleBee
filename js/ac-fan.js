class Fan {
    constructor(x,y){
        this.position = [x,y];
        this.power = 2; // can have a value between 1 and 5
        this.speed = "normal";
    }

    moveFans(){
        switch (this.speed) {
            case "fast":
                this.position[1] += 3;
                break;
            case "slow":
                this.position[1] -= 3;
                break;
            default:
                this.position[1] += 5;
        }
        
    }

    renderFans(){
        let $section = document.querySelector("#fan")
        let $newFan = document.createElement("img");
        $newFan.src = "./images/fan.png";
        let xvw = `${this.position[0]}vw`;
        let yvh = `${this.position[1]}vh`;
        $newFan.style.top = yvh;
        $newFan.style.left = xvw;
        $newFan.style.width = "20%";
        $newFan.style.height = "auto";
        $newFan.style.position = "fixed";
        $section.appendChild($newFan);
        // console.log(`Fan: ${this.position[0]} , ${this.position[1]}`);

    }
}