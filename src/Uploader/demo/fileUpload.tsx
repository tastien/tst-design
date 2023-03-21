import { Uploader } from '@tastien/tstd';
import React from 'react';
const { FileUpload } = Uploader;

const App: React.FC = () => {
  return (
    <FileUpload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      isSingle
      fileName="背景音乐"
      accept=".xlsx"
    />
  );
};

export default App;
