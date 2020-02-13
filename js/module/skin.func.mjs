import {
    body
} from "./dom.constant.mjs";

import {
    openMessage
} from "./message.func.mjs";

import {
    getStorage,
    removeStorage
} from './storage.func.mjs';

import {
    setStorageBefore
} from './animation.func.mjs';

import {
    linkTag
} from "./dom.constant.mjs";

//切换配色
function changeSkin(skinName, value) {
    if (getStorage("skin") == value && value !== "./css/skin/skin_Transparent.css") {
        openMessage({
            title: "提示",
            type: "error",
            content: "请勿重复选择配色！！！"
        });
        return;
    }
    let setHref = () => {
        linkTag.href = value;
        if (value !== "./css/skin/skin_Transparent.css") {
            removeStorage("bg");
            body.style.removeProperty("background-image");
        }
    }
    setStorageBefore(setHref, skinName, value);
}
export {
    changeSkin
}