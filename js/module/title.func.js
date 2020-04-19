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