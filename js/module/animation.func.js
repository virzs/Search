import {
    loading
} from "./dom.constant.js";

import {
    setStorage
} from "./storage.func.js";

//加载动画
export const toggle = (elemt, speed = 16.6) => {
    elemt.style.display = 'block';
    if (elemt.style.opacity == 1 || elemt.style.opacity != null) {
        let num = 20;
        let timer = setInterval(function () {
            num--;
            elemt.style.opacity = num / 20;
            if (num <= 0) {
                clearInterval(timer);
                elemt.style.display = 'none';
            }
        }, speed);
    }
}

//执行本地存储前的缓冲动画
export const setStorageBefore = (set, name, href) => {
    let [num, speed] = [0, 60];
    let changeOpacity = () => {
        loading.style.opacity = num / 20;
    }
    loading.style.display = 'block';
    let timer = setInterval(function () {
        num++;
        changeOpacity();
        if (num >= 20) {
            let timer2 = setInterval(function () {
                num--;
                changeOpacity();
                if (num <= 0) {
                    clearInterval(timer2);
                    loading.style.display = 'none';
                }
            }, speed)
            clearInterval(timer);
            setTimeout(set, speed);
            if (name && href) {
                setStorage(name, href);
            }
        }
    }, speed)
}