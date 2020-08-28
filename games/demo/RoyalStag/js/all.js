(function() {
    var alivenow = alivenow || {};
    alivenow.videoArr = [];
    alivenow.take5digit = false;

    alivenow.Main = (function() {
        function Main() {}

        Main.prototype.init = function() {
            var g = new Phaser.Game(640, 1080, Phaser.AUTO, "game-sec", {
                create: this.create,
                preload: this.preload2,
                rotateMe: this.rotateMe
            }, true);
            g.state.add('ResourceLoader', alivenow.ResourceLoader);
            g.state.add('Intro', alivenow.Intro);
            g.state.add('Que1', alivenow.Que1);
            g.state.add('Que2', alivenow.Que2);
            g.state.add('Que3', alivenow.Que3);
            g.state.add('Que4', alivenow.Que4);
            g.state.add('Que5', alivenow.Que5);
            g.state.add('Que6', alivenow.Que6);
            g.state.add('Share', alivenow.Share);
        };
        Main.prototype.preload2 = function() {
            this.load.crossOrigin = 'Anonymous';
            //this.game.load.image('loadText1', 'assets/images/Logo-section.png?v=1');
            //this.game.load.image('loadText2', 'assets/images/Logo-section.png-blur.png?v=1');
            this.game.load.image('cartImg', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/cartImg.png?v=1');

        }
        Main.prototype.create = function() {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.compatibility.orientationFallback = 'viewport';
            this.scale.pageAlignVertically = true;
            this.scale.pageAlignHorizontally = true;
            this.game.time.advancedTiming = true;
            window.addEventListener("resize", this.rotateMe.bind(this));
            this.rotateMe.call(this);
            this.game.stage.backgroundColor = 0xffffff;
            this.game.scale.fullScreenTarget = document.querySelector("#game-sec");
            this.game.state.start("ResourceLoader");
        };
        Main.prototype.preload = function() {
            // this.game.load.image("BG","assets/Loader_BG.jpg?v=1.0");

        };
        Main.prototype.rotateMe = function() {
            /* var img = document.getElementById("rotate");
             vid = document.getElementById("gameVideo");

             if (window.innerWidth > window.innerHeight) {
                 $('canvas').hide();
                 $('#formDiv').hide();
                 $(vid).hide();
                 img.style.display = "block";
                 img.style.width = String(window.innerWidth) + "px";
                 img.style.height = String(window.innerHeight) + "px";
                 img.style.top = "0px";
                 img.style.left = "0px";
                 vid.pause();
             } else {
                 $('canvas').show();
                 img.style.display = "none";
                 img.style.width = "0px";
                 img.style.height = "0px";
                 $(vid).show();
             }*/
        };


        alivenow.sendData = function(data, fun) {
            data = data || {};
            fun = fun || function() {};
            var t = new Date().getTime();
            data.t = t;
            var dAr = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
            var dr = CryptoJS.enc.Base64.stringify(dAr);
            var hd = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(t));
            var shaObj = new jsSHA("SHA-256", "TEXT");
            shaObj.setHMACKey(alivenow.Global.token.substr(5, 12), "TEXT");
            shaObj.update(hd + "." + dr);
            var hmac = shaObj.getHMAC("HEX");
            var k1 = CryptoJS.enc.Utf8.parse(hmac);
            var k2 = CryptoJS.enc.Base64.stringify(k1);
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var r1 = Math.floor(Math.random() * 6) + 1;
            var r2 = Math.floor(Math.random() * 7) + 2;
            for (var i = 0; i < r2; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
            var f_str = String(r2) + String(r1) + k2.substr(0, r1) + text + k2.substr(r1);
            var out = hd + "." + dr + "." + f_str;
            var obj = {
                "user_id": alivenow.Global.U_ID,
                "data": out
            }
            // $.ajax({
            //     url: alivenow.Global.URL_VUPDATE,
            //     type: "POST",
            //     data: obj,
            //     dataType: 'json',
            //     success: fun,
            //     error: function(data) {
            //         console.log(data)
            //     }
            // });
        }
        alivenow.createUser = function() {
            $.ajax({
                url: alivenow.Global.URL_CREATE,
                type: "POST",
                data: {
                    'source': source
                },
                dataType: 'json',
                success: function(data) {
                    alivenow.Global.U_ID = data.userid;
                    alivenow.Global.token = data.gamekey;
                    alivenow.Global.device = data.device;
                },
                error: function() {
                    alivenow.Global.U_ID = '1';
                    alivenow.Global.token = '12345678910';
                }
            });
        }
        alivenow.count = 0;
        alivenow.matchVideo = function(givenTime) {
            vid = document.getElementById("gameVideo");
            if (vid.currentTime * 1000 >= givenTime) {
                clearInterval(alivenow.vidOut)
                alivenow.videoStop.call(this);
            }
        }
        alivenow.openPromt = function(givenTime, dej, num) {
            vid = document.getElementById("gameVideo");
            if (vid.currentTime * 1000 >= givenTime) {
                setTimeout(() => {
                    alivenow.keypadOut.call(this)
                    alivenow.Timer.call(this, dej);
                }, 1500);
                alivenow.TextShow.call(this, num);
                clearInterval(alivenow.openText)
            }
        }
        alivenow.openlastPromt = function(givenTime, dej, num) {
            vid = document.getElementById("gameVideo");
            if (vid.currentTime * 1000 >= givenTime) {
                setTimeout(() => {
                    alivenow.keypadOut.call(this)
                    alivenow.Timer10.call(this, dej);
                }, 1500);
                alivenow.TextShow.call(this, num);
                clearInterval(alivenow.openText)
            }
        }
        alivenow.preloadVideo = function(video_url, video_key, video_index, loaderContext) {
            return new Promise(function(resolve, reject) {
                // console.log("promised to get video for 1",video_key)
                let video_history = alivenow.videoArr.filter(function(obj) {
                    return obj.key === video_key
                });
                if (video_history.length > 0) {
                    //console.log("Video already exist in array ",video_key)
                    resolve(video_key);
                    return;
                } else {
                    let r = new XMLHttpRequest();
                    r.onprogress = function(progress) {
                        if (loaderContext != null) {
                            alivenow.Global.videoLoadPercentage = progress.loaded / progress.total;
                            //console.log(Pepsi.Global.videoLoadPercentage+" video Percentage")
                            loaderContext.setPercentage(alivenow.Global.videoLoadPercentage);
                        }
                    }
                    r.onload = function() {
                        // alert("Video  exist in array "+ video_key)
                        alivenow.videoArr.push({
                            key: video_key,
                            data: URL.createObjectURL(r.response)
                        })
                        resolve(video_key);
                    };
                    r.open("GET", video_url);
                    r.responseType = "blob";
                    r.send();
                }
            });
        };
        alivenow.NumberFill = function(w) {
            this.noGrp = this.add.group();
            this.g = this.game.add.graphics(0, 0);
            this.g.beginFill(0x000000, 1);
            this.g.position.set(0, this.game.height - 92)
            this.g.drawRect(0, 0, this.game.width, 12);
            this.g.endFill();
            this.noGrp.addChild(this.g);

            this.g1 = this.game.add.graphics(0, 0);
            this.g1.beginFill(0x30cc32, 1);
            this.g1.position.set(0, this.game.height - 92)
            this.g1.drawRect(0, 0, w, 12);
            this.g1.endFill();
            this.noGrp.addChild(this.g1);

            //this.g1.mask=10;

            this.g2 = this.game.add.graphics(0, 0);
            this.g2.beginFill(0x000000, 0.6);
            this.g2.position.set(0, this.game.height - 80)
            this.g2.drawRect(0, 0, this.game.width, 80);
            this.g2.endFill();
            this.noGrp.addChild(this.g2);
            this.digit = [];
            for (var i = 1; i <= 10; i++) {
                this.circle = this.game.add.sprite(-30 + i * 60, this.game.height - 65, "circle");
                this.noGrp.addChild(this.circle);
                this.circle.scale.setTo(0.6);
                if (alivenow.Global.digitNumber[i - 1] !== undefined)
                    this.digit[i] = new Phaser.BitmapText(this.game, -20 + i * 60, this.game.height - 70, "ArialBlack", "" + alivenow.Global.digitNumber[i - 1], 45, "center");
                else
                    this.digit[i] = new Phaser.BitmapText(this.game, -20 + i * 60, this.game.height - 70, "ArialBlack", "", 45, "center");
                this.digit[i].key = 'digit' + i;
                this.noGrp.addChild(this.digit[i]);

            }
            // this.game.add.tween(this.noGrp).to( { y: 600 }, 1000, Phaser.Easing.Linear.out, true);


        }
        alivenow.keypadOut = function() {
            var keypadx = 213;
            var keypady = 720;
            var keypadmar = 80;
            var tintColor = 0x777777;
            var fontsize = 45;
            var textfontsize = 25;
            this.keypad = this.add.group();

            this.keypad1 = this.add.button(0, keypady, "Buttons", alivenow.keypadClicked, this, "effect-grey.png", "Keypad.png", "Keypad.png");
            this.keypad1.name = '1';
            this.keypad1.scale.setTo(0.6, 0.5);
            this.keypad.addChild(this.keypad1)
            this.a = new Phaser.BitmapText(this.game, keypadmar, keypady + 5, "ArialBlack", "1", fontsize, "center");
            this.keypad.addChild(this.a)

            this.keypad2 = this.add.button(keypadx, keypady, "Buttons", alivenow.keypadClicked, this, "effect-grey.png", "Keypad.png", "Keypad.png");
            this.keypad2.scale.setTo(0.6, 0.5);
            this.keypad2.name = '2';
            this.keypad.addChild(this.keypad2);
            this.b = new Phaser.BitmapText(this.game, keypadx + keypadmar, keypady + 5, "ArialBlack", "2", fontsize, "center");
            this.textb = new Phaser.BitmapText(this.game, keypadx + keypadmar - 15, keypady + 55, "thomaBold", "ABC", textfontsize, "center");
            this.textb.tint = tintColor;
            this.keypad.addChild(this.textb)
            this.keypad.addChild(this.b)


            this.keypad3 = this.add.button(2 * keypadx, keypady, "Buttons", alivenow.keypadClicked, this, "effect-grey.png", "Keypad.png", "Keypad.png");
            this.keypad3.name = '3';
            this.keypad3.scale.setTo(0.6, 0.5);
            this.keypad.addChild(this.keypad3)
            this.c = new Phaser.BitmapText(this.game, 2 * keypadx + keypadmar, keypady + 5, "ArialBlack", "3", fontsize, "center");
            this.textb = new Phaser.BitmapText(this.game, 2 * keypadx + keypadmar - 10, keypady + 55, "thomaBold", "DEF", textfontsize, "center");
            this.textb.tint = tintColor;
            this.keypad.addChild(this.textb)
            this.keypad.addChild(this.c)


            this.keypad4 = this.add.button(0, keypady + 90, "Buttons", alivenow.keypadClicked, this, "effect-grey.png", "Keypad.png", "Keypad.png");
            this.keypad4.name = '4';
            this.keypad4.scale.setTo(0.6, 0.5)
            this.keypad.addChild(this.keypad4)
            this.d = new Phaser.BitmapText(this.game, keypadmar, keypady + 95, "ArialBlack", "4", fontsize, "center");
            this.textb = new Phaser.BitmapText(this.game, keypadmar - 5, keypady + 145, "thomaBold", "GHI", textfontsize, "center");
            this.textb.tint = tintColor;
            this.keypad.addChild(this.textb)
            this.keypad.addChild(this.d)

            this.keypad5 = this.add.button(keypadx, keypady + 90, "Buttons", alivenow.keypadClicked, this, "effect-grey.png", "Keypad.png", "Keypad.png");
            this.keypad5.name = '5';
            this.keypad5.scale.setTo(0.6, 0.5)
            this.keypad.addChild(this.keypad5)
            this.e = new Phaser.BitmapText(this.game, keypadx + keypadmar, keypady + 95, "ArialBlack", "5", fontsize, "center");
            this.keypad.addChild(this.e)
            this.textb = new Phaser.BitmapText(this.game, keypadx + keypadmar - 10, keypady + 145, "thomaBold", "JKL", textfontsize, "center");
            this.textb.tint = tintColor;
            this.keypad.addChild(this.textb)


            this.keypad6 = this.add.button(2 * keypadx, keypady + 90, "Buttons", alivenow.keypadClicked, this, "effect-grey.png", "Keypad.png", "Keypad.png");
            this.keypad6.name = '6';
            this.keypad6.scale.setTo(0.6, 0.5)
            this.keypad.addChild(this.keypad6)
            this.f = new Phaser.BitmapText(this.game, 2 * keypadx + keypadmar, keypady + 95, "ArialBlack", "6", fontsize, "center");
            this.keypad.addChild(this.f)
            this.textb = new Phaser.BitmapText(this.game, 2 * keypadx + keypadmar - 10, keypady + 145, "thomaBold", "MNO", textfontsize, "center");
            this.textb.tint = tintColor;
            this.keypad.addChild(this.textb)

            this.keypad7 = this.add.button(0, keypady + 180, "Buttons", alivenow.keypadClicked, this, "effect-grey.png", "Keypad.png", "Keypad.png");
            this.keypad7.name = '7';
            this.keypad7.scale.setTo(0.6, 0.5)
            this.keypad.addChild(this.keypad7)
            this.g = new Phaser.BitmapText(this.game, keypadmar, keypady + 190, "ArialBlack", "7", fontsize, "center");
            this.keypad.addChild(this.g)
            this.textb = new Phaser.BitmapText(this.game, keypadmar - 25, keypady + 235, "thomaBold", "PQRS", textfontsize, "center");
            this.textb.tint = tintColor;
            this.keypad.addChild(this.textb)

            this.keypad8 = this.add.button(keypadx, keypady + 180, "Buttons", alivenow.keypadClicked, this, "effect-grey.png", "Keypad.png", "Keypad.png");
            this.keypad8.name = '8';
            this.keypad8.scale.setTo(0.6, 0.5)
            this.keypad.addChild(this.keypad8)
            this.h = new Phaser.BitmapText(this.game, keypadx + keypadmar, keypady + 190, "ArialBlack", "8", fontsize, "center");
            this.keypad.addChild(this.h)
            this.textb = new Phaser.BitmapText(this.game, keypadx + keypadmar - 10, keypady + 235, "thomaBold", "TUV", textfontsize, "center");
            this.textb.tint = tintColor;
            this.keypad.addChild(this.textb)


            this.keypad9 = this.add.button(2 * keypadx, keypady + 180, "Buttons", alivenow.keypadClicked, this, "effect-grey.png", "Keypad.png", "Keypad.png");
            this.keypad9.name = '9';
            this.keypad9.scale.setTo(0.6, 0.5)
            this.keypad.addChild(this.keypad9)
            this.i = new Phaser.BitmapText(this.game, 2 * keypadx + keypadmar, keypady + 190, "ArialBlack", "9", fontsize, "center");
            this.keypad.addChild(this.i)
            this.textb = new Phaser.BitmapText(this.game, 2 * keypadx + keypadmar - 25, keypady + 235, "thomaBold", "WXYZ", textfontsize, "center");
            this.textb.tint = tintColor;
            this.keypad.addChild(this.textb)

            this.keypad10 = this.add.button(0, keypady + 270, "Buttons", alivenow.keypadClicked, this, "effect-grey.png", "Keypad.png", "Keypad.png");
            this.keypad10.name = '85019';
            this.keypad10.scale.setTo(0.6, 0.5)
            this.keypad.addChild(this.keypad10)
            this.j = this.game.add.sprite(keypadmar, keypady + 295, "Call")
            this.j.scale.setTo(0.4)
            this.keypad.addChild(this.j)

            this.keypad11 = this.add.button(keypadx, keypady + 270, "Buttons", alivenow.keypadClicked, this, "effect-grey.png", "Keypad.png", "Keypad.png");
            this.keypad11.name = '0';
            this.keypad11.scale.setTo(0.6, 0.5)
            this.keypad.addChild(this.keypad11)
            this.k = new Phaser.BitmapText(this.game, keypadx + keypadmar, keypady + 275, "ArialBlack", "0", fontsize, "center");
            this.keypad.addChild(this.k)

            this.keypad12 = this.add.button(2 * keypadx, keypady + 270, "Buttons", alivenow.keypadClicked, this, "effect-grey.png", "Keypad.png", "Keypad.png");
            this.keypad12.name = 'back';
            this.keypad12.scale.setTo(0.6, 0.5)
            this.keypad.addChild(this.keypad12)
            this.l = this.game.add.sprite(2 * keypadx + keypadmar, keypady + 295, "back")
            //this.l = new Phaser.BitmapText(this.game, 2*keypadx+keypadmar, keypady+345, "ArialBlack", "X", 60, "center");
            this.keypad.addChild(this.l);
            // this.keypad.addChild(this.noGrp);
            this.keypadopen = true;
            if (this.keypadopen) {
                this.tweenkeypad = this.game.add.tween(this.keypad).from({
                    y: this.game.height
                }, 200, Phaser.Easing.Linear.out, true);
                this.game.add.tween(this.noGrp).to({
                    y: -360
                }, 200, Phaser.Easing.Linear.out, true);
            }

        }
        alivenow.keypadClicked = function(p) {
            if (alivenow.correctDigit == p.name && alivenow.take5digit == false) {
                for (var i = 1; i < this.digit.length; i++) {
                    if (this.digit[i].key == alivenow.digitNo) {
                        this.digit[i].text = p.name;
                        alivenow.Global.digitNumber.push(p.name);
                        clearInterval(alivenow.timerInt);
                        clearTimeout(alivenow.vidOut)
                        this.timerGrp.destroy();
                        this.sound.stop()
                        this.game.state.start(alivenow.nextState);
                    }
                }
            } else if (alivenow.Global.digitNumber[this.counter] == p.name && alivenow.take5digit) {
                for (var i = 1; i < this.digit.length; i++) {
                    if (this.digit[i].key == alivenow.digitNo) {
                        this.digit[i].text = p.name;
                        alivenow.Global.digitNumber.push(p.name);
                        if (this.counter == 4) {
                            clearInterval(alivenow.timerInt);
                            clearTimeout(alivenow.vidOut)
                            this.timerGrp.destroy();
                            this.sound.stop()
                            this.game.state.start(alivenow.nextState);
                        }
                    }
                }
                var dig = 7 + this.counter;
                alivenow.digitNo = 'digit' + dig;
                this.counter++;
                /* this.digit[6].text = 8;
                 this.digit[7].text = 5;
                 this.digit[8].text = 0;
                 this.digit[9].text = 1;
                 this.digit[10].text = 9;
                 clearInterval(alivenow.timerInt);
                 this.timerGrp.destroy();               
                 this.game.state.start(alivenow.nextState); */
            } else {
                alivenow.addQuake.call(this)

            }

        }
        alivenow.Timer = function(video) {
            var counter = 7;
            this.timerGrp = this.game.add.group();
            this.clock = this.game.add.sprite(530, 50, 'Clock');
            this.clock.scale.setTo(0.4);
            this.clock.animations.add('timer');
            this.clock.animations.play('timer', 1, false);
            this.timerGrp.addChild(this.clock);
            this.timerText = new Phaser.BitmapText(this.game, 550, 65, "thomaBold", "07", 40, "center");
            this.timerGrp.addChild(this.timerText);

            alivenow.timerInt = setInterval(() => {
                counter--;
                if (counter >= 0) {
                    this.timerText.text = '0' + counter;
                }
                if (counter === 0) {
                    clearInterval(counter);
                    this.timerGrp.destroy();
                    vid = document.getElementById("gameVideo");
                    vid.pause();
                    this.sound.stop()
                    //this.game.camera.shake(0.05, 500);
                    alivenow.RejctedVideos.call(this, video);
                    alivenow.TextShow.call(this, 'dejected');

                }
            }, 1000);
        }
        alivenow.Timer10 = function(video) {
            var counter = 10;
            this.timerGrp = this.game.add.group();
            this.clock = this.game.add.sprite(530, 50, 'Clock10');
            this.clock.scale.setTo(0.4);
            this.clock.animations.add('timer');
            this.clock.animations.play('timer', 1, false);
            this.timerGrp.addChild(this.clock);
            this.timerText = new Phaser.BitmapText(this.game, 550, 65, "thomaBold", "10", 40, "center");
            this.timerGrp.addChild(this.timerText);

            alivenow.timerInt = setInterval(() => {
                counter--;
                if (counter >= 0) {
                    this.timerText.text = '0' + counter;
                }
                if (counter === 0) {
                    clearInterval(counter);
                    this.timerGrp.destroy();
                    vid = document.getElementById("gameVideo");
                    vid.pause();
                    this.sound.stop()
                    //this.game.camera.shake(0.05, 500);
                    alivenow.Global.digitNumber.splice(5, alivenow.Global.digitNumber.length - 1);
                    this.digit[6].text = '';
                    this.digit[7].text = '';
                    this.digit[8].text = '';
                    this.digit[9].text = '';
                    this.digit[10].text = '';
                    alivenow.RejctedVideos.call(this, video);
                    alivenow.TextShow.call(this, 'dejected');

                }
            }, 1000);
        }
        alivenow.TextShow = function(noName) {
            if (noName == 'dejected') {
                this.correctGrp.destroy()
                this.missedGrp = this.game.add.group();
                this.missedChance = this.game.add.sprite(this.world.centerX, this.world.centerY, "TryAgainBox");
                this.missedChance.scale.setTo('0.6');
                this.missedChance.anchor.setTo(0.5);
                this.missedGrp.addChild(this.missedChance)
                this.tryagain = this.add.button(this.world.centerX, this.world.centerY + 40, "Buttons", alivenow.tryAgain, this, "Try-again.png-rollover.png", "Try-again.png", "Try-again.png");
                this.tryagain.scale.setTo('0.6');
                this.tryagain.anchor.setTo(0.5);
                this.missedGrp.addChild(this.tryagain);
            } else {
                this.correctGrp = this.game.add.group();
                this.logoTop = this.game.add.sprite(40, 40, alivenow.logo);
                this.logoTop.scale.setTo(0.3);
                // this.logoTop.frame=0;
                this.correctGrp.addChild(this.logoTop);
                this.correctBG = this.game.add.sprite(this.world.centerX, this.world.centerY - 5, noName);
                this.correctBG.scale.setTo('0.6');
                this.correctBG.anchor.setTo(0.5);
                this.correctGrp.addChild(this.correctBG)
            }
            if (this.keypad !== undefined) {
                this.tweenkeypad = this.game.add.tween(this.keypad).to({
                    y: 430
                }, 100, Phaser.Easing.Linear.out, true);
                this.game.add.tween(this.noGrp).to({
                    y: 0
                }, 100, Phaser.Easing.Linear.out, true);
            }
        }
        alivenow.RejctedVideos = function(video) {
            if (alivenow.videoArr.filter(function(obj) {
                    return obj.key === video
                }).length > 0) {
                // Intro.gameObj.bulb.destroy();
                var video_content = alivenow.videoArr.filter(function(obj) {
                    return obj.key === video
                })[0].data;
            }
            $("#gameVideo").attr('src', video_content);
            vid.play();
        }
        alivenow.tryAgain = function() {
            this.missedGrp.destroy();
            alivenow.sendData({
                "operation": "tryagain",
                "user_id": alivenow.Global.U_ID
            });
            this.game.state.start(alivenow.currentState);
        }
        alivenow.videoStop = function() {
            vid = document.getElementById("gameVideo");
            vid.pause();
            this.sound.loopFull();
        }
        alivenow.addQuake = function() {
            var properties = {
                x: 20
            };
            var duration = 50;
            var ease = Phaser.Easing.Bounce.InOut;
            var autoStart = true;
            var delay = 10;
            var yoyo = true;
            this.game.add.tween(this.keypad)
                .to(properties, duration, ease, autoStart, delay, 5, yoyo);
        }
        return Main;
    })();

    alivenow.ResourceLoader = (function() {
        function ResourceLoader() {
            alivenow.createUser();
        }
        ResourceLoader.prototype.preload = function() {
            this.appLoader = new Newsfeed.Loader();
            this.appLoader.init(this.game, "https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/transparent.png");
            ResourceLoader.obj = this;
            var v = 5;
            alivenow.videoLoaded = false;
            alivenow.resourceLoaded = false;
            this.game.scale.onSizeChange.add(this.onWindowSize, this);
            this.load.crossOrigin = 'Anonymous';
            this.game.load.image('border3', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/border3.png?v=1');
            this.game.load.image('border2', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/border2.png?v=1');
            this.game.load.image('border1', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/border1.png?v=1');
            this.game.load.image('firstBG', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/firstBG.jpg?v=1');
            this.game.load.image('kepadBG', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Keypad.png?v=1');
            this.game.load.image('noBG', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Bottom-number-section.png?v=1');
            this.game.load.image('circle', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Bottom-circle.png?v=1');
            this.game.load.image('back', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/back-icon.png?v=1');
            this.game.load.image('HomeClick', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/transparent.png?v=1');
            this.game.load.image('BG', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Background.jpg?v=1');
            this.game.load.image('Text1', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Text-1.png?v=1');
            this.game.load.image('Text2', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Text-2.png?v=1');
            this.game.load.image('smallBox', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Small-box.png?v=1');
            this.game.load.image('LargeBox', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Larger-box.png?v=1');
            this.game.load.image('BGbox', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Transparent-patch.png?v=1');
            this.game.load.image('TryAgainBox', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Missed-chance.png?v=1');
            this.game.load.image('Number0', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Number-0.png?v=1');
            this.game.load.image('Number8', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Number-8.png?v=1');
            this.game.load.image('Number5', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Number-5.png?v=1');
            this.game.load.image('Number1', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Number-1.png?v=1');
            this.game.load.image('Number9', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Number-9.png?v=1');
            this.game.load.image('Number85019', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Press-85019.png?v=1');
            this.game.load.image('NumberCall', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Press-call.png?v=1');
            this.game.load.image('Call', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Phone-icon.png?v=1');
            this.game.load.image('toplogo', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/top-logo.png?v=1');
            this.game.load.image('royaltoplogo', 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/Royal-stag-logo.png?v=1');
            this.game.load.audio("SWC", 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/soundwithcheer.mp3?v=1')
            this.game.load.audio("SWOC", 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/soundwithoutcheer.mp3?v=1')
            this.game.load.atlas("Buttons", "https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/buttons.png?v=" + v, "https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/buttons.json?v=" + v);
            this.game.load.atlasXML("Clock10", "https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/clock10.png?v=" + v, "https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/clock10.xml?v=" + v);
            this.game.load.atlasXML("Clock", "https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/clock.png?v=" + v, "https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/clock.xml?v=" + v);
            this.game.load.bitmapFont("ArialBlack", 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/fonts/arialBlack-export.png?v=' + v, 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/fonts/arialBlack-export.xml?v=' + v);
            this.game.load.bitmapFont("ITCSymbolBlack", 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/fonts/ITCSymbolStdBlack-export.png?v=' + v, 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/fonts/ITCSymbolStdBlack-export.xml?v=' + v);
            this.game.load.bitmapFont("ITCSymbolBold", 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/fonts/ITCSymbolStdBold-export.png?v=' + v, 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/fonts/ITCSymbolStdBlack-export.xml?v=' + v);
            this.game.load.bitmapFont("thomaBold", 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/fonts/thomaBold-export.png?v=' + v, 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/fonts/thomaBold-export.xml?v=' + v);
            this.game.load.bitmapFont("thoma", 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/fonts/tahoma.png?v=' + v, 'https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/fonts/tahoma.xml?v=' + v);
            // this.game.load.json('AnswerData', 'assets/images/answers/Answer.json?v=' + v);
            this.onWindowSize();
            alivenow.preloadVideo("https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/videos/cut-01.mp4?raw=true&v=1.2", "cut1", 1).then(function() {
                alivenow.preloadVideo("https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/videos/cut-02.mp4?raw=true&v=1.2", "cut2").then(function() {
                    alivenow.preloadVideo("https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/videos/dej-cut-01.mp4?raw=true&v=1.2", "dej-cut1");
                }).then(function() {
                    alivenow.preloadVideo("https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/videos/cut-03.mp4?raw=true&v=1.2", "cut3");
                    alivenow.preloadVideo("https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/videos/cut-04.mp4?raw=true&v=1.2", "cut4");
                    alivenow.preloadVideo("https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/videos/cut-05.mp4?raw=true&v=1.2", "cut5");
                    alivenow.preloadVideo("https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/videos/cut-06.mp4?raw=true&v=1.2", "cut6");
                    alivenow.preloadVideo("https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/videos/cut-07.mp4?raw=true&v=1.2", "cut7");
                    alivenow.preloadVideo("https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/videos/dej-cut-02.mp4?raw=true&v=1.2", "dej-cut2");
                    alivenow.preloadVideo("https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/videos/dej-cut-03.mp4?raw=true&v=1.2", "dej-cut3");
                    alivenow.preloadVideo("https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/videos/dej-cut-04.mp4?raw=true&v=1.2", "dej-cut4");
                    alivenow.preloadVideo("https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/videos/dej-cut-05.mp4?raw=true&v=1.2", "dej-cut5");
                    alivenow.preloadVideo("https://newsfeedsmartapps.s3.ap-south-1.amazonaws.com/RoyalStag/assets/images/videos/dej-cut-06.mp4?raw=true&v=1.2", "dej-cut6");
                    alivenow.videoLoaded = true;
                    if (alivenow.resourceLoaded) {
                        ResourceLoader.obj.game.state.start("Intro");
                    }
                })
            })
        }
        ResourceLoader.prototype.create = function() {
            this.appLoader.dispose();
            alivenow.resourceLoaded = true;
            alivenow.formFiled = false;
            alivenow.Global.appStart = false;
            if (alivenow.videoLoaded) {
                this.game.state.start("Intro");
            }
        };
        ResourceLoader.prototype.onWindowSize = function() {
            /*if(window.innerWidth>=window.innerHeight){
            	if($("#gameVideo").is(".videoPortrait")){
            		$("#gameVideo").removeClass("videoPortrait")
            	}
            
            }else{
            	if(!$("#gameVideo").is(".videoPortrait")){
            		$("#gameVideo").addClass("videoPortrait")
            	}
            }*/
            $("#gameVideo").css("height", $("canvas").height());
            if (this.game.scale.isFullScreen && alivenow.Global.device == 'web') {
                //console.log("webksjh");
                if (!$("canvas").parent().is(".content-inside-app")) {
                    $("canvas").parent().hide();
                    $(".content-inside-app").append($("canvas"))
                    $("canvas").siblings("div").eq(1).hide();
                }

            }
        }
        /* ResourceLoader.prototype.init = function () {
             this.BGgr = this.add.group();
             this.game.load.onFileComplete.add(this.progress, this);

             this.animGr = this.add.group();

             this.load2 = new Phaser.Sprite(this.game, 0, 400, "loadText2");
             this.load2.scale.setTo(0.2);
             this.load1 = new Phaser.Sprite(this.game, 0, 400, "loadText1");
             this.load1.scale.setTo(0.2);

             this.load1.x = (640 - this.load1.width) / 2;
             this.load2.x = (640 - this.load2.width) / 2;


             this.animGr.addChild(this.load2);
             this.animGr.addChild(this.load1);

             this.g = new Phaser.Graphics(this.game)
             this.g.position.set(this.load2.x, this.load2.y)
             this.g.beginFill(0x000000, .5);

             // this.g.lineStyle(5,0x000,10);
             this.g.drawRect(0, 0, this.load2.width, this.load2.height);
             // this.g.drawRect(this.load2.x,this.load2.y,this.load2.width,this.load2.height);
             this.g.endFill();
             new Phaser.Group(this.game).addChild(this.g)
             this.load1.mask = this.g;

             this.g.x = this.load1.x - this.load1.width;

             this.setPercentage(0);
         };
         ResourceLoader.prototype.progress = function (p) {
             alivenow.Global.assetLoadedPercentage = p;
             this.setPercentage(parseInt(alivenow.Global.assetLoadedPercentage));
         };
         ResourceLoader.prototype.setPercentage = function (p) {
             var w = p / 100 * this.load1.width;
             this.g.x = this.load1.x - this.load1.width + w;
         };*/
        return ResourceLoader;
    })();



    alivenow.Intro = (function() {
        function Intro() {}
        Intro.prototype.create = function() {
            Intro.gameObj = this;
            this.keypad = false;
            alivenow.NextSession = false;
            alivenow.correctDigit = '8';
            alivenow.dejVid = 'dej-cut1'
            alivenow.timerInt = ''
            alivenow.vidOut = ''
            alivenow.currentState = "Intro"
            alivenow.nextState = "Que1"
            alivenow.digitNo = 'digit1'
            alivenow.logo = 'toplogo'

            if (!alivenow.Global.appStart) {
                alivenow.Global.appStart = true;
                this.load2 = this.game.add.sprite(0, 0, "firstBG");
                // this.load2.scale.setTo(0.2);
                // this.load2.x = (640 - this.load2.width) / 2;
                this.cartImg = this.game.add.sprite(320, 900, "cartImg");
                this.cartImg.scale.setTo(0.5);
                this.cartImg.anchor.set(0.5, 0.5);

                this.HomeClick = this.add.button(0, 0, "HomeClick", this.PlayClicked, {
                    ClickName: "vidPlay"
                });

                this.BtnAnim();
                this.queGrp = this.add.group();
                this.que = new Phaser.BitmapText(this.game, this.game.world.centerX, 1000, "thoma", "Click to begin", 30, "center");
                this.que.x = this.game.world.width / 2 - this.que.textWidth / 2;
                this.que.tint = 0xffffff;
                this.queGrp.addChild(this.que);
                this.btnHint1 = this.game.add.sprite(320, 900, "border1");
                this.btnHint2 = this.game.add.sprite(320, 900, "border2");
                this.btnHint3 = this.game.add.sprite(320, 900, "border3");
                this.btnHint1.anchor.set(0.5, 0.5);
                this.btnHint2.anchor.set(0.5, 0.5);
                this.btnHint3.anchor.set(0.5, 0.5);
                this.btnHint1.alpha = this.btnHint2.alpha = this.btnHint3.alpha = 0;
                this.loopBtnAnim();
            } else {
                //this.BG=this.game.add.sprite(0,0,"iBG");
                this.sound = this.game.add.audio('SWC');
                if (alivenow.videoArr.filter(function(obj) {
                        return obj.key === 'cut1'
                    }).length > 0) {
                    // Intro.gameObj.bulb.destroy();
                    var video_content = alivenow.videoArr.filter(function(obj) {
                        return obj.key === 'cut1'
                    })[0].data;
                    //$("#gameVideo").attr('poster', 'images/que1BG.jpg');
                    $("#gameVideo").attr('src', video_content);
                    $("#video-container").removeClass('hidden');
                    vid = document.getElementById("gameVideo");
                    vid.play();
                    //alert("play video")
                    //this.BG.destroy();
                }
                alivenow.openText = setInterval(() => {
                    alivenow.openPromt.call(this, 4000, 'dej-cut1', 'Number8')
                }, 500);
                alivenow.vidOut = setInterval(() => {
                    alivenow.matchVideo.call(this, 7500)
                }, 200);
                alivenow.NumberFill.call(this, 0);
            }
        };
        Intro.prototype.BtnAnim = function() {
            setInterval(function() {
                Intro.prototype.CartAnim();
            }, 600);
        }
        Intro.prototype.CartAnim = function() {
            if (Intro.gameObj.scalled == false) {
                var scaleValue = 0.6;
                Intro.gameObj.scalled = true;
            } else {
                Intro.gameObj.scalled = false;
                var scaleValue = 0.5;
            }
            Intro.gameObj.game.add.tween(Intro.gameObj.cartImg.scale).to({
                x: scaleValue,
                y: scaleValue
            }, 300, Phaser.Easing.Linear.None, true);
            //Intro.gameObj.cartImg.scale.setTo(scaleValue);
        }
        Intro.prototype.proceed = function() {
            vid = document.getElementById("gameVideo");
            vid.play();
            vid.pause();
            console.log("proceed")
            this.que.destroy();
            this.load2.destroy();
            this.HomeClick.destroy();
            this.cartImg.destroy();
            this.btnHint1.destroy();
            this.btnHint2.destroy();
            this.btnHint3.destroy();
            /*alivenow.sendData({
                 "operation": "start",
                 "user_id": alivenow.Global.U_ID
             });*/
            this.create();

            // this.game.scale.startFullScreen();
        }
        Intro.prototype.loopBtnAnim = function() {
            setTimeout(function() {
                Intro.gameObj.showCartAim(Intro.gameObj.btnHint1, 1000, .6, 1, .2);
                Intro.gameObj.showCartAim(Intro.gameObj.btnHint2, 600, .6, 1.05, .5);
                Intro.gameObj.showCartAim(Intro.gameObj.btnHint3, 300, .6, 1.1, .6, Intro.gameObj.loopBtnAnim);
            }, 600);
        }
        Intro.prototype.showCartAim = function(circle, circleDelay, scaleVal, finalScale = 1, _alpha = 1, onComplete = null) {

            circle.scale.set(scaleVal, scaleVal);
            circle.alpha = 1;
            Intro.gameObj.circleScaleTwn = new Phaser.Tween(circle.scale, Intro.gameObj.game, Intro.gameObj.game.tweens);
            Intro.gameObj.circleScaleTwn.to({
                x: finalScale,
                y: finalScale
            }, circleDelay, Phaser.Easing.Back.Out);
            Intro.gameObj.circleScaleTwn.start();
            Intro.gameObj.circleAlphaTwn = new Phaser.Tween(circle, Intro.gameObj.game, Intro.gameObj.game.tweens);
            Intro.gameObj.circleAlphaTwn.to({
                alpha: _alpha
            }, circleDelay, Phaser.Easing.Back.Out);
            Intro.gameObj.circleAlphaTwn.start();
            if (onComplete != null) {
                if (!alivenow.Global.stopLoop)
                    Intro.gameObj.circleScaleTwn.onComplete.add(onComplete, this);
            }
        };
        Intro.prototype.PlayClicked = function() {
            alivenow.Global.Gender = this.ClickName;
            switch (this.ClickName) {
                case "vidPlay":
                    console.log("Homescreen")
                    vid = document.getElementById("gameVideo");
                    vid.play();
                    vid.pause();
                    Intro.gameObj.que.destroy();
                    Intro.gameObj.load2.destroy();
                    Intro.gameObj.cartImg.destroy();
                    Intro.gameObj.HomeClick.destroy();

                    Intro.gameObj.btnHint1.destroy();
                    Intro.gameObj.btnHint2.destroy();
                    Intro.gameObj.btnHint3.destroy();
                    alivenow.sendData({
                        "operation": "start",
                        "user_id": alivenow.Global.U_ID
                    });
                    console.log(alivenow.Global.U_ID)
                    Intro.gameObj.create();
                    //Intro.gameObj.game.scale.startFullScreen();              

                    break;
            }
        };
        return Intro;
    })();
    alivenow.Que1 = (function() {
        function Que1() {}
        Que1.prototype.create = function() {
            Que1.gameObj = this;
            alivenow.correctDigit = '5';
            alivenow.dejVid = 'dej-cut2'
            alivenow.currentState = "Que1"
            alivenow.nextState = "Que2"
            alivenow.digitNo = 'digit2'
            alivenow.logo = 'royaltoplogo'
            alivenow.sendData({
                "operation": "first",
                "user_id": alivenow.Global.U_ID
            });
            if (alivenow.videoArr.filter(function(obj) {
                    return obj.key === 'cut2'
                }).length > 0) {
                // Intro.gameObj.bulb.destroy();
                var video_content = alivenow.videoArr.filter(function(obj) {
                    return obj.key === 'cut2'
                })[0].data;
                $("#gameVideo").attr('src', video_content);
                $("#video-container").removeClass('hidden');
                vid = document.getElementById("gameVideo");
                vid.play();
            }
            this.sound = this.game.add.audio('SWOC');
            alivenow.openText = setInterval(() => {
                alivenow.openPromt.call(this, 8500, 'dej-cut2', 'Number5')
            }, 500);
            alivenow.NumberFill.call(this, 107);
            alivenow.vidOut = setInterval(() => {
                alivenow.matchVideo.call(this, 11500)
            }, 200);
        };

        return Que1;
    })();
    alivenow.Que2 = (function() {
        function Que2() {}
        Que2.prototype.create = function() {
            Que2.gameObj = this;
            alivenow.correctDigit = '0';
            alivenow.dejVid = 'dej-cut3'
            alivenow.currentState = "Que2"
            alivenow.nextState = "Que3"
            alivenow.digitNo = 'digit3'
            alivenow.logo = 'toplogo'
            alivenow.sendData({
                "operation": "second",
                "user_id": alivenow.Global.U_ID
            });
            this.sound = this.game.add.audio('SWOC');
            if (alivenow.videoArr.filter(function(obj) {
                    return obj.key === 'cut3'
                }).length > 0) {
                // Intro.gameObj.bulb.destroy();
                var video_content = alivenow.videoArr.filter(function(obj) {
                    return obj.key === 'cut3'
                })[0].data;

                $("#gameVideo").attr('src', video_content);
                $("#video-container").removeClass('hidden');
                vid = document.getElementById("gameVideo");
                vid.play();
            }
            alivenow.openText = setInterval(() => {
                alivenow.openPromt.call(this, 8000, 'dej-cut3', 'Number0')
            }, 500);
            alivenow.vidOut = setInterval(() => {
                alivenow.matchVideo.call(this, 9400)
            }, 200);
            alivenow.NumberFill.call(this, 214);


        };
        return Que2;
    })();
    alivenow.Que3 = (function() {
        function Que3() {}
        Que3.prototype.create = function() {
            Que3.gameObj = this;
            alivenow.correctDigit = '1';
            alivenow.dejVid = 'dej-cut4'
            alivenow.currentState = "Que3"
            alivenow.nextState = "Que4"
            alivenow.digitNo = 'digit4'
            alivenow.logo = 'royaltoplogo'
            alivenow.sendData({
                "operation": "third",
                "user_id": alivenow.Global.U_ID
            });
            this.sound = this.game.add.audio('SWOC');
            if (alivenow.videoArr.filter(function(obj) {
                    return obj.key === 'cut4'
                }).length > 0) {
                // Intro.gameObj.bulb.destroy();
                var video_content = alivenow.videoArr.filter(function(obj) {
                    return obj.key === 'cut4'
                })[0].data;

                $("#gameVideo").attr('src', video_content);
                $("#video-container").removeClass('hidden');
                vid = document.getElementById("gameVideo");
                vid.play();
            }
            alivenow.openText = setInterval(() => {
                alivenow.openPromt.call(this, 9500, 'dej-cut4', 'Number1')
            }, 500);
            alivenow.vidOut = setInterval(() => {
                alivenow.matchVideo.call(this, 11850)
            }, 200);
            alivenow.NumberFill.call(this, 321);
        };
        return Que3;
    })();
    alivenow.Que4 = (function() {
        function Que4() {}
        Que4.prototype.create = function() {
            Que4.gameObj = this;
            alivenow.correctDigit = '9';
            alivenow.dejVid = 'dej-cut5'
            alivenow.currentState = "Que4"
            alivenow.nextState = "Que5"
            alivenow.digitNo = 'digit5'
            alivenow.logo = 'toplogo'
            alivenow.sendData({
                "operation": "fourth",
                "user_id": alivenow.Global.U_ID
            });
            this.sound = this.game.add.audio('SWOC');
            if (alivenow.videoArr.filter(function(obj) {
                    return obj.key === 'cut5'
                }).length > 0) {
                // Intro.gameObj.bulb.destroy();
                var video_content = alivenow.videoArr.filter(function(obj) {
                    return obj.key === 'cut5'
                })[0].data;

                $("#gameVideo").attr('src', video_content);
                $("#video-container").removeClass('hidden');
                vid = document.getElementById("gameVideo");
                vid.play();
            }
            alivenow.openText = setInterval(() => {
                alivenow.openPromt.call(this, 4500, 'dej-cut5', 'Number9')
            }, 500);
            alivenow.NumberFill.call(this, 428);
            alivenow.vidOut = setInterval(() => {
                alivenow.matchVideo.call(this, 7000)
            }, 200);
        };
        return Que4;
    })();
    alivenow.Que5 = (function() {
        function Que5() {}
        Que5.prototype.create = function() {
            Que5.gameObj = this;
            alivenow.take5digit = true
            alivenow.correctDigit = '8';
            alivenow.dejVid = 'dej-cut6'
            alivenow.currentState = "Que5"
            alivenow.nextState = "Share"
            alivenow.digitNo = 'digit6'
            alivenow.logo = 'royaltoplogo'
            this.counter = 0
            alivenow.sendData({
                "operation": "fifth",
                "user_id": alivenow.Global.U_ID
            });
            this.sound = this.game.add.audio('SWOC');
            if (alivenow.videoArr.filter(function(obj) {
                    return obj.key === 'cut6'
                }).length > 0) {
                // Intro.gameObj.bulb.destroy();
                var video_content = alivenow.videoArr.filter(function(obj) {
                    return obj.key === 'cut6'
                })[0].data;

                $("#gameVideo").attr('src', video_content);
                $("#video-container").removeClass('hidden');
                vid = document.getElementById("gameVideo");
                vid.play();
            }
            alivenow.openText = setInterval(() => {
                alivenow.openlastPromt.call(this, 5000, 'dej-cut6', 'Number85019')
            }, 500);
            alivenow.NumberFill.call(this, 535);
            alivenow.vidOut = setInterval(() => {
                alivenow.matchVideo.call(this, 8150)
            }, 200);
        };
        return Que5;
    })();
    alivenow.Share = (function() {
        function Share() {}
        Share.prototype.create = function() {
            Share.gameObj = this;
            alivenow.sendData({
                "operation": "sixth",
                "user_id": alivenow.Global.U_ID
            });
            if (alivenow.videoArr.filter(function(obj) {
                    return obj.key === 'cut7'
                }).length > 0) {
                // Intro.gameObj.bulb.destroy();
                var video_content = alivenow.videoArr.filter(function(obj) {
                    return obj.key === 'cut7'
                })[0].data;

                $("#gameVideo").attr('src', video_content);
                $("#video-container").removeClass('hidden');
                vid = document.getElementById("gameVideo");
                vid.play();
            }
            setTimeout(() => {
                this.clickGrp = this.add.group();
                this.g = this.game.add.graphics(0, 0);
                this.g.beginFill(0x000000, 0);
                this.g.position.set(this.world.centerX - 50, this.game.height - 200)
                this.g.drawRect(0, 0, 100, 100);
                this.g.endFill();
                this.clickGrp.addChild(this.g);
                this.g.inputEnabled = true;
                this.g.input.useHandCursor = true;
                this.g.events.onInputUp.add(this.onWahatsappClicked, this);
            }, 10000)
            // alivenow.vidOut=setInterval(()=>{alivenow.matchVideo.call(this,13100)},200);
            alivenow.NumberFill.call(this, 640);
            setTimeout(() => {
                this.noGrp.destroy();
            }, 5900)
        };
        //
        /*  Share.prototype.flipCard=function () {
              var tween1 = this.game.add.tween(this.card.scale);
              tween1.to({ x: 0 }, 300, Phaser.Easing.Linear.None, false, 0);
              tween1.onComplete.addOnce(function (sprite, tween) {
                  if(this.card.frame == 0)
                      this.card.frame = 1;
                  else
                      this.card.frame = 0;
              }, this);
              var tween2 = this.game.add.tween(this.card.scale);
              tween2.to({ x: 1 }, 300, Phaser.Easing.Linear.None, false, 0);
              tween1.chain(tween2);
              tween1.start();
              this.text1.destroy();
              this.text2=this.game.add.sprite(320,650,"Text2")
              this.text2.anchor.setTo(0.5,0);
              this.text2.scale.setTo(0.7);
              this.callNo = this.add.button(this.world.centerX, 800, "Buttons", this.PlayClicked, {
                  ClickName: "no"
              },"Call-button.png","Call-button.png");	
              this.callNo.anchor.setTo(0.5,0);
              this.callNo.scale.setTo(0.7);
          }*/
        Share.prototype.onWahatsappClicked = function() {
            // alivenow.sendData({"operation":"fshare","user_id": alivenow.Global.U_ID});
            //Share.gameObj.game.state.start("Form");
            if (alivenow.Global.device !== 'web') {
                alivenow.sendData({
                    "operation": "callclick",
                    "user_id": alivenow.Global.U_ID
                });
                window.location.href = "tel:+918501985019"
            } else {
                alivenow.sendData({
                    "operation": "callclick",
                    "user_id": alivenow.Global.U_ID
                });
                window.location.href = "https://www.facebook.com/royalstagmakeitlarge/"
            }

        };
        return Share;
    })();
    alivenow.Global = {
        URL_TSHARE_WEB: 'https://twitter.com/intent/tweet?text=',
        URL_FSHARE_WEB: 'https://www.facebook.com/sharer/sharer.php?u=',
        device: "mobile",
        _os: "",
        _deviceTypePos: 0,
        currLang: 'en',
        formSent: false,
        skipRotationHandle: false,
        rotateHandler: null,
        replay: false,
        gameFinish: false,
        gameOver: false,
        URL_CREATE: "../webservice/createUser.php",
        URL_VUPDATE: "../webservice/webservices.php",
        U_ID: "",
        Gender: '',
        Dollar: '',
        Weather: '',
        Carry: '',
        digitNumber: [],
    }
    var myObj = new alivenow.Main();
    myObj.init();
})();