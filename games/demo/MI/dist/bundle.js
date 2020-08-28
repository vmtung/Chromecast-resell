"use strict";

function saveImage() {
    var e = new Image;
    e.src = FBInstant.player.getPhoto(), e.crossOrigin = "anonymous", e.onload = function() {
        var t = document.createElement("canvas"),
            i = t.getContext("2d");
        i.save(), i.beginPath(), i.arc(75, 75, 75, 0, 2 * Math.PI, !1), i.clip(), i.drawImage(e, 0, 0, 150, 150), i.restore(), ENBD.Global.profileCanvas = t
    }
}

function sendImage(e, t) {
    $.ajax({
        url: "https://www.newsfeedsmartapps.com/fb-instant/BasketballChampions/apis/saveImage.php",
        data: {
            base64: ENBD.Global.profileCanvas.toDataURL("image/png"),
            UID: e
        },
        type: "post",
        success: function(e) {
            t(e)
        }
    })
}

function createThumbnail(e, t, i) {
    $.ajax({
        url: "https://www.newsfeedsmartapps.com/fb-instant/BasketballChampions/apis/thumbnail.php",
        data: {
            score: t,
            UID: e
        },
        type: "post",
        success: function(e) {
            i(e)
        }
    })
}

function getAnimationPromise(e) {
    return new Promise(function(e, t, i) {
        for (var s = 0; s < e.items.length; s++) tweenItem.call(this, {
            item: e.items[s],
            x: e.items[s].initX,
            y: e.items[s].initY,
            angle: e.items[s].initAngle,
            time: e.time,
            delay: e.delay,
            Ease: e.Ease,
            doOnComplete: s + 1 == e.items.length ? t : null
        }), scaleInTween.call(this, {
            item: e.items[s],
            scaleX: e.items[s].initScaleX,
            scaleY: e.items[s].initScaleY,
            time: e.time,
            delay: e.delay,
            Ease: e.Ease
        })
    }.bind(this, e))
}

function tweenItem(e) {
    var t = new Phaser.Tween(e.item, this.game, this.game.tweens);
    return t.to({
        angle: e.angle,
        x: e.x,
        y: e.y,
        alpha: void 0 != e.alpha ? e.alpha : 1
    }, e.time, e.Ease, !0, e.delay).interpolation(function(e, t) {
        return Phaser.Math.bezierInterpolation(e, t)
    }).onComplete.add(function() {
        e.doOnComplete && e.doOnComplete.call(this)
    }.bind(this)), t
}

function scaleInTween(e) {
    new Phaser.Tween(e.item.scale, this.game, this.game.tweens).to({
        x: e.scaleX,
        y: e.scaleY
    }, e.time, e.Ease || Phaser.Easing.Linear.None, !0, e.delay || 0).onComplete.add(function() {
        e.doOnComplete && e.doOnComplete.call(this)
    }.bind(this))
}

function tweenItemVertical(e) {
    new Phaser.Tween(e.item, this.game, this.game.tweens).to({
        y: e.y
    }, e.time, e.Ease, !0, e.delay).onComplete.add(function() {
        e.doOnComplete && e.doOnComplete.call(this)
    }.bind(this))
}

function alphaTween(e) {
    new Phaser.Tween(e.item, this.game, this.game.tweens).to({
        alpha: void 0 != e.alpha ? e.alpha : 1
    }, e.time, e.Ease, !0, e.delay).onComplete.add(function() {
        e.doOnComplete && e.doOnComplete.call(this)
    }.bind(this))
}

function tweenItemNoAlpha(e) {
    new Phaser.Tween(e.item, this.game, this.game.tweens).to({
        angle: e.angle,
        x: e.x,
        y: e.y
    }, e.time, e.Ease, !0, e.delay).onComplete.add(function() {
        e.doOnComplete && e.doOnComplete.call(this)
    }.bind(this))
}
var Newsfeed = Newsfeed || {};
Newsfeed.Global = {
    serverObj: null,
    _device: "",
    _os: "",
    formSent: !1,
    skipRotationHandle: !1,
    U_ID: "12312",
    unhealthyCount: 0,
    gameKey: "",
    lang: "en",
    introShown: !1,
    URL_CREATE: "./create.php",
    URL_VUPDATE: "./valueUpdator.php",
    gameTry: 0,
    scoreTotal: 0,
    scaleSprite: function(e, t, i, s, a, n) {
        var o = this.getSpriteScale(e.width, e.height, t, i, s, n, e);
        e.scale.x = o * a, e.scale.y = o * a
    },
    getSpriteScale: function(e, t, i, s, a, n, o) {
        var h = 1,
            r = window.devicePixelRatio,
            l = (e * r + 2 * a) / i,
            d = (t * r + 2 * a) / s;
        return h = n ? 1 / Math.min(l, d) : i / r / 768, h * r
    }
};
var Newsfeed = Newsfeed || {};
Newsfeed.Server = function() {
    function e() {}
    return e.prototype.send = function(e, t, i, s, a) {
        s = void 0 == s ? {} : s, a = void 0 == a ? "POST" : a, $.ajax({
            url: e,
            type: a,
            data: s,
            success: t,
            error: i
        })
    }, e
}();
var Newsfeed = Newsfeed || {};
Newsfeed.Global = {
    serverObj: null,
    _device: "",
    _os: "",
    formSent: !1,
    skipRotationHandle: !1,
    U_ID: "",
    unhealthyCount: 0,
    gameKey: "",
    lang: "en",
    introShown: !1,
    URL_CREATE: "./create.php",
    URL_VUPDATE: "./valueUpdator.php",
    gameTry: 0,
    scoreTotal: 0,
    scaleSprite: function(e, t, i, s, a, n) {
        var o = this.getSpriteScale(e.width, e.height, t, i, s, n, e);
        e.scale.x = o * a, e.scale.y = o * a
    },
    getSpriteScale: function(e, t, i, s, a, n, o) {
        var h = 1,
            r = window.devicePixelRatio,
            l = (e * r + 2 * a) / i,
            d = (t * r + 2 * a) / s;
        return h = n ? 1 / Math.min(l, d) : i / r / 768, h * r
    }
};
var Newsfeed = Newsfeed || {};
Newsfeed.ImageLoader = function() {
    function e() {
        this.timeoutHappened = !1, this.assetLoaded = !1
    }
    return e.prototype.init = function() {
        console.log("Loadder init"), this.game.load.onFileComplete.add(this.progress, this)
    }, e.prototype.progress = function(e) {}, e.prototype.preload = function() {
        var e = "1.0.0.6";
        this.appLoader = new Newsfeed.Loader, this.defaultDelay = setTimeout(this.onTimeout.bind(this), 2e3), this.appLoader.init(this.game, "assets/loaderIcon.png"), this.game.load.image("BG1", "./assets/BG1.jpg"), this.game.load.image("BG2", "./assets/BG2.jpg"), this.game.load.atlasXML("sprite1", "./assets/sprite1.png?v=" + e, "./assets/sprite1.xml?v=" + e), this.game.load.atlasXML("sprite2", "./assets/sprite2.png?v=" + e, "./assets/sprite2.xml?v=" + e), this.game.load.atlasXML("texts", "./assets/texts.png?v=" + e, "./assets/texts.xml?v=" + e), this.game.load.atlasXML("button", "./assets/button.png?v=" + e, "./assets/button.xml?v=" + e)
    }, e.prototype.create = function() {
        this.assetLoaded = !0, this.timeoutHappened && (clearTimeout(this.defaultDelay), this.prepareToNext())
    }, e.prototype.onTimeout = function() {
        clearTimeout(this.defaultDelay), this.timeoutHappened = !0, this.assetLoaded && this.prepareToNext()
    }, e.prototype.prepareToNext = function() {
        this.appLoader.dispose(), this.game.renderer.setTexturePriority(["sprite1", "texts"]), this.game.state.start("Question")
    }, e
}();
var Newsfeed = Newsfeed || {};
Newsfeed.Question = function() {
    function e() {}
    var t, i;
    return e.prototype.init = function() {
        t = this.game.canvas.width, i = this.game.canvas.height
    }, e.prototype.create = function() {
        Newsfeed.Global.unhealthyCount = 0, this.queIndex = -1, this.unhealthyKey = ["img1", "img3", "img6", "img8", "img9"], this.optionClicked = !1, this.answerObj = {
            img1: "binging",
            img2: "running",
            img3: "junk",
            img4: "healthy",
            img5: "biking",
            img6: "motorbiking",
            img7: "walkandtalk",
            img8: "sitandtalk",
            img9: "standitout",
            img10: "sweatitout"
        }, this.BG = this.game.add.sprite(0, 0, "BG1"), this.logo = this.game.add.sprite(0, 0, "sprite1", "logo"), this.queGr = this.add.group(), this.waveGr = new Phaser.Graphics(this.game), this.queGr.addChild(this.waveGr), this.band1 = this.queGr.create(0, 0, "sprite1", "band1"), this.band2 = this.queGr.create(0, 0, "sprite1", "band2"), this.que = this.queGr.create(t / 2, 0, "sprite1", "question"), this.img1 = this.queGr.create(t / 2, 0, "sprite1", "img1"), this.img2 = this.queGr.create(t / 2, 0, "sprite1", "img2"), this.orTxt = this.queGr.create(t / 2, 0, "texts", "or"), this.opt1 = this.queGr.create(t / 2, 0, "texts", "text1"), this.opt2 = this.queGr.create(t / 2, 0, "texts", "text2"), this.BG.anchor.setTo(.5), this.img1.anchor.setTo(.5), this.img2.anchor.setTo(.5), this.opt1.anchor.setTo(.5), this.opt2.anchor.setTo(.5), this.orTxt.anchor.setTo(.5, 0), this.que.anchor.setTo(.5, 0), Newsfeed.Global.isMobile && (Newsfeed.Global.scaleSprite(this.BG, t, i, 0, 1, !0), Newsfeed.Global.scaleSprite(this.logo, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .65 : .75, !1), Newsfeed.Global.scaleSprite(this.band1, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .65 : .75, !1), Newsfeed.Global.scaleSprite(this.band2, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .65 : .75, !1), Newsfeed.Global.scaleSprite(this.que, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .55 : t / i > .6 ? .6 : .65, !1), Newsfeed.Global.scaleSprite(this.opt1, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .55 : t / i > .6 ? .6 : .65, !1), Newsfeed.Global.scaleSprite(this.opt2, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .55 : t / i > .6 ? .6 : .65, !1), Newsfeed.Global.scaleSprite(this.img1, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .55 : t / i > .6 ? .6 : .65, !1), Newsfeed.Global.scaleSprite(this.img2, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .55 : t / i > .6 ? .6 : .65, !1), Newsfeed.Global.scaleSprite(this.orTxt, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .55 : t / i > .6 ? .6 : .65, !1)), this.band1.alpha = this.band2.alpha = .3, this.BG.x = t / 2, this.BG.y = i / 2, this.logo.x = t - 1.3 * this.logo.width, this.logo.y = .3 * this.logo.width, this.band1.x = t - .65 * this.band1.width, this.band1.y = i - .58 * this.band1.height, this.band2.x = .6 * -this.band2.width, this.band2.y = .1 * i, this.que.y = 0, this.opt1.y = this.que.y + .95 * this.que.height, this.img1.y = this.opt1.y + this.opt1.height + 40 / 2208 * i + this.img1.height / 2, this.orTxt.y = this.img1.y + this.img1.height / 2 + 40 / 2208 * i, this.img2.y = this.orTxt.y + this.orTxt.height + 50 / 2208 * i + this.img1.height / 2, this.opt2.y = this.img2.y + this.img2.height / 2 + this.opt2.height / 2 + 55 / 2208 * i, this.queGr.y = (i - (this.opt2.y + this.opt2.height)) / 2, this.circle = new Phaser.Graphics(this.game), this.queGr.addChild(this.circle), this.circle.lineStyle(8 * t / 1242, 16628482), this.circle.arc(this.img1.x, this.img1.y, .55 * this.img1.width, 0, Phaser.Math.degToRad(360), !1), this.circle.arc(this.img2.x, this.img2.y, .55 * this.img2.width, 0, Phaser.Math.degToRad(360), !1), this.addMask(), this.img1.initY = this.img1.y, this.img2.initY = this.img2.y, this.img1.y = this.img1.initY - this.img1.height, this.img2.y = this.img2.initY + this.img2.height, setTimeout(this.showNext.bind(this), 10), this.img1.inputEnabled = !0, this.img2.inputEnabled = !0, this.img1.input.useHandCursor = !0, this.img2.input.useHandCursor = !0, this.img1.events.onInputDown.add(this.addWave.bind(this, this.img1)), this.img2.events.onInputDown.add(this.addWave.bind(this, this.img2)), this.game.input.onUp.add(this.onUp.bind(this)), this.que.smoothed = !0, this.opt1.smoothed = !0, this.opt2.smoothed = !0
    }, e.prototype.onUp = function() {
        this.optionClicked && this.showNext(), this.optionClicked = !1
    }, e.prototype.showNext = function() {
        this.queIndex++, this.queIndex <= 4 ? (this.img1.frameName = "img" + String(parseInt(2 * this.queIndex + 1)), this.img2.frameName = "img" + String(parseInt(2 * this.queIndex + 2)), this.opt1.frameName = "text" + String(parseInt(2 * this.queIndex + 1)), this.opt2.frameName = "text" + String(parseInt(2 * this.queIndex + 2)), this.img1.y = this.img1.initY - this.img1.height, this.img2.y = this.img2.initY + this.img2.height, tweenItem.call(this, {
            item: this.img1,
            x: this.img1.x,
            y: this.img1.y + this.img1.height,
            time: 200,
            delay: 0,
            Ease: Phaser.Easing.Cubic.Out
        }), tweenItem.call(this, {
            item: this.img2,
            x: this.img2.x,
            y: this.img2.y - this.img2.height,
            time: 200,
            delay: 0,
            Ease: Phaser.Easing.Cubic.Out,
            doOnComplete: function() {
                this.img1.inputEnabled = !0, this.img2.inputEnabled = !0
            }.bind(this)
        })) : (this.game.tweens.removeAll(), this.waveGr.clear(), setTimeout(function() {
            this.game.state.start("Result")
        }.bind(this), 10))
    }, e.prototype.addWave = function(e) {
        this.optionClicked = !0, this.img1.inputEnabled = !1, this.img2.inputEnabled = !1, -1 != this.unhealthyKey.indexOf(e.frameName) && Newsfeed.Global.unhealthyCount++;
        // Newsfeed.Global.serverObj.send(Newsfeed.Global.URL_VUPDATE, null, null, {
        //     saveType: this.answerObj[e.frameName],
        //     uniqID: Newsfeed.Global.U_ID
        // }, "POST", null, !1);
        this.waveGr.clear(), this.waveGr.alpha = 1, this.waveGr.scale.setTo(1), this.waveGr.position.set(e.x, e.y), this.waveGr.beginFill(16777215, .2), this.waveGr.drawCircle(0, 0, e.width), this.waveGr.endFill(), scaleInTween.call(this, {
            item: this.waveGr,
            scaleX: 1.6,
            scaleY: 1.6,
            time: 300,
            Ease: Phaser.Easing.Cubic.Out,
            delay: 0
        }), tweenItem.call(this, {
            item: this.waveGr,
            x: this.waveGr.x,
            y: this.waveGr.y,
            Ease: Phaser.Easing.Linear.None,
            time: 200,
            delay: 100,
            alpha: 0
        })
    }, e.prototype.addMask = function() {
        this.img1Mask = new Phaser.Graphics(this.game), this.queGr.addChild(this.img1Mask), this.img1Mask.position.set(this.img1.x, this.img1.y), this.img1Mask.beginFill(16711680, .4), this.img1Mask.drawCircle(0, 0, this.img1.width), this.img1Mask.endFill(), this.img2Mask = new Phaser.Graphics(this.game), this.queGr.addChild(this.img2Mask), this.img2Mask.position.set(this.img2.x, this.img2.y), this.img2Mask.beginFill(16711680, .4), this.img2Mask.drawCircle(0, 0, this.img2.width), this.img2Mask.endFill(), this.img1.mask = this.img1Mask, this.img2.mask = this.img2Mask
    }, e
}();
var Newsfeed = Newsfeed || {};
Newsfeed.Result = function() {
    function e() {}
    var t, i;
    return e.prototype.init = function() {
        t = this.game.canvas.width, i = this.game.canvas.height
    }, e.prototype.create = function() {
        this.BG = this.game.add.sprite(0, 0, "BG2"), this.logo = this.game.add.sprite(0, 0, "sprite2", "logo"), this.queGr = this.add.group(), this.waveGr = new Phaser.Graphics(this.game), this.queGr.addChild(this.waveGr), this.band3 = this.queGr.create(0, 0, "sprite2", "band3"), this.band4 = this.queGr.create(0, 0, "sprite2", "band4"), this.result = this.queGr.create(t / 2, i / 2, "sprite2", "unhealthy" + String(Newsfeed.Global.unhealthyCount)), this.cta = this.add.button(t / 2, 0, "button", this.onCTAClick.bind(this), this, "button0002", "button0000", "button0002", "button0000"), this.cta.anchor.setTo(.5, 0), this.result.anchor.setTo(.5), Newsfeed.Global.isMobile ? (Newsfeed.Global.scaleSprite(this.BG, t, i, 0, 1, !0), Newsfeed.Global.scaleSprite(this.logo, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .65 : .75, !1), Newsfeed.Global.scaleSprite(this.band3, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .65 : .75, !1), Newsfeed.Global.scaleSprite(this.band4, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .65 : .75, !1), Newsfeed.Global.scaleSprite(this.result, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .5 : t / i > .6 ? .55 : .6, !1), Newsfeed.Global.scaleSprite(this.cta, t, i, 0, "tablet" == Newsfeed.Global.deviceDetector.device ? .5 : t / i > .6 ? .55 : .6, !1)) : this.result.scale.setTo(.85), this.result.smoothed = !0, this.logo.x = t - 1.3 * this.logo.width, this.logo.y = .3 * this.logo.width, this.band3.x = -this.band3.width / 2, this.band3.y = -this.band3.height / 2, this.band4.x = t - .45 * this.band4.width, this.band4.y = i - this.band4.height, this.band3.alpha = this.band4.alpha = .3, this.cta.y = .85 * i
    }, e.prototype.onCTAClick = function() {
        // Newsfeed.Global.serverObj.send(Newsfeed.Global.URL_VUPDATE, null, null, {
        //     saveType: "knowMoreClick",
        //     uniqID: Newsfeed.Global.U_ID
        // }, "POST", null, !1)
        location.href = "https://www.mi.com/in/mi-band-3/?utm_source=social_paid&utm_medium=facebook&utm_campaign=SP_ACC_MiBand3_ROI_20181227&utm_content=SP_ACC_MiBand3_ROI_20181227_FB&utm_term=SP_ACC_MiBand3_ROI_20181227_FB_Video"
    }, e
}();
var FBAPi = {
        userDataPending: !1,
        initAsync: function() {
            return new Promise(function(e, t) {
                FBInstant.initializeAsync().then(function() {
                    e()
                })["catch"](function() {
                    t()
                })
            })
        },
        checkIfPlayingInThread: function() {
            return new Promise(function(e, t) {
                this.getContext().then(function(t) {
                    e(null != t.getID() ? !0 : !1)
                })
            }.bind(this))
        },
        getContext: function() {
            return new Promise(function(e, t) {
                e(FBInstant.context)
            })
        },
        connectWithID: function(e) {
            return new Promise(function(t, i) {
                FBInstant.context.createAsync(e).then(function(e) {
                    console.log(e, " connected"), t(!0)
                })["catch"](function(e) {
                    t(!1)
                })
            })
        },
        getPlayersAsync: function() {
            return new Promise(function(e, t) {
                FBInstant.context.getPlayersAsync().then(function(t) {
                    e(t)
                })["catch"](function(e) {
                    console.log(e)
                })
            })
        },
        getConnectedPlayers: function() {
            return new Promise(function(e, t) {
                FBInstant.player.getConnectedPlayersAsync().then(function(t) {
                    e(t)
                })["catch"](function(e) {
                    t(e)
                })
            })
        },
        chooseContextAsync: function() {
            return new Promise(function(e, t) {
                FBInstant.context.chooseAsync({
                    filters: ["NEW_CONTEXT_ONLY"]
                }).then(function(t) {
                    e(t)
                })["catch"](function(e) {
                    t(e)
                })
            })
        },
        fetchUserData: function() {
            return new Promise(function(e, t) {
                var i = this;
                this.userDataPending ? (this.userDataPending = !1, t()) : (this.userDataPending = !0, FBInstant.getLeaderboardAsync("leaderboard-public").then(function(e) {
                    return e.getPlayerEntryAsync()
                }).then(function(t) {
                    i.userDataPending = !1, e(t)
                })["catch"](function() {
                    this.userDataPending = !1, t()
                }))
            }.bind(this))
        },
        fetchHighScore: function() {
            return new Promise(function(e, t) {
                this.getLeaderData().then(function(t) {
                    t.getEntriesAsync(100).then(function(t) {
                        e(t)
                    })
                })["catch"](function(e) {
                    t(e)
                })
            }.bind(this))
        },
        getLeaderData: function() {
            return new Promise(function(e, t) {
                FBInstant.getLeaderboardAsync("leaderboard-public").then(function(t) {
                    e(t)
                })["catch"](function(e) {
                    t(e)
                })
            })
        },
        fetchBestScoreById: function(e, t) {
            return new Promise(function(i, s) {
                for (var a = 0; a < t.length; a++) t[a].getPlayer().getID() == e && i(t[a].getScore());
                i(0)
            })
        },
        fetchBestScore: function(e) {
            return new Promise(function(t, i) {
                for (var s = 0, a = 0, n = 0; n < e.length; n++) a = e[n].getScore(), a > s && (s = a);
                t(s)
            })
        },
        fetchContextHighScore: function() {
            return new Promise(function(e, t) {
                this.getContextualLeaderData().then(function(t) {
                    t.getEntriesAsync().then(function(t) {
                        e(t)
                    })
                })["catch"](function(e) {
                    t(e)
                })
            }.bind(this))
        },
        getContextualLeaderData: function() {
            return new Promise(function(e, t) {
                FBInstant.getLeaderboardAsync("leaderboard-private." + FBInstant.context.getID()).then(function(t) {
                    e(t)
                })["catch"](function(e) {
                    return console.error(e)
                })
            })
        },
        saveScore: function() {
            return new Promise(function(e, t) {
                this.getLeaderData().then(function(t) {
                    t.setScoreAsync(ENBD.Global.scoreTotal, "score").then(function(t) {
                        FBInstant.player.setDataAsync({
                            score: ENBD.Global.scoreTotal
                        }).then(function(t) {
                            e(t)
                        })
                    })
                })["catch"](function(e) {
                    t(e)
                })
            }.bind(this))
        },
        saveContextScore: function() {
            return new Promise(function(e, t) {
                this.getContextualLeaderData().then(function(t) {
                    return t.setScoreAsync(ENBD.Global.scoreTotal, "score").then(function(t) {
                        e(t)
                    })
                })["catch"](function(e) {
                    t(e)
                })
            }.bind(this))
        },
        getPlayerScore: function() {
            return new Promise(function(e, t) {
                FBInstant.player.getDataAsync(["score"]).then(function(t) {
                    "undefined" != typeof t.score && e(t.score)
                }.bind(this))["catch"](function(e) {
                    t(0)
                })
            })
        },
        sendInvite: function() {
            FBInstant.updateAsync({
                action: "CUSTOM",
                cta: "Play with me",
                image: ENBD.Global.shareImg,
                text: {
                    "default": "Let's play Basketball Champions"
                },
                template: "",
                strategy: "IMMEDIATE",
                notification: "PUSH"
            })
        },
        sendBeatInfo: function(e) {
            return new Promise(function(t, i) {
                FBInstant.updateAsync({
                    action: "CUSTOM",
                    cta: "Beat My Score",
                    image: ENBD.Global.beatImg,
                    text: {
                        "default": e ? String(ENBD.Global.userFullName) + " is now in the lead with " + String(ENBD.Global.scoreTotal) + " points. Try your best." : String(ENBD.Global.userFullName) + " has scored " + String(ENBD.Global.scoreTotal) + ". Try your best."
                    },
                    template: "",
                    data: {
                        playerId: FBInstant.player.getID(),
                        isShared: !1
                    },
                    strategy: "IMMEDIATE",
                    notification: "PUSH"
                }).then(t.bind(this))["catch"](i)
            })
        }
    },
    Newsfeed = Newsfeed || {};
Newsfeed.Loader = function() {
    function e() {}
    return e.prototype.init = function(e, t) {
        this.version = "1.0.0", document.body.style.backgroundColor = "#212121", e.load.image("loaderIcon", t), console.log("Loader Icon Added", t), this.loaderGr = new Phaser.Group(e), this.loaderBG = new Phaser.Graphics(e), this.loaderBase = new Phaser.Graphics(e), this.loaderPath = new Phaser.Graphics(e), this.loaderCover = new Phaser.Graphics(e), this.loaderBase.beginFill(8718349, 1), this.loaderCover.beginFill(2171169, 1), this.loaderPath.beginFill(15673133, 1), this.loaderBG.beginFill(2171169, 1), this.loaderGr.addChild(this.loaderBG), this.loaderGr.addChild(this.loaderBase), this.loaderGr.addChild(this.loaderPath), this.loaderGr.addChild(this.loaderCover), this.loaderPath.position.set(e.world.centerX, 1.4 * e.world.centerY + 50), this.loaderBase.position.set(e.world.centerX, 1.4 * e.world.centerY + 50), this.loaderCover.position.set(e.world.centerX, 1.4 * e.world.centerY + 50), this.loaderBase.drawCircle(0, 0, 2 * (e.canvas.width < e.canvas.height ? 40 : 20)), this.loaderCover.drawCircle(0, 0, 2 * (e.canvas.width < e.canvas.height ? 25 : 12.5)), this.loaderBG.drawRect(0, 0, e.canvas.width, e.canvas.height), this.loaderPath.arc(0, 0, e.canvas.width < e.canvas.height ? 40 : 20, e.math.degToRad(90), e.math.degToRad(-100), !0);
        for (var i = 0; 75 >= i; i++) this.loaderPath.beginFill(15673133, 1 - 1 * i / 75), this.loaderPath.arc(0, 0, e.canvas.width < e.canvas.height ? 40 : 20, e.math.degToRad(-100 - .9 * i), e.math.degToRad(-100 - .9 * (i + 1)), !0);
        this.loaderBG.endFill(), this.loaderBase.endFill(), this.loaderPath.endFill(), this.loaderCover.endFill(), this.gameObj = e, this.gameObj.load.onFileComplete.add(this.checkLoaderLogoStat.bind(this, "loaderIcon"), this), this.rotateLoader()
    }, e.prototype.rotateLoader = function() {
        this.rotateTween = new Phaser.Tween(this.loaderPath, this.gameObj, this.gameObj.tweens).to({
            angle: 360
        }, 1100, Phaser.Easing.Linear.Out, 1, !0).onComplete.addOnce(this.rotateLoader.bind(this))
    }, e.prototype.checkLoaderLogoStat = function(e) {
        -1 != this.gameObj.cache.getKeys(Phaser.Cache.IMAGE).indexOf(e) && (this.gameObj.load.onFileComplete.removeAll(this), this.addLoaderLogo(e))
    }, e.prototype.addLoaderLogo = function(e) {
        this.loaderLogo = this.gameObj.add.image(0, 0, e), Newsfeed.Global.isMobile && Newsfeed.Global.scaleSprite(this.loaderLogo, this.gameObj.canvas.width, this.gameObj.canvas.height, 0, ("tablet" == Newsfeed.Global.deviceDetector.device, .65), !1), this.gameObj.canvas.width > this.gameObj.canvas.height && this.loaderLogo.scale.setTo(.5), this.loaderLogo.x = (this.gameObj.canvas.width - this.loaderLogo.width) / 2, this.loaderLogo.y = this.gameObj.world.centerY + this.loaderLogo.height / 2 - (this.gameObj.canvas.width < this.gameObj.canvas.height ? 100 : 50), this.loaderGr.addChild(this.loaderLogo), this.logoMask = new Phaser.Graphics(this.gameObj), this.logoMask.beginFill(16777215), this.logoMask.position.set(this.loaderLogo.x, this.gameObj.world.centerY - this.loaderLogo.height / 2 - (this.gameObj.canvas.width < this.gameObj.canvas.height ? 100 : 50)), this.logoMask.drawRect(0, 0, this.loaderLogo.width, this.loaderLogo.height), this.loaderGr.addChild(this.logoMask), this.loaderLogo.mask = this.logoMask, this.loaderLogo.alpha = 0, setTimeout(function() {
            new Phaser.Tween(this.loaderLogo, this.gameObj, this.gameObj.tweens).to({
                y: this.loaderLogo.y - this.loaderLogo.height
            }, 350, Phaser.Easing.Cubic.Out, 1, !0), new Phaser.Tween(this.loaderLogo, this.gameObj, this.gameObj.tweens).to({
                alpha: 1
            }, 350, Phaser.Easing.Linear.Out, 1, !0)
        }.bind(this), 10)
    }, e.prototype.dispose = function() {
        this.rotateTween && this.rotateTween._destroy(), this.loaderLogo && (this.loaderLogo.mask = null), this.loaderGr.destroy(), this.gameObj.load.onFileComplete.removeAll(this)
    }, e
}();
var Newsfeed = Newsfeed || {};
! function() {
    Newsfeed.Boot = function() {
        function e() {
            this.gameObj = null, this.preloadComplete = !1, this.postLoaderReady = !1
        }
        return e.prototype.init = function() {
            if (Newsfeed.Global.deviceDetector = function() {
                    var e = navigator.userAgent.toLowerCase(),
                        t = function(t) {
                            return void 0 !== t && (e = t.toLowerCase()), /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(e) ? "tablet" : /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(e) ? "phone" : "desktop"
                        };
                    return {
                        device: t(),
                        detect: t,
                        isMobile: "desktop" != t() ? !0 : !1,
                        userAgent: e
                    }
                }(), Newsfeed.Global.isMobile = !("desktop" == Newsfeed.Global.deviceDetector.device), (Newsfeed.Global.deviceDetector.userAgent.match(/iPhone/i) || Newsfeed.Global.deviceDetector.userAgent.match(/iPod/i) || Newsfeed.Global.deviceDetector.userAgent.match(/iPad/i)) && (Newsfeed.Global.isIOS = !0), Newsfeed.Global.isMobile) {
                Newsfeed.Global.skipRotationHandle = !1;
                var e = window.innerWidth * window.devicePixelRatio,
                    t = window.innerHeight * window.devicePixelRatio;
                Newsfeed.Global.scaleX = e / 768, Newsfeed.Global.scaleY = t / 1100
            } else {
                var e = 1242,
                    t = 2208;
                Newsfeed.Global.skipRotationHandle = !0
            }
            var i = new Phaser.Game(e, t, Phaser.CANVAS, "game-sec", {
                create: this.create,
                preload: this.preload2,
                rotateMe: this.rotateMe
            }, !0, !0);
            Newsfeed.Global.serverObj = new Newsfeed.Server, i.state.add("Loader", Newsfeed.ImageLoader), i.state.add("Question", Newsfeed.Question), i.state.add("Result", Newsfeed.Result)
        }, e.prototype.preload2 = function() {}, e.prototype.create = function() {
            this.game.config.enableDebug = !1;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.compatibility.orientationFallback = "viewport";
            this.game.scale.pageAlignHorizontally = !0;
            this.game.scale.pageAlignVertically = !0;
            this.game.clearBeforeRender = !1;
            window.addEventListener("resize", this.rotateMe);
            this.rotateMe();
            e.prototype.setUID.bind(this)("12345")
            // Newsfeed.Global.serverObj.send(Newsfeed.Global.URL_CREATE, e.prototype.setUID.bind(this), null, {
            //     device: Newsfeed.Global.isMobile ? "mobile" : "web",
            //     fresh: !0
            // }, "POST", null, !1)
        }, e.prototype.setUID = function(e) {
            Newsfeed.Global.U_ID = JSON.parse(e).UID, setTimeout(function() {
                this.game.state.start("Loader")
            }.bind(this), 0)
        }, e.prototype.rotateMe = function() {
            var e = document.getElementById("rotate");
            Newsfeed.Global.skipRotationHandle || (window.innerWidth > window.innerHeight ? e.style.display = "block" : e.style.display = "none")
        }, e
    }();
    var e = new Newsfeed.Boot;
    e.init()
}();