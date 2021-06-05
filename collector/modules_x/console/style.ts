import {XAction, XColor, XBg, LActions, LColors, LBgs} from "../../x.types";
const { execSync } = require("child_process");

type XConsoleStyle = {
    isBold: boolean,
    textColor: string,
    bgColor: string
}

class ConsoleStyle{
    //типизирует переменную для взаимодействия объектов класса с переменными
    x_actions: XAction = { reset: "\x1b[0m", boldOn: '\x1b[1m', boldOff: '\x1b[22m'};
    x_colors: XColor = {black: '\x1b[30m', red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[32m', blue: '\x1b[34m', pink: '\x1b[35m', cyan: '\x1b[36m', white: '\x1b[37m'};
    x_bgs: XBg = {black: '\x1b[40m', red: '\x1b[41m', green: '\x1b[42m', yellow: '\x1b[43m', blue: '\x1b[44m', pink: '\x1b[45m', cyan: '\x1b[46m', grey: '\x1b[47m'};

    console_current_style: XConsoleStyle;
    console_stream_out: string = "";

    constructor() {
        this.create_console_current_style()
    }

    create_console_current_style(): void {
        this.console_current_style = {
            isBold: false,
            textColor: this.x_colors.black,
            bgColor: null
        }
    }
    

    TextColor(color: LColors): this {
        this.console_current_style.textColor = this.x_colors[color];
        return this;
    }

    BgColor(color: LBgs): this {
        this.console_current_style.bgColor = this.x_bgs[color];
        return this;
    }

    Bold(): this {
        this.console_current_style.isBold = true;
        return this;
    }
    
    Log(text: string): this {
        if(this.console_stream_out.length !== 0) this.console_stream_out += " ";

        const bgColor = this.console_current_style.bgColor !== null ? this.console_current_style.bgColor : '';
        let logText = this.console_current_style.textColor + bgColor + text;

        if(this.console_current_style.isBold) logText = this.x_actions.boldOn + logText + this.x_actions.boldOff;

        this.console_stream_out += logText;
        return this;
    }

    Padding(shuffle?: number): this {
        for (var s = 0; s < shuffle; s++){
            this.console_stream_out += " ";
        }
        return this;
    }

    Jump(): this {
        this.ClearStreamOutStyle();
        this.console_stream_out += "\n";
        return this;
    }

    JumpWithBg(): this {
        this.console_stream_out += "\n";
        return this;
    }
    
    ClearStreamOutStyle(): this {
        this.console_stream_out += this.x_actions.reset;
        return;
    }

    ClearConsoleCurrentStyle(): this {
        this.create_console_current_style();
        return;
    }

    ClearConsole(): void {
        execSync("tput reset", {stdio: 'inherit'});
    }

    Out(): void {
        this.ClearStreamOutStyle();
        console.log(this.console_stream_out);
        this.ClearConsoleCurrentStyle();
        this.console_stream_out = "";
    }

}

let cs = new ConsoleStyle;

export default cs;