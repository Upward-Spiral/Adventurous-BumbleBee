class SpiderWeb {
    constructor (x,y,w){
        this.position = [x,y];
        this.width = w;
        this.height = w;
        this.speed = "normal";

    }

    moveWeb(){  // Adjusts web's position by setting the relevant properties
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

    renderWeb(){  // Renders web

        let realWidth = `${this.width}%`;
        let $section = document.querySelector("#web")
        let $newWeb = document.createElement("img");
        $newWeb.src = "./images/spider-web.png";
        let xvw = `${this.position[0]}vw`;
        let yvh = `${this.position[1]}vh`;
        $newWeb.style.top = yvh;
        $newWeb.style.left = xvw;
        $newWeb.style.width = realWidth;
        $newWeb.style.height = "auto";
        $newWeb.style.position = "fixed";
        $section.appendChild($newWeb);
 
        // console.log(`web: ${this.position[0]} , ${this.position[1]}`);
        
    }

}