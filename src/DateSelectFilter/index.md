---
nav:
  path: /components
title: DateSelectFilter 日期选择
group:
  title: 数据录入
  order: 4
---

## 代码演示

### 基本用法

<code src="./demo/base.tsx"></code>

### 快速日期选择

<code src="./demo/quick.tsx"></code>

### 修改结束时间值

<code src="./demo/endMoment.tsx"></code>

## API

| 参数            | 说明                                                                                                                        | 类型                              | 默认值                                    |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------------- |
| className       | 自定义类名                                                                                                                  | boolean                           | false                                     |
| rangeLimit      | 日期的天数范围                                                                                                              | number                            | 31                                        |
| picks           | 可选择的规定范围                                                                                                            | [ValueEnums[]](#valueenums)       | ['DAY_1', 'DAY_7', 'DAY_30', 'CUSTOM']    |
| defaultDateType | 默认的规定范围, 分别为今天，昨天，前天，近 7 天，近 15 天，近 30 天，本周，上周，本月，上月，自然日，自然周，自然月，自定义 | [ValueEnums](#valueenums)         | -                                         |
| onChange        | 日期改变时的回调，value 返回的分别是：[日期值，格式化后的日期值，日期范围类型]                                              | (...args: [Value](#value)): void; | -                                         |
| endMoment       | 结束时间值，默认昨天                                                                                                        | Moment                            | moment().endOf('day').subtract(1, 'days') |

其他参数参考 antd 日期组件

## ValueEnums

```ts
ValueEnums =
  | 'DAY_0'
  | 'DAY_1'
  | 'DAY_2'
  | 'DAY_7'
  | 'DAY_15'
  | 'DAY_30'
  | 'CURRENT_WEEK'
  | 'LAST_WEEK'
  | 'CURRENT_MONTH'
  | 'LAST_MONTH'
  | 'CUSTOM'
  | 'WEEK'
  | 'MONTH'
  | 'DATE'
```

## Value

```ts
Value = [Moment[], string[], ValueEnums];
```
