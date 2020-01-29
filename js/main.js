/*
 * @Author: VirZhang
 * @Date: 2019-11-28 14:32:57
 * @Last Modified by: VirZhang
 * @Last Modified time: 2020-01-29 10:06:50
 */

//配置变量
var url = "./data/index.json"; //json文件路径
var jsonData = {}; //获取的json文件数据
var searchEngine = ""; //搜索框左侧选择搜索引擎数据
var sideBarIconFlag = -1; //侧边栏按钮标记
var searchFlag = true; //搜索引标记
var skin_Transparent = ""; //透明皮肤数据
var commonData = []; //常用网址数据
var sugIndex = -1; //备选项下标
var sugFlag = true; //备选项标记
var userDefaultCommonsData = []; //用户自定义网址数据

//获取的DOM元素/全局静态DOM元素
const body = document.querySelector("body");
const linkTag = document.querySelector("#skinTag");
const uiTag = document.querySelector("#uiTag");
const searchContent = document.querySelectorAll(".search-content")[0]
const selectEngine = document.querySelector("#selectEngine"); //搜索框左侧选择引擎标签
const selectOption = document.querySelector("#selectOption"); //搜索引擎数据
const searchInput = document.querySelector("#search"); //搜索输入框
const searchList = document.querySelector("#searchList"); //搜索时显示的相关信息列表
const sideBar = document.querySelector("#sideBar"); //侧边栏
const sideBarTitle = document.querySelector("#sideBarTitle") //侧边栏图标区域
const sideBarContent = document.querySelector("#sideBarContent"); //侧边栏内容
const scrollContent = document.querySelector("#scrollContent"); //侧边栏滚动内容
const commonUse = document.querySelector("#commonUse");
const jinrishiciSentence = document.querySelector("#jinrishiciSentence"); //诗词内容
const jinrishiciAuthor = document.querySelector("#jinrishiciAuthor"); //诗词作者
const jinrishiciTitle = document.querySelector("#jinrishiciTitle"); //诗词名
const copyright = document.querySelector("#copyright"); //版权说明
const loading = document.querySelector("#loading");
const messageList = document.querySelector("#messageList")

//获取本地数据
const skinHref = getStorage("skin");
const uiHref = getStorage("uistyle");
const bg = getStorage("bg");
const commonUseData = getStorage("commonUseData");
const showCommonUse = getStorage("showCommonUse");
const userDefaultCommonsStorageData = getStorage("userDefaultCommonsData")


/*
    ajax同步获取json文件数据
 */
$.ajax({
    type: "get",
    url: url,
    dataType: "json",
    async: false,
    success: function (response) {
        jsonData = response;
    }
});


/*
    加载本地存储区域/自动加载区域
 */
if (bg && bg !== null) {
    body.style.backgroundImage = `url('${bg}')`;
}
if (skinHref && skinHref !== null) {
    linkTag.href = skinHref;
}
if (uiHref && uiHref !== null) {
    uiTag.href = uiHref;
}
//默认设置开启显示常用网址功能
if (showCommonUse == "undefined" || showCommonUse == undefined) {
    setStorage("showCommonUse", "open");
}
if (commonUseData && commonUseData !== null) {
    commonData = JSON.parse(commonUseData);
    setCommomUse(commonData)
}

if (showCommonUse == "custom" && (userDefaultCommonsStorageData == undefined || JSON.parse(userDefaultCommonsStorageData).length == 0)) {
    commonUse.innerHTML = addCommonsData();
} else if (showCommonUse == "custom") {
    userDefaultCommonsData = JSON.parse(userDefaultCommonsStorageData);
    commonsRender();
}

//拼接搜索栏左侧选择引擎
jsonData.engine.forEach(element => {
    if (element.select == "selected") {
        selectEngine.innerHTML = `<img src='${element.icon}'  alt="${element.value}"><span>${element.name}</span><i class="fa fa-sort"></i>`
    }
    searchEngine += `<li onclick="setEngine('${element.value}')"><img src='${element.icon}'><span>${element.name}</span></li>`;
});
selectOption.innerHTML = searchEngine;

// 动态创建侧边栏图标
for (let item in jsonData.sideBar.content) {
    if (jsonData.sideBar.content[item].show) {
        sideBarTitle.innerHTML += `<div id="${jsonData.sideBar.content[item].name}" class="title-icon" style="color:${jsonData.sideBar.content[item].color};"><i class="${jsonData.sideBar.content[item].icon}"></i></div>`
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

//渲染侧边栏数据
Array.prototype.forEach.call(sideBarTitle.children, item => {
    item.onclick = () => {
        if (sideBarIconFlag == item.id) {
            sideBar.className = "moveRight";
            sideBarIconFlag = -1
            return;
        }
        switch (item.id) {
            case "Gaming":
                scrollContent.innerHTML = "加班加点摸鱼中，敬请期待";
                sideBarIconFlag = item.id;
                break;
            case "Website":
                scrollContent.innerHTML = createWebsite();
                sideBarIconFlag = item.id;
                break;
            case "Setting":
                scrollContent.innerHTML = createSetting();
                sideBarIconFlag = item.id;
                break;
        }
        sideBar.className = "moveLeft";
        stopPropagation()
    }
})

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
//监听点击事件
document.addEventListener("click", function (e) {
    //判断选择引擎
    if (e.target !== selectOption && !searchFlag) {
        selectOption.style.display = "none";
        searchFlag = !searchFlag
    }

    if (e.target !== searchList) {
        searchList.style.display = "none"
    }

    //判断侧边栏
    if (e.target !== sideBarTitle.children && e.target !== sideBarContent && sideBarIconFlag !== -1) {
        sideBar.className = "moveRight";
        sideBarIconFlag = -1;
    }
});

//解决点击元素内部隐藏的问题
sideBarContent.addEventListener("click", (e) => {
    stopPropagation();
});

//监听文件上传change事件设置背景图片
scrollContent.addEventListener("change", function (e) {
    let setBackGround = document.querySelector("#setBackGround")
    if (e.target == setBackGround) {
        let file = setBackGround.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            let data = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'
            let func = () => {
                body.style.backgroundImage = `url('${data}')`;
            }
            // 将文件大小转化成MB
            let size = (file.size / (1024 * 1024)).toFixed(2);
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                openMessage({
                    title: "提示",
                    type: "error",
                    content: `不是有效的图片文件!`
                })
                setBackGround.value = "";
                return;
            }
            if (file.size > 3145728) {
                openMessage({
                    title: "提示",
                    type: "error",
                    content: `当前文件大小为${size}MB，建议不超过3MB！`
                })
                setBackGround.value = "";
                return;
            }
            setStorageBefore(func, "bg", data);
            changeSkin("skin", skin_Transparent)
        };
        // 以DataURL的形式读取文件:
        reader.readAsDataURL(file);
    }
})

//阻止消息提示事件冒泡
messageList.addEventListener("click", (e) => {
    stopPropagation();
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
    // 箭头向上 38/箭头向下40
    // if (event.keyCode == 229) {
    //     sugFlag = false;
    // }
    if (searchList.children.length != 0 && (event.keyCode == 38 || event.keyCode == 40)) {
        changeSug(event.keyCode)
    }
}

searchInput.onkeyup = () => {
    getSugValue(sugFlag);
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
        selectOption.style.display = "block"
        searchFlag = !searchFlag
    } else {
        selectOption.style.display = "none"
        searchFlag = !searchFlag
    }
    stopPropagation()
}

/*
    点击事件结束
 */


/*
    业务逻辑函数
 */

//阻止事件冒泡
function stopPropagation(e) {
    var ev = e || window.event;
    if (ev.stopPropagation) {
        ev.stopPropagation();
    } else if (window.event) {
        window.event.cancelBubble = true; //兼容IE，根本用不到，本来就没打算兼容IE
    }
}

// 获取本地存储内容
function getStorage(key) {
    let value = window.localStorage.getItem(key);
    return value;
}

//加载动画
function toggle(elemt, speed) {
    speed = speed || 16.6; //默认速度为16.6ms
    elemt.style.display = "block"
    if (elemt.style.opacity == 1 || elemt.style.opacity != null) {
        let num = 20;
        let timer = setInterval(function () {
            num--;
            elemt.style.opacity = num / 20;
            if (num <= 0) {
                clearInterval(timer);
                elemt.style.display = "none"
            }
        }, speed);
    }
}

//设置本地存储
function setStorage(name, value) {
    window.localStorage.setItem(name, value);
}

//执行本地存储前动画效果
function setStorageBefore(set, name, href) {
    let num = 0
    let speed = 60

    function opacity() {
        loading.style.opacity = num / 20;
    }
    loading.style.display = "block"
    let timer = setInterval(function () {
        num++;
        opacity();
        if (num >= 20) {
            let timer2 = setInterval(function () {
                num--;
                opacity();
                if (num <= 0) {
                    clearInterval(timer2);
                    loading.style.display = "none"
                }
            }, speed);
            clearInterval(timer);
            setTimeout(set, speed);
            if (name && href) {
                setStorage(name, href)
            }
        }
    }, speed);
}

//恢复默认
function setdefault(type) {
    if (type == "changebg" && getStorage("skin") !== './css/skin/skin_SunsetBeach.css') {
        let defaultSkin = () => {
            window.localStorage.removeItem("bg");
            body.style.removeProperty("background-image");
            setStorage('skin', './css/skin/skin_SunsetBeach.css');
        }
        setStorageBefore(defaultSkin);
    } else {
        openMessage({
            title: "提示",
            type: "error",
            content: "当前已为默认！"
        })
    }
}

//渲染搜索引擎备选项
function setEngine(value) {
    let engineValue = jsonData.engine.find(item => item.value == value)
    selectEngine.innerHTML = `<img src='${engineValue.icon}' alt="${engineValue.value}"><span>${engineValue.name}</span><i class="fa fa-sort"></i>`
    selectOption.style.display = "none"
    searchFlag = !searchFlag
}

//搜索事件
function goSearch() {
    let value = searchInput.value; //获取输入框的值
    let engineValue = selectEngine.childNodes[0].alt; //获取选择的搜索引擎
    let searchHref = ''; //定义搜索链接变量
    jsonData.engine.forEach((item) => {
        if (item.value == engineValue) {
            searchHref = item.href;
        }
    })
    window.location.href = searchHref + value; //拼接搜索链接
}

//切换配色
function changeSkin(skinName, value) {
    if (getStorage("skin") == value && value !== "./css/skin/skin_Transparent.css") {
        openMessage({
            title: "提示",
            type: "error",
            content: "请勿重复选择配色！！！"
        });
        return;
    }
    let setHref = () => {
        linkTag.href = value;
    }
    setStorageBefore(setHref, skinName, value);
}

//切换ui风格
function changeUI(uiName, value) {
    if (getStorage("uistyle") == value) {
        openMessage({
            title: "提示",
            type: "error",
            content: "请勿重复选择UI风格！！！"
        })
        return;
    }
    let setHref = () => {
        uiTag.href = value;
    }
    setStorageBefore(setHref, uiName, value);
}

//添加常用书签
function addCommonUse(name, href, color, status) {
    if (status !== undefined && status == getStorage("showCommonUse")) {
        let info = "";
        switch (status) {
            case "open":
                info = "开启";
                break;
            case "close":
                info = "关闭";
                break;
            case "custom":
                info = "自定义";
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
    let recent = commonData.find(item => item.name == name)
    if (recent == undefined && status == undefined) {
        commonData.push({
            "name": name,
            "href": href,
            "color": color,
            "count": 1
        })
    } else if (status == undefined) {
        commonData.forEach(item => {
            if (item.name == recent.name) {
                item.count += 1;
            }
        })
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
    data.forEach((item, index) => {
        if (index < 8) {
            commonHtml += `<div class="commons"><a href="${item.href}" target="_blank" style="color:${item.color}"><div>${item.name.substr(0, 1)}</div><p>${item.name}</p></a></div>`;
        }
    })
    if (getStorage("showCommonUse") == "open" || status == "open") {
        display = () => {
            commonUse.style.display = "flex";
        }
    } else if (getStorage("showCommonUse") == "close" || status == "close") {
        display = () => {
            commonUse.style.display = "none";
        }
    } else {
        display = () => {
            commonUse.style.display = "flex";
        }
    }
    if (isShow) {
        commonUse.style.display = "none";
        setStorageBefore(display);
    } else if (getStorage("showCommonUse") == "close" && !isShow) {
        commonUse.style.display = "none";
    }
    if (getStorage("showCommonUse") == "custom") {
        commonHtml = renderUserData() + addCommonsData();
    }
    commonUse.innerHTML = commonHtml;
}

//创建书签数据
function createWebsite() {
    let websiteInfo = "",
        sideBarHtml = "";
    jsonData.sideBar.content[1].content.forEach(item => {
        if (item.show) {
            websiteInfo += `<p><i class="${item.icon}"></i>  ${item.name}</p>`;
            item.content.forEach(inner => {
                if (inner.show) {
                    sideBarHtml += `<div onclick="addCommonUse('${inner.name}','${inner.href}','${inner.color}')" class="capsule" style="border:2px solid ${inner.color};"><a style="color:${inner.color};" href='${inner.href}' target="_blank"><span>${inner.name}</span></a></div>`;
                }
            })
            websiteInfo = websiteInfo + sideBarHtml;
            sideBarHtml = "";
        }
    })
    return websiteInfo;
}

//判断渲染设置项
function createHtml(inner) {
    let sideBarHtml = "";
    if (!inner.type) {
        sideBarHtml = `<div class="setlist" style="border:2px solid ${inner.color};"><span><i class="${inner.icon}"></i>  ${inner.name}：</span><span>${inner.content}</span></div>`;
    }
    if (inner.type == "skin" && inner.value !== "skin_Transparent") {
        sideBarHtml = `<div onclick="changeSkin('${inner.type}','${inner.href}')" class="setlist" style="border:2px solid ${inner.color};"><span><i class="${inner.icon}"></i>  ${inner.name}</span></div>`;
    }
    if (inner.type == "uistyle") {
        sideBarHtml = `<div onclick="changeUI('${inner.type}','${inner.href}')" class="setlist" style="border:2px solid ${inner.color};">${inner.name}</div>`;
    }
    if (inner.type == "changebg" && inner.value == "changebg") {
        sideBarHtml += `<div class="setlist" style="border:2px solid ${inner.color};"><a href="javascript:;" class="changebg">更换背景<input id="setBackGround" type="file"></a></div>`;
    }
    if (inner.type == "changebg" && inner.value == "setdefault") {
        sideBarHtml += `<div onclick="setdefault('${inner.type}')" class="setlist" style="border:2px solid ${inner.color};">${inner.name}</div>`;
    }
    if (inner.type == "changeCommonUse") {
        sideBarHtml += `<div onclick="addCommonUse('','','','${inner.value}')" class="setlist" style="border:2px solid ${inner.color};">${inner.name}</div>`;
    }
    if (inner.type == "thanks") {
        sideBarHtml += `<a href="${inner.href}" target="_blank"><div class="setlist" style="border:2px solid ${inner.color};">${inner.name}</div></a>`;
    }
    return sideBarHtml;
}

//创建设置项数据
function createSetting() {
    let settingInfo = "",
        sideBarHtml = "";
    //令人窒息的代码，等回头再做优化，先实现功能
    jsonData.sideBar.content[2].content.forEach(item => {
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

function openMessage(value) {
    let iconType = ""
    switch (value.type) {
        case "success":
            iconType = "fa-check"
            break;
        case "error":
            iconType = "fa-close"
        default:
            break;
    }
    //动态添加多个消息需要单独创建
    let li = document.createElement("li");
    let icon = document.createElement("div");
    let iconi = document.createElement("i");
    let div = document.createElement("div");
    let title = document.createElement("p");
    let content = document.createElement("p");
    let close = document.createElement("i");
    li.setAttribute("class", "messageMoveLeft");
    li.appendChild(icon);
    icon.setAttribute("class", value.type);
    icon.appendChild(iconi);
    iconi.classList.add("fa", iconType);
    li.appendChild(div);
    div.appendChild(title);
    title.innerHTML = value.title;
    div.appendChild(content);
    content.innerHTML = value.content;
    li.appendChild(close);
    close.classList.add("close", "fa", "fa-close");
    close.addEventListener("click", () => {
        closeMessage(li);
    })
    messageList.appendChild(li);
    if (!value.timing || value.timing !== null) {
        setTimeout(() => {
            closeMessage(li)
        }, 3000)
    }
    // messageList.innerHTML = `<li class="messageMoveLeft">${icon}<div><p>${value.title}</p><p>${value.content}</p></div><i onclick="closeMessage()" class="close fa fa-close"></i></li>`;
}

//弹窗关闭事件
function closeMessage(elemt) {
    elemt.className = "messageMoveRight";
    if (!elemt) {
        stopPropagation();
    }
    if (elemt.parentNode) {
        setTimeout(() => {
            elemt.parentNode.removeChild(elemt)
        }, 500)
    }
}

function getSugValue(Flag) {
    let engineValue = selectEngine.childNodes[0].alt; //获取选择的搜索引擎
    let engine = jsonData.engine.find(item => item.value == engineValue);
    let [href, sugurl] = [engine.href, engine.sugurl];
    let value = searchInput.value; //获取输入框的值
    if (!Flag) {
        sugFlag = !sugFlag;
        return;
    }
    if (value == "") {
        searchList.innerHTML = "";
        searchList.style.display = "none";
        return;
    }
    sugurl = sugurl.replace("#content#", value);
    window.google = {
        ac: {
            h: function (json) {
                sugValue(href, json[1])
            }
        }
    }
    window.bing = {
        sug: function (json) {
            let sugList = ""
            if (json.AS.Results !== undefined && json.AS.Results[0].Suggests !== undefined) {
                sugList = json.AS.Results[0].Suggests
            }
            sugValue(href, sugList);
        }
    }
    window.baidu = {
        sug: function (json) {
            sugValue(href, json.s)
        }
    }
    window.sogou = {
        sug: function (json) {
            sugValue(href, json[1])
        }
    }
    let script = document.createElement("script");
    script.src = sugurl;
    document.querySelector("head").appendChild(script);
    document.querySelector("head").removeChild(script);
    sugIndex = -1;
}

//备选项/智能提示函数
function sugValue(href, value) {
    let sugList = "";
    if (value.length == 0) {
        return;
    }
    value.forEach(item => {
        if (typeof item == "string") {
            sugList += `<li><a href="${href}${item}">${item}</a></li>`
        } else if (typeof item == "object" && item.Txt !== undefined) {
            sugList += `<li><a href="${href}${item.Txt}">${item.Txt}</a></li>`
        } else {
            sugList += `<li><a href="${href}${item[0]}">${item[0]}</a></li>`
        }
    })
    searchList.innerHTML = sugList;
    searchList.style.display = "block";
}

//选择备选搜索
function changeSug(keyCode) {
    sugFlag = false;
    Array.prototype.forEach.call(searchList.children, (item, index) => {
        searchList.children[index].className = "";
    })
    if (keyCode == 38 && sugIndex >= 0) {
        sugIndex--;
    }
    if (keyCode == 40 && sugIndex <= searchList.children.length) {
        sugIndex++;
    }
    if (sugIndex < 0) {
        sugIndex = searchList.children.length - 1;
    }
    if (sugIndex >= searchList.children.length) {
        sugIndex = 0;
    }
    if (sugIndex == -1) {
        searchList.children[0].className = "selectSug";
    }
    searchList.children[sugIndex].className = "selectSug";
    searchInput.value = searchList.children[sugIndex].children[0].text;
}

//开启添加网址弹窗
function openCommonsAdd() {
    let commonsAdd = document.querySelectorAll(".commons");
    let template = document.createElement("div");
    template.innerHTML = `<div>添加常用网址</div><div><span>名称</span><input id="commonName" placeholder="请输入名称" /></div><div><span>URL</span><input id="commonUrl" placeholder="请输入URL" /></div><div><button onclick="commonsCancel()">取消</button><button onclick="commonsSubmit()">确定</button></div>`
    template.setAttribute("class", "commons-add");
    commonsAdd[commonsAdd.length - 1].appendChild(template);
}

//开启设置网址弹窗
function openCommonSetting() {
    let num = 0;
    let thisCommon = window.event.target.parentNode.parentNode;
    let setting = thisCommon.querySelector(".commons-setting");
    let timer = setInterval(() => {
        num++;
        if (num <= 20) {
            setting.style.opacity = num / 20;
        } else {
            clearInterval(timer);
        }
    }, 20);
}

//提交网址
function commonsSubmit() {
    let commonName = document.querySelector("#commonName");
    let commonUrl = document.querySelector("#commonUrl");
    if (commonName.value == "" || commonUrl.value == "") {
        openMessage({
            title: "提示",
            type: "error",
            content: `名称或URL不能为空！！！`
        })
        return;
    }
    if (userDefaultCommonsData == null) {
        userDefaultCommonsData = [];
    }
    userDefaultCommonsData.push({
        name: commonName.value,
        url: commonUrl.value
    });
    setStorage("userDefaultCommonsData", JSON.stringify(userDefaultCommonsData));
    commonsRender(commonName.value, commonUrl.value);
}

//取消添加网址弹窗
function commonsCancel() {
    let commonName = document.querySelector("#commonName");
    let commonUrl = document.querySelector("#commonUrl");
    commonName.value = "", commonUrl.value = "";
}

//修改网址
function commonsChange(name) {
    console.log("重命名", name);
}

//删除网址
function commonsDelete(name) {
    let deleteData = userDefaultCommonsData.findIndex(item => item.name == name);
    userDefaultCommonsData.splice(deleteData, 1);
    setStorage("userDefaultCommonsData", JSON.stringify(userDefaultCommonsData));
    commonsRender();
}

//渲染自定义网址数据
function commonsRender(name, url) {
    let data = "";
    if (name !== undefined && url !== undefined) {
        data = renderUserData();
    } else {
        data = renderUserData();
    }
    commonUse.innerHTML = data + addCommonsData();
}

//依据数据源渲染
function renderUserData() {
    let data = "";
    if (userDefaultCommonsData !== null) {
        userDefaultCommonsData.forEach((item, index) => {
            data += renderData(item.name, item.url);
        })
    }
    console.log(data)
    return data;
}

//添加网址模板
function addCommonsData() {
    return `<div class="commons"><div class="commons-addbtn" onclick="openCommonsAdd()"><i class="fa fa-plus"></i></div>
</div>`
}
//自定义网址模板
function renderData(name, url) {
    return `<div class="commons"><div class="commons-content"><img src="chrome-search://ntpicon/?size=48@1.250000x&url=${url}"></img><a href="${url}">${name}</a></div><div class="commons-btn" onclick="openCommonSetting('${name}')"><i class="fa fa-ellipsis-h"></i><div class="commons-setting"><div onclick="commonsChange('${name}')"><i class="fa fa-edit"></i>重命名</div><div onclick="commonsDelete('${name}')"><i class="fa fa-trash-o"></i>删除</div></div></div></div>`
}
/*
    业务逻辑函数结束
 */


//废弃代码


//监听鼠标按下事件，实现点击空白处关闭侧边栏
// document.onmousedown = function (e) {
//     let event = e || event;
//     if ((window.screen.width - e.screenX > 390 || (window.screen.width - e.screenX > 340 && e.screenY > 180)) && sideBar.className == "moveLeft") {
//         sideBar.className = "moveRight";
//         sideBarIconFlag = -1;
//     }
// }

//备选项列表，仅支持百度代码
// 百度搜索参数测试
// searchInput.onkeyup = function () {
//     var val = searchInput.value;
//     var oScript = document.createElement("script"); //动态创建script标签
//     oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`;
//     //添加链接及回调函数
//     document.body.appendChild(oScript); //添加script标签
//     document.body.removeChild(oScript); //删除script标签
// }

//回调函数
// function callback(data) {
//     var str = "";
//     for (var i = 0; i < data.s.length; i++) {
//         str += `<li><a href=\"https://www.baidu.com/s?wd=${data.s[i]}\">${data.s[i]}</a></li>`;
//     }
//     searchList.innerHTML = str;
//     searchList.style.display = "block";
// }