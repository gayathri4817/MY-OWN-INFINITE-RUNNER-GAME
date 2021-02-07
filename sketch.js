var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backgr,backgrImage;

var car,carImage;

var coin,coinImage;

var drum,drumImage;

var obstacle,obstacleImage;

var black,blackImage;

var score;


function preload(){
  
  backgrImage = loadImage("backgroun.png");
  
  carImage = loadImage("car.png");
  
  coinImage = loadImage("coin.png");
  
  drumImage = loadImage("drum.jpg");
  
  obstacleImage = loadImage("obstacle.png");
  
  blackImage = loadImage("black.jpg");
}


function setup() {
  createCanvas(400,500);
  
  backgr = createSprite(200,200,100,100);
  backgr.addImage(backgrImage);
  backgr.scale = 1.0;
  backgr.velocityY = 3;

  
  car = createSprite(200,350,100,100);
  car.addImage(carImage);
  car.scale = 0.1;
  car.setCollider("rectangle",0,0);
  car.debug = false;
  
  black = createSprite(200,200,100,100);
  black.addImage(blackImage);
  
  drumGroup = new Group();
  obstacleGroup = new Group();
  coinGroup = new Group();
  
  score = 0;
}


function draw() {
  background(0);
  if(gameState === PLAY){
    
    
  if(backgr.y > 300){
  backgr.y = 260;
 }
    
    black.visible = false;
    
 if(keyDown("left_Arrow")){
car.x = car.x-5;
 } 
  
 if(keyDown("right_Arrow")){
car.x = car.x+5; 
 }
    
 if(coinGroup.isTouching(car)){
  score = score + 1
  coinGroup.destroyEach();
 }
      
      backgr.velocityY = (4+(score/2));
  
    if(drumGroup.isTouching(car) || obstacleGroup.isTouching(car)){
  car.destroy();
  drumGroup.destroyEach(0);
  obstacleGroup.destroyEach(0);
  coinGroup.destroyEach(0);
  gameState = END;
 } 
    spwanDrum();
  spwanObstacle();
  spwanCoin();
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("white");
  text("Score : " + score,50,50);

    
 
  }
  
 else if (gameState === END){
   stroke("yellow");
    fill("yellow");
    textSize(30);
   
  text("Game Over", 100,250)
   // black.visible = true;
   // backgr.velocityY = 0;
   // coinGroup.setVelocityYEach(0);
   // drumGroup.setVelocityYEach(0);
   // obstacleGroup.setVelocityYEach(0);
   // 
   //drumGroup.setLifetimeEach(-1);
   //obstacleGroup.setLifetimeEach(-1);  
 }
} 
  

function spwanCoin(){
 
  if(frameCount % 180 === 0){
  coin = createSprite(400,200,100,100);
  coin.addImage(coinImage);
  coin.velocityY = 3;
  coin.x = Math.round(random(100,400));
  coin.scale = 0.05;
  coin.lifetime = 200;
  coinGroup.add(coin);
  coin.velocityY = (4+(score/2));
  coin.setCollider("circle",0,0);
  coin.debug = false;
  } 
}


function spwanDrum(){
  
  if(frameCount % 280 === 0){
    drum = createSprite (400,150,100,100);
    drum.addImage(drumImage);
    drum.velocityY = 3;
    drum.x = Math.round(random(100,400));
    drum.scale = 0.2;
    drum.lifetime = 300;
    drumGroup.add(drum);
    drum.setCollider("rectangle",0,0);
    drum.debug = false;
  }
}

function spwanObstacle(){
  
  if(frameCount % 380 === 0){
    obstacle = createSprite (400,100,100,100);
    obstacle.addImage(obstacleImage);
    obstacle.velocityY = 3;
    obstacle.x = Math.round(random(100,400));
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("circle",0,0);
    obstacle.debug = false;
  }
}