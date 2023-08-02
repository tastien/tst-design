---
nav:
  path: /components
title: AvailableTime 可用时间
group:
  title: 数据录入
  order: 4
toc: content
---

## 代码演示

### 基本用法

<code src="./demo/base.tsx"></code>

### 禁用

<code src="./demo/disabled.tsx"></code>

### 支持次日

<code src="./demo/supportNextDay.tsx"></code>

### radio 方向

<code src="./demo/radioDirection.tsx"></code>

### radio 参数修改

<code src="./demo/radioGroupProps.tsx"></code>

### 表单参数修改

<code src="./demo/formItemProps.tsx"></code>

## API

| 参数            | 说明                                                                                                       | 类型                       | 默认值                                                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| addButtonName   | 支持修改添加按钮名称                                                                                       | string                     | 新增时段                                                                                                                         |
| maxCount        | 当添加 3 个时段不满足需求时使用                                                                            | number                     | 3                                                                                                                                |
| disabled        | 需要禁止选择时使用                                                                                         | boolean                    | false                                                                                                                            |
| supportNextDay  | 是否支持次日                                                                                               | boolean                    | false                                                                                                                            |
| radioDirection  | radio 方向                                                                                                 | `horizontal` \| `vertical` | `horizontal`                                                                                                                     |
| radioGroupProps | radio 的配置，与 antd 一致                                                                                 | -                          | -                                                                                                                                |
| formItemProps   | 是否全时段、周期、时段的表单配置，具体参考[antd.Form.Item](https://ant.design/components/form-cn#formitem) | -                          | { fullTime: {name: 'fullTime', label: '可用时间' },weeks: {name: 'weeks',label: "周期" },times: {name: 'times',label: '时段' } } |
