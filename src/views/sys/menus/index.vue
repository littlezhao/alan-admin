<template>
  <!-- <n-modal
    v-model:show="showAddModal"
    preset="dialog"
    :show-icon="false"
    :title="addMenuText"
  >
    <template #action>
      <n-space>
        <n-button @click="() => (showAddModal = false)">取消</n-button>
        <n-button type="info">确定</n-button>
      </n-space>
    </template>
  </n-modal> -->
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
            <n-dropdown trigger="hover" :options="addMenuOptions">
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
              <FormOutlined />
            </n-icon>
            <span
              >编辑菜单{{
                state.treeItemTitle ? `：${state.treeItemTitle}` : ''
              }}</span
            >
          </n-space>
        </template>
        <n-alert type="info" closable v-show="!state.isEditMenu"> 从菜单列表选择一项后，进行编辑</n-alert>
        <n-form
          :model="state.menuForm"
          ref="formRef"
          label-placement="left"
          :label-width="100"
          v-if="state.isEditMenu"
          class="py-4"
        >
          <n-form-item label="名称" path="label">
            <n-input
              placeholder="请输入名称"
              v-model:value="state.menuForm.label"
            />
          </n-form-item>
          <n-form-item label="路径" path="path">
            <n-input
              placeholder="请输入路径"
              v-model:value="state.menuForm.path"
            />
          </n-form-item>
          <n-form-item label="权限标志" path="auth">
            <n-input
              placeholder="请输入权限"
              v-model:value="state.menuForm.auth"
            />
          </n-form-item>
          <n-form-item path="auth" style="margin-left: 100px">
            <n-space>
              <n-button type="primary" :loading="state.subLoding" @click="formSubmit"
                >保存修改</n-button
              >
              <n-button @click="handleReset">重置</n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, unref } from 'vue'
import { ChevronDownOutline, Menu, SearchOutline } from '@vicons/ionicons5'
import { getMenusAndButtonsTree } from '@/apis/modules/menus'
import type { MenuModel } from '@/interfaces'
onMounted(async () => {
  const treeList: MenuModel[] = await getMenusAndButtonsTree()
  state.treeData = parse2Tree(treeList)
  state.loading = false
})
const onExpandedKeys = (keys: number[]) => {
  state.expandedKeys = keys
}
const selectedTree = (keys: string[]) => {
  state.isEditMenu=true
}
const parse2Tree = (menus: MenuModel[]): any => {
  return menus.map((menu) => {
    if (menu.children && menu.children.length > 0) {
      menu.children = parse2Tree(menu.children)
    } else {
      delete menu.children
    }
    return { ...menu, label: menu.title, key: menu.menuId }
  })
}
const expandCollapseHandle = () => {
  state.expandedKeys = state.expandedKeys.length
    ? []
    : state.treeData.map((item: any) => item.key)
  console.log(state.expandedKeys)
}
const isCanAddSubMenu = ref(false)
interface menuTreeState {
  treeSearchPattern: String
  treeItemTitle: String
  loading: Boolean
  expandedKeys: Number[]
  treeData: MenuModel[],
  isEditMenu:Boolean,
  menuForm: {
    type: Number
    label?: String
    auth?: String
    path?: String
    url: String
  }
  subLoding:Boolean
}
const state = reactive<menuTreeState>({
  treeSearchPattern: '',
  treeItemTitle: '',
  loading: true,
  expandedKeys: [],
  treeData: [],
  isEditMenu:false,
  menuForm: {
    type: 1,
    label: '',
    auth: '',
    path: '',
    url: '',
  },
  subLoding:false
})
const handleReset = ()=>{

}
const formSubmit = ()=>{

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
    disabled: isCanAddSubMenu.value,
  },
])
</script>
