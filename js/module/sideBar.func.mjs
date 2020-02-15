import {
    stopPropagation
} from "./global.func.mjs";

import {
    scrollContent,
    sideBar
} from "./dom.constant.mjs";

import {
    createWebsite
} from "./website.func.mjs";

import {
    createSetting
} from "./setting.func.mjs";

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