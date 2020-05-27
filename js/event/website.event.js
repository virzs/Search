import {
    changeCommonCount,
    renderCommonUse,
    addCommon,
    changeCommon,
    deleteCommon,
    addSideBarWebsite,
    createWebsite,
    checkWebsite
} from "../module/website.func.js"

export const handleWebsite = (data = {}, state = '', isSetting = false) => {
    return new Promise((resolve, reject) => {
        //修改常用网址计数 data数据 state状态 isSetting是否设置
        //计数
        if (state == 'count' && data.source == 'commons') {
            changeCommonCount(data)
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
        }
        //添加
        if (state == 'add' && data.source == 'commons') {
            addCommon(data)
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
        }
        //修改
        if (state == 'change' && data.source == 'commons') {
            changeCommon(data)
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
        }
        //删除
        if (state == 'delete' && data.source == 'commons') {
            deleteCommon(data)
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
        }
        //检查
        if (state == 'check' && data.source == 'commons') {
            checkWebsite(data)
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
        }
        //侧边栏新增
        if (state == 'add' && data.source == 'addCapsule') {
            addSideBarWebsite(data)
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
        }
        //侧边栏检查
        if (state == 'check' && data.source == 'addCapsule') {
            checkWebsite(data)
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
        }
        //渲染常用网址
        if (data.source == 'commons') {
            renderCommonUse(isSetting);
        }
        if (data.source == 'addCapsule') {
            scrollContent.innerHTML = createWebsite();
        }
    })
}