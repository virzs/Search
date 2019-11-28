var url = "./data/index.json"
var request = new XMLHttpRequest();
var engine = document.querySelector("#select-engine")
request.open("get", url); // 设置请求方法与路径
request.send(null); //  不发送数据到服务器
request.onload = function () {
    // XHR对象获取到返回信息后执行
    // 返回状态为200，即为数据获取成功
    if (request.status == 200) {
        var json = JSON.parse(request.responseText);
        for (let i = 0; i < json.length; i++) {
            console.log(json[i].name);
        }
        loadData(json)
    }
}
// 加载json数据
function loadData(data) {
    // 搜索引擎数据
    var html = null
    data.engine.forEach(function (element, index) {
        html += '<option ' + data.engine[index].select + ' value="' + data.engine[index].value + '">' + data.engine[index].name + '</option>'
    });
    engine.innerHTML = html
    console.log("Data", data)
}
// 百度搜索参数测试
var txt = document.getElementById("search");
var oUl = document.getElementById("searchList");
txt.onkeyup = function () {
    var val = txt.value;
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
    oUl.innerHTML = str;
    oUl.style.display = "block";
}

function goSearch() {
    var value = txt.value
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