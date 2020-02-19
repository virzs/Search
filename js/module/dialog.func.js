import {
    body
} from "./dom.constant.js";

function openDialog(data) {
    let [title, content, btns] = ["", "", "", ""];
    if (data == undefined || data.title == undefined) {
        title = "提示";
    } else {
        title = data.title;
    }
    if (!data.html) {
        data.content.forEach(item => {
            if (item.type == "input") {
                content += `<div id="${item.value}Dialog"><span class="content-label">${item.name}：</span><input placeholder="请输入${item.name}" value="${item.defaultValue}" /></div>`;
            } else if (item.type == "text") {
                content += `<div><span class="content-label">${item.name}：</span><p>${item.value}</p></div>`;
            }
        })
    } else {
        content = data.content;
    }
    data.button.forEach(item => {
        btns += `<span><button id="${item.value}Dialog">${item.name}</button></span>`
    })
    let dialog = `
        <div id="dialog" class="${data.id}">
            <div class="dialog-header">${title}<span id="closeDialog"><i class="fa fa-close"></i></span></div>
            <div class="dialog-body">${content}</div>
            <div class="dialog-footer">${btns}</div>
        </div>`;
    let dialogWrapper = document.createElement("div");
    dialogWrapper.setAttribute("id", "dialogWrapper");
    dialogWrapper.innerHTML = dialog;
    body.appendChild(dialogWrapper);
}

function closeDialog() {
    let dialog = document.querySelector("#dialogWrapper");
    dialog.remove();
}

export {
    openDialog,
    closeDialog
}