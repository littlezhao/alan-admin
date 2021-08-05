 interface MenuModel {
  menuId: number
  parentId?: any
  type: number
  title: string
  name: string
  component: string
  path: string
  url?: any
  sort: number
  icon: string
  hidden: number
  permission: string
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  children?: MenuModel[]
 }

export {
  MenuModel
}
