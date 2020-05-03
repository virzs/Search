import {
    openMessage
} from "../components/message.component.js";

import {
    setStorageBefore
} from './animation.func.js';

import {
    getStorage,
    setStorage
} from './storage.func.js';

import {
    body
} from "./dom.constant.js";

import {
    removeElement
} from "./global.func.js";
//切换ui风格
export const changeUI = (value) => {
    uiTag.href = value;
    removeElement("#customFillet");
}

export const customFillet = (value) => {
    let style = document.createElement("style");
    style.setAttribute("id", "customFillet");
    style.setAttribute("type", "text/css");
    let styles = `
        .search-group,
        .search-group::before {
            border-radius: ${value}px;
        }
        .capsule {
            border-radius: ${value*0.625}px;
        }
        .setlist,
        .about-content {
            border-radius: ${value*0.375}px;
        }
        .search-option,
        .search-option::after {
            border-radius: ${value*0.5}px;
        }
        #searchList {
            border-radius: ${value*0.6}px;
        }
        #searchList li {
            border-radius: ${value*0.5}px;
        }`;
    style.innerHTML = styles;
    if (document.querySelector("#customFillet") == undefined) {
        body.appendChild(style);
    } else {
        document.querySelector("#customFillet").innerHTML = styles;
    }
    setStorage("customFilletValue", value);
}