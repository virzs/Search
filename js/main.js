/*
 * @Author: VirZhang
 * @Date: 2019-11-28 14:32:57
 * @Last Modified by: VirZhang
 * @Last Modified time: 2020-01-07 17:16:27
 */

//配置变量
var url = "./data/index.json"; //json文件路径
var jsonData = {}; //获取的json文件数据
var searchEngine = null; //搜索框左侧选择搜索引擎数据
var sideBarInfo = "";
var sideBarHtml = "";

//获取的DOM元素
const engine = document.querySelector("#selectEngine"); //搜索框左侧选择引擎标签
const searchInput = document.querySelector("#search"); //搜索输入框
const searchList = document.querySelector("#searchList"); //搜索时显示的相关信息列表
const sideBar = document.querySelector("#sideBar"); //侧边栏
const sideBarIcon = document.querySelectorAll('.title-icon'); //侧边栏图标
const sideBarContent = document.querySelector("#sideBarContent"); //侧边栏内容
const scrollContent = document.querySelector("#scrollContent"); //侧边栏滚动内容
const jinrishiciSentence = document.querySelector("#jinrishiciSentence")
const jinrishiciAuthor = document.querySelector("#jinrishiciAuthor")
const jinrishiciTitle = document.querySelector("#jinrishiciTitle")

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
    if ((window.screen.width - e.screenX > 380 || (window.screen.width - e.screenX > 350 && e.screenY > 180)) && sideBar.className == "moveLeft") {
        sideBar.className = "moveRight";
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

jsonData.website.forEach(item => {
    sideBarInfo += `<p><i class="${item.icon}"></i>  ${item.name}</p>`;
    item.content.forEach(inner => {
        sideBarHtml += `<div class="capsule" style="border:2px solid ${inner.color};"><span></i><a style="color:${inner.color};" href='${inner.href}' target="_blank">${inner.name}</a></span></div>`;
    })
    sideBarInfo = sideBarInfo + sideBarHtml;
    sideBarHtml = "";
})
var sideBarIconFlag = ""
sideBarIcon.forEach((item, index) => {
    item.onclick = () => {
        if (sideBarIconFlag == index) {
            sideBar.className = "moveRight";
            sideBarIconFlag = ""
            return;
        }
        switch (index) {
            case 0:
                scrollContent.innerHTML = "Gaming";
                sideBarIconFlag = index;
                break;
            case 1:
                scrollContent.innerHTML = sideBarInfo;
                sideBarIconFlag = index;
                break;
            case 2:
                scrollContent.innerHTML = "Setting";
                sideBarIconFlag = index;
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