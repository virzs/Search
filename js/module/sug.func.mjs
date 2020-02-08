import {
    jsonData
} from "./all.data.mjs";

import {
    selectEngine,
    searchInput,
    searchList
} from "./dom.constant.mjs";

var sugIndex = -1; //备选项下标
var sugFlag = true; //备选项标记

//获取智能提示数据
function getSugValue() {
    let engineValue = selectEngine.childNodes[0].alt; //获取选择的搜索引擎
    let engine = jsonData.engine.find(item => item.value == engineValue);
    let [href, sugurl] = [engine.href, engine.sugurl];
    let value = searchInput.value; //获取输入框的值
    if (!sugFlag) {
        sugFlag = !sugFlag;
        return;
    }
    if (value == "") {
        searchList.innerHTML = "";
        searchList.style.display = "none";
        return;
    }
    sugurl = sugurl.replace("#content#", value);
    //谷歌回调函数
    window.google = {
        ac: {
            h: function (json) {
                sugValue(href, json[1])
            }
        }
    }
    //必应回调函数
    window.bing = {
        sug: function (json) {
            let sugList = ""
            if (json.AS.Results !== undefined && json.AS.Results[0].Suggests !== undefined) {
                sugList = json.AS.Results[0].Suggests
            }
            sugValue(href, sugList);
        }
    }
    //百度回调函数
    window.baidu = {
        sug: function (json) {
            sugValue(href, json.s)
        }
    }
    //搜狗回调函数
    window.sogou = {
        sug: function (json) {
            sugValue(href, json[1])
        }
    }
    //360好搜回调函数
    window.so = {
        sug: function (json) {
            sugValue(href, json.result)
        }
    }
    //magi回调函数 / 不可用
    window.magi = {
        sug: function (json) {
            console.log(json)
        }
    }
    //夸克回调函数
    window.quark = {
        sug: function (json) {
            sugValue(href, json.data.value)
        }
    }
    let script = document.createElement("script");
    script.src = sugurl;
    document.querySelector("head").appendChild(script);
    document.querySelector("head").removeChild(script);
    sugIndex = -1;
}

//备选项/智能提示函数
function sugValue(href, value) {
    let sugList = "";
    if (value.length == 0) {
        return;
    }
    value.forEach(item => {
        if (typeof item == "string") {
            sugList += `<li><a href="${href}${item}">${item}</a></li>`
        } else if (typeof item == "object" && item.Txt !== undefined) {
            sugList += `<li><a href="${href}${item.Txt}">${item.Txt}</a></li>`
        } else if (typeof item == "object" && item.word !== undefined) {
            sugList += `<li><a href="${href}${item.word}">${item.word}</a></li>`
        } else {
            sugList += `<li><a href="${href}${item[0]}">${item[0]}</a></li>`
        }
    })
    searchList.innerHTML = sugList;
    searchList.style.display = "block";
}

//选择备选搜索
function changeSug(keyCode) {
    sugFlag = false;
    Array.prototype.forEach.call(searchList.children, (item, index) => {
        searchList.children[index].className = "";
    })
    if (keyCode == 38 && sugIndex >= 0) {
        sugIndex--;
    }
    if (keyCode == 40 && sugIndex <= searchList.children.length) {
        sugIndex++;
    }
    if (sugIndex < 0) {
        sugIndex = searchList.children.length - 1;
    }
    if (sugIndex >= searchList.children.length) {
        sugIndex = 0;
    }
    if (sugIndex == -1) {
        searchList.children[0].className = "selectSug";
    }
    searchList.children[sugIndex].className = "selectSug";
    searchInput.value = searchList.children[sugIndex].children[0].text;
}
export {
    getSugValue,
    sugValue,
    changeSug
}