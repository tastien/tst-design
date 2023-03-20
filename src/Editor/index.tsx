import { message, Upload } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { ContentUtils } from 'braft-utils';
import * as React from 'react';
import { useEffect, useState } from 'react';
import tokenUtils from '../utils/tokenUtils';
import './styles.less';

type TProps = {
  action?: string;
  value?: string;
  onChange: (value: string) => void;
};

const Editor = ({ value, onChange, action }: TProps) => {
  const [editorValue, setEditorValue] = useState(
    BraftEditor.createEditorState(value),
  );

  const handleEditorChange = (e: string) => {
    setEditorValue(e);
  };

  useEffect(() => {
    setEditorValue(BraftEditor.createEditorState(value));
  }, []);

  useEffect(() => {
    onChange(editorValue.toHTML());
  }, [editorValue]);

  const uploadFiles = {
    accept: 'image/*', // 只接受图片
    name: 'file',
    headers: { 'user-token': tokenUtils.getToken() },
    action, // 这里是上传图片接口的url
    showUploadList: false,

    onChange: (info: any) => {
      if (info.file.status === 'done') {
        const value = ContentUtils.insertMedias(editorValue, [
          {
            type: 'IMAGE',
            url: info.file.response.result, // 图片url,
          },
        ]);
        setEditorValue(value);
      } else if (info.file.status === 'error') {
        message.error('上传失败');
      }
    },
  };

  const extendControls = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload {...uploadFiles}>
          {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
          <button
            type="button"
            className="control-item button upload-button"
            data-title="插入图片"
          >
            图片
          </button>
        </Upload>
      ),
    },
  ];

  const controls: any[] = [
    'undo',
    'redo',
    'separator',
    'font-size',
    'line-height',
    'letter-spacing',
    'separator',
    'text-color',
    'bold',
    'italic',
    'underline',
    'strike-through',
    'separator',
    'superscript',
    'subscript',
    'remove-styles',
    'emoji',
    'separator',
    'text-indent',
    'text-align',
    'separator',
    'headings',
    'list-ul',
    'list-ol',
    'blockquote',
    'code',
    'separator',
    'link',
    'separator',
    'hr',
    'separator',
    'separator',
    'clear',
  ];
  return (
    <BraftEditor
      value={editorValue}
      onChange={handleEditorChange}
      controls={controls}
      style={{ width: '80%' }}
      contentStyle={{
        display: 'flex',
        width: '100%',
        height: 500,
        minHeight: 400,
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,.2)',
      }}
      // @ts-ignore
      extendControls={extendControls}
    />
  );
};

export default Editor;
