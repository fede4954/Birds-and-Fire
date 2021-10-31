class Dragon {
    constructor(){
        this.x = 177.5 //Dragon starter position is always the same
        this.y = 895
        this.width = 145
        this.height = 105
        this.speedX = 0
        this.speedY = 0
    }

    updatePosition(){
        //Update pos with speed
        this.x += this.speedX
        this.y += this.speedY
        this.checkIfInBoundaries()
    }

    checkIfInBoundaries(){ //Check if the dragon is still inside the boundaries, force it to be if it isnt'
        if(this.x > 355) this.x = 355
        else if(this.x < 0) this.x = 0

        if(this.y < 140) this.y = 140
        else if(this.y > 895) this.y = 895
    }
}