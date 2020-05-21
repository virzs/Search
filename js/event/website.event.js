import {
    changeCommonCount,
    renderCommonUse,
    addCommon,
    changeCommon,
    deleteCommon
} from "../module/website.func.js"

export const handleWebsite = (data = {}, state = '', isSetting = false) => {
    return new Promise((resolve, reject) => {
        //修改常用网址计数 data数据 state状态 isSetting是否设置
        //计数
        if (state == 'count') {
            changeCommonCount(data)
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
        }
        //添加
        if (state == 'add') {
            addCommon(data)
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
        }
        //修改
        if (state == 'change') {
            changeCommon(data)
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
        }
        //删除
        if (state == 'delete') {
            deleteCommon(data)
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
        }
        //渲染常用网址
        renderCommonUse(isSetting);
    })
}