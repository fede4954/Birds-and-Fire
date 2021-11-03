//VARIABLES AND CONSTANTS
const loadedImages = {}

const imageLinks = [
    { link: './images/dragon.gif', name: 'player' },
    { link: './images/skies/sky1.png', name: 'sky1' },
    { link: './images/skies/sky2.png', name: 'sky2' },
    { link: './images/skies/sky3.png', name: 'sky3' },
    { link: './images/skies/sky4.png', name: 'sky4' },
    { link: './images/skies/sky5.png', name: 'sky5' },
    { link: './images/skies/sky6.png', name: 'sky6' },
    { link: './images/fireball.png', name: 'fireball' },
    { link: './images/egg.png', name: 'egg'},
    { link: './images/seagulls.png', name: 'seagulls'}
    // { link: '', name: ''}
]

let counterForLoadedImages = 0 //This counter keeps track of the images loaded

//Create canvas 2d context
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

//Backgrounds
let arrayOfBackgrounds = [] //Array that holds all backgrounds

//Player variables
const player = new Dragon()
let playerArray = []
playerArray.push(player) //Put the player in an array to be able to utilize the check collision function with it
let score = 0
let arrayOfFireballs = [] //Holds all the fireballs shot by the player

//Enemy variables
let arrayOfSeagulls = [] //Holds the seagulls
let arrayOfEggs = [] //Holds the seagulls' projectiles (eggs)

let myReq = null //Variable to end the animation frame





//FUNCTIONS
const loadImages = () => {
    imageLinks.forEach((image) => { //Iterate over every img in the array
        const img = new Image() //Create a new img obejct
        img.src = image.link //Give it the url of the img
        img.onload = () => { //Execute the callback function when it's loaded
            counterForLoadedImages++ //Up the counter to check if it's done after
            loadedImages[image.name] = img
        }
    })
}

const createBackgrounds = () => {
    arrayOfBackgrounds.push(new Background(0))
    arrayOfBackgrounds.push(new Background(-700))
    arrayOfBackgrounds.push(new Background(-1400))
    arrayOfBackgrounds.push(new Background(-2100))
    arrayOfBackgrounds.push(new Background(-2800))
    arrayOfBackgrounds.push(new Background(-3500))
}

const drawBackgrounds = () => {
    ctx.drawImage(loadedImages.sky1, 0, arrayOfBackgrounds[0].y, 700, 700)
    arrayOfBackgrounds[0].updatePosition()

    ctx.drawImage(loadedImages.sky2, 0, arrayOfBackgrounds[1].y, 700, 700)
    arrayOfBackgrounds[1].updatePosition()

    ctx.drawImage(loadedImages.sky3, 0, arrayOfBackgrounds[2].y, 700, 700)
    arrayOfBackgrounds[2].updatePosition()

    ctx.drawImage(loadedImages.sky4, 0, arrayOfBackgrounds[3].y, 700, 700)
    arrayOfBackgrounds[3].updatePosition()
    
    ctx.drawImage(loadedImages.sky5, 0, arrayOfBackgrounds[4].y, 700, 700)
    arrayOfBackgrounds[4].updatePosition()

    ctx.drawImage(loadedImages.sky6, 0, arrayOfBackgrounds[5].y, 700, 700)
    arrayOfBackgrounds[5].updatePosition()
}

const startGame = () => {
    createBackgrounds() //Creates backgrounds when start button is pressed
    updateCanvas() //Updates
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
                    if(item1.name === 'seagulls') score += 30 //If the entity hit is a seagull, up the score
                    if(item1.name === 'dragon') item1.hit = true //Entity hit is the player
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
    checkCollision(playerArray, arrayOfEggs)
}

const filterAllEntities = () => { //Filter all the entities flagged as hit
    arrayOfFireballs = filterEntities(arrayOfFireballs) //Make the array the returned filtered one from the function
    arrayOfSeagulls = filterEntities(arrayOfSeagulls)
    arrayOfEggs = filterEntities(arrayOfEggs)
}





//INFINITE GAME LOOP
const updateCanvas = () => {
    if(counterForLoadedImages === imageLinks.length){ //Only update canvas once all images are loaded
        drawBackgrounds()
        drawDragon()
        drawAllEntities()
        checkAllCollisions()
        filterAllEntities()
        if(player.hit === true){ //If the dragon was hit end the game
            cancelAnimationFrame(myReq)
            ctx.fillRect(0, 0, 700, 700)
            ctx.font = '100px Alagard'
            ctx.fillStyle = 'red'
            ctx.textAlign = 'center'
            ctx.fillText('YOU DIED', 350, 350)
            ctx.font = '50px Alagard'
            ctx.fillStyle = 'white'
            ctx.fillText(`Score: ${score}`, 350, 450)
        } 
        else myReq = requestAnimationFrame(updateCanvas)
    }
}





//window onload -> eventListeners
window.onload = () => {
    loadImages()

    // Start game button
    document.getElementById('start-game').onclick = () => {
        startGame()

        const createSeagulls = setInterval(() => {
            arrayOfSeagulls.push(new Seagulls())
          }, 500) //Create new seagulls every half a second

        const generateEggs = setInterval(() => {
            let randomSeagulls = arrayOfSeagulls[Math.floor(Math.random() * arrayOfSeagulls.length)]
            const egg = new Egg(randomSeagulls.x + 36, randomSeagulls.y) //Create new egg using random seagulls' pos
            arrayOfEggs.push(egg)
        }, 250) //This interval generates a new egg to be shot from random seagulls every quarter of a second

    }

    //Dragon movement
    document.addEventListener("keydown", (event) => {
        //Horizontal movement
        if (event.key === 'ArrowRight') {
            player.speedX = 3
        } else if (event.key === 'ArrowLeft') {
            player.speedX = -3
        }

        //Vertical movement
        else if (event.key === 'ArrowDown') {
            player.speedY = 1.5
        } else if (event.key === 'ArrowUp') {
            player.speedY = -1.5
        }
    })

    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft')
            player.speedX = 0

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') player.speedY = 0
    })

    //Shooting
    document.addEventListener("keydown", (event) => {
        if (event.key === 'q') arrayOfFireballs.push(new Fireball(player.x + 53.25, player.y - 20)) //Pos from the dragon's mouth
    })
}
