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
} from "../components/message.component.js";

import {
    setStorageBefore
} from "./animation.func.js";

import {
    generateId,
    quickSort
} from "./global.func.js";

//创建书签数据
export const createWebsite = () => {
    let [websiteInfo, sideBarHtml, customizeData] = ['', '', []];
    let websiteData = jsonData.sideBar.content.find(item => item.value == "Website").content;
    if (getStorage("sideBarWebsiteData").value == undefined) {
        websiteData.forEach(item => {
            customizeData.push({
                name: item.name,
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
                    sideBarHtml += renderCapsule(inner);
                }
            })
            getStorage("sideBarWebsiteData").toJSON().forEach(outer => {
                if (outer.value == item.value) {
                    outer.content.forEach(insite => {
                        sideBarHtml += renderCapsule(insite);
                    })
                }
            })
            sideBarHtml += `
                <a id='${item.value}AddCapsule' class="capsule">
                    <div style="color:${item.color};">
                        <span><i class="fa fa-plus"></i>&nbsp;添加</span>
                    </div>
                </a>`;
            websiteInfo = websiteInfo + `
                <div class="capsule-content">
                    ${sideBarHtml}
                </div>`;
            sideBarHtml = "";
        }
    })
    return websiteInfo;
}

//添加常用书签
export const commonWebsite = (json) => {
    let [id, name, url, color, flag, operate] = ['', '', '', '', true, ''];
    let [commonData, status, add, change, del] = [json.commonData, json.status, json.add, json.change, json.del];
    if (json.thisWebsite !== undefined) {
        id = json.thisWebsite.id;
        name = json.thisWebsite.name;
        url = json.thisWebsite.url;
        color = json.thisWebsite.color;
    }
    let data = {
        "name": name,
        "url": url,
        "color": color,
        "count": 1,
        "id": generateId()
    };
    if (status !== undefined && status == getStorage("showCommonUse").value) {
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
    setCommomUse(quickSort(commonData), status);
    setStorage("commonUseData", JSON.stringify(commonData));
    if (status == undefined && (add !== undefined || change !== undefined || del !== undefined)) {
        openMessage({
            title: "提示",
            type: "success",
            content: `${operate}成功！`
        })
    }
}

//记录常用网址
export const setCommomUse = (data, status) => {
    let [commonHtml, display] = ['', ''];
    let isShow = (status !== undefined) ? true : false;
    let showCommonUse = getStorage("showCommonUse").value;
    if (status !== undefined) setStorage("showCommonUse", status);
    if (data !== null) {
        data.forEach((item, index) => {
            if (index < 7) {
                commonHtml += renderData(item.id, item.name, item.url, item.color);
            }
        })
    }
    //依据本地存储判断
    if (showCommonUse !== "website_open") {
        display = () => {
            commonUse.style.display = "grid";
        }
    } else if (showCommonUse !== "website_close") {
        display = () => {
            commonUse.style.display = "none";
        }
    }
    if (isShow) {
        setStorageBefore(display);
    } else if (showCommonUse == "website_close" && !isShow) {
        commonUse.style.display = "none";
    }
    commonUse.innerHTML = commonHtml + addCommonsData();
    iconLoadError();
}

//更改常用网址次数
export const changeCommonCount = (id, state = 'add') => {
    let data = getStorage('commonUseData').toJSON();
    data.forEach((item, index) => {
        if (item.id == id && state == 'add') {
            item.count += 1;
        } else if (item.id == id && state == 'sub') {
            item.count -= 1;
        }
        if (item.count < 0) {
            item.count = 0;
        }
    })
    setStorage('commonUseData', JSON.stringify(quickSort(data)));
}

//图标加载失败替换文字函数
const iconLoadError = () => {
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

//胶囊样式模板
const renderCapsule = (data) => {
    return `
        <a id='${data.name}' href='${data.url}' target="_blank" class="capsule">
            <div style="color:${data.color};">
                <span>${data.name}</span>
            </div>
        </a>`;
}

//自定义网址模板
const renderData = (id, name, url, color) => {
    return `
    <div class="commons">
        <div class="commons-content">
            <img src="https://favicon.link/${url}"></img>
            <a id="${id}" item-type="commons" style="color:${color};" href="${url}" target="_blank">${name}</a>
        </div>
        <div class="commons-btn">
            <i class="fa fa-ellipsis-h"></i>
        </div>
    </div>`
}

//添加网址模板
const addCommonsData = () => {
    return `
    <div class="commons">
        <div class="commons-addbtn">
            <i class="fa fa-plus"></i>
        </div>
    </div>`
}