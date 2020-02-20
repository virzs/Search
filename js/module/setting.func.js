import {
    jsonData
} from "./all.data.js";

var skin_Transparent = ""; //透明皮肤数据

//判断渲染设置项
function createHtml(inner) {
    let sideBarHtml = "";
    if (!inner.type) {
        sideBarHtml = `<div id="${inner.value}" class="setlist" style="border:2px solid ${inner.color};"><span><i class="${inner.icon}"></i>  ${inner.name}：</span><span>${inner.content}</span></div>`;
    }
    if (inner.type == "skin" && inner.value !== "skin_Transparent") {
        sideBarHtml = `<div id="${inner.value}" class="setlist" style="border:2px solid ${inner.color};"><span><i class="${inner.icon}"></i>  ${inner.name}</span></div>`;
    }
    if (inner.type == "uistyle") {
        sideBarHtml = renderSetting(inner.value, inner.color, inner.name);
    }
    if (inner.type == "changebg" && inner.value == "changebg") {
        sideBarHtml = `<div id="${inner.value}" class="setlist" style="border:2px solid ${inner.color};"><a href="javascript:;" class="changebg">更换背景<input id="setBackGround" type="file"></a></div>`;
    }
    if (inner.type == "changebg" && inner.value !== "changebg") {
        sideBarHtml = renderSetting(inner.value, inner.color, inner.name);
    }
    if (inner.type == "changeCommonUse") {
        sideBarHtml = renderSetting(inner.value, inner.color, inner.name);
    }
    if (inner.type == "thanks") {
        sideBarHtml = `<a href="${inner.href}" target="_blank"><div class="setlist" style="border:2px solid ${inner.color};">${inner.name}</div></a>`;
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
            if (item.content !== "" && typeof item.content !== "string") {
                item.content.forEach(inner => {
                    if (inner.show) {
                        if (typeof inner.content === "string" && inner.content !== "") {
                            //content不为空且为字符串时
                            sideBarHtml += createHtml(inner);
                        } else if (typeof inner.content !== "string") {
                            //content为数组对象时
                            inner.content.forEach(inners => {
                                if (inners.show) {
                                    if (inners.value == "email") {
                                        sideBarHtml += `<div class="setlist" style="border:2px solid ${inners.color};"><span><i class="${inners.icon}"></i>  ${inners.name}：</span><span><a href='mailto:${inners.content}' target="_blank">${inners.content}</a></span></div>`;
                                    } else {
                                        sideBarHtml += `<div class="setlist" style="border:2px solid ${inners.color};"><span><i class="${inners.icon}"></i>  ${inners.name}：</span><span><a href='${inners.href}' target="_blank">${inners.content}</a></span></div>`;
                                    }
                                }
                            })
                        } else {
                            //content为空时的内容
                            sideBarHtml += createHtml(inner);
                        }
                    } else {
                        if (inner.type == "skin" && inner.value == "skin_Transparent") {
                            skin_Transparent = inner.href;
                        }
                    }
                })
            }
            settingInfo = settingInfo + sideBarHtml;
            sideBarHtml = "";
        }
    })
    return settingInfo;
}

function renderSetting(id, color, name) {
    return `<div id="${id}" class="setlist" style="border:2px solid ${color};">${name}</div>`;
}

export {
    createSetting
}