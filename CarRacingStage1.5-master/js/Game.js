class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100, 200);
    car1.addImage("car1", car1Image);

    car2 = createSprite(300, 200);
    car2.addImage("car2", car2Image);

    car3 = createSprite(500, 200);
    car3.addImage("car3", car3Image);

    car4 = createSprite(700, 200);
    car4.addImage("car4", car4Image);

    cars = [car1, car2, car3, car4];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();
    player.getcarEnd();

    if (allPlayers !== undefined) {
      //var display_position = 100;
      background("grey");

      image(trackImage, 0, displayHeight * -4, displayWidth, displayHeight * 5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 150;
      var y;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index === player.index) {
          fill("red")
          ellipse(x, y, 70, 70)


          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y
        }
        textStyle(BOLDITALIC);
        fill("yellow");
        stroke("black")
        textAlign(CENTER);
        textSize(15);
        text(allPlayers[plr].name.toUpperCase(), cars[index - 1].x, cars[index - 1].y + 80)




        if (keyIsDown(UP_ARROW) && player.end == false && player.distance < 3420) {
          player.distance += 10

          player.update();
        }
        console.log(player.distance);

        if (player.distance >= 3420 && player.end == false) {
          console.log("carEnd " + carEnd + " player.end " + player.end + " player.distance " + player.distance)
          carEnd = carEnd + 1;
          player.updateRank(carEnd)
          Player.updatecarEnd(carEnd)
          player.end = true;
        }

        if (carEnd == 4) {
          console.log("CarEnd is 4")
          game.update(2);
        }
      }
    }
    drawSprites();
  }


  end() {
    console.log("gameEnd");
    camera.position.x=0;
    camera.position.y=0;
    Player.getPlayerInfo();

    textAlign(CENTER);
    textSize(50);
    fill("black");
    textStyle(BOLDITALIC);
    stroke("red");
    
    for (var plr in allPlayers) {
      if(allPlayers[plr].rank==1){
        text("1st: " + allPlayers[plr].name, 0,-60)
      }else if(allPlayers[plr].rank==2){
        text("2nd: " + allPlayers[plr].name,0,-10)
      }else if(allPlayers[plr].rank==3){
        text("3rd "+ allPlayers[plr].name,0,50)
      } else if(allPlayers[plr].rank ==4){
         text("4th " + allPlayers[plr].name,0,100);
      }
    }

  }
}


