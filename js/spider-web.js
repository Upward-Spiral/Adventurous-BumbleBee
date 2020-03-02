class SpiderWeb {
    constructor (x,y){
        this.position = [x,y];
        this.width = 10;
        this.height = 10;
    }

    moveWeb(speed){
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

    renderWeb(){
        let $section = document.querySelector("#web")
        let $newWeb = document.createElement("img");
        $newWeb.src = "./images/spider-web.png";
        let xvw = `${this.position[0]}vw`;
        let yvh = `${this.position[1]}vh`;
        $newWeb.style.top = yvh;
        $newWeb.style.left = xvw;
        $newWeb.style.width = "40%";
        $newWeb.style.height = "40%";
        $newWeb.style.position = "fixed";
        $section.appendChild($newWeb);
        console.log(`web: ${this.position[0]} , ${this.position[1]}`);
    }

    getTorn(){
        
    }
}