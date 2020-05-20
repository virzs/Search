import {
    changeCommonCount,
    renderCommonUse,
    addCommon
} from "../module/website.func.js"

export const handleWebsite = (data = {}, state = '', isSetting = false) => {
    return new Promise((resolve, reject) => {
        //修改常用网址计数 data数据 state状态 isSetting是否设置
        //计数
        if (state == 'count') {
            changeCommonCount(data);
        }
        //添加
        if (state == 'add') {
            addCommon(data)
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        }
        //渲染常用网址
        renderCommonUse(isSetting);
    })
}