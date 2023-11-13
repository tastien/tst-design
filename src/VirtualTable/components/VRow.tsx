import React, { useContext, useEffect, useRef } from 'react';
import { vidMap } from '../const';
import { ScrollContext } from '../reducer';

export interface VRowProps {
  children: React.ReactNode;
}

const VRow: React.FC<VRowProps> = ({ children, ...resetProps }, ref) => {
  const { dispatch, rowHeight, totalLen, vid } = useContext(ScrollContext);

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
};

export default VRow;
