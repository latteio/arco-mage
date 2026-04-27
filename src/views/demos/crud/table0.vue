<template>
  <div class="page">
    <!-- 表格 -->
    <a-table

        :columns="columns"
        :data="data"
    >
      <!-- 列插槽(slot) -->
      <template #op="{record}">
        <div class="buttons">
          <a-button type="primary" status="danger" @click="deleteRow(record)">删除</a-button>
          <a-button type="primary" @click="editRow(record)">编辑</a-button>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";

const arr: any = [{
  id: '10001'
}, {
  id: '10002'
}, {
  id: '10004'
}, {
  id: '10005'
}, {
  id: '10006'
}]

const visible = ref(true)

const switchVisible = (val: any) => {
  visible.value = !val
}

const title = ref('检验记录表')
const columns: any = [
  {
    title: '序号',
    dataIndex: 'seqNo',
    width: 200
  }, {
    title: '零件名称',
    dataIndex: 'partName',
    width: 200
  }, {
    title: '批次',
    dataIndex: 'batchNo',
    width: 200
  }, {
    title: '专业厂',
    dataIndex: 'factory',
    width: 200
  }, {
    title: '检验人',
    dataIndex: 'name',
    width: 200
  }, {
    title: '检验时间',
    dataIndex: 'time',
    width: 200
  }, {
    title: '操作',
    dataIndex: 'op',
    slotName: 'op',
    width: 200
  }
];

const data: any = reactive([{
  seqNo: 1,
  partName: 'DL-2020-0101-001',
  batchNo: '2020-0101',
  factory: '专业厂1',
  name: '001',
  time: '2020-01-01'
}, {
  seqNo: 2,
  partName: 'DL-2020-0101-002',
  batchNo: '2020-0101',
  factory: '专业厂1',
  name: '001',
  time: '2020-01-01'
}, {
  seqNo: 3,
  partName: 'DL-2020-0101-003',
  batchNo: '2020-0101',
  factory: '专业厂1',
  name: '001',
  time: '2020-01-01'
}, {
  seqNo: 4,
  partName: 'DL-2020-0101-004',
  batchNo: '2020-0101',
  factory: '专业厂1',
  name: '002',
  time: '2020-01-01'
}, {
  seqNo: 5,
  partName: 'DL-2020-0101-005',
  batchNo: '2020-0101',
  factory: '专业厂1',
  name: '002',
  time: '2020-01-01'
}]);

const deleteRow = (record: any) => {
  console.log('delete', record)
}

const editRow = (record: any) => {
  console.log('edit', record)
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  align-items: center;
  height: 50px;
  vertical-align: middle;
}

.buttons > *:not(:first-child) {
  margin-left: 4px;
}
</style>
