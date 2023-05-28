import axios from 'axios'

export const getProvinces = () => {
  return axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province')
}

export const getDistrict = (province_id: string) => {
  return axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${province_id}`)
}

export const getWard = (district_id: string) => {
  return axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district_id}`)
}
