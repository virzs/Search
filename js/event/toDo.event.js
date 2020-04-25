import {
    getStorage,
    setStorage
} from '../module/storage.func.js';

import {
    generateId
} from '../module/global.func.js';

import {
    renderToDoItem,
    renderCompleteItem,
    submitToDo,
    clearToDo
} from '../module/todo.func.js';

import {
    openMessage
} from '../components/message.component.js';

export const addToDoItem = (ele) => {
    let data = getStorage("todoData").toJSON();
    let content = document.querySelector("#toDoContent");
    let value = ele.parentNode.children[0].value;
    if (value == '') {
        openMessage({
            title: "提示",
            type: "error",
            content: `请先输入内容`
        })
        return;
    }
    data.push({
        id: generateId(),
        content: value,
        time: new Date().toLocaleString(),
        status: "1"
    })
    setStorage("todoData", JSON.stringify(data));
    content.innerHTML = renderToDoItem(data);
    ele.parentNode.children[0].value = "";
}

export const completeToDoItem = (ele) => {
    let changeData = getStorage("todoData").toJSON();
    let content = document.querySelector("#toDoContent");
    let itemId = ele.getAttribute("data-id");
    let thisIndex = changeData.findIndex(item => item.id == itemId);
    let thisItem = changeData.find(item => item.id == itemId);
    ele.style.textDecoration = "line-through";
    thisItem.status = "2";
    changeData.splice(thisIndex, 1, thisItem);
    setStorage("todoData", JSON.stringify(changeData));
    content.innerHTML = renderToDoItem(changeData);
}

export const changeToDoItemState = (ele, state) => {
    let content = document.querySelector("#toDoContent");
    let data = getStorage("todoData").toJSON();
    let render = '';
    let id = ele.getAttribute("data-id");
    let index = data.findIndex(item => item.id == id);
    let item = data.find(item => item.id == id);
    if (state == 'delete') {
        data.splice(index, 1);
    }
    if (state == 'cancel') {
        item.status = 1;
        data.splice(index, 1, item);
    }
    render = state == 'delete' ? renderToDoItem(data) : renderCompleteItem(data);
    setStorage("todoData", JSON.stringify(data));
    content.innerHTML = render;
}

export const changeToDoState = (ele, state) => {
    let content = document.querySelector("#toDoContent");
    let operation = document.querySelector("#operationToDo");
    let data = getStorage("todoData").toJSON();
    let render = '';
    let index = state == 1 ? 1 : 0;
    let operationItem = state == 1 ? submitToDo() : clearToDo();
    let height = state == 1 ? 184 : 104;
    ele.parentNode.children[index].className = "defaultToDoTab";
    ele.className = "clickToDoTab";
    render = state == 1 ? renderToDoItem(data) : renderCompleteItem(data);
    content.innerHTML = render;
    operation.innerHTML = operationItem;
    content.style.height = `${document.body.clientHeight - height}px`;
    return state;
}

export const clearToDoItem = () => {
    let data = getStorage("todoData").toJSON();
    let content = document.querySelector("#toDoContent");
    let clearData = [];
    data.forEach((item, index) => {
        if (item.status == 1) {
            clearData.push(item);
        };
    })
    setStorage("todoData", JSON.stringify(clearData));
    content.innerHTML = renderCompleteItem(clearData);
}