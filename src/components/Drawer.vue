
<template>
    <n-drawer v-model:show="active" :width="width">
      <n-drawer-content>
        <template #header>{{title}}</template>
        <slot></slot>
        <template #footer>
         <slot name="action"></slot>
        </template>
      </n-drawer-content>
    </n-drawer>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue'
  defineProps({
      title:{
          type:String,
          required:true
      },
      width:{
          type:Number,
          default:502
      }
  })
  const active = ref(false)
  const openDrawer = ()=>{
    active.value=true
  }
  const closeDrawer = ()=>{
    active.value=false
  }
  defineExpose({
    closeDrawer,
    openDrawer
  })
  </script>