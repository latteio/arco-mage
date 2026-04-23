<template>
  <div class="table-filter">
    <a-space direction="vertical">
      <slot></slot>
      <div class="table-filter-footer">
        <a-button @click="() => emits('confirm')">确认</a-button>
        <a-button @click="() => emits('reset')">重置</a-button>
      </div>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['confirm', 'reset']);
</script>

<style scoped>
.table-filter {
  padding: 20px;
  background: var(--color-bg-5);
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-medium);
  box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
}

.table-filter-footer {
  display: flex;
  justify-content: space-between;
}
</style>
