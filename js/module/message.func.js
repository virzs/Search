//弹窗开启事件
function openMessage(value) {
    let iconType = ""
    switch (value.type) {
        case "success":
            iconType = "fa-check"
            break;
        case "error":
            iconType = "fa-close"
        default:
            break;
    }
    //动态添加多个消息需要单独创建
    let li = document.createElement("li");
    let icon = document.createElement("div");
    let iconi = document.createElement("i");
    let div = document.createElement("div");
    let title = document.createElement("p");
    let content = document.createElement("p");
    let close = document.createElement("i");
    li.setAttribute("class", "messageMoveLeft");
    li.appendChild(icon);
    icon.setAttribute("class", value.type);
    icon.appendChild(iconi);
    iconi.classList.add("fa", iconType);
    li.appendChild(div);
    div.appendChild(title);
    title.innerHTML = value.title;
    div.appendChild(content);
    content.innerHTML = value.content;
    li.appendChild(close);
    close.classList.add("close", "fa", "fa-close");
    close.addEventListener("click", () => {
        closeMessage(li);
    })
    messageList.appendChild(li);
    if (!value.timing || value.timing !== null) {
        setTimeout(() => {
            closeMessage(li)
        }, 3000)
    }
    // messageList.innerHTML = `<li class="messageMoveLeft">${icon}<div><p>${value.title}</p><p>${value.content}</p></div><i onclick="closeMessage()" class="close fa fa-close"></i></li>`;
}

//弹窗关闭事件
function closeMessage(elemt) {
    elemt.className = "messageMoveRight";
    if (!elemt) {
        stopPropagation();
    }
    if (elemt.parentNode) {
        setTimeout(() => {
            elemt.parentNode.removeChild(elemt)
        }, 500)
    }
}
export {
    openMessage,
    closeMessage
}