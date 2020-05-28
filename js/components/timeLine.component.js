export const timeLine = (data = [], option = {}) => {
    //positive正序
    //inverted倒序
    let html = '';
    let timeLineData = [];
    let order = option.order || 'positive';
    let type = option.type || [];
    data.forEach(item => {
        if (order == 'inverted') {
            timeLineData.unshift(item);
        } else {
            timeLineData.push(item);
        }
    })
    timeLineData.forEach((item, index) => {
        let time = `<div class="item-title"> ${item.time}</div>`;
        let content = '';
        item.content.forEach((inner, i) => {
            let color = type.find(color => color.name == inner.type);
            content += `
                <p class="item-content">
                    <span class="label ${inner.type}" style="background:${color?color.color:''}">
                        ${inner.type}
                    </span>
                    ${inner.content}
                </p>`;
        })
        html += `<div class="timeLine-item">${time}${content}</div>`;
    })
    return html;
}