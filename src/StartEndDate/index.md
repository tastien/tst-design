---
nav:
  path: /components
title: StartEndDate 起止时间
group:
  title: 数据展示
  order: 3
---

## 代码演示

### 基本用法

```tsx
import React from 'react';
import { StartEndDate } from 'tstd';

const App: React.FC = () => {
  const startTime = new Date().getTime();
  const endTime = new Date().getTime();
  return <StartEndDate date={[startTime, endTime]} />;
};

export default App;
```

## API

| 参数   | 说明           | 类型                              | 默认值       |
| ------ | -------------- | --------------------------------- | ------------ |
| date   | 起止时间       | (string \| number \| Moment \|)[] | -            |
| format | 时间的展示格式 | string                            | `YYYY-MM-DD` |
