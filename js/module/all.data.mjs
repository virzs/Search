var jsonData = {}; //获取的json文件数据
var url = "../../data/index.json"; //json文件路径

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
export {
    jsonData
}