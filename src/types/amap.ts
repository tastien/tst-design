export type Geocode = {
  adcode: string;
  location: {
    lat: number;
    lng: number;
  };
};

export type GeocodeResult = {
  info: string;
  resultNum: number;
  geocodes: Geocode[];
};

export type ReGeocode = {
  formattedAddress: string;
  addressComponent: {
    adcode?: string;
    province: string;
    city?: string;
    citycode?: string;
    district: string;
    township?: string;
    street?: string;
    streetNumber?: string;
  };
};

export type RegeoCodeResult = {
  info: string;
  regeocode: ReGeocode;
};

export type POI = {
  id: string;
  name: string;
  location: string;
  pname: string; // 省份
  cityname: string;
  adname: string; // 区域名称
  address: string;
};
