---
nav:
  path: /components
title: QRCode 二维码
group:
  title: 数据展示
  order: 2
toc: content
---

# QRCode

能够将文本转换生成二维码的组件，支持自定义配色和 Logo 配置。

> 若二维码无法扫码识别，可能是因为链接地址过长导致像素过于密集，可以通过 size 配置二维码更大，或者通过短链接服务等方式将链接变短。

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

### 自定义二维码大小

```tsx
import { QRCode } from '@tastien/tstd';
import React from 'react';

const App: React.FC = () => (
  <>
    <QRCode value="hello tstd" size={300} />
  </>
);

export default App;
```

### 自定义二维码颜色

```tsx
import { QRCode } from '@tastien/tstd';
import React from 'react';

const App: React.FC = () => (
  <>
    <QRCode value="hello tstd" colorLight="#FFFFFF" colorDark="#5a9cf8" />
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
      icon="https://image.jimmyxuexue.top/img/202308171602225.png"
    />
  </>
);

export default App;
```

### 自定义二维码纠错等级

```tsx
import { QRCode } from '@tastien/tstd';
import React from 'react';

const App: React.FC = () => (
  <>
    <QRCode
      value="hello tstd"
      icon="https://image.jimmyxuexue.top/img/202308171602225.png"
      errorLevel={2}
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
