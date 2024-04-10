<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" :title="dialogType==='edit'?'编辑房东':'新增公寓'">
    <el-form :model="apartmentForm" label-position="left">
      <el-form-item label="公寓名称" prop="apartmentName">
        <el-input v-model="apartmentForm.apartmentName"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="apartmentForm.address"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button type="danger" @click="cancel">
        {{ $t('permission.cancel') }}
      </el-button>
      <el-button type="primary" @click="submitApartmentForm(apartmentForm)">
        {{ $t('permission.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveOrUpdateApartment } from '@/api/apartment'
import store from '@/store'
import Vue from 'vue'

export default {
  name: 'AddApartment',
  data() {
    return {
      dialogType: 'new',
      dialogVisible: true,
      apartmentForm: {}
    }
  },
  methods: {
    cancel() {
      this.$parent.addApartmentBox = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.$parent.addApartmentBox = false
        }).catch(_ => {})
    },
    submitApartmentForm(formName) {
      Vue.set(this.apartmentForm, 'userId', store.getters.userId)
      saveOrUpdateApartment(this.apartmentForm).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.$parent.addApartmentBox = false
          this.$parent.searchApartment()
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-form-item {
    margin-right: 20px;
  }
</style>
