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

export const sentenceSetting = (value, callback, state) => {
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

export const logoSetting = (value, state) => {
    let func = () => {
        if (value == 'textLogo') {
            showLogo();
        }
        if (value == 'timeLogo') {
            showTime();
        }
        if (value == 'closeLogo') {
            closeLogo();
        }
    }
    if (state) {
        setStorageBefore(func, 'logo', value);
    } else {
        func();
    }
}