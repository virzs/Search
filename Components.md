# 组件说明

**以下说明组件仅适用于本项目，如需在其他项目中使用需要引入main.css。说明文档仅适用于本项目。**

[TOC]

## timeLine（时间线）：

**组件：**

```javascript
timeLine.component.js
```

**导入：**

```javascript
import timeLine from 'timeLine.component.js';
```

**使用：**

```js
Element.innerHTML = timeLine(data, 'inverted');
```

**参数说明：**

| 参数  |         说明         |  类型  |            可选值/格式             |  默认值  |
| :---: | :------------------: | :----: | :--------------------------------: | :------: |
| data  |   数据源，数组类型   | Array  |                                    |   [ ]    |
| order | 排序类型，正序、倒序 | String | positive（正序）、inverted（倒序） | positive |

**示例**

```javascript
import timeLine from 'timeLine.component.js';
let data = [{
    time:'2020/02/01',
    content:[{
        type:'add',//add添加、change修改、del删除、debug修复问题（如需其他状态请自行修改main.css）
        content:'时间线示例'
    },{
        type:'change',
        content:'说明文档'
    }]
}]
let timeLineEle = document.querySelect('#timeLineBox');
timeLineEle.innerHTML = timeLine(data, 'inverted');
```

