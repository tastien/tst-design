---
nav:
  path: /components
title: ArchAndShopSelector 组织与门店选择
group:
  title: 数据录入
  order: 4
---

# 组织与门店选择

组件数据有两种来源：

1. 通过组件本身的 archList props 传递给组件

2. 通过组件提供的 Context 的传递。

## 基本用法

`controlMode` 在 `SHOP` 模式下，`value` 和 `onChange` 的数据格式是 `number[]` 格式的门店 id

<code src="./demo/base-shop"></code>

`controlMode` 在 `BOTH` 模式下，`value` 和 `onChange` 的数据格式是`[number[], number[]]`格式的组织架构 `id` 和门店 `id` 元组

<code src="./demo/base-both"></code>

## 配合 AntdForm 使用

shop 模式下， controlMode 传`SHOP`，返回门店 ID，类型为 `number[] | undefinde`

<code src="./demo/form-shop"></code>

shop 模式下， controlMode 传`BOTH`，返回组织以及门店 ID，类型为 [`ArchAndShopValue`](##archandshopvalue)

<code src="./demo/form-both"></code>

## 通过 context 传递数据

通过 Context 传递给组件

注意： 当组件同时使用 `archList`参数 和 `Context` 传递数据时，`archList`优先级更高

<code src="./demo/context"></code>

## 确保数据被加载后渲染页面

在页面进行首次查询的时候，我们需要传递账号所属的组织架构的全部 shopIds，这就要求页面被渲染之前所需的组织架构数据已经准备完毕，这时可以将通过`createArchDataLoadedWrap`函数将页面组件包裹起来，实现这个效果。

<code src="./demo/createArchDataLoadedWrap"></code>

## 门店单选

<code src="./demo/single-selector"></code>

## API

| 参数        | 说明                     | 类型                                               | 默认值 |
| ----------- | ------------------------ | -------------------------------------------------- | ------ |
| archList    | 组织和门店的数据列表数据 | ArchNode                                           | -      |
| onChange    | 改变值后的回调           | (value?: number[]) => void                         | -      |
| controlMode | value 值的受控模式       | 'SHOP' \| 'BOTH'                                   | -      |
| value       | 受控值                   | number[] \| [ArchAndShopValue](##archandshopvalue) | -      |

## useArchAndShopDefaultValue

该组件提供的一个 hook，用于获取组织与门店选择的默认值，需要配合配合 createArchDataLoadedWrap 一起使用保证数据已经加载完成，否则默认值会是错误的

- archIds: 所有的组织 ID
- shopIds：所有的门店 ID
- archMap: 转换组织结构数据为 Map
- getShopIdsByArchIds: 一个函数，获取门店 ID 根据组织 ID，返回一个数组
- allShopList：返回所有门店列表

## ArchAndShopValue

```ts
type ArchAndShopValue = [number[] | undefined, number[] | undefined];
```
