//Game States
var PLAY = 1;
var gameState = PLAY;
//Variables
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score , survivaltime
var ground;

//Animations Loading
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
//score and survivaltime
score = 0;
survivaltime = 0;

function setup() {
createCanvas(400,400)
//monkey
monkey = createSprite(80,315,20,20);
monkey.addAnimation("running", monkey_running);
monkey.scale = 0.1;
//ground
ground = createSprite(400,350,900,10);
ground.velocityX = -4;
ground.x = ground.width/2;
console.log(ground.x);
//Groups
obstaclesGroup = new Group();
bananaGroup = new Group();



  

  
}


function draw() {
background("lightblue"); 
//Score text
fill("black");
textSize(20);

text("Score:" + score, 300,100);
//Survival Time text
fill("red");
textSize(20);
text("SurvivalTime:" + survivaltime, 80, 100 );
  
   
  
 //Monkey collide
  monkey.collide(ground);
  //survival time to increase
if(gameState === PLAY) {
  survivaltime = survivaltime + 1;
monkey.changeAnimation("running", monkey_running);
survialTime = Math.ceil(frameCount/frameRate());

  if (ground.x < 0)
  ground.x = ground.width/2;
  ground.velocityX = -(4 + 3* score/100)
}
  //monkeyY velocity 
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }    
  //Score increasing
if (bananaGroup.isTouching(monkey)) {
bananaGroup.destroyEach();
score = score + 1;
}
//Gravity
monkey.velocityY = monkey.velocityY + 0.8;
//lifetime
obstaclesGroup.setLifetimeEach(-1);
//functions
food();
obstacles();
reset();


drawSprites();

  
}

//food function
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    bananaGroup.add(banana);
  }
}


//obstacles function
 function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstaclesGroup.add(obstacle);
  }

}

function reset() {
if(monkey.isTouching(obstaclesGroup)) {
  score = 0;
  survivaltime=0;
  
  
  
   
   }
}