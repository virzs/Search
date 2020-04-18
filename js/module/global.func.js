import {
    jsonData
} from "./all.data.js";

//阻止事件冒泡

export const stopPropagation = (e) => {
    let ev = e || window.event;
    if (ev.stopPropagation) {
        ev.stopPropagation();
    } else if (window.event) {
        window.event.cancelBubble = true;
    }
}

//查找选中设置项href值
export const findSettingInfo = (value) => {
    let href = '';
    let settingData = jsonData.sideBar.content.find(item => item.value == 'Setting').content;
    for (let item of settingData) {
        if (item.content !== '' && typeof item.content !== 'string') {
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

//生成随机颜色值
export const getRandomColor = () => {
    let color = `#${Math.random().toString(16).substring(2,8)}`;
    return color;
}

//删除标签函数，参数：需要删除的标签名称
export const removeElement = (element) => {
    let ele = document.querySelector(element);
    if (ele !== null) ele.parentNode.removeChild(ele);
}

//生成随机ID
export const generateId = () => {
    let id = Math.random().toString(36).substr(-8);
    return id;
}

//排序
export const quickSort = (array) => {
    array.sort((obj1, obj2) => {
        let min = obj1['count'];
        let max = obj2['count'];
        return max - min;
    })
    return array;
}

export const format = (date, fmt) => {
    let o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}