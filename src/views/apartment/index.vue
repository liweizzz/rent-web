<template>
  <div class="tab-container">
    <div>
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="用户ID" prop="userId">
          <el-input clearable placeholder="请输入内容" v-model="queryForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName">
          <el-input clearable placeholder="请输入内容" v-model="queryForm.userName"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <keep-alive>
      <apartmentList v-if="apartmentList"></apartmentList>
    </keep-alive>
  </div>
</template>

<script>
import apartmentList from './components/apartmentList.vue'

export default {
  name: 'User',
  components: { apartmentList },
  data() {
    return {
      apartmentList: true,
      queryForm: {}
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 20px;
  }
</style>
