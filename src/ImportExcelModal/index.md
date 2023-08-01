---
nav:
  path: /components
title: ImportExcelModal 导入Excel弹框
group:
  title: 数据录入
  order: 4
toc: content
---

## 何时使用

当你希望弹出一个弹框来导入 Excel 时

## 代码演示

<code src="./demo/base.tsx"></code>

## API

| 参数             | 说明                                    | 类型                                                    | 默认值 |
| ---------------- | --------------------------------------- | ------------------------------------------------------- | ------ |
| modalTitle       | 弹框标题                                | React.ReactNode                                         | -      |
| visible          | 是否打开弹框                            | boolean                                                 | -      |
| onClose          | 关闭回调函数， refresh 表示是否刷新数据 | (refresh: boolean) => void;                             | -      |
| templateUrl      | 下载模版                                | boolean                                                 | -      |
| downloadTemplate | 下载模板的接口                          | () => Promise<string>                                   | -      |
| upload           | 上传的接口                              | (file: UploadFile) => Promise<[UploadRes](##UploadRes)> | -      |

## UploadRes

```ts
type UploadRes = {
  failExcelUrl?: string;
  failCount?: number;
  successCount: number;
};
```
