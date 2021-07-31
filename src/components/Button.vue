<template>
  <n-button :color="buttonColor">
    <template #icon>
      <n-icon>
        <SvgIcon :name="iconName" :color="iconColor" />
      </n-icon>
    </template>
    <span v-text="buttonText"></span>
  </n-button>
</template>

<script lang="ts" setup>
 defineProps([
  'iconName',
  'iconColor',
  'buttonColor',
  'buttonText',
])
</script>
