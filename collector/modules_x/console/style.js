"use strict";
exports.__esModule = true;
var execSync = require("child_process").execSync;
var ConsoleStyle = /** @class */ (function () {
    function ConsoleStyle() {
        //типизирует переменную для взаимодействия объектов класса с переменными
        this.x_actions = { reset: "\x1b[0m", boldOn: '\x1b[1m', boldOff: '\x1b[22m' };
        this.x_colors = { black: '\x1b[30m', red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[32m', blue: '\x1b[34m', pink: '\x1b[35m', cyan: '\x1b[36m', white: '\x1b[37m' };
        this.x_bgs = { black: '\x1b[40m', red: '\x1b[41m', green: '\x1b[42m', yellow: '\x1b[43m', blue: '\x1b[44m', pink: '\x1b[45m', cyan: '\x1b[46m', grey: '\x1b[47m' };
        this.console_stream_out = "";
        this.create_console_current_style();
    }
    ConsoleStyle.prototype.create_console_current_style = function () {
        this.console_current_style = {
            isBold: false,
            textColor: this.x_colors.black,
            bgColor: null
        };
    };
    ConsoleStyle.prototype.TextColor = function (color) {
        this.console_current_style.textColor = this.x_colors[color];
        return this;
    };
    ConsoleStyle.prototype.BgColor = function (color) {
        this.console_current_style.bgColor = this.x_bgs[color];
        return this;
    };
    ConsoleStyle.prototype.Bold = function () {
        this.console_current_style.isBold = true;
        return this;
    };
    ConsoleStyle.prototype.Log = function (text) {
        if (this.console_stream_out.length !== 0)
            this.console_stream_out += " ";
        var bgColor = this.console_current_style.bgColor !== null ? this.console_current_style.bgColor : '';
        var logText = this.console_current_style.textColor + bgColor + text;
        if (this.console_current_style.isBold)
            logText = this.x_actions.boldOn + logText + this.x_actions.boldOff;
        this.console_stream_out += logText;
        return this;
    };
    ConsoleStyle.prototype.Padding = function (shuffle) {
        for (var s = 0; s < shuffle; s++) {
            this.console_stream_out += " ";
        }
        return this;
    };
    ConsoleStyle.prototype.Jump = function () {
        this.ClearStreamOutStyle();
        this.console_stream_out += "\n";
        return this;
    };
    ConsoleStyle.prototype.JumpWithBg = function () {
        this.console_stream_out += "\n";
        return this;
    };
    ConsoleStyle.prototype.ClearStreamOutStyle = function () {
        this.console_stream_out += this.x_actions.reset;
        return;
    };
    ConsoleStyle.prototype.ClearConsoleCurrentStyle = function () {
        this.create_console_current_style();
        return;
    };
    ConsoleStyle.prototype.ClearConsole = function () {
        execSync("tput reset", { stdio: 'inherit' });
    };
    ConsoleStyle.prototype.Out = function () {
        this.ClearStreamOutStyle();
        console.log(this.console_stream_out);
        this.ClearConsoleCurrentStyle();
        this.console_stream_out = "";
    };
    return ConsoleStyle;
}());
var cs = new ConsoleStyle;
exports["default"] = cs;
