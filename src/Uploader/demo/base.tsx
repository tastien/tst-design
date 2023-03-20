import React, { useState } from 'react';
import { Uploader } from 'tstd';

const App: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  return (
    <>
      <Uploader
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        accept=".jpg,.png,.gif"
        maxCount={5}
        uploading={uploading}
        setUploading={setUploading}
        limitSize={5}
      />
    </>
  );
};

export default App;
