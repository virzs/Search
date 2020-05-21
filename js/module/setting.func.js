import {
    jsonData
} from "./all.data.js";

import {
    scrollContent
} from "./dom.constant.js";

var skin_Transparent = ""; //透明皮肤数据

//创建设置项数据
export const createSetting = () => {
    let [settingInfo, sideBarHtml] = ['', ''];
    let settingData = jsonData.sideBar.content.find(item => item.value == "Setting").content;
    settingData.forEach(item => {
        if (item.show) {
            settingInfo += `<p><i class="${item.icon}"></i>  ${item.name}</p>`;
            if (item.content !== "" && typeof item.content !== "string" && item.value !== "about") {
                item.content.forEach(inner => {
                    if (inner.show) {
                        if (typeof inner.content === "string" && inner.content !== "") {
                            //content不为空且为字符串时
                            sideBarHtml += settingCapsule(inner, item.type);
                        } else {
                            //content为空时的内容
                            sideBarHtml += settingCapsule(inner, item.type);
                        }
                    } else {
                        if (inner.type == "skin" && inner.value == "skin_Transparent") {
                            skin_Transparent = inner.href;
                        }
                    }
                })
            } else if (item.type == "content") {
                sideBarHtml += renderAbout(item);
            }
            if (item.value == "about") {
                settingInfo = settingInfo + `
                <div class="about-box">
                    ${sideBarHtml}
                </div>`;
            } else {
                settingInfo = settingInfo + `
                <div class="capsule-content">
                    ${sideBarHtml}
                </div>`;
            }
            sideBarHtml = "";
        }
    })
    settingInfo += `
        <div id="advancedSettings">
            <span>高级设置&nbsp;</span>
            <i class="fa fa-sort"></i>
        </div>`;
    return settingInfo;
}

//判断渲染设置项
const settingCapsule = (inner, type) => {
    let sideBarHtml = "";
    if (type == "button") {
        sideBarHtml = renderSetting(inner);
    }
    if (type == "link") {
        sideBarHtml = `
            <a href="${inner.href}" target="_blank">
                <div class="setlist">${inner.name}</div>
            </a>`;
    }
    return sideBarHtml;
}

export const createAdvancedSettings = () => {
    let advancedSettingsData = jsonData.sideBar.content.find(item => item.value == "advancedSettings");
    let content = document.createElement("div");
    content.setAttribute("class", "advanced-settings-content");
    let data = "";
    advancedSettingsData.content.forEach(item => {
        if (item.show) {
            data += `
            <p>${item.name}</p>
            <div class="advanced-settings-input">
                <input type="range" min="0" max="25">
            </div>`;
        }
    })
    content.innerHTML = data;
    scrollContent.appendChild(content);
}

//可复用渲染项函数
const renderSetting = (data) => {
    let value = data.value; //设置项value
    let color = data.color; //设置项颜色
    let name = data.name; //设置项名称
    let type = data.type; //设置项属性
    return `
        <div id="${value}" class="capsule" item-type="${type}" item-value="${value}">
            <div style="color:${color};">
                <span>${name}</span>
            </div>
        </div>`;
}

const renderAbout = (data) => {
    let sideBarHtml = "";
    data.content.forEach(item => {
        if (item.show) {
            if (typeof item.content == "string") {
                sideBarHtml += `
                    <div class="about-info">
                        <span><i class="${item.icon}"></i>  ${item.name}：</span>
                        <span><a href='${item.href}' target="_blank">${item.content}</a></span>
                    </div>`;
            } else {
                item.content.forEach(inner => {
                    sideBarHtml += `
                        <div class="about-info">
                            <span><i class="${inner.icon}"></i>  ${inner.name}：</span>
                            <span><a href='${inner.href}' target="_blank">${inner.content}</a></span>
                        </div>`;
                })
            }

        }
    })
    return `
        <div class="about-content">
            ${sideBarHtml}
            <div class="about-info">
                <span><i class="fa fa-window-maximize"></i>  浏览器信息：</span>
                <span>${navigator.userAgent}</span>
            </div>
        </div>`;
}