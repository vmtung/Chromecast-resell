;(function() {
  var t = function() {
      this.rotation += 0.01
    },
    n
  ;(showStartGameUI = function() {
    const btnStartGamePos = 0.5 // 0.618
    ;(gameState = GAME_READY),
      (ui_gameTitle = particleSystem.createParticle(SPP.SpriteImage)),
      (ui_gameTitle.regX = ui_gameTitle.regY = 0),
      ui_gameTitle.init(
        0,
        -assetsManager.gametitle.height,
        Infinity,
        assetsManager.gametitle,
        topContext
      ),
      TweenLite.to(ui_gameTitle.position, 0.5, { y: 0 }),
      (ui_newGame = particleSystem.createParticle(SPP.SpriteImage)),
      ui_newGame.init(
        gameWidth * btnStartGamePos,
        gameHeight * btnStartGamePos,
        Infinity,
        assetsManager.newgame,
        topContext
      ),
      (ui_newGame.scale = 5),
      (ui_newGame.alpha = 0),
      (ui_newGame.onUpdate = t),
      TweenLite.to(ui_newGame, 0.8, { scale: 1, alpha: 1, ease: Back.easeOut }),
      (ui_startFruit = fruitSystem.createParticle(FruitGame.Fruit)),
      ui_startFruit.addEventListener('dead', startGame)
    var n = assetsManager.getRandomFruit()
    ui_startFruit.init(
      gameWidth * btnStartGamePos,
      gameHeight * btnStartGamePos,
      Infinity,
      n.w,
      assetsManager.shadow,
      topContext
    ),
      (ui_startFruit.rotationStep = -0.02),
      (ui_startFruit.scale = 0),
      (ui_startFruit.alpha = 0),
      (ui_startFruit.textureObj = n),
      TweenLite.to(ui_startFruit, 1, { scale: 1, alpha: 1, ease: Back.easeOut })
  }),
    (hideStartGameUI = function() {
      ui_startFruit.removeEventListener('dead', startGame),
        TweenLite.to(ui_gameTitle.position, 0.8, {
          y: -assetsManager.gametitle.height
        }),
        TweenLite.to(ui_newGame, 0.8, {
          scale: 8,
          alpha: 0,
          onComplete: function() {
            ;(ui_gameTitle.life = 0), (ui_newGame.life = 0)
          }
        })
    }),
    (showScoreTextUI = function() {
      gameState != GAME_READY &&
        ((bottomContext.font = '36px Verdana'),
        bottomContext.fillText(' ' + score, 30, 6),
        (bottomContext.font = '16px Verdana'),
        bottomContext.fillText('Best:' + storage.highScore, 13, 50))
    }),
    (showScoreUI = function() {
      ;(ui_scoreIcon = particleSystem.createParticle(SPP.SpriteImage)),
        (ui_scoreIcon.regX = ui_scoreIcon.regY = 0),
        ui_scoreIcon.init(10, 10, Infinity, assetsManager.score, bottomContext),
        (ui_gameLife = particleSystem.createParticle(SPP.SpriteImage)),
        (ui_gameLife.regX = 1),
        (ui_gameLife.regY = 0),
        ui_gameLife.init(
          gameWidth,
          8,
          Infinity,
          ui_gamelifeTexture,
          bottomContext
        )
    }),
    (hideScoreUI = function() {
      ui_scoreIcon != undefined && (ui_scoreIcon.life = 0),
        ui_gameLife != undefined && (ui_gameLife.life = 0)
    }),
    (showGameoverUI = function() {
      ;(ui_gameOver = particleSystem.createParticle(SPP.SpriteImage)),
        ui_gameOver.init(
          gameWidth * 0.5,
          gameHeight * 0.5,
          Infinity,
          assetsManager.gameover,
          topContext
        ),
        (ui_gameOver.scale = 0),
        TweenLite.to(ui_gameOver, 0.8, {
          delay: 2,
          scale: 1,
          ease: Back.easeOut,
          onComplete: gameOverComplete
        })
    }),
    (n = function() {
      ;(ui_gameOver.life = 0), hideScoreUI(), showStartGameUI()
    }),
    (hideGameoverUI = function() {
      TweenLite.to(ui_gameOver, 0.8, {
        scale: 0,
        ease: Back.easeIn,
        onComplete: n
      })
    })
})()

function init() {
  ;(document.getElementById('loading').style.display = 'none'),
    (topCanvas = document.getElementById('top')),
    (topCanvas.style.display = 'block'),
    (topCanvas.width = gameWidth),
    (topCanvas.height = gameHeight),
    (topContext = topCanvas.getContext('2d')),
    (topContext.globalCompositeOperation = 'lighter'),
    (middleCanvas = document.getElementById('middle')),
    (middleCanvas.style.display = 'block'),
    (middleCanvas.width = gameWidth),
    (middleCanvas.height = gameHeight),
    (middleContext = middleCanvas.getContext('2d')),
    (bottomCanvas = document.getElementById('bottom')),
    (bottomCanvas.style.display = 'block'),
    (bottomCanvas.style.dispaly = 'none'),
    (bottomCanvas.width = gameWidth),
    (bottomCanvas.height = gameHeight),
    (bottomContext = bottomCanvas.getContext('2d')),
    (bottomContext.fillStyle = '#f6c223'),
    (bottomContext.textAlign = 'left'),
    (bottomContext.textBaseline = 'top'),
    (particleSystem = new SPP.ParticleSystem()),
    particleSystem.start(),
    (bladeSystem = new SPP.ParticleSystem()),
    bladeSystem.start(),
    (fruitSystem = new SPP.ParticleSystem()),
    fruitSystem.start(),
    (bombSystem = new SPP.ParticleSystem()),
    bombSystem.start(),
    (gravity = new SPP.Gravity(0.15)),
    (storage = {}),
    storage.highScore || (storage.highScore = 0),
    (gameState = GAME_READY),
    (score = 0),
    (gameLife = 3),
    (ui_gamelifeTexture = assetsManager['gamelife-3']),
    (gameLevel = 0.1),
    topCanvas.addEventListener('mousedown', mousedown, !1),
    topCanvas.addEventListener('mouseup', mouseup, !1),
    topCanvas.addEventListener('mousemove', mousemove, !1),
    topCanvas.addEventListener('touchmove', touchmove, !1),
    render(),
    enterGame()
}

function loadAssets() {
  console.log('loadAssets')
  var assetsManager = new FruitGame.AssetsManager();
  assetsManager.addEventListener('complete', init);
  assetsManager.start();
}

function leftClick(n) {
  return (
    window.focus(),
    n || (n = event),
    typeof n.which == 'undefined'
      ? n.button == 1
      : n.which == 1 || n.button == 0
  )
}
function nrc(n) {
  if (leftClick(n) == !1) return ce(n)
}
function cp(n) {
  n || (n = event),
    n.stopPropagation
      ? n.stopPropagation()
      : typeof n.cancelBubble != 'undefined' && (n.cancelBubble = !0)
}
function ce(n) {
  return (
    n || (n = event),
    typeof n.preventDefault != 'undefined'
      ? n.preventDefault()
      : typeof n.cancelBubble != 'undefined' &&
        ((n.returnValue = 0), (n.cancelBubble = !0)),
    !1
  )
}
function mousedown() {
  mousepressed = !0
}
function mouseup() {
  mousepressed = !1
}
function mousemove(n) {
  mousepressed &&
    (n.layerX || n.layerX == 0
      ? ((mouse.x = n.layerX), (mouse.y = n.layerY))
      : (n.offsetX || n.offsetX == 0) &&
        ((mouse.x = n.offsetX), (mouse.y = n.offsetY)),
    buildBladeParticle(mouse.x, mouse.y))
}
function touchmove(n) {
  n.preventDefault(),
    (mouse.x = n.touches[0].pageX),
    (mouse.y = n.touches[0].pageY),
    buildBladeParticle(mouse.x, mouse.y)
}
function enterGame() {
  showStartGameUI()
}
function resetGameData() {
  ;(gameState = GAME_READY),
    (score = 0),
    (gameLife = 3),
    (ui_gamelifeTexture = assetsManager['gamelife-3']),
    (gameLevel = 0.1)
}
function startGame() {
  hideStartGameUI(), resetGameData(), showScoreUI(), (gameState = GAME_PLAYING)
  // document.getElementById('moreGames').style.display = 'none'
}
function renderTimer() {
  gameState == GAME_PLAYING &&
    ((timer += SPP.frameTime),
    timer >= interval && ((timer = 0), throwObject()))
}
function throwObject() {
  for (var t = ((Math.random() * 4) >> 0) + 1, n = 0; n < t; n++)
    isThrowBomb() ? throwBomb() : throwFruit()
  createjs.Sound.play('throwFruit')
}
function isThrowBomb() {
  var n = Math.random() * 2
  return n < gameLevel ? !0 : !1
}
function levelUpdate() {
  ;(gameLevel += levelStep), gameLevel > 1 && (gameLevel = 0.1)
}
function gameOver() {
  if (gameState != GAME_OVER) {
    for (var n = fruitSystem.getParticles().length; n-- > 0; )
      fruitSystem.getParticles()[n].removeEventListener('dead', missHandler)
    ;(gameState = GAME_OVER),
      (gameLife = 0),
      (ui_gamelifeTexture = assetsManager['gamelife-' + gameLife]),
      (ui_gameLife.texture = ui_gamelifeTexture),
      score > parseInt(storage.highScore) && (storage.highScore = score),
      showGameoverUI()
  }
}
function gameOverComplete() {
  console.log('gameover', score)
  replay()
}
function replay() {
  hideGameoverUI()
  // document.getElementById('moreGames').style.display = 'block'
}
function handmove(n) {
  buildBladeParticle(n.x, n.y)
}
function render() {
  requestAnimationFrame(render),
    topContext.clearRect(0, 0, gameWidth, gameHeight),
    middleContext.clearRect(0, 0, gameWidth, gameHeight),
    bottomContext.clearRect(0, 0, gameWidth, gameHeight),
    showScoreTextUI(),
    fruitSystem.render(),
    bombSystem.render(),
    particleSystem.render(),
    bladeSystem.render(),
    buildColorBlade(bladeColor, bladeWidth),
    collideTest(),
    levelUpdate(),
    renderTimer()
}
function initControl() {
  return
  var n
}
var mousepressed = !1,
  stats,
  GameControl
typeof document.oncontextmenu != 'undefined'
  ? (document.oncontextmenu = ce)
  : (document.onclick = nrc),
  (window.onload = loadAssets),
  (GameControl = {
    message: 'Game Control',
    moveThreshold: 5,
    depthThreshold: 70,
    displayShadow: !0,
    mirror: !0
  })
