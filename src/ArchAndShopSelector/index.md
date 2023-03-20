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

## value 值 受控

value 值受控有两种模式，一种是只控制门店值，一种是同时受控门店和组织。

### SHOP 模式

shop 模式下， controlMode 传`SHOP`，value 的值类型必须为 `number[] | undefinde`

<code src="./demo/base-shop"></code>

### BOTH 模式

shop 模式下， controlMode 传`BOTH`，value 的值类型必须为 [`ArchAndShopValue`](##archandshopvalue)

<code src="./demo/base-both"></code>

## 通过 context 传递数据

通过 Context 传递给组件

注意： 当组件同时使用 `archList`参数 和 `Context` 传递数据时，`archList`优先级更高

<code src="./demo/context"></code>

## 确保数据被加载后渲染页面

在页面进行首次查询的时候，我们需要传递账号所属的组织架构的全部 shopIds，这就要求页面被渲染之前所需的组织架构数据已经准备完毕，这时可以将通过`createArchDataLoadedWrap`函数将页面组件包裹起来，实现这个效果。

<code src="./demo/createArchDataLoadedWrap"></code>

## API

| 参数        | 说明               | 类型                                               | 默认值 |
| ----------- | ------------------ | -------------------------------------------------- | ------ |
| onChange    | 改变值后的回调     | (value?: number[]) => void                         | -      |
| controlMode | value 值的受控模式 | 'SHOP' \| 'BOTH'                                   | -      |
| value       | 受控值             | number[] \| [ArchAndShopValue](##archandshopvalue) | -      |

## ArchAndShopValue

```ts
type ArchAndShopValue = [number[] | undefined, number[] | undefined];
```
