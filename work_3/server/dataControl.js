
const querystring = require('querystring');

const {getDataFromUrl, requestUrl} = require('./util');

const getDataPath = '/counter/getData';
const saveDataPath = '/counter/save';

const getData = () => {
    return getDataFromUrl('http://localhost:8080' + getDataPath);
}


const saveData = (data) => {
    const writeData = querystring.stringify(data);
    return requestUrl({
        options: {
            hostname: 'localhost',
            port: 8080,
            path: saveDataPath,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(writeData)
            }
        },
        writeData
    }) 
};

module.exports = {
    getData,
    saveData
}