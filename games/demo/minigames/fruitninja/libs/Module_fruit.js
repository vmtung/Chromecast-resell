;(function() {
  var n = function() {
      ;(this.scale -= 0.013),
        this.scale < 0 && ((this.scale = 0), (this.life = 0))
    },
    t = function(t, i) {
      for (var r, u = 0; u < i; u++)
        (r = particleSystem.createParticle(SPP.SpriteImage)),
          r.init(
            t.position.x,
            t.position.y,
            Infinity,
            t.textureObj.j,
            middleContext
          ),
          (r.onUpdate = n),
          (r.scale = Math.random() * 0.7),
          r.damp.reset(0, 0),
          r.velocity.reset(0, -(4 + Math.random() * 4)),
          r.velocity.rotate(360 * Math.random()),
          r.addForce('g', gravity)
    },
    i = function() {
      ;(this.alpha -= 0.005),
        this.alpha < 0 && ((this.alpha = 0), (this.life = 0))
    },
    r = function(n) {
      var t = particleSystem.createParticle(SPP.SpriteImage)
      t.init(
        n.position.x,
        n.position.y,
        Infinity,
        n.textureObj.s,
        bottomContext
      ),
        (t.onUpdate = i),
        (t.scale = 1 + Math.random()),
        (t.rotation = Math.PI * 2 * Math.random())
    },
    u = function(n) {
      var r = 3 + Math.random() * 3,
        i = particleSystem.createParticle(FruitGame.Fruit),
        t
      i.init(
        n.position.x,
        n.position.y,
        Infinity,
        n.textureObj.r,
        assetsManager.shadow,
        middleContext
      ),
        i.velocity.reset(0, -r),
        i.velocity.rotate(20 * Math.random()),
        i.damp.reset(0, 0),
        (i.rotation = n.rotation),
        (i.bottomY = gameHeight + n.textureObj.r.height),
        i.addForce('g', gravity),
        (t = particleSystem.createParticle(FruitGame.Fruit)),
        t.init(
          n.position.x,
          n.position.y,
          Infinity,
          n.textureObj.l,
          assetsManager.shadow,
          middleContext
        ),
        t.velocity.reset(0, -r),
        t.velocity.rotate(-20 * Math.random()),
        t.damp.reset(0, 0),
        (t.rotation = n.rotation),
        (t.bottomY = gameHeight + n.textureObj.l.height),
        t.addForce('g', gravity)
    },
    f = function() {
      ;(this.alpha -= 0.01),
        this.alpha < 0 && ((this.alpha = 0), (this.life = 0))
    },
    e = function(n) {
      var i = particleSystem.createParticle(SPP.SpriteImage),
        t = n.position.x
      t <= 0 && (t = 40),
        t > gameWidth && (t = gameWidth - 40),
        i.init(
          t,
          gameHeight - assetsManager.miss.height,
          Infinity,
          assetsManager.miss,
          topContext
        ),
        i.velocity.reset(0, -1),
        i.damp.reset(0.01, 0.01),
        (i.onUpdate = f)
    }
  ;(throwFruit = function() {
    // const gameHeight
    var t = assetsManager.getRandomFruit(),
      n = fruitSystem.createParticle(FruitGame.Fruit)
      // console.log('randomFruit', t)
      n.velocity.reset(0, -(10 + Math.random() * 3)),
      n.velocity.rotate(8 - Math.random() * 16),
      n.damp.reset(0, 0),
      n.addForce('g', gravity),
      n.addEventListener('dead', missHandler),
      n.init(
        gameWidth * 0.5 + (1 - Math.random() * 2) * 200,
        gameHeight + t.w.height,
        Infinity,
        t.w,
        assetsManager.shadow,
        middleContext
      ),
      (n.textureObj = t),
      (n.bottomY = gameHeight + t.w.height)
  }),
    (cutFruit = function(n) {
      score++,
        n.removeEventListener('dead', missHandler),
        u(n),
        t(n, ((Math.random() * 30) >> 0) + 30),
        r(n),
        (n.life = 0),
        createjs.Sound.play('splatter')
        // console.log('playcutFruit')
    }),
    (missHandler = function(n) {
      ;(n.target.removeEventListener('dead', missHandler),
      gameState != GAME_OVER) &&
        (e(n.target),
        gameLife--,
        gameLife == 0 && gameOver(),
        gameLife < 0 && (gameLife = 0),
        (ui_gamelifeTexture = assetsManager['gamelife-' + gameLife]),
        (ui_gameLife.texture = ui_gamelifeTexture))
    })
})()
