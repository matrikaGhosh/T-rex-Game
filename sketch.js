var trex,trex_run,trex_dead;
var ground,ground_img,invisibleGround;
var cloud, cloud_img
var cactus, cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;
var score = 0
var play = 1     
var end = 0
var gameState = play
var Cgroup, Ogroup;
var gameover,gameover_img;
var reload,reload_img;
var cP, jump, die;

function preload(){
  trex_run = loadAnimation('trex1.png','trex3.png','trex4.png');
  trex_dead = loadAnimation('trex_collided.png');
  ground_img = loadImage('ground2.png');
  cloud_img = loadImage('cloud.png');
  cactus1 = loadImage('obstacle1.png');
  cactus2 = loadImage('obstacle2.png');
  cactus3 = loadImage('obstacle3.png');
  cactus4 = loadImage('obstacle4.png');
  cactus5 = loadImage('obstacle5.png');
  cactus6 = loadImage('obstacle6.png');
  gameover_img = loadImage('gameOver.png');
  reload_img = loadImage('restart.png');
  
  cP= loadSound('checkPoint.mp3');
  die= loadSound('die.mp3');
  jump= loadSound('jump.mp3');
  
}

function setup(){
  
  createCanvas(600,300)
  trex= createSprite(50,267);
  trex.addAnimation('running',trex_run);
  trex.addAnimation('deadtrex',trex_dead);
  trex.scale=0.6
  
  ground= createSprite(300,270,600,10)
  ground.addImage('ground10',ground_img);
  //console.log(ground.width);
  ground.x= ground.width/2
 
  invisibleGround= createSprite(300,275,600,3)
  invisibleGround.visible= false;
  
  gameover = createSprite(300,120);
  gameover.addImage('gameover',gameover_img);
  
  reload = createSprite(300,180);
  reload.addImage('reload', reload_img);
  reload.scale= 0.5
    
  Cgroup = new Group();
  Ogroup = new Group(); 
  edges=createEdgeSprites()
}

function draw(){
  background('yellow');

  if(gameState===play){
      if(keyDown('space')&& trex.y>=245){
      jump.play();
     trex.velocityY=-10
    }
    score= score+(Math.round(getFrameRate()/30))
   //gives gravity to the trex to come down. 
     trex.velocityY= trex.velocityY+0.5
        createCactus();
  createClouds();
    
     ground.velocityX= -5;
  
    // repeats the ground.
   if(ground.x<0){
     
     ground.x= ground.width/2
     
     }
    
    if(score%100===0&&score>0){
       cP.play();
       
       
       }
    
    if(trex.isTouching(Ogroup)){
        gameState=end;
        die.play();
        }
     gameover.visible=false;
     reload.visible= false; 
    
     }
  else if(gameState===end){
          ground.velocityX = 0;
          Ogroup.setVelocityXEach(0);
          Cgroup.setVelocityXEach(0);
          gameover.visible=true;
          reload.visible=true;
    // the obstacles should not reach by 0
          Cgroup.setLifetimeEach(-1);
          Ogroup.setLifetimeEach(-1);
          trex.changeAnimation('deadtrex',trex_dead);   
    
  }
    
          
 // console.log(trex.y);
 
    textSize(20)
  text('score='+score,280,50)  
  
 if(mousePressedOver(reload)){
    gameState=play;
    Cgroup.destroyEach();
    Ogroup.destroyEach();
    trex.changeAnimation('running',trex_run);
    score = 0;
 }
  
    trex.collide(invisibleGround);
     
  
  drawSprites();
 } 

function createClouds(){
  if(frameCount%60===0){
 cloud = createSprite(600,random(50,180));
 cloud.addImage('CLOUD',cloud_img);
 cloud.velocityX = -5
    // console.log(trex.depth)
     //console.log(cloud.depth)
     trex.depth = cloud.depth+1
     Cgroup.add(cloud)
     cloud.lifetime= 120;
     }
    
  
}

function createCactus(){
  if(frameCount%80===0){
    cactus = createSprite(600,250,60,60)
  cactus.velocityX=-5
    var r = Math.round(random(1,6));
    console.log(r)
    switch(r){
      case 1: cactus.addImage(cactus1);
       break;
       case 2: cactus.addImage(cactus2);
          break;
          case 3 : cactus.addImage(cactus3);
             break;
             case 4 : cactus.addImage(cactus4);
               break;
               case 5 : cactus.addImage(cactus5);
                 break;
                 case 6 :cactus.addImage(cactus6);
                   break;
           }
       cactus.scale= 0.5
       Ogroup.add(cactus)
       cactus.lifetime= 120;
  }
}