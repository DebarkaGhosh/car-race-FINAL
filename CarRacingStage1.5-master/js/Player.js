class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = 0;
    this.end = false;
    }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  getcarEnd(){
   var carEndRef = database.ref('carEnd');
   carEndRef.on("value",(data)=>{

    carEnd = data.val();
   })
  }

  static updatecarEnd(rank){
    database.ref('/').update({
      carEnd : rank 
    })
  }

  updateRank(rank){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
     rank:rank
    });
  }
}
