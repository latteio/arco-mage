<template>
  <a-layout class="layout-demo">
    <a-layout-sider collapsible breakpoint="xl">
      <div class="logo"/>
      <a-menu
          :default-open-keys="['1']"
          :default-selected-keys="['0_3']"
          :style="{ width: '100%' }"
          @menu-item-click="onClickMenuItem"
      >
        <a-sub-menu v-for="mg in menus"
                    :key="mg.path"
        >
          <template #title>
            <IconHome></IconHome>
            <span>{{ mg.meta?.title }}</span>
          </template>

          <a-menu-item v-for="m in mg.children"
                       :key="m.path"
          >
            {{ m.meta?.title }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
      <template #trigger="{ collapsed }">
        <IconCaretRight v-if="collapsed"></IconCaretRight>
        <IconCaretLeft v-else></IconCaretLeft>
      </template>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding-left: 20px;">
        Header
      </a-layout-header>

      <a-layout style="padding: 0 24px;">
        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <!-- <a-breadcrumb-item>List</a-breadcrumb-item> -->
          <!-- <a-breadcrumb-item>App</a-breadcrumb-item> -->
        </a-breadcrumb>

        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer>@Copyright www.xxx.com</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import routes from '@/routes'
import router from "@/router";

const menus = computed(() => {
  return routes[0].children;
})

const activeMenu = ref('/dashboard')
const onClickMenuItem = (index: string) => {
  console.log('index===', index)
  activeMenu.value = index
  router.push(index)
}

</script>

<style scoped>
.layout-demo {
  height: 1320px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}

.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}

.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-black);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>
