<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" :title="dialogType==='edit'?'修改租户':'新增租户'">
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
import { validateIdCard, validatePhoneNumber } from '@/utils/validate'

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
        phone: { validator: validatePhoneNumber, trigger: 'blur' },
        idCard: { validator: validateIdCard, trigger: 'blur' }
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
    }
  }
}
</script>

<style scoped>
</style>
