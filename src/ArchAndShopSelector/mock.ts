import { ArchNode, ShopNode } from './types';

export const makeShops = (
  length = 10,
  city = '福州',
  idOffset = 0,
): ShopNode[] => {
  return Array.from({ length }, (_, index) => {
    const id = idOffset + 1 + index;
    return {
      id: id,
      shopId: 'S' + id,
      shopName: 'SHOP' + id,
      city: city,
    };
  });
};

export const makeArch = (
  id: number,
  shopInfos: ShopNode[] = [],
  children: ArchNode[] = [],
): ArchNode => {
  return {
    id,
    name: '节点' + id,
    children,
    shopInfos,
  };
};
