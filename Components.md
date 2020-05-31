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

**参数说明：**

|  参数  |       说明       |  类型  | 可选值/格式 | 默认值 |
| :----: | :--------------: | :----: | :---------: | :----: |
|  data  | 数据源，数组类型 | Array  |             |  [ ]   |
| option |    自定义配置    | Object |             |   {}   |

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
let option = {
    order:'inverted',//排列顺序 positive正序、inverted倒序
    type:[{//自定义type
        name:'auto',//显示名称
        color:'#f5f5f5'//颜色值
    }]
}
let timeLineEle = document.querySelect('#timeLineBox');
timeLineEle.innerHTML = timeLine(data, option);
```

## Table（表格）：

**组件：**

```javascript
table.component.js
```

**导入：**

```javascript
import openTable from 'table.component.js';
```

**参数示例：**

|  参数  |  说明  |  类型  | 可选值/格式 | 默认值 |
| :----: | :----: | :----: | :---------: | :----: |
|  data  | 数据源 | Array  |             |   []   |
| option | 配置项 | Object |             |   {}   |

**示例：**

```javascript
import openTable from 'table.component.js';
let data = [{
    name: '张三',
    age: '18',
    color: '#f8f8f8'
}, {
	name: '李四',
    age: '22',
    color: '#666666'
}, {
    name: '王五',
    age: '34',
    color: '#d3d3d3'
}]
let option = {
    index: true, //是否显示序号，默认false
    indexLabel: '序号', //序号显示的label，默认#
    header: false, //是否显示表头，默认true
    menu: true, //是否显示操作栏，默认false
    menuSlot : (row, index) => {//自定义操作栏内容，默认显示删除
        return `<span item-index="${index}">删除</span>`
    },
    align: 'center', //表格对齐方式，默认center
    border: true, //表格边框，默认false
    column: [{
    	label: '姓名', //表头
    	prop: 'name', //绑定值
        slot: (row, index) => {//自定义列回调函数，row为该行的所有值，index为该列的下标
            return `<span style="color:${row.color};">${row.name}</span>`;
        },
        align: 'left' //列对齐方式，默认center
    }, {
    	label: '年龄',
    	prop: 'age'
    }]
}
let table = document.querySelect('#table');
table.innerHTML = optionTable(data, option);
```

