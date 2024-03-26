<template>
  <div class="tab-container">
    <div class="el-input">
      租户ID：<el-input style="width: auto" placeholder="请输入内容" v-model="input1"></el-input>
      租户姓名：<el-input style="width: auto" placeholder="请输入内容" v-model="input2"></el-input>
      电话：<el-input style="width: auto" placeholder="请输入内容" v-model="input3"></el-input>
      状态：<el-select style="width: auto" placeholder="请输入内容" v-model="select1"></el-select>
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

export default {
  name: 'Tenant',
  components: { tenantList, addTenant },
  data() {
    return {
      tenantListTab: true,
      addbox: false,
      input1: '',
      input2: '',
      input3: '',
      select1: ''
    }
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
