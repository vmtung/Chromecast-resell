var game;
var gameOptions = {
    bounceHeight: 300,
    ballGravity: 1200,
    ballPower: 1200,
    obstacleSpeed: 250,
    obstacleDistanceRange: [100, 250],
}
window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor:0x87ceeb,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: 'thegame',
            width: 500,
            height: 800
        },
        physics: {
            default: 'arcade'
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
        this.load.image('ground', 'ground.png');
        this.load.image('ball', 'ball.png');
        this.load.image('obstacle', 'obstacle.png');
        this.load.image('message', 'message.png');
        this.load.image('gameover', 'gameover.png');
        this.load.image('overlay', 'overlay.png');
        this.load.image('Cloud_1', 'Cloud_1.png');
        this.load.image('Cloud_2', 'Cloud_2.png');
        this.load.audio('background-music', 'background-music.mp3');
    }
    create(){
        this.firstTap = true;
        this.end = false;
        this.obstacleGroup = this.physics.add.group();
        this.firstBounce = 0;
        this.cloud1 = this.add.sprite(game.config.width / 4 * 3, game.config.height / 7, 'Cloud_1');
        this.cloud2 = this.add.sprite(game.config.width / 4, game.config.height / 6, 'Cloud_1');
        this.ground = this.physics.add.sprite(game.config.width / 2, game.config.height / 4 * 3, 'ground');
        this.ground.setOrigin(0.5, 0);
        this.ground.setImmovable(true);
        this.ball = this.physics.add.sprite(game.config.width / 10 * 2, game.config.height / 4 * 3 - gameOptions.bounceHeight, 'ball');
        this.ball.setBounce(1);
        this.ball.setCircle(25);
        let obstacleX = game.config.width;
        for(let i = 0; i < 10; i++){
            let obstacle = this.obstacleGroup.create(obstacleX, this.ground.getBounds().top, 'obstacle');
            obstacle.setOrigin(0.5, 1);
            obstacle.setImmovable(true);
            obstacleX += Phaser.Math.Between(gameOptions.obstacleDistanceRange[0], gameOptions.obstacleDistanceRange[1])
        }
        // this.obstacleGroup.setVelocityX(-gameOptions.obstacleSpeed);
        this.input.on('pointerdown', this.boost, this);
        this.score = 0;
        // this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(10, 10, '');
        this.updateScore(this.score);

        this.overlay = this.add.sprite(0, 0, 'overlay');
        this.overlay.setOrigin(0, 0);
        this.overlay.displayWidth = game.config.width
        this.overlay.displayHeight = game.config.height
        this.message = this.add.sprite(game.config.width / 2, game.config.height / 2 - 50, 'message');
        this.gameover = this.add.sprite(game.config.width / 2, game.config.height / 2 - 50, 'gameover');
        this.gameover.setVisible(false)

        this.backgroundMusic = this.sound.add('background-music', {
          volume: 0.8,
          loop: true,
        })
        this.backgroundMusic.play()
    }
    updateScore(inc){
        this.score += inc;
        this.scoreText.text = 'Score: ' + this.score;
    }
    boost(){
      if (this.end) return
        if (this.firstTap) {
          this.firstTap = false
          this.ball.body.gravity.y = gameOptions.ballGravity;
          this.obstacleGroup.setVelocityX(-gameOptions.obstacleSpeed);
          this.message.setVisible(false)
          this.overlay.setVisible(false)
        }
        if(this.firstBounce != 0){
            this.ball.body.velocity.y = gameOptions.ballPower;
        }
    }
    getRightmostObstacle(){
        let rightmostObstacle = 0;
        this.obstacleGroup.getChildren().forEach(function(obstacle){
            rightmostObstacle = Math.max(rightmostObstacle, obstacle.x);
        });
        return rightmostObstacle;
    }
    update(){
        this.physics.world.collide(this.ground, this.ball, function(){
            if(this.firstBounce == 0){
                this.firstBounce = this.ball.body.velocity.y;
            }
            else{
                this.ball.body.velocity.y = this.firstBounce;
            }
        }, null, this);
        this.physics.world.collide(this.ball, this.obstacleGroup, function(){
          this.end = true
          this.obstacleGroup.setVelocityX(0);
          this.gameover.setVisible(true)
          this.overlay.setVisible(true)
          setTimeout(() => {
            if (window.jgstr) window.jgstr(`onStopGame(${this.score});`);
          }, 1000)
        }, null, this);
        this.obstacleGroup.getChildren().forEach(function(obstacle){
            if(obstacle.getBounds().right < this.ball.getBounds().right && !obstacle.passed){
              obstacle.passed = true;
              this.updateScore(1);
            }
            if(obstacle.getBounds().right < 0){
              obstacle.x = this.getRightmostObstacle() + Phaser.Math.Between(gameOptions.obstacleDistanceRange[0], gameOptions.obstacleDistanceRange[1]);
              obstacle.passed = false
            }
        }, this)
    }
}
