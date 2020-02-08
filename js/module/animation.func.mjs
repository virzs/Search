import {
    loading
} from "./dom.constant.mjs";

import {
    setStorage
} from "./storage.func.mjs";

//加载动画
function toggle(elemt, speed) {
    speed = speed || 16.6; //默认速度为16.6ms
    elemt.style.display = "block"
    if (elemt.style.opacity == 1 || elemt.style.opacity != null) {
        let num = 20;
        let timer = setInterval(function () {
            num--;
            elemt.style.opacity = num / 20;
            if (num <= 0) {
                clearInterval(timer);
                elemt.style.display = "none"
            }
        }, speed);
    }
}

//执行本地存储前动画效果
function setStorageBefore(set, name, href) {
    let num = 0;
    let speed = 60;

    function opacity() {
        loading.style.opacity = num / 20;
    }
    loading.style.display = "block"
    let timer = setInterval(function () {
        num++;
        opacity();
        if (num >= 20) {
            let timer2 = setInterval(function () {
                num--;
                opacity();
                if (num <= 0) {
                    clearInterval(timer2);
                    loading.style.display = "none";
                }
            }, speed);
            clearInterval(timer);
            setTimeout(set, speed);
            if (name && href) {
                setStorage(name, href);
            }
        }
    }, speed);
}
export {
    toggle,
    setStorageBefore
}