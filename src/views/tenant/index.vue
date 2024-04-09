<template>
  <div class="tab-container">
    <div>
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="公寓" prop="apartmentId">
          <el-select placeholder="请选择" v-model="queryForm.apartmentId">
            <el-option v-for="item in apartmentOption" default-first-option="true" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="租户ID" prop="tenantId">
          <el-input clearable placeholder="请输入内容" v-model="queryForm.tenantId"></el-input>
        </el-form-item>
        <el-form-item label="租户姓名" prop="tenantName">
          <el-input clearable placeholder="请输入内容" v-model="queryForm.tenantName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input clearable placeholder="请输入内容" v-model="queryForm.tenantId"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select clearable placeholder="请输入内容" v-model="queryForm.status">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <keep-alive>
      <tenantList v-if="tenantListTab" :apartmentId="this.queryForm.apartmentId"></tenantList>
    </keep-alive>
  </div>
</template>

<script>
import tenantList from './components/tenantList.vue'
import store from '@/store'

export default {
  name: 'Tenant',
  components: { tenantList },
  data() {
    return {
      queryForm: {},
      apartmentOption: store.getters.apartments,
      tenantListTab: true,
      statusOptions: [{ value: '0', label: '在租' }, { value: '1', label: '退租' }]
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
