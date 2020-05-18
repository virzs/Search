import {
    changeCommonCount,
    renderCommonUse
} from "../module/website.func.js"

export const handleWebsite = (data = {}, state = '', isSetting = false) => {
    //修改常用网址计数 data数据 state状态 isSetting是否设置
    if (state == 'count') {
        changeCommonCount(data);
    }
    renderCommonUse(isSetting);
}