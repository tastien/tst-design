---
nav:
  path: /components
title: QRCode 二维码
group:
  title: 通用
  order: 3
toc: content
---

## 代码演示

### 基本用法

```tsx
import { QRCode } from '@tastien/tstd';
import React from 'react';

const App: React.FC = () => (
  <>
    <QRCode value="hello tstd" />
  </>
);

export default App;
```

### 带 icon 的二维码

```tsx
import { QRCode } from '@tastien/tstd';
import React from 'react';

const App: React.FC = () => (
  <>
    <QRCode
      value="hello tstd"
      icon="https://image.jimmyxuexue.top/img/202308171112069.png"
    />
  </>
);

export default App;
```

## API

| 参数       | 说明                                     | 类型       | 默认值   |
| ---------- | ---------------------------------------- | ---------- | -------- |
| value      | 扫描后的文本                             | string     | -        |
| size       | 二维码尺寸                               | number     | 160      |
| errorLevel | 二维码纠错等级                           | 0\|1\|2\|3 | 1        |
| colorDark  | 二维码前景色                             | string     | \#000000 |
| colorLight | 二维码背景色                             | string     | \#FFFFFF |
| icon       | 二维码中图片的地址（目前只支持图片地址） | string     | -        |
| iconSize   | 二维码中图片的大小                       | Number     | 40       |
