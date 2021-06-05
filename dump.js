import http, {IncomingMessage} from 'http'
import getPort from "get-port";
import { exec } from "child_process";
import {Socket} from "net";
import stream from "stream";


// http._connectionListener((el) => {
//     console.log(el)
// })



let t = http.createServer(function (request, response) {
    // console.log(request)
    let contentType = 'text/html; charset=utf-8';

    response.writeHead(200, { 'Content-Type': contentType });
    response.end('', 'utf-8');
})

let lis = t.listen(8080);

console.log(t)

t.on('abort', () => {
    console.log('abort')
})

t.on('connection', (r) => {
    console.log('connect', connect)
})

t.on('continue', () => {
    console.log('continue')
})

t.on('information', (r) => {
    console.log('continue', r)
})

t.on('response', (IncomingMessage) => {
    console.log('response', IncomingMessage)
})

t.on('socket', (s) => {
    console.log('Socket', s)
})

t.on('timeout', () => {
    console.log('timeout')
})

t.on('upgrade', (r) => {
    console.log('upgrade', r)
})

t.on('close', () => {
    console.log('close')
})

t.on('drain', () => {
    console.log('close')
})

t.on('finish', () => {
    console.log('finish')
})

t.on('pipe', (r) => {
    console.log('finish', r)
})

t.on('string', (r) => {
    console.log('finish', r)
})

t.once('listening', function() {
    // close the server if listening doesn't fail
    console.log(4)
});

//
t.on('error', (e) => {
    console.log('error', e)
    if (e.code === 'EADDRINUSE') {
        console.log('The server is busy ... I am starting the process of cleaning the process!');
        exec("kill -9 $(lsof -i tcp:8080 -t)", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`Opening Port...`);
            t.listen(8080);
            console.log('Server was reloaded...');

        });
    }
});
console.log('Server running at http://127.0.0.1:' + 8080 + '/');




// http.createServer(function (request, response) {
//     console.log('request ', request.url);
//     console.log(request)

// var filePath = '.' + request.url;
// if (filePath == './') {
//     filePath = './index.html';
// }
//
// var extname = String(path.extname(filePath)).toLowerCase();
// var contentType = 'text/html';
// var mimeTypes = {
//     '.html': 'text/html',
//     '.js': 'text/javascript',
//     '.css': 'text/css',
//     '.json': 'application/json',
//     '.png': 'image/png',
//     '.jpg': 'image/jpg',
//     '.gif': 'image/gif',
//     '.wav': 'audio/wav',
//     '.mp4': 'video/mp4',
//     '.woff': 'application/font-woff',
//     '.ttf': 'application/font-ttf',
//     '.eot': 'application/vnd.ms-fontobject',
//     '.otf': 'application/font-otf',
//     '.svg': 'application/image/svg+xml'
// };
//
// contentType = mimeTypes[extname] || 'application/octet-stream';
//
// fs.readFile(filePath, function(error, content) {
//     if (error) {
//         if(error.code == 'ENOENT'){
//             fs.readFile('./404.html', function(error, content) {
//                 response.writeHead(200, { 'Content-Type': contentType });
//                 response.end(content, 'utf-8');
//             });
//         }
//         else {
//             response.writeHead(500);
//             response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
//             response.end();
//         }
//     }
//     else {
//         response.writeHead(200, { 'Content-Type': contentType });
//         response.end(content, 'utf-8');
//     }
// });

// }).listen(8125);
// console.log('Server running at http://127.0.0.1:8125/');
