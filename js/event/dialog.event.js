import {
    closeDialog
} from "../components/dialog.component.js";
import {
    handleWebsite
} from "./website.event.js";
import {
    openMessage
} from "../components/message.component.js";

export const handleDialogBtn = (option, data = null) => {
    //模态框关闭
    if (option.value == 'cancel') {
        closeDialog();
    }
    //常用网址模态框提交
    if (option.value == 'submit' && option.source == 'commons') {
        handleWebsite(data, 'add').then(res => {
            openMessage({
                title: "提示",
                type: "success",
                content: `${res.msg}`
            })
            closeDialog();
        }).catch(err => {
            openMessage({
                title: "提示",
                type: "error",
                content: `${err.msg}`
            })
        });
    }
    //常用网址模态框修改
    if (option.value == 'change' && option.source == 'commons') {
        data.id = option.id;
        handleWebsite(data, 'change').then(res => {
            openMessage({
                title: "提示",
                type: "success",
                content: `${res.msg}`
            })
            closeDialog();
        }).catch(err => {
            openMessage({
                title: "提示",
                type: "error",
                content: `${err.msg}`
            })
        });
    }
    //常用网址删除
    if (option.value == 'delete' && option.source == 'commons') {
        data.id = option.id;
        handleWebsite(data, 'delete').then(res => {
            openMessage({
                title: "提示",
                type: "success",
                content: `${res.msg}`
            })
            closeDialog();
        }).catch(err => {
            openMessage({
                title: "提示",
                type: "error",
                content: `${err.msg}`
            })
        });
    }
}