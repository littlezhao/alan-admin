import { RouteRecordRaw } from 'vue-router'
import { get } from '..'

export const getMenus = async <T>() => {
  const { data } = await get<T>('/menus')
  return data
}
