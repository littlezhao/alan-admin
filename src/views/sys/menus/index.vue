<template>
  <IconButton
    buttonColor="#1890ff"
    iconName="add"
    @click="addMenu"
    :buttonText="addMenuText"
  />
  <n-modal
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
  </n-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const addMenuText = ref('新增菜单')
const addMenu = () => {
  showAddModal.value = true
}
const showAddModal = ref(false)
const sure = () => {}
const cancle = () => {
  showAddModal.value = false
}
</script>
