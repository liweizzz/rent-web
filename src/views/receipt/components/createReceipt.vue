<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" :title="dialogType==='edit'?'修改收据':'创建收据'">
    <el-form :model="receiptForm" label-position="top">
      <el-row>
        <el-col :span="8">
          <el-form-item label="房间号" prop="roomNum">
            <el-select placeholder="请选择" @change="roomChange" v-model="receiptForm.roomNum">
              <el-option
                v-for="item in roomOption"
                :key="item.tenantId"
                :label="item.roomNum"
                :value="item.roomNum"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="租户姓名" prop="tenantName">
            <el-input v-model="receiptForm.tenantName"></el-input>
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
      </el-row>
      <el-row>
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
      </el-row>
      <el-row>
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
      </el-row>
      <el-row>
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
      </el-row>
      <el-row>
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
        <el-col :span="16">
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
      <el-button type="primary" @click="submitReceiptForm">
        {{ $t('permission.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createReceipt, getLastReceiptByRoom, getReceipt } from '@/api/receipt'
import { listAllUserFromApartment } from '@/api/tenant'
import { DICT_TYPE, getDictData } from '@/utils/dict'
import { addOneDay, getEndDay } from '@/utils/date'

export default {
  name: 'AddReceipt',
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
      receiptForm: {},
      options: null,
      roomOption: this.listRoomTenant(),
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
      this.$confirm('确认关闭？', { type: 'warning' })
        .then(_ => {
          done()
          this.$parent.addbox = false
        }).catch(_ => {})
    },
    submitReceiptForm() {
      this.$set(this.receiptForm, 'apartmentId', this.apartmentId)
      createReceipt(this.receiptForm).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.$parent.addbox = false
          this.$parent.searchReceipt()
        }
      })
    },
    getReceipt(id) {
      getReceipt(id).then(response => {
        if (response.code === 200) {
          this.receiptForm = response.data
        }
      })
    },
    listRoomTenant() {
      listAllUserFromApartment(this.$parent.apartmentId).then(response => {
        if (response.code === 200) {
          this.roomOption = response.data
        }
      })
    },
    async roomChange(value) {
      this.receiptForm.tenantName = this.roomOption.find((item) => item.roomNum === value).tenantName
      // 设置租户ID，生成收据时需要传此参数
      this.receiptForm.tenantId = this.roomOption.find((item) => item.roomNum === value).tenantId
      // 通过房间号获取上次电表度数
      const response = await getLastReceiptByRoom(value)
      const receiptInfo = response.data
      this.$set(this.receiptForm, 'rentMoney', receiptInfo.rentMoney)
      this.$set(this.receiptForm, 'elecPrice', receiptInfo.elecPrice)
      this.$set(this.receiptForm, 'lastElecNum', receiptInfo.curElecNum)
      const rentStartDay = addOneDay(receiptInfo.rentEndDay)
      this.$set(this.receiptForm, 'rentStartDay', rentStartDay)
      // 设置 结束日期
      this.$set(this.receiptForm, 'rentEndDay', getEndDay(rentStartDay))
      this.$set(this.receiptForm, 'waterMoney', receiptInfo.waterMoney)
      this.$set(this.receiptForm, 'peopleCount', receiptInfo.peopleCount)
      this.$set(this.receiptForm, 'internetMoney', receiptInfo.internetMoney)
      this.$set(this.receiptForm, 'signature', receiptInfo.signature)
    }
  }
}
</script>

<style scoped>
</style>
