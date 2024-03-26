<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" :title="dialogType==='edit'?'编辑房客':'新增房客'">
    <el-form :model="userForm" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="userForm.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号码" prop="idCard">
            <el-input v-model="userForm.idCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="userForm.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="户籍地址" prop="address">
        <el-input v-model="userForm.address"></el-input>
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
import { saveOrUpdateTenant } from '@/api/tenant'

export default {
  name: 'AddTenant',
  data() {
    return {
      dialogType: 'new',
      dialogVisible: true,
      userForm: {}
    }
  },
  methods: {
    cancel() {
      this.dialogVisible = false
      this.$parent.addbox = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.$parent.addbox = false
        }).catch(_ => {})
    },
    submitUserForm() {
      saveOrUpdateTenant(this.userForm).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.$parent.addbox = false
        }
      })
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //   } else {
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style scoped>
  .el-form-item {
    margin-right: 20px;
  }
</style>
