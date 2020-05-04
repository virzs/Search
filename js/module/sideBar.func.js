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