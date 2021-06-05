"use strict";
exports.__esModule = true;
var XlogIo = /** @class */ (function () {
    function XlogIo() {
        this.x_stream = [];
    }
    //Input X_Stream
    XlogIo.prototype.input = function (input) {
        var childItem = null;
        switch (typeof input) {
            case "number":
                this.x_stream.push(this.inputNumber(input));
                break;
        }
        return this;
    };
    XlogIo.prototype.inputNumber = function (input) {
        return {
            item: String(input),
            type: "Number",
            childItem: null
        };
    };
    //Output X_Stream
    XlogIo.prototype.output = function () {
        for (var i = 0; i < this.x_stream.length; i++) {
            var stream_item = this.x_stream[i];
            if (stream_item.childItem == null) {
                switch (stream_item.type) {
                    case "Number":
                        this.outputNumber(stream_item.item, true);
                        break;
                }
            }
        }
    };
    XlogIo.prototype.outputNumber = function (data, withType) {
        if (withType === void 0) { withType = false; }
        try {
            if (withType) {
                console.log("Number: " + data);
            }
            else {
                console.log(data);
            }
        }
        catch (e) {
            console.log(e);
            return true;
        }
        return true;
    };
    return XlogIo;
}());
exports["default"] = new XlogIo;
