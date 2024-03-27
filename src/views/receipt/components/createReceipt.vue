<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" :title="dialogType==='edit'?'修改收据':'创建收据'">
    <el-form :model="receiptForm" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="租户姓名" prop="tenantName">
            <el-input v-model="receiptForm.tenantName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房间号" prop="roomNum">
            <el-input v-model="receiptForm.roomNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房租起始日期" prop="rentStartDay">
            <el-date-picker
              v-model="receiptForm.rentStartDay"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房租到期日期" prop="rentEndDay">
            <el-date-picker
              v-model="receiptForm.rentEndDay"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房租金额" prop="rentMoney">
            <el-input v-model="receiptForm.rentMoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="水费单价" prop="waterMoney">
            <el-select placeholder="请选择" v-model="receiptForm.waterMoney">
              <el-option
                v-for="item in waterMoney"
                :key="item.key"
                :label="item.value"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人数" prop="peopleCount">
            <el-input v-model="receiptForm.peopleCount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="期初电表度数" prop="lastElecNum">
            <el-input v-model="receiptForm.lastElecNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="期末电表度数" prop="curElecNum">
            <el-input v-model="receiptForm.curElecNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电费单价" prop="elecPrice">
            <el-select placeholder="请选择" v-model="receiptForm.elecPrice">
              <el-option
                v-for="item in elecPriceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="网费" prop="internetMoney">
            <el-select placeholder="请选择" v-model="receiptForm.internetMoney">
              <el-option
                v-for="item in internetMoney"
                :key="item.key"
                :label="item.value"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="押金" prop="deposit">
            <el-input v-model="receiptForm.deposit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收款人" prop="signature">
            <el-select placeholder="请选择" v-model="receiptForm.signature">
              <el-option
                v-for="item in signature"
                :key="item.key"
                :label="item.value"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="note">
            <el-input v-model="receiptForm.note"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align:right;">
      <el-button type="danger" @click="cancel">
        {{ $t('permission.cancel') }}
      </el-button>
      <el-button type="primary" @click="submitReceiptForm(receiptForm)">
        {{ $t('permission.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createReceipt } from '@/api/receipt'
import { listAllUserFromApartment } from '@/api/tenant'
import { listRoomFromApartment } from '@/api/room'
import { DICT_TYPE, getDictData } from '@/utils/dict'

export default {
  name: 'AddReceipt',
  data() {
    return {
      dialogType: 'new',
      dialogVisible: true,
      receiptForm: {},
      options: null,
      userOption: listAllUserFromApartment(this.$parent.queryForm.apartmentId),
      roomOption: listRoomFromApartment(),
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }]
      },
      elecPriceOptions: getDictData(DICT_TYPE.ELEC_PRICE),
      signature: getDictData(DICT_TYPE.SIGNATURE),
      waterMoney: getDictData(DICT_TYPE.WATER_MONEY),
      internetMoney: getDictData(DICT_TYPE.INTERNET_MONEY)
    }
  },
  methods: {
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
    submitReceiptForm(formName) {
      createReceipt(this.receiptForm).then(response => {
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
