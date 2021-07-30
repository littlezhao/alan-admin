<template>
  <router-link :to="to">{{ title }}</router-link>
</template>

<script lang="ts" setup>
const props = defineProps({
  to: {
    type: String,
  },
  title: {
    type: String,
  },
})
</script>
