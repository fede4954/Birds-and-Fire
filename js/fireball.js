class Fireball {
    constructor(x, y) { //Original position is passed as the dragon's head's position at the time the fireball is shot
        this.x = x
        this.y = y
        this.width = 24
        this.height = 24
        this.speedY = 3
        this.hit = false //In every class this flag has more or less the same behavior, if an entity is hit, it'll be flagged
    }                    //for deletion, entity also will be marked as hit when the object exits the boundaries even if it isn't
                         //technically hit as the purpose of the flag is deletion
    updatePosition(){
        this.y -= this.speedY
        this.checkIfInBoundaries()
    }

    checkIfInBoundaries(){
        if(this.y < 0) this.hit = true //Flag fireball for deletion if it has exited the canvas
    }
}

//Original fireball's measures 16x16