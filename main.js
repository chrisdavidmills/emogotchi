 // declare global variables

var score;
var whingeTally = 0;

function init() {
  score = 9500;
}

var quotes = [
  'Hey! My mascara has run out. I\'m so depressed!',
  'Why does no one love me?',
  'You just don\'t care about real problems like mine.',
  'My dress is not as dark as my soul...',
  'Why? Whhhyyyyyy?',
  'I\'m hungry! Why is there nothing to eat around here?',
  'I hate it when people say I look like a goth. Emos are so different.',
  'My floor-length leather trenchcoat makes me feel too hot...',
  'My thoughts give way to nothing but dark sollioquies.',
  'My toast is slightly burnt. Please end my suffering.'
]

var welcomePanel = document.querySelector('.welcome');
var welcomePara = document.querySelector('.welcome p');

var curLevel = document.querySelector('.current-level');
var curLevelPara = document.querySelector('.misery p');

var mainImage = document.querySelector('.game img');
var curImage = 'emo';
var updateImage = 'emo';

var btnStart = document.querySelector('.start');
var btnScore = document.querySelectorAll('.button-bar button');

// wire up buttons

btnStart.onclick = function() {
  welcomePanel.style.zIndex = '-1';
  init();
  mainLoop();
}

for(i = 0; i < btnScore.length; i++) {
  btnScore[i].onclick = function(e) {
    var scoreMod = e.target.getAttribute('data-score');
    var scoreNum = Number(scoreMod);
    score += scoreNum;
  };
}

// get permission to run notifications

Notification.requestPermission();

// update misery progress bar

function updateProgress() {
  var percent = Math.floor((score/10000) * 100);
  curLevel.style.width =  percent + '%';
  curLevelPara.textContent = 'Emo-level: ' + percent + '%';
}

// update current image display

function updateDisplay() {
  if(score > 10000) {
    score = 10000;
  }

  if(score <= 2000) {
    curImage = 'well-adjusted'; 
  } else if(score > 2000 && score <= 5000) {
    curImage = 'happy';
  } else if(score > 5000 && score <= 8000) {
    curImage = 'sad';
  } else if(score > 8000) {
    curImage = 'emo';
  }

  if(updateImage !== curImage) {
  	spawnNotification('Whaaa, I\'m becoming well-adjusted, pay attention to me!','img/' + curImage + '_head.png','Emogotchi says');
    mainImage.src = 'img/' + curImage + '.png';
    updateImage = curImage;
  }

  updateProgress();
}

// end the game, allow it to be restarted

function endGame() {
  welcomePanel.style.zIndex = '1';
  welcomePara.textContent = 'OH NO!! Your emo became too well-adjusted; now she\'ll be off to hang out at the mall, listen to Taylor Swift and bake cookies.'
  btnStart.textContent = 'Restart Emogotchi?';
  spawnNotification('YOU TOTAL LOSER. How could you do this to me?','img/' + curImage + '_head.png','Emogotchi says');
}

// spawn a permission

function spawnNotification(theBody,theIcon,theTitle) {
  var options = {
  	body: theBody,
  	icon: theIcon
  }
  var n = new Notification(theTitle,options);
  setTimeout(n.close.bind(n), 4000); 
}

function randomNotification() {
  var randomQuote = quoteChooser();
  var options = {
  	body: randomQuote,
  	icon: 'img/sad_head.png',
  } 

	var n = new Notification('Emogotchi says',options);
  setTimeout(n.close.bind(n), 4000); 
}

function quoteChooser() {
    var randomNumber = Math.floor(Math.random() * 10);
    quote = quotes[randomNumber];
	return quote;
}

// run main loop

function mainLoop() {
	score -= 3;
	whingeTally += 1;
	updateDisplay();
  if(score <= 0) {
    score = 0;
    endGame();
  } else {
    if(whingeTally % 750 === 0) {
      randomNotification();
    }
  
    window.requestAnimationFrame(mainLoop);
  }
}

// handle the sound

var emoSound = document.querySelector('audio');

