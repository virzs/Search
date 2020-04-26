import {
    loadJinrishiji,
    loadHitokoto,
    hideSentence
} from "../module/sentence.func.js";
import {
    setStorageBefore
} from "../module/animation.func.js";

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