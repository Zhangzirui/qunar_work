import {
    getXHR, 
    ajax,
    addClass
} from './unit';

let key = '02-05';

ajax({
    xhr: getXHR(),
    type: 'get',
    path: '/getData',
}).then(res => {
    return JSON.parse(res);
}).then(dataObj => {
    active(key);
    render(dataObj[key]);
}).catch(e => {
    console.log(`error ! xhr.status: ${e}`);
});

function active (key) {
    const liEle = document.getElementById(key);
    addClass(liEle, 'active');
}

function render (dataArr) {
    const ulWrap = document.getElementsByClassName('planList')[0];
    let htmlStr = '';
    dataArr.forEach(data => {
        const liEle = `<li class="clearfix">
            <div class="planContent">
                <div class="timeTable">
                    <div class="from">
                        <p class="time">${data.from.time}</p>
                        <p class="airport">${data.from.airport}</p>
                    </div>
                    <div class="toIcon clearfix"></div>
                    <div class="to">
                        <p class="time">${data.to.time}</p>
                        <p class="airport">${data.to.airport}</p>
                    </div>
                </div>
                <p class="airline">${data.airline} ${data.isShare ? '<span class="share">共享</span>' : ''}</p>
            </div>
            <div class="planCost">
                <p class="money">${data.planCost.money}</p>
                <p class="discount">${data.planCost.discount}</p>
                ${data.planCost.riseInPrice ? '<p class="description"><span>持续涨价中</span></p>' : ''}   
            </div>
        </li> `;
        htmlStr += liEle;
    });
    ulWrap.innerHTML = htmlStr;
}