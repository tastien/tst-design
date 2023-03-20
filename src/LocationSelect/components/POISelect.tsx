import { useFetch } from '@shihengtech/hooks';
import { Select } from 'antd';
import { OptionProps, SelectProps } from 'antd/es/select';
import _ from 'lodash';
import { stringify } from 'qs';
import * as React from 'react';
import { POI } from '../../types/amap';

const request = async (url: string) => {
  return fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }).then((res) => res.json());
};

function queryPlaceText(params: { keywords: string; city?: string }) {
  return request(
    `https://restapi.amap.com/v3/place/text?key=3f9e230d0803ff0a85b85ddc251d10fb&citylimit=true&${stringify(
      params,
    )}`,
  );
}

const { Option } = Select;

const getCityName = (city?: string) => {
  if (!city) return;
  if (city.includes('城区')) return city.slice(0, -2);
  return city;
};
interface Props<T = any> extends Omit<SelectProps<T>, 'onChange'> {
  city?: string;
  onChange?: (value: POI) => void;
}

const POISelect = React.memo<Props>(({ city, onChange, ...props }) => {
  const [keywords, setKeywords] = React.useState('');

  const handleSearch = React.useMemo(
    () =>
      _.debounce(
        ((value) => {
          setKeywords(value);
        }) as typeof setKeywords,
        500,
      ),
    [],
  );

  const { data: areaList = [] } = useFetch(
    async () => {
      if (!keywords.trim()) return [];
      const res = await queryPlaceText({ keywords, city: getCityName(city) });
      if (res.status === '1') return res.pois;

      return [];
    },
    [keywords],
    {},
  );

  const handleSelect = (value: string, option: any) => {
    if (onChange) {
      onChange({
        location: value,
        ..._.pick(option, [
          'id',
          'pname',
          'cityname',
          'adname',
          'address',
          'name',
        ]),
      });
    }
  };

  return (
    <Select<string>
      showSearch
      placeholder="搜索位置"
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onSelect={(value, option) => handleSelect(value, option)}
      notFoundContent={null}
      {...props}
    >
      {areaList.map((rest: JSX.IntrinsicAttributes & OptionProps) => (
        <Option key={rest.id} value={rest.location} {...rest}>
          {rest.name}
          <div style={{ color: '#888', fontSize: 12 }}>
            {rest.pname}
            {rest.cityname}
            {rest.adname}
            {rest.address}
          </div>
        </Option>
      ))}
    </Select>
  );
});

export default POISelect;
