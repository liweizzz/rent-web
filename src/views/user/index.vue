<template>
  <div class="tab-container">
    <div class="el-input">
      用户ID：<el-input v-model="queryForm.userId" style="width: 150px" placeholder="请输入内容" />
      用户姓名：<el-input v-model="queryForm.userName" style="width: 150px" placeholder="请输入内容" />
      电话：<el-input v-model="queryForm.phone" type="text" style="width: 150px" :class="{ 'red-text': !isValidPhoneNumber }" placeholder="请输入电话号码" @blur="validatePhoneNumber" />
      省：<el-select style="width: 150px" clearable placeholder="请选择" @change="change" v-model="queryForm.provinceId">
        <el-option
          v-for="item in provinceOptions"
          :key="item.code"
          :label="item.name"
          :value="item.id"></el-option>
      </el-select>
      市：<el-select style="width: 150px" clearable placeholder="请选择" v-model="queryForm.cityCode">
      <el-option
        v-for="item in cityOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code"></el-option>
    </el-select>
      状态：<el-select v-model="queryForm.status" clearable style="width: 150px" placeholder="请选择">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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
  name: 'Landlord',
  components: { addUser, userList },
  data() {
    return {
      landLordTab: true,
      addbox: false,
      queryForm: {},
      provinceOptions: this.getAllProvince(),
      cityOptions: {},
      isValidPhoneNumber: true, // 标志位，用于标识电话号码是否有效
      statusOptions: [{ value: '0', label: '正常' }, { value: '1', label: '锁定' }]
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
    validatePhoneNumber() {
      // 正则表达式用于验证电话号码是否符合格式要求
      const phonePattern = /^1[3-9]\d{9}$/
      this.isValidPhoneNumber = phonePattern.test(this.queryForm.phone)
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
  .red-text {
    border: 1px solid red; /* 设置红色边框 */
  }
</style>
