---
nav:
  path: /components
title: VirtualTable 虚拟列表
group:
  title: 数据展示
  order: 2
toc: content
---

## 基本用法

<code src="./demo/EasyTable.tsx"></code>

## 分页表格

<code src="./demo/PaginationTable.tsx"></code>

## 滚动到指定行

<code src="./demo/scrollTo.tsx"></code>

## API

| 参数                   | 说明                                                                          | 类型                                                     | 默认值 |
| ---------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------- | ------ |
| height                 | 文本的类型                                                                    | `number` \| `string`                                     | -      |
| reachEnd               | 到达底部时触发的函数                                                          | () => void                                               | -      |
| onScroll               | 滚动时触发的函数                                                              | () => void                                               | -      |
| onListRender           | 列表渲染时触发的回调函数，参数可以拿到 start: 渲染开始行, renderLen: 渲染行数 | (listInfo: { start: number; renderLen: number }) => void | -      |
| resetTopWhenDataChange | 重置 scrollTop 当数据变更的时候                                               | boolean                                                  | -      |
