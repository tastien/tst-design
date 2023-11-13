import { render, screen } from '@testing-library/react';
import React from 'react';
import { ceasyTableColumns, easyTableData, pagination } from '../demo/const';
import { VirtualTable } from '../index';

describe('VirtualTable', () => {
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

  it('渲染基本用法虚拟列表', () => {
    render(
      <VirtualTable
        height={550}
        columns={ceasyTableColumns}
        dataSource={easyTableData}
        scroll={{ y: 550, x: '100%' }}
        rowKey="key"
      />,
    );
    expect(screen.getByText('New York No. 1 Lake Park')).toBeTruthy();
  });

  it('渲染分页虚拟列表', () => {
    render(
      <VirtualTable
        height={550}
        columns={ceasyTableColumns}
        dataSource={easyTableData}
        scroll={{ y: 550, x: '100%' }}
        rowKey="key"
        pagination={pagination}
      />,
    );
    expect(screen.getByText('New York No. 1 Lake Park')).toBeTruthy();
  });
});
