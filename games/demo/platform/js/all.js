(function() {
    var alivenow = alivenow || {};


    alivenow.Main = (function() {
        function Main() {
            alivenow.createUser();
        }

        Main.prototype.init = function() {
            var g = new Phaser.Game(1248, 2208, Phaser.CANVAS, "", {
                create: this.create,
                preload: this.preload2,
                rotateMe: this.rotateMe
            }, true);
            g.state.add('ILoader', alivenow.ImageLoader);
            g.state.add('LandingScreen', alivenow.Landing);
            g.state.add('ScoreScreen', alivenow.ScoreScreen);
            g.state.add('FirstPage', alivenow.FirstPage);
            g.state.add('Thankyou', alivenow.Thankyou);
            g.state.add('FormScreen', alivenow.Form);
            g.state.add('WelcomeScreen', alivenow.welcome);
            g.state.add('giftPage', alivenow.giftPage);
            g.state.add('choosePlayer', alivenow.choosePlayer);

        }

        Main.prototype.preload2 = function() {
            alivenow.Global.game = this.game;
            alivenow.Global.rotateHandler = this.rotateMe;
        }

        Main.prototype.create = function() {
            Main.obj = this;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.compatibility.orientationFallback = 'viewport';
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.game.time.advancedTiming = true;
            this.game.scale.fullScreenTarget = document.body;
            window.addEventListener("resize", Main.prototype.rotateMe);
            //console.log(this,this.rotateMe)
            // Main.prototype.rotateMe.call(this);
            //_server.send(alivenow.Global.URL_CREATE,Main.prototype.setUID,null,{device:"web"});
            Main.obj.game.state.start("ILoader");
        }

        Main.prototype.setUID = function(v) {
            alivenow.Global.U_ID = v
            //console.log(alivenow.Global.U_ID + " UID");
        }

        Main.prototype.rotateMe = function() {
            var img = document.getElementById("rotate");
            if (!alivenow.Global.skipRotationHandle) {
                /*  img.style.display = "none";
                 img.style.width = "0px";
                 img.style.height = "0px"; */
                alivenow.Global.game.stage.visible = !(alivenow.Global.game.paused = false);
                alivenow.Global.game.paused = false;
                // $("#gameVideo").height($("canvas").height());

                if (alivenow.Global.videoToView != null) {
                    if (alivenow.Global.isVideoPage)
                        alivenow.Global.videoToView.play();
                }
                $(alivenow.Global.videoToView).show();
                // alivenow.Global.game.canvas.style.visibility = "visible";
                // $("canvas").show();
                //console.log(alivenow.Global.game.paused)
            }
        }

        return Main;
    })();



    alivenow.sendData = function(data, fun) {
        data = data || {};
        fun = fun || function() {};
        var t = new Date().getTime();
        data.t = t;
        var dAr = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
        var dr = CryptoJS.enc.Base64.stringify(dAr);
        var hd = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(t));
        var shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.setHMACKey(alivenow.Global.tkn.substr(3, 8), "TEXT");
        shaObj.update(hd + "." + dr);
        var hmac = shaObj.getHMAC("HEX");
        var k1 = CryptoJS.enc.Utf8.parse(hmac);
        var k2 = CryptoJS.enc.Base64.stringify(k1);
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var r1 = Math.floor(Math.random() * 6) + 1;
        var r2 = Math.floor(Math.random() * 7) + 2;
        for (var i = 0; i < r2; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        var f_str = String(r2) + String(r1) + k2.substr(0, r1) + text + k2.substr(r1);
        var out = hd + "." + dr + "." + f_str;
        var obj = {
            "user_id": alivenow.Global.user_id,
            "data": out
        }
        // $.ajax({
        //     url: alivenow.Global._url,
        //     type: "POST",
        //     data: obj,
        //     dataType: 'json',
        //     success: fun,
        //     error: function() {

        //     }
        // });
    }




    alivenow.createUser = function() {
        //var source = 'social';
        if (source != '') {
            source = source;
        } else {
            source = 'social';
        }

        alivenow.Global.source = source;

        //console.log(source+'-->Source');
        // $.ajax({
        //     url: "../createUser.php",
        //     data: {
        //         'source': source
        //     },
        //     type: "POST",
        //     dataType: 'json',
        //     success: function(data) {
        //         alivenow.Global.user_id = data.userid;
        //         alivenow.Global.device = data.device;
        //         alivenow.Global.tkn = data.gamekey;
        //         //console.log(alivenow.Global.user_id, alivenow.Global.tkn, alivenow.Global.device);
        //     },
        //     error: function() {}
        // });
    };




    alivenow.ImageLoader = (function() {
        function ImageLoader() {}
        var anim;

        ImageLoader.prototype.init = function() {
            this.twinDirection = .6;
            ImageLoader.obj = this;
            alivenow.Global.game = this;
        };



        ImageLoader.prototype.preload = function() {

            var t = 4;
            this.appLoader = new Newsfeed.Loader();
            this.appLoader.init(this.game, 'assets/Pandora.png');

            this.game.load.image("gameinstructionBg", "assets/Instruction.jpg?v=" + t);
            this.game.load.image("thankyou", "assets/thankyou.jpg?v=" + t);
            this.game.load.image("timer_bg", "assets/Timer.png?v=1.1");
            this.game.load.image("tryluck", "assets/tryluck.jpg?v=1.1");
            this.game.load.image("scoreboard", "assets/Score-board.png?v=1.1");
            this.game.load.image("game_page", "assets/game_page.jpg?v=1.1");
            this.game.load.image("score_bg", "assets/score_bg.png?v=1.1");
            this.game.load.image("bar", "assets/bar.png?v=1.1");
            this.game.load.image("tint", "assets/tint.png?v=1.1");
            this.game.load.image("movingCarnival", "assets/movingCarnival.png?v=1.1");
            this.game.load.image("selectCharacter", "assets/selectCharacter.png?v=1.1");
            this.game.load.image("male", "assets/maleCharacter.png?v=1.1");
            this.game.load.image("female", "assets/femaleCharacter.png?v=1.1");
            this.game.load.image("lightOn", "assets/lightBloom.png?v=1.1");
            this.game.load.image("lightOff", "assets/light.png?v=1.1");
            this.game.load.image("characterPage", "assets/characterPage.jpg?v=1.1");
            this.game.load.image("goldCoin", "assets/goldCoin.png?v=1.1");
            this.game.load.image("tryAgainBg", "assets/tryAgainBg.jpg?v=1.1");
            this.game.load.audio('song', 'assets/Song.mp3');
            this.game.load.audio('negativePoint', 'assets/negativePoint.mp3');
            this.game.load.audio('positivePoint', 'assets/positivePoint.mp3');
            this.game.load.audio('backgroundMusic', 'assets/BackgroundMusic.mp3');



            this.game.load.bitmapFont('regular', 'assets/spritesheets/carnivalFont.png', 'assets/spritesheets/carnivalFont.xml');
            this.game.load.atlasJSONHash("buttons", "assets/spritesheets/buttons.png?v=" + t, "assets/spritesheets/buttons.json?v=" + t);
            this.game.load.atlasJSONHash("tryAgainButtons", "assets/spritesheets/tryAgain.png?v=" + t, "assets/spritesheets/tryAgain.json?v=" + t);
            this.game.load.atlasJSONHash("menCharacter", "assets/spritesheets/menCharacter.png?v=" + t, "assets/spritesheets/menCharacter.json?v=" + t);
            this.game.load.atlasJSONHash("femaleCharacter", "assets/spritesheets/femaleCharacter.png?v=" + t, "assets/spritesheets/femaleCharacter.json?v=" + t);
            this.game.load.atlasXML('lightAnim', 'assets/spritesheets/lightAnim.png', 'assets/spritesheets/lightAnim.xml');
            this.game.load.bitmapFont('gotham', 'assets/spritesheets/gotham.png', 'assets/spritesheets/gotham.xml');
            this.game.load.atlasJSONHash("items", "assets/spritesheets/items.png?v=" + t, "assets/spritesheets/items.json?v=" + t);
            this.game.load.atlasJSONHash("birdAnim", "assets/spritesheets/birdAnimation.png?v=" + t, "assets/spritesheets/birdAnimation.json?v=" + t);
            this.game.load.atlasJSONHash("collectedPoints", "assets/spritesheets/collectedPoints.png?v=" + t, "assets/spritesheets/collectedPoints.json?v=" + t);
        };

        ImageLoader.prototype.create = function() {
            this.BGAudio = this.game.add.audio('backgroundMusic');
            this.BGAudio.loopFull(0.3);
            this.appLoader.dispose();
            this.game.state.start("FirstPage");
            //this.game.state.start("ScoreScreen");
        };

        return ImageLoader;
    })();



    alivenow.FirstPage = (function() {
        function FirstPage() {};

        FirstPage.prototype.create = function() {
            FirstPage.obj = this;
            this.landingbg = this.game.add.sprite(0, 0, 'gameinstructionBg');
            this.lightOff = this.game.add.sprite(0, 0, 'lightOff');
            this.light = this.game.add.sprite(0, 0, 'lightAnim');
            this.lightAnim = this.light.animations.add('lightUp', ["lightAnim10000", "lightAnim10001"], 5, true);
            this.light.play('lightUp');
            this.instructionText = this.game.add.bitmapText(0, 1600, 'gotham', 'Score minimum 100 to unlock your coupon!', 45);
            this.instructionText.align = 'center';
            this.instructionText.tint = 0xd80c08;
            this.instructionText.x = this.game.width / 2 - this.instructionText.textWidth / 2;
            this.playbutton = this.game.add.button((this.game.width - 600) / 2, 1746, 'buttons', this.playclicked, this, 'Paly-button', 'Paly-button');
            alivenow.Global.userid = alivenow.Global.user_id;
        }

        FirstPage.prototype.playclicked = function() {
            var data = {
                operation: 'play_click',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});
            //this.game.state.start("FormScreen");
            this.game.state.start('choosePlayer');
        }

        return FirstPage;

    })(alivenow.FirstPage || {})





    alivenow.choosePlayer = (function() {
        function choosePlayer() {};

        choosePlayer.prototype.create = function() {
            choosePlayer.obj = this;
            this.landingbg = this.game.add.sprite(0, 0, 'characterPage');

            this.lightOff = this.game.add.sprite(0, 0, 'lightOff');
            this.light = this.game.add.sprite(0, 0, 'lightAnim');
            this.lightAnim = this.light.animations.add('lightUp', ["lightAnim10000", "lightAnim10001"], 5, true);
            this.light.play('lightUp');

            this.charcterBg = this.game.add.sprite((this.game.width - 1175) / 2, (this.game.height - 2134) / 2, 'selectCharacter');
            this.male = this.game.add.button(97, 1107, 'male', this.maleChooseFn, this);
            this.female = this.game.add.button(740, 1107, 'female', this.femaleChooseFn, this);
            alivenow.Global.userid = alivenow.Global.user_id;
        }

        choosePlayer.prototype.maleChooseFn = function() {
            var data = {
                operation: 'chooseCharacter',
                user_id: alivenow.Global.user_id,
                characterType: 'male',
            };

            alivenow.sendData(data, function(data) {});
            alivenow.Global.selectedCharacter = 'male';
            this.game.state.start('LandingScreen');
            //alivenow.Global.bot_name = 'bella_bot';
        }

        choosePlayer.prototype.femaleChooseFn = function() {
            var data = {
                operation: 'chooseCharacter',
                user_id: alivenow.Global.user_id,
                characterType: 'female'
            };

            alivenow.sendData(data, function(data) {});
            alivenow.Global.selectedCharacter = 'female';
            this.game.state.start('LandingScreen');
        }

        return choosePlayer;

    })(alivenow.choosePlayer || {})











    alivenow.Landing = (function() {
        function Landing() {};
        var jumpUp, jumpDown;
        let score = 0;
        let addTrackCount = 0;
        const imgList = [{
                itemName: 'biscuit',
                width: 122,
                height: 62,
                points: 2,
                pointImg: 'plusTwo',
                songType: 'positivePoint',
            },

            {
                itemName: 'cooker',
                width: 176,
                height: 131,
                points: 2,
                pointImg: 'plusTwo',
                songType: 'positivePoint',
            },

            {
                itemName: 'hair-dryer',
                width: 144,
                height: 151,
                points: 2,
                pointImg: 'plusTwo',
                songType: 'positivePoint',
            },

            {
                itemName: 'JAcket',
                width: 123,
                height: 214,
                points: 2,
                pointImg: 'plusTwo',
                songType: 'positivePoint',
            },

            {
                itemName: 'refrigerator',
                width: 122,
                height: 244,
                points: 2,
                pointImg: 'plusTwo',
                songType: 'positivePoint',
            },

            {
                itemName: 'rice',
                width: 94,
                height: 128,
                points: 2,
                pointImg: 'plusTwo',
                songType: 'positivePoint',
            },

            /* {
                 itemName: 'ssdlogobonuspoints',
                 width: 166,
                 height:198,
                 points: 25,
             },*/

            {
                itemName: 'towel',
                width: 125,
                height: 120,
                points: 2,
                pointImg: 'plusTwo',
                songType: 'positivePoint',
            },

            {
                itemName: 'trolly',
                width: 110,
                height: 211,
                points: 2,
                pointImg: 'plusTwo',
                songType: 'positivePoint',
            },

            {
                itemName: 'tv',
                width: 178,
                height: 116,
                points: 2,
                pointImg: 'plusTwo',
                songType: 'positivePoint',
            },

            {
                itemName: 'washingMachine',
                width: 154,
                height: 211,
                points: 2,
                pointImg: 'plusTwo',
                songType: 'positivePoint',
            },

            {
                itemName: 'barricade',
                width: 318,
                height: 149,
                points: -5,
                pointImg: 'minusFive',
                songType: 'negativePoint',
            },

            {
                itemName: 'cactus',
                width: 62,
                height: 157,
                points: -2,
                pointImg: 'minusTwo',
                songType: 'negativePoint',
            },

            {
                itemName: 'rocks',
                width: 153,
                height: 112,
                points: -2,
                pointImg: 'minusTwo',
                songType: 'negativePoint',
            }
        ];
        let state = 1;

        Landing.prototype.create = function() {
            Landing.obj = this;
            this.blockGroup = this.game.add.group();
            this.recentAction = [];
            this.swipeMinDistance = 5;
            this.scoreCount = 0;
            this.time = 60000;
            this.bonusCounter = 0;
            this.timerStart = false;
            this.starbgcount = 1;
            this.starShootingCount = 1;
            this.commonPhotoStarBg = Object;
            this.shootingStarCommon = Object;
            this.charbase = 1585;
            this.tracks_dis = 500;
            this.speed = 10;
            this.coinDistance = 400;
            state = 1;
            this.music = this.game.add.audio('song');


            //console.log(imgList[0])

            this.Bg = this.game.add.tileSprite(0, 0, 1248, 2208, 'game_page');
            this.lightOff = this.game.add.sprite(0, 0, 'lightOff');
            this.light = this.game.add.sprite(0, 0, 'lightAnim');
            this.lightAnim = this.light.animations.add('lightUp', ["lightAnim10000", "lightAnim10001"], 5, true);
            this.light.play('lightUp');
            this.movingCarnival = this.game.add.tileSprite(0, 1190, 3300, 740, 'movingCarnival');
            this.tint = this.game.add.sprite(0, 0, 'tint');
            this.trackGroup = this.add.group();
            this.goldenBirdGroup = this.game.add.group();
            this.coinGroup = this.game.add.group();
            this.cltParentGroup = this.add.group();



            this.score_board = this.game.add.sprite(38, 157, 'score_bg');
            this.scoreText = this.game.add.bitmapText(280, 370, 'regular', '000', 50);
            this.scoreText.tint = 0xd8110d;

            this.timer_bg = this.game.add.sprite(836, 310, 'timer_bg');
            this.timertxt = this.game.add.bitmapText(1072, 359, 'regular', '60', 50);
            this.timertxt.tint = 0xd8110d;
            /* this.timertxt.align = 'center';
             this.timer_bg.addChild(this.timertxt);
             this.timertxt.x= (this.timer_bg.width-this.timertxt.width)/2;
             this.timertxt.y= (this.timer_bg.height-this.timertxt.height)/2;*/

            this.bird = this.game.add.sprite(this.tracks_dis, 1290, 'birdAnim');
            this.birdAnim = this.bird.animations.add('birdAnim', ["bird-animation-1", "bird-animation-2", "bird-animation-3", "bird-animation-4", "bird-animation-5", "bird-animation-6"], 15, true);
            this.bird.scale.x *= -1;
            this.bird.visible = false;

            this.countdownTimer = this.game.time.events.loop(25, this.countDown, this);


            if (alivenow.Global.selectedCharacter == 'male') {
                this.character = this.game.add.sprite(97, this.charbase, 'menCharacter');
                this.runAnim = this.character.animations.add('runAnim', ["Man-character-frame-1", "Man-character-frame-2", "Man-character-frame-3", "Man-character-frame-4", "Man-character-frame-5", "Man-character-frame-6", "Man-character-frame-7", "Man-character-frame-8"], 15, true);
                this.jumpUpAnim = this.character.animations.add('jumpUpAnim', ["Man-character-frame-9"], 15, false);
                this.jumpDownAnim = this.character.animations.add('jumpDownAnim', ["Man-character-frame-4"], 15, false);
                this.runAnimPlay();
            } else if (alivenow.Global.selectedCharacter == 'female') {
                this.character = this.game.add.sprite(97, this.charbase, 'femaleCharacter');
                this.runAnim = this.character.animations.add('runAnim', ["womenframe1", "womenframe2", "womenframe3", "womenframe4", "womenframe5", "womenframe6", "womenframe7", "womenframe8"], 15, true);
                this.jumpUpAnim = this.character.animations.add('jumpUpAnim', ["womenframe9"], 15, false);
                this.jumpDownAnim = this.character.animations.add('jumpDownAnim', ["womenframe4"], 15, false);
                this.runAnimPlay();
            }

            this.character.scale.setTo(2);

            this.game.input.onDown.add(this.onTouch, this);

            this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            this.addTrack();
            /* this.generatingCoins = setInterval(function()
             {
                  this.addCoins();  
             }.bind(this), 700);*/
        }

        Landing.prototype.onTouch = function() {
            this.jumpStart();
        }

        Landing.prototype.jumpStart = function() {
            if (state == 1) {
                let y = this.character.y;
                let tm = (this.charbase - y + 300) / 0.6;
                jumpUp = this.game.add.tween(this.character).to({
                    y: (y - 700)
                }, 500, Phaser.Easing.Quadratic.InOut, false, 0, 0, false);
                jumpUp.onComplete.add(this.onJumpUpEnd, this);
                jumpDown = this.game.add.tween(this.character).to({
                    y: this.charbase
                }, tm, Phaser.Easing.Quadratic.InOut, false, 0, 0, false);
                jumpUp.chain(jumpDown);
                jumpDown.onComplete.add(this.onJumpEnd, this);
                jumpUp.start();

                this.jumpUpAnim.play();
                state = 2;
                onGround = false;
            }

        };

        Landing.prototype.onJumpUpEnd = function() {
            if (state == 2) {
                state = 3;
                this.jumpDownAnim.play();
            }
        };


        Landing.prototype.onJumpEnd = function() {
            //if(state == 3){
            state = 1;
            //this.runAnim.play();
            this.runAnim.play();
            //}
        };

        Landing.prototype.runAnimPlay = function() {
            this.runAnim.play();
        };

        Landing.prototype.addTrack = function() {
            addTrackCount++;
            //console.log(addTrackCount+"===)>addTrackCount")
            while (this.tracks_dis < 2500) {
                /*if(addTrackCount == 13)
                    {
                        
                    }*/

                this.trk = this.game.add.sprite(this.tracks_dis, 1150, 'bar');
                this.trk.myprop = {
                    "width": 652,
                    "height": 62,
                    "collectablesGrp": this.addCollectables(652, this.tracks_dis, 1150, 1)
                }
                this.trackGroup.addChild(this.trk);

                this.tracks_dis += 400;
                //console.log('adding tracks'+this.tracks_dis, this.trk.x, this.trk.y);
                this.tracks_dis += (Math.floor(Math.random() * 350) + 300);

                let lvl2_chk = Math.floor(Math.random() * 100);
                if (lvl2_chk % 2 == 0) {
                    let d = Math.floor(Math.random() * 450);
                    this.tracks_dis -= d;

                    /*this.bird.visible = true;
                        this.birdAnim.play();*/

                    this.trk = this.game.add.sprite(this.tracks_dis, 845, 'bar');
                    this.trk.myprop = {
                        "width": 652,
                        "height": 62,
                        "collectablesGrp": this.addCollectables(652, this.tracks_dis, 845, 2)
                    }
                    this.trackGroup.addChild(this.trk);
                    this.tracks_dis += 652;
                }
                this.tracks_dis += (Math.floor(Math.random() * 350) + 300);


                if (lvl2_chk % 12 == 0) {
                    //console.log('bird coming');
                    this.addGoldenBird();
                }
            }
        }

        Landing.prototype.addGoldenBird = function() {
            this.bird = this.game.add.sprite(this.tracks_dis, 1290, 'birdAnim');
            this.birdAnim = this.bird.animations.add('birdAnim', ["bird-animation-1", "bird-animation-2", "bird-animation-3", "bird-animation-4", "bird-animation-5", "bird-animation-6"], 15, true);
            this.bird.scale.x *= -1;
            this.birdAnim.play();
            this.bird.addPoint = 1;
            this.goldenBirdGroup.addChild(this.bird);
        }

        Landing.prototype.addCoins = function() {
            while (this.coinDistance < 1248) {
                this.coins = this.game.add.sprite(this.coinDistance, 1787, 'goldCoin');
                this.coins.addPoint = 1;
                this.coinGroup.addChild(this.coins);
                this.coinDistance += 600;
            }

        }

        Landing.prototype.addCollectables = function(w, x, y, lvl) {
            //this.balloonHit = false;
            let cl_index = Math.floor(Math.random() * imgList.length);
            let item_w = imgList[cl_index].width;

            let maxItem = Math.floor(w / (item_w + 10));
            let itemCount = Math.floor(Math.random() * (maxItem - 1)) + 1;
            let distX = (w - (itemCount * item_w)) / itemCount;
            let abx = x + (distX / 2);

            let itemGroup = this.add.group();

            if (addTrackCount == 13 && lvl == 1) {
                let obj;
                obj = this.game.add.sprite(abx, 955, 'items', 'ssdlogobonuspoints');
                obj.width = 166;
                obj.height = 198;
                obj.points = 25;
                obj.addpoint = 25;
                obj.pointImg = 'plusTwentyFive';
                obj.songType = 'positivePoint';

                itemGroup.addChild(obj);
                abx += (distX + item_w);
            } else {
                for (let i = 0; i < itemCount; i++) {

                    let obj;
                    obj = this.game.add.sprite(abx, (y - imgList[cl_index].height), 'items', imgList[cl_index].itemName);
                    obj.addpoint = imgList[cl_index].points;
                    obj.pointImg = imgList[cl_index].pointImg;
                    obj.songType = imgList[cl_index].songType;
                    itemGroup.addChild(obj);
                    abx += (distX + item_w);
                }
            }






            this.cltParentGroup.addChild(itemGroup);
            return itemGroup;
        };


        Landing.prototype.getRandomInteger = function(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }



        Landing.prototype.countDown = function() {
            this.time -= 25;

            if (this.time > 0) {

                if (Math.floor(this.time / 1000) < 10) {

                    this.timertxt.text = "0" + Math.floor(this.time / 1000);
                } else {
                    ////console.log(this.time+'-->timer running.');
                    this.timertxt.text = Math.floor(this.time / 1000);
                }


            } else {
                //this.song.stop();
                /*clearInterval(newitemsinterval);
                clearInterval(this.starBgAnimation);
                clearInterval(this.shootingBgAnimation);
                */
                alivenow.Global.score = score;

                if (alivenow.Global.score >= 100) {
                    alivenow.Global.game_win = 1;
                } else if (alivenow.Global.score < 100) {
                    alivenow.Global.game_win = 0;
                }

                var data = {
                    operation: 'scoredata',
                    user_id: alivenow.Global.user_id,
                    score: alivenow.Global.score,
                    time: 60 - Math.floor(this.time / 1000),
                    game_no: alivenow.Global.game_no,
                    game_win: alivenow.Global.game_win,
                    source: alivenow.Global.source,
                    characterType: alivenow.Global.selectedCharacter,
                };
                alivenow.sendData(data, function(data) {});
                score = 0;
                //alivenow.Global.score = score;
                this.game.state.start('ScoreScreen');
            }
        }


        //---------->update<-----------

        Landing.prototype.update = function() {
            let removeList = [];
            let onGroundFlag = false;

            let boundsPlT = this.character.getBounds();
            let pl_x = boundsPlT.x + 5;
            let pl_w = boundsPlT.width - 10;
            let pl_y = boundsPlT.y + boundsPlT.height - 50;
            let pl_h = 50;

            let playerPoly = new Phaser.Polygon([
                new Phaser.Point(pl_x, pl_y),
                new Phaser.Point(pl_x + pl_w, pl_y),
                new Phaser.Point(pl_x + pl_w, pl_y + pl_h),
                new Phaser.Point(pl_x, pl_y + pl_h)
            ]);
            let playerGraphics = this.game.add.graphics(0, 0);
            playerGraphics.beginFill(0x000000, 0);
            playerGraphics.drawPolygon(playerPoly.points);
            playerGraphics.endFill();
            let boundsPl = playerGraphics.getBounds();
            playerGraphics.destroy();


            this.Bg.tilePosition.x -= this.speed;
            this.movingCarnival.tilePosition.x -= this.speed;
            this.tracks_dis -= this.speed;
            this.coinDistance -= this.speed;



            if (this.upKey.isDown) {
                //console.log('up key event happened')
            }

            if (this.spaceKey.isDown) {
                //console.log('space key event')
            }


            this.trackGroup.forEach(function(item) {
                let onItem = false;
                if ((item.x + item.myprop.width) > 0) {
                    if (state == 1 || state == 3) {
                        var boundsB = item.getBounds();
                        if (Phaser.Rectangle.intersects(boundsB, boundsPl)) {
                            onGroundFlag = true;
                            onItem = true;
                            this.character.y = (boundsB.y - this.character.height);
                        }
                    }

                    item.x -= this.speed;
                    item.myprop.collectablesGrp.forEach(function(clt) {
                        if (onItem && (clt.addpoint > 0 || clt.addpoint == -2 || clt.addpoint == -5)) {
                            let cltBound = clt.getBounds();
                            if (Phaser.Rectangle.intersects(cltBound, boundsPl)) {
                                score += clt.addpoint;
                                this.scoreText.text = score;
                                clt.addpoint = 0;
                            }
                        }
                        if (clt.addpoint == 0) {
                            this.myspriteanim = this.game.add.sprite(clt.x, clt.y, 'collectedPoints', clt.pointImg);
                            this.myspriteanim.scale.setTo(2);
                            this.game.add.tween(this.myspriteanim).to({
                                alpha: 0,
                                y: -5,
                                x: -10
                            }, 1000, Phaser.Easing.Linear.None, true);
                            this.musicPoint = this.game.add.audio(clt.songType);
                            this.musicPoint.play();
                            clt.destroy();
                        }
                        clt.x -= this.speed;
                    }.bind(this));
                } else {
                    removeList.push(item.myprop.collectablesGrp);
                    removeList.push(item);
                }



            }.bind(this));



            this.goldenBirdGroup.forEach(function(item) {
                if ((item.x - item.width) > 0) {
                    if (item.addPoint == 1) {
                        var boundsBird = item.getBounds();
                        if (Phaser.Rectangle.intersects(boundsBird, boundsPl)) {
                            //console.log('bird hitting');
                            item.addPoint = 0;
                            score += 10;
                            this.speed += 9;
                            this.myspriteanim3 = this.game.add.sprite(item.x, item.y, 'collectedPoints', 'plusTen');
                            this.myspriteanim3.scale.setTo(2);
                            this.game.add.tween(this.myspriteanim3).to({
                                alpha: 0,
                                y: -5,
                                x: -10
                            }, 1000, Phaser.Easing.Linear.None, true);
                            this.birdSetTimeout();
                            this.musicPoint = this.game.add.audio('positivePoint');
                            this.musicPoint.play();
                        }

                    }

                    item.x -= this.speed;
                } else {
                    removeList.push(item);
                }
            }.bind(this));


            this.coinGroup.forEach(function(item) {
                if (item.addPoint == 1) {
                    var coinBound = item.getBounds();
                    if (Phaser.Rectangle.intersects(coinBound, boundsPl)) {
                        this.music.play();
                        score += 1;
                        this.scoreText.text = score;
                        item.addPoint = 0;
                        this.myspriteanim2 = this.game.add.sprite(item.x, item.y, 'collectedPoints', 'plusOne');
                        this.myspriteanim2.scale.setTo(2);
                        this.game.add.tween(this.myspriteanim2).to({
                            alpha: 0,
                            y: -5,
                            x: -10
                        }, 1000, Phaser.Easing.Linear.None, true);
                        this.musicPoint = this.game.add.audio('positivePoint');
                        this.musicPoint.play();
                        removeList.push(item);
                    }
                    item.x -= this.speed;
                } else {
                    removeList.push(item);
                }
            }.bind(this));




            if (state == 3 && this.character.y == this.charbase) {
                onGround = true;
                state = 1;
                this.runAnim.play();
                onGround = true;
            } else if (state == 3 && onGroundFlag) {
                jumpDown.pause();
                state = 1;
                this.runAnim.play();
            } else if (!onGroundFlag) {
                if (jumpDown != undefined /*&& jumpDown.isPaused*/ && this.character.y < this.charbase) {
                    state = 3;
                    jumpDown.resume();
                    this.jumpDownAnim.play();
                }
            }


            while (removeList.length) {
                removeList[0].destroy();
                removeList.shift();
            }

            if (this.tracks_dis < 2250) {
                this.addTrack();
                //this.addGoldenBird();
            }

            if (this.coinDistance < 2250) {
                this.addCoins();
                //this.addGoldenBird();
            }

            if (score <= 0) {
                score = 0;
                this.scoreText.text = score;
            }

        }

        Landing.prototype.birdSetTimeout = function() {
            setTimeout(function() {
                this.speed = 10;
            }.bind(this), 3000);
        }


        Landing.prototype.randomRange = function(minNum, maxNum) {
            return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
        };

        return Landing;

    })(alivenow.Landing || {})







    alivenow.ScoreScreen = (function() {
        function ScoreScreen() {};

        ScoreScreen.prototype.create = function() {
            ScoreScreen.obj = this;
            if (alivenow.Global.score >= 100) {
                this.bglogo = this.game.add.sprite(0, 0, 'tryluck');
                this.submitscore = this.game.add.button((this.game.width - 606) / 2, 1462, 'buttons', this.submitscorefn, this, 'Submit-score', 'Submit-score');
                this.playagain = this.game.add.button((this.game.width - 606) / 2, 1738, 'buttons', this.playagainfn, this, 'Play-again', 'Play-again');
            } else if (alivenow.Global.score < 100) {
                this.bglogo = this.game.add.sprite(0, 0, 'tryAgainBg');
                this.scoreText = this.game.add.bitmapText(0, 1367, 'gotham', 'Score minimum 100 to unlock your coupon!', 45);
                this.scoreText.align = 'center';
                this.scoreText.tint = 0xd80c08;
                this.scoreText.x = this.game.width / 2 - this.scoreText.textWidth / 2;

                this.tryButton = this.game.add.button((this.game.width - 606) / 2, 1740, 'tryAgainButtons', this.tryAgainfn, this, 'try-again-button-rollover', 'try-again-button');
            }

            this.lightOff = this.game.add.sprite(0, 0, 'lightOff');
            this.light = this.game.add.sprite(0, 0, 'lightAnim');
            this.lightAnim = this.light.animations.add('lightUp', ["lightAnim10000", "lightAnim10001"], 5, true);
            this.light.play('lightUp');

            this.scoreboard = this.game.add.sprite((this.game.width - 1082) / 2, 770, 'scoreboard');
            this.scoreText = this.game.add.bitmapText(0, 1050, 'regular', alivenow.Global.score, 120);

            this.scoreText.tint = 0xd80c08;
            this.scoreText.align = 'center';
            this.scoreText.x = this.game.width / 2 - this.scoreText.textWidth / 2;




        }

        ScoreScreen.prototype.tryAgainfn = function() {
            alivenow.Global.score = 0;
            alivenow.Global.game_no++;
            var data = {
                operation: 'try_again',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});
            this.game.state.start('choosePlayer');
        }

        ScoreScreen.prototype.submitscorefn = function() {
            var data = {
                operation: 'submit_score',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});

            if (alivenow.Global.formSubmitted) {
                this.game.state.start('Thankyou');
            } else {
                this.game.state.start('FormScreen');
            }

        }

        ScoreScreen.prototype.playagainfn = function() {
            var data = {
                operation: 'play_again',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});
            alivenow.Global.score = 0;
            alivenow.Global.game_no++;
            this.game.state.start('choosePlayer');
        }

        return ScoreScreen;

    })(alivenow.ScoreScreen || {})






    alivenow.Form = (function() {
        function Form() {};

        Form.prototype.create = function() {
            Form.obj = this;
            //this.hideFormPage();
            //$("canvas").hide();
            //$(".formLogo").show();

            let mt = $('canvas').css('marginTop');
            $("#formDIv").width($('canvas').width());
            $("#formDIv").height(($('canvas').height() - parseInt(mt)));
            $("#formDIv").css('marginTop', mt);
            $('canvas').hide();
            $("#formDIv").show();
            $(".sbmit").click(function() {
                Form.obj.winButton();
            });
            $(".txt").on("click", this.tandcClick);

            Form.obj.bulbAnim = setInterval(function() {
                Form.obj.Flicker();
            }, 200);
        }

        Form.prototype.tandcClick = function() {
            $(".popupBG").show();
        }

        Form.prototype.Flicker = function() {
            // console.log('mugello');
            $("#bulbOn").delay(400).fadeTo(100, 0).delay(400).fadeTo(100, 1);
        }

        Form.prototype.winButton = function() {
            this.nameValue = $("#name").val();
            this.mobileValue = $('#mobile').val();
            //this.emailValue = $("#email").val();
            this.ck = document.getElementById('agree').checked;
            var mob = /^[1-9]{1}[0-9]{9}$/;
            //console.log(this.nameValue, this.mobileValue);

            if (this.nameValue == "") {
                $(".err").html("Please enter your name.");
            } else if (mob.test(this.mobileValue) == false) {
                $(".err").html("Please enter valid 10 digit number.");
            } else if (!this.ck) {
                $(".err").html("Please agree to the terms and conditions.");
            } else {
                $(".err").html("Successfull.");
                var data = {
                    operation: 'formdata',
                    user_id: alivenow.Global.user_id,
                    name: this.nameValue,
                    mobile: this.mobileValue,
                };
                alivenow.sendData(data, function(data) {});


                $('canvas').show();
                $("#formDIv").hide();
                alivenow.Global.playerName = this.nameValue;
                clearInterval(Form.obj.bulbAnim);
                alivenow.Global.formSubmitted = true;
                Form.obj.game.state.start('Thankyou');
            }
        }

        Form.prototype.formDataCallBack = function() {
            $(".name").val("");
            $(".email").val("");
            $(".mobile").val("");
            $(".err").html("");
        }

        Form.prototype.showCodeForm = function() {
            this.hideFormPage();
            this.submitButton.visible = true;
            $(".codeSection").show();
        }

        Form.prototype.validateEmail = function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        Form.prototype.submitButtonFn = function() {
            this.codeValue = $(".code").val();
            if (this.codeValue == "") {
                $(".err2").html("Please enter code.");
            } else {
                alivenow.send(alivenow.Global._url, {
                    operation: 'codedata',
                    user_id: alivenow.Global.user_id,
                    code: this.codeValue
                }, this.codeDataCallBack);
                $(".codeSection").hide();
                this.submitButton.visible = false;
                this.hideFormPage();
                //this.oopsText.visible = true;
            }
        }

        Form.prototype.tAndCFn = function() {
            alivenow.tAndCFn();
        }




        return Form;

    })(alivenow.Form || {})







    alivenow.Thankyou = (function() {
        function Thankyou() {};

        Thankyou.prototype.create = function() {
            Thankyou.obj = this;
            this.bg = this.game.add.sprite(0, 0, 'thankyou');
            this.lightOff = this.game.add.sprite(0, 0, 'lightOff');
            this.light = this.game.add.sprite(0, 0, 'lightAnim');
            this.lightAnim = this.light.animations.add('lightUp', ["lightAnim10000", "lightAnim10001"], 5, true);
            this.light.play('lightUp');
            this.fshare = this.game.add.button(100, 1359, 'buttons', this.fShareBtn, this, 'f-share', 'f-share');
            this.whatsapp = this.game.add.button(334, 1503, 'buttons', this.whatsappBtn, this, 'Whatsappshare', 'Whatsappshare');

            this.tshare = this.game.add.button(857, 1503, 'buttons', this.tsharefn, this, 't-share', 't-share');

            this.retry = this.game.add.button((this.game.width - 606) / 2, 1808, 'buttons', this.retryBtn, this, 'retry-button', 'retry-button');

        }

        Thankyou.prototype.retryBtn = function() {
            alivenow.Global.score = 0;
            alivenow.Global.game_no++;
            var data = {
                operation: 'retry',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});
            this.game.state.start('choosePlayer');
        }

        Thankyou.prototype.fShareBtn = function() {
            var data = {
                operation: 'fshare',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});
            window.open("https://www.facebook.com/sharer.php?u=http://bit.ly/2CXwCFw", "_blank");

        }

        Thankyou.prototype.whatsappBtn = function() {
            var data = {
                operation: 'whatsapp_share',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});
            location.href = "whatsapp://send?text= Run More. Win More %23 BachatRun Sabse Saste 5 Din - 23-27Jan http://bit.ly/2TEPPRS";

        }

        Thankyou.prototype.tsharefn = function() {
            var data = {
                operation: 'tshare',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});
            window.open('https://twitter.com/intent/tweet?text=Run More. Win More %23 BachatRun Sabse Saste 5 Din - 23-27Jan: http://bit.ly/2QvMK4D');
        }


        return Thankyou;

    })(alivenow.Thankyou || {})



    alivenow.Global = {
        game: null,
        _device: "",
        _os: "",
        skipRotationHandle: false,
        rotateHandler: null,
        user_id: '',
        _url: "../webservice.php",
        gameKey: "",
        score: 0,
        formSubmitted: false,
        tkn: '',
        userid: '',
        game_no: 1,
        device: '',
        bot_name: '',
        playerName: '',
        game_win: 0,
        highest_score: 0,
        selectedCharacter: '',
        source: '',
    }


    var myObj = new alivenow.Main();
    myObj.init();

    //################################################################
})();