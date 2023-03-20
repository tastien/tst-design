import _ from 'lodash';
import { useContext, useMemo, useState } from 'react';
import { ArchDataContext } from './context';
import {
  ArchAndShopSelectorProps,
  ArchAndShopValue,
  ArchNode,
  ShopNode,
} from './types';
import {
  convertArchMap,
  convertShopMap,
  convertShopTree,
  getShopIdsFromTreeValue,
  getShopListByArchIds,
  getShopListFromArch,
  getTreeValueFromShopIds,
  initializeArchAndShopValue,
} from './utils';

const useArchList = (props: ArchAndShopSelectorProps) => {
  const list4Cxt = useContext(ArchDataContext);
  const list4Props = props.archList;

  return list4Props || list4Cxt.data || [];
};

const useAllShopList = (archList: ArchNode[]) => {
  return useMemo(() => getShopListFromArch(archList), [archList]);
};

const useArchMap = (archList: ArchNode[]) => {
  return useMemo(() => convertArchMap(archList), [archList]);
};

const useCurrentShopList = (
  archIds: number[] | undefined,
  archMap: Record<string, ArchNode>,
  allShopList: ShopNode[],
) => {
  return useMemo(
    () => getShopListByArchIds(archIds, archMap, allShopList),
    [archMap, archIds, allShopList],
  );
};

const useCurrentShopTree = (shopList: ShopNode[]) => {
  return useMemo(() => convertShopTree(shopList), [shopList]);
};

const useTreeValue = (
  shopIds: number[] | undefined,
  cityGroup: Record<string, ShopNode[]>,
  shopMap: Record<number, ShopNode>,
) => {
  return useMemo(
    () => getTreeValueFromShopIds(shopIds, cityGroup, shopMap),
    [shopIds, cityGroup, shopMap],
  );
};

const useCityGroup = (shopList: ShopNode[]) => {
  return useMemo(() => _.groupBy(shopList, 'city'), [shopList]);
};

const useShopMap = (shopList: ShopNode[]) => {
  return useMemo(() => convertShopMap(shopList), [shopList]);
};

const useMergeValue = (
  props: ArchAndShopSelectorProps,
  value: ArchAndShopValue,
): [ArchAndShopValue, { isControlledShop: boolean }] => {
  const isControlledShop = 'value' in props;

  const [innerArchIds, innerShopIds] = value;
  let result: ArchAndShopValue = value;
  if (props.controlMode === undefined || props.controlMode === 'SHOP') {
    result = [innerArchIds, isControlledShop ? props.value : innerShopIds];
  } else if (props.controlMode === 'BOTH') {
    result = isControlledShop ? props.value! : value;
  }

  return [
    result,
    {
      isControlledShop,
    },
  ];
};

export const useDoubleValue = <T>(v: T | [T, T]): [T, T] => {
  return Array.isArray(v) ? v : [v, v];
};

export const useArchAndShopCore = (props: ArchAndShopSelectorProps) => {
  /** 选择器核心的数据处理逻辑 */
  const archList = useArchList(props);
  const archMap = useArchMap(archList);
  const allShopList = useAllShopList(archList);

  const [value, setValue] = useState<ArchAndShopValue>(() =>
    initializeArchAndShopValue(props, archList, allShopList, archMap),
  );

  const [[archIds, shopIds], { isControlledShop }] = useMergeValue(
    props,
    value,
  );

  const shopList = useCurrentShopList(archIds, archMap, allShopList);

  const emitChangedValue = (newValue: ArchAndShopValue) => {
    if (isControlledShop) {
      if (props.controlMode === undefined || props.controlMode === 'SHOP') {
        const [_, shopIds] = newValue;
        console.log(_, '_');
        props.onChange?.(shopIds);
      } else if (props.controlMode === 'BOTH') {
        props.onChange?.(newValue);
      }
    }
  };

  return {
    archList,
    archMap,
    archIds,
    shopIds,
    shopList,
    allShopList,
    setValue,
    isControlledShop,
    emitChangedValue,
  };
};

export const useArchAndShop = (props: ArchAndShopSelectorProps) => {
  /** 封装了选择器多选版本逻辑的hook */
  const {
    archList,
    archMap,
    archIds,
    shopIds,
    shopList,
    allShopList,
    setValue,
    emitChangedValue,
  } = useArchAndShopCore(props);
  const shopTree = useCurrentShopTree(shopList);
  const cityGroup = useCityGroup(shopList);
  const shopMap = useShopMap(shopList);
  const treeValue = useTreeValue(shopIds, cityGroup, shopMap);

  const onArchChange = (value: number[]) => {
    setValue(() => {
      const newShopList = getShopListByArchIds(value, archMap, allShopList);
      const shopIds = newShopList.map((shop) => shop.id);
      const changedValue: ArchAndShopValue = [value, shopIds];
      emitChangedValue(changedValue);
      return changedValue;
    });
  };
  const onShopChange = (value: (string | number)[]) => {
    setValue(([archVal]) => {
      const shopVal = getShopIdsFromTreeValue(value, cityGroup, shopList);
      const changedValue: ArchAndShopValue = [archVal, shopVal];
      emitChangedValue(changedValue);
      return changedValue;
    });
  };

  return {
    archList,
    shopList,
    shopTree,
    archIds,
    shopIds,
    treeValue,
    onArchChange,
    onShopChange,
  };
};

export const useArchAndShopSingle = (props: ArchAndShopSelectorProps) => {
  // 封装了选择器单选版本逻辑的hook
  const {
    archList,
    archMap,
    archIds,
    shopIds,
    shopList,
    allShopList,
    setValue,
    emitChangedValue,
  } = useArchAndShopCore(props);

  const onArchChange = (value: number[]) => {
    setValue(() => {
      const newShopList = getShopListByArchIds(value, archMap, allShopList);
      const shopId = newShopList.length > 0 ? [newShopList[0].id] : [];
      const changedValue: ArchAndShopValue = [value, shopId];
      emitChangedValue(changedValue);
      return changedValue;
    });
  };

  const onShopChange = (value: number) => {
    setValue(([archVal]) => {
      const changedValue: ArchAndShopValue = [archVal, [value]];
      emitChangedValue(changedValue);
      return changedValue;
    });
  };

  const shopId = shopIds?.length ? shopIds[0] : undefined;

  return {
    archList,
    shopList,
    archIds,
    shopId,
    onArchChange,
    onShopChange,
  };
};
