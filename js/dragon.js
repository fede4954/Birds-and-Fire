class Dragon {
    constructor(){
        this.x = 284.75 //Dragon starter position is always the same
        this.y = 605.5
        this.width = 130.5
        this.height = 94.5
        this.speedX = 0
        this.speedY = 0
        this.health = 100
    }

    updatePosition(){
        this.x += this.speedX //Update pos with speed
        this.y += this.speedY
        this.checkIfInBoundaries()
    }

    checkIfInBoundaries(){ //Checks if the dragon is still inside the boundaries, forces it to be if it isn't
        if(this.x > 569.5) this.x = 569.5
        else if(this.x < 0) this.x = 0

        if(this.y < 130.5) this.y = 130.5
        else if(this.y > 605.5) this.y = 605.5
    }
}

//Original dragon's measures = 145, 105