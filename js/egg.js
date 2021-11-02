class Egg {
    constructor(x, y){ //x and y are passed as the position of the shooter's butt
        this.x = x
        this.y = y
        this.width = 32
        this.height = 32
        this.speedY = 4
        this.hit = false
    }

    updatePosition(){
        this.y += this.speedY
        this.checkIfInBoundaries()
    }

    checkIfInBoundaries(){
        if(this.y < 0) this.hit = true
    }
}