import { IUseModalResult } from '@shihengtech/hooks/lib/useModal';
import { Button, Col, Input, Modal, Row, Space } from 'antd';
import * as React from 'react';
import { FullLngLatPos, Map, Marker } from 'react-amap';
import { LocationModalValueProps } from '..';
import { GeocodeResult, RegeoCodeResult } from '../../types/amap';
import POISelect from './POISelect';

const defaultMapCenter: FullLngLatPos = {
  longitude: 121.475164,
  latitude: 31.228816,
};

export type Address = {
  province?: string;
  city?: string;
  district?: string;
  address?: string;
  formattedAddress?: string;
  location?: FullLngLatPos;
};

type LocationModalProps = IUseModalResult<LocationModalValueProps>;

const LocationModal = ({
  closeModal,
  visible,
  initValue,
}: LocationModalProps) => {
  const geocoder = React.useRef<any>();
  const {
    province = '',
    city = '',
    district = '',
    address = '',
  } = initValue?.data || {};
  const defaultAddress = `${province}${city}${district}${address}`;
  const [center, setCenter] = React.useState<FullLngLatPos>(defaultMapCenter);
  const [addressObj, setAddress] = React.useState<Address>({
    province,
    city,
    district,
    address,
    formattedAddress: defaultAddress,
  });

  const getLocation = () => {
    geocoder.current.getLocation(
      defaultAddress,
      function (status: string, result: GeocodeResult) {
        if (status === 'complete' && result.resultNum) {
          const location = result.geocodes[0].location;
          setCenter({
            latitude: location.lat,
            longitude: location.lng,
          });
        }
      },
    );
  };

  React.useEffect(() => {
    if (geocoder.current) {
      getLocation();
      setAddress({
        province,
        city,
        district,
        address,
        formattedAddress: defaultAddress,
      });
    }
  }, []);

  return (
    <Modal
      open={visible}
      onCancel={closeModal}
      width={1000}
      title="定位选择"
      footer={null}
      forceRender={true}
    >
      <POISelect
        city={city}
        style={{ width: '100%' }}
        value={addressObj.formattedAddress}
        onChange={(value) => {
          const { location, pname, cityname, adname, address, name } = value;
          const [longitude, latitude] = location.split(',');
          setCenter({
            latitude: +latitude,
            longitude: +longitude,
          });

          setAddress({
            formattedAddress: `${pname}${cityname}${adname}${address}${name}`,
            province: pname,
            city: cityname || pname,
            district: adname,
            address: `${address}${name}`,
          });
        }}
      />
      <div style={{ width: '100%', height: '400px', margin: '24px auto' }}>
        <Map
          center={center}
          zoom={14}
          events={{
            created: () => {
              window.AMap.plugin(['AMap.Geocoder'], function () {
                // @ts-ignore
                geocoder.current = new window.AMap.Geocoder();

                if (defaultAddress) getLocation();
              });
            },
          }}
          plugins={['Scale']}
        >
          <Marker
            draggable
            position={center}
            events={{
              mouseup: (e: any) => {
                setCenter({
                  longitude: e.lnglat.lng,
                  latitude: e.lnglat.lat,
                });

                if (!geocoder.current) return;

                geocoder.current.getAddress(
                  e.lnglat,
                  function (status: string, result: RegeoCodeResult) {
                    if (status === 'complete' && result.regeocode) {
                      const {
                        formattedAddress,
                        addressComponent: { province, city, district },
                      } = result.regeocode;

                      const address = formattedAddress.split(district)[1];
                      setAddress({
                        formattedAddress,
                        province,
                        city,
                        district,
                        address,
                      });
                    }
                  },
                );
              },
            }}
          />
        </Map>
      </div>
      <Row justify="space-between">
        <Col>
          <Space>
            <span>经度: </span>
            <Input disabled value={center ? center.longitude : ''} />
            <span>纬度: </span>
            <Input disabled value={center ? center.latitude : ''} />
          </Space>
        </Col>
        <Button
          type="primary"
          onClick={() => {
            closeModal();
            if (center) initValue?.onSuccess!(center, addressObj);
          }}
        >
          确定经纬度
        </Button>
      </Row>
    </Modal>
  );
};

export default LocationModal;
