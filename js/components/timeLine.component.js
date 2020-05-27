export const timeLine = (data = [], order = 'positive') => {
    //positive正序
    //inverted倒序
    let html = '';
    let timeLineData = [];
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
            content += `
                <p class="item-content">
                    <span class="label ${inner.type}">
                        ${inner.type}
                    </span>
                    ${inner.content}
                </p>`;
        })
        html += `<div class="timeLine-item">${time}${content}</div>`;
    })
    return html;
}