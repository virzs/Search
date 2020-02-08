import {
    body
} from "./dom.constant.mjs";

import {
    setStorage,
    getStorage
} from './storage.func.mjs';

import {
    setStorageBefore
} from "./animation.func.mjs";

import {
    changeSkin
} from "./skin.func.mjs";

import {
    openMessage
} from "./message.func.mjs";

var skin_Transparent = "./css/skin/skin_Transparent.css"; //透明皮肤数据

//设置必应壁纸为背景
function setBingImage(status) {
    if (getStorage("bg") == "setBingImage" && !status) {
        openMessage({
            title: "提示",
            type: "error",
            content: "请勿重复选择！！！"
        })
    }
    let bingApi = "https://bing.ioliu.cn/v1/?d=0&w=1920&h=1080&callback=window.bing.bg";
    window.bing = {
        bg: function (data) {
            let func = () => {
                body.style.backgroundImage = `url('${data.data.url}')`;
            }
            if (status) {
                body.style.backgroundImage = `url('${data.data.url}')`;
            } else {
                setStorageBefore(func);
                changeSkin("skin", skin_Transparent);
            }
        }
    }
    let script = document.createElement("script");
    script.src = bingApi;
    document.querySelector("head").appendChild(script);
    document.querySelector("head").removeChild(script);
    setStorage("bg", "setBingImage");
}

function setCustomizeImage(setBackGround) {
    let file = setBackGround.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        let data = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'
        let func = () => {
            body.style.backgroundImage = `url('${data}')`;
        }
        // 将文件大小转化成MB
        let size = (file.size / (1024 * 1024)).toFixed(2);
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            openMessage({
                title: "提示",
                type: "error",
                content: `不是有效的图片文件!`
            })
            setBackGround.value = "";
            return;
        }
        if (file.size > 3145728) {
            openMessage({
                title: "提示",
                type: "error",
                content: `当前文件大小为${size}MB，建议不超过3MB！`
            })
            setBackGround.value = "";
            return;
        }
        setStorageBefore(func, "bg", data);
        changeSkin("skin", skin_Transparent);
    };
    // 以DataURL的形式读取文件:
    reader.readAsDataURL(file);
}

//恢复默认
function setdefault(type) {
    if (type == "changebg" && getStorage("skin") !== './css/skin/skin_SunsetBeach.css') {
        let defaultSkin = () => {
            window.localStorage.removeItem("bg");
            body.style.removeProperty("background-image");
            setStorage('skin', './css/skin/skin_SunsetBeach.css');
        }
        setStorageBefore(defaultSkin);
    } else {
        openMessage({
            title: "提示",
            type: "error",
            content: "当前已为默认！"
        })
    }
}
export {
    setBingImage,
    setCustomizeImage,
    setdefault
}