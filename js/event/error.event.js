import {
    openDialog
} from "../components/dialog.component.js";

const windowError = () => {
    window.onerror = function (message, source, lineno, colno, error) {
        /* 错误信息（字符串）：message
        发生错误的脚本URL（字符串）：source
        发生错误的行号（数字）：lineno
        发生错误的列号（数字）：colno
        Error对象（对象）：error
        https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror */
        openDialog({
            title: "抱歉，出现错误！！",
            option: {
                type: "text"
            },
            content: `
                <p style="color:red;font-weight:bold">请复制以下代码进行反馈：</p>
                <code>${message} at ${source} in ${lineno} rows, ${colno} columns.</code>
                <br/>
                <code>${navigator.userAgent}</code>`,
            button: [{
                name: "取消",
                value: "cancel"
            }]
        })
        return false;
    }
}

export default windowError;