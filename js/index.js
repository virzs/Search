var url = "./data/index.json"
var request = new XMLHttpRequest();
var engine = document.querySelector("#select-engine")
// 设置请求方法与路径
request.open("get", url);
//  不发送数据到服务器
request.send(null);
request.onload = function () {
    // XHR对象获取到返回信息后执行
    if (request.status == 200) {
        // 返回状态为200，即为数据获取成功
        var json = JSON.parse(request.responseText);
        for (let i = 0; i < json.length; i++) {
            console.log(json[i].name);
        }
    }
    // 搜索引擎数据
    var html = null
    json.engine.forEach(function (element, index) {
        html += '<option ' + json.engine[index].select + ' value="' + json.engine[index].value + '">' + json.engine[index].name + '</option>'
    });
    engine.innerHTML = html
}