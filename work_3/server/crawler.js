const {getDataFromUrl} = require('./util');
const cheerio = require('cheerio');

const parseUrl = url => {
    return getDataFromUrl(url)
        .then(dataStr => {
            return dealWith(dataStr)
        });
};

function dealWith (html) {
    const $ = cheerio.load(html);
    let title = '目前不支持该网页爬取',
        number = 0,
        chNumber = 0,
        enNumber = 0,
        puncNumber = 0;

    let symbols = '';
    try {
        symbols += $('.postTitle').text().replace(/\s+/g, '')
                + $('.postBody').text().replace(/\s+/g, '');
        
        number = symbols.length;
        chNumber = symbols.match(/[\u4e00-\u9fa5]/g).length;
        enNumber = symbols.match(/[a-z]/gi).length;
        puncNumber = number - chNumber - enNumber;
        title = $('.postTitle > #cb_post_title_url').text();
    } catch (e) {
        console.log('目前不支持该网页爬取。。。');
    }
    return {
        title,
        number,
        chNumber,
        enNumber,
        puncNumber
    };
};

module.exports = {
    parseUrl
}
