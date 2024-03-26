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
      <LandLordList v-if="landLordTab"></LandLordList>
    </keep-alive>
    <AddLandLord v-if="addbox"></AddLandLord>
  </div>
</template>

<script>
import LandLordList from './components/landLordList'
import AddLandLord from './components/addLandLord'

export default {
  name: 'Landlord',
  components: { AddLandLord, LandLordList },
  data() {
    return {
      landLordTab: true,
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
