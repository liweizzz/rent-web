<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" :title="dialogType==='edit'?'编辑房客':'新增房客'">
    <el-form :model="tenantForm" :rules="rules" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="tenantForm.tenantName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号码" prop="idCard">
            <el-input v-model="tenantForm.idCard" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="tenantForm.phone" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="户籍地址" prop="address">
        <el-input v-model="tenantForm.address" />
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button type="danger" @click="cancel">
        {{ $t('permission.cancel') }}
      </el-button>
      <el-button type="primary" @click="submittenantForm">
        {{ $t('permission.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getTenantInfo, saveOrUpdateTenant } from '@/api/tenant'
import store from '@/store'

export default {
  name: 'AddTenant',
  props: {
    apartmentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialogType: 'new',
      dialogVisible: true,
      tenantForm: {},
      rules: {
        phone: { validator: this.validatePhoneNumber, trigger: 'blur' },
        idCard: { validator: this.validateIdCard, trigger: 'blur' }
      }
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
    submittenantForm() {
      this.$set(this.tenantForm, 'apartmentId', this.$props.apartmentId)
      this.$set(this.tenantForm, 'userId', store.getters.userId)
      this.$set(this.tenantForm, 'userName', store.getters.username)
      saveOrUpdateTenant(this.tenantForm).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.$parent.addbox = false
          this.$parent.searchTenant()
        }
      })
    },
    getTenantInfo(value) {
      getTenantInfo(value).then(response => {
        if (response.code === 200) {
          this.tenantForm = response.data
        }
      })
    },
    validatePhoneNumber(rule, value, callback) {
      if (value === null || value === undefined || value === '') {
        return
      }
      // 正则表达式用于验证电话号码是否符合格式要求
      const phonePattern = /^1[3-9]\d{9}$/
      if (!phonePattern.test(this.tenantForm.phone)) {
        callback('请正确填写11位手机号码')
      }
    },
    validateIdCard(rule, value, callback) {
      if (value === null || value === undefined || value === '') {
        return
      }
      // 正则表达式用于验证电话号码是否符合格式要求
      const regex = /^[1-9]\d{5}(18|19|20|21|22)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|[Xx])$/
      if (!regex.test(this.tenantForm.idCard)) {
        callback('请正确填写身份证号')
      }
    }
  }
}
</script>

<style scoped>
</style>
