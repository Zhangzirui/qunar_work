const path = require('path')
const express = require('express');

const {getData, saveData} = require('./dataControl');
const {isArr} = require('./util');
const crawler = require('./crawler');

let articleId = 0; 

const app = express();
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../dist/index.html');
    res.sendFile(filePath);
});

// 获取数据库中存储的article信息
app.get('/getDatabase', (req, res) => {
    console.log('页面初始化中...正在读取JAVA后台服务器中的内容...');
    getData().then(dataStr => {
        let dataArr = JSON.parse(dataStr).data
        if(isArr(dataArr) && isArr.length !== 0) {
            dataArr = dataArr.map((item, index) => {
                return Object.assign({}, item, {
                    "articleId": index
                })
            })
            articleId = dataArr.length;
        }
        res.json(dataArr)
    })
});


// 获取新的article信息
app.get('/getArticle', (req, res) => {
    const url = req.query.url;
    console.log('开始爬取网站内容...')
    console.log('爬取网址为：' + url);
    crawler.parseUrl(url)
        .then(dataObj => {
            // 存入java 后台数据库
            console.log('将处理后的数据存入JAVA后台服务器中');
            saveData(dataObj);
            Object.assign(dataObj, {
                'articleId': articleId++
            })
            //  返回前端
            console.log('将处理后的数据返回到前端')
            res.json(dataObj);
        }).catch(e => {
            console.log(e);
        });
});

app.listen(3000, () => {
    console.log('server begin ...open 127.0.0.1:3000');
})
