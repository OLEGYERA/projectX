"use strict";
exports.__esModule = true;
exports.io = void 0;
var events_1 = require("events");
var ConsoleIOStream = /** @class */ (function () {
    function ConsoleIOStream(settings) {
        this.settings = {
            debug: false,
            istream_row_mode: false
        };
        if (settings != undefined) {
            if (settings.debug !== undefined) {
                this.settings.debug = settings.debug;
            }
            if (settings.istream_row_mode !== undefined) {
                this.settings.istream_row_mode = settings.istream_row_mode;
            }
        }
        this.x_rebuild();
    }
    ConsoleIOStream.prototype.x_rebuild = function () {
        //process.stdin.resume();
        this.x_istream_buffer = "";
        this.x_istream_emit = new events_1.EventEmitter();
        this.x_istream_callback = null;
        this.x_eventer(4);
    };
    ConsoleIOStream.prototype.OStream = function (ostream) {
        process.stdout.write(ostream);
    };
    ConsoleIOStream.prototype.IStream = function (callback) {
        var _this = this;
        this.x_stream_line();
        this.x_istream_emit.once('i_stream_Line', function (data) {
            _this.x_rebuild();
            _this.x_eventer(5);
            callback(data);
        });
    };
    ConsoleIOStream.prototype.x_stream_line = function () {
        this.x_eventer(1);
        process.stdin.setRawMode(this.settings.istream_row_mode);
        console.log('>>>');
        this.x_stdin_listener();
    };
    ConsoleIOStream.prototype.x_stdin_listener = function () {
        this.x_istream_callback = this.x_stdin_callback.bind(this);
        process.stdin.on('data', this.x_istream_callback);
        this.x_eventer(2);
    };
    ConsoleIOStream.prototype.x_stdin_callback = function (char) {
        // console.log(this, 5, pointer, 6, ConsoleIOStream.x_istream_emit, 7)
        this.x_istream_buffer += char;
        var lines = this.x_istream_buffer.split(/[\r\n|\n]/);
        console.log(lines, typeof lines === 'object' && lines.length >= 1);
        if (typeof lines === 'object' && lines.length > 1) {
            process.stdin.removeListener('data', this.x_istream_callback);
            this.x_eventer(3);
            this.x_istream_emit.emit('i_stream_Line', lines[0]);
        }
    };
    ConsoleIOStream.prototype.x_eventer = function (stream) {
        if (this.settings.debug)
            console.log(process.stdin.listeners('data').length, stream + "-stream");
    };
    return ConsoleIOStream;
}());
exports.io = ConsoleIOStream;
var cios = new ConsoleIOStream();
exports["default"] = cios;
