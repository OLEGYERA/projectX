/**
 * [X_Console types]
 *
 * [L] - Prefix specifying the type in which the data is a L of views;
 * [X] - Prefix specifying the type of Project_x Objects
 *
 * Path of use in the XCollector
 * ../module_x/console/style.ts
 */


type LActions = "reset" | "boldOn" | "boldOff";
type LColors = "black" | "red" | "green" | "yellow" | "blue" | "pink" | "cyan" | "white";
type LBgs = "black" | "red" | "green" | "yellow" | "blue" | "pink" | "cyan" | "grey";

type XAction = {readonly [key in LActions]: string};
type XColor = {readonly [key in LColors]: string};
type XBg = {readonly [key in LBgs]: string};

export { LActions, LColors, LBgs, XAction, XColor, XBg };


/**
 * Make all properties in T optional
 */

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @public
 */



// this.x_istream_callback = (data) => test<FStdInCallback>(data, this) ;
// process.stdin.on('data', this.x_istream_callback)


// process.cwd() // current path
// console.log(process.argv, 'argv'); //[] указывает путь к базовой директории node || полный путь к файлу где вызывается комманда
// console.log(process.argv0, 'argv0');
// console.log(process.execArgv, 'execArgv');
// console.log(process.execPath, 'execPath'); // указывает путь к базовой директории node
// console.log(process.debugPort, 'debugPort'); //отладочный порт
// console.log(process.env, 'env'); //{} огромный перечень данных npm