var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, ib;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.35;

  doorsGroup=new Group();
  climbersGroup=new Group();
  
  invisibleBlockGroup=new Group();
}

function draw() {
  
  background("black");
  if(gameState==="play"){
  spawnDoors();
  if(tower.y > 400){
      tower.y = 300
    }
    if (keyDown(UP_ARROW)){
      ghost.velocityY=-5;
    }
    if (keyDown(LEFT_ARROW)){
      ghost.x-=3;
    }
    if (keyDown(RIGHT_ARROW)){
      ghost.x+=3;
    }
    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
      
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end"
    }
    ghost.velocityY=ghost.velocityY+0.8
    drawSprites();
}
if(gameState==="end"){
  textSize(30);
  stroke("yellow")
  text("Game Over",220,300);
}
}

function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(Math.round(random(100,500)),-50)
    door.addImage(doorImg);
    door.velocityY=1
    door.lifetime=650;
    doorsGroup.add(door);
    climber=createSprite(door.x,door.y+50);
    climber.velocityY=door.velocityY;
    climber.addImage(climberImg);
    climber.lifetime=door.lifetime;
    climbersGroup.add(climber);
    ib=createSprite(climber.x,climber.y+5,climber.width,2);
    ib.velocityY=1
    ib.lifetime=650;
    invisibleBlockGroup.add(ib);
    ib.visible=false;
  }
}
