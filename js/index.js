//VARIABLES AND CONSTANTS
const loadedImages = {}

const imageLinks = [
    { link: './images/dragon.gif', name: 'player' },
    { link: './images/skies/sky_night.png', name: 'sky_night' },
    { link: './images/fireball.png', name: 'fireball' },
    { link: './images/egg.png', name: 'egg'},
    { link: './images/seagulls.png', name: 'seagulls'}
    // { link: '', name: ''}
]

// let counterForLoadedImages = 0 //This counter keeps track of the images loaded

//Create canvas 2d context
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
ctx.fillStyle = "#FF0000"; //Provisional red color for seagulls

//Player variables
const player = new Dragon()
let score = 0
let arrayOfFireballs = [] //Array that holds all the fireballs shot by the player
let arrayOfSeagulls = [] //Holds the seagulls
let arrayOfEggs = [] //Holds the seagulls' projectiles (eggs)





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

const drawEntities = (arr, img) => { //Draws all entities from an array, img refers to the image inside loadedImages
    arr.forEach((item) => {
        ctx.drawImage(img, item.x, item.y, item.width, item.height)
        item.updatePosition()
    })
}

const checkCollision = (arr1, arr2) => { //This function checks the collision between two types of entities 
    arr1.forEach((item1) => { //Ex if array1 is eggs it'd check for every egg if any of the fireballs collide with it
        arr2.forEach((item2) => {
            if (!(item1.x > item2.x + item2.width || 
                item1.x + item1.width < item2.x || 
                item1.y > item2.y + item2.height || 
                item1.y + item1.height < item2.y)){
                    item1.hit = true //Following the same example, it'd mark item1 (the egg) as hit
                    item2.hit = true //and the fireball (item2) aswell
                }
        })
    })
}

const filterEntities = (arr) => { //This function filters all entities from an array that have been hit or exited the canvas
    return arr.filter((item) => {
        return !item.hit
    })
}

const drawAllEntities = () => { //Draws all entities except the player's dragon
    drawEntities(arrayOfFireballs, loadedImages.fireball)
    drawEntities(arrayOfSeagulls, loadedImages.seagulls)
    drawEntities(arrayOfEggs, loadedImages.egg)
}

const checkAllCollisions = () => { //Checks all the collisions
    checkCollision(arrayOfSeagulls, arrayOfFireballs)
    checkCollision(arrayOfEggs, arrayOfFireballs)
}

const filterAllEntities = () => { //Filter all the entities flagged as hit
    arrayOfFireballs = filterEntities(arrayOfFireballs) //Make the array the returned filtered one from the function
    arrayOfSeagulls = filterEntities(arrayOfSeagulls)
    arrayOfEggs = filterEntities(arrayOfEggs)
}





//INFINITE GAME LOOP
const updateCanvas = () => {
    drawSky()
    drawDragon()
    drawAllEntities()
    checkAllCollisions()
    filterAllEntities()
    requestAnimationFrame(updateCanvas)
}





//window onload -> eventListeners
window.onload = () => {
    loadImages()

    // Start game button
    document.getElementById('start-game').onclick = () => {
        startGame()

        const createSeagulls = setInterval(() => {
            arrayOfSeagulls.push(new Seagulls())
          }, 1000) //Create new seagulls every second

        const generateEggs = setInterval(() => {
            let randomSeagulls = arrayOfSeagulls[Math.floor(Math.random() * arrayOfSeagulls.length)]
            const egg = new Egg(randomSeagulls.x, randomSeagulls.y) //Create new egg using random seagulls' pos
            arrayOfEggs.push(egg)
        }, 1000) //This interval generates a new egg to be shot from random seagulls every second


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
