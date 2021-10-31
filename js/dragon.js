class Dragon {
    constructor(){
        this.x = 177.5 //Dragon starter position is always the same
        this.y = 895
        this.width = 145
        this.height = 105
        this.speedX = 0
    }

    updatePosition(){
        this.x += this.speedX
        console.log(this.x)
        this.checkIfInBoundaries()
    }

    checkIfInBoundaries(){
        if(this.x > 360) this.x = 360
        else if(this.x < 0) this.x = 0
    }
}