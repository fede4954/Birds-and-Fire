//Variables

const loadedImages = {};

const imageLinks = [
  { link: "./images/dragon.gif", name: "player" },
  { link: "./images/skies/sky_night.png", name: "sky_night" },
  { link: "./images/fireballs/red_fireball.png", name: "red_fireball" },
];

//Create canvas 2d context
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//Player variables
const player = new Dragon();
let shooting = false; //Boolean that checks whether the player is shooting or not
let arrayOfFireballs = []; //Array that holds all the fireballs shot by the player
let shootFireballs;
let isSpacePressed;
let gameFrames = 0;

//Funciones

const loadImages = () => {
  // let counterForLoadedImages = 0 //This counter keeps track of the images loaded
  imageLinks.forEach((imagen) => {
    //Iterate over every img in the array
    const img = new Image(); //Create a new img obejct
    img.src = imagen.link; //Give it the url of the img
    img.onload = () => {
      //Execute the callback function when it's loaded
      // counterForLoadedImages++ //Up the counter to check if it's done after
      loadedImages[imagen.name] = img;
    };
  });
};

const startGame = () => {
  //Start the game
 //Load images
  updateCanvas(); //Update canvas
};

const drawSky = () => {
  ctx.drawImage(loadedImages.sky_night, 0, 0, 500, 1000);
};

const drawDragon = () => {
  ctx.drawImage(
    loadedImages.player,
    player.x,
    player.y,
    player.width,
    player.height
  );
  player.updatePosition(); //Update pos before drawing
};

const drawFireballs = () => {
  arrayOfFireballs.forEach((fireball) => {

    ctx.drawImage(
      loadedImages.red_fireball,
      fireball.x,
      fireball.y,
      fireball.width,
      fireball.height
    );
    fireball.updatePosition(); //Update fireball pos before drawing
  });
};

const updateCanvas = () => {
  drawSky();
  drawDragon();

  drawFireballs()


  arrayOfFireballs = arrayOfFireballs.filter((fireball)=>{ //Filter fireballs that have exit
    console.log(fireball.toDelete)
      return !fireball.toDelete
  })

  gameFrames++;
  requestAnimationFrame(updateCanvas);
};


//window onload -> eventListeners
//Only run the game when the window loads to prevent errors
window.onload = () => {
    loadImages();

  //EVENT LISTENERS
  //Start game
  document.getElementById("start-game").onclick = () => {
    startGame();
  };



  //Dragon movement
  document.addEventListener("keydown", (event) => {
    //Horizontal movement
    if (event.key === "ArrowRight") {
      player.speedX = 2;
    } else if (event.key === "ArrowLeft") {
      player.speedX = -2;
    }

    //Vertical movement
    else if (event.key === "ArrowDown") {
      player.speedY = 2;
    } else if (event.key === "ArrowUp") {
      player.speedY = -2;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === " " && isSpacePressed) {
      isSpacePressed = false;
    //   console.log("shooting");
    //   console.log(arrayOfFireballs);
    //   if(isSpacePressed){
    //     shootFireballs = setInterval(() => {
     
    
        arrayOfFireballs.push(new Fireball(player.x, player.y));
            

        //   }, 2000);
    //   }

    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft")
      player.speedX = 0;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") player.speedY = 0;
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === " ") {
      isSpacePressed = true;
    //   clearInterval(shootFireballs);
    }
  });
};
