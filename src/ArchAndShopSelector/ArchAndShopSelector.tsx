import { Cascader, Select, Space, TreeSelect } from 'antd';
import React from 'react';
import { useArchAndShop, useArchAndShopSingle, useDoubleValue } from './hooks';
import { ArchAndShopSelectorProps } from './types';

export const ArchAndShopSelector = (props: ArchAndShopSelectorProps) => {
  const { disabled } = props;
  const { archList, archIds, onArchChange, shopTree, treeValue, onShopChange } =
    useArchAndShop(props);
  const [archDisabled, shopDisabled] = useDoubleValue(disabled);

  return (
    <Space>
      <Cascader
        value={archIds}
        options={archList}
        fieldNames={{ label: 'name', value: 'id' }}
        onChange={onArchChange as any}
        expandTrigger="hover"
        changeOnSelect
        allowClear={false}
        disabled={archDisabled}
      />
      <TreeSelect
        style={{ minWidth: 300 }}
        treeData={shopTree}
        treeNodeFilterProp="title"
        showSearch
        treeCheckable
        autoClearSearchValue={false}
        placeholder="请选择门店"
        showCheckedStrategy="SHOW_PARENT"
        value={treeValue}
        maxTagCount="responsive"
        allowClear
        onChange={onShopChange}
        disabled={shopDisabled}
      />
    </Space>
  );
};

export const ArchAndShopSingleSelector = (props: ArchAndShopSelectorProps) => {
  const { disabled } = props;
  const { archIds, archList, onArchChange, onShopChange, shopId, shopList } =
    useArchAndShopSingle(props);
  const [archDisabled, shopDisabled] = useDoubleValue(disabled);

  return (
    <Space>
      <Cascader
        value={archIds}
        options={archList}
        fieldNames={{ label: 'name', value: 'id' }}
        onChange={onArchChange as any}
        expandTrigger="hover"
        changeOnSelect
        allowClear={false}
        disabled={archDisabled}
      />
      <Select
        style={{ minWidth: 300 }}
        value={shopId}
        showSearch
        disabled={shopDisabled}
        placeholder="请选择门店"
        optionFilterProp="label"
        onChange={onShopChange}
        optionLabelProp="label"
      >
        {shopList.map((shop) => (
          <Select.Option
            key={shop.id}
            value={shop.id}
            label={
              shop.shopName + ' ' + (shop.shopId ? `（${shop.shopId}）` : '')
            }
          >
            {shop.shopName}
            {shop.shopId ? `（${shop.shopId}）` : ''}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};
