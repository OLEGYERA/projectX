
///////DISW

const KEYPRESS_DECODER = Symbol('keypress-decoder');
const ESCAPE_DECODER = Symbol('escape-decoder');
const {StringDecoder} = require('string_decoder');
const kUTF16SurrogateThreshold = 0x10000; // 2 ** 16


function charLengthAt(str, i) {
    if (str.length <= i) {
        // Pretend to move to the right. This is necessary to autocomplete while
        // moving to the right.
        return 1;
    }
    return str.codePointAt(i) >= kUTF16SurrogateThreshold ? 2 : 1;
}

function* emitKeys(stream) {
    while (true) {
        let ch = yield;
        let s = ch;
        let escaped = false;
        let key = {
            sequence: null,
            name: undefined,
            ctrl: false,
            meta: false,
            shift: false,
            code: undefined
        };

        if (ch === kEscape) {
            escaped = true;
            s += (ch = yield);

            if (ch === kEscape) {
                s += (ch = yield);
            }
        }

        if (escaped && (ch === 'O' || ch === '[')) {
            // ANSI escape sequence
            let code = ch;
            let modifier = 0;

            if (ch === 'O') {
                // ESC O letter
                // ESC O modifier letter
                s += (ch = yield);

                if (ch >= '0' && ch <= '9') {
                    modifier = (ch >> 0) - 1;
                    s += (ch = yield);
                }

                code += ch;
            } else if (ch === '[') {
                // ESC [ letter
                // ESC [ modifier letter
                // ESC [ [ modifier letter
                // ESC [ [ num char
                s += (ch = yield);

                if (ch === '[') {
                    // \x1b[[A
                    //      ^--- escape codes might have a second bracket
                    code += ch;
                    s += (ch = yield);
                }

                /*
                 * Here and later we try to buffer just enough data to get
                 * a complete ascii sequence.
                 *
                 * We have basically two classes of ascii characters to process:
                 *
                 *
                 * 1. `\x1b[24;5~` should be parsed as { code: '[24~', modifier: 5 }
                 *
                 * This particular example is featuring Ctrl+F12 in xterm.
                 *
                 *  - `;5` part is optional, e.g. it could be `\x1b[24~`
                 *  - first part can contain one or two digits
                 *
                 * So the generic regexp is like /^\d\d?(;\d)?[~^$]$/
                 *
                 *
                 * 2. `\x1b[1;5H` should be parsed as { code: '[H', modifier: 5 }
                 *
                 * This particular example is featuring Ctrl+Home in xterm.
                 *
                 *  - `1;5` part is optional, e.g. it could be `\x1b[H`
                 *  - `1;` part is optional, e.g. it could be `\x1b[5H`
                 *
                 * So the generic regexp is like /^((\d;)?\d)?[A-Za-z]$/
                 *
                 */
                const cmdStart = s.length - 1;

                // Skip one or two leading digits
                if (ch >= '0' && ch <= '9') {
                    s += (ch = yield);

                    if (ch >= '0' && ch <= '9') {
                        s += (ch = yield);
                    }
                }

                // skip modifier
                if (ch === ';') {
                    s += (ch = yield);

                    if (ch >= '0' && ch <= '9') {
                        s += yield;
                    }
                }

                /*
                 * We buffered enough data, now trying to extract code
                 * and modifier from it
                 */
                const cmd = s.slice(cmdStart);
                let match;

                if ((match = cmd.match(/^(\d\d?)(;(\d))?([~^$])$/))) {
                    code += match[1] + match[4];
                    modifier = (match[3] || 1) - 1;
                } else if ((match = cmd.match(/^((\d;)?(\d))?([A-Za-z])$/))) {
                    code += match[4];
                    modifier = (match[3] || 1) - 1;
                } else {
                    code += cmd;
                }
            }

            // Parse the key modifier
            console.log(modifier, 5)
            key.ctrl = !!(modifier & 4);
            key.meta = !!(modifier & 10);
            key.shift = !!(modifier & 1);
            key.code = code;

            // Parse the key itself
            switch (code) {
                /* xterm/gnome ESC [ letter (with modifier) */
                case '[P': key.name = 'f1'; break;
                case '[Q': key.name = 'f2'; break;
                case '[R': key.name = 'f3'; break;
                case '[S': key.name = 'f4'; break;

                /* xterm/gnome ESC O letter (without modifier) */
                case 'OP': key.name = 'f1'; break;
                case 'OQ': key.name = 'f2'; break;
                case 'OR': key.name = 'f3'; break;
                case 'OS': key.name = 'f4'; break;

                /* xterm/rxvt ESC [ number ~ */
                case '[11~': key.name = 'f1'; break;
                case '[12~': key.name = 'f2'; break;
                case '[13~': key.name = 'f3'; break;
                case '[14~': key.name = 'f4'; break;

                /* from Cygwin and used in libuv */
                case '[[A': key.name = 'f1'; break;
                case '[[B': key.name = 'f2'; break;
                case '[[C': key.name = 'f3'; break;
                case '[[D': key.name = 'f4'; break;
                case '[[E': key.name = 'f5'; break;

                /* common */
                case '[15~': key.name = 'f5'; break;
                case '[17~': key.name = 'f6'; break;
                case '[18~': key.name = 'f7'; break;
                case '[19~': key.name = 'f8'; break;
                case '[20~': key.name = 'f9'; break;
                case '[21~': key.name = 'f10'; break;
                case '[23~': key.name = 'f11'; break;
                case '[24~': key.name = 'f12'; break;

                /* xterm ESC [ letter */
                case '[A': key.name = 'up'; break;
                case '[B': key.name = 'down'; break;
                case '[C': key.name = 'right'; break;
                case '[D': key.name = 'left'; break;
                case '[E': key.name = 'clear'; break;
                case '[F': key.name = 'end'; break;
                case '[H': key.name = 'home'; break;

                /* xterm/gnome ESC O letter */
                case 'OA': key.name = 'up'; break;
                case 'OB': key.name = 'down'; break;
                case 'OC': key.name = 'right'; break;
                case 'OD': key.name = 'left'; break;
                case 'OE': key.name = 'clear'; break;
                case 'OF': key.name = 'end'; break;
                case 'OH': key.name = 'home'; break;

                /* xterm/rxvt ESC [ number ~ */
                case '[1~': key.name = 'home'; break;
                case '[2~': key.name = 'insert'; break;
                case '[3~': key.name = 'delete'; break;
                case '[4~': key.name = 'end'; break;
                case '[5~': key.name = 'pageup'; break;
                case '[6~': key.name = 'pagedown'; break;

                /* putty */
                case '[[5~': key.name = 'pageup'; break;
                case '[[6~': key.name = 'pagedown'; break;

                /* rxvt */
                case '[7~': key.name = 'home'; break;
                case '[8~': key.name = 'end'; break;

                /* rxvt keys with modifiers */
                case '[a': key.name = 'up'; key.shift = true; break;
                case '[b': key.name = 'down'; key.shift = true; break;
                case '[c': key.name = 'right'; key.shift = true; break;
                case '[d': key.name = 'left'; key.shift = true; break;
                case '[e': key.name = 'clear'; key.shift = true; break;

                case '[2$': key.name = 'insert'; key.shift = true; break;
                case '[3$': key.name = 'delete'; key.shift = true; break;
                case '[5$': key.name = 'pageup'; key.shift = true; break;
                case '[6$': key.name = 'pagedown'; key.shift = true; break;
                case '[7$': key.name = 'home'; key.shift = true; break;
                case '[8$': key.name = 'end'; key.shift = true; break;

                case 'Oa': key.name = 'up'; key.ctrl = true; break;
                case 'Ob': key.name = 'down'; key.ctrl = true; break;
                case 'Oc': key.name = 'right'; key.ctrl = true; break;
                case 'Od': key.name = 'left'; key.ctrl = true; break;
                case 'Oe': key.name = 'clear'; key.ctrl = true; break;

                case '[2^': key.name = 'insert'; key.ctrl = true; break;
                case '[3^': key.name = 'delete'; key.ctrl = true; break;
                case '[5^': key.name = 'pageup'; key.ctrl = true; break;
                case '[6^': key.name = 'pagedown'; key.ctrl = true; break;
                case '[7^': key.name = 'home'; key.ctrl = true; break;
                case '[8^': key.name = 'end'; key.ctrl = true; break;

                /* misc. */
                case '[Z': key.name = 'tab'; key.shift = true; break;
                default: key.name = 'undefined'; break;
            }
        } else if (ch === '\r') {
            // carriage return
            key.name = 'return';
            key.meta = escaped;
        } else if (ch === '\n') {
            // Enter, should have been called linefeed
            key.name = 'enter';
            key.meta = escaped;
        } else if (ch === '\t') {
            // tab
            key.name = 'tab';
            key.meta = escaped;
        } else if (ch === '\b' || ch === '\x7f') {
            // backspace or ctrl+h
            key.name = 'backspace';
            key.meta = escaped;
        } else if (ch === kEscape) {
            // escape key
            key.name = 'escape';
            key.meta = escaped;
        } else if (ch === ' ') {
            key.name = 'space';
            key.meta = escaped;
        } else if (!escaped && ch <= '\x1a') {
            // ctrl+letter
            key.name = String.fromCharCode(ch.charCodeAt(0) + 'a'.charCodeAt(0) - 1);
            key.ctrl = true;
        } else if (/^[0-9A-Za-z]$/.test(ch)) {
            // Letter, number, shift+letter
            key.name = ch.toLowerCase();
            key.shift = /^[A-Z]$/.test(ch);
            key.meta = escaped;
        } else if (escaped) {
            // Escape sequence timeout
            key.name = ch.length ? undefined : 'escape';
            key.meta = true;
        }

        key.sequence = s;

        if (s.length !== 0 && (key.name !== undefined || escaped)) {
            /* Named character or sequence */
            stream.emit('keypress', escaped ? undefined : s, key);
        } else if (charLengthAt(s, 0) === s.length) {
            /* Single unnamed character, e.g. "." */
            stream.emit('keypress', s, key);
        }
        /* Unrecognized or broken escape sequence, don't emit anything */
    }
}


function CSI(strings, ...args) {
    let ret = `${kEscape}[`;
    for (let n = 0; n < strings.length; n++) {
        ret += strings[n];
        if (n < args.length)
            ret += args[n];
    }
    return ret;
}

CSI.kEscape = '\x1b';
CSI.kClearToLineBeginning = CSI`1K`;
CSI.kClearToLineEnd = CSI`0K`;
CSI.kClearLine = CSI`2K`;
CSI.kClearScreenDown = CSI`0J`;

const {
    kEscape,
    kClearToLineBeginning,
    kClearToLineEnd,
    kClearLine,
    kClearScreenDown
} = CSI;

const ESCAPE_CODE_TIMEOUT = 500;

type ect = { number: any };


function emitKeypressEvents(stream, iface = {}) {
    if (stream[KEYPRESS_DECODER]) return;

    stream[KEYPRESS_DECODER] = new StringDecoder('utf8');

    stream[ESCAPE_DECODER] = emitKeys(stream);
    stream[ESCAPE_DECODER].next();

    const triggerEscape = () => stream[ESCAPE_DECODER].next('');
    // const { escapeCodeTimeout = ESCAPE_CODE_TIMEOUT }: ect = iface;
    let timeoutId;

    function onData(input) {
        if (stream.listenerCount('keypress') > 0) {
            const string = stream[KEYPRESS_DECODER].write(input);
            if (string) {
                clearTimeout(timeoutId);

                // This supports characters of length 2.
                // iface._sawKeyPress = charLengthAt(string, 0) === string.length;
                // iface.isCompletionEnabled = false;

                let length = 0;
                for (const character of string) {
                    length += character.length;
                    if (length === string.length) {
                        // iface.isCompletionEnabled = true;
                    }

                    try {
                        stream[ESCAPE_DECODER].next(character);
                        // Escape letter at the tail position
                        if (length === string.length && character === kEscape) {
                            timeoutId = setTimeout(triggerEscape, ESCAPE_CODE_TIMEOUT);
                        }
                    } catch (err) {
                        // If the generator throws (it could happen in the `keypress`
                        // event), we need to restart it.
                        stream[ESCAPE_DECODER] = emitKeys(stream);
                        stream[ESCAPE_DECODER].next();
                        throw err;
                    }
                }
            }
        } else {
            // Nobody's watching anyway
            stream.removeListener('data', onData);
            stream.on('newListener', onNewListener);
        }
    }

    function onNewListener(event) {
        if (event === 'keypress') {
            stream.on('data', onData);
            stream.removeListener('newListener', onNewListener);
        }
    }

    if (stream.listenerCount('keypress') > 0) {
        stream.on('data', onData);
    } else {
        stream.on('newListener', onNewListener);
    }
}


// console.log(readline.emitKeypressEvents.toString())
emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
        console.log('new start')
        emitKeypressEvents(process.stdin);
    } else {
        console.log(`You pressed the "${str}" key`);
        console.log();
        console.log(key);
        console.log();
    }
});
console.log('Press any key...');