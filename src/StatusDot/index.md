---
nav:
  path: /components
title: StatusDot 状态点
group:
  title: 通用
  order: 1
toc: content
---

## 代码演示

### 基本用法

```tsx
import { StatusDot } from '@tastien/tstd';
import React from 'react';

const App = () => (
  <>
    <StatusDot type="error" text="失败" />
    <StatusDot type="warning" text="警告" />
    <StatusDot type="success" text="成功" />
    <StatusDot type="info" text="信息" />
    <StatusDot type="cancel" text="取消" />
  </>
);

export default App;
```

## API

| 参数   | 说明       | 类型                                                    | 默认值 |
| ------ | ---------- | ------------------------------------------------------- | ------ |
| type   | 类型       | `error` \| `warning` \| `success` \| `info` \| `cancel` | -      |
| text   | 文案       | string                                                  | -      |
| radius | 圆角度     | number                                                  | 8      |
| style  | 自定义样式 | CSSProperties                                           | -      |
