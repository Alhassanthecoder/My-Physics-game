const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fruit, ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button, button2, button3;
var bunny;
var blink, eat, sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  starImg = loadImage("star.png")
  emptyStars = loadAnimation("empty.png")
  oneStar = loadAnimation("one_star.png")
  fullStars = loadAnimation("stars.png")


  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {
  createCanvas(600, 700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  starCount = 0

  //button 1
  button = createImg('cut_btn.png');
  button.position(300, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  //button 2
  button2 = createImg('cut_btn.png');
  button2.position(550,300);
  button2.size(50, 50);
  button2.mouseClicked(drop2);


  rope = new Rope(8, { x: 300, y: 30 });
  rope2 = new Rope(6, { x: 550, y: 300 });
 

  blower = createImg("balloon2.png")
  blower.position(width / 2 - 0, height - 300)
  blower.size(100, 120)
  blower.mouseClicked(Force)

  greyStars = createSprite(50, 50)
  greyStars.addAnimation("empty", emptyStars)
  greyStars.addAnimation("one_star", oneStar)
  greyStars.addAnimation("fullStar", fullStars)
  greyStars.scale = 0.25

  mute_btn = createImg('mute.png');
  mute_btn.position(width - 50, 20);
  mute_btn.size(50, 50);
  mute_btn.mouseClicked(mute);

  ground = new Ground(width / 2, height, width, 20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(150, height - 80, 100, 100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');

  star = createSprite(120, height - 300)
  star.addImage(starImg)
  star.scale = 0.02

  star2 = createSprite(width / 2 - 68, 200)
  star2.addImage(starImg)
  star2.scale = 0.02

  isTouched = false


  fruit = Bodies.circle(width / 2, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
  fruit_con_2 = new Link(rope2, fruit);
 

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() {
  background(51);
  image(bg_img, 0, 0, width, height);

  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop();

  if (collide(fruit, star)) {
    star.position.x = width + 100
    starCount +=1 
  }

  if (collide(fruit, star2)) {
    star2.position.x = width + 100
    starCount +=1 
  }
  if (starCount == 1) {
    greyStars.changeAnimation("one_star")
  }
  else if (starCount == 2 ) {
    greyStars.changeAnimation("fullStar")
  }
  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();


  drawSprites();

  if (collide(fruit, bunny) == true) {
    World.remove(engine.world, fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if (fruit != null && fruit.position.y >= 650) {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit = null;
  }

}

function drop() {
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null;
}

function drop2() {
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function drop3() {
  cut_sound.play();
  rope3.break();
  fruit_con_3.dettach();
  fruit_con_3 = null;
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {
      return true;
    }
    else {
      return false;
    }
  }
}



function mute() {
  if (bk_song.isPlaying()) {
    bk_song.stop();
  }
  else {
    bk_song.play();
  }
}

function Force() {
  Matter.Body.applyForce(fruit, fruit.position, { x: -0.02, y: -0.02 })

}

