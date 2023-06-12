import { ExportButton } from '@tastien/tstd';
import { Card, Layout } from 'antd';
import React from 'react';
const { ExportPageEntery } = ExportButton;

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const request = () => {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve('导出');
      }, 1000);
    });
  };

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#ffffff',
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <ExportPageEntery
            style={{ padding: '0 14px', cursor: 'pointer' }}
            BadgeSize="small"
            iconStyle={{ fontSize: 20 }}
          />
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#ffffff' }}>
            <Card
              title="人员报表"
              extra={
                <ExportButton request={request} type="default">
                  导出人员报表
                </ExportButton>
              }
            >
              这里时内容
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
