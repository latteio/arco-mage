<template>
  <div>
    <mag-table-card
        header="文件整理日志"
        ref="tableRef"
        :buttons="buttons"
        :row-columns="rowColumns"
        :row-selection="rowSelection"
        @selection-change="handleSelectionChange"
        :data="[]"
        :auto-load="false"
        @filter-query="filterQuery"
    >
      <template #op="{ record }">
        <a-link type="primary" status="danger" @click="delRow(record)">
          删除
        </a-link>
      </template>
    </mag-table-card>

    <UpdateDialog v-model:visible="visible"
                  :record="activeRow"/>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import UpdateDialog from "./components/update-dialog.vue";

const tableRef = ref();
const queryParams = reactive<any>({});
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
  fixed: true
});

/**
 * 选择行
 * @param selectedRows
 */
const selectedRows = ref<any>([]);
const handleSelectionChange = (rows: any) => {
  selectedRows.value = rows;
}

const rowColumns: any = [
  {
    title: '文件ID',
    dataIndex: 'fileId',
    filterable: {enabled: true, type: 'input', prop: 'fileId', placeholder: '请输入文件ID', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 200
  },
  {
    title: '路径',
    dataIndex: 'srcPath',
    filterable: {enabled: true, type: 'input', prop: 'srcPath', placeholder: '请输入路径', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 300
  },
  // {
  //   title: '目标桶ID',
  //   dataIndex: 'destStorageId',
  //   filterable: {enabled: true, type: 'input', prop: 'destStorageId', placeholder: '请输入目标存储ID', alignLeft: true},
  //   ellipsis: true,
  //   tooltip: true,
  //   align: 'center',
  //   width: 150
  // },
  {
    title: '物理路径',
    dataIndex: 'destPath',
    filterable: {enabled: true, type: 'input', prop: 'destPath', placeholder: '请输入物理路径', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 300
  },
  // {
  //   title: '源桶ID',
  //   dataIndex: 'srcStorageId',
  //   filterable: {enabled: true, type: 'input', prop: 'srcStorageId', placeholder: '请输入源桶ID', alignLeft: true},
  //   ellipsis: true,
  //   tooltip: true,
  //   align: 'center',
  //   width: 150
  // },

  {
    title: '操作人',
    dataIndex: 'createName',
    filterable: {enabled: true, type: 'input', prop: 'createName', placeholder: '请输入整理人', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 150
  },
  {
    title: '移动开始时间',
    dataIndex: 'createTime',
    filterable: {enabled: true, type: 'date', prop: 'createTime', placeholder: '请输入开始整理时间', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 200
  },
  {
    title: '移动结束时间',
    dataIndex: 'updateTime',
    filterable: {enabled: true, type: 'date', prop: 'updateTime', placeholder: '请输入最后整理时间', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 200
  },
  {
    title: '移动耗时',
    slotable: {
      enabled: true,
      slotName: 'moveConsuming'
    },
    filterable: {enabled: false, alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 200
  },
  {
    title: '任务单号',
    dataIndex: 'ozTaskId',
    filterable: {enabled: true, type: 'input', prop: 'ozTaskId', placeholder: '请输入任务单号', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 200
  },
  {
    title: '整理阶段',
    dataIndex: 'moveStep',
    filterable: {enabled: true, type: 'input', prop: 'moveStep', placeholder: '请输入整理阶段', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 200
  },
  {
    title: '整理信息',
    dataIndex: 'moveMsg',
    filterable: {enabled: true, type: 'input', prop: 'moveMsg', placeholder: '请输入整理信息', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 300
  }, {
    title: '操作',
    slotable: {
      enabled: true,
      slotName: 'op'
    },
    filterable: {enabled: false, alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 100
  }
];

const visible = ref(false)

const activeRow = ref(null);

/**
 * 表格按钮
 */
const buttons: any = [
  {
    text: '批量删除',
    type: 'primary',
    status: 'danger',
    size: 'small',
    onClick: () => {
    }
  }
];

/**
 * 过滤查询
 * @param event
 * @param prop
 * @param val
 */
const filterQuery = (event: string, prop: string, val: any) => {
  console.log('filter==', event, prop, val)
  queryParams[prop] = val;
  tableRef.value.load(queryParams);
}

const editRow = (record: any) => {
  activeRow.value = record;
  visible.value = true
}

const delRow = (record: any) => {
}
</script>

<style scoped>
</style>
