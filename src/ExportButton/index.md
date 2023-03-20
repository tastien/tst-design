---
nav:
  path: /components
title: ExportButton 导出按钮
group:
  title: 通用
  order: 1
---

## 代码演示

### 基本用法

<code src="./demo/base.tsx"></code>

### 添加动效

<code src="./demo/animation.tsx"></code>

## API

### ExportButton

| 参数           | 说明                         | 类型                      | 默认值                             |
| -------------- | ---------------------------- | ------------------------- | ---------------------------------- |
| request        | 请求接口函数                 | () => Promise`<any>` \| - | -                                  |
| onSuccess      | 导出接口请求成功后的回调函数 | (e: any) => void          | -                                  |
| successMessage | 导入成功后的消息提示         | string                    | 报表导出成功，可前往我的导出查看。 |
| icon           | 按钮内容前的图标             | React.ReactNode           | `<DownloadOutlined />`             |
| children       | 标签内的子元素               | React.ReactNode           |

其他 API 参考[antd.Button](https://ant.design/components/button-cn/#API)

### ExportPageEntery

导入页面的入口图标

| 参数      | 说明                        | 类型                | 默认值 |
| --------- | --------------------------- | ------------------- | ------ |
| onClick   | 点击事件，一般来用于跳转    | () => void          | -      |
| className | 组件的 className 属性       | string              | -      |
| style     | 组件的 style 属性           | string              | -      |
| iconStyle | 导出图标的 style 属性       | React.CSSProperties | -      |
| badgeSize | 导出图标 badge 的 size 属性 | React.CSSProperties | -      |
