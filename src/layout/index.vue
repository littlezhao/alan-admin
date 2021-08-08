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
      <div class="h-full flex flex-col">
        <n-layout-header bordered style="height: 50px"
          >颐和园路</n-layout-header
        >
        <n-layout-content class="p-4 w-full flex-1"
          ><router-view></router-view
        ></n-layout-content>
      </div>
    </n-layout>
  </n-layout>
</template>
<script lang="ts" setup>
import RouterLink from 'comps/RouterLink.vue'
import { NIcon } from 'naive-ui'
import { ref, h, computed } from 'vue'
import { useRouter } from 'vue-router'
import { parseMenu } from '../utils/menuUtils'
const router = useRouter()
const menuOptions = computed(() => {
  return parseMenu(router.options.routes)
})
const renderMenuLabel = (option: any) => {
  if (!option.children) {
    return h(RouterLink, { to: option.key, title: option.label })
  }
  return option.label
}
const rederMenuIcon = (option: any) => {
  if (option.meta?.icon) {
    return h(NIcon, null, { default: () => h(option.meta.icon) })
  }
}
</script>
