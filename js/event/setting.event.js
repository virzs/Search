import {
    loadJinrishiji,
    loadHitokoto,
    hideSentence
} from "../module/sentence.func.js";

import {
    setStorageBefore
} from "../module/animation.func.js";

import {
    showLogo,
    showTime,
    closeLogo
} from "../module/title.func.js";

import {
    getStorage
} from "../module/storage.func.js";

import {
    openMessage
} from "../components/message.component.js";

//语句设置
export const sentenceSetting = (value, callback, state) => {
    let error = eventError('sentence', value, state);
    if (!error && state) return;
    let func = () => {
        if (value == 'jinrishici') loadJinrishiji(callback);
        if (value == 'hitokoto') loadHitokoto();
        if (value == 'hideSentence') hideSentence();
    }
    if (state) {
        setStorageBefore(func, 'sentence', value);
    } else {
        func();
    }
}

//Logo设置
export const logoSetting = (value, state) => {
    let error = eventError('logo', value, state);
    if (!error && state) return;
    let func = () => {
        if (value == 'textLogo') showLogo();
        if (value == 'timeLogo') showTime();
        if (value == 'closeLogo') closeLogo();
    }
    if (state) {
        setStorageBefore(func, 'logo', value);
    } else {
        func();
    }
}

//重复设置事件
const eventError = (name, value, state) => {
    let storage = getStorage(name)
    if (storage.value == value && state) {
        openMessage({
            title: "提示",
            type: "error",
            content: `请勿重复选择！！！`
        })
        return false;
    } else {
        return true;
    }
}