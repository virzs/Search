import {
    selectEngine,
    searchInput,
    searchList
} from "./dom.constant.js";

import {
    jsonData
} from "./all.data.js";

import {
    setStorage,
    getStorage
} from "./storage.func.js";
import {
    generateId
} from "./global.func.js";
import { openDialog } from "../components/dialog.component.js";

//搜索事件
export const goSearch = () => {
    let value = searchInput.value; //获取输入框的值
    let engineValue = selectEngine.children[0].alt; //获取选择的搜索引擎
    let engine = jsonData.engine.find(item => item.value == engineValue);
    window.open(engine.href + value); //拼接搜索链接
    searchHistory({
        engine: engine,
        content: value
    });
}

export const renderEngineOption = () => {
    let searchEngine = "";
    jsonData.engine.forEach(element => {
        if (element.select == "selected") {
            selectEngine.innerHTML = `
            <img src='${element.icon}' alt="${element.value}">
            <span>${element.name}</span>
            <i class="fa fa-sort"></i>`;
        }
        searchEngine += `
            <li id="${element.value}">
                <img src='${element.icon}'>
                <span>${element.name}</span>
            </li>`;
    });
    selectOption.innerHTML = `
        <div class="option-title">
            <span>请选择搜索引擎：</span>
            <span>搜索热词
                <div class="switch-box">
                    <input name="switch-content" class="switch-content" type="checkbox" />
                    <label for="switch-content" class="switch-label"></label>
                </div>
            </span>
        </div>
        <ul>${searchEngine}</ul>`;
}

//渲染搜索引擎备选项
export const setEngine = (engineValue) => {
    selectEngine.innerHTML = `
        <img src='${engineValue.icon}' alt="${engineValue.value}">
        <span>${engineValue.name}</span><i class="fa fa-sort"></i>`;
    selectOption.style.display = "none";
    searchList.style.display = "none";
}

//搜索记录
export const searchHistory = (value) => {
    if (!getStorage("searchHistory").value) setStorage("searchHistory", "[]");
    let history = getStorage("searchHistory").toJSON();
    history.push({
        id: generateId(),
        engine: value.engine,
        content: value.content,
        time: new Date().toLocaleString()
    })
    setStorage("searchHistory", JSON.stringify(history));
}

//搜索历史数据
export const showSearchHistory = () => {
    let searchData = getStorage("searchHistory").toJSON();
    if (!searchData) setStorage('searchHistory', '[]');
    let searchOption = {
        index: true,
        indexLabel: '序号',
        menu: true,
        menuSlot: (row, index) => {
            return `
                <span source="searchHistory" item-type="delete" item-index="${index}" item-id="${row.id}">删除</span>`;
        },
        column: [{
            label: '搜索内容',
            prop: 'content',
            slot: (row, index) => {
                return `<a href="${row.engine.href}" target="_blank">${row.content}</a>`;
            },
        }, {
            label: '时间',
            prop: 'time'
        }]
    }
    openDialog({
        id: 'searchHistory',
        title: "搜索历史数据",
        option: {
            type: "table",
            data: searchData,
            option: searchOption
        },
        button: [{
            name: "关闭",
            type: "default",
            value: "cancel"
        }]
    })
}