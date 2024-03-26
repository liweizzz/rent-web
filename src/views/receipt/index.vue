<template>
  <div class="tab-container">
    <div class="el-input">
      房东ID：<el-input style="width: auto" placeholder="请输入内容" v-model="input1"></el-input>
      房东姓名：<el-input style="width: auto" placeholder="请输入内容" v-model="input2"></el-input>
      电话：<el-input style="width: auto" placeholder="请输入内容" v-model="input3"></el-input>
      省：<el-select placeholder="请选择" v-model="select1"></el-select>
      市：<el-select placeholder="请选择" v-model="select2"></el-select>
      状态：<el-select style="width: auto" placeholder="请输入内容" v-model="select3"></el-select>
    </div>
    <keep-alive>
      <receiptList v-if="receiptList"></receiptList>
    </keep-alive>
    <createLandLord v-if="addbox"></createLandLord>
  </div>
</template>

<script>
import receiptList from './components/receiptList.vue'
import createLandLord from './components/createReceipt.vue'

export default {
  name: 'Receipt',
  components: { createLandLord, receiptList },
  data() {
    return {
      receiptList: true,
      addbox: false,
      input1: '',
      input2: '',
      input3: '',
      select1: '',
      select2: '',
      select3: ''
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
