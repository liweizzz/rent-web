<template>
  <div class="tab-container">
    <div>
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="公寓" prop="apartmentId">
          <el-select placeholder="请选择" v-model="queryForm.apartmentId">
            <el-option v-for="item in apartmentOption" default-first-option="true" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="房间号" prop="roomNum">
          <el-input clearable placeholder="请输入内容" v-model="queryForm.roomNum"></el-input>
        </el-form-item>
        <el-form-item label="房东姓名" prop="userId">
          <el-input clearable placeholder="请输入内容" v-model="queryForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="月份" prop="month">
          <el-date-picker v-model="queryForm.month" type="month" value-format="yyyy-MM" placeholder="选择月">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <keep-alive>
      <receiptList v-if="receiptList" :apartmentId="this.queryForm.apartmentId"></receiptList>
    </keep-alive>
  </div>
</template>

<script>
import receiptList from './components/receiptList.vue'
import store from '@/store'

export default {
  name: 'Receipt',
  components: { receiptList },
  data() {
    return {
      queryForm: {},
      receiptList: true,
      apartmentOption: store.getters.apartments
    }
  },
  created() {
    this.queryForm.apartmentId = this.apartmentOption[0].key
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 20px;
  }
</style>
