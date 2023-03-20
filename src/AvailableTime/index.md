---
nav:
  path: /components
title: AvailableTime 可用时间
group:
  title: 数据录入
  order: 4
---

## 代码演示

### 基本用法

<code src="./demo/base.tsx"></code>

### 禁用

<code src="./demo/disabled.tsx"></code>

### 表单参数修改

<code src="./demo/formItemProps.tsx"></code>

## API

| 参数          | 说明                                                                                                       | 类型    | 默认值                                                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| maxCount      | 当添加 3 个时段不满足需求时使用                                                                            | number  | 3                                                                                                                                |
| disabled      | 需要禁止选择时使用                                                                                         | boolean | false                                                                                                                            |
| formItemProps | 是否全时段、周期、时段的表单配置，具体参考[antd.Form.Item](https://ant.design/components/form-cn#formitem) | -       | { fullTime: {name: 'fullTime', label: '可用时间' },weeks: {name: 'weeks',label: "周期" },times: {name: 'times',label: '时段' } } |
