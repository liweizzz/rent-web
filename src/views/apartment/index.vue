<template>
  <div class="tab-container">
    <div class="el-input">
      房东ID：<el-input style="width: auto" placeholder="请输入内容" v-model="input1"></el-input>
      房东姓名：<el-input style="width: auto" placeholder="请输入内容" v-model="input2"></el-input>
    </div>
    <keep-alive>
      <apartmentList v-if="apartmentList"></apartmentList>
    </keep-alive>
    <addApartment v-if="addbox"></addApartment>
  </div>
</template>

<script>
import apartmentList from './components/apartmentList.vue'
import addApartment from './components/addApartment.vue'

export default {
  name: 'Tab',
  components: { addApartment, apartmentList },
  data() {
    return {
      apartmentList: true,
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
