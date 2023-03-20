import { useModal } from '@shihengtech/hooks';
import { Button, Form, FormInstance, Input, Space } from 'antd';
import * as React from 'react';
import { FullLngLatPos } from 'react-amap';
import LocationModal, { Address } from './components/LocationModal';

interface LocationSelectProps {
  form: FormInstance;
}

export interface LocationModalValueProps {
  data: Address;
  onSuccess: (center: FullLngLatPos, { address }: Address) => void;
}

const LocationSelect = ({ form }: LocationSelectProps) => {
  const locationModal = useModal<LocationModalValueProps>();

  return (
    <Form.Item noStyle>
      <Form.Item
        label="地图定位"
        name="location"
        rules={[{ required: true, message: '请选择详细地址' }]}
      >
        <Space>
          <Button
            onClick={() => {
              const {
                district = [],
                address,
                location,
              } = form.getFieldsValue(['district', 'address', 'location']);

              locationModal.openModal({
                data: {
                  province: district[0],
                  city: district[1],
                  district: district[2],
                  address,
                  location,
                },
                onSuccess: (center: FullLngLatPos, { address }: Address) => {
                  form.setFieldsValue({
                    location: center,
                    address: address,
                  });
                },
              });
            }}
          >
            定位选择
          </Button>
          <Form.Item name={['location', 'longitude']} noStyle>
            <Input disabled placeholder="经度" />
          </Form.Item>
          <Form.Item name={['location', 'latitude']} noStyle>
            <Input disabled placeholder="维度" />
          </Form.Item>
        </Space>
      </Form.Item>
      <LocationModal {...locationModal} />
    </Form.Item>
  );
};

export default LocationSelect;
