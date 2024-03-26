<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" :title="dialogType==='edit'?'编辑房东':'新增房东'">
    <el-form :model="landLordForm" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名" prop="landlordName">
            <el-input v-model="landLordForm.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号码" prop="idCard">
            <el-input v-model="landLordForm.idCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="landLordForm.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="地区" prop="provinceCode">
            <el-cascader
              v-model="landLordForm.areas"
              placeholder="请选择"
              :options="options"
              clearable
              :props="{ expandTrigger: 'hover' ,value:'code',label:'name',children:'cityList'}"
              @visible-change="handleChange"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select placeholder="请选择" v-model="landLordForm.status">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="landLordForm.address"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button type="danger" @click="cancel">
        {{ $t('permission.cancel') }}
      </el-button>
      <el-button type="primary" @click="submitLandLordForm(landLordForm)">
        {{ $t('permission.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAllAreas, saveLandlord } from '@/api/article'

export default {
  name: 'AddLandLord',
  data() {
    return {
      dialogType: 'new',
      dialogVisible: true,
      landLordForm: {},
      options: null,
      statusOptions: [{ value: '0', label: '正常' }, { value: '1', label: '锁定' }]
    }
  },
  methods: {
    handleChange(flag) {
      if (flag) {
        getAllAreas().then(response => {
          if (response.code === 200) {
            this.options = response.data
          }
        })
      }
    },
    cancel() {
      this.$parent.addbox = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.$parent.addbox = false
        }).catch(_ => {})
    },
    submitLandLordForm(formName) {
      this.landLordForm.provinceCode = this.landLordForm.areas.at(0)
      this.landLordForm.cityCode = this.landLordForm.areas.at(1)
      delete this.landLordForm['areas']
      saveLandlord(this.landLordForm).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.$parent.addbox = false
          console.log(this.$parent)
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
