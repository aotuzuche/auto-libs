import qs from 'qs'

export interface AddressParams {
  redirectUrl: string
  redirectParam: string
  locationInfo?: {
    address?: string;
    name?: string;
    code?: string;
    lat?: string;
    ng?: string;
    telPrefix?: string;
  }
  telPrefix?: string
  cityCode?: string
  keyword?: string
  servicePoint?: 1 | 0
  searchTip?: string
  selectCity?: 1 | 0
  selectCityTip?: string
  isOnDoor?: 1 | 0
}

export interface PayParmas {
  token: string
  orderNo: string
  payKind: string
  redirect_url: string
}

export interface IdentityAuthParams {
  redirect?: string
}

export interface DirverAuthParams {
  redirect?: string
}
const go = {
  address: (params: AddressParams) => {
    window.location.href = `/m/address/?${qs.stringify(params)}`
  },

  pay: (params: PayParmas) => {
    const baseurl =
      process.env.ENV_NAME === 'production' ? 'https://m.atzuche.com' : ''

    window.location.href = `${baseurl}/m/pay/?${qs.stringify(params)}`
  },

  identityAuth: (params: IdentityAuthParams) => {
    window.location.href = `/m/identityAuth?${qs.stringify(params)}`
  },

  dirverAuth: (params: DirverAuthParams) => {
    window.location.href = `/m/identityAuth/dirverLicense?${qs.stringify(
      params
    )}`
  }
}

export default go
