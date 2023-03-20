import _ from 'lodash';
import {
  ArchAndShopSelectorProps,
  ArchAndShopValue,
  ArchNode,
  ShopNode,
} from './types';

export const getIds = (list: ShopNode[]) => list.map((shop) => shop.id);

// 转换组织结构数据为Map
export const convertArchMap = (data: ArchNode | ArchNode[]) => {
  const map: Record<number, ArchNode> = {};
  const dig = (data?: ArchNode[]) =>
    data &&
    data.forEach((item) => {
      dig(item.children);
      map[item.id] = item;
    });

  dig(Array.isArray(data) ? data : [data]);

  return map;
};

// 转换门店数据为Map
export const convertShopMap = (data: ShopNode[]) => {
  const map: Record<number, ShopNode> = {};
  data.forEach((shop) => (map[shop.id] = shop));

  return map;
};

// 从组织机构中获取门店数据
export const getShopListFromArch = (data: ArchNode | ArchNode[]) => {
  const list: ShopNode[] = [];
  if (!data) return list;

  const dig = (data?: ArchNode[]) =>
    data?.forEach(({ children, shopInfos }) => {
      if (shopInfos) list.push(...shopInfos);
      dig(children);
    });

  dig(Array.isArray(data) ? data : [data]);

  return list;
};

// 获取数组最后一个元素
export const getLastValue = <T = any>(array: T[]) => {
  return array[array.length - 1];
};

// 通过组织机构id获取对应的全部门店
export const getShopListByArchIds = (
  archIds: number[] | undefined,
  archMap: Record<number, ArchNode>,
  allShopList: ShopNode[],
) => {
  if (!archIds?.length) return allShopList;
  const archId = getLastValue(archIds);
  const archNode = archMap[archId];
  return getShopListFromArch(archNode);
};

// 将门店数据转换成以城市分组的树形结构
export const convertShopTree = (data: ShopNode[]) => {
  if (!data.length) return [];

  const cityGroup = _.groupBy(data, 'city');

  return [
    {
      title: '全部门店',
      value: 'all',
      children: Object.keys(cityGroup).map((city) => {
        const children = cityGroup[city].map((shop) => ({
          title: shop.shopName + (shop.shopId && '（' + shop.shopId + '）'),
          value: shop.id,
        }));
        return {
          children,
          title: city,
          value: `city_${city}`,
        };
      }),
    },
  ];
};

// 通过树形组件的value获取shopIds
export const getShopIdsFromTreeValue = (
  treeValue: ('all' | string | number)[] | undefined,
  cityGroup: Record<string, ShopNode[]>,
  shopList: ShopNode[],
) => {
  if (!treeValue) return undefined;

  const isAll = treeValue.includes('all');
  if (isAll) return getIds(shopList);

  const shopIds: number[] = [];
  treeValue.forEach((value) => {
    if (typeof value === 'number') {
      shopIds.push(value);
      return;
    }
    if (value.includes('city_')) {
      const city = value.split('_')[1];
      const cityAllIds = getIds(cityGroup[city]);
      shopIds.push(...cityAllIds);
    }
  });

  return Array.from(new Set(shopIds));
};

// 通过shopId获取树形组件的value
export const getTreeValueFromShopIds = (
  shopIds: number[] | undefined,
  cityGroup: Record<string, ShopNode[]>,
  shopMap: Record<number, ShopNode>,
): ('all' | string | number)[] | undefined => {
  if (!shopIds) return;
  if (!shopIds.length) return [];

  const cityMap = new Map<string, [number[], ShopNode[]]>();
  let isAll = true;

  shopIds.forEach((shopId) => {
    const shop = shopMap[shopId];
    if (!shop) {
      return;
    }
    if (!cityMap.has(shop.city)) {
      cityMap.set(shop.city, [[], cityGroup[shop.city]]);
    }
    const [ids] = cityMap.get(shop.city)!;
    ids.push(shopId);
  });

  const treeValue: (string | number)[] = [];
  cityMap.forEach(([ids, nodes], key) => {
    if (ids.length !== nodes.length) {
      isAll = false;
      treeValue.push(...ids);
    } else {
      treeValue.push(`city_${key}`);
    }
  });
  if (cityMap.size !== Object.keys(cityGroup).length) {
    isAll = false;
  }

  if (isAll) return ['all'];
  return treeValue;
};

// 初始化value的逻辑
export const initializeArchAndShopValue = (
  props: ArchAndShopSelectorProps,
  archList: ArchNode[],
  allShopList: ShopNode[],
  archMap: Record<number, ArchNode>,
): ArchAndShopValue => {
  const hasDefaultArchValue = props.defaultArchValue !== undefined;
  const hasDefaultValue = props.defaultValue !== undefined;

  //如果arch和shopids都配置了默认值，直接使用配置的默认值
  if (hasDefaultValue && hasDefaultArchValue)
    return [props.defaultArchValue, props.defaultValue];

  let initialArchIds: number[] | undefined;
  let initialShopIds: number[] | undefined;
  // 根据arch和shopids默认值的设置情况，计算value的默认值是啥
  if (hasDefaultArchValue) {
    initialArchIds = props.defaultArchValue;
    if (archList.length) {
      initialShopIds = getIds(
        getShopListByArchIds(initialArchIds, archMap, allShopList),
      );
    }
  } else if (hasDefaultValue) {
    if (archList.length) {
      initialArchIds = [archList[0].id];
    }
    initialShopIds = props.defaultValue;
  } else {
    if (archList.length) {
      initialArchIds = [archList[0].id];
    }
    if (allShopList.length) {
      initialShopIds = allShopList.map((shop) => shop.id);
    }
  }

  return [initialArchIds, initialShopIds];
};
