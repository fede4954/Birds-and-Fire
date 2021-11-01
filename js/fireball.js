class Fireball {
    constructor(x, y) { //Position is calculated relative to the dragon's pos then passing into the fireball constructor
        this.x = x
        this.y = y
        this.width = 64
        this.height = 32
        this.speedY = 1
        this.toDelete = false
    }

    updatePosition(){ //Fireball only moves in the y axis
        this.y -= this.speedY
        this.checkIfInBoundaries()
    }

    checkIfInBoundaries(){
        if(this.y < 0) this.toDelete = true
    }
}