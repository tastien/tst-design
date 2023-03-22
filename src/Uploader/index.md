---
nav:
  path: /components
title: Uploader 上传
group:
  title: 数据录入
  order: 4
---

## 何时使用

上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

- 当需要上传一个或一些文件时。

- 当需要展现上传的进度时。

- 当需要使用拖拽交互时。

## 代码演示

### 基本用法

<code src="./demo/base.tsx"></code>

### 文件上传

<code src="./demo/fileUpload.tsx"></code>

## API

| 参数           | 说明                                                                                                                           | 类型                                                                            | 默认值         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | -------------- |
| accept         | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string                                                                          | -              |
| action         | 上传的地址                                                                                                                     | string \| ((file: RcFile) => string) \| ((file: RcFile) => PromiseLike<string>) | -              |
| maxCount       | 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件                                                                      | number                                                                          | -              |
| multiple       | 是否支持多选文件。开启后按住 ctrl 可选择多个文件                                                                               | boolean                                                                         | false          |
| disabled       | 是否禁用                                                                                                                       | boolean                                                                         | false          |
| listType       | 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card                                                             | string                                                                          | `picture-card` |
| limitSize      | 限制上传文件大小                                                                                                               | number                                                                          | 5              |
| beforeUpload   | 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。                                                                | (file, fileList) => boolean \| Promise \| Upload.LIST_IGNORE                    | -              |
| showUploadList | 是否展示文件列表, 可设为一个对象，用于单独设定相关 icon                                                                        | { }                                                                             | -              |
| uploading      | 上传加载态                                                                                                                     | boolean                                                                         | false          |
| setUploading   | 多张图片的情况下，设置加载态开关                                                                                               | (value: boolean) => void                                                        | -              |
| value          | 文件 url 值                                                                                                                    | string[] \| string                                                              | -              |
| onChange       | 上传图片变化的回调                                                                                                             | (values: string[] \| string) => void                                            | -              |
| resetValue     | 重置后的值                                                                                                                     | string[] \| string                                                              | -              |
| isSingle       | 是否只能上传单个文件                                                                                                           | boolean                                                                         | -              |
| additionalData | 上传所需额外参数或返回上传额外参数的方法                                                                                       | object \| (file) => object \| Promise                                           | -              |
| className      | 自定义类型                                                                                                                     | string                                                                          | -              |

其他参数参考[antd.Upload](https://ant-design.antgroup.com/components/upload-cn#api)
