import 'whatwg-fetch';


export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_INITIAL_DATA = 'RECEIVE_INITIAL_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';


const requestData = () => ({
    type: REQUEST_DATA
});

const receiveData = dataObj => ({
    type: RECEIVE_DATA,
    dataObj
});

const receiveInitalData = dataArr => ({
    type: RECEIVE_INITIAL_DATA,
    dataArr
});


export const fetchInitialData = () => (dispatch, getState) => {
    dispatch(requestData());
    return fetch('/getDatabase')
        .then(res => {
            if (res.status >= 200 && res.status < 300 || res.status === 304) {
                return res.json();
            } else {
                console.log(`res.status: ${res.status}`);
            }
        })
        .then(dataArr => {
            dispatch(receiveInitalData(dataArr));
        })
        .catch(err => console.log(`抓取数据出错，${err}`));
}

export const fetchArticleData = (url) => (dispatch, getState) => {
    dispatch(requestData());
    const path = `/getArticle?${encodeURIComponent('url')}=${encodeURIComponent(url)}`;
    return fetch(path)
        .then(res => {
            if (res.status >= 200 && res.status < 300 || res.status === 304) {
                return res.json();
            } else {
                console.log(`res.status: ${res.status}`);
            }
        })
        .then(dataObj => {
            dispatch(receiveData(dataObj));
        })
        .catch(err => console.log(`抓取数据出错，${err}`));
}

