var url = "./data/index.json"
var jsonData = {}
var engine = document.querySelector("#select-engine")
var html = null

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
console.log("json数据", jsonData)

jsonData.engine.forEach(function (element, index) {
    html += '<option ' + jsonData.engine[index].select + ' value="' + jsonData.engine[index].value + '">' + jsonData.engine[index].name + '</option>'
});
engine.innerHTML = html

// 百度搜索参数测试
var searchInput = document.getElementById("search");
var searchList = document.getElementById("searchList");
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

function goSearch() {
    var value = searchInput.value
    window.location.href = "https://www.baidu.com/s?wd=" + value
    //搜狗链接 "https://www.sogou.com/web?query="
}

function myHandle(data) {
    console.log(data)
}

//封装的jsonp函数（url为传入的地址，data为参数对象，callback为回调函数）
function myJsonp(url, data, callback) {
    let params = '';
    url += url.indexOf('?') > -1 ? '&' : '?';
    for (var key in data) {
        params += '&' + key + '=' + data[key];
    }
    url += params;

    //cb为百度后端回调函数的键名，后面接上你的回调函数名
    url += '&' + 'cb=' + callback
    let script = document.createElement('script')
    script.setAttribute('src', url)
    document.body.appendChild(script);
    document.body.removeChild(script);

}
//当页面加载完毕，调用函数
window.onload = function () {
    //获取元素
    var target = document.getElementById('target');
    //当键盘抬起时触发jsonp函数
    target.onkeyup = function () {
        let value = target.value.trim()
        if (!value) return;
        // 调用封装的jsonp函数
        myJsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {
            "wd": value
        }, 'myHandle')
    };
};