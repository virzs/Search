import {
    searchContent,
    searchInput,
    searchList
} from "../module/dom.constant.js";

import {
    goSearch
} from '../module/search.func.js';

import {
    changeSug,
    getSugValue
} from '../module/sug.func.js';

const onKey = (sug) => {
    document.onkeydown = function (e) {
        let event = e || event;
        if (event.keyCode == 13 && searchInput.value !== "") {
            goSearch();
        }
    }

    //监听箭头上下，选择提示函数
    searchContent.onkeydown = function (e) {
        let event = e || event;
        if (searchList.children.length != 0 && (event.keyCode == 38 || event.keyCode == 40)) {
            changeSug(event.keyCode)
        }
    }

    //监听搜索框输入函数，获取提示信息
    searchInput.onkeyup = () => {
        if (sug) {
            getSugValue();
        }
    }
}
export default onKey;