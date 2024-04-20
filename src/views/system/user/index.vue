<template>
  <div class="tab-container">
    <div>
      <el-form :model="queryForm" :inline="true" :rules="rules">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="queryForm.userId" style="width: 100px" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="queryForm.userName" style="width: 150px" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="queryForm.phone" style="width: 150px" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="省" prop="provinceCode">
          <el-select style="width: 150px" clearable placeholder="请选择" @change="change" v-model="queryForm.provinceCode">
            <el-option v-for="item in provinceOptions" :key="item.code" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="市" prop="cityCode">
          <el-select style="width: 150px" clearable placeholder="请选择" v-model="queryForm.cityCode">
            <el-option v-for="item in cityOptions" :key="item.code" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="queryForm.status" clearable style="width: 150px" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <keep-alive>
      <userList v-if="userTab" />
    </keep-alive>
  </div>
</template>

<script>
import userList from './components/userList.vue'
import { getAllAreas, getAllCityByProvince } from '@/api/user'
import { validatePhoneNumber } from '@/utils/validate'
import { isNotEmpty } from '@/utils/stringUtils'

export default {
  name: 'User',
  components: { userList },
  data() {
    return {
      userTab: true,
      queryForm: {},
      provinceOptions: this.getAllProvince(),
      cityOptions: {},
      isValidPhoneNumber: true, // 标志位，用于标识电话号码是否有效
      statusOptions: [{ value: '0', label: '正常' }, { value: '1', label: '锁定' }],
      rules: {
        phone: { validator: validatePhoneNumber, trigger: 'blur' }
      }
    }
  },
  methods: {
    getAllProvince() {
      getAllAreas().then(response => {
        if (response.code === 200) {
          this.provinceOptions = response.data
        }
      })
    },
    change(value) {
      if (isNotEmpty(value)) {
        getAllCityByProvince(value).then(response => {
          if (response.code === 200) {
            this.cityOptions = response.data
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 20px;
  }
</style>
