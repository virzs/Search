import {
    getStorage
} from "./storage.func.js";

export const createToDo = () => {
    let data = getStorage("todoData").toJSON();
    return `
        <div id="toDoTabs">
            <span status="1" class="clickToDoTab"><i class="fa fa-clock-o"></i> 代办</span>
            <span status="2" class="defaultToDoTab"><i class="fa fa-check"></i> 已完成</span>
        </div>
        <div id="toDoContent">
            ${renderToDoItem(data)}
        </div>
        <div id="operationToDo">
            ${submitToDo()}
        </div>`;
}

export const renderToDoItem = (data) => {
    let [flag, content] = [0, ''];
    data.forEach(item => {
        if (item.status == "1") {
            flag++;
            content += `
                <div class="list-item" data-id="${item.id}">
                    <span>${item.content}</span>
                    <span>${item.time}</span>
                    <div class="item-del" data-id="${item.id}"><i class="fa fa-close"></i> 删除</div>
                </div>`;
        }
    })
    if (flag == 0) content = `<div id="noListItem">还没有待办事项</div>`;
    return content;
}

export const renderCompleteItem = (data) => {
    let [flag, content] = [0, ''];
    data.forEach(item => {
        if (item.status == "2") {
            flag++;
            content += `
                <div class="list-item" data-id="${item.id}">
                    <span>${item.content}</span>
                    <span>${item.time}</span>
                    <div class="item-cancel" data-id="${item.id}"><i class="fa fa-reply"></i> 撤销</div>
                </div>`;
        }
    })
    if (flag == 0) content = `<div id="noListItem">还没有完成的事项</div>`;
    return content;
}

export const submitToDo = () => {
    return `
        <textarea placeholder="今天做点什么？" class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"></textarea>
        <button style="width:100%" id="submitToDo" class="btn btn-info">保存</button>`;
}

export const clearToDo = () => {
    return `<button style="width:100%" id="clearToDo" class="btn btn-warning">清除已完成</button>`;
}