class Background {
    constructor(y){
        this.y = y
        this.speedY = 0.15
    }

    updatePosition(){
        this.y += this.speedY
        this.reposition()
    }

    reposition(){
        if(this.y === 700) this.y = -3500
    }
}