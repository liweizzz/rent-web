<template>
  <div class="tab-container">
    <p>敬请期待~</p>
    <el-form :model="queryForm" :inline="true">
      <el-form-item label="公寓" prop="apartmentId">
        <el-select placeholder="请选择" v-model="queryForm.apartmentId">
          <el-option v-for="item in apartmentOption" default-first-option="true" :key="item.key" :label="item.value" :value="item.key"/>
        </el-select>
      </el-form-item>
      <el-form-item label="月份" prop="month">
        <el-date-picker v-model="queryForm.month" type="month" value-format="yyyy-MM" placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary">下载报表</el-button>
      <el-button type="primary">发送报表</el-button>
    </el-form>
  </div>
</template>

<script>

import store from '@/store'

export default {
  name: 'Report',
  data() {
    return {
      queryForm: {},
      apartmentOption: store.getters.apartments
    }
  },
  created() {
    this.queryForm.apartmentId = this.apartmentOption[0].key
  },
  methods: {
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 20px;
  }
</style>
