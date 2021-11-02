class Egg {
    constructor(x, y){ //x and y are passed as the position of the shooter's butt
        this.x = x
        this.y = y
        this.width = 24
        this.height = 24
        this.speedY = 3
        this.hit = false
        this.egg = true //Variable used to calc score
    }

    updatePosition(){
        this.y += this.speedY
        this.checkIfInBoundaries()
    }

    checkIfInBoundaries(){
        if(this.y < 0) this.hit = true
    }
}

//Original egg's measures 16x16