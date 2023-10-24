/* eslint-disable arrow-body-style */
import { throttle } from 'lodash';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';

import { Table, TableProps } from 'antd';
import './style.css';

interface InitialState {
  rowHeight: number;
  curScrollTop: number;
  totalLen: number;
}

// ==============全局常量 ================== //
const DEFAULT_VID = 'vtable';
const vidMap = new Map();

// ===============reducer ============== //
const initialState: InitialState = {
  // 行高度
  rowHeight: 0,
  // 当前的scrollTop
  curScrollTop: 0,
  // 总行数
  totalLen: 0,
};

function reducer(state: InitialState, action: any) {
  const { curScrollTop, rowHeight, totalLen, ifScrollTopClear } = action;

  let stateScrollTop = state.curScrollTop;
  switch (action.type) {
    // 改变trs 即 改变渲染的列表trs
    case 'changeTrs':
      return {
        ...state,
        curScrollTop,
      };
    // 初始化每行的高度, 表格总高度, 渲染的条数
    case 'initHeight':
      return {
        ...state,
        rowHeight,
      };
    // 更改totalLen
    case 'changeTotalLen':
      if (totalLen === 0) {
        stateScrollTop = 0;
      }

      return {
        ...state,
        totalLen,
        curScrollTop: stateScrollTop,
      };

    case 'reset':
      return {
        ...state,
        curScrollTop: ifScrollTopClear ? 0 : state.curScrollTop,
      };
    default:
      throw new Error();
  }
}
// ===============context ============== //
const ScrollContext = createContext({
  dispatch: undefined,
  renderLen: 1,
  start: 0,
  offsetStart: 0,
  // =============
  rowHeight: initialState.rowHeight,
  totalLen: 0,
  vid: DEFAULT_VID,
} as any);

// =============组件 ===================

function VCell(props: any): JSX.Element {
  const { children, ...restProps } = props;

  return (
    <td {...restProps}>
      <div>{children}</div>
    </td>
  );
}

function VRow(props: any, ref: any) {
  const { dispatch, rowHeight, totalLen, vid } = useContext(ScrollContext);

  const { children, ...resetProps } = props;
  const trRef = useRef<HTMLTableRowElement>(null);

  // 初始化高度
  const initHeight = (tempRef: { current: { offsetHeight: number } }) => {
    if (tempRef?.current?.offsetHeight && !rowHeight && totalLen) {
      // 元素的高度：包括元素高度、内边距、边框
      const tempRowHeight = tempRef?.current?.offsetHeight ?? 0;

      vidMap.set(vid, {
        ...vidMap.get(vid),
        rowItemHeight: tempRowHeight,
      });

      dispatch({
        type: 'initHeight',
        rowHeight: tempRowHeight,
      });
    }
  };

  useEffect(() => {
    initHeight(
      Object.prototype.hasOwnProperty.call(ref, 'current') ? ref : trRef,
    );
  }, [trRef, dispatch, rowHeight, totalLen, ref, vid]);

  return (
    <tr
      ref={Object.prototype.hasOwnProperty.call(ref, 'current') ? ref : trRef}
      {...resetProps}
    >
      {children}
    </tr>
  );
}

function VWrapper(props: any) {
  // 一个jsx数组，包括所有的列表内容
  const { children, ...restProps } = props;
  const { renderLen, start, dispatch, vid, totalLen } =
    useContext(ScrollContext);

  // 取到wrap传下来的 children的第二个作为列表数据
  const contents = useMemo(() => {
    return children[1];
  }, [children]);

  // 取到wrap传下来的 children的第二个作为列表条数
  const contentsLen = useMemo(() => {
    return contents?.length ?? 0;
  }, [contents]);

  // 如果从元素取到的内容条数和总条数不一样，将总条数改成内容条数值
  useEffect(() => {
    if (totalLen !== contentsLen) {
      dispatch({
        type: 'changeTotalLen',
        totalLen: contentsLen ?? 0,
      });
    }
  }, [contentsLen, dispatch, vid, totalLen]);

  let tempNode = null;
  // 如果存在列表内容
  if (Array.isArray(contents) && contents.length) {
    tempNode = [
      // 用于渲染表格外壳的元素
      children[0],
      // 根据start、renderLen，切割数据要渲染的数据
      contents.slice(start, start + (renderLen ?? 1)).map((item) => {
        if (Array.isArray(item)) {
          // 兼容antd v4.3.5 --- rc-table 7.8.1及以下
          return item[0];
        }
        // 处理antd ^v4.4.0  --- rc-table ^7.8.2
        return item;
      }),
    ];
  } else {
    // 此时的children有两个元素，一个是Table, 一个是暂无数据的。
    // 渲染的是暂无数据表格
    tempNode = children;
  }

  return <tbody {...restProps}>{tempNode}</tbody>;
}

function VTable(props: any, otherParams: any) {
  const { style, children, ...rest } = props;
  const { width, ...rest_style } = style;

  const { vid, scrollY, reachEnd, onScroll, resetTopWhenDataChange } =
    otherParams ?? {};

  const [state, dispatch] = useReducer(reducer, initialState);

  const wrap_tableRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  // 数据的总条数
  const [totalLen, setTotalLen] = useState<number>(
    children[1]?.props?.data?.length ?? 0,
  );

  useEffect(() => {
    setTotalLen(state.totalLen);
  }, [state.totalLen]);

  // 组件卸载的清除操作
  useEffect(() => {
    return () => {
      vidMap.delete(vid);
    };
  }, [vid]);

  /** Table总高度 */

  const tableHeight = useMemo<string | number>(() => {
    let temp: string | number = 'auto';
    if (state.rowHeight && totalLen) {
      temp = state.rowHeight * totalLen;
    }
    return temp;
  }, [state.rowHeight, totalLen]);

  // table的scrollY值
  // tableScrollY 随scrollY / tableHeight 进行变更

  // 传进来的height，超出多少开始滚动

  const tableScrollY = useMemo(() => {
    let temp = 0;
    if (typeof scrollY === 'string') {
      // 取表格父级的offsetHeight
      temp =
        (wrap_tableRef.current?.parentNode as HTMLElement)?.offsetHeight ?? 0;
    } else {
      temp = scrollY;
    }

    // 处理tableScrollY <= 0的情况
    if (temp <= 0) {
      temp = 0;
    }
    return temp;
  }, [scrollY, tableHeight]);

  // 渲染中的第一条
  //
  let start = state.rowHeight ? (state.curScrollTop / state.rowHeight) | 0 : 0;

  // 偏移量
  let offsetStart = state.rowHeight ? state.curScrollTop % state.rowHeight : 0;

  // 用来优化向上滚动出现的空白
  if (
    state.curScrollTop &&
    state.rowHeight &&
    state.curScrollTop > state.rowHeight
  ) {
    start -= 1;
    offsetStart += state.rowHeight;
  } else {
    start = 0;
  }

  // 渲染的条数
  const renderLen = useMemo<number>(() => {
    let temp = 1;
    if (state.rowHeight && totalLen && tableScrollY) {
      if (tableScrollY <= 0) {
        temp = 0;
      } else {
        // 这里干嘛 + 1 + 2
        const tempRenderLen = ((tableScrollY / state.rowHeight) | 0) + 1 + 2;

        temp = tempRenderLen;
      }
    }

    return temp;
  }, [state.rowHeight, totalLen, tableScrollY]);

  // 数据变更 操作scrollTop
  useEffect(() => {
    const scrollNode = wrap_tableRef.current?.parentNode as HTMLElement;

    // 如果该属性为true，那么当数据变更的时候重置ScrollTop
    if (resetTopWhenDataChange) {
      // 重置scrollTop
      if (scrollNode) {
        scrollNode.scrollTop = 0;
      }

      dispatch({ type: 'reset', ifScrollTopClear: true });
    }

    dispatch({ type: 'reset', ifScrollTopClear: false });
    // 这为什么写在这
    if (vidMap.has(vid)) {
      vidMap.set(vid, {
        ...vidMap.get(vid),
        scrollNode,
      });
    }
  }, [totalLen, resetTopWhenDataChange, vid, children]);

  useEffect(() => {
    const throttleScroll = throttle((e) => {
      const historyScrollHeight = vidMap.get(vid)?.scrollHeight;
      // 元素顶部到视口顶部的距离，也就是滚动条滚动的距离
      const scrollTop: number = e?.target?.scrollTop ?? 0;
      // 属性表示元素内容的总高度，包括视口中不可见的部分。通常情况下，scrollHeight大于元素的可见高度。
      const scrollHeight: number = e?.target?.scrollHeight ?? 0;
      // 元素的高度：包括元素高度、内边距，不包括边框和外边距
      const clientHeight: number = e?.target?.clientHeight ?? 0;

      // 滚动距离 + 元素可见的高度 >= 元素的总高度 而且 之前元素的总高度不等于当前的元素总高度
      // 这其实就是到底了
      if (
        scrollTop + clientHeight >= scrollHeight &&
        historyScrollHeight !== scrollHeight
      ) {
        // 相同的tableData情况下, 上次reachEnd执行后, scrollHeight不变, 则不会再次请求reachEnd
        vidMap.set(vid, {
          ...vidMap.get(vid),
          scrollHeight,
        });
        // 有滚动条的情况
        if (reachEnd) reachEnd();
      }

      if (onScroll) onScroll();

      // 若渲染的条数大于总条数, 回返回顶部。置空curScrollTop. => table paddingTop会置空.

      dispatch({
        type: 'changeTrs',
        curScrollTop: renderLen <= totalLen ? scrollTop : 0,
        vid,
      });
    }, 60);
    const ref = wrap_tableRef?.current?.parentNode as HTMLElement;

    if (ref) {
      ref.addEventListener('scroll', throttleScroll);
    }

    return () => {
      ref.removeEventListener('scroll', throttleScroll);
    };
  }, [onScroll, reachEnd, renderLen, totalLen, vid]);

  return (
    <div
      className="virtuallist"
      ref={wrap_tableRef}
      style={{
        width: '100%',
        position: 'relative',
        height: tableHeight,
        boxSizing: 'border-box',
        paddingTop: state.curScrollTop,
      }}
    >
      <ScrollContext.Provider
        value={{
          dispatch,
          rowHeight: vidMap?.get(vid)?.rowItemHeight,
          start,
          offsetStart,
          renderLen,
          totalLen,
          vid,
        }}
      >
        <table
          {...rest}
          ref={tableRef}
          style={{
            ...rest_style,
            width,
            position: 'relative',
            transform: `translateY(-${offsetStart}px)`,
          }}
        >
          {children}
        </table>
      </ScrollContext.Provider>
    </div>
  );
}

interface virtualListProps {
  height: number | string;
  reachEnd?: () => void;
  onScroll?: () => void;
  // 列表渲染时触发的回调函数(参数可以拿到 start: 渲染开始行, renderLen: 渲染行数)
  // listRender: provide info: {start, renderLen} on render list.
  // start: start index in render list.
  // renderLen: render length in render list.
  onListRender?: (listInfo: { start: number; renderLen: number }) => void;
  // 列表渲染时触发的回调函数防抖毫秒数.
  // listRender debounceMs.
  // 唯一标识
  vid?: string;
  // 重置 scrollTop 当数据变更的时候
  // reset scrollTop when data change
  resetTopWhenDataChange?: boolean;
}

// ================导出===================
export function virtualList(props: virtualListProps) {
  const {
    vid = DEFAULT_VID,
    height,
    onScroll,
    onListRender,
    reachEnd,
    resetTopWhenDataChange = true,
  } = props;

  return {
    table: (p: any) =>
      VTable(p, {
        vid,
        scrollY: height,
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

export function VirtualTable(props: TableProps<any> & virtualListProps) {
  const {
    height,
    onScroll,
    onListRender,
    reachEnd,
    resetTopWhenDataChange = true,
    ...rest
  } = props;

  const components = useMemo(
    () =>
      virtualList({
        vid: Math.random().toString(),
        height,
        onScroll,
        onListRender,
        reachEnd,
        resetTopWhenDataChange,
      }),
    [],
  );

  return <Table {...rest} components={components} />;
}

VirtualTable.virtualList = virtualList;
VirtualTable.scrollTo = scrollTo;

export default VirtualTable;
