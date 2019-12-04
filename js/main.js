/*
 * @Author: VirZhang 
 * @Date: 2019-11-28 14:32:57 
 * @Last Modified by: VirZhang
 * @Last Modified time: 2019-12-04 17:58:44
 */

//配置变量
var url = "./data/index.json"; //json文件路径
var jsonData = {}; //获取的json文件数据
var searchEngine = null; //搜索框左侧选择搜索引擎数据
var showList = 0 //右侧弹窗标记

//获取的DOM元素
var engine = document.querySelector("#select-engine"); //搜索框左侧选择引擎标签
var searchInput = document.querySelector("#search"); //搜索输入框
var searchList = document.querySelector("#searchList"); //搜索时显示的相关信息列表
var sideBarIcon = document.querySelectorAll('.title-icon') //弹窗图标
var sideBar = document.querySelectorAll('.sideBarContent') //弹窗内容
var closeSideBar = document.querySelector(".closeSideBar") //关闭弹窗图标

// ajax同步获取json文件数据
$.ajax({
    type: "get",
    url: url,
    dataType: "json",
    async: false,
    success: function (response) {
        jsonData = response
    }
});

//拼接搜索栏左侧选择引擎
jsonData.engine.forEach(function (element, index) {
    searchEngine += '<option ' + jsonData.engine[index].select + ' value="' + jsonData.engine[index].value + '">' + jsonData.engine[index].name + '</option>'
});
engine.innerHTML = searchEngine

//监听按下键盘事件，实现按下Enter跳转搜索
document.onkeydown = function (e) {
    var event = e || event
    if (event.keyCode == 13) {
        goSearch()
    }
}

//搜索事件
function goSearch() {
    let value = searchInput.value //获取输入框的值
    let engineValue = engine.options[engine.selectedIndex].value //获取选择的搜索引擎
    let searchHref = '' //定义搜索链接变量
    jsonData.engine.forEach((item) => {
        if (item.value == engineValue) {
            searchHref = item.href
        }
    })
    window.location.href = searchHref + value //拼接搜索链接
}

// 百度搜索参数测试
searchInput.onkeyup = function () {
    var val = searchInput.value;
    var oScript = document.createElement("script"); //动态创建script标签 
    oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + val + "&cb=callback";
    //添加链接及回调函数 
    document.body.appendChild(oScript); //添加script标签 
    document.body.removeChild(oScript); //删除script标签 
}

//回调函数 
function callback(data) {
    var str = "";
    for (var i = 0; i < data.s.length; i++) {
        str += "<li><a href=\"https://www.baidu.com/s?wd=" + data.s[i] + "\">" + data.s[i] + "</a></li>";
    }
    //console.log(str); 
    searchList.innerHTML = str;
    searchList.style.display = "block";
}

function myHandle(data) {
    console.log(data)
}

// 侧边栏点击显示，切换
for (let i = 0; i < sideBarIcon.length; i++) {
    sideBarIcon[i].onclick = function () {
        // if (showList == 0) {
        for (let j = 0; j < sideBarIcon.length; j++) {
            sideBar[j].style.display = "none"
        }
        closeSideBar.style.display = "block"
        sideBar[i].style.display = "block"
        // showList = 1
        // console.log("showList为0时：", showList)
        // } else {
        //     sideBar[i].style.display = 'none'
        //     showList = 0
        //     console.log("showList为1时：", showList)
        // }
    }
}
// 关闭侧边栏
closeSideBar.onclick = function () {
    for (let i = 0; i < sideBarIcon.length; i++) {
        sideBar[i].style.display = "none"
    }
    closeSideBar.style.display = "none"
}
sideBar[0].innerHTML = "<p>" + jsonData.website.social.content[0].name + "</p>"
// 废弃



//封装的jsonp函数（url为传入的地址，data为参数对象，callback为回调函数）
// function myJsonp(url, data, callback) {
//     let params = '';
//     url += url.indexOf('?') > -1 ? '&' : '?';
//     for (var key in data) {
//         params += '&' + key + '=' + data[key];
//     }
//     url += params;

//     //cb为百度后端回调函数的键名，后面接上你的回调函数名
//     url += '&' + 'cb=' + callback
//     let script = document.createElement('script')
//     script.setAttribute('src', url)
//     document.body.appendChild(script);
//     document.body.removeChild(script);

// }
//当页面加载完毕，调用函数
// window.onload = function () {
//     //获取元素
//     var target = document.getElementById('target');
//     //当键盘抬起时触发jsonp函数
//     target.onkeyup = function () {
//         let value = target.value.trim()
//         if (!value) return;
//         // 调用封装的jsonp函数
//         myJsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {
//             "wd": value
//         }, 'myHandle')
//     };
// };