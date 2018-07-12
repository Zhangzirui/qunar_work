const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const hostName = '127.0.0.1';

const server = http.createServer((req, res) => {
    const url = req.url;
    let fileName = '';
    if (url === '/') {
        fileName = path.join(__dirname, '../dist/index.html');
    } else if (url === '/getData') {
        fileName = path.join(__dirname, './data.json');
    }else {
        fileName = path.join(__dirname, '../dist', url);
    }
    fs.readFile(fileName, (err, data) => {
        if (err) {
            fs.readFile(path.join(__dirname, './404.html'), (err, data) => {
                if (err) {
                    console.log(err);
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            })
            return;
        } 
        res.writeHead(200, {'Content-Type': getContentType(path.extname(fileName))});
        res.end(data, 'utf-8');
    })
});

function getContentType (ext) {
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.js':
            return 'text/javascript';
        case '.css':
            return 'text/css';
        case '.json':
            return 'appliction/json';
        default: 
            return 'text/plain';
    }
}


server.listen(port, hostName, () => {
    console.log('server begin... open 127.0.0.1:3000');
});