export const openTable = (data = [], option = {}) => {
    let column = Object.is(option.column, undefined) ? [] : option.column; //列
    let showIndex = Object.is(option.index, undefined) ? false : option.index; //序号
    let indexLabel = Object.is(option.indexLabel, undefined) ? '#' : option.indexLabel; //序号文字
    let showHeader = Object.is(option.header, undefined) ? true : option.header; //表头显隐
    let showMenu = Object.is(option.menu, undefined) ? false : option.menu; //操作栏
    let menuSlot = Object.is(option.menuSlot, undefined) ? '' : option.menuSlot; //自定义操作栏
    let tableAlign = Object.is(option.align, undefined) ? 'center' : option.align; //表格对齐方式
    let tableBorder = Object.is(option.border, undefined) ? false : option.border; //表格边框
    let thead = ''; //表头
    let th = ''; //表头列
    let tbody = ''; //表内容
    let tr = ''; //表内容列
    //渲染表头列
    column.forEach((item, index) => {
        th += `
            <th
                style="width:${100/(column.length+2)}%;text-align:"${item.align || ''} ${tableBorder ? `border-top:1px solid #dee2e6;border-left:1px solid #dee2e6;` : ''}">
                ${item.label}
            </th>`;
    })
    // 合并表头列
    if (showHeader) {
        thead = `
            <tr align=${tableAlign}>
                ${showIndex ? `
                <th
                    style="width:${100/(column.length+2)}%;${tableBorder ? `border-top:1px solid #dee2e6;border-left:1px solid #dee2e6;` : ''}">
                    ${indexLabel}
                </th>` : ''}
                ${th}
                ${showMenu ? `
                <th
                    style="width:${100/(column.length+2)}%;${tableBorder ? `border-top:1px solid #dee2e6;border-left:1px solid #dee2e6;` : ''}">
                    操作
                </th>` : ''}
            </tr>`;
    }
    // 渲染数据
    if (data) {
        data.forEach((item, index) => {
            column.forEach(inner => {
                if (inner.slot) {
                    //自定义列
                    tr += `
                        <td
                            style="width:${100/(column.length+2)}%;text-align:${inner.align || ''} ${tableBorder ? `border-top:1px solid #dee2e6;border-left:1px solid #dee2e6;` : ''} data-label="${inner.label}">
                            ${inner.slot(item,index)}
                        </td>`;
                } else {
                    tr += `
                        <td
                            style="width:${100/(column.length+2)}%;text-align:${inner.align || ''} ${tableBorder ? `border-top:1px solid #dee2e6;border-left:1px solid #dee2e6;` : ''} data-label="${inner.label}">
                            ${item[inner.prop]}
                        </td>`;
                }
            })
            tbody += `
                <tr align=${tableAlign}>
                    ${showIndex ? `
                    <td
                        style="${tableBorder ? `border-top:1px solid #dee2e6;border-left:1px solid #dee2e6;` : ''} data-label="${indexLabel}">
                        ${index+1}
                    </td>` : ''}
                    ${tr}
                    ${showMenu ? (menuSlot ? `
                    <td
                        style="${tableBorder ? `border-top:1px solid #dee2e6;border-left:1px solid #dee2e6;` : ''} data-label="操作">
                        ${menuSlot(item,index)}
                    </td>` : `
                    <td data-label="操作" item-index="${index}">
                        删除
                    </td>`) : ''}
                </tr>`;
            tr = '';
        })
    }
    if (Object.is(data.length, 0)) {
        tbody = `
            <tr class="no-data">
                <td colspan="5">
                    <i class="fa fa-window-close"></i> 暂无数据
                </td>
            </tr>`;
    }
    return `
        <div class="show-data">
            <table class="show-data-table" ${tableBorder ? `style="border-bottom:1px solid #dee2e6;border-right:1px solid #dee2e6;` : '""'}">
                <thead>${thead}</thead>
                <tbody>${tbody}</tbody>
            </table>
        </div>`;
}