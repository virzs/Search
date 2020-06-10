import {
    closeDialog
} from "../components/dialog.component.js";
import {
    handleWebsite
} from "./website.event.js";
import {
    openMessage
} from "../components/message.component.js";
import {
    deleteCommon,
    renderCommonUse,
    deleteSideBarData
} from "../module/website.func.js";
import {
    openTable
} from "../components/table.component.js";
import {
    getStorage
} from "../module/storage.func.js";
import {
    deleteSearchHistory
} from "../module/search.func.js";

export const handleDialogBtn = (option, data = null) => {
    console.log(option, data);
    data.source = option.source;
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
    //常用网址模态框检查
    if (option.value == 'check' && option.source == 'commons') {
        handleWebsite(data, 'check').then(res => {
            openMessage({
                title: "提示",
                type: "success",
                content: `${res.msg}`
            })
        }).catch(err => {
            openMessage({
                title: "提示",
                type: "error",
                content: `${err.msg}`
            })
        });
    }
    //侧边栏网址添加
    if (option.value == 'submit' && option.source == 'addCapsule') {
        data.id = option.id;
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
    //常用网址模态框检查
    if (option.value == 'check' && option.source == 'addCapsule') {
        handleWebsite(data, 'check').then(res => {
            openMessage({
                title: "提示",
                type: "success",
                content: `${res.msg}`
            })
        }).catch(err => {
            openMessage({
                title: "提示",
                type: "error",
                content: `${err.msg}`
            })
        });
    }
    //常用网址删除
    if (Object.is(option.type, 'delete') && Object.is(option.source, 'commonUseData')) {
        let body = document.querySelector('.dialog-body');
        let commonUseData = [];
        let commonUseOption = {
            index: true,
            indexLabel: '序号',
            menu: true,
            menuSlot: (row, index) => {
                return `
                <span source="commonUseData" item-source="${row.source}" item-type="delete" item-index="${index}" item-value="${row.id}">删除</span>`;
            },
            column: [{
                label: '名称',
                prop: 'name',
                slot: (row, index) => {
                    return `<a href="${row.url}" target="_blank" style="color:${row.color}">${row.name}</a>`;
                },
            }, {
                label: '使用次数',
                prop: 'count'
            }]
        }
        deleteCommon({
            id: option.value
        }).then(res => {
            openMessage({
                title: "提示",
                type: "success",
                content: `${res.msg}`
            })
            commonUseData = getStorage("commonUseData").toJSON();
            renderCommonUse(false);
            body.innerHTML = openTable(commonUseData, commonUseOption);
        }).catch(err => {
            openMessage({
                title: "提示",
                type: "error",
                content: `${err.msg}`
            })
        });
    }
    //侧边栏书签删除
    if (Object.is(option.type, 'delete') && Object.is(option.source, 'sidebarData')) {
        let body = document.querySelector('.dialog-body');
        let sidebarData = [];
        let sideBarWebsiteData = [];
        let sidebarWebsiteOption = {
            index: true,
            indexLabel: '序号',
            menu: true,
            menuSlot: (row, index) => {
                return `
                    <span source="sidebarData" item-source="${row.source}" item-type="delete" item-index="${index}" item-value="${row.id}">删除</span>`;
            },
            column: [{
                label: '名称',
                prop: 'name',
                slot: (row, index) => {
                    return `<a href="${row.url}" target="_blank" style="color:${row.color}">${row.name}</a>`;
                },
            }, {
                label: '类别',
                prop: 'source'
            }]
        }
        deleteSideBarData({
            id: option.value,
            source: option.itemSource
        }).then(res => {
            openMessage({
                title: "提示",
                type: "success",
                content: `${res.msg}`
            })
            sideBarWebsiteData = getStorage("sideBarWebsiteData").toJSON();
            sideBarWebsiteData.forEach(item => {
                if (item.content.length > 0) {
                    item.content.forEach(inner => {
                        inner.source = item.name;
                        sidebarData.push(inner);
                    })
                }
            })
            renderCommonUse(false);
            body.innerHTML = openTable(sidebarData, sidebarWebsiteOption);
        }).catch(err => {
            console.log(err)
            openMessage({
                title: "提示",
                type: "error",
                content: `${err.msg}`
            })
        });
    }
    //搜索历史删除
    if (Object.is(option.type, 'delete') && Object.is(option.source, 'searchHistory')) {
        let body = document.querySelector('.dialog-body');
        let searchData = [];
        let searchOption = {
            index: true,
            indexLabel: '序号',
            menu: true,
            menuSlot: (row, index) => {
                return `
                    <span source="searchHistory" item-type="delete" item-index="${index}" item-value="${row.id}">删除</span>`;
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
        deleteSearchHistory({
            id: option.value,
            source: option.itemSource
        }).then(res => {
            openMessage({
                title: "提示",
                type: "success",
                content: `${res.msg}`
            })
            searchData = getStorage("searchHistory").toJSON();
            body.innerHTML = openTable(searchData, searchOption);
        }).catch(err => {
            console.log(err)
            openMessage({
                title: "提示",
                type: "error",
                content: `${err.msg}`
            })
        });
    }
}