/*
 * @Author: VirZhang
 * @Date: 2019-11-28 14:32:57
 * @Last Modified by: VirZhang
 * @Last Modified time: 2020-01-10 14:30:02
 */

//配置变量
var url = "./data/index.json"; //json文件路径
var jsonData = {}; //获取的json文件数据
var searchEngine = null; //搜索框左侧选择搜索引擎数据
var websiteInfo = "";
var settingInfo = "";
var sideBarHtml = "";
var sideBarIconFlag = -1 //侧边栏按钮标记

//获取的DOM元素
const linkTag = document.querySelector('#skinTag')
const engine = document.querySelector("#selectEngine"); //搜索框左侧选择引擎标签
const searchInput = document.querySelector("#search"); //搜索输入框
const searchList = document.querySelector("#searchList"); //搜索时显示的相关信息列表
const sideBar = document.querySelector("#sideBar"); //侧边栏
const sideBarTitle = document.querySelector("#sideBarTitle") //侧边栏图标区域
const sideBarContent = document.querySelector("#sideBarContent"); //侧边栏内容
const scrollContent = document.querySelector("#scrollContent"); //侧边栏滚动内容
const jinrishiciSentence = document.querySelector("#jinrishiciSentence") //诗词内容
const jinrishiciAuthor = document.querySelector("#jinrishiciAuthor") //诗词作者
const jinrishiciTitle = document.querySelector("#jinrishiciTitle") //诗词名
const copyright = document.querySelector("#copyright") //版权说明
const loading = document.querySelector("#loading")
const skinHref = getStorage("skin");

// ajax同步获取json文件数据
$.ajax({
    type: "get",
    url: url,
    dataType: "json",
    async: false,
    success: function (response) {
        jsonData = response;
    }
});

//拼接搜索栏左侧选择引擎
jsonData.engine.forEach(element => {
    searchEngine += `<option ${element.select} value="${element.value}">${element.name}</option>`;
});
engine.innerHTML = searchEngine;

//监听按下键盘事件，实现按下Enter跳转搜索
document.onkeydown = function (e) {
    let event = e || event;
    if (event.keyCode == 13) {
        goSearch();
    }
}

//监听鼠标按下事件，实现点击空白处关闭侧边栏
document.onmousedown = function (e) {
    let event = e || event;
    if ((window.screen.width - e.screenX > 390 || (window.screen.width - e.screenX > 340 && e.screenY > 180)) && sideBar.className == "moveLeft") {
        sideBar.className = "moveRight";
        sideBarIconFlag = -1;
    }
}

//搜索事件
function goSearch() {
    let value = searchInput.value; //获取输入框的值
    let engineValue = engine.options[engine.selectedIndex].value; //获取选择的搜索引擎
    let searchHref = ''; //定义搜索链接变量
    jsonData.engine.forEach((item) => {
        if (item.value == engineValue) {
            searchHref = item.href;
        }
    })
    window.location.href = searchHref + value; //拼接搜索链接
}

function changeSkin(skinName, href) {
    let num = 0
    let speed = 60
    loading.style.display = "block"
    let timer = setInterval(function () {
        num++;
        loading.style.opacity = num / 20;
        if (num >= 20) {
            let timer2 = setInterval(function () {
                num--;
                loading.style.opacity = num / 20;
                if (num <= 0) {
                    clearInterval(timer2);
                    loading.style.display = "none"
                }
            }, speed);
            clearInterval(timer);
            linkTag.href = href
            setStorage(skinName, href)
        }
    }, speed);
}

function setStorage(skinName, href) {
    window.localStorage.setItem(skinName, href);
}

function getStorage(key) {
    let skinHref = window.localStorage.getItem(key);
    return skinHref;
}

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

if (skinHref && skinHref != null) {
    linkTag.href = skinHref
}

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

jsonData.sideBar.content[1].content.forEach(item => {
    if (item.show) {
        websiteInfo += `<p><i class="${item.icon}"></i>  ${item.name}</p>`;
        item.content.forEach(inner => {
            if (inner.show) {
                sideBarHtml += `<div class="capsule" style="border:2px solid ${inner.color};"><span><a style="color:${inner.color};" href='${inner.href}' target="_blank">${inner.name}</a></span></div>`;
            }
        })
        websiteInfo = websiteInfo + sideBarHtml;
        sideBarHtml = "";
    }
})

//令人窒息的代码，等回头再做优化，先实现功能
jsonData.sideBar.content[2].content.forEach(item => {
    if (item.show) {
        settingInfo += `<p><i class="${item.icon}"></i>  ${item.name}</p>`;
        item.content.forEach(inner => {
            if (inner.show) {
                if (typeof inner.content === "string" && inner.content !== "") {
                    if (!inner.type) {
                        sideBarHtml += `<div class="setlist" style="border:2px solid ${inner.color};"><span><i class="${inner.icon}"></i>  ${inner.name}：</span><span>${inner.content}</span></div>`
                    } else if (inner.type == "skin") {
                        sideBarHtml += `<div onclick="changeSkin('${inner.type}','${inner.href}')" class="setlist" style="border:2px solid ${inner.color};"><span><i class="${inner.icon}"></i>  ${inner.name}</span></div>`;
                    }
                } else if (typeof inner.content !== "string") {
                    // sideBarHtml += `<div class="setlist"><span><i class="${inner.icon}"></i>  ${inner.name}：</span></div>`;
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
                    sideBarHtml += `<div class="setlist" style="border:2px solid ${inner.color};"><a href="${inner.href}" target="_blank">${inner.name}</a></div>`
                }
            }
        })
        settingInfo = settingInfo + sideBarHtml;
        sideBarHtml = "";
    }
})

if (jsonData.copyright.show) {
    copyright.innerHTML = `<a class="copyright" href="${jsonData.copyright.href}">${jsonData.copyright.content}</a>`
}

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
                scrollContent.innerHTML = websiteInfo;
                sideBarIconFlag = item.id;
                break;
            case "Setting":
                scrollContent.innerHTML = settingInfo;
                sideBarIconFlag = item.id;
                break;
        }
        sideBar.className = "moveLeft";
    }
})

jinrishici.load(function (result) {
    jinrishiciSentence.innerHTML = result.data.content
    jinrishiciAuthor.innerHTML = `― ${result.data.origin.author}`
    jinrishiciTitle.innerHTML = `《${result.data.origin.title}》`
});

// // 百度搜索参数测试
// searchInput.onkeyup = function () {
//     var val = searchInput.value;
//     var oScript = document.createElement("script"); //动态创建script标签
//     oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`;
//     //添加链接及回调函数
//     document.body.appendChild(oScript); //添加script标签
//     document.body.removeChild(oScript); //删除script标签
// }

// //回调函数
// function callback(data) {
//     var str = "";
//     for (var i = 0; i < data.s.length; i++) {
//         str += `<li><a href=\"https://www.baidu.com/s?wd=${data.s[i]}\">${data.s[i]}</a></li>`;
//     }
//     searchList.innerHTML = str;
//     searchList.style.display = "block";
// }