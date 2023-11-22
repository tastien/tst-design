---
nav:
  path: /components
title: EditableVirtualTable 可编辑的虚拟列表
group:
  title: 数据展示
  order: 2
toc: content
---

# EditableVirtualTable 可编辑的虚拟列表

可编辑的虚拟列表 EditableVirtualTable 与 EditableProTable 的功能基本相同，该组件在 EditableProTable 的基础上支持虚拟列表与拖拽排序。

## 基本用法

<code src="./demo/EasyTable.tsx"></code>

## 分页表格

<code src="./demo/PaginationTable.tsx"></code>

## 可拖拽

<code src="./demo/DraggableTable.tsx"></code>

## API

更多 api 可参考: <a target="_blank" href="https://procomponents.ant.design/components/editable-table#api">EditableProTable</a>

| 参数                   | 说明                                                                          | 类型                                                     | 默认值 |
| ---------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------- | ------ |
| height                 | table 高度                                                                    | `number` \| `string`                                     | -      |
| draggable              | 是否可拖动                                                                    | boolean                                                  | false  |
| reachEnd               | 到达底部时触发的函数                                                          | () => void                                               | -      |
| onScroll               | 滚动时触发的函数                                                              | () => void                                               | -      |
| onListRender           | 列表渲染时触发的回调函数，参数可以拿到 start: 渲染开始行, renderLen: 渲染行数 | (listInfo: { start: number; renderLen: number }) => void | true   |
| resetTopWhenDataChange | 重置 scrollTop 当数据变更的时候                                               | boolean                                                  | -      |
