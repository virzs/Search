/*
 * @Author: VirZhang
 * @Date: 2019-11-28 14:32:57
 * @Last Modified by: VirZhang
 * @Last Modified time: 2020-01-16 15:27:31
 */

//配置变量
var url = "./data/index.json"; //json文件路径
var jsonData = {}; //获取的json文件数据
var searchEngine = ""; //搜索框左侧选择搜索引擎数据
var sideBarIconFlag = -1 //侧边栏按钮标记
var searchFlag = true
var skin_Transparent = ""
var commonData = []

//获取的DOM元素
const body = document.querySelector("body");
const linkTag = document.querySelector("#skinTag");
const uiTag = document.querySelector("#uiTag");
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

//获取本地数据
const skinHref = getStorage("skin");
const uiHref = getStorage("uistyle");
const bg = getStorage("bg");
const commonUseData = getStorage("commonUseData");
const showCommonUse = getStorage("showCommonUse");


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
    加载本地存储区域
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
if (commonUseData && commonUseData !== null) {
    commonData = JSON.parse(commonUseData);
    setCommomUse(commonData)
}


//拼接搜索栏左侧选择引擎
jsonData.engine.forEach(element => {
    if (element.select == "selected") {
        selectEngine.innerHTML = `<img src='${element.icon}'  alt="${element.value}"><span>${element.name}</span><i class="fa fa-sort"></i>`
    }
    searchEngine += `<li onclick="setEngine('${element.value}')"><img src='${element.icon}'><span>${element.name}</span></li>`;
});
selectOption.innerHTML = searchEngine;

//监听点击事件
document.addEventListener("click", function (e) {
    //判断选择引擎
    if (e.target !== selectOption && !searchFlag) {
        selectOption.style.display = "none";
        searchFlag = !searchFlag
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

//监听按下键盘事件，实现按下Enter跳转搜索
document.onkeydown = function (e) {
    let event = e || event;
    if (event.keyCode == 13) {
        goSearch();
    }
}

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

//设置背景图片
scrollContent.addEventListener("change", function (e) {
    let setBackGround = document.querySelector("#setBackGround")
    if (e.target == setBackGround) {
        let file = setBackGround.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            let data = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'
            setStorageBefore("bg", data);
            changeSkin("skin", skin_Transparent)
            body.style.backgroundImage = `url('${data}')`;
        };
        // 以DataURL的形式读取文件:
        reader.readAsDataURL(file);
    }
})

//恢复默认
function setdefault(type) {
    if (type == "changebg") {
        setStorageBefore();
        window.localStorage.removeItem("bg");
        body.style.removeProperty("background-image");
        changeSkin('skin', './css/skin/skin_SunsetBeach.css');
    }
}

//阻止事件冒泡
function stopPropagation(e) {
    var ev = e || window.event;
    if (ev.stopPropagation) {
        ev.stopPropagation();
    } else if (window.event) {
        window.event.cancelBubble = true; //兼容IE，根本用不到，本来就没打算兼容IE
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
    let setHref = () => {
        linkTag.href = value
    }
    setStorageBefore(setHref, skinName, value)
}

//切换ui风格
function changeUI(uiName, value) {
    let setHref = () => {
        uiTag.href = value
    }
    setStorageBefore(setHref, uiName, value)
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

//添加常用书签
function addCommonUse(name, href, color, status) {
    let recent = commonData.find(item => item.name == name)
    if (recent == undefined && typeof status !== 'boolean') {
        commonData.push({
            "name": name,
            "href": href,
            "color": color,
            "count": 1
        })
    } else if (typeof status !== 'boolean') {
        commonData.forEach(item => {
            if (item.name == recent.name) {
                item.count += 1
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

function setCommomUse(data, status) {
    let commonHtml = ""
    let display = ""
    if (status !== undefined) {
        setStorage("showCommonUse", status)
    }
    data.forEach((item, index) => {
        if (index < 8) {
            commonHtml += `<div class="commons"><a href="${item.href}" target="_blank" style="color:${item.color}"><div>${item.name.substr(0, 1)}</div><p>${item.name}</p></a></div>`
        }
    })
    if (getStorage("showCommonUse") == "true" || getStorage("showCommonUse") == undefined || status == true) {
        display = () => {
            commonUse.style.display = "flex";
        }
    } else {
        display = () => {
            commonUse.style.display = "none";
        }
    }
    if (status !== undefined) {
        setStorageBefore(display);
    }
    commonUse.innerHTML = commonHtml
}

//加载动画
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        toggle(loading, 40);
    }
}

// 动态创建侧边栏图标
for (let item in jsonData.sideBar.content) {
    if (jsonData.sideBar.content[item].show) {
        sideBarTitle.innerHTML += `<div id="${jsonData.sideBar.content[item].name}" class="title-icon" style="color:${jsonData.sideBar.content[item].color};"><i class="${jsonData.sideBar.content[item].icon}"></i></div>`
    }
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
        sideBarHtml = `<div class="setlist" style="border:2px solid ${inner.color};"><span><i class="${inner.icon}"></i>  ${inner.name}：</span><span>${inner.content}</span></div>`
    }
    if (inner.type == "skin" && inner.value !== "skin_Transparent") {
        sideBarHtml = `<div onclick="changeSkin('${inner.type}','${inner.href}')" class="setlist" style="border:2px solid ${inner.color};"><span><i class="${inner.icon}"></i>  ${inner.name}</span></div>`;
    }
    if (inner.type == "uistyle") {
        sideBarHtml = `<div onclick="changeUI('${inner.type}','${inner.href}')" class="setlist" style="border:2px solid ${inner.color};">${inner.name}</div>`
    }
    if (inner.type == "changebg" && inner.value == "changebg") {
        sideBarHtml += `<div class="setlist" style="border:2px solid ${inner.color};"><a href="javascript:;" class="changebg">更换背景<input id="setBackGround" type="file"></a></div>`
    }
    if (inner.type == "changebg" && inner.value == "setdefault") {
        sideBarHtml += `<div onclick="setdefault('${inner.type}')" class="setlist" style="border:2px solid ${inner.color};">${inner.name}</div>`
    }
    if (inner.type == "changeCommonUse") {
        sideBarHtml += `<div onclick="addCommonUse('','','',${inner.value})" class="setlist" style="border:2px solid ${inner.color};">${inner.name}</div>`
    }
    if (inner.type == "thanks") {
        sideBarHtml += `<a href="${inner.href}" target="_blank"><div class="setlist" style="border:2px solid ${inner.color};">${inner.name}</div></a>`
    }
    return sideBarHtml
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
                            sideBarHtml += createHtml(inner)
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
                            sideBarHtml += createHtml(inner)
                        }
                    } else {
                        if (inner.type == "skin" && inner.value == "skin_Transparent") {
                            skin_Transparent = inner.href
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

//诗词渲染
jinrishici.load(function (result) {
    jinrishiciSentence.innerHTML = result.data.content
    jinrishiciAuthor.innerHTML = `― ${result.data.origin.author}`
    jinrishiciTitle.innerHTML = `《${result.data.origin.title}》`
});

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