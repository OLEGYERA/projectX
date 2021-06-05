"use strict";
exports.__esModule = true;
// interface XLogContract {
//     x_actions: any, //типизирует переменные класса, но не влияет на видоизменения переменных в объекте
// }
// class Xlog implements XLogContract{
var Xlog = /** @class */ (function () {
    function Xlog() {
        this.x_actions = {
            reset: "\x1b[0m",
            boldOn: '\x1b[1m',
            boldOff: '\x1b[22m'
        };
        this.x_colors = {
            black: '\x1b[30m',
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[32m',
            blue: '\x1b[34m',
            pink: '\x1b[35m',
            cyan: '\x1b[36m',
            white: '\x1b[37m'
        };
        this.x_bgs = {
            black: '\x1b[40m',
            red: '\x1b[41m',
            green: '\x1b[42m',
            yellow: '\x1b[43m',
            blue: '\x1b[44m',
            pink: '\x1b[45m',
            cyan: '\x1b[46m',
            grey: '\x1b[47m'
        };
    }
    return Xlog;
}());
var log = new Xlog;
console.log(123, log);
exports["default"] = log;
