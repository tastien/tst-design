type TreeWith<T = object> = T & {
  children?: TreeWith<T>[];
};

export type ShopNode = {
  id: number;
  shopId: string;
  shopName: string;
  city: string;
};

export type ArchNode = TreeWith<{
  id: number;
  name: string;
  shopInfos?: ShopNode[];
}>;

export interface BaseArchAndShopSectorProps {
  archList?: ArchNode[];
  disabled?: boolean | [boolean, boolean];
  defaultValue?: number[];
  defaultArchValue?: number[];
}

export interface ShopControlledSelectorProps
  extends BaseArchAndShopSectorProps {
  controlMode?: 'SHOP';
  value?: number[];
  onChange?: (value?: number[]) => void;
}

export interface BothControlledSelectorProps
  extends BaseArchAndShopSectorProps {
  controlMode: 'BOTH';
  value?: ArchAndShopValue;
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
