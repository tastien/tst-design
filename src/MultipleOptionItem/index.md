---
nav:
  path: /components
title: MultipleOptionItem 选择输入联动
group:
  title: 数据录入
  order: 4
---

## 代码演示

### 基本用法

<code src="./demo/base.tsx"></code>

## API

| 参数           | 说明                                                                            | 类型                                                                   | 默认值     |
| -------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------- |
| options        | 切换输入框 key 配置数据                                                         | { value: unknown; name: string }[]                                     | -          |
| inputItemName  | 字段值，在获取输入框的值的时候使用，如：`[values.searchType]: values.keyword`,  | string                                                                 | keyword    |
| optionItemName | 字段名，在表单中获取字段名的时候使用，如：`[values.searchType]: values.keyword` | (value: any, option: DefaultOptionType \| DefaultOptionType[]) => void | searchType |
