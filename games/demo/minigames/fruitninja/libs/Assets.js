'use strict'

var // window.innerHeight,
  gameWidth = window.screen.availWidth  > 600 ? 600: window.screen.availWidth,
  gameHeight = window.screen.availHeight

var FruitGame = FruitGame || { REVISION: '1', AUTHOR: '', GITHUB: '' },
  // gameWidth = 750,
  // gameHeight = 500,
  topCanvas,
  topContext,
  middleCanvas,
  middleContext,
  bottomCanvas,
  bottomContext,
  particleSystem,
  fruitSystem,
  bombSystem,
  bladeSystem,
  gravity,
  timer = 0,
  interval = 1.8,
  bladeColor,
  bladeWidth,
  mouse = {},
  score,
  gameLife,
  storage,
  isPlaying,
  GAME_READY = 1,
  GAME_PLAYING = 2,
  GAME_OVER = 3,
  gameState,
  gameLevel,
  levelStep = 0.0001,
  ui_gameTitle,
  ui_newGame,
  ui_startFruit,
  ui_scoreIcon,
  ui_gameLife,
  ui_gamelifeTexture,
  ui_gameover,
  collide

FruitGame.assets = {
  fruits: ['apple', 'basaha', 'peach', 'sandia'],
  other: [
    { id: 'gameover', src: 'assets/gameover.png' },
    { id: 'gametitle', src: 'assets/gametitle.png' },
    { id: 'shadow', src: 'assets/shadow.png' },
    { id: 'bomb', src: 'assets/bomb.png' },
    { id: 'miss', src: 'assets/miss.png' },
    { id: 'star', src: 'assets/star.png' },
    { id: 'score', src: 'assets/score.png' },
    { id: 'gamelife-3', src: 'assets/gamelife-3.png' },
    { id: 'gamelife-2', src: 'assets/gamelife-2.png' },
    { id: 'gamelife-1', src: 'assets/gamelife-1.png' },
    { id: 'gamelife-0', src: 'assets/gamelife-0.png' },
    { id: 'newgame', src: 'assets/newgame.png' },
    // { id: 'throwFruit', src: 'assets/sound/throw-fruit.ogg' },
    // { id: 'bombExplode', src: 'assets/sound/bomb-explode.ogg' },
    // { id: 'splatter', src: 'assets/sound/splatter.ogg' }
  ]
}

// FruitGame._sounds = [
//   { id: 'throwFruit', src: 'assets/sound/throw-fruit.ogg' },
//   { id: 'bombExplode', src: 'assets/sound/bomb-explode.ogg' },
//   { id: 'splatter', src: 'assets/sound/splatter.ogg' }
// ]

// https://createjs.com/docs/soundjs/classes/Sound.html#method_registerPlugins
// createjs.Sound.alternateExtensions = ['mp3']



FruitGame.AssetsManager = function() {
  console.log('initSound')
  
  var u
  SPP.EventDispatcher.call(this)
  var i = this,
    n = 0,
    t = 0,
    f = 'assets/fruits/',
    r = ['w', 'l', 'r', 's', 'j'],
    e = '.png'
  ;(this.fruitsObj = {}),
    (this.fruitsArray = []),
    (this.images = {}),
    (this.sounds = {}),
    (this.loader = new createjs.LoadQueue(true)),
    this.loader.installPlugin(createjs.Sound),

    (u = function() {
      // console.log('loadComplete')
      var e = FruitGame.assets.fruits,
        u,
        f

      // TODO:

      for (n = 0; n < e.length; n++) {
        for (u = {}, t = 0; t < r.length; t++) {
          u[r[t]] = i.loader.getResult(e[n] + r[t])
        }
        i.fruitsArray.push(u), (i.fruitsObj[e[n]] = u)
      }
      for (f = FruitGame.assets.other, n = 0; n < f.length; n++) {
        i[f[n].id] = i.loader.getResult(f[n].id)
      }

      i.dispatchEvent(new SPP.Event('complete'))
    }),
    this.loader.addEventListener('complete', u),
    this.loader.on('error', function(err) {
      console.log('errorloadFile', err)
    }),
    // this.loader.on('fileprogress', function(e){console.log(e)}),
    (this.start = function() {
      
      var i = FruitGame.assets.fruits
      for (n = 0; n < i.length; n++) {
        for (t = 0; t < r.length; t++) {
          let src = f + i[n] + '-' + r[t] + e
          const id = i[n] + r[t]

          // src = 'https://webgameplay.tk/fruitninja/' + src
          // console.log('loadFile', id, src)

          this.loader.loadFile({ id: id, src: src }, !1)
        }
      }
      
        this.loader.loadManifest(FruitGame.assets.other, !1),
        // createjs.Sound.registerSounds(FruitGame._sounds, './')
        this.loader.load()
    }),
    (this.getRandomFruit = function() {
      return this.fruitsArray[(this.fruitsArray.length * Math.random()) >> 0]
    })
}

FruitGame.Collide = function() {
  var a, b
  function n(n) {
    return n * n
  }
  function t(n) {
    return n < 0 ? -1 : n > 0 ? 1 : 0
  }
  function i(n, t, i) {
    if (n != 0) {
      var r = t * t - 4 * n * i
      return r == 0
        ? [(-1 * t) / (2 * n), (-1 * t) / (2 * n)]
        : r > 0
        ? [(-1 * t + Math.sqrt(r)) / (2 * n), (-1 * t - Math.sqrt(r)) / (2 * n)]
        : void 0
    }
  }
  function r(r, u, f, e, o) {
    var h, c, l, s
    if (!(e <= 0))
      return ((o = o === undefined ? 1 : o),
      (h = e),
      (c = e * o),
      (a = n(c) * n(r[0] - u[0]) + n(h) * n(r[1] - u[1])),
      a <= 0)
        ? void 0
        : ((b =
            2 * n(c) * (u[0] - r[0]) * (r[0] - f[0]) +
            2 * n(h) * (u[1] - r[1]) * (r[1] - f[1])),
          (f = n(c) * n(r[0] - f[0]) + n(h) * n(r[1] - f[1]) - n(h) * n(c)),
          !(l = i(a, b, f, h, c)))
        ? void 0
        : ((s = [
            [r[0] + l[0] * (u[0] - r[0]), r[1] + l[0] * (u[1] - r[1])],
            [r[0] + l[1] * (u[0] - r[0]), r[1] + l[1] * (u[1] - r[1])]
          ]),
          (t(s[0][0] - r[0]) * t(s[0][0] - u[0]) <= 0 &&
            t(s[0][1] - r[1]) * t(s[0][1] - u[1]) <= 0) ||
            (s[0] = null),
          (t(s[1][0] - r[0]) * t(s[1][0] - u[0]) <= 0 &&
            t(s[1][1] - r[1]) * t(s[1][1] - u[1]) <= 0) ||
            (s[1] = null),
          s)
  }
  this.lineInEllipse = function(n, t, i, u, f) {
    var e = r(n, t, i, u, f)
    return e && (e[0] || e[1])
  }
}
;(FruitGame.Fruit = function() {
  SPP.Particle.call(this),
    (this.drawTexture = function(n, t, i, r) {
      n.drawImage(
        t,
        i,
        r,
        t.width,
        t.height,
        -t.width * 0.5,
        -t.height * 0.5,
        t.width,
        t.height
      )
    })
}),
  (FruitGame.Fruit.prototype = SPP.inherit(SPP.Particle.prototype)),
  (FruitGame.Fruit.prototype.constructor = FruitGame.Fruit),
  (FruitGame.Fruit.prototype.update = function() {
    if (
      ((this.rotation += this.rotationStep),
      this.context.translate(this.position.x - 20, this.position.y - 20),
      this.context.scale(this.scale, this.scale),
      this.drawTexture(this.context, this.shadow, 0, 0),
      this.context.setTransform(1, 0, 0, 1, 0, 0),
      this.context.translate(this.position.x, this.position.y),
      this.context.rotate(this.rotation),
      this.context.scale(this.scale, this.scale),
      this.drawTexture(this.context, this.texture, 0, 0),
      this.context.setTransform(1, 0, 0, 1, 0, 0),
      this.position.y > this.bottomY && this.bottomY != null)
    ) {
      this.life = 0
      return
    }
  }),
  (FruitGame.Fruit.prototype.init = function(n, t, i, r, u, f) {
    SPP.Particle.prototype.init.apply(this, [n, t, i]),
      (this.context = f),
      (this.texture = r),
      (this.shadow = u),
      (this.rotation = 0),
      (this.scale = 1),
      (this.radius = r.width >= r.height ? r.width * 0.5 : r.height * 0.5),
      (this.radius *= this.scale),
      (this.bottomY = null),
      (this.rotationStep = (1 - Math.random() * 2) * 0.1),
      this.rotationStep <= 0
        ? (this.rotationStep = -0.1)
        : this.rotationStep > 0 && (this.rotationStep = 0.1)
  })
