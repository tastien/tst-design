import { createContext } from 'react';
import { DEFAULT_VID } from './const';

interface InitialState {
  rowHeight: number;
  curScrollTop: number;
  totalLen: number;
}

// =============== reducer ============== //
export const initialState: InitialState = {
  // 行高度
  rowHeight: 0,
  // 当前的scrollTop
  curScrollTop: 0,
  // 总行数
  totalLen: 0,
};

export function reducer(state: InitialState, action: any) {
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

// =============== context ============== //
export const ScrollContext = createContext({
  dispatch: undefined,
  renderLen: 1,
  start: 0,
  offsetStart: 0,
  // =============
  rowHeight: initialState.rowHeight,
  totalLen: 0,
  vid: DEFAULT_VID,
} as any);
