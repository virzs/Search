import {
    stopPropagation
} from "./global.func.js";

import {
    scrollContent,
    sideBar
} from "./dom.constant.js";

import {
    createWebsite
} from "./website.func.js";

import {
    createSetting
} from "./setting.func.js";

//依据选中id渲染侧边栏内容函数
function renderSideBarContent(id) {
    switch (id) {
        case "Gaming":
            scrollContent.innerHTML = "加班加点摸鱼中，敬请期待";
            break;
        case "Website":
            scrollContent.innerHTML = createWebsite();
            break;
        case "Setting":
            scrollContent.innerHTML = createSetting();
            break;
    }
    sideBar.className = "moveLeft";
    stopPropagation();
}
export {
    renderSideBarContent
}