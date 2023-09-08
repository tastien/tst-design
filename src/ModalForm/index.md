---
nav:
  path: /components
title: ModalForm 弹框表单
group:
  title: 数据录入
  order: 4
toc: content
---

## 代码演示

### 基本用法

- 需要默认 loading 状态请将 onFinish/onOk 设置成异步

<code src="./demo/base.tsx"></code>

### table 里的弹窗

<code src="./demo/tableToModal.tsx"></code>

### 底部自定义

<code src="./demo/customFooter.tsx"></code>

### 底部样式自定义

<code src="./demo/footerType.tsx"></code>

### 隐藏底部按钮

<code src="./demo/hideFooter.tsx"></code>

## API

| 参数       | 说明         | 类型                                                      | 默认值 |
| ---------- | ------------ | --------------------------------------------------------- | ------ |
| trigger    | 触发内容     | React.ReactNode                                           | -      |
| modalProps | Modal 的参数 | [ModalProps](https://ant.design/components/modal-cn/#api) | -      |
| children   | 表单内容     | React.ReactNode                                           | -      |
| formProps  | Form 的参数  | [FormProps](https://ant.design/components/form-cn#form)   | -      |
