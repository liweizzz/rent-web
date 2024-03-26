<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" :title="dialogType==='edit'?'编辑':'新增'">
    <el-form :model="rentInfoForm" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="起租日期" prop="rentStartDay">
            <el-input v-model="rentInfoForm.rentStartDay"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="退租日期" prop="rentEndDay">
            <el-input v-model="rentInfoForm.rentEndDay"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="租房状态" prop="rentStatus">
            <el-input v-model="rentInfoForm.rentStatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="房间号" prop="roomNum">
        <el-input v-model="rentInfoForm.roomNum"></el-input>
      </el-form-item>
      <el-form-item label="合同ID" prop="contractId">
        <el-input v-model="rentInfoForm.contractId"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button type="danger" @click="cancel">
        {{ $t('permission.cancel') }}
      </el-button>
      <el-button type="primary" @click="submitUserForm">
        {{ $t('permission.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveTenantRentDetail } from '@/api/tenant'

export default {
  name: 'AddUserRentInfo',
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialogType: 'new',
      dialogVisible: true,
      rentInfoForm: {}
    }
  },
  methods: {
    cancel() {
      this.dialogVisible = false
      this.$parent.$parent.$parent.rentDetailInfo = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.$parent.$parent.$parent.rentDetailInfo = false
        }).catch(_ => {})
    },
    submitUserForm() {
      this.$set(this.rentInfoForm, 'userId', this.$props.userId)
      saveTenantRentDetail(this.rentInfoForm).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.$parent.$parent.$parent.rentDetailInfo = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
