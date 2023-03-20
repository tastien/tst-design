import { useArchAndShopCore } from './hooks';
import { getIds, getShopListByArchIds } from './utils';

export const useArchAndShopDefaultValue = () => {
  // 获取组织与门店选择的默认值，需要配合配合createArchDataLoadedWrap一起使用保证数据已经加载完成，否则默认值会是错误的
  const { archIds, shopIds, archMap, allShopList } = useArchAndShopCore({});
  const shopId = shopIds?.[0];
  const getShopIdsByArchIds = (archIds: number[]) =>
    getIds(getShopListByArchIds(archIds, archMap, allShopList));
  return { archIds, shopIds, shopId, getShopIdsByArchIds };
};
