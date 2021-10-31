//Only run the game when the window loads to prevent errors
window.onload = ()=>{

    //Create canvas 2d context
    const canvas = document.getElementById('game')
    const ctx = canvas.getContext('2d')

    //Image load
    // const loadedImages = {}

    // const imageLinks = [
    //  { link: " ", name: " " },
    //  { link: " ", name: " " }
    // ]

    // let counterForLoadedImages = 0; //This counter keeps track of the images loaded

    // imageLinks.forEach((imagen) => {
    //   //Iterate over every img in the array
    //   const img = new Image() //Create a new img obejct
    //   img.src = imagen.link //Give it the url of the img
    //   img.onload = () => {
    //     //Execute the callback function when it's loaded
    //     counterForLoadedImages++ //Up the counter to check if it's done after
    //     loadedImages[imagen.name] = img
    //   }
    // })

    //Classes
    class Dragon {
        constructor(){
            this.x = 0
            this.y = 0
            // this.width =
            // this.height =
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
        drawRoad()
        drawDragon()
    }

    const drawRoad = ()=>{
        const road = new Image()
        road.src = './images/skies/sky_night.png'
        ctx.drawImage(road, 0, 0, 500, 1000)
    }

    const drawDragon = ()=>{
        const player = new Image()
        player.src = './images/dragon.gif' //Gif doesn't work must animate later manually
        ctx.drawImage(player, 0, 0, 145, 105)
    }


}