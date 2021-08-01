import { ANYTHING_IS_OK } from '@/constant/api'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
const Service = axios.create({
  timeout: 7000,
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})
// 添加请求拦截器
Service.interceptors.request.use((config) => {
  // const token = Cookies.get(ACCESS_TOKEN);
  // if (token) {
  //     config.headers.Authorization = token;
  // }
  return config
})
// 添加响应拦截器
Service.interceptors.response.use(
  (response) => {
    if (response.data.status != ANYTHING_IS_OK) {
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    console.warn(error)
    return Promise.reject(error)
  }
)
export const get = <T>(url: string) => {
  return Service.get<T>(url)
}
export const post = <T>(url: string, params: object) => {
  return Service.post<T>(url, params)
}
