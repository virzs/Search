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
    console.log(option, data);
    if (option.value == 'cancel') {
        closeDialog();
    }
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
    if (option.value == 'change' && option.source == 'commons') {
        handleWebsite(data, 'change');
        closeDialog();
    }
    if (option.value == 'delete' && option.source == 'sommons') {
        handleWebsite(data, 'delete');
        closeDialog();
    }
}