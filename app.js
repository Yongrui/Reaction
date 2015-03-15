/**
 * Created by Yongrui on 2015/3/15.
 */

var canvas;
var stage;
var width, height;
var rect;
var text;
var randomTime, beginTime, endTime;

canvas = document.getElementById("gameView");
stage = new createjs.Stage(canvas);

width = canvas.width;
height = canvas.height;

//var rect = new createjs.Shape();
//rect.graphics.beginFill("#00f");
//rect.graphics.drawRect(0, 0, width, height);
//rect.graphics.endFill();
//stage.addChild(rect);
//stage.update();

rect = new Rect(width, height);
stage.addChild(rect);
stage.update();

showStartState();

stage.addEventListener("stagemousedown", handleMouseDown);

function handleMouseDown(event) {
    var state = rect.getState();
    console.log("state: " + state);
    switch (state) {
        case Rect.STATE_START:
            showWaiteState();
            break;
        case Rect.STATE_WAITE:
            showTooSoonState();
            break;
        case Rect.STATE_RESULT:
            showWaiteState();
            break;
        case Rect.STATE_CLICK:
            showResultState();
            break;
        case Rect.STATE_TOOSOON:
            showWaiteState();
            break;
    }
    //stage.update();
}

function showWaiteState() {
    //createjs.Ticker.removeAllEventListeners("tick");
    createjs.Tween.removeTweens(rect);
    setText("请等待");
    rect.setState(Rect.STATE_WAITE);
    randomTime = (Math.floor(Math.random() * 3 + 1) + 3) * 1000;
    console.log("randomTime: ", randomTime);
    //createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Tween.get(rect).wait(randomTime).call(showClickState);
    stage.update();
}

//function handleTick() {
//    if (createjs.Ticker.getTime() >= randomTime) {
//        createjs.Ticker.removeAllEventListeners("tick");
//        showClickState();
//        stage.update();
//    }
//}

function showClickState() {
    setText("快点击");
    rect.setState(Rect.STATE_CLICK);

    beginTime = new Date();
    stage.update();
}

function showResultState() {
    endTime = new Date();
    var time = endTime.getTime() - beginTime.getTime();
    setText("你的反应是" + time + "毫秒！点击重来");
    rect.setState(Rect.STATE_RESULT);
    stage.update();
}

function showTooSoonState() {
    createjs.Tween.removeTweens(rect);
    setText("点太快了");
    //createjs.Ticker.removeAllEventListeners();
    rect.setState(Rect.STATE_TOOSOON);
    stage.update();
}

function showStartState() {
    setText("点击开始");
    rect.setState(Rect.STATE_START);
    stage.update();
}

function setText(textString) {
    stage.removeChild(text);
    text = new createjs.Text(textString, "30px Arial", "#fff");
    text.x = width / 2;
    text.y = height / 2;
    text.textAlign = "center";
    stage.addChild(text);
    stage.update();
}
