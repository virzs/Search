import {
    searchLogo
} from './dom.constant.js';

import {
    jsonData
} from './all.data.js';

export const showLogo = (status = true) => {
    let info = jsonData.info;
    if (!status) return;
    if (info.logo == '') {
        searchLogo.innerHTML = `
            <div class="text-logo">
                <p>${info.mainTitle}</p>
                <p>${info.subTitle}</p>
            </div>`;
    } else {
        searchLogo.innerHTML = `<img src="${info.logo}" alt="" />`;
    }
}

export const showTime = () => {
    let DATE = new Date();
    let YEAR = DATE.getFullYear(); //年
    let MONTH = DATE.getMonth() + 1; //月
    let WEEK = DATE.getDay(); //星期
    let DAY = DATE.getDate(); //日
    let HOUR = DATE.getHours(); //小时
    let MINUTE = DATE.getMinutes(); //分钟
    let SECOND = DATE.getSeconds(); //秒
    searchLogo.innerHTML = `
        <div class="time-logo">
           <span>${HOUR}</span>
           <span>${MINUTE}</span>
           <span>${SECOND}</span>
        </div>`;
    let t = setTimeout(showTime, 1000);
}