import {ExecException} from "child_process";
import {EventEmitter} from 'events';

type FStdInCallback = (...args: any[]) => void
type FOStream = (data: string) => void
type FIStream = (callback: (enteredData: string | null, error?: string) => void) => void

interface LStreamSettings {
    debug?: boolean, //false
    istream_row_mode?: boolean //false,
}

interface IConsoleIOStream {
    OStream: FOStream;
    IStream: FIStream
}

class ConsoleIOStream implements IConsoleIOStream {
// class ConsoleIOStream{
    private x_istream_callback: FStdInCallback;
    private x_istream_buffer: string;
    private x_istream_emit: EventEmitter;

    protected settings: LStreamSettings = {
        debug: false,
        istream_row_mode: false
    }

    constructor(settings?: LStreamSettings ) {
        if(settings != undefined){
            if(settings.debug !== undefined){
                this.settings.debug =  settings.debug;
            }

            if(settings.istream_row_mode !== undefined){
                this.settings.istream_row_mode =  settings.istream_row_mode;
            }
        }

        this.x_rebuild();
    }


    public OStream(ostream: string): void {
        process.stdout.write(ostream);
    }

    public IStream(callback: (ostream: string | null, error?: string) => void): void {
        this.x_stream_line();

        this.x_istream_emit.once('i_stream_Line', data => {
            this.x_rebuild();
            this.x_eventer(5)
            callback(data)
        });
    }

    protected x_eventer(stream: number): void{
        if(this.settings.debug)
            console.log(process.stdin.listeners('data').length, `${stream}-stream`);
    }


    private x_rebuild(): void{
        //process.stdin.resume();
        this.x_istream_buffer = "";
        this.x_istream_emit = new EventEmitter();
        this.x_istream_callback = null;
        this.x_eventer(4)
    }

    private x_stream_line(): void {
        this.x_eventer(1)
        process.stdin.setRawMode(this.settings.istream_row_mode);
        console.log('>>>')
        this.x_stdin_listener()
    }

    private x_stdin_listener(): void{
        this.x_istream_callback = this.x_stdin_callback.bind(this)
        process.stdin.on('data', this.x_istream_callback)
        this.x_eventer(2)
    }

    private x_stdin_callback<FStdInCallback>(char: any): void{
        this.x_istream_buffer += char;
        let lines = this.x_istream_buffer.split(/[\r\n|\n]/)


        if(typeof lines === 'object' && lines.length > 1){
            process.stdin.removeListener('data', this.x_istream_callback);
            this.x_eventer(3)
            this.x_istream_emit.emit('i_stream_Line', lines[0])
        }
    }
}

export {ConsoleIOStream as io};

let cios: IConsoleIOStream = new ConsoleIOStream();

export default cios;

