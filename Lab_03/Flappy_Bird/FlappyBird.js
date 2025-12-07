
const STATE = {
    GET_READY: 0,
    GAME: 1,
    FALLING: 2, // Ptak uderzył, spada na ziemię
    GAME_OVER: 3
};
let currentState = STATE.GET_READY;

//board
let board;
let boardWidth = 288;
let boardHeight = 512;
let context;

//bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardHeight/9; //default: 8
let birdY = boardHeight/2;
let birdImages = [];
let birdFrame = 0;
let frameCount = 0;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//pipes
let pipeArray = [];
let pipeWidth = 52;
let pipeHeight = 320;
let pipeX = boardWidth;
let pipeY = 0;

let pipeImg;

//base
let baseWidth = 336;
let baseHeight = 112;
let baseX = 0;
let baseY = boardHeight - baseHeight;

let base = {
    x : baseX,
    y : baseY,
    width : baseWidth,
    height : baseHeight
}

//physics
let velocityX = -0.5; //pipes coming towards left speed
let velocityY = 0;
let gravity = 0.05;

let gameOver = false;
let score = 0;

//audio
let dieSound;
let hitSound;
let pointSound;
let swooshSound;
let wingSound;


window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    //draw flappy bird
    //load images
    let birdImg1 = new Image();
    birdImg1.src = "./assets/Flappy Bird/yellowbird-upflap.png";

    let birdImg2 = new Image();
    birdImg2.src = "./assets/Flappy Bird/yellowbird-midflap.png";

    let birdImg3 = new Image();
    birdImg3.src = "./assets/Flappy Bird/yellowbird-downflap.png";

    birdImages = [birdImg1, birdImg2, birdImg3, birdImg2];

    baseImg = new Image();
    baseImg.src = "./assets/Flappy Bird/base.png";

    pipeImg = new Image();
    pipeImg.src = "./assets/Flappy Bird/pipe-green.png";

    //load sounds
    dieSound = new Audio();
    dieSound.src = "./assets/Sound Efects/die.wav";

    hitSound = new Audio();
    hitSound.src = "./assets/Sound Efects/hit.wav";

    pointSound = new Audio();
    pointSound.src = "./assets/Sound Efects/point.wav";

    swooshSound = new Audio();
    swooshSound.src = "./assets/Sound Efects/swoosh.wav";

    wingSound = new Audio();
    wingSound.src = "./assets/Sound Efects/wing.wav";

    const bgMusic = new Audio("./assets/Sound Efects/Pixelated Sky.mp3")
    bgMusic.loop = true;
    bgMusic. volume = 0.05;
    //bgMusic.play();

    this.requestAnimationFrame(update);
    this.setInterval(placePipes, 1500);
    this.document.addEventListener("keydown", moveBird);
    this.document.addEventListener("mousedown", moveBird);
    this.document.addEventListener("touchstart", moveBird);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver)
        return;
    context.clearRect(0, 0, board.width, board.height);

    frameCount++;

    //bird animation
    if (frameCount % 15 == 0) {
        birdFrame++;
        birdFrame %= 4;
    }

    //bird
    let currentBirdImg = birdImages[birdFrame];

    context.save();

    let birdCenterX = bird.x + bird.width / 2;
    let birdCenterY = bird.y + bird.height / 2;
    context.translate(birdCenterX, birdCenterY);
    let rotation = velocityY * 0.3;
    if(rotation > Math.PI / 2)
        rotation = Math.PI / 2;
    context.rotate(rotation);
    context.drawImage(currentBirdImg, -bird.width / 2, -bird.height / 2, bird.width, bird.height);

    context.restore();

    bird.y = Math.max(bird.y + velocityY, -boardHeight/5)
    velocityY+=gravity

    //pipes
    for(let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;

        if (pipe.isTopPipe){
            context.save();
            context.translate(pipe.x, pipe.y);
            context.scale(1, -1);
            context.translate(0, -pipe.height);

            context.drawImage(pipeImg, 0, 0, pipe.width, pipe.height);

            context.restore();
        }
        else{
            context.drawImage(pipeImg, pipe.x, pipe.y, pipe.width, pipe.height);
        }

        if (pipe.isTopPipe && !pipe.passed && bird.x > pipe.x + pipe.width/2){
            pointSound.play();
            score += 1;
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe))
            gameOver = true;
    }

    //clear pipes
    while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth)
        pipeArray.shift();

    //base
    base.x += velocityX;
    context.drawImage(baseImg, base.x, base.y, base.width, base.height);
    if (base.x <= boardWidth - baseWidth)
        base.x = 0;
    if (detectCollision(bird, base))
            gameOver = true;

    //score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if(gameOver){
        context.fillText("GAME OVER", 10,boardHeight/2);
    }
}

function placePipes(){
    if (gameOver)
        return

    let randomPipeY = pipeY - pipeHeight/3 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4


    let topPipe = {
        img: pipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false,
        isTopPipe : true
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img: pipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false,
        isTopPipe : false
    }

    pipeArray.push(bottomPipe);

}

function moveBird(e){
    if (e.code == "Space" || e.code == "ArrowUp" || e.type == "mousedown" || e.type == "touchstart"){
        //Fly up
        velocityY = -2.7;
        wingSound.currentTime = 0;
        wingSound.play();

        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision (a,b) {
    let padding = 3;
    didCollide = a.x + padding< b.x + b.width &&
                 a.x + a.width - padding> b.x &&
                 a.y + padding< b.y + b.height &&
                 a.y + a.height - padding> b.y;
    if (didCollide){
        dieSound.play();
        hitSound.play();
    }
    return didCollide
}

function saveScore(currentScore) {
    let highScores = JSON.parse(localStorage.getItem('flappyHighScores')) || [];

    highScores.push(currentScore);

    highScores.sort((a, b) => b - a);

    highScores = highScores.slice(0, 5);

    localStorage.setItem('flappyHighScores', JSON.stringify(highScores));
}