import {
    openMessage
} from "./message.func.mjs";

import {
    setStorageBefore
} from './animation.func.mjs';

import {
    getStorage
} from './storage.func.mjs';

//切换ui风格
function changeUI(uiName, value) {
    if (getStorage("uistyle") == value) {
        openMessage({
            title: "提示",
            type: "error",
            content: "请勿重复选择UI风格！！！"
        })
        return;
    }
    let setHref = () => {
        uiTag.href = value;
    }
    setStorageBefore(setHref, uiName, value);
}
export {
    changeUI
}