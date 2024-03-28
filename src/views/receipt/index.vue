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
      房间号：<el-input style="width: auto" placeholder="请输入内容" v-model="queryForm.roomNum"></el-input>
      房东ID：<el-input style="width: auto" placeholder="请输入内容" v-model="queryForm.landLordId"></el-input>
      月份：<el-date-picker v-model="queryForm.month" type="month" placeholder="选择月">
    </el-date-picker>
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
import store from '@/store'

export default {
  name: 'Receipt',
  components: { createLandLord, receiptList },
  data() {
    return {
      queryForm: {},
      receiptList: true,
      addbox: false,
      apartmentOption: store.getters.apartments
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
