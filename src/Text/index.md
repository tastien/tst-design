---
nav:
  path: /components
title: Text 文本
group:
  title: 数据展示
  order: 3
toc: content
---

## 代码演示

### 基本用法

```tsx
import { Text } from '@tastien/tstd';
import React from 'react';
import './style.less';

const App: React.FC = () => (
  <>
    <Text type="primary">塔斯汀主题色的文本;</Text>
    <br />
    <Text type="grey">灰色的文本</Text>
  </>
);

export default App;
```

### 超出省略展示

```tsx
import { Text } from '@tastien/tstd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Text ellipsisWidth={100}>塔斯汀主题色的文本;</Text>
    <br />
    <Text type="grey" ellipsisWidth={50}>灰色的文本</Text>
  </>
);

export default App;
```

### 文本加粗

```tsx
import { Text } from '@tastien/tstd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Text bold>塔斯汀主题色的文本;</Text>
  </>
);

export default App;
```

## API

| 参数           | 说明                              | 类型                | 默认值     |
| -------------- | -------------------------------- | ------------------- | ---------- |
| type           | 文本的类型                        | `primary` \| `grey` | `primary`  |
| ellipsisWidth  | 当文本超过指定宽度需要省略时使用    | `number`\| `string` | -          |
| bold           | 文本加粗                          | boolean             | -          |