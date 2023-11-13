import { Table, TableProps } from 'antd';
import _ from 'lodash';
import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import VCell from './components/VCell';
import VRow from './components/VRow';
import VTable from './components/VTable';
import VWrapper from './components/VWrapper';
import { DEFAULT_VID, vidMap } from './const';

import './style.css';

const vid = Math.random().toString();

export type TableRef = {
  scrollTo: (params: { row?: number }) => {
    vid: string;
    rowItemHeight: number;
  };
};
export interface virtualListProps extends TableProps<any> {
  height: number | string;
  reachEnd?: () => void;
  onScroll?: () => void;
  onListRender?: (listInfo: { start: number; renderLen: number }) => void;
  vid?: string;
  resetTopWhenDataChange?: boolean;
  ref?: any;
}

export function virtualList({
  vid = DEFAULT_VID,
  height,
  onScroll,
  onListRender,
  reachEnd,
  resetTopWhenDataChange = true,
}: virtualListProps) {
  return {
    table: (p: any) =>
      VTable(p, {
        vid,
        height,
        onScroll,
        reachEnd,
        onListRender,
        resetTopWhenDataChange,
      }),
    body: {
      wrapper: VWrapper,
      row: VRow,
      cell: VCell,
    },
  };
}

export function VirtualTable(
  {
    height,
    onScroll,
    onListRender,
    reachEnd,
    resetTopWhenDataChange = true,
    ...rest
  }: virtualListProps,
  ref?: React.Ref<TableRef>,
) {
  const virtualListComponents = useMemo(
    () =>
      virtualList({
        vid,
        height,
        onScroll,
        onListRender,
        reachEnd,
        resetTopWhenDataChange,
      }),
    [],
  );

  function scrollTo({ row }: { row?: number }) {
    try {
      const { scrollNode, rowItemHeight } = vidMap.get(vid);

      if (row) {
        if (row - 1 > 0) {
          scrollNode.scrollTop = (row - 1) * (rowItemHeight ?? 0);
        } else {
          scrollNode.scrollTop = 0;
        }
      }

      return { vid, rowItemHeight };
    } catch (e) {
      console.error('dont call scrollTo before init table');
      return { vid, rowItemHeight: -1 };
    }
  }

  useImperativeHandle(
    !_.isEmpty(ref) ? ref : null,
    () => ({
      scrollTo,
    }),
    [],
  );

  return <Table {...rest} components={virtualListComponents} />;
}

export default forwardRef(VirtualTable);
