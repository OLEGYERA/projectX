"use strict";
exports.__esModule = true;
var events_1 = require("events");
var ConsoleKeyboardControl = /** @class */ (function () {
    function ConsoleKeyboardControl() {
        this._builder();
    }
    ConsoleKeyboardControl.prototype._builder = function () {
    };
    ConsoleKeyboardControl.prototype.KeyListener = function () {
        this.KeyboardEmitter = new events_1.EventEmitter;
    };
    return ConsoleKeyboardControl;
}());
var ckc = new ConsoleKeyboardControl();
exports["default"] = ckc;
