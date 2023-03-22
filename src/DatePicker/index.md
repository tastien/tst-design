---
nav:
  path: /components/h5
title: DatePicker 日期选择
group:
  title: H5
  order: 5
---

# DatePicker 日期选择

## 基本用法

```tsx
import { DatePicker } from '@tastien/tstd';
import React from 'react';

const App = () => (
  <DatePicker
    onChange={(value) => console.log(value)}
    onType={(value) => console.log(value)}
  />
);

export default App;
```

## 开启营业、自然日切换

```tsx
import { DatePicker } from '@tastien/tstd';
import React from 'react';

const App = () => (
  <DatePicker
    subTitle="支持营业、自然日切换"
    businessDaySwitch
    searchBusinessDay
    onChange={(value) => console.log(value)}
    onType={(value) => console.log(value)}
  />
);

export default App;
```

## 动态配置可选日期类型

```tsx
import { DatePicker } from '@tastien/tstd';
import React from 'react';

const App = () => (
  <DatePicker
    pickDateType={['date', 'week']}
    onChange={(value) => console.log(value)}
    onType={(value) => console.log(value)}
  />
);

export default App;
```

## API

| 参数              | 说明                                         | 类型                     | 默认值                 |
| ----------------- | -------------------------------------------- | ------------------------ | ---------------------- |
| style             | 自定义 style                                 | -                        | -                      |
| onChange          | 改变值后的回调                               | boolean                  | false                  |
| onType            | 改变日期类后的回调                           | (type: DateType) => void |                        |
| businessDaySwitch | 是否开启营业、自然日切换                     | boolean                  | -                      |
| searchBusinessDay | 如果开启开启营业、自然日切换，是否支持营业日 | boolean                  | true                   |
| rightIcon         | 右侧 Icon                                    | ReactNode                | `<CalendarOutlined />` |
| subTitle          | 日、周、月的副标题                           | -                        | -                      |
| disabledToday     | 禁用今天                                     | boolean                  | -                      |
| quickSwitchButton | 快速切换日期按钮参数                         | { date: Moment[] }       | -                      |
