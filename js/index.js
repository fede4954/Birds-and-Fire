//Only run the game when the window loads to prevent errors
window.onload = ()=>{

    //Create canvas 2d context
    const canvas = document.getElementById('game')
    const ctx = canvas.getContext('2d')

    //Create a player
    const player = new Dragon()

    //IMAGE LOAD
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

    //EVENT LISTENERS
    
    //Dragon movement
    document.getElementById('start-game').onclick = ()=>{
        startGame()
    }

    document.addEventListener('keydown', (event)=>{
        //Horizontal movement
        if(event.key === 'ArrowRight'){
            player.speedX = 2.5
        }
        else if(event.key === 'ArrowLeft'){
            player.speedX = -2.5
        }

        //Vertical movement
        if(event.key === 'ArrowDown'){
            player.speedY = 2.5
        }
        else if(event.key === 'ArrowUp'){
            player.speedY = -2.5
        }

    })

    document.addEventListener('keyup', (event)=>{
        if(event.key ===  'ArrowRight' || event.key === 'ArrowLeft') player.speedX = 0

        if(event.key ===  'ArrowDown' || event.key === 'ArrowUp') player.speedY = 0
    })



    //FUNCTIONS
    const startGame = ()=>{ //This function will start and run the logic of the game
        updateCanvas() //This function updates the position of every object in the game
        requestAnimationFrame(startGame)
    }

    const drawSky = ()=>{
        ctx.drawImage(loadedImages.sky_night, 0, 0, 500, 1000)
    }

    const drawDragon = ()=>{
        player.updatePosition() //Update pos before drawing
        ctx.drawImage(loadedImages.player, player.x, player.y, player.width, player.height)
    }

    const updateCanvas = ()=>{
        drawSky()
        drawDragon()
    }

}