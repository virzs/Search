import {
    jsonData
} from "./all.data.mjs";

import {
    commonUse
} from "./dom.constant.mjs";

import {
    setStorage,
    getStorage
} from './storage.func.mjs';

import {
    openMessage
} from "./message.func.mjs";

import {
    setStorageBefore
} from "./animation.func.mjs";

//创建书签数据
function createWebsite() {
    let websiteInfo = "",
        sideBarHtml = "";
    jsonData.sideBar.content[1].content.forEach(item => {
        if (item.show) {
            websiteInfo += `<p><i class="${item.icon}"></i>  ${item.name}</p>`;
            item.content.forEach(inner => {
                if (inner.show) {
                    sideBarHtml += `<a id='${inner.icon}' href='${inner.href}' target="_blank" class="capsule" style="border:2px solid ${inner.color};"><div style="color:${inner.color};"><span>${inner.name}</span></div></a>`;
                }
            })
            websiteInfo = websiteInfo + sideBarHtml;
            sideBarHtml = "";
        }
    })
    return websiteInfo;
}

//添加常用书签
function commonWebsite(json) {
    let name = "",
        href = "",
        color = "";
    let flag = true;
    if (json.thisWebsite !== undefined) {
        name = json.thisWebsite.name;
        href = json.thisWebsite.href;
        color = json.thisWebsite.color;
    }
    let commonData = json.commonData,
        status = json.status,
        add = json.add,
        change = json.change,
        del = json.del;
    let data = {
        "name": name,
        "href": href,
        "color": color,
        "count": 1,
    };
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
    } else {
        data.count = 1;
    }
    if (change) {
        href = href.substring(0, href.length - 1);
        commonData.forEach(item => {
            if (item.href == href) {
                item.name = name;
                item.count = 100000;
            }
        })
        flag = false;
    } else if (del) {
        href = href.substring(0, href.length - 1);
        let delData = commonData.findIndex(item => item.href == href);
        commonData.splice(delData, 1);
        flag = false;
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
                commonHtml += renderData(item.name, item.href, item.color);
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
}

//自定义网址模板
function renderData(name, url, color) {
    return `
    <div class="commons">
        <div class="commons-content">
            <img src="https://favicon.link/${url}"></img>
            <a style="color:${color};" href="${url}" target="_blank">${name}</a>
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