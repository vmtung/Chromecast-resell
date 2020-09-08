var game;
var gameOptions = {

    // bird gravity, will make bird fall if you don't flap
    birdGravity: 1600,

    // horizontal bird speed
    birdSpeed: 250,

    // flap thrust
    birdFlapPower: 600,

    // minimum pipe height, in pixels. Affects hole position
    minPipeHeight: 100,

    // distance range from next pipe, in pixels
    pipeDistance: [440, 560],

    // hole range between pipes, in pixels
    pipeHole: [200, 260],

    // local storage object name
    localStorageName: 'bestFlappyScore'
}
window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor:0x87ceeb,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: 'thegame',
            width: 640,
            height: 960
        },
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 0
                },
            }
        },
        scene: playGame
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}

class playGame extends Phaser.Scene{
    constructor(){
        super('PlayGame');
    }
    preload(){
      // this.load.spritesheet('bird', 'assets/sprites/yellowbird.png', { frameWidth: 34, frameHeight: 24});
      this.load.spritesheet('bird', 'assets/sprites/yellowbird.png', { frameWidth: 71, frameHeight: 50});
      this.load.image('pipe', 'assets/sprites/pipe-green2.png');
      this.load.image('background', 'assets/sprites/background-day.png');
      this.load.image('background-night', 'assets/sprites/background-night.png');
      this.load.image('gameover', 'assets/sprites/gameover.png');
      this.load.image('message', 'assets/sprites/message.png');
      this.load.image('base', 'assets/sprites/base.png');

      this.load.audio('die', ['assets/audio/die.ogg', 'assets/audio/die.wav']);
      this.load.audio('hit', ['assets/audio/hit.ogg', 'assets/audio/hit.wav']);
      this.load.audio('point', ['assets/audio/point.ogg', 'assets/audio/point.wav']);
      this.load.audio('wing', ['assets/audio/wing.ogg', 'assets/audio/wing.wav']);
      this.load.audio('background-music', ['assets/audio/background-music.mp3', 'assets/audio/background-music.ogg']);
    }
    create(){
        this.gameState = 'message'
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0);
        this.background.displayHeight = game.config.height;
        this.background.displayWidth = game.config.width;

        this.backgroundNight = this.add.image(0, 0, 'background-night');
        this.backgroundNight.setOrigin(0);
        this.backgroundNight.displayHeight = game.config.height;
        this.backgroundNight.displayWidth = game.config.width;
        this.backgroundNight.alpha = 0;
        
        this.tweenTimeout = setTimeout(() => {
          this.backgroundToogle()
        }, 9000)

        this.message = this.add.image(game.config.width / 2, game.config.height / 2, 'message').setOrigin(0.5);
        
        this.audioDie = this.sound.add('die', {
          volume: 0.4,
        })
        this.audioHit = this.sound.add('hit', {
          volume: 0.4,
        })
        this.audioPoint = this.sound.add('point', {
          volume: 0.4,
        })
        this.audioWing = this.sound.add('wing', {
          volume: 0.4,
        })
        this.backgroundMusic = this.sound.add('background-music', {
          volume: 0.3,
          loop: true,
        })
        this.backgroundMusic.play()

        var config = {
          key: 'flap',
          frames: this.anims.generateFrameNumbers('bird'),
          frameRate: 3,
          yoyo: true,
        };
        this.anims.create(config);

        this.pipeGroup = this.physics.add.group();
        this.pipePool = [];
        for(let i = 0; i < 4; i++){
            var pipe1 = this.pipeGroup.create(0, 0, 'pipe')
            pipe1.body.immovable = true
            this.pipePool.push(pipe1);
            var pipe2 = this.pipeGroup.create(0, 0, 'pipe')
            pipe2.body.immovable = true
            this.pipePool.push(pipe2);
            this.placePipes(false);
        }
        this.pipeGroup.setVelocityX(0);

        this.base = this.add.image(0, game.config.height - 60, 'base');
        this.base.setOrigin(0);
        this.base.displayWidth = game.config.width;


        this.bird = this.physics.add.sprite(160, game.config.height / 2, 'bird', 1);
        this.bird.anims.load('flap')
        this.bird.body.gravity.y = 0

        // this.bird.body.gravity.y = gameOptions.birdGravity;
        this.input.on('pointerdown', this.flap, this);
        this.score = 0;
        this.passed = 0;
        // this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(10, 10, '');
        this.scoreText.setFontSize(30);
        this.updateScore(this.score);
    }

    backgroundToogle() {
      if (this.gameState !== 'end' && this.gameState !== 'ending') {
        if (this.backgroundNight.alpha === 0) {
          this.tweens.add({
            targets: this.backgroundNight,
            duration: 2000,
            alpha: 1,
          })
        } else {
          this.tweens.add({
            targets: this.backgroundNight,
            duration: 2000,
            alpha: 0,
          })
        }
        this.tweenTimeout = setTimeout(() => {
          this.backgroundToogle()
        }, 12000)
      }
    }

    updateScore(inc){
      if (inc > 0) {
        this.audioPoint.play()
      }
      this.score += inc;
      this.scoreText.text = 'Score: ' + this.score;
    }
    placePipes(addScore){
        let rightmost = this.getRightmostPipe();
        let pipeHoleHeight = Phaser.Math.Between(gameOptions.pipeHole[0], gameOptions.pipeHole[1]);
        let pipeHolePosition = Phaser.Math.Between(gameOptions.minPipeHeight + pipeHoleHeight / 2, game.config.height - gameOptions.minPipeHeight - pipeHoleHeight / 2);
        this.pipePool[0].x = rightmost + this.pipePool[0].getBounds().width + Phaser.Math.Between(gameOptions.pipeDistance[0], gameOptions.pipeDistance[1]);
        this.pipePool[0].y = pipeHolePosition - pipeHoleHeight / 2;
        this.pipePool[0].setOrigin(0, 1);
        this.pipePool[0].passed = false;
        this.pipePool[1].x = this.pipePool[0].x;
        this.pipePool[1].y = pipeHolePosition + pipeHoleHeight / 2;
        this.pipePool[1].setOrigin(0, 0);
        this.pipePool[1].passed = false;
        this.pipePool = [];
        if(addScore){
            this.updateScore(1);
        }
    }
    flap(){
      if (this.gameState !== 'end' && this.gameState !== 'ending') {
        this.audioWing.play()
      }
      if (this.gameState === 'message') {
        this.gameState = 'playing'
        this.pipeGroup.setVelocityX(-gameOptions.birdSpeed);
        this.bird.body.gravity.y = gameOptions.birdGravity;

        this.message.destroy()
      } else if (this.gameState === 'playing') {
        this.bird.body.velocity.y = -gameOptions.birdFlapPower;
        this.bird.anims.play('flap', 0);
      } else if (this.gameState === 'end') {
        this.gameState = 'preload'
        this.backgroundMusic.stop()
        clearTimeout(this.tweenTimeout)
        this.scene.restart()
      }
    }
    getRightmostPipe(){
        let rightmostPipe = 0;
        this.pipeGroup.getChildren().forEach(function(pipe){
            rightmostPipe = Math.max(rightmostPipe, pipe.x);
        });
        return rightmostPipe;
    }
    update(){
        if (this.bird.body.velocity.y > 100) {
          this.bird.angle = 45
        } else if (this.bird.body.velocity.y < -100) {
          this.bird.angle = -45
        } else {
          this.bird.angle = 90 / 200 * this.bird.body.velocity.y
        }
        if (this.gameState === 'playing') {
          this.physics.world.collide(this.bird, this.pipeGroup, function(){
              this.audioHit.play()

              this.die();
          }, null, this);
        }
        if (this.gameState === 'playing') {
          if(this.bird.y > game.config.height || this.bird.y < 0){
              this.die();
          }
        }
        this.pipeGroup.getChildren().forEach(function(pipe, index){
            if(pipe.getBounds().right < 160 && !pipe.passed){
              pipe.passed = true
              this.passed++;
              if (this.passed === 2) {
                this.passed = 0
                this.updateScore(1);
              }
            }
            if (pipe.getBounds().right < 0){
                this.pipePool.push(pipe);
                if(this.pipePool.length == 2){
                    this.placePipes(false);
                }
            }
        }, this)
    }
    die(){
        this.audioDie.play()

        this.gameState = 'ending'
        // localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
        

        this.pipeGroup.setVelocityX(0);
        // this.bird.body.gravity.y = 0
        // this.scene.start('PlayGame');
        this.gameover = this.add.image(game.config.width / 2, game.config.height / 3 + 20, 'gameover');
        this.gameover.setOrigin(0.5)
        this.finalScoreText = this.add.text(game.config.width / 2, game.config.height / 2, this.score);
        this.finalScoreText.setFontSize(60)
        this.finalScoreText.setOrigin(0.5)

        // setTimeout(() => this.gameState = 'end', 2000)
        setTimeout(() => {
          if (window.jgstr) window.jgstr(`onStopGame(${this.score});`);
          // this.gameState = 'end'
        }, 2000)
    }
}
