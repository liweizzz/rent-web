<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" :title="dialogType==='edit'?'编辑用户':'新增用户'">
    <el-form :model="userForm" :rules="rules" label-position="left">
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
      <el-row>
        <el-col :span="8">
          <el-form-item label="地区" prop="provinceCode">
            <el-cascader
              v-model="userForm.areas"
              placeholder="请选择"
              :options="aresOptions"
              clearable
              :props="{ expandTrigger: 'hover' ,value:'code',label:'name',children:'cityList'}">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色" prop="roleId">
            <el-select placeholder="请选择" v-model="userForm.roleId">
              <el-option
                v-for="item in roleOptions"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select placeholder="请选择" v-model="userForm.status">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="userForm.password" show-password></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="userForm.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align:right;">
      <el-button type="danger" @click="cancel">
        {{ $t('permission.cancel') }}
      </el-button>
      <el-button type="primary" @click="submituserForm(userForm)">
        {{ $t('permission.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAllAreas, getUser, saveUser } from '@/api/user'
import { validateIdCard, validatePhoneNumber } from '@/utils/validate'
import { getRoles } from '@/api/role'
import { isNotEmptyArray } from '@/utils/stringUtils'

export default {
  name: 'AddUser',
  data() {
    return {
      dialogType: 'new',
      dialogVisible: true,
      userForm: {},
      aresOptions: null,
      statusOptions: [{ value: '0', label: '正常' }, { value: '1', label: '锁定' }],
      roleOptions: null,
      rules: {
        phone: { validator: validatePhoneNumber, trigger: 'blur' },
        idCard: { validator: validateIdCard, trigger: 'blur' }
      }
    }
  },
  created() {
    getAllAreas().then(response => {
      if (response.code === 200) {
        this.aresOptions = response.data
      }
    })
    getRoles().then(response => {
      if (response.code === 200) {
        this.roleOptions = response.data
      }
    })
  },
  methods: {
    cancel() {
      this.$parent.addbox = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？', { type: 'warning' })
        .then(_ => {
          done()
          this.$parent.addbox = false
        }).catch(_ => {})
    },
    submituserForm(formName) {
      if (isNotEmptyArray(this.userForm.areas)) {
        this.userForm.provinceCode = this.userForm.areas.at(0)
        this.userForm.cityCode = this.userForm.areas.at(1)
      }
      delete this.userForm['areas']
      saveUser(this.userForm).then(response => {
        if (response.code === 200) {
          this.$message({
            message: this.dialogType === 'new' ? '新增成功' : '修改成功',
            type: 'success'
          })
          this.$parent.addbox = false
          this.$parent.searchUser()
        }
      })
    },
    editUser(id) {
      getUser(id).then(response => {
        if (response.code === 200) {
          this.userForm = response.data
          this.userForm.areas = [response.data.province, response.data.city]
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
