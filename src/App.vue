<template>
  <n-config-provider :theme-overrides="themeOverrides" class="w-full h-full">
    <router-view></router-view>
  </n-config-provider>
</template>
<script lang="ts">
import { GlobalThemeOverrides, NConfigProvider } from 'naive-ui'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: {
    NConfigProvider,
  },
  setup() {
    const themeOverrides: GlobalThemeOverrides = {
      common: {
        primaryColor: '#409EFF',
        primaryColorHover: '#409EFF',
      },
      Layout: {
        siderColor: '#191a23',
      },
      Menu: {
        itemIconColor: '#fff',
        itemTextColor: '#fff',
        itemTextColorHover: '#409EFF',
        itemIconColorHover: '#409EFF',
        itemTextColorActive: '#409EFF',
        itemIconColorActive: '#409EFF',
      },
      Input: {},
    }
    return {
      themeOverrides,
    }
  },
})
</script>
