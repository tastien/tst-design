import { Card, Layout, Table } from 'antd';
import React from 'react';
import { ExportButton } from 'tstd';
const { ExportPageEntery } = ExportButton;

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '高新区华健大厦5号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '高新区华健大厦5号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const request = () => {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve('导出');
      }, 2000);
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
              <Table dataSource={dataSource} columns={columns} />
            </Card>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Tastien Design ©2023 Created by Tastien
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
