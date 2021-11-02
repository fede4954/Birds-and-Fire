//VARIABLES AND CONSTANTS
const loadedImages = {}

const imageLinks = [
    { link: './images/dragon.gif', name: 'player' },
    { link: './images/skies/sky_night.png', name: 'sky_night' },
    { link: './images/fireball.png', name: 'fireball' }
]

// let counterForLoadedImages = 0 //This counter keeps track of the images loaded

//Create canvas 2d context
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
ctx.fillStyle = "#FF0000"; //Provisional red color for chickens and eggs

//Player variables
const player = new Dragon()
let arrayOfFireballs = [] //Array that holds all the fireballs shot by the player
let arrayOfChickens = [] //Holds the chickens
let arrayOfEggs = [] //Holds the chickens' projectiles (eggs)





//FUNCTIONS
const loadImages = () => {
    imageLinks.forEach((image) => { //Iterate over every img in the array
        const img = new Image() //Create a new img obejct
        img.src = image.link //Give it the url of the img
        img.onload = () => { //Execute the callback function when it's loaded
            // counterForLoadedImages++ //Up the counter to check if it's done after
            loadedImages[image.name] = img
        }
    })
}

const startGame = () => {
    updateCanvas() //Update canvas when start button is pressed
}

const drawSky = () => {
    ctx.drawImage(loadedImages.sky_night, 0, 0, 500, 1000)
}

const drawDragon = () => {
    ctx.drawImage(loadedImages.player, player.x, player.y, player.width, player.height)
    player.updatePosition() //Update pos for next draw
}

const drawFireballs = () => {
    arrayOfFireballs.forEach((fireball) => {
        ctx.drawImage(loadedImages.fireball, fireball.x, fireball.y, fireball.width, fireball.height)
        fireball.updatePosition() 
    })
}

const drawChickens = () => {
    arrayOfChickens.forEach((chicken) => {
        ctx.fillRect(chicken.x, chicken.y, chicken.width, chicken.height)
        chicken.updatePosition() 
    })
}

const drawEggs = () => {
    arrayOfEggs.forEach((egg) => {
        ctx.fillRect(egg.x, egg.y, egg.width, egg.height)
        egg.updatePosition()
    })
}

const isEnemyShot = () => {
    arrayOfChickens.forEach((chicken) => {
        arrayOfFireballs.forEach((fireball) => {
            if (!(chicken.x > fireball.x + fireball.width || //Check if fireball is inside the enemy
                chicken.x + chicken.width < fireball.x || 
                chicken.y > fireball.y + fireball.height || 
                chicken.y + chicken.height < fireball.y)){
                    chicken.toDelete = true //Mark the enemy and the fireball to be deleted once they collide
                    fireball.toDelete = true
                }
        })
    })
}

const isEggShot = () => {
    arrayOfEggs.forEach((egg) => {
        arrayOfFireballs.forEach((fireball) => {
            if (!(egg.x > fireball.x + fireball.width || //Check if fireball is inside the enemy
                egg.x + egg.width < fireball.x || 
                egg.y > fireball.y + fireball.height || 
                egg.y + egg.height < fireball.y)){
                    egg.toDelete = true //Mark the enemy and the fireball to be deleted once they collide
                    fireball.toDelete = true
                }
        })
    })
}

const updateCanvas = () => {
    drawSky()
    drawDragon()
    drawFireballs()
    drawChickens()
    drawEggs()
    isEnemyShot()
    isEggShot()

    arrayOfFireballs = arrayOfFireballs.filter((fireball) => {
        //Delete fireballs that have exited the canvas
        return !fireball.toDelete
    })

    arrayOfChickens = arrayOfChickens.filter((chicken) => {
        //Delete chickens that have exited the canvas or been shot
        return !chicken.toDelete
    })

    arrayOfEggs = arrayOfEggs.filter((egg) => {
        //Delete eggs that have exited the canvas or been shot
        return !egg.toDelete
    })

    requestAnimationFrame(updateCanvas) //Infinite loop
}






//window onload -> eventListeners
window.onload = () => {
    loadImages()

    // Start game button
    document.getElementById('start-game').onclick = () => {
        startGame()

        const createChickens = setInterval(() => {
            arrayOfChickens.push(new Chicken())
          }, 1000) //Create new chicken every second

        const generateEggs = setInterval(() => {
            let randomChicken = arrayOfChickens[Math.floor(Math.random() * arrayOfChickens.length)]
            const egg = new Egg(randomChicken.x, randomChicken.y) //Create new egg using random chicken's pos
            arrayOfEggs.push(egg)
            console.log(arrayOfEggs)
        }, 1000) //This interval generates a new egg to be shot from a random chicken every second


    }

    //Dragon movement
    document.addEventListener("keydown", (event) => {
        //Horizontal movement
        if (event.key === 'ArrowRight') {
            player.speedX = 2
        } else if (event.key === 'ArrowLeft') {
            player.speedX = -2
        }

        //Vertical movement
        else if (event.key === 'ArrowDown') {
            player.speedY = 1
        } else if (event.key === 'ArrowUp') {
            player.speedY = -1
        }
    })

    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft')
            player.speedX = 0

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') player.speedY = 0
    })

    //Shooting
    document.addEventListener("keydown", (event) => {
        if (event.key === 'q') arrayOfFireballs.push(new Fireball(player.x + 56.5, player.y - 20))
    })
}
