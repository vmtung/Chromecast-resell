(function() {
    var alivenow = alivenow || {};
    var BGAudio;

    alivenow.Main = (function() {
        function Main() {
            alivenow.createUser();
        }

        Main.prototype.init = function() {
            var g = new Phaser.Game(1242, 2208, Phaser.CANVAS, "", {
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
            g.state.add('InstructionPage', alivenow.InstructionPage);
            g.state.add('EmailScreen', alivenow.EmailScreen);
            g.state.add('UploadScreen', alivenow.UploadScreen);

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
        $.ajax({
            url: alivenow.Global._url,
            type: "POST",
            data: obj,
            dataType: 'json',
            success: fun,
            error: function() {

            }
        });
    }




    alivenow.createUser = function() {
        var source = 'social';
        alivenow.Global.source = source;

        //console.log(source+'-->Source');
        $.ajax({
            url: "https://www.newsfeedsmartapp.com/BenJerry/createUser.php",
            data: {
                'source': source,
                'gameName': 'BJSAG'
            },
            type: "POST",
            dataType: 'json',
            success: function(data) {
                alivenow.Global.user_id = data.userid;
                alivenow.Global.device = data.device;
                alivenow.Global.tkn = data.gamekey;
                //console.log(alivenow.Global.user_id, alivenow.Global.tkn, alivenow.Global.device);
            },
            error: function() {}
        });
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
            this.path = "assets/";
            this.appLoader.init(this.game, this.path + 'Loader.png');

            this.game.load.image('INTROBG', this.path + 'Intro_BG.jpg');
            this.game.load.image('INSTRUCTIONBG', this.path + 'Instructions.jpg');
            this.game.load.image('GAMEBG', this.path + 'Game_BG.jpg');
            this.game.load.image('SCOREICONCOW', this.path + 'Score_Icon.png');
            this.game.load.image('STARS', this.path + 'Stars.png');
            this.game.load.image('BG', this.path + 'Background.jpg');
            this.game.load.image('bnjLogo', this.path + 'Ben&Jerry_Logo.png');
            this.game.load.image('highscoretxt', this.path + 'checkHighScore.png');
            this.game.load.image('UPLOAD_SUCCESS', this.path + 'UploadSuccess.png');
            this.game.load.image('SCORE_BAR', this.path + 'scoreBGLayer.png');
            this.game.load.image('YELLOW_STRIP', this.path + 'yellowStripeBar.png');
            this.game.load.image('TIMER_BG', this.path + 'Timer.png');
            this.game.load.spritesheet('negative2', this.path + 'negative2.png', 132, 634, 3);
            this.game.load.spritesheet('negative3', this.path + 'negative3.png', 246, 354, 3);
            this.game.load.spritesheet('negative4', this.path + 'negative4.png', 222, 202, 3);
            this.game.load.spritesheet('BARPROGRESS', this.path + 'progressBar.png', 735, 185, 10);

            this.game.load.atlasJSONHash('items', this.path + 'items.png?v=' + t, this.path + 'items.json?v=' + t);
            this.game.load.atlasJSONHash('CLOCK_ANIM', this.path + 'clockAnim.png?v=' + t, this.path + 'clockAnim.json?v=' + t);
            this.game.load.atlasJSONHash("buttons", this.path + "buttons.png?v=" + t, this.path + "buttons.json?v=" + t);
            this.game.load.atlasXML('ROCKETANIM', this.path + 'jetRocket.png', this.path + 'jetRocket.xml');
            //this.game.load.atlasXML('PROGRESSBAR', this.path + 'progressBar.png', this.path + 'progressBar.xml');
            this.game.load.atlasXML('HANDANIM', this.path + 'handAnimation.png', this.path + 'handAnimation.xml');
            this.game.load.bitmapFont('regular', this.path + 'openSansRegular.png', this.path + 'openSansRegular.xml');
            this.game.load.bitmapFont('bold', this.path + 'openSansBold.png', this.path + 'openSansBold.xml');
            this.game.load.bitmapFont('chunk', this.path + 'chunkFont.png', this.path + 'chunkFont.xml');
            this.game.load.audio('ROCKET_SOUND', this.path + 'rocketSound.mp3');
            this.game.load.audio('NEGATIVE_SOUND', this.path + 'Negative.mp3');
            this.game.load.audio('POSITIVE_SOUND', this.path + 'positive.mp3');
            this.game.load.audio('BACKGROUND_SOUND', this.path + 'BGMUSIC.mp3');

        };

        ImageLoader.prototype.create = function() {
            BGAudio = this.game.add.audio('BACKGROUND_SOUND');
            BGAudio.loopFull(0.3);
            this.appLoader.dispose();
            this.game.state.start("FirstPage");
        };

        return ImageLoader;
    })();



    alivenow.FirstPage = (function() {
        function FirstPage() {};

        FirstPage.prototype.create = function() {
            FirstPage.obj = this;
            this.landingbg = this.game.add.sprite(0, 0, 'INTROBG');
            this.playbutton = this.game.add.button((this.game.width - 735) / 2, 1561, 'buttons', this.playclicked, this, 'Play_Button_roll', 'Play_Button');
            /*
           alivenow.Global.userid = alivenow.Global.user_id; */
        }

        FirstPage.prototype.playclicked = function() {
            var data = {
                operation: 'play_click',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});
            //this.game.state.start("LandingScreen");
            this.game.state.start('FormScreen');
        }

        return FirstPage;

    })(alivenow.FirstPage || {})



    alivenow.InstructionPage = (function() {
        function InstructionPage() {};

        InstructionPage.prototype.create = function() {
            InstructionPage.obj = this;

            this.landingbg = this.game.add.sprite(0, 0, 'INSTRUCTIONBG');
            this.playbutton = this.game.add.button((this.game.width - 735) / 2, 1618, 'buttons', this.playclicked, this, 'Play_Button_roll', 'Play_Button');

            this.completionSprite = this.game.add.graphics(0, 0);
            this.completionSprite.beginFill(0xFFFF00, 0);
            this.completionSprite.drawRect(563, 1948, 200, 50);
            this.completionSprite.inputEnabled = true;
            this.completionSprite.input.useHandCursor = true;
            this.completionSprite.events.onInputDown.add(this.tandc, this);


            this.privacySprite = this.game.add.graphics(0, 0);
            this.privacySprite.beginFill(0xFFFF00, 0);
            this.privacySprite.drawRect(810, 1948, 240, 50);
            this.privacySprite.inputEnabled = true;
            this.privacySprite.input.useHandCursor = true;
            this.privacySprite.events.onInputDown.add(this.privacyClick, this);

        }

        InstructionPage.prototype.tandc = function() {
            var data = {
                operation: 'termsAndCondition',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});
            $('.popupBG').show();
        }

        InstructionPage.prototype.privacyClick = function() {
            var data = {
                operation: 'privacy_click',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});
            $('.popupBGPrivacy').show();
        }



        InstructionPage.prototype.playclicked = function() {
            var data = {
                operation: 'instructionPlay',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});
            this.game.state.start('LandingScreen');
        }

        return InstructionPage;

    })(alivenow.InstructionPage || {})




    alivenow.Landing = (function() {
        function Landing() {};
        let score = 0;
        var objDistance = 0;
        var myArray = [];
        var scoreValue = 0;
        var nsr;
        var mask;
        var sc = 0;
        //var pointer = scene.input.activePointer;

        Landing.prototype.create = function() {
            Landing.obj = this;
            this.time = 20000 + (alivenow.Global.productsPurchased * 5000);
            this.finalTime = 20 + (alivenow.Global.productsPurchased * 5);
            state = 1;
            objDistance = 0;
            nsr = -250;


            this.gameBg = this.game.add.sprite(0, 0, 'GAMEBG');
            this.scoreIconCow = this.game.add.sprite(38, 162, 'SCOREICONCOW');
            this.stars = this.game.add.tileSprite(0, -3472, 1242, 5680, 'STARS');
            this.objectGroup = this.add.group();
            this.pointGroup = this.add.group();
            //this.scoreText = this.game.add.bitmapText(280, 370, 'regular', '000', 50);
            //this.timertxt = this.game.add.bitmapText(1072, 359, 'regular', '60', 50);
            this.cow = this.game.add.sprite((this.game.width - 222) / 2, 1277, 'ROCKETANIM');
            this.rocketanim = this.cow.animations.add('fireRocket', ["jetPack0000", "jetPack0001", "jetPack0002", "jetPack0003"], 15, true);
            this.cow.play('fireRocket');

            this.handanim = this.game.add.sprite((this.game.width - 1138) / 2, 1925.95, 'HANDANIM');
            this.animationHand = this.handanim.animations.add('handAnim', ["handInstruction0000", "handInstruction0001", "handInstruction0002", "handInstruction0003", "handInstruction0004"], 15, true)
            this.handanim.play('handAnim');

            setTimeout(function() {
                this.handanim.animations.stop();
                this.handanim.visible = false;
            }.bind(this), 2000)

            let Box1Poly = new Phaser.Polygon([
                new Phaser.Point(552, 1280),
                new Phaser.Point(690, 1280),
                new Phaser.Point(690, 1510),
                new Phaser.Point(552, 1510)
            ]);

            this.cartRect = this.game.add.graphics(0, 0);
            this.cartRect.beginFill(0xffffff, 0);
            this.cartRect.drawPolygon(Box1Poly.points);
            this.cartRect.endFill();

            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.countdownTimer = this.game.time.events.loop(25, this.countDown, this);

            this.scorepointstext = this.game.add.bitmapText(250, 229, 'chunk', '0', 35);
            this.scorepointstext.tint = '0xfcb713';

            this.pointstext = this.game.add.bitmapText(346, 250, 'chunk', 'Points', 15);
            this.pointstext.tint = '0xfcb713';

            this.scorebar = this.game.add.sprite(43, 281, 'SCORE_BAR');
            this.yellowstrip = this.game.add.sprite(51, 287, 'YELLOW_STRIP');
            mask = this.game.add.graphics(0, 0);
            mask.beginFill(0xffffff);
            this.yellowstrip.mask = mask;

            this.timerbg = this.game.add.sprite(996, 143, 'TIMER_BG');
            this.timetext = this.game.add.bitmapText(879, 173, 'chunk', 'Time:', 30);
            this.timetext.tint = '0xfcb713';

            this.gifFile = this.game.add.sprite(1005, 150, 'CLOCK_ANIM');
            this.gifFile.alpha = 0.6;
            this.gifFile.scale.setTo(2.2);

            this.rocketSound = this.game.add.audio('ROCKET_SOUND');
            this.negativeSound = this.game.add.audio('NEGATIVE_SOUND');
            this.positiveSound = this.game.add.audio('POSITIVE_SOUND');
            this.rocketSound.loopFull(0.3);
        }

        Landing.prototype.move = function(pointer, x, y) {
            mask.x = x - 20;
            mask.y = y - 20;
        }



        Landing.prototype.getRandomInteger = function(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }



        Landing.prototype.countDown = function() {
            this.time -= 25;

            if (this.time > 0) {
                this.gifFile.frameName = 'Pie_' + (this.finalTime - Math.floor(this.time / 1000));
            } else {
                alivenow.Global.score = score;
                var data = {
                    operation: 'scoredata',
                    user_id: alivenow.Global.user_id,
                    score: alivenow.Global.score,
                    time: this.finalTime,
                };
                alivenow.sendData(data, function(data) {});
                score = 0;
                this.rocketSound.stop();
                this.negativeSound.stop();
                this.positiveSound.stop();
                this.game.state.start('EmailScreen');
            }
        }


        //---------->update<-----------

        Landing.prototype.update = function() {
            let moveSpeed = 20;
            let objSpeed = 27;
            let trashBin = [];

            if (Math.floor(this.time / 1000) < 12) {
                objSpeed = 40;
            }

            this.stars.tilePosition.y += 5;


            if (this.game.input.activePointer.isDown) {
                var x = this.cow.x + (this.cow.width / 2);

                /*  if (this.game.input.x > 621 && (this.game.input.x - x) > moveSpeed && x < 1242) { 
                     this.cow.x += moveSpeed;
                     this.cartRect.x += moveSpeed;
                 }
                 
                 else if (this.game.input.x < x && (x - this.game.input.x) > moveSpeed && x > 110) {
                     this.cow.x -= moveSpeed;
                     this.cartRect.x -= moveSpeed;
                 } */
                if (this.game.input.x > 621 && this.game.input.x <= 1242) {
                    if (this.cow.x >= (1242 - this.cow.width)) {
                        this.cow.x = 1242 - this.cow.width;
                        this.cartRect.x = 520;
                    }
                    this.cow.x += moveSpeed;
                    this.cartRect.x += moveSpeed;
                } else if (this.game.input.x < 621 && this.game.input.x >= 0) {
                    if (this.cow.x <= 0) {
                        this.cow.x = 0;
                        this.cartRect.x = -520;
                    }
                    this.cow.x -= moveSpeed;
                    this.cartRect.x -= moveSpeed;
                }
            } else {
                if (this.cursors.left.isDown && this.cow.x > 2) { //125
                    this.cow.x -= moveSpeed;
                    this.cartRect.x -= moveSpeed;
                } else if (this.cursors.right.isDown && this.cow.x < 1020) { //857
                    this.cow.x += moveSpeed;
                    this.cartRect.x += moveSpeed;
                }
            }


            objDistance += objSpeed;
            let boundscartRect = this.cartRect.getBounds();
            let that = this;
            this.objectGroup.forEach(function(item) {
                let boundsA = item.getBounds();
                let x1 = (boundsA.x + item.marginPx);
                let x2 = (boundsA.x + boundsA.width - (item.marginPx * 2));
                let y1 = (boundsA.y + item.marginPx);
                let y2 = (boundsA.y + boundsA.height - (item.marginPx * 2));


                let Box1Poly = new Phaser.Polygon([
                    new Phaser.Point(x1, y1),
                    new Phaser.Point(x2, y1),
                    new Phaser.Point(x2, y2),
                    new Phaser.Point(x1, y2)
                ]);

                let Box1Graphics = that.game.add.graphics(0, 0);
                Box1Graphics.beginFill(0x000000, 0);
                Box1Graphics.drawPolygon(Box1Poly.points);
                Box1Graphics.endFill();
                Box1Graphics.alpha = 0;
                let boundsB = Box1Graphics.getBounds();
                Box1Graphics.destroy();

                if (Phaser.Rectangle.intersects(boundsB, boundscartRect)) {
                    scoreValue += item.pointsVal;
                    nsr += item.pointsVal;

                    if (item.pointsVal < 0) {
                        var pntTxt = that.add.text((boundscartRect.x + 70), 1300, '-5', {
                            fill: "#ffffff",
                            font: "65px bold",
                            align: "center",

                        });
                        //var music1 = that.game.add.audio('music1');
                        Landing.obj.negativeSound.play();
                        if (score <= 0) {
                            score = 0;
                        } else {
                            score -= 5;
                        }

                        Landing.obj.scorepointstext.text = score;

                    } else {
                        var pntTxt = that.add.text((boundscartRect.x + 70), 1300, '+10', {
                            fill: "#ffffff",
                            font: "65px bold",
                            align: "center"
                        });
                        score += 10;
                        Landing.obj.scorepointstext.text = score;
                        //mask.width += 10;
                        sc += 3.5;
                        mask.drawRect(51, 287, sc, 50);
                        Landing.obj.positiveSound.play();
                    }
                    pntTxt.tint = 0xffffff;
                    pntTxt.moveCount = 0;

                    //if(score < 9)

                    that.pointGroup.addChild(pntTxt);

                    if (scoreValue < 0) {
                        scoreValue = 0;
                        nsr = -250;
                    }
                    let myobj = {
                        "cs": scoreValue,
                        "os": item.pointsVal,
                        "px": boundscartRect.x,
                        "py": boundscartRect.y,
                        "ox": boundsB.x,
                        "oy": boundsB.y,
                        "cd": new Date()
                    };
                    myArray.push(myobj);
                    //that.scoreText.text = scoreValue;
                    trashBin.push(item);
                }

                item.y += objSpeed;
                if (item.y > 2210) {
                    trashBin.push(item);
                }
            });

            this.pointGroup.forEach(function(item) {
                if (item.moveCount < 120) {
                    item.y -= 5;
                    item.moveCount++;
                } else {
                    trashBin.push(item);
                }

            });
            trashBin.forEach(function(item) {
                item.destroy();
            });

            // console.log(objDistance+'-->objDistance');
            if (objDistance >= 0) {
                this.addObject();
            }


        }


        Landing.prototype.addObject = function() {
            let px = Math.random() * 1000;
            let py = (Math.random() * 700 + 350) * -1;
            objDistance += py;
            let objType = Math.floor(Math.random() * 6) + 1;
            let obj;
            if (objType > 1 && objType <= 4) {
                //obj = this.game.add.sprite(px, py, 'items', 'negative' + objType);
                obj = this.game.add.sprite(px, py, 'negative' + objType);
                obj.scale.setTo(0.7)
                var walk = obj.animations.add('walk');
                obj.animations.play('walk', 30, true);
                obj.marginPx = 14;
                obj.pointsVal = -5;
            } else /* if(objType == 1) */ {
                obj = this.game.add.sprite(px, py, 'items', 'positive' + objType);
                obj.scale.setTo(0.7)
                obj.marginPx = 7;
                obj.pointsVal = 10;
            }
            this.objectGroup.addChild(obj);
        };


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
            this.game.state.start('InstructionPage');
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
            this.game.state.start('InstructionPage');
        }

        return ScoreScreen;

    })(alivenow.ScoreScreen || {})






    alivenow.Form = (function() {
        function Form() {};
        var selectedCountry = '';
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

            $(document).ready(function() {
                $("select.productItems").change(function() {
                    selectedCountry = $(this).children("option:selected").val();
                    console.log("You have selected the country - " + selectedCountry);
                });
            });

        }

        Form.prototype.winButton = function() {
            //this.dropvalue;
            this.nameValue = $("#name").val();
            this.receiptValue = $('#receipt').val();

            //this.emailValue = $("#email").val();
            //this.ck = document.getElementById('agree').checked;
            //var mob = /^[1-9]{1}[0-9]{9}$/;
            //console.log(this.nameValue, this.receiptValue);

            if (this.nameValue == "") {
                $(".err").html("Please enter your name.");
            } else if (this.receiptValue == "") {
                $(".err").html("Please enter receipt number.");
            } else if (selectedCountry == '' || selectedCountry == '0') {
                $(".err").html("Please select number of products.");
            } else {
                $(".err").html("");
                var data = {
                    operation: 'formdata',
                    user_id: alivenow.Global.user_id,
                    name: this.nameValue,
                    receiptNumber: this.receiptValue.toString(),
                    productsPurchased: selectedCountry.toString(),
                };
                alivenow.sendData(data, function(data) {});
                $("#formDIv").hide();
                $('canvas').show();

                alivenow.Global.playerName = this.nameValue;
                alivenow.Global.formSubmitted = true;

                alivenow.Global.username = this.nameValue;
                alivenow.Global.productsPurchased = selectedCountry;
                console.log(alivenow.Global.username, alivenow.Global.productsPurchased);
                this.game.state.start('InstructionPage');
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



    alivenow.EmailScreen = (function() {
        function EmailScreen() {};

        EmailScreen.prototype.create = function() {
            EmailScreen.obj = this;
            console.log('on Email Screen');
            let mt = $('canvas').css('marginTop');
            $("#emailDiv").width($('canvas').width());
            $("#emailDiv").height(($('canvas').height() - parseInt(mt)));
            $("#emailDiv").css('marginTop', mt);
            $("#formDIv").hide();
            $('canvas').hide();
            $("#emailDiv").show();
            $("#person-name2").html(alivenow.Global.username);
            $(".user-score").html(alivenow.Global.score);
            $(".sbmitEmail").click(function() {
                EmailScreen.obj.winButton2();
            });
        }

        EmailScreen.prototype.winButton2 = function() {
            this.emailValue = $("#email").val();
            if (!this.validateEmail(this.emailValue)) {
                $(".err").html("Please enter valid email.");
            } else {
                $("#emailDiv").hide();
                $('canvas').show();
                var data = {
                    operation: 'emaildata',
                    user_id: alivenow.Global.user_id,
                    email: this.emailValue,
                };
                alivenow.sendData(data, function(data) {});
                this.game.state.start('UploadScreen');
            }
        }

        EmailScreen.prototype.validateEmail = function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }




        return EmailScreen;

    })(alivenow.EmailScreen || {})



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
            this.game.state.start('InstructionPage');
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


    alivenow.UploadScreen = (function() {
        function UploadScreen() {};
        var progressbar;
        UploadScreen.prototype.create = function() {
            UploadScreen.obj = this;
            this.bg = this.game.add.sprite(0, 0, 'BG');
            this.logo = this.game.add.sprite((this.game.width - 683) / 2, 140, 'bnjLogo');
            this.txt = this.game.add.bitmapText(195, 647, 'bold', 'Upload a clear photograph of the\nreceipt to verify purchase.', 50);
            this.txt.align = 'center';
            this.txt.x = this.game.width / 2 - this.txt.textWidth / 2;
            this.uploadButton = this.game.add.button((this.game.width - 735) / 2, 998, 'buttons', this.uploadFn, this, 'Upload_Button_roll', 'Upload_Button');
            this.finishButton = this.game.add.button((this.game.width - 735) / 2, 1270, 'buttons', this.finishFn, this, 'Finish_Button_roll', 'Finish_Button');
            this.finishButton.visible = false;
            this.chsbutton = this.game.add.button((this.game.width - 1152) / 2, 1270, 'highscoretxt', this.bandjFn, this);
            this.chsbutton.visible = false;
        }

        UploadScreen.prototype.finishFn = function() {
            window.open("https://www.facebook.com/benjerrysingapore/", "_blank");
        }

        UploadScreen.prototype.bandjFn = function() {
            var data = {
                operation: 'benAndJerryLinkFb',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});
            BGAudio.stop();
            window.open("https://www.facebook.com/benjerrysingapore/", "_blank");
        }

        UploadScreen.prototype.uploadFn = function(e) {
            document.getElementById('file').click();
            this.uploadButton.visible = false;
            var data = {
                operation: 'upload_click',
                user_id: alivenow.Global.user_id,
            };
            alivenow.sendData(data, function(data) {});
        }

        $(function() {
            $('#file').change(function() {
                var fd = new FormData();
                var files = $('#file')[0].files[0];
                fd.append('file', files);
                fd.append('user_id', alivenow.Global.user_id);
                $.ajax({
                    url: 'https://www.newsfeedsmartapp.com/BenJerry/upload2.php',
                    type: 'post',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                        var data = JSON.parse(response);
                        alivenow.Global.imageName = data.imageName;
                        if (response != 0) {
                            progressbar = UploadScreen.obj.game.add.sprite((UploadScreen.obj.game.width - 735) / 2, 998, 'BARPROGRESS');
                            var prog = progressbar.animations.add('prog');
                            progressbar.animations.play('prog', 15, false);

                            progressbar.animations.currentAnim.onComplete.add(function() {
                                progressbar.visible = false;
                                UploadScreen.obj.game.add.sprite((UploadScreen.obj.game.width - 735) / 2, 998, 'UPLOAD_SUCCESS');
                                UploadScreen.obj.chsbutton.visible = true;
                                //UploadScreen.obj.bandjgraphics.visible =  true;                         
                            }, this);

                        } else {
                            console.log('file not uploaded');
                        }
                    },
                });
            });
        });



        return UploadScreen;

    })(alivenow.UploadScreen || {})



    alivenow.Global = {
        game: null,
        _device: "",
        _os: "",
        skipRotationHandle: false,
        rotateHandler: null,
        user_id: '',
        _url: "https://www.newsfeedsmartapp.com/BenJerry/webservice.php",
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
        productsPurchased: 0,
        username: '',
        imageName: '',
    }


    var myObj = new alivenow.Main();
    myObj.init();

    //################################################################
})();