"use strict";
var alivenow = alivenow || {};
alivenow.Global = {
    URL_TSHARE_WEB: "https://twitter.com/intent/tweet?url=http://bit.ly/2rcqnsD",
    URL_FSHARE_WEB: "https://www.facebook.com/sharer/sharer.php?u=http://bit.ly/2rcqnsD&t=",
    game: null,
    _device: "",
    _os: "",
    formSent: !1,
    skipRotationHandle: !1,
    U_ID: "",
    name: "",
    email: "",
    contact: "",
    gameKey: "",
    URL_DATA: "./data.php",
    URL_CREATE: "./create.php",
    URL_VUPDATE: "./valueUpdator.php",
    gamePaused: !0,
    gameObj: null,
    prevTab: null,
    currTab: null,
    thumbnailPath: "",
    introShown: !1,
    isTopToEnable: !1,
    topEnabled: !1,
    foamSet: !1,
    movingToTarget: !1,
    gameTry: 0,
    appBitly: "",
    baseLineActivated: !1,
    sideBarActivated: !1,
    goalChecked: !1,
    goalHitOnTarget: !1,
    gotBonus: !1,
    goalCount: 0,
    gameStart: !1,
    elapsedTime: 0,
    gameRunning: !1,
    successCount: 0,
    missCount: 0,
    bonusCount: 0
};
var alivenow = alivenow || {};
alivenow.Final = function() {
    function t() {}
    return t.prototype.create = function() {
        t.obj = this, this.BG1 = this.game.add.sprite(0, 0, "FormBG"), this.BG2 = this.game.add.sprite(0, 0, "finalScr"), this.replayBtn = this.add.button(224.5, 720, "buttons", this.onFinalAction, this, "replayBtn0000", "replayBtn0000", "replayBtn0001"), this.replayBtn.x = (768 - this.replayBtn.width) / 2
    }, t.prototype.onFinalAction = function() {
        alivenow.Global.elapsedTime = 0, alivenow.Global.gameStart = !0, alivenow.Global.goalCount = 0, this.game.state.start("Game")
    }, t
}(alivenow.Final || {});
var alivenow = alivenow || {};
alivenow.Game = function() {
    function t() {}
    return t.prototype.create = function() {
        t.obj = this, alivenow.Global.gameTry++, alivenow.Global.gameRunning = !0, alivenow.Global.goalCount = 0, alivenow.Global.missCount = 0, alivenow.Global.successCount = 0, alivenow.Global.bonusCount = 0, this.PrevlightPos = 0, this.lightPos = 0, this.arrowScaleVert = 0, this.scaledDone = !1, this.arrowDirection = -1, this.shadeScaleFact = 0, this.BG = this.game.add.sprite(0, 0, "GameBG"), this.visaLogoGr = this.add.group(), this.logo1 = this.visaLogoGr.create(10.6, 352.05, "Visa"), this.logo2 = this.visaLogoGr.create(140.6, 352.05, "Visa"), this.logo3 = this.visaLogoGr.create(560.6, 352.05, "Visa"), this.logo4 = this.visaLogoGr.create(690.6, 352.05, "Visa"), this.logoMask1 = this.game.add.graphics(0, 352.05), this.logoMask1.beginFill(16777215), this.logoMask1.drawRect(10.6, 0, this.logo1.width, this.logo1.height), this.logoMask2 = this.game.add.graphics(0, 352.05), this.logoMask2.beginFill(16777215), this.logoMask2.drawRect(140.6, 0, this.logo1.width, this.logo1.height), this.logoMask3 = this.game.add.graphics(0, 352.05), this.logoMask3.beginFill(16777215), this.logoMask3.drawRect(560.6, 0, this.logo1.width, this.logo1.height), this.logoMask4 = this.game.add.graphics(0, 352.05), this.logoMask4.beginFill(16777215), this.logoMask4.drawRect(690.6, 0, this.logo1.width, this.logo1.height), this.logo1.mask = this.logoMask1, this.logo2.mask = this.logoMask2, this.logo4.mask = this.logoMask4, this.logo3.mask = this.logoMask3, alivenow.Global.introShown || (this.introScr = this.game.add.sprite(0, 0, "introScr")), this.goalBar = this.game.add.sprite(0, 38, "goalBar"), this.timeBar = this.game.add.sprite(609.8, 38, "timeBar"), this.gameTime = new Phaser.BitmapText(this.game, 86, -5, "fifaFont", "15", 60), this.timeWarning = this.game.add.sprite(0, 150, "countdown"), this.warnMask = this.game.add.graphics(0, 165), this.warnMask.beginFill(16777215), this.warnMask.drawRect(0, 0, 768, 100), this.timeWarning.mask = this.warnMask, this.timeBar.addChild(this.gameTime), this.goalText = new Phaser.BitmapText(this.game, 90, -5, "fifaFont", "00", 60), this.gameTime.tint = "#000000", this.goalText.tint = "#000000", this.goalBar.addChild(this.goalText), this.goalPost = this.game.add.sprite(0, 300, "Goalpost"), this.goalPost.x = (768 - this.goalPost.width) / 2, this.targetSpr = this.game.add.sprite(0, 0, "Marker"), this.targetSpr.anchor.set(.5, .5), this.targetSpr.alpha = 0, this.targetSpr.scale.set(.65, .65), this.shadeSpr = this.game.add.sprite(381.5, 800, "arrowShade"), this.arrowSpr = this.game.add.sprite(381.5, 800, "arrow"), this.arrowLine = this.game.add.sprite(0, -420, "arrowLine"), this.arrowLine.alpha = 0, this.arrowSpr.addChild(this.arrowLine), this.arrowLine.anchor.set(.5, 0), this.light3 = this.game.add.sprite(-23.7, -154, "light1"), this.light2 = this.game.add.sprite(-23.7, -115, "light2"), this.light1 = this.game.add.sprite(-23.7, -79, "light3"), this.backLight3 = this.game.add.sprite(-23.7, -154, "backLight1"), this.backLight2 = this.game.add.sprite(-23.7, -115, "backLight2"), this.backLight1 = this.game.add.sprite(-23.7, -79, "backLight3"), this.indicator = this.game.add.sprite(500, 560, "indicator"), this.indicatorStop = this.game.add.sprite(75, 244, "indicatorStop"), this.indicator.visible = !1, this.indicator.addChild(this.indicatorStop), this.indicatorStop.anchor.set(0, .5), this.arrowSpr.addChildAt(this.backLight3, 0), this.arrowSpr.addChildAt(this.light3, 1), this.arrowSpr.addChildAt(this.backLight2, 2), this.arrowSpr.addChildAt(this.light2, 3), this.arrowSpr.addChildAt(this.backLight1, 4), this.arrowSpr.addChildAt(this.light1, 5), this.initiatePhysics(), this.arrowSpr.anchor.set(.5, 1), this.shadeSpr.anchor.set(.25, 1), this.ballSpr = this.game.add.sprite(384, 810, "football"), this.ballSpr.inputEnabled = !0, this.ballSpr.anchor.set(.5, .5), this.midLine = this.game.add.sprite(383.95, 0, "courtMidLine"), this.midLine.alpha = 0, this.topBar = this.game.add.sprite(383.95, 0, "courtMidLine"), this.topBar.alpha = 0, this.game.physics.box2d.enable(this.midLine), this.midLine.body.setRectangle(this.midLine.width, this.midLine.height, 0, 0), this.midLine.body["static"] = !0, this.game.physics.box2d.enable(this.topBar), this.topBar.body["static"] = !0, this.game.physics.box2d.enable(this.ballSpr), this.ballSpr.body.setCircle(this.ballSpr.width / 2, 0, 0), this.baseLine = this.game.add.sprite(383.95, 0, "courtMidLine"), this.baseLine.alpha = 0, this.game.physics.box2d.enable(this.baseLine), this.midLine.body.setBodyContactCallback(this.ballSpr, this.removeMidBar, this), this.baseLine.body.setBodyContactCallback(this.ballSpr, this.checkIfGoal, this), this.topBar.body.setBodyContactCallback(this.ballSpr, this.showCeleb, this), this.baseLine.body.setRectangle(10 * this.baseLine.width, this.baseLine.height, 0, 0), this.baseLine.body["static"] = !0, this.leftBar = this.game.add.sprite(0, 1100, "verticalBar"), this.leftBar.alpha = 0, this.rightBar = this.game.add.sprite(0, 1100, "verticalBar"), this.rightBar.alpha = 0, this.game.physics.box2d.enable(this.leftBar), this.game.physics.box2d.enable(this.rightBar), this.rightBar.body["static"] = !0, this.leftBar.body["static"] = !0, this.midLine.anchor.set(.5, .5), this.leftBar.anchor.set(.5, .5), this.rightBar.anchor.set(.5, .5), this.ballSpr.body.data.gravityScale = 9.8, this.ballSpr.body["static"] = !0, this.ballSpr.body.fixedRotation = !1, this.missCeleb = this.game.add.sprite(0, 500, "missCeleb"), this.goalCeleb = this.game.add.sprite(0, 500, "goalCeleb"), this.score = this.game.add.sprite(160, 100, "score"), this.bonus = this.game.add.sprite(160, 100, "bonus"), this.bonusMask = this.game.add.graphics(0, 0), this.bonusMask.beginFill(16777215), this.bonusMask.drawRect(165, 40, 100, 70), this.bonus.mask = this.bonusMask, this.score.mask = this.bonusMask, this.goalCeleb.x = (1030 - this.goalCeleb.width) / 2, this.missCeleb.x = (1030 - this.missCeleb.width) / 2, this.goalCeleb.anchor.set(.5, .5), this.missCeleb.anchor.set(.5, .5), this.scoreBG = this.game.add.sprite(0, 0, "scoreBG"), this.scoreMask = this.game.add.graphics(0, 0), this.scoreMask.beginFill(16777215), this.scoreMask.drawRect((768 - this.scoreBG.width) / 2, (1100 - this.scoreBG.height) / 2, this.scoreBG.width, this.scoreBG.height), this.scoreBG.mask = this.scoreMask, this.finalScore = new Phaser.BitmapText(this.game, 0, 200, "fifaFont", "00", 200), this.tryBtn = this.add.button(224.5, 580, "buttons", this.onScoreAction, this.tryBtn, "tryBtn0000", "tryBtn0000", "tryBtn0001"), this.submitBtn = this.add.button(224.5, 780, "buttons", this.onScoreAction, this.submitBtn, "submitBtn0000", "submitBtn0000", "submitBtn0001"), this.submitBtn.visible = !1, this.scoreBG.addChild(this.tryBtn), this.scoreBG.addChild(this.submitBtn), this.finalScore.x = (this.scoreBG.width - this.finalScore.width) / 2, this.scoreBG.addChild(this.finalScore), this.scoreBG.x = (768 - this.scoreBG.width) / 2, this.scoreBG.y = (1100 - this.scoreBG.height) / 2 + this.scoreBG.height, this.timeUpGr = this.add.group(), this.scoreBG.visible = !1, this.scoreBG.alpha = 0, this.timeUpGr.addChild(this.timeWarning), this.timeUpGr.addChild(this.scoreBG), this.timeWarning.x = (768 - this.timeWarning.width) / 2, this.timeWarning.visible = !1, this.goalSound = this.game.add.audio("goalSound"), this.missSound = this.game.add.audio("missSound"), this.bonusSound = this.game.add.audio("bonusSound"), this.missSound.volume = .4, this.goalSound.volume = .4, this.missCeleb.alpha = 0, this.goalCeleb.alpha = 0, this.light1.alpha = 0, this.light2.alpha = 0, this.light3.alpha = 0, alivenow.Global.introShown ? (alivenow.Global.gameStart = !0, this.resetGameState()) : (this.BGSound = this.game.add.audio("BGSound"), this.BGSound.loop = !0, this.BGSound.volume = .5, this.BGSound.play(), alivenow.Global.introShown = !0, this.playBtn = this.add.button(0, 550, "buttons", this.resumeGame, this, "playBtn0000", "playBtn0000", "playBtn0001"), this.playBtn.x = (768 - this.playBtn.width) / 2, this.introScr.addChild(this.playBtn)), this.visaLogoGr.visible = !1
    }, t.prototype.moveLogo = function() {
        this.logoTwn = new Phaser.Tween(this.visaLogoGr, this.game, this.game.tweens), 0 == this.visaLogoGr.x ? this.logoTwn.to({
            x: this.visaLogoGr.x - 100
        }, 180, Phaser.Easing.Linear.None, !0, 3e3) : this.logoTwn.to({
            x: this.visaLogoGr.x - 100
        }, 180, Phaser.Easing.Linear.None, !0, 700), this.logoTwn.onComplete.addOnce(this.resetLogoPos, this), this.logoTwn.start()
    }, t.prototype.resetLogoPos = function() {
        -100 == this.visaLogoGr.x && (this.visaLogoGr.x = 100), this.moveLogo()
    }, t.prototype.onScoreAction = function() {
        switch (this._onDownFrame) {
            case "tryBtn0001":
                t.obj.resetBeforeReplay();
                break;
            case "submitBtn0001":
                alivenow.Global.gameRunning = !1, t.obj.game.state.start("Final")
        }
    }, t.prototype.resetBeforeReplay = function() {
        t.obj.scoreBG.visible = !1, alivenow.Global.missCount = 0, alivenow.Global.successCount = 0, alivenow.Global.bonusCount = 0, alivenow.Global.gameTry++, t.obj.game.scale.startFullScreen(), alivenow.Global.elapsedTime = 0, alivenow.Global.gameStart = !0, alivenow.Global.goalCount = 0, t.obj.goalText.text = "00", t.obj.timeWarning.y = 150, t.obj.timeWarning.visible = !1, t.obj.scoreBG.y = (1100 - t.obj.scoreBG.height) / 2 + t.obj.scoreBG.height, t.obj.moveLogo(), t.obj.resetGameState()
    }, t.prototype.resumeGame = function() {
        alivenow.Global.gameStart = !0, this.resetGameState(), this.game.scale.startFullScreen(), this.playBtn.input.stop(), this.playBtn.kill(), this.introScr.kill()
    }, t.prototype.playLoop = function() {}, t.prototype.resetGameState = function() {
        alivenow.Global.gameRunning && alivenow.Global.gameStart && (this.ballSpr.events.onInputDown.removeAll(), this.ballSpr.events.onInputDown.addOnce(this.moveArrowHorizontally, this), this.ballSpr.body["static"] = !0, this.ballSpr.body.x = 384, this.ballSpr.body.y = 810, this.indicatorStop.y = 244, this.setTarget(), this.missCeleb.alpha = 0, this.goalCeleb.alpha = 0, this.scaledDone = !1, this.shadeSpr.visible = !0, this.arrowSpr.visible = !0, this.topBar.body.y = 0, this.baseLine.body.y = 0, alivenow.Global.gotBonus = !1, this.arrowSpr.angle = 0, this.shadeSpr.angle = 0, this.score.y = 100, this.bonus.y = 100, this.shadeSpr.scale.y = 1, this.arrowSpr.scale.y = 1, this.leftBar.body.x = 0, this.rightBar.body.x = 0, this.PrevlightPos = 0, this.lightPos = 0, this.arrowScaleVert = 0, this.scaledDone = !1, this.arrowDirection = -1, this.shadeScaleFact = 0, this.midLine.body.setRectangle(this.midLine.width, this.midLine.height, 0, 0), this.midLine.body.y = 0, alivenow.Global.movingToTarget = !1, alivenow.Global.baseLineActivated = !1, alivenow.Global.sideBarActivated = !1, alivenow.Global.isTopToEnable = !1, alivenow.Global.topEnabled = !1, alivenow.Global.goalChecked = !1, alivenow.Global.goalHitOnTarget = !1, this.light1.alpha = 0, this.light2.alpha = 0, this.light3.alpha = 0, this.lightenArrow(), this.moveArrowVertically())
    }, t.prototype.initiatePhysics = function() {
        this.game.physics.startSystem(Phaser.Physics.BOX2D), console.log(this.game.physics.box2d), this.game.physics.box2d.gravity.y = 500, this.game.physics.box2d.restitution = .6, this.game.physics.box2d.frameRate = .04, this.game.physics.box2d.friction = .2
    }, t.prototype.lightenArrow = function() {
        switch (t.obj.lightPos < 3 ? t.obj.lightPos++ : t.obj.lightPos = 1, t.obj.lightPos > 1 ? t.obj.PrevlightPos = t.obj.lightPos - 1 : t.obj.PrevlightPos = 3, t.obj.lightPos) {
            case 1:
                t.obj.newLight = t.obj.light1, t.obj.oldLight = t.obj.light3;
                break;
            case 2:
                t.obj.newLight = t.obj.light2, t.obj.oldLight = t.obj.light1;
                break;
            case 3:
                t.obj.newLight = t.obj.light3, t.obj.oldLight = t.obj.light2
        }
        t.obj.Twn1 = new Phaser.Tween(t.obj.newLight, t.obj.game, t.obj.game.tweens), t.obj.Twn1.onComplete.add(t.obj.lightenArrow, t.obj), t.obj.Twn1.to({
            alpha: 1
        }, 200, Phaser.Easing.Linear.None), t.obj.Twn2 = new Phaser.Tween(t.obj.oldLight, t.obj.game, t.obj.game.tweens), t.obj.Twn2.to({
            alpha: 0
        }, 180, Phaser.Easing.Linear.None), t.obj.Twn1.start(), t.obj.Twn2.start()
    }, t.prototype.moveArrowVertically = function() {
        alivenow.Global.gameStart && (this.arrowDirection = -1 * this.arrowDirection, 1.25 * this.arrowDirection < 0 ? this.arrowScaleVert = 1 : this.arrowScaleVert = 1.25 * this.arrowDirection, this.vertTwn = new Phaser.Tween(this.arrowSpr.scale, this.game, this.game.tweens), this.vertTwn.onComplete.addOnce(this.moveArrowVertically, this), this.vertTwn.to({
            y: 1 * this.arrowScaleVert
        }, 900, Phaser.Easing.Linear.None), this.vertTwn.start(), this.shadeTwn = new Phaser.Tween(this.shadeSpr, this.game, this.game.tweens), this.shadeTwn.to({
            angle: 12 * this.arrowDirection
        }, 900, Phaser.Easing.Linear.None), this.shadeTwn.start())
    }, t.prototype.removeMidBar = function() {
        this.baseLine.body.y = 412, this.rightBar.body.y = this.leftBar.body.y = 357, this.rightBar.body.x = 545, this.leftBar.body.x = 223.5, alivenow.Global.goalHitOnTarget || (alivenow.Global.goalHitOnTarget = !0, this.checkCollisionOnTarget(), this.ballSpr.body.velocity.y = 25 * -this.ballSpr.body.mass, this.ballSpr.body.velocity.x = this.ballSpr.body.velocity.x / 2)
    }, t.prototype.showCeleb = function(t) {
        alivenow.Global.goalChecked || (alivenow.Global.goalChecked = !0, "goal" == t ? this.celebItem = this.goalCeleb : "miss" == t ? (alivenow.Global.missCount++, this.missSound.play(), this.celebItem = this.missCeleb) : (alivenow.Global.missCount++, this.missSound.play(), this.celebItem = this.missCeleb), this.celebItem.alpha = 0, this.celebItem.scale.set(.3, .3), this.goalTwn = new Phaser.Tween(this.celebItem.scale, this.game, this.game.tweens), this.goalTwn.to({
            x: 1,
            y: 1
        }, 500, Phaser.Easing.Back.Out), this.goalTwn.start(), this.goalTwn2 = new Phaser.Tween(this.celebItem, this.game, this.game.tweens), this.goalTwn2.to({
            alpha: 1
        }, 500, Phaser.Easing.Back.Out), this.goalTwn2.onComplete.add(this.hideGoalCeleb, this), this.goalTwn2.start())
    }, t.prototype.hideGoalCeleb = function() {
        this.hideGoal = new Phaser.Tween(this.celebItem.scale, this.game, this.game.tweens), this.hideGoal.to({
            x: 0,
            y: 0
        }, 100, Phaser.Easing.Linear.None, !0, 100), this.hideGoal.onComplete.add(this.resetGameState, this)
    }, t.prototype.moveArrowHorizontally = function() {
        alivenow.Global.gameStart && (this.arrowLine.world.y >= 300 ? (this.midLine.body.y = this.arrowLine.world.y, this.topBar.body.y = 300) : this.midLine.body.y = 0, this.arrowDirection = 1, this.vertTwn.pause(), this.shadeTwn.pause(), this.ballSpr.events.onInputDown.addOnce(this.initiateSpeedArrow, this), this.moveArrow())
    }, t.prototype.moveArrow = function() {
        alivenow.Global.gameStart && (this.arrowDirection = -1 * this.arrowDirection, this.horiTwn = new Phaser.Tween(this.arrowSpr, this.game, this.game.tweens), this.horiTwn.onComplete.addOnce(this.moveArrow, this), this.horiTwn.to({
            angle: 40 * this.arrowDirection
        }, 914, Phaser.Easing.Linear.None), this.horiTwn.start(), this.horiTwn2 = new Phaser.Tween(this.shadeSpr, this.game, this.game.tweens), this.horiTwn2.to({
            angle: 40 * this.arrowDirection
        }, 914, Phaser.Easing.Linear.None), this.horiTwn2.start(), this.shadeScaleFact = 1 == this.shadeScaleFact ? 0 : 1, this.horiTwn3 = new Phaser.Tween(this.shadeSpr.scale, this.game, this.game.tweens), this.horiTwn3.to({
            y: 1 - .35 * this.shadeScaleFact
        }, 914, Phaser.Easing.Linear.None), this.horiTwn3.start())
    }, t.prototype.initiateSpeedArrow = function() {
        this.horizontalForce = this.arrowSpr.angle, this.horiTwn.pause(), this.horiTwn2.pause(), this.horiTwn3.pause(), this.speedDirection = 1, this.indicator.visible = !0, this.moveIndicator(), this.ballSpr.events.onInputDown.addOnce(this.activateBall, this)
    }, t.prototype.moveIndicator = function() {
        alivenow.Global.gameStart && (this.speedDirection = -1 * this.speedDirection, this.speedFactor = 122 + 122 * this.speedDirection, this.speedTwn = new Phaser.Tween(this.indicatorStop, this.game, this.game.tweens), this.speedTwn.to({
            y: this.speedFactor
        }, 750, Phaser.Easing.Linear.None), this.speedTwn.onComplete.addOnce(this.moveIndicator, this), this.speedTwn.start())
    }, t.prototype.activateBall = function() {
        alivenow.Global.gameStart && (this.speedTwn.pause(), this.indicator.visible = !1, this.ballSpr.body["static"] = !1, this.Twn1.pause(), this.Twn2.pause(), this.shadeSpr.visible = !1, this.arrowSpr.visible = !1, this.extraSpeedVert = 100 - 100 * this.indicatorStop.y / 244, this.extraSpeedHor = 5 - 5 * this.indicatorStop.y / 244, this.verticalForce = 1.8 * (390 + this.extraSpeedVert), this.horizontalForce = this.horizontalForce * (8 + this.extraSpeedHor), this.ballSpr.body.velocity.y = -this.verticalForce, this.ballSpr.body.velocity.x = this.horizontalForce, alivenow.Global.movingToTarget = !0)
    }, t.prototype.update = function() {
        alivenow.Global.gameRunning && (this.scaledDone || (alivenow.Global.movingToTarget ? (Math.floor(this.ballSpr.y - 380) < 0 && (alivenow.Global.movingToTarget = !1), this.ballScale = 1 - Math.abs(this.ballSpr.y - 790) / 500, this.ballSpr.scale.set(this.ballScale, this.ballScale)) : alivenow.Global.baseLineActivated || this.ballSpr.scale.set(this.ballSpr.y / 810, this.ballSpr.y / 810)), this.ballSpr.body.setCircle(this.ballSpr.width / 2, 0, 0), this.ballSpr.y + this.ballSpr.height < 412 && !alivenow.Global.baseLineActivated && (alivenow.Global.baseLineActivated = !0, this.baseLine.body.y = 412, alivenow.Global.sideBarActivated = !0, this.midLine.body.y > 300 || (alivenow.Global.isTopToEnable = !0), this.rightBar.body.y = this.leftBar.body.y = 357, this.rightBar.body.x = 545, this.leftBar.body.x = 223.5), this.ballSpr.y + this.ballSpr.height < 300 && alivenow.Global.isTopToEnable && !alivenow.Global.topEnabled && (alivenow.Global.topEnabled = !0, this.topBar.body.y = 300), alivenow.Global.gameStart && (alivenow.Global.elapsedTime += 16.5, alivenow.Global.second = Math.floor(alivenow.Global.elapsedTime / 1e3 % 60), this.gameTime.text != 60 - alivenow.Global.second && alivenow.Global.second >= 56 && (this.timeWarning.visible = !0, this.showTimeupWarning(), console.log(alivenow.Global.second + " : seconds"), alivenow.Global.second > 58 && this.onGameFinish()), 60 - alivenow.Global.second >= 0 && (this.gameTime.text = 60 - alivenow.Global.second)))
    }, t.prototype.showTimeupWarning = function() {
        if (this.warnTwn2 = new Phaser.Tween(this.timeWarning, this.game, this.game.tweens), this.warnTwn2.to({
                y: this.timeWarning.y - 122
            }, 200, Phaser.Easing.Cubic.Out), this.warnTwn2.start(), -338 == this.timeWarning.y) {
            for (var t in this.game.tweens._tweens) this.game.tweens._tweens[t].stop();
            this.ballSpr.events.onInputDown.removeAll(), this.indicator.visible = !1, this.visaLogoGr.x = 0
        }
    }, t.prototype.onGameFinish = function() {
        alivenow.Global.gameStart = !1, this.missCeleb.alpha = 0, this.goalCeleb.alpha = 0, t.obj.scoreBG.visible = !0, setTimeout(function() {
            t.obj.scoreTwn = new Phaser.Tween(t.obj.scoreBG, t.obj.game, t.obj.game.tweens), t.obj.scoreTwn.to({
                alpha: 1,
                y: (1100 - t.obj.scoreBG.height) / 2
            }, 350, Phaser.Easing.Back.Out), t.obj.scoreTwn.start()
        }, 500), alivenow.Global.goalCount < 10 ? this.finalScore.text = "0" + String(alivenow.Global.goalCount) : this.finalScore.text = alivenow.Global.goalCount, this.finalScore.x = (this.scoreBG.width - this.finalScore.width / 1.2) / 2
    }, t.prototype.checkCollisionOnTarget = function() {
        this.targetRect = this.targetSpr.getBounds(), this.targetRect.contains(this.ballSpr.x, this.ballSpr.y) && (alivenow.Global.gotBonus = !0, this.hitTwn = new Phaser.Tween(this.targetSpr, this.game, this.game.tweens), this.hitTwn.to({
            alpha: 0
        }, 200, Phaser.Easing.Linear.None), this.hitTwn.start(), this.showScore("bonus"))
    }, t.prototype.setTarget = function() {
        this.targetSpr.alpha = 1, this.targetSpr.x = this.randomRange(250, 510), this.targetSpr.y = this.randomRange(330, 385)
    }, t.prototype.randomRange = function(t, i) {
        return Math.floor(Math.random() * (i - t + 1)) + t
    }, t.prototype.checkIfGoal = function() {
        alivenow.Global.goalChecked || (this.ballSpr.x >= this.goalPost.x && this.ballSpr.x <= this.goalPost.x + this.goalPost.width ? (this.showCeleb("goal"), alivenow.Global.gotBonus || this.showScore("score")) : this.showCeleb("miss"))
    }, t.prototype.showScore = function(i) {
        this.goalSound.play(), alivenow.Global.successCount++, "score" == i ? (alivenow.Global.goalCount += 1, this.scoreItem = this.score) : "bonus" == i && (alivenow.Global.bonusCount++, this.bonusSound.play(), alivenow.Global.goalCount += 5, this.scoreItem = this.bonus), this.goalText.text = alivenow.Global.goalCount < 10 ? "0" + alivenow.Global.goalCount : alivenow.Global.goalCount, this.bonusTwn1 = new Phaser.Tween(this.scoreItem, this.game, this.game.tweens), this.bonusTwn1.to({
            y: 30
        }, 200, Phaser.Easing.Linear.None), this.bonusTwn1.onComplete.add(function() {
            t.obj.scoreItem.y = 30, t.obj.bonusTwn2.start()
        }), this.bonusTwn1.start(), this.bonusTwn2 = new Phaser.Tween(this.scoreItem, this.game, this.game.tweens), this.bonusTwn2.to({
            y: -50
        }, 200, Phaser.Easing.Linear.None, !1, 1e3)
    }, t
}(alivenow.Game);
var alivenow = alivenow || {};
alivenow.Global = {
    URL_TSHARE_WEB: "https://twitter.com/intent/tweet?url=http://bit.ly/2rcqnsD",
    URL_FSHARE_WEB: "https://www.facebook.com/sharer/sharer.php?u=http://bit.ly/2rcqnsD&t=",
    game: null,
    _device: "",
    _os: "",
    formSent: !1,
    skipRotationHandle: !1,
    U_ID: "",
    name: "",
    email: "",
    contact: "",
    gameKey: "",
    URL_DATA: "./data.php",
    URL_CREATE: "./create.php",
    URL_VUPDATE: "./valueUpdator.php",
    gamePaused: !0,
    gameObj: null,
    prevTab: null,
    currTab: null,
    thumbnailPath: "",
    introShown: !1,
    isTopToEnable: !1,
    topEnabled: !1,
    foamSet: !1,
    movingToTarget: !1,
    gameTry: 0,
    appBitly: "",
    baseLineActivated: !1,
    sideBarActivated: !1,
    goalChecked: !1,
    goalHitOnTarget: !1,
    gotBonus: !1,
    goalCount: 0,
    gameStart: !1,
    elapsedTime: 0,
    gameRunning: !1,
    successCount: 0,
    missCount: 0,
    bonusCount: 0
};
var alivenow = alivenow || {};
alivenow.ImageLoader = function() {
    function t() {}
    return t.prototype.init = function() {
        alivenow.Global.game = this, this.game.load.onFileComplete.add(this.progress, this), this.animGr = this.add.group(), this.g = this.add.graphics(0, 0), this.setPercentage(0)
    }, t.prototype.progress = function(t) {
        this.setPercentage(t)
    }, t.prototype.setPercentage = function(t) {
        var i = t / 100 * 410;
        this.g.clear(), this.g.lineStyle(5, 0, .1), this.g.drawRect(180, 850, 410, 5), this.g.beginFill(16777215, 1), this.g.lineStyle(1, 16777215, .1), this.g.drawRect(180, 850, i, 5), this.g.endFill()
    }, t.prototype.preload = function() {
        this.game.load.image("goalBar", "assets/goalBar.png?v=1.1"), this.game.load.image("timeBar", "assets/timeBar.png?v=1.1"), this.game.load.image("verticalBar", "assets/verticalBar.png?v=1.0"), this.game.load.image("Marker", "assets/Marker.png?v=1.2"), this.game.load.image("Time", "assets/Time.png?v=1.0"), this.game.load.image("football", "assets/football.png?v=1.0"), this.game.load.image("ballSmall", "assets/ballSmall.png?v=1.1"), this.game.load.image("GameBG", "assets/GameBG.jpg?v=1.4"), this.game.load.image("FormBG", "assets/formBG.jpg?v=1.3"), this.game.load.image("Goal", "assets/Goal.png?v=1.0"), this.game.load.image("Goalpost", "assets/Goalpost.png?v=1.0"), this.game.load.image("arrow", "assets/arrow.png?v=1.0"), this.game.load.image("arrowShade", "assets/arrowShade.png?v=1.0"), this.game.load.image("light1", "assets/light1.png?v=1.1"), this.game.load.image("light2", "assets/light2.png?v=1.1"), this.game.load.image("light3", "assets/light3.png?v=1.1"), this.game.load.image("backLight1", "assets/backLight1.png?v=1.1"), this.game.load.image("backLight2", "assets/backLight2.png?v=1.1"), this.game.load.image("backLight3", "assets/backLight3.png?v=1.1"), this.game.load.image("indicator", "assets/indicator.png?v=1.1"), this.game.load.image("indicatorStop", "assets/indicatorStop.png?v=1.1"), this.game.load.image("courtMidLine", "assets/courtMidLine.png?v=1.2"), this.game.load.image("arrowLine", "assets/arrowLine.png?v=1.3"), this.game.load.image("goalCeleb", "assets/goalCeleb.png?v=1.5"), this.game.load.image("missCeleb", "assets/missCeleb.png?v=1.5"), this.game.load.image("ballShade", "assets/ballShade.png?v=1.1"), this.game.load.image("score", "assets/score.png?v=1.3"), this.game.load.image("bonus", "assets/bonus.png?v=1.3"), this.game.load.image("Visa", "assets/Visa.png?v=1.3"), this.game.load.image("countdown", "assets/countdown.png?v=1.001"), this.game.load.image("introScr", "assets/introScr.png?v=1.003"), this.game.load.image("scoreBG", "assets/scoreBG.png?v=1.003"), this.game.load.atlasXML("buttons", "./assets/buttons.png?v=1.4", "./assets/buttons.xml?v=1.4"), this.game.load.image("finalScr", "assets/finalScr.png?v=1.3"), this.game.load.bitmapFont("fifaFont", "./assets/fifaFont.png?v=1.0.3", "./assets/fifaFont.xml?v=1.0.3"), this.game.load.audio("BGSound", "./assets/BGSound1.mp3"), this.game.load.audio("goalSound", "./assets/goalSound.mp3"), this.game.load.audio("missSound", "./assets/missSound.mp3"), this.game.load.audio("bonusSound", "./assets/bonusSound.mp3")
    }, t.prototype.create = function() {
        this.game.state.start("Game")
    }, t
}();
var alivenow = alivenow || {};
! function() {
    alivenow.Main = function() {
        function t() {}
        return t.prototype.init = function() {
            var t = new Phaser.Game(768, 1100, Phaser.CANVAS, "", {
                create: this.create,
                preload: this.preload2,
                rotateMe: this.rotateMe
            }, !0);
            t.state.add("ILoader", alivenow.ImageLoader), t.state.add("SLoader", alivenow.SoundLoader), t.state.add("FLoader", alivenow.FontLoader), t.state.add("Game", alivenow.Game), t.state.add("Final", alivenow.Final)
        }, t.prototype.rr = function() {}, t.prototype.preload2 = function() {
            alivenow.Global.game = this.game, alivenow.Global.rotateHandler = this.rotateMe, this.game.load.onFileComplete.add(t.prototype.rr, this), this.g = this.add.graphics(0, 0), this.g.clear(), this.g.lineStyle(5, 0, .1), this.g.drawRect(180, 850, 410, 5), this.g.beginFill(16777215, 1), this.g.lineStyle(1, 16777215, .1), this.g.drawRect(180, 850, 0, 5), this.g.endFill()
        }, t.prototype.create = function() {
            t.obj = this, this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL, this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL, this.scale.compatibility.orientationFallback = "viewport", this.scale.pageAlignHorizontally = !0, this.scale.pageAlignVertically = !0, this.game.time.advancedTiming = !0, this.game.scale.fullScreenTarget = document.body, t.obj.game.state.start("ILoader")
        }, t
    }();
    var t = new alivenow.Main;
    t.init()
}();