import {
    jsonData
} from "./all.data.js";

import {
    commonUse
} from "./dom.constant.js";

import {
    setStorage,
    getStorage
} from './storage.func.js';

import {
    openMessage
} from "./message.func.js";

import {
    setStorageBefore
} from "./animation.func.js";

//创建书签数据
function createWebsite() {
    let websiteInfo = "",
        sideBarHtml = "";
    let websiteData = jsonData.sideBar.content.find(item => item.value == "Website").content;
    let customizeData = [];
    if (getStorage("sideBarWebsiteData") == undefined) {
        websiteData.forEach(item => {
            customizeData.push({
                value: item.value,
                content: []
            })
        })
        setStorage("sideBarWebsiteData", JSON.stringify(customizeData));
    }
    websiteData.forEach(item => {
        if (item.show) {
            websiteInfo += `<p><i class="${item.icon}"></i>  ${item.name}</p>`;
            item.content.forEach(inner => {
                if (inner.show) {
                    sideBarHtml += `<a id='${inner.name}' href='${inner.url}' target="_blank" class="capsule" style="border:2px solid ${inner.color};"><div style="color:${inner.color};"><span>${inner.name}</span></div></a>`;
                }
            })
            JSON.parse(getStorage("sideBarWebsiteData")).forEach(outer => {
                if (outer.value == item.value) {
                    outer.content.forEach(insite => {
                        sideBarHtml += `<a id='${insite.name}' href='${insite.url}' target="_blank" class="capsule" style="border:2px solid ${insite.color};"><div style="color:${insite.color};"><span>${insite.name}</span></div></a>`;
                    })
                }
            })
            sideBarHtml += `<a id='${item.value}AddCapsule' class="capsule" style="border:2px solid ${item.color};"><div style="color:${item.color};"><span><i class="fa fa-plus"></i>&nbsp;添加</span></div></a>`;
            websiteInfo = websiteInfo + sideBarHtml;
            sideBarHtml = "";
        }
    })
    return websiteInfo;
}

//添加常用书签
function commonWebsite(json) {
    let id = "",
        name = "",
        url = "",
        color = "";
    let flag = true;
    if (json.thisWebsite !== undefined) {
        id = json.thisWebsite.id;
        name = json.thisWebsite.name;
        url = json.thisWebsite.url;
        color = json.thisWebsite.color;
    }
    let commonData = json.commonData,
        status = json.status,
        add = json.add,
        change = json.change,
        del = json.del;
    let data = {
        "name": name,
        "url": url,
        "color": color,
        "count": 1,
        "id": Math.random().toString(36).substr(-8)
    };
    let operate = "";
    if (status !== undefined && status == getStorage("showCommonUse")) {
        let info = "";
        switch (status) {
            case "website_open":
                info = "开启";
                break;
            case "website_close":
                info = "关闭";
                break;
        }
        let type = "error";
        openMessage({
            title: "提示",
            type: type,
            content: `请勿重复${info}！！！`
        })
        return;
    }
    if (add) {
        data.count = 100000;
        operate = "添加";
    } else {
        data.count = 1;
    }
    if (change) {
        commonData.forEach(item => {
            if (item.id == id) {
                item.name = name;
                item.count = 100000;
            }
        })
        flag = false;
        operate = "修改";
    } else if (del) {
        let delData = commonData.findIndex(item => item.id == id);
        commonData.splice(delData, 1);
        flag = false;
        operate = "删除";
    }
    if (flag) {
        let recent = commonData.find(item => item.name == name);
        if (recent == undefined && status == undefined) {
            commonData.push(data);
        } else if (status == undefined && recent.count < 100000) {
            commonData.forEach(item => {
                if (item.name == recent.name) {
                    item.count += 1;
                }
            })
        }
    }
    //根据打开次数排序
    commonData.sort(function (obj1, obj2) {
        let minCount = obj1["count"];
        let maxCount = obj2["count"];
        return maxCount - minCount;
    })
    setCommomUse(commonData, status);
    setStorage("commonUseData", JSON.stringify(commonData));
    if (status == undefined) {
        openMessage({
            title: "提示",
            type: "success",
            content: `${operate}成功！`
        })
    }
}

//记录常用网址
function setCommomUse(data, status) {
    let commonHtml = "";
    let display = "";
    let isShow = (status !== undefined) ? true : false;
    if (status !== undefined) {
        setStorage("showCommonUse", status);
    }
    if (data !== null) {
        data.forEach((item, index) => {
            if (index < 7) {
                commonHtml += renderData(item.id, item.name, item.url, item.color);
            }
        })
    }
    if (getStorage("showCommonUse") == "website_open" || status == "website_open") {
        display = () => {
            commonUse.style.display = "flex";
        }
    } else if (getStorage("showCommonUse") == "website_close" || status == "website_close") {
        display = () => {
            commonUse.style.display = "none";
        }
    }
    if (isShow) {
        setStorageBefore(display);
    } else if (getStorage("showCommonUse") == "website_close" && !isShow) {
        commonUse.style.display = "none";
    }
    commonUse.innerHTML = commonHtml + addCommonsData();
    iconLoadError();
}

function iconLoadError() {
    Array.prototype.forEach.call(commonUse.children, item => {
        if (item.children[0].className == "commons-content") {
            item.children[0].children[0].onerror = () => {
                let textIcon = document.createElement("div");
                textIcon.setAttribute("class", "text-icon");
                textIcon.style.backgroundColor = item.children[0].children[1].style.color;
                let imageIcon = item.children[0].children[0];
                textIcon.innerHTML = item.children[0].children[1].text.substr(0, 1);
                item.children[0].replaceChild(textIcon, imageIcon);
            }
        }
    })
}

//自定义网址模板
function renderData(id, name, url, color) {
    return `
    <div class="commons">
        <div class="commons-content">
            <img src="https://favicon.link/${url}"></img>
            <a id="${id}" style="color:${color};" href="${url}" target="_blank">${name}</a>
        </div>
        <div class="commons-btn">
            <i class="fa fa-ellipsis-h"></i>
        </div>
    </div>`
}

//添加网址模板
function addCommonsData() {
    return `
    <div class="commons">
        <div class="commons-addbtn">
            <i class="fa fa-plus"></i>
        </div>
    </div>`
}
export {
    createWebsite,
    commonWebsite,
    setCommomUse
}