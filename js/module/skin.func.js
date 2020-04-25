import {
    body
} from "./dom.constant.js";

import {
    openMessage
} from "../components/message.component.js";

import {
    getStorage,
    removeStorage
} from './storage.func.js';

import {
    setStorageBefore
} from './animation.func.js';

import {
    linkTag
} from "./dom.constant.js";

import {
    removeElement
} from "./global.func.js";

//切换配色
export const changeSkin = (skinName, value) => {
    if (getStorage("skin").value == value && value !== "./css/skin/skin_Transparent.css") {
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
            removeElement("#globalImage");
            removeElement("#WoolGlass");
        }
    }
    setStorageBefore(setHref, skinName, value);
}