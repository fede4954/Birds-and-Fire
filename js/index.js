//VARIABLES AND CONSTANTS
const loadedImages = {}

const imageLinks = [
    { link: "./images/dragon.gif", name: "player" },
    { link: "./images/skies/sky_night.png", name: "sky_night" },
    { link: "./images/fireball/fireball.png", name: "fireball" }
]

// let counterForLoadedImages = 0 //This counter keeps track of the images loaded

//Create canvas 2d context
const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

//Player variables
const player = new Dragon()
let arrayOfFireballs = [] //Array that holds all the fireballs shot by the player
let arrayOfEnemies = [] //Holds the enemies





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
    updateCanvas() //Update canvas
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

const drawEnemies = () => {
    arrayOfEnemies.forEach((enemy) => {
        ctx.drawImage(loadedImages.fireball, enemy.x, enemy.y, enemy.width, enemy.height)
        enemy.updatePosition() 
    })
}

const updateCanvas = () => {
    drawSky()
    drawDragon()
    drawFireballs()
    drawEnemies()

    arrayOfFireballs = arrayOfFireballs.filter((fireball) => {
        //Delete fireballs that have exited the canvas
        return !fireball.toDelete
    })

    requestAnimationFrame(updateCanvas) //Infinite loop
}





//window onload -> eventListeners
window.onload = () => {
    loadImages()

    //Start game button
    document.getElementById("start-game").onclick = () => {
        startGame()
        const createEnemies = setInterval(()=>{
            arrayOfEnemies.push(new Enemy())
            console.log(arrayOfEnemies)
          }, 1000)
    }

    //Dragon movement
    document.addEventListener("keydown", (event) => {
        //Horizontal movement
        if (event.key === "ArrowRight") {
            player.speedX = 2
        } else if (event.key === "ArrowLeft") {
            player.speedX = -2
        }

        //Vertical movement
        else if (event.key === "ArrowDown") {
            player.speedY = 2
        } else if (event.key === "ArrowUp") {
            player.speedY = -2
        }
    })

    document.addEventListener("keyup", (event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft")
            player.speedX = 0

        if (event.key === "ArrowDown" || event.key === "ArrowUp") player.speedY = 0
    })

    //Shooting
    document.addEventListener("keydown", (event) => {
        if (event.key === "q") arrayOfFireballs.push(new Fireball(player.x + 56.5, player.y - 20))
    })
}
