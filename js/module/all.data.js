var jsonData = {}; //获取的json文件数据
var apiData = [];
var mainUrl = "../../data/mainData.json"; //json文件路径
var apiUrl = "../../data/apiData.json"; //api文件路径

/*
    ajax同步获取json文件数据
 */
$.ajax({
    type: "get",
    url: mainUrl,
    dataType: "json",
    async: false,
    success: function (res) {
        jsonData = res;
    }
});
$.ajax({
    type: "get",
    url: apiUrl,
    dataType: "json",
    async: false,
    success: function (res) {
        apiData = res;
    }
})
export {
    jsonData,
    apiData
}