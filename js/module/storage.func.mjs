//设置本地存储
function setStorage(name, value) {
    window.localStorage.setItem(name, value);
}

// 获取本地存储内容
function getStorage(key) {
    let value = window.localStorage.getItem(key);
    return value;
}

function removeStorage(key) {
    let value = window.localStorage.removeItem(key);
    return value
}

export {
    setStorage,
    getStorage,
    removeStorage
}