import {
    format
} from "./global.func.js";

export const saveDATA = (data, filename) => {
    if (data.length == 0) return;
    if (!filename) filename = `simpleSearchData_${format(new Date(),'yyyy-MM-dd')}.json`;
    if (typeof data === 'object') data = JSON.stringify(data);
    let link = document.createElement("a");
    let blob = new Blob([data], {
        type: 'text/json'
    });
    link.download = filename;
    link.style.display = "none";
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const getDATA = () => {
    return new Promise((resolve, reject) => {
        let input = document.createElement("input");
        let [file, data] = ['', ''];
        let reader = new FileReader();
        input.type = "file";
        input.style.display = "none";
        document.body.appendChild(input);
        input.click();
        input.addEventListener("change", (e) => {
            file = input.files[0];
            reader.readAsText(file, "UTF-8");
            reader.onload = function (e) {
                if (file.type == "application/json") {
                    data = e.target.result;
                    resolve({
                        code: 200,
                        data: data,
                        msg: "数据恢复成功"
                    });
                } else {
                    reject({
                        code: 400,
                        data: "",
                        msg: "文件格式错误"
                    })
                }
            };
        })
        document.body.removeChild(input);
    })
}