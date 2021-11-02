class Seagulls {
    constructor(){
        this.x = Math.floor(Math.random() * 701) //Spawn throughout the entire x axis 
        this.y = Math.floor(Math.random() * 146) //Spawn down to px 140 in y 
        this.width = 96
        this.height = 24
        this.speedX = 2
        this.speedY = 2
        this.hit = false
        this.name = 'seagulls' //Property used to calc the score when checking collisions
    }

    updatePosition(){
        if((Math.floor(Math.random() * 5) < 3)){ //Seagull's move randomly from side to side in the x axis
            this.x += Math.floor(Math.random() * 2)
        }
        else {
            this.x += Math.floor(Math.random() * -2)
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