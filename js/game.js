//Only run the game when the window loads to prevent errors
window.onload = ()=>{

    //Create canvas 2d context
    const canvas = document.getElementById('game')
    const ctx = canvas.getContext('2d')

    //Image load
    const loadedImages = {}

    const imageLinks = [
     { link: "./images/dragon.gif", name: "player" },
     { link: "./images/skies/sky_night.png", name: "sky_night" }
    ]

    let counterForLoadedImages = 0; //This counter keeps track of the images loaded

    imageLinks.forEach((imagen) => {
      //Iterate over every img in the array
      const img = new Image() //Create a new img obejct
      img.src = imagen.link //Give it the url of the img
      img.onload = () => {
        //Execute the callback function when it's loaded
        counterForLoadedImages++ //Up the counter to check if it's done after
        loadedImages[imagen.name] = img
      }
    })

    console.log(loadedImages)

    //Classes
    class Dragon {
        constructor(){
            this.x = 177.5 //Dragon starter position is always the same
            this.y = 895
            this.width = 145
            this.height = 105
            this.speedX = 0
        }
    }

    const player = new Dragon()

    //Event listeners
    document.getElementById('start-game').onclick = ()=>{
        startGame()
    }

    //Functions
    const startGame = ()=>{ //This function will start and run the logic of the game
        // updateCanvas() //This function updates the position of every object in the game
        // drawCanvas() //This function draws all the updated objects in the game
        drawSky()
        drawDragon()
    }

    const drawSky = ()=>{
        ctx.drawImage(loadedImages.sky_night, 0, 0, 500, 1000)
    }

    const drawDragon = ()=>{
        ctx.drawImage(loadedImages.player, player.x, player.y, player.width, player.height)
    }

    // const updateDragon = ()=>{
    //     player.x += player.speedX
    // }

}