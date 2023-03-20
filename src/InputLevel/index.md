---
nav:
  path: /components
title: InputLevel 优先级输入框
group:
  title: 数据录入
  order: 4
---

## 代码演示

### 基本用法

<code src="./demo/base.tsx"></code>

## API

| 参数 | 说明                           | 类型                                  | 默认值                                 |
| ---- | ------------------------------ | ------------------------------------- | -------------------------------------- |
| form | 表单实例                       | FormInstance                          | -                                      |
| file | 优先级排序字段以及是否置顶字段 | { orderName: string topName: string;} | { orderName: 'order', topName: 'top' } |
