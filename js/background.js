class Background {
    constructor(y){
        this.x = 0
        this.y = y
        this.width = 700
        this.height = 700
        this.speedY = 0.1
    }

    updatePosition(){
        this.y += this.speedY
        this.reposition()
    }

    reposition(){
        if(this.y === 700) this.y = -2100
    }
}