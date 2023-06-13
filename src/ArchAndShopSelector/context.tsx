import { Spin } from 'antd';
import React, { createContext, useContext } from 'react';
import { ArchDataManager } from './types';

const defaultArchData = {
  data: undefined,
  isLoading: false,
  refetch: () => {},
};

/** 品牌组织机构数据Context */
export const ArchDataContext = createContext<ArchDataManager>(defaultArchData);

export const ArchDataProvider = ArchDataContext.Provider;

/** 需要保证在数据加载完毕后渲染的页面，用这个高阶组件包裹一下 */
export const createArchDataLoadedWrap = (
  Component: React.ComponentType<any>,
) => {
  return (props: any) => {
    const { isLoading } = useContext(ArchDataContext);
    if (isLoading) {
      return <Spin spinning={isLoading} delay={300}></Spin>;
    }
    return <Component {...props} />;
  };
};
