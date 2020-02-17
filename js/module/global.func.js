import {
    jsonData
} from "./all.data.js";

//阻止事件冒泡
function stopPropagation(e) {
    var ev = e || window.event;
    if (ev.stopPropagation) {
        ev.stopPropagation();
    } else if (window.event) {
        window.event.cancelBubble = true; //兼容IE，根本用不到，本来就没打算兼容IE
    }
}

function findSettingInfo(value) {
    let href = "";
    for (let item of jsonData.sideBar.content[2].content) {
        if (item.content !== "" && typeof item.content !== "string") {
            for (let inner of item.content) {
                if (inner.value == value) {
                    href = inner.href;
                    break;
                }
            }
        }
    }
    return href;
}

function getRandomColor() {
    return '#' + Math.random().toString(16).slice(2, 8)
}

//删除标签函数，参数需要删除的标签名
function removeElement(element) {
    let ele = document.querySelector(element);
    if (ele !== null) {
        ele.parentNode.removeChild(ele);
    }
}

export {
    stopPropagation,
    findSettingInfo,
    getRandomColor,
    removeElement
}