let ground;
let lander;
var lander_img;
var bg_img;
var meteor, meteorGroup, meteor_img;
var gameState = "play";


var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  meteor_img = loadImage("meteor.png");

}

function setup() {
  createCanvas(windowWidth-50, windowHeight-50);
  frameRate(80);

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;

  meteorGroup = new Group();

  lander.velocityY = 0;

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  imageMode(CENTER);
  
  image(bg_img,width/2, height/2, width, height);
  if(gameState === "play"){
    if(keyDown(LEFT_ARROW)){
    lander.x -= 5;
    }

    if(keyDown(RIGHT_ARROW)){
      lander.x += 5;
    }

    if(keyDown(UP_ARROW)){
      lander.velocityY -= 0.5;

    }
    vy +=g;
    lander.position.y+=vy;

    createObstacles();

    if(meteorGroup.isTouching(lander)){
      gameState = "end";
    }
    
    
  }
   


  if(gameState === "end"){
    fill("white");
    textSize(35);
    text("You Died!", width/2 - 35, height/2);
    
    fill("white");
    textSize(40);
    text("Try not to touch the asteroid next time!", width/2 - 300, height-200)
    meteorGroup.destroyEach();
  }
  push()
  fill(255);
  pop();

  
 
  

  
  
  drawSprites();
}

function createObstacles(){
  if(frameCount%60==0){
    meteor = createSprite(width-100,random(20,height-20),20,20);
    meteor.addImage(meteor_img);
    meteor.velocityX = -3;
    meteor.scale = 0.4;
    meteorGroup.add(meteor)
    meteor.lifetime = 650;
  }

}
