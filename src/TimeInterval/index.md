---
nav:
  path: /components
title: TimeInterval 时段
group:
  title: 数据录入
  order: 4
---

## 代码演示

### 基本用法

<code src="./demo/base.tsx"></code>

### 支持次日

<code src="./demo/nextDay.tsx"></code>

### 禁止选择

<code src="./demo/disabled.tsx"></code>

### 可添加最大值

<code src="./demo/maxCount.tsx"></code>

### 表单参数

假设你需将时段成必填或者修改字段名，那可以使用该参数

<code src="./demo/formItemProps.tsx"></code>

## API

| 参数           | 说明                                                                     | 类型    | 默认值 |
| -------------- | ------------------------------------------------------------------------ | ------- | ------ |
| supportNextDay | 结束日期需要支持次日时使用                                               | boolean | false  |
| disabled       | 需要禁止选择时使用                                                       | boolean | false  |
| maxCount       | 当添加 3 个时段不满足需求时使用                                          | number  | 3      |
| formItemProps  | 具体参考[antd.Form.Item](https://ant.design/components/form-cn#formitem) | -       | -      |
