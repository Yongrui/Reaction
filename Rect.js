/**
 * Created by Yongrui on 2015/3/15.
 */

function Rect(width, height) {
    createjs.Shape.call(this);

    this._width = width;
    this._height = height;

    this.setState(Rect.STATE_START);
}

Rect.prototype = new createjs.Shape();
Rect.STATE_START = 0;
Rect.STATE_WAITE = 1;
Rect.STATE_RESULT = 2;
Rect.STATE_TOOSOON = 3;
Rect.STATE_CLICK = 4;

Rect.prototype.setColor = function(colorString) {
    this.graphics.clear();
    this.graphics.beginFill(colorString);
    this.graphics.drawRect(0, 0, this._width, this._height);
    this.graphics.endFill();
}

Rect.prototype.setState = function(state) {
    this._state = state;
    switch (this._state) {
        case Rect.STATE_START:
            this.setColor("#00f");
            break;
        case Rect.STATE_WAITE:
            this.setColor("#f60");
            break;
        case Rect.STATE_RESULT:
            this.setColor("#00f");
            break;
        case Rect.STATE_TOOSOON:
            this.setColor("#f00");
            break;
        case Rect.STATE_CLICK:
            this.setColor("#0f0");
            break;
    }
}

Rect.prototype.getState = function() {
    return this._state;
}
