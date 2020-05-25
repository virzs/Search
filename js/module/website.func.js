import {
    jsonData,
    apiData
} from "./all.data.js";

import {
    commonUse
} from "./dom.constant.js";

import {
    setStorage,
    getStorage
} from './storage.func.js';

import {
    setStorageBefore
} from "./animation.func.js";

import {
    generateId,
    quickSort,
    getRandomColor
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
                <a id='${item.value}' class="capsule" item-type="addCapsule" item-value="${item.value}">
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

//渲染常用网址
export const renderCommonUse = (isSetting = true) => {
    let data = getStorage('commonUseData').toJSON(); //数据源
    let state = getStorage('showCommonUse').value; //是否显示常用网址
    let commonHtml = ''; //渲染内容
    let display = null; //加载动画匿名函数
    data.forEach((item, index) => {
        if (index < 7) {
            commonHtml += renderData(item.id, item.name, item.url, item.color);
        }
    })
    //依据本地存储判断是否显示
    if (state == "website_open") {
        display = () => {
            commonUse.style.display = "grid";
        }
    } else if (state == "website_close") {
        display = () => {
            commonUse.style.display = "none";
        }
    }
    if (isSetting) {
        setStorageBefore(display);
    } else if (state == "website_close" && !isSetting) {
        commonUse.style.display = "none";
    }
    commonUse.innerHTML = commonHtml + addCommonsData();
    iconLoadError();
}

//更改常用网址次数
export const changeCommonCount = (key, state = 'add') => {
    let data = getStorage('commonUseData').toJSON(); //常用网址数据源
    let dataSource = jsonData.sideBar.content.find(item => item.value == "Website").content;
    let keys = Object.keys(key)[0]; //获取变量名
    let recent = data.find(item => item[keys] == key[keys]); //查找是否存在
    let source = ''; //查找文件中此项数据
    return new Promise((resolve, reject) => {
        try {
            if (!recent) {
                //不存在则查找点击的书签数据
                for (let item of dataSource) {
                    let thisWebsite = item.content.find(inner => inner[keys] == key[keys]);
                    if (thisWebsite) {
                        source = thisWebsite;
                        break;
                    }
                }
                source.id = generateId();
                source.count = 1;
                data.push(source);
            } else {
                //存在则更改count计数
                data.forEach((item, index) => {
                    if (item[keys] == key[keys] && state == 'add') {
                        item.count += 1;
                    } else if (item[keys] == key[keys] && state == 'sub') {
                        item.count -= 1;
                    }
                    if (item.count < 0) {
                        item.count = 0;
                    }
                })
            }
            setStorage('commonUseData', JSON.stringify(quickSort(data)));
            resolve({
                code: 200,
                data: {},
                msg: "成功"
            })
        } catch (err) {
            reject({
                code: 500,
                data: {},
                msg: err
            })
        }
    })
}

//添加常用网址
export const addCommon = (data) => {
    let dataSource = getStorage('commonUseData').toJSON(); //常用网址数据源
    let name = data.name ? data.name : null;
    let url = data.url ? data.url : null;
    return new Promise((resolve, reject) => {
        if (name == null || url == null) {
            reject({
                code: 500,
                data: {},
                msg: "名称或URL不能为空！！！"
            })
        }
        if (url.toLowerCase().slice(0, 8) !== "https://" && url.toLowerCase().slice(0, 7) !== "http://") {
            url = `https://${url}`;
        }
        //异常处理
        try {
            dataSource.push({
                name: name,
                url: url,
                count: 10000,
                id: generateId(),
                color: getRandomColor(),
                show: true,
                icon: ""
            })
            setStorage('commonUseData', JSON.stringify(quickSort(dataSource)));
            resolve({
                code: 200,
                data: {},
                msg: "添加常用网址成功"
            })
        } catch (err) {
            reject({
                code: 500,
                data: {},
                msg: err
            })
        }
    })
}

//修改常用网址
export const changeCommon = (data) => {
    let dataSource = getStorage('commonUseData').toJSON(); //常用网址数据源
    let name = data.name ? data.name : null;
    let id = data.id ? data.id : null;
    let item = ''; //要修改的数据
    let index = ''; //下标
    return new Promise((resolve, reject) => {
        if (name == null || id == null) {
            reject({
                code: 500,
                data: {},
                msg: "名称不能为空"
            })
        }
        try {
            item = dataSource.find(item => item.id == id);
            index = dataSource.findIndex(item => item.id = id);
            item.name = name;
            dataSource.splice(index, 1, item);
            setStorage('commonUseData', JSON.stringify(quickSort(dataSource)));
            resolve({
                code: 200,
                data: {},
                msg: "修改常用网址成功"
            })
        } catch (err) {
            reject({
                code: 500,
                data: {},
                msg: err
            })
        }
    })
}

//删除常用网址
export const deleteCommon = (data) => {
    let dataSource = getStorage('commonUseData').toJSON(); //常用网址数据源
    let id = data.id ? data.id : null;
    let index = ''; //下标
    return new Promise((resolve, reject) => {
        if (id == null) {
            reject({
                code: 500,
                data: {},
                msg: "名称不能为空"
            })
        }
        try {
            index = dataSource.findIndex(item => item.id = id);
            dataSource.splice(index, 1);
            setStorage('commonUseData', JSON.stringify(quickSort(dataSource)));
            resolve({
                code: 200,
                data: {},
                msg: "删除常用网址成功"
            })
        } catch (err) {
            reject({
                code: 500,
                data: {},
                msg: err
            })
        }
    })
}

//侧边栏添加网址
export const addSideBarWebsite = (data) => {
    let dataSource = getStorage('sideBarWebsiteData').toJSON(); //网址数据源
    let name = data.name ? data.name : null;
    let url = data.url ? data.url : null;
    let classValue = data.id;
    let classify = null; //所属类别
    let index = null; //所属类别下标
    return new Promise((resolve, reject) => {
        if (name == null || url == null) {
            reject({
                code: 500,
                data: {},
                msg: '名称或URL不能为空'
            })
        }
        if (url.toLowerCase().slice(0, 8) !== "https://" && url.toLowerCase().slice(0, 7) !== "http://") {
            url = `https://${url}`;
        }
        try {
            classify = dataSource.find(item => item.value == classValue);
            index = dataSource.findIndex(item => item.value == classValue);
            if (classify) {
                classify.content.push({
                    name: name,
                    url: url,
                    color: getRandomColor(),
                    show: true,
                    icon: ""
                })
                dataSource.splice(index, 1, classify);
                setStorage("sideBarWebsiteData", JSON.stringify(dataSource));
            }
            resolve({
                code: 200,
                data: {},
                msg: "添加成功"
            })
        } catch (err) {
            reject({
                code: 500,
                data: {},
                msg: err
            })
        }
    })
}

//检查网址是否有效
export const checkWebsite = (data) => {
    let url = data.url;
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: `http://${url}`,
            dataType: "jsonp",
            complete: function (response) {
                console.log(response)
                if (response.status == 200) {
                    resolve({
                        code: 200,
                        data: {},
                        msg: '此网址有效'
                    })
                } else {
                    reject({
                        code: 500,
                        data: {},
                        msg: '此网址无效'
                    })
                }
            }
        });
    })
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
        <a id='${data.name}' href='${data.url}' target="_blank" class="capsule" item-type="commons">
            <div style="color:${data.color};">
                <span>${data.name}</span>
            </div>
        </a>`;
}

//自定义网址模板
const renderData = (id, name, url, color) => {
    let iconApi = apiData.find(item => item.apiName == 'favicon').url;
    return `
    <div class="commons">
        <div class="commons-content">
            <img src="${iconApi}${url}"></img>
            <a id="${id}" item-type="commons" style="color:${color};" href="${url}" target="_blank">${name}</a>
        </div>
        <div class="commons-btn" item-type="commons-btn" item-value="handle">
            <i class="fa fa-ellipsis-h"></i>
        </div>
    </div>`
}

//添加网址模板
const addCommonsData = () => {
    return `
    <div class="commons">
        <div class="commons-addbtn" item-type="commons-btn" item-value="add">
            <i class="fa fa-plus"></i>
        </div>
    </div>`
}