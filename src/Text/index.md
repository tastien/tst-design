---
nav:
  path: /components
title: Text 文本
group:
  title: 数据展示
  order: 3
---

## 代码演示

### 基本用法

```tsx
import { Text } from '@tastien/tstd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Text type="primary">塔斯汀主题色的文本;</Text>
    <br />
    <Text type="grey">灰色的文本</Text>
  </>
);

export default App;
```

## API

| 参数 | 说明       | 类型                | 默认值    |
| ---- | ---------- | ------------------- | --------- |
| type | 文本的类型 | `primary` \| `grey` | `primary` |
