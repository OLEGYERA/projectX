class XLog{
    x_actions = {
        reset: '\x1b[0m',
        boldOn: '\x1b[1m',
        boldOff: '\x1b[22m',
    };

    x_colors = {
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[32m',
        blue: '\x1b[34m',
        pink: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m'
    };

    x_bgs = {
        black: '\x1b[40m',
        red: '\x1b[41m',
        green: '\x1b[42m',
        yellow: '\x1b[43m',
        blue: '\x1b[44m',
        pink: '\x1b[45m',
        cyan: '\x1b[46m',
        grey: '\x1b[47m'
    };

    x_builder = {};

    x_log = '';

    constructor() {
        this._init_x_builder();
    }

    _init_x_builder() {
        this.x_builder = {
            color: this.x_colors.black,
            bg: '',
            bold: false
        }
    }

    color(colorName = 'black'){
        try {
            let findStatus = this.x_colors[colorName];
            if(findStatus === undefined) throw Error('There is no color with this name!');
            this.x_builder.color = findStatus;
        } catch (e){
            console.log(e)
            return false;
        }

        return this;
    }

    bg(bgName = ''){
        try {
            let findStatus = (bgName === '') ? bgName : this.x_bgs[bgName];
            if(findStatus === undefined) throw Error('Background with this name does not exist!');
            this.x_builder.bg = findStatus;
        } catch (e){
            console.log(e)
            return false;
        }

        return this;
    }

    isBold(){
        this.x_builder.bold = true;
        return this;
    }

    in(logData){
        let logStringOptions = this.x_builder.bg + this.x_builder.color;
        if(this.x_builder.bold) logStringOptions += this.x_actions.boldOn;
        this.x_log += logStringOptions + logData;
        if(this.x_builder.bold) this.x_log += this.x_actions.boldOff;

        return this;
    }

    clear(){
        this.x_log += this.x_actions.reset;
        this._init_x_builder();
        return this;
    }

    out(){
        try {
            if(!this.x_log.length) throw Error('Nothing to output!')
            console.log(this.x_log);
            this.x_log = '';
        } catch (e){
            console.log(e)
        }

    }
}



export default new XLog;
