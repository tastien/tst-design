import React, { ReactNode, useContext, useEffect, useMemo } from 'react';
import { ScrollContext } from '../reducer';

export interface VWrapperProps {
  children: [ReactNode, ReactNode[]];
}

const VWrapper: React.FC<VWrapperProps> = ({ children, ...restProps }) => {
  // 一个jsx数组，包括所有的列表内容
  const { renderLen, start, dispatch, vid, totalLen } =
    useContext(ScrollContext);

  // 取到wrap传下来的 children的第二个作为列表数据
  const contents: ReactNode[] = useMemo(() => {
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
};

export default VWrapper;
