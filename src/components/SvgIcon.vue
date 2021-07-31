<template>
  <svg
    :class="svgClass"
    class="align-middle fill-current"
    v-bind="$attrs"
    :style="{ color: color }"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
  },
  class: {
    type: String,
  },
  color: {
    type: String,
  },
})
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`
  }
  return 'svg-icon'
})
</script>
