import _ from 'lodash';
import { makeArch, makeShops } from '../mock';
import { ArchNode } from '../types';
import {
  convertArchMap,
  convertShopMap,
  getIds,
  getShopIdsFromTreeValue,
  getShopListByArchIds,
  getShopListFromArch,
  getTreeValueFromShopIds,
} from '../utils';

describe('ArchAndShopSelector utils', () => {
  let rawData: ArchNode[];
  beforeEach(() => {
    rawData = [
      makeArch(0, makeShops(10, '福州'), [
        makeArch(1, makeShops(10, '上海', 10)),
        makeArch(2, makeShops(10, '北京', 20)),
        makeArch(3, makeShops(10, '北京', 30)),
      ]),
    ];
  });
  describe('>>> convertArchMap', () => {
    it('应该正确的使用ID映射ArchData', () => {
      const map = convertArchMap(rawData);

      expect(map[0]).toEqual(rawData[0]);
      expect(map[1]).toEqual(rawData[0].children?.[0]);
      expect(map[2]).toEqual(rawData[0].children?.[1]);
      expect(map[3]).toEqual(rawData[0].children?.[2]);
    });
  });
  describe('>>> getShopListFromArch', () => {
    it('应该正确的从ArchData中获取shopList', () => {
      const list = getShopListFromArch(rawData);
      const shopLength = 40;
      const shopIds = Array.from({ length: shopLength }, (_, i) => i + 1);

      expect(list).toHaveLength(shopLength);
      list.forEach((shop) => {
        expect(shopIds.includes(shop.id)).toBeTruthy();
      });
    });
  });
  describe('>>> convertShopMap', () => {
    it('应该正确的使用ID映射ShopData', () => {
      const shops = makeShops(40);
      const map = convertShopMap(shops);

      shops.forEach((shop) => {
        expect(map[shop.id]).toEqual(shop);
      });
    });
  });
  describe('>>> getShopListByArchIds', () => {
    const allShopList = makeShops(20, '上海');
    const archMap = {
      1: {
        id: 1,
        brandId: 7777,
        name: '节点1',
        userCount: 1,
        shopInfos: makeShops(10, '上海', 10),
        children: [
          {
            id: 2,
            brandId: 7777,
            name: '节点2',
            userCount: 1,
            shopInfos: makeShops(10, '上海', 20),
          },
        ],
      },
    };
    it('应该返回AllShopList，如果ArchIds为空', () => {
      const emptyArchIds: number[] = [];

      const result = getShopListByArchIds(emptyArchIds, archMap, allShopList);

      expect(result).toEqual(allShopList);
    });

    it('应该返回Arch对应的ShopList，如果ArchIds不为空', () => {
      const archIds = [1];

      const result = getShopListByArchIds(archIds, archMap, allShopList);

      expect(result).toEqual([
        ...archMap[1].shopInfos,
        ...archMap[1].children[0].shopInfos,
      ]);
    });
  });
  describe('>>> getShopIdsFromTreeValue', () => {
    it('应该正确的把树形组件Value值转换成ShopIds', () => {
      const shopList = getShopListFromArch(rawData);
      const allShopIds = getIds(shopList);
      const fuzhouShopIds = rawData[0].shopInfos!.map((shop) => shop.id);
      const cityGroup = _.groupBy(shopList, 'city');

      let result = getShopIdsFromTreeValue(['city_福州'], cityGroup, shopList);

      expect(result).toEqual(fuzhouShopIds);

      result = getShopIdsFromTreeValue(
        ['city_福州', 12, 13],
        cityGroup,
        shopList,
      );

      expect(result).toEqual([...fuzhouShopIds, 12, 13]);

      result = getShopIdsFromTreeValue(undefined, cityGroup, shopList);

      expect(result).toBeUndefined();

      result = getShopIdsFromTreeValue(['all'], cityGroup, shopList);

      expect(result).toEqual(allShopIds);
    });
  });
  describe('>>> getTreeValueFromShopIds', () => {
    it('应该正确的把ShopIds转换成TreeValue', () => {
      const shopList = getShopListFromArch(rawData);
      const shopMap = convertShopMap(shopList);
      const cityGroup = _.groupBy(shopList, 'city');

      const allShopIds = getIds(shopList);
      const fuzhouShopIds = rawData[0].shopInfos!.map((shop) => shop.id);
      const fuzhouAndOtherIds = [...fuzhouShopIds, 12, 23];
      let result = getTreeValueFromShopIds(allShopIds, cityGroup, shopMap);

      expect(result).toEqual(['all']);

      result = getTreeValueFromShopIds(fuzhouShopIds, cityGroup, shopMap);

      expect(result).toEqual(['city_福州']);

      result = getTreeValueFromShopIds(fuzhouAndOtherIds, cityGroup, shopMap);

      expect(result).toEqual(['city_福州', 12, 23]);
    });
  });
});
