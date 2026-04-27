<template>
  <div>
    <mag-table-card
        header="零件检验记录"
        ref="tableRef"
        :buttons="buttons"
        :row-columns="rowColumns"
        :row-selection="rowSelection"
        @selection-change="handleSelectionChange"
        :row-data="rowDatas"
        :row-total="rowDatas.length"
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
    title: '序号',
    dataIndex: 'seqNo',
    filterable: {enabled: true, type: 'input', prop: 'seqNo', placeholder: '请输入序号', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 200
  },
  {
    title: '零件名称',
    dataIndex: 'partName',
    filterable: {enabled: true, type: 'input', prop: 'partName', placeholder: '请输入零件名称', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 300
  },
  {
    title: '批次',
    dataIndex: 'batchNo',
    filterable: {enabled: true, type: 'input', prop: 'batchNo', placeholder: '请输入批次', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 300
  },
  {
    title: '专业厂',
    dataIndex: 'factory',
    filterable: {enabled: true, type: 'input', prop: 'factory', placeholder: '请输入专业厂', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 150
  },
  {
    title: '检验员',
    dataIndex: 'name',
    filterable: {enabled: true, type: 'input', prop: 'name', placeholder: '请输入检验员', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 200
  },
  {
    title: '检验时间',
    dataIndex: 'time',
    filterable: {enabled: true, type: 'date', prop: 'time', placeholder: '请输入检验时间', alignLeft: true},
    ellipsis: true,
    tooltip: true,
    align: 'center',
    width: 200
  },
  {
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

const rowDatas: any = reactive([{
  seqNo: 1,
  partName: 'DL-2020-0101-001',
  batchNo: '2020-0101',
  factory: '专业厂1',
  name: '001',
  time: '2020-01-01'
}]);


const visible = ref(false)
const activeRow = ref(null);

const addRow = (record: any) => {

}

const delRow = (record: any) => {

}

/**
 * 表格按钮
 */
const buttons: any = [
  {
    text: '新增',
    type: 'primary',
    size: 'small',
    onClick: () => addRow(null)
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
</script>

<style scoped>
</style>
