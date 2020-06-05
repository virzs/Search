/*
 * @Author: Vir
 * @Date: 2019-11-28 14:32:57
 * @Last Modified by: Vir
 * @Last Modified time: 2020-06-05 16:26:33
 */

//配置变量
var searchFlag = true; //搜索引标记
var sideBarIconFlag = -1; //侧边栏按钮标记
var commonData = []; //常用网址数据
var changeWebsiteUrl = "";
var advancedSettingsFlag = true;
var sug = true;
var toDoStatus = 1;

//获取本地数据
const uiHref = getStorage("uistyle");
const bg = getStorage("bg");
const commonUseData = getStorage("commonUseData");
const showCommonUse = getStorage("showCommonUse");
const customFilletValue = getStorage("customFilletValue");
const sugFlag = getStorage("sugFlag");
const todoData = getStorage("todoData");
const sentence = getStorage('sentence');
const logo = getStorage('logo');

/*
    导入模块
 */

//所有数据
import {
    jsonData,
    updateData
} from "./module/all.data.js";

//DOM元素
import {
    uiTag,
    searchContent,
    selectEngine,
    selectOption,
    searchList,
    sideBarButton,
    sideBar,
    sideBarTitle,
    sideBarContent,
    scrollContent,
    commonUse,
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
    setEngine,
    renderEngineOption
} from "./module/search.func.js";

//搜索智能提示函数
import {
    getSugValue
} from "./module/sug.func.js";

//本地存储相关函数
import {
    setStorage,
    getStorage
} from './module/storage.func.js';

//消息提示函数
import {
    openMessage
} from "./components/message.component.js";

//阻止事件冒泡函数
import {
    stopPropagation,
    getRandomColor,
    removeElement
} from "./module/global.func.js";

//网址相关函数
import {
    renderCommonUse
} from "./module/website.func.js";

//背景相关函数
import {
    setBingImage,
    setCustomizeImage,
    globalImage
} from "./module/bg.func.js";

//UI相关函数
import {
    customFillet
} from "./module/ui.func.js";

//模态框相关函数
import {
    openDialog,
    closeDialog
} from "./components/dialog.component.js";

//table组件
import {
    openTable
} from "./components/table.component.js";

//侧边栏渲染函数
import {
    renderSideBarIcon,
    renderSideBarContent,
    sideBarButtonClick
} from "./module/sideBar.func.js";

import {
    createAdvancedSettings
} from "./module/setting.func.js";

import {
    saveDATA,
    getDATA
} from "./module/dataOperations.func.js";
/*
    导入模块结束
 */

//错误事件
import windowError from './event/error.event.js';

//键盘事件
import keyEvent from './event/keyCode.event.js';

//待办事件
import {
    addToDoItem,
    completeToDoItem,
    changeToDoItemState,
    changeToDoState,
    clearToDoItem
} from './event/toDo.event.js';

//语句事件
import {
    sentenceSetting,
    logoSetting,
    uiStyleSetting,
    skinSetting,
    bgSetting,
    dataSetting
} from "./event/setting.event.js";
import {
    timeLine
} from "./components/timeLine.component.js";
import {
    handleWebsite
} from "./event/website.event.js";
import {
    handleDialogBtn
} from "./event/dialog.event.js";

/*
    加载本地存储区域/自动加载区域
 */
if (sugFlag.value !== null) {
    sug = getStorage("sugFlag").toBoolean();
} else {
    setStorage("sugFlag", true);
}

if (todoData.value == null) {
    setStorage("todoData", "[]");
}

//添加语句本地存储
if (sentence.value == null && jinrishici) {
    setStorage('sentence', 'jinrishici');
    sentenceSetting(sentence.value, jinrishici, false);
}

if (sentence.value !== null && jinrishici) {
    sentenceSetting(sentence.value, jinrishici, false);
}

if (logo.value == null) {
    setStorage('logo', 'timeLogo');
    logoSetting(getStorage('logo').value, false);
}

if (logo.value !== null) {
    logoSetting(logo.value, false);
}

if (bg.value !== null && bg.value !== "setBingImage" && bg.value !== "setdefault") {
    globalImage(bg.value);
    // WoolGlass(bg.value);
}

if (bg.value == "setBingImage") {
    setBingImage();
}

// if (skinHref.value !== null) {
//     linkTag.href = skinHref.value;
// }

if (uiHref.value !== null && customFilletValue.value == null) {
    uiTag.href = uiHref.value;
}
if (customFilletValue.value !== null) {
    customFillet(customFilletValue.value)
}
//默认设置开启显示常用网址功能
if (showCommonUse.value == null) {
    setStorage('showCommonUse', 'website_open')
    handleWebsite({}, '', false)
        .catch(err => {
            openMessage({
                title: "提示",
                type: "error",
                content: `${err.msg}`
            })
        });
}

if (commonUseData.value == null) {
    setStorage("commonUseData", "[]");
    renderCommonUse(false);
}

if (commonUseData.value !== null) {
    commonData = commonUseData.toJSON();
    renderCommonUse(false);
}

//拼接搜索栏左侧选择引擎
renderEngineOption();

// 动态创建侧边栏图标
renderSideBarIcon();

//诗词渲染


//版权信息渲染
if (jsonData.copyright.show) {
    let copyrightContent = jsonData.copyright.content;
    let nowDdate = new Date();
    copyrightContent = copyrightContent.replace("#before#", "2018");
    copyrightContent = copyrightContent.replace("#after#", nowDdate.getFullYear());
    copyrightContent = copyrightContent.replace("#author#", "Vir");
    copyright.innerHTML = `<a class="copyright" href="${jsonData.copyright.href}">${copyrightContent}</a>`
}

//网页文档加载完毕调用动画
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        toggle(loading, 40);
    }
}
/*
    加载本地存储区域/自动加载区域结束
 */


/*
    事件监听/事件委托相关
 */
document.querySelector(".switch-box").addEventListener("click", (e) => {
    if (e.target.className == "switch-label") {
        document.querySelector(".switch-content").checked = !sug
        sug = !sug
        setStorage("sugFlag", sug)
    }
})

//监听点击事件
document.addEventListener("click", function (e) {
    //判断选择引擎
    if (e.target !== selectOption &&
        !searchFlag &&
        e.target.parentNode.className !== "option-title" &&
        e.target.className !== "switch-box" &&
        e.target.className !== "switch-label") {
        selectOption.style.display = "none";
        searchFlag = !searchFlag;
    }

    if (e.target == document.querySelector("#search") && sug) {
        getSugValue();
    }

    if (e.target !== searchList) {
        searchList.style.display = "none";
    }

    //判断侧边栏
    if (e.target !== sideBarTitle.children &&
        e.target !== sideBarContent &&
        sideBarIconFlag !== -1 &&
        document.querySelector(".dialog") == null &&
        e.target.nodeName !== "A" &&
        e.target.nodeName !== "INPUT") {
        sideBar.className = "moveRight";
        sideBarButton.className = "sideBarButtonMoveRight";
        sideBarButton.innerHTML = `<i class="fa fa-bars"></i>`;
        sideBarIconFlag = -1;
    }

    //监听模态框操作
    if (e.target.getAttribute('source') == 'dialog-btn') {
        let dialogId = e.target.getAttribute('dialog-id');
        let itemSource = e.target.getAttribute('item-source');
        let itemType = e.target.getAttribute('item-type');
        let itemValue = e.target.getAttribute('item-value');
        let inputName = null;
        let inputUrl = null;
        if (document.querySelector("#nameDialog")) {
            inputName = document.querySelector("#nameDialog").children[1].value;
        }
        if (document.querySelector("#urlDialog")) {
            inputUrl = document.querySelector("#urlDialog").children[1].value;
        }
        let option = {
            id: dialogId,
            source: itemSource,
            type: itemType,
            value: itemValue
        }
        let data = {
            name: inputName,
            url: inputUrl
        }
        handleDialogBtn(option, data);
    }

    //模态框点击背景隐藏
    if (e.target.className == "dialogWrapper") {
        closeDialog();
    }

    //删除网址数据
    if (Object.is(e.target.getAttribute('item-type'), 'delete')) {
        let dialogId = e.target.getAttribute('dialog-id');
        let source = e.target.getAttribute('source');
        let itemSource = e.target.getAttribute('item-source');
        let itemType = e.target.getAttribute('item-type');
        let itemValue = e.target.getAttribute('item-value');
        console.log(e.target)
        let option = {
            id: dialogId,
            source: source,
            type: itemType,
            value: itemValue,
            itemSource: itemSource
        }
        let data = {
            source: itemSource,
        }
        handleDialogBtn(option, data);
    }
});

//点击选择搜索引擎事件
selectEngine.addEventListener("click", () => {
    if (searchFlag) {
        selectOption.style.display = "block";
        document.querySelector(".switch-content").checked = sug;
        searchFlag = !searchFlag;
    } else {
        selectOption.style.display = "none";
        searchFlag = !searchFlag;
    }
    stopPropagation();
})

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

// 监听侧边栏开启，关闭按钮
sideBarButton.addEventListener("click", () => {
    sideBarIconFlag = sideBarButtonClick(sideBarIconFlag);
})

// 监听侧边栏选项卡
sideBarTitle.addEventListener("click", (e) => {
    stopPropagation();
    let icon = sideBarTitle.querySelectorAll(".title-icon");
    if (Object.is(e.target.className, 'title-icon')) {
        Array.prototype.forEach.call(icon, item => {
            item.style.background = "";
            item.style.color = item.getAttribute('color');
        })
        e.target.style.background = e.target.getAttribute('color');
        e.target.style.color = "#fff";
        renderSideBarContent(e.target.id);
        if (Object.is(e.target.id, 'ToDo')) {
            sideBarContent.style.overflow = "hidden";
            sideBarContent.scrollTop = 0;
            document.querySelector("#toDoContent").style.height = `${document.body.clientHeight - 184}px`;
        } else {
            sideBarContent.style.overflow = "auto";
        }
        sideBarIconFlag = e.target.id;
    } else {
        sideBarButton.className = "sideBarButtonMoveRight";
        sideBarButton.innerHTML = `<i class="fa fa-bars"></i>`;
        sideBar.className = "moveRight";
        sideBarIconFlag = -1;
    }
})

// 监听侧边栏内操作
sideBarContent.addEventListener("click", (e) => {
    stopPropagation();
    switch (true) {
        //侧边栏点击书签操作
        case e.target.getAttribute('item-type') == 'commons':
            //常用网址计数
            handleWebsite({
                name: e.target.id,
                source: e.target.getAttribute('item-type')
            }, 'count').catch(err => {
                openMessage({
                    title: "提示",
                    type: "error",
                    content: `${err.msg}`
                })
            });
            break;
        case e.target.getAttribute('item-type') == 'changebg':
            bgSetting(e.target.id, true);
            break;
            // 配色设置
        case e.target.getAttribute('item-type') == 'skin':
            skinSetting(e.target.id, true);
            break;
            // UI设置
        case e.target.getAttribute('item-type') == 'uistyle':
            uiStyleSetting(e.target.id, true);
            break;
            //Logo设置
        case e.target.getAttribute('item-type') == 'logoStyle':
            logoSetting(e.target.id, true);
            break;
            //语句设置
        case e.target.getAttribute('item-type') == 'sentence':
            sentenceSetting(e.target.id, jinrishici, true);
            break;
        case e.target.getAttribute('item-type') == 'updateRecord':
            openDialog({
                id: e.target.id,
                title: '更新记录',
                option: {
                    type: 'text',
                    height: '300px'
                },
                content: timeLine(updateData, {
                    order: 'inverted'
                })
            })
            break;
            // 开启关闭常用网址功能
        case e.target.getAttribute('item-type') == 'changeCommonUse':
            if (e.target.id == getStorage('showCommonUse').value) {
                openMessage({
                    title: "提示",
                    type: "error",
                    content: `请勿重复选择`
                })
                return;
            }
            setStorage('showCommonUse', e.target.id);
            handleWebsite({}, '', true)
                .catch(err => {
                    openMessage({
                        title: "提示",
                        type: "error",
                        content: `${err.msg}`
                    })
                });
            break;
            // 添加网址
        case e.target.getAttribute('item-type') == 'addCapsule':
            openDialog({
                id: e.target.id,
                source: 'addCapsule',
                title: "添加自定义网址",
                option: {
                    type: "form",
                    content: [{
                        name: "名称",
                        value: "name",
                        type: "input",
                        defaultValue: ""
                    }, {
                        name: "URL",
                        value: "url",
                        type: "input",
                        defaultValue: ""
                    }]
                },
                button: [{
                    name: "检查",
                    type: "warning",
                    value: "check"
                }, {
                    name: "保存",
                    type: "primary",
                    value: "submit"
                }, {
                    name: "取消",
                    type: "default",
                    value: "cancel"
                }]
            })
            break;
            //数据管理设置
        case Object.is(e.target.getAttribute('item-type'), 'dataManagement'):
            dataSetting(e.target.getAttribute('item-value'));
            break;
            //备份数据
        case e.target.id == "backupData":
            saveDATA({
                uistyle: getStorage("uistyle").value,
                sugFlag: getStorage("sugFlag").value,
                skin: getStorage("skin").value,
                showCommonUse: getStorage("showCommonUse").value,
                commonUseData: getStorage("commonUseData").toJSON(),
                sideBarWebsiteData: getStorage("sideBarWebsiteData").toJSON(),
                todoData: getStorage("todoData").toJSON(),
                searchHistory: getStorage("searchHistory").toJSON()
            })
            break;
            //恢复数据
        case e.target.id == "recoveryData":
            getDATA().then(resolve => {
                let data = JSON.parse(resolve.data);
                setStorage("uistyle", data.uistyle);
                setStorage("sugFlag", data.sugFlag);
                setStorage("skin", data.skin);
                setStorage("showCommonUse", JSON.stringify(data.showCommonUse));
                setStorage("commonUseData", JSON.stringify(data.commonUseData));
                setStorage("sideBarWebsiteData", JSON.stringify(data.sideBarWebsiteData));
                setStorage("todoData", JSON.stringify(data.todoData));
                setStorage("searchHistory", JSON.stringify(data.searchHistory));
                location.reload(true); //刷新页面
                openMessage({
                    title: "提示",
                    type: "success",
                    content: `${resolve.msg}`
                })
            }).catch(reject => {
                openMessage({
                    title: "提示",
                    type: "error",
                    content: `${reject.msg}`
                })
            })
            break;
            // 高级设置显示隐藏
        case e.target.id == "advancedSettings":
            if (advancedSettingsFlag == true) {
                createAdvancedSettings();
                advancedSettingsFlag = !advancedSettingsFlag;
            } else {
                removeElement(".advanced-settings-content");
                advancedSettingsFlag = !advancedSettingsFlag;
            }
            break;
            //提交待办事项
        case e.target.id == "submitToDo":
            addToDoItem(e.target);
            break;
            //点击完成待办事项
        case (e.target.className == "list-item" && toDoStatus == 1):
            completeToDoItem(e.target);
            break;
            //切换待办
        case e.target.getAttribute("status") == 1:
            toDoStatus = changeToDoState(e.target, 1);
            break;
            //切换至已完成
        case e.target.getAttribute("status") == 2:
            toDoStatus = changeToDoState(e.target, 2);
            break;
            //删除待办
        case e.target.className == "item-del":
            changeToDoItemState(e.target, 'delete');
            break;
            //撤销待办
        case e.target.className == "item-cancel":
            changeToDoItemState(e.target, 'cancel');
            break;
            //清空已完成内容
        case e.target.id == "clearToDo":
            clearToDoItem()
            break;
    }
});

// 监听文件上传change事件设置背景图片
scrollContent.addEventListener("change", function (e) {
    let setBackGround = document.querySelector("#setBackGround");
    if (e.target == setBackGround) {
        setCustomizeImage(setBackGround);
    }
    if (e.target.parentNode.className == "advanced-settings-input") {
        customFillet(e.target.value);
        setStorage("uistyle", "null");
    }
})

// 阻止消息提示事件冒泡
messageList.addEventListener("click", (e) => {
    stopPropagation();
})

// 监听常用网址中相关操作
commonUse.addEventListener("click", (e) => {
    switch (true) {
        //点击常用网址计数
        case e.target.getAttribute('item-type') == 'commons':
            handleWebsite({
                    id: e.target.id,
                    source: e.target.getAttribute('item-type')
                }, 'count')
                .catch(err => {
                    openMessage({
                        title: "提示",
                        type: "error",
                        content: `${err.msg}`
                    })
                });
            break;
            //常用网址弹窗
        case e.target.getAttribute('item-type') == 'commons-btn':
            let value = e.target.getAttribute('item-value');
            changeWebsiteUrl = e.target.parentNode.querySelector("a");
            if (value == 'add') {
                openDialog({
                    title: "添加常用网址",
                    source: "commons",
                    option: {
                        type: "form",
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
                        }]
                    },
                    button: [{
                        name: "检查",
                        type: "warning",
                        value: "check"
                    }, {
                        name: "确定",
                        type: "primary",
                        value: "submit"
                    }, {
                        name: "取消",
                        type: "default",
                        value: "cancel"
                    }]
                })
            }
            if (value == 'handle') {
                openDialog({
                    id: changeWebsiteUrl.id,
                    source: "commons",
                    title: "修改常用网址",
                    option: {
                        type: "form",
                        content: [{
                            name: "名称",
                            value: "name",
                            type: "input",
                            defaultValue: changeWebsiteUrl.innerHTML
                        }],
                    },
                    button: [{
                        name: "修改",
                        type: "warning",
                        value: "change"
                    }, {
                        name: "删除",
                        type: "danger",
                        value: "delete"
                    }, {
                        name: "取消",
                        type: "default",
                        value: "cancel"
                    }]
                })
            }
            break;
    }
})

/*
    事件监听/事件委托相关结束
 */


/*
    键盘监听事件
 */
//监听按下键盘事件，实现按下Enter跳转搜索
keyEvent(sug);

/*
    键盘监听事件结束
 */


/*
    错误监听开始
 */
windowError();
/*
    错误监听结束
 */