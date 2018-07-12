const path = require('path');
const http = require('http');
const https = require('https');


const getDataFromUrl = url => {
    const mode = url.startsWith('https') ? https : http;
    return new Promise((resolve, reject) => {
        mode.get(url, res => {
            let dataStr = '';
            res.on('data', chunk => {
                dataStr += chunk;
            });
            res.on('end', () => {
                resolve(dataStr);
            });
        }).on('error', e => {
            reject(e);
        })
    });
};

const requestUrl = ({options, writeData}) => {
    const mode = options.protocol === 'https' ? https : http;
    const req = mode.request(options, res => {
        console.log(`响应状态码：${res.statusCode}`);
        res.setEncoding('utf8');
    });
    req.on('error', e => {
        console.log(`请求出现问题，${e.message}`);
    });
    req.write(writeData);
    req.end();
};

const isArr = (arr) => Object.prototype.toString.call(arr) === '[object Array]';

module.exports = {
    getDataFromUrl,
    requestUrl,
    isArr
}