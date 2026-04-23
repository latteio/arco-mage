<template>
  <mag-dialog-box v-model:visible="visible"
                  :height="'500px'">基础弹框
  </mag-dialog-box>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const visible = ref(false);
const props = defineProps({
  record: Object
})

</script>

<style scoped>

</style>