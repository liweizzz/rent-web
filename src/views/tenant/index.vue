<template>
  <div class="tab-container">
    <div class="el-input">
      公寓：<el-select placeholder="请选择" clearable v-model="queryForm.apartmentId">
      <el-option
        v-for="item in apartmentOption"
        default-first-option="true"
        :key="item.key"
        :label="item.value"
        :value="item.key">
      </el-option>
    </el-select>
      租户ID：<el-input style="width: auto" placeholder="请输入内容" v-model="queryForm.tenantId"></el-input>
      租户姓名：<el-input style="width: auto" placeholder="请输入内容" v-model="queryForm.tenantName"></el-input>
      电话：<el-input style="width: auto" placeholder="请输入内容" v-model="queryForm.phone"></el-input>
      状态：<el-select style="width: auto" placeholder="请输入内容" v-model="queryForm.status"></el-select>
    </div>
    <keep-alive>
      <tenantList v-if="tenantListTab"></tenantList>
    </keep-alive>
    <addTenant v-if="addbox"></addTenant>
  </div>
</template>

<script>
import tenantList from './components/tenantList.vue'
import addTenant from './components/addTenant.vue'
import store from '@/store'

export default {
  name: 'Tenant',
  components: { tenantList, addTenant },
  data() {
    return {
      queryForm: {},
      apartmentOption: store.getters.apartments,
      tenantListTab: true,
      addbox: false
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
  .el-input {
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
