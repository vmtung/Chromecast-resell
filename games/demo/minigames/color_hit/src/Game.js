function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}



const api_post = function (url, data) {
    const xhttp = new XMLHttpRequest();
    const json_data = JSON.stringify(data);
    xhttp.onreadystatechange = function (res) {
        if (this.readyState == 4) {
            console.log('api_result', JSON.parse(this.responseText))
        }
    };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("content-type", "application/json; charset=UTF-8");
    xhttp.send(json_data);
}
const onStopGame = (score) => {
    console.log('gameover_score', score)
    alert(`Bạn đạt được ${score} điểm`)
}


///
window.onload = function () {

    var GameName = {
        orientated: false
    };
    GameName.Boot = function (game) {};
    GameName.Boot.prototype = {
        preload: function () {
            /////// Preload the loading indicator first before anything else
            this.load.image('preloaderBar', 'assets/images/preloadbar.png');
            this.load.image('loadEnd', 'assets/images/loadEnd.png');
            this.load.image('loadBg', 'assets/images/background.png');
            /////// Set scale options        
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;

            this.resizeGame();

        },

        create: function () {
            /////// start the Preloader state
            this.state.start('Preloader');
        },

        resizeGame: function () {
            if (this.game.device.desktop) {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
            } else {
                this.setOrientation();
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
        },

        setOrientation: function () {
            this.scale.forceOrientation(false, true);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        },

        enterIncorrectOrientation: function () {
            document.getElementById('gameDiv').style.display = 'block';
        },

        leaveIncorrectOrientation: function () {
            document.getElementById('gameDiv').style.display = 'none';
        }

    };

    GameName.Preloader = function (game) {
        GameName.GAME_WIDTH = 800;
        GameName.GAME_HEIGHT = 600;
    };

    GameName.Preloader.prototype = {

        preload: function () {
            this.loadBg = this.add.sprite(0, 0, 'loadBg');

            style = {
                font: "64px Arial",
                fill: "#a9a9a9",
                align: "center"
            };

            highScoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, "Loading...", style);
            highScoreText.anchor.set(0.5);
            highScoreText.fontWeight = 'bold';
            highScoreText.alpha = 0.75;

            preloadBar = this.add.sprite(64, this.world.centerY + 200, 'preloaderBar');
            preloadBar.anchor.setTo(0, 0.5);

            this.load.setPreloadSprite(preloadBar);

            this.game.load.image('ball-red', 'assets/images/ball-red.png');
            this.game.load.image('ball-blue', 'assets/images/ball-blue.png');
            this.game.load.image('ball-yellow', 'assets/images/ball-yellow.png');

            this.game.load.image('small-red', 'assets/images/small-red.png');
            this.game.load.image('small-blue', 'assets/images/small-blue.png');
            this.game.load.image('small-yellow', 'assets/images/small-yellow.png');

            this.game.load.image('medium-red', 'assets/images/medium-red.png');
            this.game.load.image('medium-blue', 'assets/images/medium-blue.png');
            this.game.load.image('medium-yellow', 'assets/images/medium-yellow.png');

            this.game.load.image('large-red', 'assets/images/large-red.png');
            this.game.load.image('large-blue', 'assets/images/large-blue.png');
            this.game.load.image('large-yellow', 'assets/images/large-yellow.png');

            this.game.load.image('blue', 'assets/images/blue.png');
            this.game.load.image('yellow', 'assets/images/yellow.png');

            this.game.load.image('background', 'assets/images/background.png');
            this.game.load.image('gameOver', 'assets/images/gameOver.png');

            this.game.load.image('play-button', 'assets/images/play-button.png');
            this.game.load.image('retry-button', 'assets/images/retry-button.png');
            this.game.load.image('menu-button', 'assets/images/menu-button.png');
            this.game.load.image('watch-icon', 'assets/images/watch-icon.png');

            this.game.load.image('border', 'assets/images/border.png');
            this.game.load.image('border-384', 'assets/images/border-384.png');
            this.game.load.image('new', 'assets/images/new.png');

            this.game.load.spritesheet('sound-control', 'assets/images/sound-control.png', 64, 64, 2);
            this.game.load.spritesheet('firework', 'assets/images/firework.png', 32, 32, 3);
            this.game.load.spritesheet('balls', 'assets/images/balls.png', 32, 32, 3);

            this.game.load.audio('audio-background', 'assets/audio/music/audio-background.mp3');
            this.game.load.audio('audio-splash', 'assets/audio/sounds/audio-splash.mp3');
            this.game.load.audio('audio-splashWrong', 'assets/audio/sounds/audio-splashWrong.mp3');
            this.game.load.audio('audio-highScore', 'assets/audio/sounds/audio-highScore.mp3');
            this.game.load.audio('audio-tick', 'assets/audio/sounds/audio-tick.mp3');

            this.game.load.image('logo', 'assets/images/logo-2.png');
        },

        update: function () {

        },

        create: function () {
            bgMusic = this.game.add.audio('audio-background');
            bgMusic.volume = 0.25;
            bgMusic.loop = true;

            bgMusic.play();
            this.state.start('MainMenu');
        }
    };

    GameName.MainMenu = function (game) {
        GameName._firstRun = true;
    };

    GameName.MainMenu.prototype = {
        create: function () {
            posX = this.game.world.centerX;
            posY = this.game.world.centerY;

            background = this.game.add.tileSprite(0, 0, 640, 1000, 'background');

            bg = this.game.add.emitter(0, this.game.world.height, 100);
            var particules = 3;
            var _pArray = Array.apply(null, {
                length: particules
            }).map(Number.call, Number)
            bg.makeParticles('balls', _pArray);
            bg.gravity = -20;
            bg.width = this.game.world.width;

            bg.x = this.game.world.centerX;
            bg.start(false, 10000, 50);

            bg.minParticleScale = 0.5;
            bg.maxParticleScale = 1.0;

            bg.setAlpha(0.3, 0, 10000);

            playButton = this.add.button(this.world.centerX, this.world.centerY + 64, 'play-button', this.startGame, this);
            playButton.anchor.setTo(0.5, 0.5);
            playButton.scale.setTo(0.8, 0.8);

            small = this.game.add.sprite(posX, posY + 64, 'small-blue');
            small.anchor.setTo(0.5, 0.5);

            border = this.game.add.sprite(posX, posY + 64, 'border-384');
            border.anchor.setTo(0.5, 0.5);
            border.alpha = 0.5

            soundButton = this.game.add.sprite(this.game.world.width - 72, 64, 'sound-control');
            soundButton.anchor.setTo(0, 1);
            soundButton.alpha = 0.3;
            soundButton.inputEnabled = true;

            soundButton.events.onInputDown.add(this.soundControl, this);

            if (this.game.sound.mute == true) {
                soundButton.frame = 1;
            }

            //High Score
            if (false && localStorage.getItem('highscore') !== null) {
                style = {
                    font: "64px Arial",
                    fill: "#a9a9a9",
                    align: "center"
                };

                highScoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 320, "HighScore", style);
                highScoreText.anchor.set(0.5);
                highScoreText.fontWeight = 'bold';
                highScoreText.alpha = 0.75;

                highScoreInt = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 400, "" + localStorage.getItem('highscore'), style);
                highScoreInt.anchor.set(0.5);
                highScoreInt.fontWeight = 'bold';
                highScoreInt.alpha = 0.75;
            }

            logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 280, 'logo');
            logo.anchor.setTo(0.5, 0.5);
        },

        update: function () {
            background.tilePosition.x += 0.25;

            small.rotation += 0.025;
            border.rotation -= 0.002;
        },

        soundControl: function () {
            if (this.game.sound.mute == false) {
                this.game.sound.mute = true;
                soundButton.frame = 1;
            } else {
                this.game.sound.mute = false;
                soundButton.frame = 0;
            }
        },


        startGame: function () {
            /////// Start the Game state
            this.state.start('Game');
        }
    };

    GameName.Game = function (game) {
        GameName._score = 0;
        GameName._highScore = 0;
    };
    GameName.Game.prototype = {

        create: function () {
            splash = this.game.add.audio('audio-splash');
            splashWrong = this.game.add.audio('audio-splashWrong');
            tick = this.game.add.audio('audio-tick');
            tick.volume = 5;

            background = this.game.add.tileSprite(0, 0, 640, 1000, 'background');

            bg = this.game.add.emitter(0, this.game.world.height, 10);
            var particules = 3;
            var _pArray = Array.apply(null, {
                length: particules
            }).map(Number.call, Number)
            bg.makeParticles('balls', _pArray);
            bg.gravity = -20;
            bg.width = this.game.world.width;

            bg.x = this.game.world.centerX;
            bg.start(false, 10000, 10);

            bg.minParticleScale = 0.5;
            bg.maxParticleScale = 1.0;

            bg.setAlpha(0.3, 0, 10000);

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            colors = ['red', 'blue', 'yellow'];
            Phaser.ArrayUtils.shuffle(colors);

            projectiles = this.game.add.group();

            //Position

            posX = this.game.world.centerX;
            posY = this.game.world.centerY + 64;

            //SMALL ARC   

            smallCollision = this.game.add.group();
            smallCollision.createMultiple(5, 'ball-red', [0, 1, 2, 3, 4], true);
            smallCollision.setAll('anchor.x', 0.5);
            smallCollision.setAll('anchor.y', 0.5);
            this.game.physics.arcade.enable(smallCollision);

            small = new Phaser.Circle(posX, posY, 226);
            small.sample(10, 0, 205, true, smallCollision.children);

            smallCollision.x = posX;
            smallCollision.y = posY;

            smallCollision.pivot.x = posX;
            smallCollision.pivot.y = posY;

            smallCollision.forEach(this.setCircle, this);

            randomColor = Phaser.ArrayUtils.removeRandomItem(colors, 0, 1);

            smallGraphics = this.game.add.sprite(posX, posY, 'small-' + randomColor);
            smallGraphics.anchor.setTo(0.5, 0.5);

            smallGraphics.loadTexture = ('small-' + small.color);

            small.color = randomColor;

            smallCollision.forEach(function (object) {
                object.color = small.color;
                object.name = 'small';
                object.alpha = 0;
            }, this);

            //MEDIUM ARC

            mediumCollision = this.game.add.group();
            mediumCollision.createMultiple(5, 'ball-red', [0, 1, 2, 3, 4], true);
            mediumCollision.setAll('anchor.x', 0.5);
            mediumCollision.setAll('anchor.y', 0.5);
            this.game.physics.arcade.enable(mediumCollision);

            medium = new Phaser.Circle(posX, posY, 354)
            medium.sample(15, 0, 190, true, mediumCollision.children);

            mediumCollision.x = posX;
            mediumCollision.y = posY;

            mediumCollision.pivot.x = posX;
            mediumCollision.pivot.y = posY;

            mediumCollision.forEach(this.setCircle, this);

            randomColor = Phaser.ArrayUtils.removeRandomItem(colors, 0, 1);

            mediumGraphics = this.game.add.sprite(posX, posY, 'medium-' + randomColor);
            mediumGraphics.anchor.setTo(0.5, 0.5);

            medium.color = randomColor;

            mediumCollision.forEach(function (object) {
                object.color = medium.color;
                object.name = 'medium';
                object.alpha = 0;
            }, this);

            //LARGE ARC

            largeCollision = this.game.add.group();
            largeCollision.createMultiple(5, 'ball-red', [0, 1, 2, 3, 4], true);
            largeCollision.setAll('anchor.x', 0.5);
            largeCollision.setAll('anchor.y', 0.5);
            this.game.physics.arcade.enable(largeCollision);

            large = new Phaser.Circle(posX, posY, 482)
            large.sample(20, 0, 190, true, largeCollision.children);

            largeCollision.x = posX;
            largeCollision.y = posY;

            largeCollision.pivot.x = posX;
            largeCollision.pivot.y = posY;

            largeCollision.forEach(this.setCircle, this);

            randomColor = Phaser.ArrayUtils.removeRandomItem(colors, 0, 1);

            largeGraphics = this.game.add.sprite(posX, posY, 'large-' + randomColor);
            largeGraphics.anchor.setTo(0.5, 0.5);

            large.color = randomColor;

            largeCollision.forEach(function (object) {
                object.color = large.color;
                object.name = 'large';
                object.alpha = 0;
            }, this);

            //Reset colors array

            colors = ['red', 'blue', 'yellow'];

            //SPEED CONTROL
            smallSpeed = 40;
            mediumSpeed = 30;
            largeSpeed = 20;

            rotation = ['left', 'right'];

            smallRotation = Phaser.ArrayUtils.removeRandomItem(rotation, 0, 1);
            mediumRotation = Phaser.ArrayUtils.removeRandomItem(rotation, 0, 1);

            rotation = ['left', 'right'];

            largeRotation = Phaser.ArrayUtils.getRandomItem(rotation, 0, 1);

            divider = 1000;

            //PLAYER

            inputEnabled = true;

            player = this.game.add.sprite(posX, posY, 'ball-red');
            player.anchor.setTo(0.5, 0.5);
            this.game.physics.enable(player, Phaser.Physics.ARCADE);
            player.color = 'red';

            this.game.input.onDown.add(this.fire, this);

            projectileSpeed = 700;

            score = 0;

            shots = 0;
            hits = 0;

            eventHits = 0;

            runOnce = true;

            spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            //Score

            style = {
                font: "160px Arial",
                fill: "#a9a9a9",
                align: "center"
            };
            text = this.game.add.text(this.game.world.centerX, 160, "", style);
            text.anchor.set(0.5);
            text.fontWeight = 'bold';

            //Emmiter
            emitter = this.game.add.emitter(-500, -500, 100);
            emitter.makeParticles('ball-red');

            emitter.minParticleScale = 0.4;
            emitter.maxParticleScale = 0.8;

            emitter.setScale(0.8, 0, 0.8, 0, 1000);

            //Trail   
            trail = this.game.add.emitter(posX, posY, 100);
            trail.makeParticles('ball-' + player.color);
            trail.minParticleScale = 0.2;
            trail.maxParticleScale = 0.4;
            trail.setScale(0.8, 0, 0.8, 0, 1000);

            //Time
            timePaused = false;

            timeIcon = this.game.add.sprite(64, this.game.world.height - 64, 'watch-icon')
            timeIcon.anchor.setTo(0.5, 0.5);
            timeIcon.scale.setTo(0.5, 0.5);

            styleTime = {
                font: "72px Arial",
                fill: "#a9a9a9",
                align: "center"
            };
            textTime = this.game.add.text(140, this.game.world.height - 64, "0", styleTime);
            textTime.anchor.set(0.5);
            textTime.fontWeight = 'bold';

            time = 10;
            this.game.time.events.loop(Phaser.Timer.SECOND, function () {
                if (timePaused == false) {
                    time -= 1;
                }
            }, this);
            this.game.time.events.loop(Phaser.Timer.SECOND, function () {
                if (time < 4 && time > 0) {
                    tick.play();
                    timeIcon.tint = '0xff5555';
                    textTime.tint = '0xff5555';
                    this.game.camera.flash(0xff5555, 100);
                }
            }, this);

            //Border
            border = this.game.add.sprite(posX, posY, 'border');
            border.anchor.setTo(0.5, 0.5);
            border.alpha = 0.25;

            //Game Over
            gameOver = this.game.add.sprite(0, 0, 'gameOver');
            gameOver.alpha = 0;

            highScore = GameName._highScore;

            tweenBg = this.game.add.tween(gameOver).from({
                y: -1000
            }, 1500, "Linear", false);

            //Sound Control
            soundButton = this.game.add.sprite(this.game.world.width - 72, 64, 'sound-control');
            soundButton.anchor.setTo(0, 1);
            soundButton.alpha = 0.3;
            soundButton.inputEnabled = true;

            soundButton.events.onInputDown.add(this.soundControl, this);

            if (this.game.sound.mute == true) {
                soundButton.frame = 1;
            }
        },

        fire: function () {
            if (inputEnabled == true) {
                shots += 1;

                projectile = projectiles.create(player.x, player.y, 'ball-red');
                projectile.anchor.setTo(0.5, 0.5);
                projectile.color = player.color;
                projectile.loadTexture('ball-' + projectile.color);
                this.game.physics.enable(projectile, Phaser.Physics.ARCADE);
                projectile.body.setCircle(12);
                projectileExists = true;
                this.game.physics.arcade.moveToPointer(projectile, projectileSpeed);

                player.color = Phaser.ArrayUtils.getRandomItem(colors, 0, 3);
                player.loadTexture('ball-' + player.color);

                trail.forEach(function (particle) {
                    particle.loadTexture('ball-' + player.color);
                }, this);
                trail.start(true, 1000, null, 6);
            }
        },

        setCircle: function (object) {
            object.body.setCircle(12);
        },

        update: function () {
            if (gameOver.y == 0 && gameOver.alpha == 1) {
                this.state.start('GameOver');
            }

            if (smallSpeed == mediumSpeed) {
                mediumSpeed += 20;
            }

            if (time < 5) {

            }

            if (time <= 0 && runOnce == true) {
                runOnce = false;
                this.timeOut();
            }
            if (eventHits >= 10) {
                eventHits = 0;
                this.changeRotation();
            }
            if (time > 3) {
                timeIcon.tint = '0xffffff';
                textTime.tint = '0xffffff';
            }

            background.tilePosition.x += 0.25;

            text.text = '' + score;
            textTime.text = '' + time;
            this.game.physics.arcade.overlap(projectiles, smallCollision, this.collide, null, this);
            this.game.physics.arcade.overlap(projectiles, mediumCollision, this.collide, null, this);
            this.game.physics.arcade.overlap(projectiles, largeCollision, this.collide, null, this);

            player.rotation = this.game.physics.arcade.angleToPointer(player);

            this.rotateSmall();
            this.rotateMedium();
            this.rotateLarge();

            border.rotation += 0.001;
        },

        rotateSmall: function () {
            if (smallRotation == 'left') {
                smallCollision.rotation += smallSpeed / divider;
                smallGraphics.rotation += smallSpeed / divider;
            } else if (smallRotation == 'right') {
                smallCollision.rotation -= smallSpeed / divider;
                smallGraphics.rotation -= smallSpeed / divider;
            }
        },

        rotateMedium: function () {
            if (mediumRotation == 'left') {
                mediumCollision.rotation += mediumSpeed / divider;
                mediumGraphics.rotation += mediumSpeed / divider;
            } else if (mediumRotation == 'right') {
                mediumCollision.rotation -= mediumSpeed / divider;
                mediumGraphics.rotation -= mediumSpeed / divider;
            }
        },

        rotateLarge: function () {
            if (largeRotation == 'left') {
                largeCollision.rotation += largeSpeed / divider;
                largeGraphics.rotation += largeSpeed / divider;
            } else if (largeRotation == 'right') {
                largeCollision.rotation -= largeSpeed / divider;
                largeGraphics.rotation -= largeSpeed / divider;
            }
        },

        changeRotation: function () {
            if (smallRotation == 'left') {
                smallRotation = 'right'
            } else {
                smallRotation = 'left'
            }
            if (mediumRotation == 'left') {
                mediumRotation = 'right'
            } else {
                mediumRotation = 'left'
            }
            if (largeRotation == 'left') {
                largeRotation = 'right'
            } else {
                largeRotation = 'left'
            }
        },

        collide: function (projectile, arc) {
            if (projectile.color == arc.color) {
                splash.play();

                emitter.x = projectile.x;
                emitter.y = projectile.y;
                emitter.forEach(function (particle) {
                    particle.loadTexture('ball-' + projectile.color);
                }, this);
                emitter.start(true, 1000, null, 10);

                projectile.kill();
                score += 1;
                hits += 1;
                time += 1;
                eventHits += 1;
                projectileSpeed += 10;
                if (arc.name == 'small') {
                    random = this.game.rnd.between(1, 3);
                    smallSpeed += random;
                }
                if (arc.name == 'medium') {
                    random = this.game.rnd.between(1, 3);
                    mediumSpeed += random;
                }
                if (arc.name == 'large') {
                    random = this.game.rnd.between(1, 3);
                    largeSpeed += random;
                }

                projectileExists = false;
            } else {
                this.gameOver();
            }
        },

        gameOver: function () {
            inputEnabled = false;
            timePaused = true;

            this.game.camera.flash(0xff5555, 500);
            this.game.camera.shake(0.05, 500);
            splashWrong.play();

            emitter.x = projectile.x;
            emitter.y = projectile.y;
            emitter.forEach(function (particle) {
                particle.loadTexture('ball-' + projectile.color);
            }, this);
            emitter.start(true, 3000, null, 20);

            projectile.kill();

            tweenBg.start();
            gameOver.alpha = 1;
            GameName._score = score;
            // TODO: trigger submit score
            onStopGame(score)

        },

        timeOut: function () {
            inputEnabled = false;
            timePaused = true;

            this.game.camera.flash(0xff0000, 500);

            splashWrong.play();

            tweenBg.start();
            gameOver.alpha = 1;
            GameName._score = score;
            onStopGame(score)

        },

        soundControl: function () {
            if (this.game.sound.mute == false) {
                this.game.sound.mute = true;
                soundButton.frame = 1;
            } else {
                this.game.sound.mute = false;
                soundButton.frame = 0;
            }
        },

        render: function () {
            //this.game.debug.geom(small, null, false);
            //this.game.debug.geom(medium, null, false);
            //this.game.debug.geom(large, null, false);  

            //this.game.debug.physicsGroup(smallCollision);
            //this.game.debug.physicsGroup(mediumCollision); 
            //this.game.debug.physicsGroup(largeCollision);
            //this.game.debug.physicsGroup(projectiles);
            //objects.forEach(this.renderGroup, this);

            //this.game.debug.text( "Color: " + smallCollision.color, 100, 380 );   
        },


    };

    GameName.SiteLock = function (game) {};
    GameName.SiteLock.prototype = {

        create: function () {
            background = this.game.add.tileSprite(0, 0, 640, 1000, 'background');
        },

        update: function () {
            background.tilePosition.x += 0.25;
        },


        startGame: function () {

        }
    };

    GameName.GameOver = function (game) {};
    GameName.GameOver.prototype = {

        create: function () {
            hScoreSound = this.game.add.audio('audio-highScore');
            hScoreSound.volume = 3;
            newScoreSet = false;
            // hide_highscore
            if (false && GameName._score > localStorage.getItem('highscore')) {
                localStorage.setItem('highscore', GameName._score);
                newScoreSet = true;
            }

            background = this.game.add.tileSprite(0, 0, 640, 1000, 'background');

            bg = this.game.add.emitter(0, this.game.world.height, 100);
            var particules = 3;
            var _pArray = Array.apply(null, {
                length: particules
            }).map(Number.call, Number)
            bg.makeParticles('balls', _pArray);
            bg.gravity = -20;
            bg.width = this.game.world.width;

            bg.x = this.game.world.centerX;
            bg.start(false, 10000, 50);

            bg.minParticleScale = 0.5;
            bg.maxParticleScale = 1.0;

            bg.setAlpha(0.3, 0, 10000);

            border = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'border');
            border.anchor.setTo(0.5, 0.5);
            border.alpha = 0.25;

            style = {
                font: "72px Arial",
                fill: "#a9a9a9",
                align: "center"
            };

            scoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 160, "Score", style);
            scoreText.anchor.set(0.5);
            scoreText.fontWeight = 'bold';

            scoreInt = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 72, "" + GameName._score, style);
            scoreInt.anchor.set(0.5);
            scoreInt.fontWeight = 'bold';

            //  highScoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 64, "HighScore", style);
            //  highScoreText.anchor.set(0.5);
            //  highScoreText.fontWeight = 'bold'; 

            //  highScoreInt  = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 160, "" + localStorage.getItem('highscore'), style);
            //  highScoreInt.anchor.set(0.5);
            //  highScoreInt.fontWeight = 'bold';

            newText = this.game.add.sprite(highScoreText.x, highScoreText.y - 64, 'new');
            newText.anchor.setTo(0.5, 0.5);
            newText.alpha = 0;

            //  retryButton = this.game.add.sprite(this.game.world.centerX - 128, this.game.world.centerY + 384, 'retry-button');
            //  retryButton.anchor.setTo(0.5, 0.5);
            //  retryButton.alpha = 0.25;
            //  retryButton.inputEnabled = true;

            //  retryButton.events.onInputDown.add(this.startGame, this);

            //  menuButton = this.game.add.sprite(this.game.world.centerX + 128, this.game.world.centerY + 384, 'menu-button');
            //  menuButton.anchor.setTo(0.5, 0.5);
            //  menuButton.alpha = 0.25;
            //  menuButton.inputEnabled = true;

            //  menuButton.events.onInputDown.add(this.startMenu, this);

            firework = this.game.add.emitter(0, 0, 100);
            var particules = 3;
            var _pArray = Array.apply(null, {
                length: particules
            }).map(Number.call, Number)
            firework.makeParticles('firework', _pArray);
            firework.gravity = 100;
            firework.width = this.game.world.width;

            firework.minParticleScale = 0.5;
            firework.maxParticleScale = 1.0;

            if (newScoreSet == true) {
                newScoreSet = false;
                firework.x = this.game.world.centerX;
                firework.start(true, 6000, null, 50);
                hScoreSound.play();
                newText.alpha = 1;
                this.game.time.events.loop(250, function () {
                    newText.alpha = 0.5;
                }, this);
                this.game.time.events.loop(500, function () {
                    newText.alpha = 1.0;
                }, this);
            }

            //Sound Control
            soundButton = this.game.add.sprite(this.game.world.width - 72, 64, 'sound-control');
            soundButton.anchor.setTo(0, 1);
            soundButton.alpha = 0.3;
            soundButton.inputEnabled = true;

            soundButton.events.onInputDown.add(this.soundControl, this);

            if (this.game.sound.mute == true) {
                soundButton.frame = 1;
            }
        },

        update: function () {
            background.tilePosition.x += 0.25;

            border.rotation += 0.002;
        },

        soundControl: function () {
            if (this.game.sound.mute == false) {
                this.game.sound.mute = true;
                soundButton.frame = 1;
            } else {
                this.game.sound.mute = false;
                soundButton.frame = 0;
            }
        },

        startGame: function () {
            this.state.start('Game');
        },

        startMenu: function () {
            this.state.start('MainMenu');
        }
    };

    (function () {
        // initialize the framework
        var game = new Phaser.Game(640, 1000, Phaser.CANVAS);
        // add game states
        game.state.add('Boot', GameName.Boot);
        game.state.add('Preloader', GameName.Preloader);
        game.state.add('MainMenu', GameName.MainMenu);
        game.state.add('Game', GameName.Game);
        game.state.add('GameOver', GameName.GameOver);
        game.state.add('SiteLock', GameName.SiteLock);
        // start the Boot state
        game.state.start('Boot');
    })();
}