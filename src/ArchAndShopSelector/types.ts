export type ArchNode = TreeWith<{
  id: number;
  name: string;
  shopInfos?: ShopNode[];
}>;

export type ShopNode = {
  id: number;
  shopId: string;
  shopName: string;
  city: string;
};

export interface BaseArchAndShopSectorProps {
  /** 组织机构和门店数据，默认从ArchDataContext中获取数据，如果设置了这个prop则优先使用该数据 */
  archList?: ArchNode[];
  /** 启用禁用组件，可用一个元组分别设置组织或门店选择禁用状态 */
  disabled?: boolean | [boolean, boolean];
  /** 非受控组件初始化使用的默认的shopIds */
  defaultValue?: number[];
  /** 非受控组件初始化使用的默认的archIds */
  defaultArchValue?: number[];
}

export interface ShopControlledSelectorProps
  extends BaseArchAndShopSectorProps {
  /** value值的受控模式 SHOP模式下value 和onChange使用的是 shopIds */
  controlMode?: 'SHOP';
  /** 受控组件shopIds */
  value?: number[];
  /** 受控组件shopIds change 回调*/
  onChange?: (value?: number[]) => void;
}

export interface BothControlledSelectorProps
  extends BaseArchAndShopSectorProps {
  /** value值的受控模式 BOTH模式下value 和onChange使用的是 archIds和shopIds */
  controlMode: 'BOTH';
  /** 受控组件archIds和shopIds */
  value?: ArchAndShopValue;
  /** 受控组件archIds和shopIds change 回调*/
  onChange?: (value: ArchAndShopValue) => void;
}

export type ArchAndShopSelectorProps =
  | ShopControlledSelectorProps
  | BothControlledSelectorProps;

export type ArchAndShopValue = [number[] | undefined, number[] | undefined];

export type ArchDataManager = {
  data: ArchNode[] | undefined;
  isLoading: boolean;
  refetch: () => void;
};
