import qs from 'qs';
import isDev from './isDev';

export interface AddressParams {
  redirectUrl: string;
  redirectParam: string;
  locationInfo?: {
    address?: string;
    name?: string;
    code?: string;
    lat?: string;
    lng?: string;
    telPrefix?: string;
  };
  telPrefix?: string;
  cityCode?: string;
  keyword?: string;
  servicePoint?: 1 | 0;
  searchTip?: string;
  selectCity?: 1 | 0;
  selectCityTip?: string;
  isOnDoor?: 1 | 0;
  from?: string;
  [others: string]: any;
}

export interface PayParmas {
  amount?: string;
  payTitle?: string;
  token: string;
  orderNo: string;
  payFrom?: string;
  payKind: string;
  redirect_url?: string;
}

export interface IdentityAuthParams {
  redirect?: string;
}

export interface DirverAuthParams {
  redirect?: string;
}

const go = {
  address: (params: AddressParams, prefix?: string) => {
    const baseurl = !isDev ? window.location.origin : prefix || '';
    window.location.href = `${baseurl}/m/address/?${qs.stringify(params)}`;
  },

  pay: (params: PayParmas, prefix?: string) => {
    const baseurl = !isDev ? 'https://m.atzuche.com' : prefix || '';
    window.location.href = `${baseurl}/m/pay/?${qs.stringify(params)}`;
  },

  identityAuth: (params: IdentityAuthParams, prefix?: string) => {
    const baseurl = !isDev ? window.location.origin : prefix || '';
    window.location.href = `${baseurl}/m/identityAuth?${qs.stringify(params)}`;
  },

  dirverAuth: (params: DirverAuthParams, prefix?: string) => {
    const baseurl = !isDev ? window.location.origin : prefix || '';
    window.location.href = `${baseurl}/m/identityAuth/dirverLicense?${qs.stringify(params)}`;
  },
};

export default go;
