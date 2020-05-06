var jsonData = {}; //获取的json文件数据
var apiData = [];
var updateData = [];
var mainUrl = "../../data/mainData.json"; //json文件路径
var apiUrl = "../../data/apiData.json"; //api文件路径
var updateUrl = '../../data/updateData.json'; //更新记录

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
$.ajax({
    type: "get",
    url: updateUrl,
    dataType: "json",
    async: false,
    success: function (res) {
        updateData = res;
    }
})
export {
    jsonData,
    apiData,
    updateData
}