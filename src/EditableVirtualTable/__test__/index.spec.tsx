import { render, screen } from '@testing-library/react';
import React from 'react';
import EditableVirtualTable from '..';
import { columns, getData, pagination, waitTime } from '../demo/const';

describe('EditableVirtualTable', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  const defauleColumns = [
    ...columns,
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (
        _text: any,
        record: { id: React.Key },
        _: any,
        action: { startEditable: (arg0: any) => void },
      ) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            console.log('delete', record.id);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const request = async () => ({
    data: getData(9999),
    total: 9999,
    success: true,
  });

  it('渲染基本用法可编辑虚拟列表', () => {
    render(
      <EditableVirtualTable
        rowKey="id"
        height={550}
        scroll={{ y: 550, x: '100%' }}
        loading={false}
        columns={defauleColumns}
        recordCreatorProps={false}
        request={request}
        value={getData(10000)}
        onChange={(e) => {
          console.log('onChange', e);
        }}
        resetTopWhenDataChange={false}
        editable={{
          type: 'multiple',
          editableKeys: [],
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: (e) => console.log('setEditableKeys', e),
        }}
      />,
    );
    expect(screen.getAllByText('活动名称 0')).toBeTruthy();
  });

  it('渲染分页可编辑虚拟列表', () => {
    render(
      <EditableVirtualTable
        rowKey="id"
        height={550}
        scroll={{ y: 550, x: '100%' }}
        loading={false}
        columns={defauleColumns}
        recordCreatorProps={false}
        request={request}
        value={getData(10000)}
        onChange={(e) => {
          console.log('onChange', e);
        }}
        resetTopWhenDataChange={false}
        pagination={pagination}
        editable={{
          type: 'multiple',
          editableKeys: [],
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: (e) => console.log('setEditableKeys', e),
        }}
      />,
    );
    expect(screen.getAllByText('活动名称 0')).toBeTruthy();
  });

  it('渲染可拖拽可编辑虚拟列表', () => {
    render(
      <EditableVirtualTable
        rowKey="id"
        height={550}
        scroll={{ y: 550, x: '100%' }}
        loading={false}
        columns={defauleColumns}
        recordCreatorProps={false}
        request={request}
        value={getData(10000)}
        onChange={(e) => {
          console.log('onChange', e);
        }}
        resetTopWhenDataChange={false}
        pagination={pagination}
        editable={{
          type: 'multiple',
          editableKeys: [],
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: (e) => console.log('setEditableKeys', e),
        }}
        draggable={true}
      />,
    );
    expect(screen.getAllByText('Sort')).toBeTruthy();
  });
});
