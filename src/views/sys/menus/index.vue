<template>
  <n-grid
    class="mt-4"
    cols="1 s:1 m:1 l:3 xl:3 2xl:3"
    responsive="screen"
    :x-gap="12"
  >
    <n-gi span="1">
      <n-card :segmented="{ content: 'hard' }" :bordered="false" size="small">
        <template #header>
          <n-space>
            <n-dropdown
              trigger="hover"
              @select="selectAdd"
              :options="addMenuOptions"
            >
              <n-button type="info" ghost icon-placement="right">
                添加菜单
                <template #icon>
                  <div class="flex items-center">
                    <n-icon size="14">
                      <ChevronDownOutline />
                    </n-icon>
                  </div>
                </template>
              </n-button>
            </n-dropdown>
            <n-button
              type="info"
              ghost
              icon-placement="left"
              @click="expandCollapseHandle"
            >
              全部{{ state.expandedKeys.length ? '收起' : '展开' }}
              <template #icon>
                <div class="flex items-center">
                  <n-icon size="14">
                    <Menu />
                  </n-icon>
                </div>
              </template>
            </n-button>
          </n-space>
        </template>
        <div class="w-full menu">
          <n-input
            type="input"
            v-model:value="state.treeSearchPattern"
            placeholder="输入菜单名称搜索"
          >
            <template #suffix>
              <n-icon size="18" class="cursor-pointer">
                <SearchOutline />
              </n-icon>
            </template>
          </n-input>
          <div class="py-3 menu-list">
            <template v-if="state.loading">
              <div class="flex items-center justify-center py-4">
                <n-spin size="medium" />
              </div>
            </template>
            <template v-else>
              <n-tree
                block-line
                cascade
                checkable
                :virtual-scroll="true"
                :expandedKeys="state.expandedKeys"
                :pattern="state.treeSearchPattern"
                :data="state.treeData"
                @update:expanded-keys="onExpandedKeys"
                @update:selected-keys="selectedTree"
                style="max-height: 650px; overflow: hidden"
              />
            </template>
          </div>
        </div>
      </n-card>
    </n-gi>
    <n-gi span="2">
      <n-card :segmented="{ content: 'hard' }" :bordered="false" size="small">
        <template #header>
          <n-space>
            <n-icon size="18">
              <CreateOutline />
            </n-icon>
            <span
              >编辑菜单{{
                state.treeSelectItem ? `：${state.treeSelectItem.label}` : ''
              }}</span
            >
          </n-space>
        </template>
        <n-alert type="info" closable v-show="!state.isEditMenu">
          从菜单列表选择一项后，进行编辑</n-alert
        >
        <n-form
          :model="state.menuForm"
          ref="formRef"
          label-placement="left"
          :label-width="100"
          v-if="state.isEditMenu"
          class="py-4"
        >
          <n-form-item label="上级目录" path="parentId">
            <n-tree-select
              :options="menuTreeOptions"
              v-model:value="state.menuForm.parentId"
            />
          </n-form-item>
          <n-form-item label="类型" path="type">
            <n-select
              v-model:value="state.menuForm.type"
              :options="typeOptions"
            />
          </n-form-item>
          <n-form-item label="名称" path="title">
            <n-input
              placeholder="请输入名称"
              v-model:value="state.menuForm.title"
            />
          </n-form-item>
          <n-form-item label="接口url" path="url">
            <n-input
              placeholder="请输入url"
              v-model:value="state.menuForm.url"
            />
          </n-form-item>
          <n-form-item label="路径" path="path" v-show="isAddMenu">
            <n-input
              placeholder="请输入路径"
              v-model:value="state.menuForm.path"
            />
          </n-form-item>
          <n-form-item label="组件" path="component" v-show="isAddMenu">
            <n-input
              placeholder="请输入组件"
              v-model:value="state.menuForm.component"
            />
          </n-form-item>
          <n-form-item label="图标" path="icon" v-show="isAddMenu">
            <template #label>
              <div class="flex justify-end items-center">
                图标
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-icon size="18" color="#409EFF">
                      <HelpCircle />
                    </n-icon>
                  </template>
                  采用xicons ionicons5图标库 https://www.xicons.org/#/
                </n-tooltip>
              </div>
            </template>
            <n-input
              placeholder="请选择图标"
              v-model:value="state.menuForm.icon"
            />
          </n-form-item>
          <n-form-item label="权限标志" path="auth">
            <n-input
              placeholder="请输入权限xxx:xxx"
              v-model:value="state.menuForm.permission"
            />
          </n-form-item>
          <n-form-item label="是否隐藏" path="hidden" v-show="isAddMenu">
            <n-switch v-model:value="state.menuForm.hidden" />
          </n-form-item>
          <n-form-item label="排序" path="sort">
            <n-input-number v-model:value="state.menuForm.sort" />
          </n-form-item>
          <n-form-item style="margin-left: 100px">
            <n-space>
              <n-button
                type="primary"
                :loading="state.subLoding"
                @click="editSubmit"
                >保存修改</n-button
              >
              <n-button @click="handleReset">重置</n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </n-card>
    </n-gi>
  </n-grid>
  <Drawer :title="state.drawerTitle" ref="drawerRef" />
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, unref, h, computed } from 'vue'
import SvgIcon from 'comps/SvgIcon.vue'
import Drawer from 'comps/Drawer.vue'
import {
  ChevronDownOutline,
  Menu,
  SearchOutline,
  CreateOutline,
  HelpCircle,
} from '@vicons/ionicons5'
import { getMenusAndButtonsTree } from '@/apis/modules/menus'
import type { MenuModel } from '@/interfaces'
import { getSelectTreeItem } from '@/utils/menuUtils'
import { NIcon } from 'naive-ui'
import type { SelectOption, TreeOption } from 'naive-ui'
interface menuTreeState {
  treeSearchPattern: String
  treeSelectItem: { label?: string; key?: number } & MenuModel
  loading: boolean
  expandedKeys: number[]
  treeData: MenuModel[]
  isEditMenu: boolean
  drawerTitle: string
  menuForm: {
    type: number
    parentId: number | null
    menuId: number
    title?: string
    icon?: string
    permission?: string
    path?: string
    url: string
    component?: string
    hidden?: boolean
    sort: number
  }
  subLoding: boolean
}
const menuTreeOptions = ref([
  {
    label: '顶级目录',
    key: 0,
  },
])
onMounted(async () => {
  const treeList: MenuModel[] = await getMenusAndButtonsTree()
  const parseData = parse2Tree(treeList)
  state.treeData = parseData
  parseData.forEach((menu: any) => {
    menuTreeOptions.value.push(menu)
  })
  state.loading = false
})
const isAddDisable = computed(() => {
  return (
    state.treeSelectItem.type == undefined || state.treeSelectItem.type == 2
  )
})
const isAddMenu = computed(() => {
  return state.menuForm.type != 2
})
const drawerRef = ref()
const onExpandedKeys = (keys: number[]) => {
  state.expandedKeys = keys
}
const selectedTree = (keys: number[]) => {
  state.isEditMenu = true
  const selectItem = getSelectTreeItem(unref(state.treeData), keys[0])
  state.treeSelectItem = selectItem
  state.menuForm = Object.assign(state.menuForm, selectItem)
}
const parse2Tree = (menus: MenuModel[]): any => {
  return menus.map((menu) => {
    if (menu.children && menu.children.length > 0) {
      menu.children = parse2Tree(menu.children)
    } else {
      delete menu.children
    }
    return {
      ...menu,
      label: menu.title,
      key: menu.menuId,
      parentId: menu.parentId ? menu.parentId : 0,
    }
  })
}
const expandCollapseHandle = () => {
  state.expandedKeys = state.expandedKeys.length
    ? []
    : state.treeData.map((item: any) => item.key)
}

const state = reactive<menuTreeState>({
  treeSearchPattern: '',
  treeSelectItem: null as unknown as MenuModel,
  loading: true,
  expandedKeys: [],
  treeData: [],
  isEditMenu: false,
  drawerTitle: '顶级菜单',
  menuForm: {
    type: 1,
    parentId: 0,
    menuId: 0,
    title: '',
    permission: '',
    icon: '',
    path: '',
    url: '',
    hidden: false,
    component: '',
    sort: 0,
  },
  subLoding: false,
})
const handleReset = () => {
  state.menuForm = Object.assign(state.menuForm, state.treeSelectItem)
}
const selectAdd = (key: string) => {
  const target = addMenuOptions.value.filter((item) => item.key == key)[0]
  state.drawerTitle =
    target.key == 'home'
      ? target.label
      : `为${state.treeSelectItem.title}${target.label}`
  openDrawer()
}
const openDrawer = () => {
  const { openDrawer: open } = drawerRef.value
  open()
}
const editSubmit = () => {
  console.log(state.menuForm)
}
const addMenuOptions = ref([
  {
    label: '添加顶级菜单',
    key: 'home',
    disabled: false,
  },
  {
    label: '添加子菜单',
    key: 'sub',
    disabled: isAddDisable,
  },
  {
    label: '添加按钮',
    key: 'button',
    disabled: isAddDisable,
  },
])
const typeOptions = ref<Array<SelectOption>>([
  {
    label: '目录',
    value: 0,
  },
  {
    label: '菜单',
    value: 1,
  },
  {
    label: '按钮',
    value: 2,
  },
])
</script>
