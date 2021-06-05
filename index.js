"use strict";
exports.__esModule = true;
// process.stdin.setRawMode(true);
process.stdout.write('/bin/zsh');
// const rl = require('readline')
//     .createInterface({
//         input: process.stdin,
//         output: process.stdout
// })
// rl.clearLine(process.stdout, 0)
// rl.question(`What's your name?`, name => {
//         console.log(`Hi ${name}!`)
//         rl.close()
// })
// console.log(123)
// rl.on('line', (input) => {
//         console.log(`Received: ${input}`);
// });
// ||||||||||||||||||||||||||||||
/*process.stdout.write('echo -e "\\033c"\n')

process.stdout.write('OLEG\n')
process.stdout.write('GERASIMENKO\n')
process.stdout.clearLine(0)
process.stdout.cursorTo(0)
process.stdout.write('1\n')
process.stdout.moveCursor(0, -2)
process.stdout.write('w')*/
// process.stdout.clearLine(0)
// const values = ['lorem ipsum', 'dolor sit amet', '123', '456', '789'];
// let curs=0;
//
//
// const showResults = () => {
//         console.log(process.stdin.isPaused(), 15)
//         for (var i = 0; i < values.length; i++){
//                 if(i == curs){
//                         style.TextColor('white').BgColor('black').Log(values[i]).Out();
//                 } else {
//                         style.Log(values[i]).Out();
//                 }
//
//         }
// }
// style.ClearConsole();
// showResults();
//
//
// process.stdin.on('keypress', (c, k) => {
//         switch (k.name){
//                 case 'down':
//                         if(curs >= values.length - 1){
//                                 curs = 0;
//                         } else {
//                                 curs++;
//                         }
//                         break;
//                 case 'up':
//                         if(curs <= 0){
//                                 curs = values.length - 1;
//                         } else {
//                                 curs--;
//                         }
//                         break
//                 case 'return':
//                         process.stdin.pause()
//                         style.TextColor('white').BgColor('black').Log(values[curs]).Out();
//                         break;
//         }
//
//         style.ClearConsole();
//         console.log(curs)
//         showResults();
// });
//
//
// console.log(123);
///////////////////////////////////////
// import {EventEmitter} from 'events';
//
// const stdin = new EventEmitter();
// let buff = "";
//
// console.log('-------', process.stdin.listeners('data').length)
//
// function emitere(data){
//         console.log('>' + data)
//         buff += data;
//         let lines = buff.split(/[\r\n|\n]/);
//         buff = lines.pop();
//         lines.forEach(line => {
//                 stdin.emit('line', line)
//                 process.stdin.pause();
//                 process.stdin.removeListener('data', emitere)
//                 console.log('++++----', process.stdin.listeners('data').length)
//
//
//         });
// }
//
//
//
// function stdinLineByLine() {
//
//
//         process.stdin.setRawMode(true);
//         process.stdin.resume();
//         process.stdout.write('>>>')
//         process.stdin.on('data', emitere)
//
//
//
//         return stdin;
// }
//
// test(1, data => {
//         console.log(1, data);
//         if(data == 'return'){
//                 test(2, datas => {
//                         console.log(2, datas)
//                 });
//                 // setTimeout(() => {
//                 //
//                 // }, 1)
//         } else {
//                 setTimeout( () => {
//                         test(3, datas => {
//                                 console.log(3, datas)
//                         });
//                 }, 3000)
//         }
// })
//
//
//
// function test(counter: number, callback?){
//         console.log('start TEST' + counter)
//         const stdin = stdinLineByLine();
//         stdin.once('line', data => {
//                 stdin.removeAllListeners('line')
//
//
//                 callback(data);
//         });
//
//         return true;
// }
/////////////////////////////////////
// process.stdin.emit('data', 'abc');
// const { exec, execSync, spawn } = require("child_process");
// //
// // var r = execSync("echo -e \"\\033[0;34mFirst name:\\033[0m\"", {stdio: 'inherit'});
// //
// console.log('___');
// var d = exec("reset", (error, stdout, stderr) => {
//     let arr = stdout.split('');
//     for (var i = 0; i < arr.length; i++){
//         let el = arr[i];
//
//         // process.stdout.write(el + '_');
//
//     }
//
//     console.log(stdout)
// });
//
// const ls = spawn("echo", ["-r", "firstname"]);
//
// ls.stdout.on("data", data => {
//         console.log(`stdout: ${data}`);
// });
//
// ls.stderr.on("data", data => {
//         console.log(`stderr: ${data}`);
// });
//
// ls.on('error', (error) => {
//         console.log(`error: ${error.message}`);
// });
//
// ls.on("close", code => {
//         console.log(`child process exited with code ${code}`);
// });
//
// var k = execSync("echo $firstname", {stdio: 'inherit'});
// console.log(r,d,k)
// var r = execSync("read -r firstname", {stdio: 'inherit'});
// console.log(123, r)
// xlogio.input(15)
// xlogio.output()
// console.log(xlogio)
// console.log(style)
// console.log('\x1b[41mOleg\x1b[0m')
// console.log('1\x1b[0m\n')
// style.BgColor('red').Log('').Out();
// style.ClearConsole()
// style.BgColor('red').Log('Oleg').Padding(10).Log('Gerasimenko').Out();
// style.ClearConsole();
// style.BgColor('blue').Log('Oleg').Log('Gerasimenko').Out();
// console.table(
//     [
//         {row1: 1, row2: 1, row3: 1,},
//         {row1: 2, row2: 2, row3: 2,},
//         {row1: 3, row2: 3, row3: 3,},
//         {col1: 3, col2: 3, col3: 3,},
//         {row1: 1, row2: 1, row3: 1,},
//         {row5: 2, row2: 2, row3: 2,},
//         {row1: 3, row2: 3, row3: 3,},
//         {col1: 3, col2: 3, col3: 3,},
//         {row7: 1, row2: 1, row3: 1,},
//         {row9: 2, row2: 2, row3: 2,},
//         {row10: 3, row2: 3, row3: 3,},
//         {col11: 3, col2: 3, col3: 3,}
//     ]
// )
// interface GameSettings {
//     // Known up-front properties
//     speed: "fast" | "medium" | "slow";
//     quality: "high" | "low";
// interface User {
//     name: string;
//     id: number;
// }
//
// type D = User
// //
// // const user: User = {
// //     name: "Hayes",
// //     id: 0,
// // };
//
//
// function identityc<User>(arg: D): D {
//     return arg;
// }
//
// let output = identityc({name: '123', id: 5});
//
// console.log(output, 80)
