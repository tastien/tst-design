---
nav:
  path: /components
title: PickerColor 颜色选择
group:
  title: 数据录入
  order: 4
toc: content
---

## 代码演示

### 基本用法

<code src="./demo/base.tsx"></code>

## API

| 参数        | 说明                           | 类型                    | 默认值 |
| ----------- | ------------------------------ | ----------------------- | ------ |
| popup       | 是否以气泡卡片的形式           | boolean                 | -      |
| value       | 值                             | ColorPickerValue        | -      |
| onChange    | 修改内容后的回调函数           | (value: string) => void | -      |
| blockStyles | 气泡卡片的形式时，选中块的样式 | (value: string) => void | -      |
