<template>
  <n-layout has-sider class="w-full h-full">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :width="240"
      :collapsed-icon-size="22"
      show-trigger
      :collapsed-width="64"
    >
      <n-menu
        :collapsed-icon-size="22"
        :indent="18"
        :collapsed-width="64"
        :options="menuOptions"
        collapse-mode="width"
        :render-label="renderMenuLabel"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>颐和园路</n-layout-header>
      <n-layout-content class="w-full h-full p-4"
        ><router-view></router-view
      ></n-layout-content>
      <n-layout-footer position="absolute" bordered>成府路</n-layout-footer>
    </n-layout>
  </n-layout>
</template>
<script lang="ts" setup>
import RouterLink from 'comps/RouterLink.vue'
import { NIcon } from 'naive-ui'
import { ref, h } from 'vue'
import { useRouter } from 'vue-router'
import { parseMenu } from '../utils/menuUtils'
const router = useRouter()
console.log(router.options.routes)
const menuOptions = parseMenu(router.options.routes)
console.log(menuOptions)
const renderMenuLabel = (option: any) => {
  if (!option.children) {
    return h(RouterLink, { to: option.key, title: option.label })
  }
  return option.label
}
const rederMenuIcon = (option: any) => {
  console.log(option.meta?.icon)
  if (option.meta?.icon) {
    return h(NIcon, null, { default: () => h(option.meta.icon) })
  }
}
</script>
