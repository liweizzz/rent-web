<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" :title="dialogType==='edit'?'修改收据':'创建收据'">
    <el-form :model="receiptForm" label-position="top">
      <el-row>
        <el-col :span="8">
          <el-form-item label="房间号" prop="roomNum">
            <el-select v-model="receiptForm.roomNum" placeholder="请选择" @change="roomChange">
              <el-option
                v-for="item in roomOption"
                :key="item.tenantId"
                :label="item.roomNum"
                :value="item.roomNum"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="租户姓名" prop="tenantName">
            <el-input v-model="receiptForm.tenantName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房租金额" prop="rentMoney">
            <el-input v-model="receiptForm.rentMoney" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="房租起始日期" prop="rentStartDay">
            <el-date-picker
              v-model="receiptForm.rentStartDay"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房租到期日期" prop="rentEndDay">
            <el-date-picker
              v-model="receiptForm.rentEndDay"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="水费单价" prop="waterMoney">
            <el-select v-model="receiptForm.waterMoney" placeholder="请选择">
              <el-option
                v-for="item in waterMoney"
                :key="item.key"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="计费人数" prop="peopleCount">
            <el-input v-model="receiptForm.peopleCount" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="期初电表度数" prop="lastElecNum">
            <el-input v-model="receiptForm.lastElecNum" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="期末电表度数" prop="curElecNum">
            <el-input v-model="receiptForm.curElecNum" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="电费单价" prop="elecPrice">
            <el-select v-model="receiptForm.elecPrice" placeholder="请选择">
              <el-option
                v-for="item in elecPriceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="网费" prop="internetMoney">
            <el-select v-model="receiptForm.internetMoney" placeholder="请选择">
              <el-option
                v-for="item in internetMoney"
                :key="item.key"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="押金" prop="deposit">
            <el-input v-model="receiptForm.deposit" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="居住人数" prop="allPeopleCount">
            <el-input v-model="receiptForm.allPeopleCount" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收款人" prop="signature">
            <el-select v-model="receiptForm.signature" placeholder="请选择">
              <el-option
                v-for="item in signature"
                :key="item.key"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注" prop="note">
            <el-input v-model="receiptForm.note" />
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
            message: this.dialogType === 'new' ? '新增成功' : '修改成功',
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
