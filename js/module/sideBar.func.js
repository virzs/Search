import {
    jsonData
} from './all.data.js';

import {
    stopPropagation
} from "./global.func.js";

import {
    sideBar,
    sideBarTitle,
    scrollContent
} from "./dom.constant.js";

import {
    createWebsite
} from "./website.func.js";

import {
    createSetting
} from "./setting.func.js";

import {
    createToDo
} from "./todo.func.js";

//创建侧边栏图标
export const renderSideBarIcon = () => {
    for (let item in jsonData.sideBar.content) {
        if (jsonData.sideBar.content[item].show) {
            sideBarTitle.innerHTML += `
                <div id="${jsonData.sideBar.content[item].value}" class="title-icon" style="color:${jsonData.sideBar.content[item].color};" color="${jsonData.sideBar.content[item].color}">
                    <i class="${jsonData.sideBar.content[item].icon}"></i>
                    <span>${jsonData.sideBar.content[item].name}</span>
                </div>`;
        }
    }
}

//侧边栏按钮点击
export const sideBarButtonClick = (sideBarIconFlag) => {
    let icon = sideBarTitle.querySelectorAll(".title-icon");
    Array.prototype.forEach.call(icon, item => {
        item.style.background = "";
        item.style.color = item.getAttribute('color');
    })
    if (sideBarIconFlag == -1) {
        sideBarButton.className = "sideBarButtonMoveLeft";
        sideBarButton.innerHTML = `<i class="fa fa-mail-forward"></i>`;
        sideBar.className = "moveLeft";
        icon[0].style.background = icon[0].getAttribute('color');
        icon[0].style.color = "#fff";
        sideBarIconFlag = "Website";
        renderSideBarContent("Website");
    } else {
        sideBarButton.className = "sideBarButtonMoveRight";
        sideBarButton.innerHTML = `<i class="fa fa-bars"></i>`;
        sideBar.className = "moveRight";
        sideBarIconFlag = -1;
    }
    return sideBarIconFlag;
}

//依据选中id渲染侧边栏内容函数
export const renderSideBarContent = (id) => {
    switch (id) {
        case "ToDo":
            scrollContent.innerHTML = createToDo();
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