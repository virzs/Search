import {
    jsonData
} from "./all.data.js";

import {
    scrollContent
} from "./dom.constant.js";

var skin_Transparent = ""; //透明皮肤数据

//判断渲染设置项
function settingCapsule(inner) {
    let sideBarHtml = "";
    if (!inner.type) {
        sideBarHtml = `
            <div id="${inner.value}" class="setlist" style="border:2px solid ${inner.color};color:${inner.color};">
                <span><i class="${inner.icon}"></i>  ${inner.name}：</span>
                <span>${inner.content}</span>
            </div>`;
    }
    if (inner.type == "skin" && inner.value !== "skin_Transparent") {
        sideBarHtml = `
            <div id="${inner.value}" class="capsule" style="border:2px solid ${inner.color};color:${inner.color};">
                <div>
                    <span><i class="${inner.icon}"></i>  ${inner.name}</span>
                </div>
            </div>`;
    }
    if (inner.type == "uistyle") {
        sideBarHtml = renderSetting(inner.value, inner.color, inner.name);
    }
    if (inner.type == "changebg" && inner.value == "changebg") {
        sideBarHtml = `
            <div id="${inner.value}" class="capsule" style="border:2px solid ${inner.color};">
                <div style="color:${inner.color}">
                    <span>更换背景</span>
                    <a href="javascript:;" class="changebg"><input id="setBackGround" type="file"></a>
                </div>
            </div>`;
    }
    if (inner.type == "changebg" && inner.value !== "changebg") {
        sideBarHtml = renderSetting(inner.value, inner.color, inner.name);
    }
    if (inner.type == "changeCommonUse" || inner.type == "dataManagement" || inner.type == "backupAndRecovery") {
        sideBarHtml = renderSetting(inner.value, inner.color, inner.name);
    }
    if (inner.type == "thanks") {
        sideBarHtml = `
            <a href="${inner.href}" target="_blank">
                <div class="setlist" style="border:2px solid ${inner.color};">${inner.name}</div>
            </a>`;
    }
    return sideBarHtml;
}

//创建设置项数据
function createSetting() {
    let settingInfo = "",
        sideBarHtml = "";
    let settingData = jsonData.sideBar.content.find(item => item.value == "Setting").content;
    settingData.forEach(item => {
        if (item.show) {
            settingInfo += `<p><i class="${item.icon}"></i>  ${item.name}</p>`;
            if (item.content !== "" && typeof item.content !== "string" && item.value !== "about") {
                item.content.forEach(inner => {
                    if (inner.show) {
                        if (typeof inner.content === "string" && inner.content !== "") {
                            //content不为空且为字符串时
                            sideBarHtml += settingCapsule(inner);
                        } else {
                            //content为空时的内容
                            sideBarHtml += settingCapsule(inner);
                        }
                    } else {
                        if (inner.type == "skin" && inner.value == "skin_Transparent") {
                            skin_Transparent = inner.href;
                        }
                    }
                })
            } else if (item.value == "about") {
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

function createAdvancedSettings() {
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
function renderSetting(id, color, name) {
    return `
        <div id="${id}" class="capsule" style="border:2px solid ${color};">
            <div style="color:${color};">
                <span>${name}</span>
            </div>
        </div>`;
}

function renderAbout(data) {
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
        <div class="about-content" style="border:2px solid ${data.color};">
            ${sideBarHtml}
            <div class="about-info">
                <span><i class="fa fa-window-maximize"></i>  浏览器信息：</span>
                <span>${navigator.userAgent}</span>
            </div>
        </div>`;
}

export {
    createSetting,
    createAdvancedSettings
}