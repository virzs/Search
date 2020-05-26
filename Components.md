# 组件

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

| 参数  |         说明         |  类型  |               可选值               |  默认值  |
| :---: | :------------------: | :----: | :--------------------------------: | :------: |
| value |   数据源，数组类型   | Array  |                                    |   [ ]    |
| order | 排序类型，正序、倒序 | String | positive（正序）、inverted（倒序） | positive |

