import React from 'react';

export type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  update_at?: number;
  children?: DataSourceType[];
};

export const columns: any = [
  {
    title: '活动名称',
    dataIndex: 'title',
    tooltip: '只读，使用form.getFieldValue获取不到值',
    formItemProps: (_form: any, { rowIndex }: any) => {
      return {
        rules:
          rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
      };
    },
    // 第一行不允许编辑
    editable: (_text: any, _record: any, index: number) => {
      return index !== 0;
    },
    width: '150px',
  },
  {
    title: '活动名称二',
    dataIndex: 'readonly',
    tooltip: '只读，使用form.getFieldValue可以获取到值',
    readonly: true,
    width: '150px',
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
    },
    width: '150px',
  },
  {
    title: '描述',
    dataIndex: 'decs',
    fieldProps: (form: any, { rowKey, rowIndex }: any) => {
      if (form.getFieldValue([rowKey || '', 'title']) === '不好玩') {
        return {
          disabled: true,
        };
      }
      if (rowIndex > 9) {
        return {
          disabled: true,
        };
      }
      return {};
    },
    width: '150px',
  },
  {
    title: '活动时间',
    dataIndex: 'created_at',
    valueType: 'date',
    width: '150px',
  },
];

export const pagination = {
  defaultPageSize: 50,
  defaultCurrent: 1,
  showQuickJumper: true,
  showTotal(total: any): any {
    return `总共${total}条数据`;
  },
  showSizeChanger: true,
  pageSizeOptions: ['10', '50', '100'],
};

export const getData = (count: number) => {
  const data = new Array(count).fill(null).map((_, index) => ({
    key: index,
    id: index,
    title: `活动名称 ${index}`,
    readonly: `活动名称 ${index}`,
    decs: '这个活动真好玩',
    state: 'open',
    created_at: 1590486176000,
    update_at: 1590486176000,
  }));

  return data;
};

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
