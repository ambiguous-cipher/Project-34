//Create variables here
var cheems, normalCheems, happyCheems;
var database;
var foodS;
var foodStock;


function preload(){
  //load images here
  normalCheems = loadImage("images/dogImg.png");
  happyCheems = loadImage("images/dogImg1.png");
}

function setup(){
  createCanvas(500, 500);
  cheems = createSprite(250, 250, 10, 10)
    cheems.addImage(normalCheems)
    cheems.scale = 0.25;

  database = firebase.database();
  foodStock = database.ref("Food")
    foodStock.on("value", readStock)
}


function draw(){  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    cheems.addImage(happyCheems);
  }

  drawSprites();
  //add styles here
  fill(255)
  textSize(32)
  text("Amount of food for Cheems: " + foodS, 25, 100);
  
  textSize(15)
  text("Hint: press the up arrow to feed Cheems", 125, 400);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}