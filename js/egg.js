class Egg {
    constructor(x, y){ //x and y are passed as the position of the shooter's butt
        this.x = x
        this.y = y
        this.width = 32
        this.height = 32
        this.speedY = 1.5
        this.toDelete = false
    }

    updatePosition(){
        this.y += this.speedY
        checkIfInBoundaries()
    }

    checkIfInBoundaries(){
        if(this.y < 0) this.toDelete = true //Flag egg for deletion if it has exited the canvas
    }
}