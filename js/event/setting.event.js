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

import {
    findSettingInfo
} from "../module/global.func.js";

import {
    changeUI
} from "../module/ui.func.js";

import {
    changeSkin
} from "../module/skin.func.js";

import {
    setCustomizeImage,
    setBingImage,
    setdefault
} from "../module/bg.func.js";
import {
    showCommonUseData,
    showSidebarData
} from "../module/website.func.js";
import {
    showSearchHistory
} from "../module/search.func.js";

//背景设置
export const bgSetting = (value, state) => {
    let error = eventError('bg', value, state);
    if (!error && state) return;
    if (value == 'changebg') {
        setCustomizeImage();
        return;
    }
    let func = () => {
        if (value == 'setBingImage') setBingImage();
        if (value == 'setdefault' && getStorage("uistyle").value !== './css/uistyle/neumorphism.min.css') setdefault();
    }
    if (state) {
        setStorageBefore(func, 'bg', value);
    } else {
        func();
    }
}

//配色设置
export const skinSetting = (value, state) => {
    let error = eventError('skin', value, state);
    let href = findSettingInfo(value);
    if (!error && value !== './css/skin/skin_Transparent.css' && state) return;
    let func = () => {
        changeSkin(href);
    }
    if (state) {
        setStorageBefore(func, 'skin', href);
    } else {
        func();
    }
}

//UI设置
export const uiStyleSetting = (value, state) => {
    let href = findSettingInfo(value);
    let error = eventError('uistyle', href, state);
    if (!error && state) return;
    let func = () => {
        setdefault(href);
    }
    if (state) {
        setStorageBefore(func, 'uistyle', href);
    } else {
        func();
    }
}

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

//数据设置
export const dataSetting = (value) => {
    switch (true) {
        //常用网址设置
        case Object.is(value, 'commonUseData'):
            showCommonUseData();
            break;
            //侧边栏网址设置
        case Object.is(value, 'sidebarData'):
            showSidebarData();
            break;
            //搜索历史设置
        case Object.is(value, 'searchData'):
            showSearchHistory();
            break;
    }
}

//重复设置事件
const eventError = (name, value, state) => {
    let storage = getStorage(name);
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