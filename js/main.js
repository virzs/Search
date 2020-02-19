/*
 * @Author: VirZhang
 * @Date: 2019-11-28 14:32:57
 * @Last Modified by: VirZhang
 * @Last Modified time: 2020-02-19 15:09:47
 */

//配置变量
var searchEngine = ""; //搜索框左侧选择搜索引擎数据
var searchFlag = true; //搜索引标记
var sideBarIconFlag = -1; //侧边栏按钮标记
var commonData = []; //常用网址数据
var changeWebsiteUrl = "";

//获取本地数据
const skinHref = getStorage("skin");
const uiHref = getStorage("uistyle");
const bg = getStorage("bg");
const commonUseData = getStorage("commonUseData");
const showCommonUse = getStorage("showCommonUse");

/*
    导入模块
 */

//所有数据
import {
    jsonData
} from "./module/all.data.js";

//DOM元素
import {
    body,
    linkTag,
    uiTag,
    searchContent,
    selectEngine,
    selectOption,
    searchInput,
    searchList,
    sideBarButton,
    sideBar,
    sideBarTitle,
    sideBarContent,
    scrollContent,
    commonUse,
    jinrishiciSentence,
    jinrishiciAuthor,
    jinrishiciTitle,
    copyright,
    loading,
    messageList
} from "./module/dom.constant.js";

import {
    toggle
} from './module/animation.func.js';

//搜索相关函数
import {
    goSearch,
    setEngine
} from "./module/search.func.js";

//搜索智能提示函数
import {
    getSugValue,
    changeSug
} from "./module/sug.func.js";

//本地存储相关函数
import {
    setStorage,
    getStorage
} from './module/storage.func.js';

//消息提示函数
import {
    openMessage
} from "./module/message.func.js";

//阻止事件冒泡函数
import {
    stopPropagation,
    findSettingInfo
} from "./module/global.func.js";

import {
    commonWebsite,
    setCommomUse
} from "./module/website.func.js";

import {
    setBingImage,
    setCustomizeImage,
    setdefault,
    globalImage,
    WoolGlass
} from "./module/bg.func.js";

import {
    changeSkin
} from "./module/skin.func.js";

import {
    changeUI
} from "./module/ui.func.js";

import {
    openDialog,
    closeDialog
} from "./module/dialog.func.js";

import {
    renderSideBarContent
} from "./module/sideBar.func.js"
/*
    导入模块结束
 */


/*
    加载本地存储区域/自动加载区域
 */
if (bg && bg !== null && bg !== "setBingImage") {
    globalImage(bg);
    WoolGlass(bg);
}

if (bg == "setBingImage") {
    setBingImage(true);
}

if (skinHref && skinHref !== null) {
    linkTag.href = skinHref;
}

if (uiHref && uiHref !== null) {
    uiTag.href = uiHref;
}
//默认设置开启显示常用网址功能
if (showCommonUse == "undefined" || showCommonUse == undefined) {
    setStorage("showCommonUse", "website_open");
}

if (commonUseData == undefined) {
    setStorage("commonUseData", "[]");
    setCommomUse(commonData);
}

if (commonUseData && commonUseData !== null) {
    commonData = JSON.parse(commonUseData);
    setCommomUse(commonData);
}

//拼接搜索栏左侧选择引擎
jsonData.engine.forEach(element => {
    if (element.select == "selected") {
        selectEngine.innerHTML = `<img src='${element.icon}'  alt="${element.value}"><span>${element.name}</span><i class="fa fa-sort"></i>`
    }
    searchEngine += `<li id="${element.value}"><img src='${element.icon}'><span>${element.name}</span></li>`;
});
selectOption.innerHTML = `<p>请选择搜索引擎：</p><ul>${searchEngine}</ul>`;

// 动态创建侧边栏图标
for (let item in jsonData.sideBar.content) {
    if (jsonData.sideBar.content[item].show) {
        sideBarTitle.innerHTML += `<div id="${jsonData.sideBar.content[item].value}" class="title-icon" style="color:${jsonData.sideBar.content[item].color};border:3px solid ${jsonData.sideBar.content[item].color};"><i class="${jsonData.sideBar.content[item].icon}"></i><span>${jsonData.sideBar.content[item].name}</spa></div>`
    }
}

//诗词渲染
jinrishici.load(function (result) {
    jinrishiciSentence.innerHTML = result.data.content
    jinrishiciAuthor.innerHTML = `― ${result.data.origin.author}`
    jinrishiciTitle.innerHTML = `《${result.data.origin.title}》`
});

//版权信息渲染
if (jsonData.copyright.show) {
    copyright.innerHTML = `<a class="copyright" href="${jsonData.copyright.href}">${jsonData.copyright.content}</a>`
}

/*
    加载本地存储区域/自动加载区域结束
 */


/*
    事件监听/事件委托相关
 */
//监听点击事件
document.addEventListener("click", function (e) {
    //判断选择引擎
    if (e.target !== selectOption && !searchFlag) {
        selectOption.style.display = "none";
        searchFlag = !searchFlag;
    }

    if (e.target == document.querySelector("#search")) {
        getSugValue();
    }

    if (e.target !== searchList) {
        searchList.style.display = "none";
    }

    //判断侧边栏
    if (e.target !== sideBarTitle.children && e.target !== sideBarContent && sideBarIconFlag !== -1) {
        sideBar.className = "moveRight";
        sideBarButton.className = "sideBarButtonMoveRight";
        sideBarButton.innerHTML = `<i class="fa fa-bars"></i>`;
        sideBarIconFlag = -1;
    }

    //监听模态框关闭图标
    if (e.target.id == "closeDialog") {
        closeDialog();
    }

    //模态框提交
    if (e.target.id == "submitDialog") {
        let name = document.querySelector("#nameDialog").children[1].value;
        let url = document.querySelector("#urlDialog").children[1].value;
        if (name == "" || url == "") {
            openMessage({
                title: "提示",
                type: "error",
                content: `名称或URL不能为空！！！`
            })
            return;
        }
        if (url.toLowerCase().indexOf("https://") == -1 || url.toLowerCase().indexOf("http://") == -1) {
            url = `https://${url}`;
            console.log(url)
        }
        commonWebsite({
            thisWebsite: {
                name: name,
                url: url,
                color: "#000"
            },
            commonData: commonData,
            add: true
        })
        closeDialog();
    }

    //模态框取消
    if (e.target.id == "cancelDialog") {
        closeDialog();
    }

    //模态框修改
    if (e.target.id == "changeDialog") {
        let id = document.querySelector("#dialog").className;
        let name = document.querySelector("#nameDialog").children[1].value;
        commonWebsite({
            thisWebsite: {
                id: id,
                name: name
            },
            commonData: commonData,
            change: true
        })
        closeDialog();
    }

    //模态框删除
    if (e.target.id == "deleteDialog") {
        let id = document.querySelector("#dialog").className;
        commonWebsite({
            thisWebsite: {
                id: id
            },
            commonData: commonData,
            del: true
        })
        closeDialog();
    }

    //模态框点击背景隐藏
    if (e.target.id == "dialogWrapper") {
        closeDialog();
    }
});

//监听搜索按钮
searchContent.querySelector("#searchBtn").addEventListener("click", () => {
    goSearch();
})

//监听选择引擎
selectOption.addEventListener("click", (e) => {
    let thisEngine = jsonData.engine.find(item => item.value == e.target.id);
    if (thisEngine !== undefined) {
        setEngine(thisEngine);
        searchFlag = !searchFlag;
    }
})

sideBarButton.addEventListener("click", () => {
    let icon = sideBarTitle.querySelectorAll(".title-icon");
    Array.prototype.forEach.call(icon, item => {
        item.style.background = "";
        item.style.color = item.style.borderColor;
    })
    if (sideBarIconFlag == -1) {
        sideBarButton.className = "sideBarButtonMoveLeft";
        sideBarButton.innerHTML = `<i class="fa fa-mail-forward"></i>`;
        sideBar.className = "moveLeft";
        icon[0].style.background = icon[0].style.borderColor;
        icon[0].style.color = "#fff";
        sideBarIconFlag = "Website";
        renderSideBarContent("Website");
    } else {
        sideBarButton.className = "sideBarButtonMoveRight";
        sideBarButton.innerHTML = `<i class="fa fa-bars"></i>`;
        sideBar.className = "moveRight";
        sideBarIconFlag = -1;
    }
})

sideBarTitle.addEventListener("click", (e) => {
    stopPropagation();
    let icon = sideBarTitle.querySelectorAll(".title-icon");
    if (e.target.className == "title-icon") {
        Array.prototype.forEach.call(icon, item => {
            item.style.background = "";
            item.style.color = item.style.borderColor;
        })
        e.target.style.background = e.target.style.borderColor;
        e.target.style.color = "#fff";
        renderSideBarContent(e.target.id);
        sideBarIconFlag = e.target.id;
    } else {
        sideBarButton.className = "sideBarButtonMoveRight";
        sideBarButton.innerHTML = `<i class="fa fa-bars"></i>`;
        sideBar.className = "moveRight";
        sideBarIconFlag = -1;
    }
})

//网页文档加载完毕调用动画
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        toggle(loading, 40);
    }
}

//解决点击元素内部隐藏的问题
sideBarContent.addEventListener("click", (e) => {
    stopPropagation();
    let thisWebsite = {};
    for (let item of jsonData.sideBar.content[1].content) {
        thisWebsite = item.content.find(inner => inner.icon == e.target.id);
        if (thisWebsite !== undefined) {
            thisWebsite.count = 1;
            commonWebsite({
                thisWebsite: thisWebsite,
                commonData: commonData
            });
            return;
        }
    }
    switch (true) {
        case e.target.id == "setBingImage":
            setBingImage(false);
            break;
        case e.target.id == "setdefault":
            setdefault("changebg");
            break;
        case (e.target.id.indexOf("skin") !== -1):
            changeSkin("skin", findSettingInfo(e.target.id));
            break;
        case (e.target.id.indexOf("uistyle") !== -1):
            changeUI("uistyle", findSettingInfo(e.target.id));
            break;
        case (e.target.id.indexOf("website") !== -1):
            commonWebsite({
                commonData: commonData,
                status: e.target.id
            });
            break;
    }
});

//监听文件上传change事件设置背景图片
scrollContent.addEventListener("change", function (e) {
    let setBackGround = document.querySelector("#setBackGround");
    if (e.target == setBackGround) {
        setCustomizeImage(setBackGround);
    }
})

//阻止消息提示事件冒泡
messageList.addEventListener("click", (e) => {
    stopPropagation();
})

commonUse.addEventListener("click", (e) => {
    if (e.target.className == "commons-addbtn") {
        openDialog({
            title: "添加常用网址",
            content: [{
                name: "名称",
                value: "name",
                type: "input",
                defaultValue: ""
            }, {
                name: "URl",
                value: "url",
                type: "input",
                defaultValue: ""
            }],
            button: [{
                name: "确定",
                value: "submit"
            }, {
                name: "取消",
                value: "cancel"
            }]
        })
    }
    if (e.target.className == "commons-btn") {
        changeWebsiteUrl = e.target.parentNode.querySelector("a");
        openDialog({
            id: changeWebsiteUrl.id,
            title: "修改常用网址",
            content: [{
                name: "名称",
                value: "name",
                type: "input",
                defaultValue: changeWebsiteUrl.innerHTML
            }],
            button: [{
                name: "修改",
                value: "change"
            }, {
                name: "删除",
                value: "delete"
            }, {
                name: "取消",
                value: "cancel"
            }]
        })
    }
})

/*
    事件监听/事件委托相关结束
 */


/*
    键盘监听事件
 */
//监听按下键盘事件，实现按下Enter跳转搜索
document.onkeydown = function (e) {
    let event = e || event;
    if (event.keyCode == 13) {
        goSearch();
    }
}

searchContent.onkeydown = function (e) {
    let event = e || event;
    if (searchList.children.length != 0 && (event.keyCode == 38 || event.keyCode == 40)) {
        changeSug(event.keyCode)
    }
}

searchInput.onkeyup = () => {
    getSugValue();
}

/*
    键盘监听事件结束
 */


/*
    点击事件
 */
//点击选择搜索引擎事件
selectEngine.onclick = () => {
    if (searchFlag) {
        selectOption.style.display = "block";
        searchFlag = !searchFlag;
    } else {
        selectOption.style.display = "none";
        searchFlag = !searchFlag;
    }ss
    stopPropagation();
}

/*
    点击事件结束
 */


/*
    错误监听开始
 */
window.onerror = function (message, source, lineno, colno, error) {
    /* 错误信息（字符串）：message
    发生错误的脚本URL（字符串）：source
    发生错误的行号（数字）：lineno
    发生错误的列号（数字）：colno
    Error对象（对象）：error */
    openDialog({
        html: true,
        title: "抱歉，出现错误！！",
        content: `
            <p style="color:red;font-weight:bold">请复制以下代码进行反馈：</p>
            <code>${message} at ${source} in ${lineno} rows, ${colno} columns.</code>
            <br/>
            <code>${navigator.userAgent}</code>`,
        button: [{
            name: "取消",
            value: "cancel"
        }]
    })
    return true;
}
/*
    错误监听结束
 */