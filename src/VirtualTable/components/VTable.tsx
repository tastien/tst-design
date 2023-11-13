import { throttle } from 'lodash';
import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { virtualListProps } from '..';
import { vidMap } from '../const';
import { initialState, reducer, ScrollContext } from '../reducer';

export interface VTableProps {
  style: React.CSSProperties;
  children: ReactNode[];
}

function VTable(
  { style, children, ...rest }: VTableProps,
  otherParams: virtualListProps,
) {
  const { width, ...rest_style } = style;

  const {
    vid,
    height: scrollY,
    reachEnd,
    onScroll,
    resetTopWhenDataChange,
  } = otherParams ?? {};

  const [state, dispatch] = useReducer(reducer, initialState);

  const wrap_tableRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  // 数据的总条数
  const [totalLen, setTotalLen] = useState<number>(
    (children[1] as ReactElement)?.props?.data?.length ?? 0,
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

  // table的scrollY值，tableScrollY 随scrollY / tableHeight 进行变更。
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

      // 滚动距离 + 元素可见的高度 >= 元素的总高度
      // 而且之前元素的总高度不等于当前的元素总高度，即到底部
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

export default VTable;
