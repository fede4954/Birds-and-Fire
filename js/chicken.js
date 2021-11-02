class Chicken {
    constructor(){
        this.x = Math.floor(Math.random() * 501) //Spawn throughout the entire x axis 
        this.y = Math.floor(Math.random() * 141) //Spawn down to px 140 in y 
        this.width = 50
        this.height = 50
        this.speedX = 2
        this.speedY = 2
        this.hit = false
    }

    updatePosition(){
        if((Math.floor(Math.random() * 5) < 3)){ //Chicken's move randomly from side to side in the x axis
            this.x += Math.floor(Math.random() * 5)
        }
        else {
            this.x += Math.floor(Math.random() * -5)
        }
        this.y += this.speedY
        this.checkIfInBoundaries()
    }

    checkIfInBoundaries(){ 
        if(this.x > 500) this.x = 500
        else if(this.x < 0) this.x = 0

        if(this.y > 1000) this.hit = true 
    }                                     
}