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
export const changeSkin = (value) => {
    linkTag.href = value;
    if (value !== "./css/uistyle/transparent.min.css") {
        removeStorage("bg");
        removeElement("#globalImage");
        removeElement("#WoolGlass");
    }
}