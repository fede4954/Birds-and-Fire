class Enemy {
    constructor(){
        this.x = Math.floor(Math.random() * 501) //Spawn throughout the entire x axis
        this.y = Math.floor(Math.random() * 141) //Spawn down to px 140 in y
        this.width = 50
        this.height = 50
        this.speedX = 2
        this.speedY = 2
        this.toDelete = false
    }

    updatePosition(){
        if((Math.floor(Math.random() * 5) < 3)){
            this.x += Math.floor(Math.random() * 5)
        }
        else {
            this.x += Math.floor(Math.random() * -5)
        }
        this.y += this.speedY
        this.checkIfInBoundaries()
    }

    checkIfInBoundaries(){ //Checks if the enemy is still inside the boundaries, forces it to be if it isn't
        if(this.x > 500) this.x = 500
        else if(this.x < 0) this.x = 0

        if(this.y > 1000) this.toDelete = true //If the enemy exits the screen through the bottom 
    }                                          //flag it for deletion to free memory
}