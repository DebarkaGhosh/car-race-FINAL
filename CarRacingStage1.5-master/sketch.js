var database;
var gameState = 0;
var playerCount = 0;
var form ,player,game;
var carEnd = 0;

var distance =0 ;
var allPlayers;
var cars, car1,car2,car3,car4;



function preload(){

    car1Image = loadImage("images/car1.png");
    car2Image = loadImage("images/car2.png");
    car3Image = loadImage("images/car3.png");
    car4Image = loadImage("images/car4.png");

    trackImage = loadImage("images/track.jpg");
    bgImage =  loadImage("images/bg.jpg");
}

function setup(){
    createCanvas(displayWidth-20,displayHeight-30);

    console.log("displayHeight" + displayHeight);
    console.log("windowHeight" + windowHeight);

    database = firebase.database();

   game = new Game()
   game.getState()
   game.start()
   

    
    
}

function draw(){
    background(bgImage)

   if (playerCount === 4 && carEnd === 0 ){
       game.update(1);
       
   } 
   if(gameState ===1 ){
      
    clear();
    console.log("gamestate is 1")
    game.play();
   }
if(gameState===2 && carEnd ===4){
    game.end()
}
    
}



