//设置本地存储
export const setStorage = (name, value) => {
    window.localStorage.setItem(name, value);
}

// 获取本地存储内容
export const getStorage = (key) => {
    let value = window.localStorage.getItem(key);
    let method = new Object;
    method.value = value; //默认值
    method.toBoolean = function () { //转布尔值
        return value !== "false";
    }
    method.toJSON = function () { //转JSON
        return JSON.parse(value);
    }
    return method;
}

//删除本地存储函数
export const removeStorage = (key) => {
    let value = window.localStorage.removeItem(key);
    return value
}

export const clearStorage = () => {
    window.localStorage.clear();
}

//会话存储
export const setSessionStorage = (name, value) => {
    window.sessionStorage.setItem(name, value);
}

export const getSessionStorage = (key) => {
    let value = window.sessionStorage.getItem(key);
    let method = new Object;
    method.value = value; //默认值
    method.toBoolean = function () { //转布尔值
        return value !== "false";
    }
    method.toJSON = function () { //转JSON
        return JSON.parse(value);
    }
    return method;
}

export const removeSessionStorage = (key) => {
    window.sessionStorage.removeItem(key);
}

export const clearSessionStorage = () => {
    window.sessionStorage.clear();
}