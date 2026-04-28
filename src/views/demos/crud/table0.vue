<template>
  <div class="table-block">
    <!-- 添加一个表格标题 -->
    <div class="caption" v-if="visible">{{ caption }}</div>
    <div class="top-buttons">
      <a-button type="primary" @click="handleAddRow">新增</a-button>
    </div>
    <a-table
        :columns="columns"
        :data="data"
    >

      <template #op="{ record }">
        <a-link type="primary" status="danger" v-on:click="handleDeleteRow(record)">删除</a-link>
        <a-link type="primary" @click="handleEditRow(record)">编辑</a-link>
      </template>
    </a-table>

    <!-- 创建一个弹出框 -->
    <a-modal :width="'30%'"
             title="新增检验记录"
             title-align="start"
             v-model:visible="dialogVisible"
    >

      <!-- 定义一个表单以及若干表单项 -->
      <a-form ref="formRef" class="form" :model="formData" v-show="formVisible" auto-label-width>
        <a-form-item label="序号" prop="seqNo">
          <a-input v-model="formData.seqNo" placeholder="请输入序号"></a-input>
        </a-form-item>
        <a-form-item label="零件名称" prop="partName">
          <a-input v-model="formData.partName" placeholder="请输入零件名称"></a-input>
        </a-form-item>
        <a-form-item label="零件批次" prop="batchNo">
          <a-input v-model="formData.batchNo" placeholder="请输入零件批次"></a-input>
        </a-form-item>
        <a-form-item label="专业厂" prop="factory">
          <a-input v-model="formData.factory" placeholder="请输入专业厂"></a-input>
        </a-form-item>
        <a-form-item label="检验员" prop="name">
          <a-input v-model="formData.name" placeholder="请输入检验员"></a-input>
        </a-form-item>
        <a-form-item label="检验时间" prop="time">
          <a-input v-model="formData.time" placeholder="请输入检验时间"></a-input>
        </a-form-item>
      </a-form>
      <div class="form-buttons">
        <a-button type="primary" @click="handleSaveRecord">保存</a-button>
      </div>

    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";

const dialogVisible = ref(false);

const caption = ref("表格标题");
const formRef = ref();
const formData = reactive({
  seqNo: null,
  partName: null,
  batchNo: null,
  factory: null,
  name: null,
  time: null
})

const formVisible = ref(false);


const visible = ref(true);

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
    title: '检验员',
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

const handleAddRow = () => {
  // data.push({
  //   seqNo: 6,
  //   partName: 'DL-2020-0101-006',
  //   batchNo: '2020-0101',
  //   factory: '专业厂1',
  //   name: '003',
  //   time: '2020-01-01'
  // })
  dialogVisible.value = true;
  formVisible.value = true
}

const currentRow = ref(null);
const handleEditRow = (record: any) => {
  currentRow.value = record;
  console.log("点击编辑按钮")
  formVisible.value = true;
  formData.seqNo = record.seqNo;
  formData.partName = record.partName;
  formData.batchNo = record.batchNo;
  formData.factory = record.factory;
  formData.name = record.name;
  formData.time = record.time;
}

const handleSaveRecord = () => {
  // currentRow.value.seqNo = formData.seqNo;
  for (let key in formData) {
    currentRow.value[key] = formData[key];
  }
}

const handleDeleteRow = (record: any) => {
  console.log("点击删除按钮", record)
  let row = data.filter(r => r.seqNo == record.seqNo);
  console.log('delete row=', row)
  data.splice(data.indexOf(row[0]), 1)
}

// 组件生命周期演示
onMounted(() => {
  // 组件加载完成后，显示一行控制台输出
  console.log("表格组件加载完成")

  // 请求接口数据
  //
});

</script>

<style scoped>
.table-block {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.table-block .caption {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.top-buttons {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.form {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
