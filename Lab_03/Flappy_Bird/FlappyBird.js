const STATE = {
  GET_READY: 0,
  GAME: 1,
  FALLING: 2,
  GAME_OVER: 3,
};
let currentState = STATE.GET_READY;

//fps parameters
let lastTime = 0;
let pipeTimer = 0;
let birdAnimationTimer = 0;
const pipeInterval = 1500;

//drawing scale
let drawScale = 2;

//board
let board;
let boardWidth = 288;
let boardHeight = 512;
let context;

//bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardHeight / 9; //default: 8
let birdY = boardHeight / 2;
let birdImages = [];
let birdFrame = 0;
let frameCount = 0;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

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
  x: baseX,
  y: baseY,
  width: baseWidth,
  height: baseHeight,
};

//physics
let velocityX = -0.5; //pipes coming towards left speed
let velocityY = 0;
let gravity = 0.06;

let gameOver = false;
let score = 0;

//audio
let dieSound;
let hitSound;
let pointSound;
let swooshSound;
let wingSound;

//score font
let scoreImages = [];

//different screens
let messageImg;
let gameOverImg;

//scoreboard
let scoreboardImg;
let medalBronzeImg;
let medalSilverImg;
let medalGoldImg;
let medalPlatinumImg;

window.onload = function () {
  // context.imageSmoothingEnabled = false;
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

  const bgMusic = new Audio("./assets/Sound Efects/Pixelated Sky.mp3");
  bgMusic.loop = true;
  bgMusic.volume = 0.1;
  bgMusic.play();

  //score images
  scoreImages = [];
  for (let i = 0; i < 10; i++) {
    let img = new Image();
    img.src = `./assets/UI/Numbers/${i}.png`;
    scoreImages.push(img);
  }

  //different screens
  messageImg = new Image();
  messageImg.src = "./assets/UI/message.png";

  gameOverImg = new Image();
  gameOverImg.src = "./assets/UI/gameover.png";

  //scoreboard
  scoreboardImg = new Image();
  scoreboardImg.src = "./assets/UI/scoreboard.png";

  medalBronzeImg = new Image();
  medalBronzeImg.src = "./assets/UI/Medals/bronze.png";
  medalSilverImg = new Image();
  medalSilverImg.src = "./assets/UI/Medals/silver.png";
  medalGoldImg = new Image();
  medalGoldImg.src = "./assets/UI/Medals/gold.png";
  medalPlatinumImg = new Image();
  medalPlatinumImg.src = "./assets/UI/Medals/platinum.png";

  this.requestAnimationFrame(update);
  this.document.addEventListener("keydown", moveBird);
  this.document.addEventListener("mousedown", moveBird);
  this.document.addEventListener("touchstart", moveBird);
};

function update(timestamp) {
  context.imageSmoothingEnabled = false;
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  if (!lastTime) lastTime = timestamp;

  let deltaTimeMs = timestamp - lastTime;
  lastTime = timestamp;

  let delta = deltaTimeMs / (1000 / 180);

  frameCount++;

  if (currentState == STATE.GET_READY) {
    //bird animation
    birdAnimationTimer += delta;
    if (birdAnimationTimer > 25) {
      birdFrame++;
      birdFrame %= 4;
      birdAnimationTimer = 0;
    }

    let centerBirdY = birdY;
    let floatY = Math.sin(frameCount * 0.05) * 5;
    let currentBirdImg = birdImages[birdFrame];
    context.drawImage(
      currentBirdImg,
      bird.x,
      centerBirdY + floatY,
      bird.width,
      bird.height
    );
    base.x += velocityX;
    context.drawImage(baseImg, base.x, base.y, base.width, base.height);

    if (base.x <= boardWidth - baseWidth) base.x = 0;

    if (messageImg) {
      let msgX = (boardWidth - messageImg.width) / 2;
      let msgY = 65;
      context.drawImage(messageImg, msgX, msgY);
    }
  } else if (currentState == STATE.GAME) {
    birdAnimationTimer += delta;
    if (birdAnimationTimer > 15) {
      birdFrame++;
      birdFrame %= 4;
      birdAnimationTimer = 0;
    }

    bird.y = Math.max(bird.y + (velocityY * delta), -boardHeight / 5);
    velocityY += gravity * delta;

    //bird
    let currentBirdImg = birdImages[birdFrame];

    context.save();

    let birdCenterX = bird.x + bird.width / 2;
    let birdCenterY = bird.y + bird.height / 2;
    context.translate(birdCenterX, birdCenterY);
    let rotation = velocityY * 0.2;
    if (rotation > Math.PI / 2) rotation = Math.PI / 2;
    context.rotate(rotation);
    context.drawImage(
      currentBirdImg,
      -bird.width / 2,
      -bird.height / 2,
      bird.width,
      bird.height
    );

    context.restore();

    //pipes

    pipeTimer += deltaTimeMs;
    if (pipeTimer > pipeInterval) {
      placePipes();
      pipeTimer = 0;
    }

    for (let i = 0; i < pipeArray.length; i++) {
      let pipe = pipeArray[i];
      pipe.x += velocityX * delta;

      if (pipe.isTopPipe) {
        context.save();
        context.translate(pipe.x, pipe.y);
        context.scale(1, -1);
        context.translate(0, -pipe.height);

        context.drawImage(pipeImg, 0, 0, pipe.width, pipe.height);

        context.restore();
      } else {
        context.drawImage(pipeImg, pipe.x, pipe.y, pipe.width, pipe.height);
      }

      if (pipe.isTopPipe && !pipe.passed && bird.x > pipe.x + pipe.width / 2) {
        pointSound.play();
        score += 1;
        pipe.passed = true;
      }

      if (detectCollision(bird, pipe)) {
        currentState = STATE.FALLING;
        saveScore(score);
      }
    }

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth)
      pipeArray.shift();

    //base
    base.x += velocityX * delta;
    context.drawImage(baseImg, base.x, base.y, base.width, base.height);
    if (base.x <= boardWidth - baseWidth) base.x = 0;
    if (detectCollision(bird, base)) {
      currentState = STATE.GAME_OVER;
      saveScore(score);
    }

    drawScore(score, boardWidth / 2, boardHeight / 8, true);
  } else if (currentState == STATE.FALLING) {
    for (let i = 0; i < pipeArray.length; i++) {
      let pipe = pipeArray[i];
      if (pipe.isTopPipe) {
        context.save();
        context.translate(pipe.x, pipe.y);
        context.scale(1, -1);
        context.translate(0, -pipe.height);
        context.drawImage(pipeImg, 0, 0, pipe.width, pipe.height);
        context.restore();
      } else {
        context.drawImage(pipeImg, pipe.x, pipe.y, pipe.width, pipe.height);
      }
    }

    bird.y += velocityY * delta;
    velocityY += gravity * delta;

    let currentBirdImg = birdImages[1];
    context.save();
    let birdCenterX = bird.x + bird.width / 2;
    let birdCenterY = bird.y + bird.height / 2;
    context.translate(birdCenterX, birdCenterY);

    let rotation = velocityY * 0.6;
    if (rotation > Math.PI / 2) rotation = Math.PI / 2;

    context.rotate(rotation);
    context.drawImage(
      currentBirdImg,
      -bird.width / 2,
      -bird.height / 2,
      bird.width,
      bird.height
    );
    context.restore();

    context.drawImage(baseImg, base.x, base.y, base.width, base.height);

    if (bird.y + bird.height >= base.y) {
      dieSound.play();
      currentState = STATE.GAME_OVER;
    }

    drawScore(score, boardWidth / 2, boardHeight / 8, true);
  } else if (currentState == STATE.GAME_OVER) {
    for (let i = 0; i < pipeArray.length; i++) {
      let pipe = pipeArray[i];
      if (pipe.isTopPipe) {
        context.save();
        context.translate(pipe.x, pipe.y);
        context.scale(1, -1);
        context.translate(0, -pipe.height);
        context.drawImage(pipeImg, 0, 0, pipe.width, pipe.height);
        context.restore();
      } else {
        context.drawImage(pipeImg, pipe.x, pipe.y, pipe.width, pipe.height);
      }
    }

    context.drawImage(baseImg, base.x, base.y, base.width, base.height);

    context.save();
    let birdCenterX = bird.x + bird.width / 2;
    let birdCenterY = bird.y + bird.height / 2;
    context.translate(birdCenterX, birdCenterY);
    context.rotate(Math.PI / 2);
    context.drawImage(
      birdImages[1],
      -bird.width / 2,
      -bird.height / 2,
      bird.width,
      bird.height
    );
    context.restore();

    if (gameOverImg) {
      let goX = (boardWidth - gameOverImg.width) / 2;
      let goY = boardHeight / 4;
      context.drawImage(gameOverImg, goX, goY);
    }

    let scale = 2;

    if (scoreboardImg) {
      let sbWidth = scoreboardImg.width * scale;
      let sbHeight = scoreboardImg.height * scale;

      let sbX = (boardWidth - scoreboardImg.width * scale) / 2;
      let sbY = boardHeight / 2 - 50;

      context.drawImage(scoreboardImg, sbX, sbY, sbWidth, sbHeight);

      // medals
      let medalToDraw = null;
      if (score >= 10) medalToDraw = medalBronzeImg;
      if (score >= 20) medalToDraw = medalSilverImg;
      if (score >= 30) medalToDraw = medalGoldImg;
      if (score >= 40) medalToDraw = medalPlatinumImg;

      if (medalToDraw) {
        //
        let medalX = sbX + 13 * scale;
        let medalY = sbY + 21 * scale;

        let medalW = medalToDraw.width * scale;
        let medalH = medalToDraw.height * scale;

        context.drawImage(medalToDraw, medalX, medalY, medalW, medalH);
      }

      let numberScale = 0.5;

      let scoreY = sbY + 18 * scale;
      let bestY = sbY + 38 * scale;

      let scoreWindowCenterX = sbX + scoreboardImg.width * scale * 0.82;

      drawScore(score, scoreWindowCenterX, scoreY, true, numberScale);
      let best = localStorage.getItem("flappyHighScores")
        ? JSON.parse(localStorage.getItem("flappyHighScores"))[0]
        : 0;
      drawScore(best, scoreWindowCenterX, bestY, true, numberScale);
    }
  }
}

function placePipes() {
  if (currentState == STATE.GAME_OVER) return;

  let randomPipeY = pipeY - pipeHeight / 3 - Math.random() * (pipeHeight / 2);
  let openingSpace = board.height / 4;

  let topPipe = {
    img: pipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
    isTopPipe: true,
  };

  pipeArray.push(topPipe);

  let bottomPipe = {
    img: pipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
    isTopPipe: false,
  };

  pipeArray.push(bottomPipe);
}

function moveBird(e) {
  if (
    e.code == "Space" ||
    e.code == "ArrowUp" ||
    e.type == "mousedown" ||
    e.type == "touchstart"
  ) {
    if (currentState == STATE.GET_READY) {
      pipeArray = [];
      swooshSound.play();
      currentState = STATE.GAME;
      bird.y = birdY;
      velocityY = -2.7;
      wingSound.play();
      return;
    }

    if (currentState == STATE.GAME) {
      velocityY = -2.7;
      wingSound.currentTime = 0;
      wingSound.play();
      return;
    }

    if (currentState == STATE.FALLING) {
      return;
    }

    if (currentState == STATE.GAME_OVER) {
      bird.y = birdY;
      pipeArray = [];
      score = 0;
      velocityY = 0;
      currentState = STATE.GET_READY;
      return;
    }
  }
}

function detectCollision(a, b) {
  let padding = 2;
  didCollide =
    a.x + padding < b.x + b.width &&
    a.x + a.width - padding > b.x &&
    a.y + padding < b.y + b.height &&
    a.y + a.height - padding > b.y;
  if (didCollide) {
    dieSound.play();
    hitSound.play();
  }
  return didCollide;
}

function saveScore(currentScore) {
  let highScores = JSON.parse(localStorage.getItem("flappyHighScores")) || [];

  highScores.push(currentScore);

  highScores.sort((a, b) => b - a);

  highScores = highScores.slice(0, 5);

  localStorage.setItem("flappyHighScores", JSON.stringify(highScores));
}

function drawScore(currentScore, centerX, centerY, centered, scale = 1) {
  let scoreStr = currentScore.toString();
  let totalScoreWidth = 0;

  for (let i = 0; i < scoreStr.length; i++) {
    let digit = parseInt(scoreStr[i]);
    let img = scoreImages[digit];
    if (img && img.complete && img.naturalWidth > 0) {
      totalScoreWidth += img.width * scale;
    }
  }

  let spacing = 2 * scale;
  totalScoreWidth += spacing * (scoreStr.length - 1);

  let currentX = centered ? centerX - totalScoreWidth / 2 : centerX;

  for (let i = 0; i < scoreStr.length; i++) {
    let digit = parseInt(scoreStr[i]);
    let img = scoreImages[digit];

    if (img && img.complete && img.naturalWidth > 0) {
      context.drawImage(
        img,
        currentX,
        centerY,
        img.width * scale,
        img.height * scale
      );

      currentX += img.width * scale + spacing;
    }
  }
}