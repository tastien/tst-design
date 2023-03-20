import { act, renderHook } from '@testing-library/react-hooks';
import { useArchAndShop, useArchAndShopSingle, useDoubleValue } from './hooks';
import { makeArch, makeShops } from './mock';
import { ArchNode } from './types';
import { getIds, getShopListFromArch } from './utils';

describe('ArchAndShopSelector Hooks', () => {
  let rawData: ArchNode[];
  beforeEach(() => {
    rawData = [
      makeArch(0, makeShops(10), [
        makeArch(1, makeShops(10, '上海', 10)),
        makeArch(2, makeShops(10, '北京', 20)),
        makeArch(3, makeShops(10, '北京', 30)),
      ]),
    ];
  });
  describe('>>> useArchAndShop', () => {
    it('如果设置了defaultArchValue，shopIds的初始值应该是对应组织架构的的全部门店ids', () => {
      const shopList = getShopListFromArch(rawData[0].children![0]);

      const { result } = renderHook(useArchAndShop, {
        initialProps: {
          archList: rawData,
          defaultArchValue: [1],
        },
      });

      expect(result.current.archIds).toEqual([1]);
      expect(result.current.shopIds).toEqual(getIds(shopList));
    });
    it('如果设置了defaultValue，archIds的初始值应该是对应组织架构的根节点id', () => {
      const { result } = renderHook(useArchAndShop, {
        initialProps: {
          archList: rawData,
          defaultValue: [10, 11],
        },
      });

      expect(result.current.archIds).toEqual([0]);
      expect(result.current.shopIds).toEqual([10, 11]);
    });
    it('如果设置了defaultArchValue和defaultValue，应该正确的初始化archIds，和shopIds', () => {
      const { result } = renderHook(useArchAndShop, {
        initialProps: {
          archList: rawData,
          defaultValue: [13, 15],
          defaultArchValue: [0, 1],
        },
      });

      expect(result.current.archIds).toEqual([0, 1]);
      expect(result.current.shopIds).toEqual([13, 15]);
    });
    it('应该正确的初始化数据', () => {
      const shopList = getShopListFromArch(rawData[0]);
      const { result } = renderHook(useArchAndShop, {
        initialProps: {
          archList: rawData,
        },
      });

      expect(result.current.archList).toEqual(rawData);
      expect(result.current.shopList).toEqual(shopList);
      expect(result.current.archIds).toEqual([rawData[0].id]);
      expect(result.current.shopIds).toEqual(getIds(shopList));
      expect(result.current.treeValue).toEqual(['all']);
    });

    it('应该正确的设置archIds与shopIds', () => {
      const shopList = getShopListFromArch(rawData[0].children![1]);
      const { result } = renderHook(useArchAndShop, {
        initialProps: {
          archList: rawData,
        },
      });

      act(() => {
        result.current.onArchChange([0, 2]);
      });

      expect(result.current.archIds).toEqual([0, 2]);
      expect(result.current.shopIds).toEqual(getIds(shopList));

      act(() => {
        result.current.onShopChange([21, 22]);
      });

      expect(result.current.archIds).toEqual([0, 2]);
      expect(result.current.shopIds).toEqual([21, 22]);
    });

    it('应该正确的计算shopList，如果archIds被改变', () => {
      const shopList = getShopListFromArch(rawData[0].children![0]);
      const { result } = renderHook(useArchAndShop, {
        initialProps: {
          archList: rawData,
        },
      });
      act(() => {
        result.current.onArchChange([0, 1]);
      });

      expect(result.current.shopList).toEqual(shopList);
    });

    it('如果设置了value，应该成为受控组件', () => {
      const shopIds = [11, 12, 13];
      const setShopIds = [15];
      const onChange = jest.fn();
      const { result } = renderHook(useArchAndShop, {
        initialProps: {
          archList: rawData,
          value: shopIds,
          onChange,
        },
      });

      expect(result.current.shopIds).toEqual(shopIds);

      act(() => {
        result.current.onShopChange(setShopIds);
      });

      expect(result.current.shopIds).toEqual(shopIds);
      expect(onChange).toBeCalledWith(setShopIds);
    });
  });

  describe('>>> useDoubleValue', () => {
    it('应该返回一个包含两个值的数组', () => {
      const { result, rerender } = renderHook(useDoubleValue, {
        initialProps: 1,
      });

      expect(result.current).toEqual([1, 1]);

      rerender([false, true] as any);

      expect(result.current).toEqual([false, true]);
    });
  });

  describe('>>> useArchAndShopSingle', () => {
    it('应该正确的设置archIds与shopIds', () => {
      const shopList = getShopListFromArch(rawData[0].children![1]);
      const { result } = renderHook(useArchAndShopSingle, {
        initialProps: {
          archList: rawData,
        },
      });

      act(() => {
        result.current.onArchChange([0, 2]);
      });

      expect(result.current.archIds).toEqual([0, 2]);
      expect(result.current.shopId).toEqual(getIds(shopList)[0]);

      act(() => {
        result.current.onShopChange(21);
      });

      expect(result.current.archIds).toEqual([0, 2]);
      expect(result.current.shopId).toEqual(21);
    });
  });
});
