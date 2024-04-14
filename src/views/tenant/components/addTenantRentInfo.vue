<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title='新增'>
    <el-form :model="rentInfoForm" label-position="top">
      <el-row>
        <el-col :span="8">
          <el-form-item label="起租日期" prop="rentStartDay">
            <el-date-picker
              v-model="rentInfoForm.rentStartDay"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="退租日期" prop="rentEndDay">
            <el-date-picker
              v-model="rentInfoForm.rentEndDay"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="租房状态" prop="rentStatus">
            <el-select placeholder="请选择" v-model="rentInfoForm.rentStatus">
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
          <el-form-item label="房间号" prop="roomNum">
            <el-select placeholder="请选择" v-model="rentInfoForm.roomNum">
              <el-option
                v-for="item in roomOption"
                :key="item.id"
                :label="item.roomNum"
                :value="item.roomNum"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="合同ID" prop="contractId">
            <el-input v-model="rentInfoForm.contractId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
import { getTenantRentDetailByTId, saveTenantRentDetail } from '@/api/tenant'
import { listRoomFromApartment } from '@/api/room'

export default {
  name: 'AddUserRentInfo',
  props: {
    apartmentId: {
      type: String,
      required: true
    },
    tenantId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: true,
      rentInfoForm: {},
      statusOptions: [{ value: '0', label: '在租' }, { value: '1', label: '退租' }],
      roomOption: this.getAllRoomNum(this.apartmentId)
    }
  },
  created() {
    getTenantRentDetailByTId(this.tenantId).then(response => {
      if (response.code === 200) {
        const data = response.data
        if (data.rentStatus === 0) {
          data.rentStatus = '在租'
        }
        if (data.rentStatus === 1) {
          data.rentStatus = '退租'
        }
        this.rentInfoForm = response.data
      }
    })
  },
  methods: {
    getAllRoomNum(apartmentId) {
      const param = { 'apartmentId': apartmentId }
      listRoomFromApartment(param).then(response => {
        if (response.code === 200) {
          this.roomOption = response.data
        }
      })
    },
    cancel() {
      this.dialogVisible = false
      this.$parent.rentDetailInfo = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.$parent.rentDetailInfo = false
        }).catch(_ => {})
    },
    submitUserForm() {
      this.$set(this.rentInfoForm, 'tenantId', this.tenantId)
      saveTenantRentDetail(this.rentInfoForm).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.$parent.rentDetailInfo = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
