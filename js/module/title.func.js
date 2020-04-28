import {
    searchLogo
} from './dom.constant.js';

import {
    jsonData
} from './all.data.js';

let t = null;

export const showLogo = () => {
    clearTimeout(t);
    let info = jsonData.info;
    searchLogo.style.display = 'flex';
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

    MONTH = checkTime(MONTH);
    DAY = checkTime(DAY);
    HOUR = checkTime(HOUR);
    MINUTE = checkTime(MINUTE);
    SECOND = checkTime(SECOND);

    searchLogo.style.display = 'flex';
    searchLogo.innerHTML = `
        <div class="time-logo">
           <p>
                <span>${HOUR}</span>
                <span>${MINUTE}</span>
                <span>${SECOND}</span>
           </p>
           <p>
                <span>${YEAR}</span>
                <span>${MONTH}</span>
                <span>${DAY}</span>
            </p>
        </div>`;
    t = setTimeout(showTime, 1000);
}

export const closeLogo = () => {
    clearTimeout(t);
    searchLogo.style.display = 'none';
}

const checkTime = (value) => {
    return value < 10 ? `0${value}` : value;
}