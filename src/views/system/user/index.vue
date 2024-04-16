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
        <el-form-item label="省" prop="provinceId">
          <el-select style="width: 150px" clearable placeholder="请选择" @change="change" v-model="queryForm.provinceId">
            <el-option v-for="item in provinceOptions" :key="item.code" :label="item.name" :value="item.id"/>
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
      <userList v-if="landLordTab" />
    </keep-alive>
    <addUser v-if="addbox" />
  </div>
</template>

<script>
import userList from './components/userList.vue'
import addUser from './components/addUser.vue'
import { getAllAreas, getAllCityByProvince } from '@/api/user'

export default {
  name: 'Tenant',
  components: { addUser, userList },
  data() {
    return {
      landLordTab: true,
      addbox: false,
      queryForm: {},
      provinceOptions: this.getAllProvince(),
      cityOptions: {},
      isValidPhoneNumber: true, // 标志位，用于标识电话号码是否有效
      statusOptions: [{ value: '0', label: '正常' }, { value: '1', label: '锁定' }],
      rules: {
        phone: { validator: this.validatePhoneNumber, trigger: 'blur' }
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
      getAllCityByProvince(value).then(response => {
        if (response.code === 200) {
          this.cityOptions = response.data
        }
      })
    },
    validatePhoneNumber(rule, value, callback) {
      if (value === null || value === undefined || value === '') {
        return
      }
      // 正则表达式用于验证电话号码是否符合格式要求
      const phonePattern = /^1[3-9]\d{9}$/
      if (!phonePattern.test(this.queryForm.phone)) {
        callback('请正确填写11位手机号码')
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
