import { Button } from 'antd';
import React from 'react';
import { ImportExcelModal } from 'tstd';

const App: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        导入
      </Button>
      {visible && (
        <ImportExcelModal
          visible={visible}
          onClose={() => setVisible(false)}
          templateUrl="https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fish-public.oss-cn-shanghai.aliyuncs.com%2Fish-erp-order%2Ffat%2Freport%2F7eb14eb7-602a-4416-8362-a67eb0ae3ee1%2F%25E9%2597%25A8%25E5%25BA%2597%25E8%25B0%2583%25E6%258B%25A8%25E5%258D%2595_2023-02-07_2023-02-13.xlsx%3FExpires%3D1991616608%26OSSAccessKeyId%3DLTAI4G9rgor8RbRNVjtsLqxi%26Signature%3DB5CiPsME%252FAdVznm4TSi%252B8uv2Iwc%253D&wdOrigin=BROWSELINK"
          upload={async () => {
            return new Promise(function (resolve) {
              setTimeout(function () {
                return resolve({
                  successCount: 1,
                  failCount: 0,
                });
              }, 2000);
            });
          }}
        />
      )}
    </>
  );
};

export default App;
