export const openTable = (data = [], option = {}) => {
    let column = option.column; //列
    let showIndex = typeof option.index == 'undefined' ? false : option.index; //序号
    let indexLabel = typeof option.indexLabel == 'undefined' ? '#' : option.indexLabel; //序号文字
    let showHeader = typeof option.header == 'undefined' ? true : option.header; //表头显隐
    let showMenu = typeof option.menu == 'undefined' ? false : option.menu; //操作栏
    let menuSlot = typeof option.menuSlot == 'undefined' ? '' : option.menuSlot; //自定义操作栏
    let thead = ''; //表头
    let th = ''; //表头列
    let tbody = ''; //表内容
    let tr = ''; //表内容列
    //渲染表头列
    column.forEach((item, index) => {
        th += `<th>${item.label}</th>`;
    })
    // 合并表头列
    if (showHeader) {
        thead = `<tr>
            ${showIndex ? `<th>${indexLabel}</th>` : ''}
            ${th}
            ${showMenu ? `<th>操作</th>` : ''}
        </tr>`;
    }
    // 渲染数据
    data.forEach((item, index) => {
        column.forEach(inner => {
            if (inner.slot) {
                //自定义列
                tr += `<td data-label="${inner.label}">${inner.slot(item,index)}</td>`;
            } else {
                tr += `<td data-label="${inner.label}">${item[inner.prop]}</td>`;
            }
        })
        tbody += `<tr>
            ${showIndex ? `<td data-label="${indexLabel}">${index+1}</td>` : ''}
            ${tr}
            ${showMenu ? (menuSlot ? `<td data-label="操作">${menuSlot(item,index)}</td>` : `<td data-label="操作" item-index="${index}">删除</td>`) : ''}
        </tr>`;
        tr = '';
    })
    return `
        <div class="show-data">
            <table class="show-data-table">
                <thead>${thead}</thead>
                <tbody>${tbody}</tbody>
            </table>
        </div>`;
}