import style from "../style";
import {EventEmitter} from 'events';

interface Keyboard{

    KeyListener(): void;
}

interface KeyboardEmitter extends EventEmitter{

}

class ConsoleKeyboardControl{
    private KeyboardEmitter: KeyboardEmitter

    constructor() {
        this._spawn();
    }


    private _spawn(){

    }

    public KeyListener(): void{
        this.KeyboardEmitter = new EventEmitter;

    }




}


let ckc: Keyboard = new ConsoleKeyboardControl();

export default ckc;