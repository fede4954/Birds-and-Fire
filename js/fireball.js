class Fireball {
    constructor(x, y) { //Original position is passed as the dragon's head's position at the time the fireball is shot
        this.x = x
        this.y = y
        this.width = 32
        this.height = 32
        this.speedY = 1.5
        this.toDelete = false
    }

    updatePosition(){
        this.y -= this.speedY
        this.checkIfInBoundaries()
    }

    checkIfInBoundaries(){
        if(this.y < 0) this.toDelete = true //Flag fireball for deletion if it has exited the canvas
    }
}