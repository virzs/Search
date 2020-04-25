//弹窗开启事件
export const openMessage = (value) => {
    let iconType = "";
    switch (value.type) {
        case "success":
            iconType = "fa-check";
            break;
        case "error":
            iconType = "fa-close";
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
            closeMessage(li);
        }, 3000)
    }
}

//弹窗关闭事件
export const closeMessage = (elemt) => {
    elemt.className = "messageMoveRight";
    if (!elemt) stopPropagation();
    if (elemt.parentNode) {
        setTimeout(() => {
            elemt.parentNode.removeChild(elemt)
        }, 500)
    }
}