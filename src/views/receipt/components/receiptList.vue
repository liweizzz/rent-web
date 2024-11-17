<template>
  <div>
    <div>
      <el-button type="primary" icon="el-icon-search" @click="searchReceipt">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addReceiptForm">创建收据</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addReceiptBatch">批量创建收据</el-button>
    </div>
    <div>
      <el-table :data="receiptList" border fit highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号" align="center" sortable />
        <el-table-column align="center" min-width="60%" label="租户姓名" prop="tenantName">
          <template slot-scope="scope">
            {{ scope.row.tenantName }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="60%" label="房间号" prop="roomNum">
          <template slot-scope="scope">
            {{ scope.row.roomNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="60%" label="房租起始日期" prop="rentStartDay">
          <template slot-scope="scope">
            {{ scope.row.rentStartDay }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="60%" label="房租到期日期" prop="rentEndDay">
          <template slot-scope="scope">
            {{ scope.row.rentEndDay }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="60%" label="房租金额" prop="rentMoney">
          <template slot-scope="scope">
            {{ scope.row.rentMoney }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="60%" label="期初电表度数" prop="lastElecNum">
          <template slot-scope="scope">
            {{ scope.row.lastElecNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="60%" label="期末电表度数" prop="curElecNum">
          <template slot-scope="scope">
            {{ scope.row.curElecNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="60%" label="电费单价" prop="elecPrice">
          <template slot-scope="scope">
            {{ scope.row.elecPrice }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="60%" label="电费" prop="elecMoney">
          <template slot-scope="scope">
            {{ scope.row.elecMoney }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="60%" label="水费" prop="waterMoney">
          <template slot-scope="scope">
            {{ scope.row.waterMoney }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="50%" label="计费人数" prop="peopleCount">
          <template slot-scope="scope">
            {{ scope.row.peopleCount }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="50%" label="网费" prop="internetMoney">
          <template slot-scope="scope">
            {{ scope.row.internetMoney }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="60%" label="金额合计" prop="sumMoney">
          <template slot-scope="scope">
            {{ scope.row.sumMoney }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="60%" label="收款人" prop="signature">
          <template slot-scope="scope">
            {{ scope.row.signature }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="60%" label="备注" prop="note">
          <template slot-scope="scope">
            {{ scope.row.note }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="240px" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="showReceipt(scope)">
              {{ $t('permission.showReceipt') }}
            </el-button>
            <el-button type="primary" size="small" @click="editReceipt(scope)">
              {{ $t('permission.editReceipt') }}
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope)">
              {{ $t('permission.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        :page.sync="queryParam.pageNum"
        :limit.sync="queryParam.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @pagination="getReceiptList"
      />
    </div>
    <div>
      <el-dialog :visible.sync="dialogVisible" width="40%" :show-close="false">
        <el-image :src="receiptImage" />
      </el-dialog>
    </div>
    <div>
      <el-dialog :visible.sync="batchDialog" title="房间号" width="50%" :show-close="false" :before-close="handleClose">
        <el-form :model="rooms" label-position="left">
          <el-row>
            <el-col v-for="(room) in rooms" :key="room.roomNum" :span="4">
              <el-form-item :label="room.roomNum">
                <el-input v-model="room.curElecNum" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="cancel">{{ $t('permission.cancel') }}</el-button>
          <el-button type="primary" @click="createReceiptBatch">{{ $t('permission.confirm') }}</el-button>
        </div>
      </el-dialog>
    </div>
    <createReceipt v-if="addbox" ref="createReceipt" :apartment-id="apartmentId" />
  </div>
</template>

<script>
import { createRecepitBatch, delReceipt, getReceiptImg, getReceiptList } from '@/api/receipt'
import createReceipt from '@/views/receipt/components/createReceipt.vue'

export default {
  components: { createReceipt },
  props: {
    apartmentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      receiptList: null,
      dialogVisible: false,
      batchDialog: false,
      rooms: [
        { roomNum: '101', curElecNum: '' }, { roomNum: '102', curElecNum: '' }, { roomNum: '103', curElecNum: '' },
        { roomNum: '105', curElecNum: '' }, { roomNum: '106', curElecNum: '' }, { roomNum: '107', curElecNum: '' },
        { roomNum: '201', curElecNum: '' }, { roomNum: '202', curElecNum: '' }, { roomNum: '203', curElecNum: '' },
        { roomNum: '205', curElecNum: '' }, { roomNum: '206', curElecNum: '' }, { roomNum: '207', curElecNum: '' },
        { roomNum: '208', curElecNum: '' }, { roomNum: '209', curElecNum: '' }, { roomNum: '301', curElecNum: '' },
        { roomNum: '302', curElecNum: '' }, { roomNum: '303', curElecNum: '' }, { roomNum: '305', curElecNum: '' },
        { roomNum: '306', curElecNum: '' }, { roomNum: '307', curElecNum: '' }, { roomNum: '308', curElecNum: '' },
        { roomNum: '309', curElecNum: '' }, { roomNum: '310', curElecNum: '' }, { roomNum: '311', curElecNum: '' }
      ],
      receiptImage: null,
      addbox: false,
      queryParam: {
        pageNum: 1,
        pageSize: 10
      },
      total: 1
    }
  },
  created() {
    this.getReceiptList()
  },
  methods: {
    addReceiptForm() {
      this.addbox = true
    },
    addReceiptBatch() {
      this.batchDialog = true
    },
    editReceipt({ row }) {
      this.addbox = true
      // 使用 this.$nextTick 来确保在 DOM 更新完成后再访问 $refs,否则
      this.$nextTick(() => {
        this.$refs.createReceipt.dialogType = 'edit'
        this.$refs.createReceipt.getReceipt(row.id)
      })
    },
    searchReceipt() {
      this.getReceiptList()
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val
    },
    handleCurrentChange(val) {
      this.queryParam.pageNum = val
      this.getReceiptList()
    },
    getReceiptList() {
      const queryForm = this.$parent.queryForm
      for (const key in queryForm) {
        this.$set(this.queryParam, key, queryForm[key])
      }
      getReceiptList(this.queryParam).then(response => {
        this.receiptList = response.data.records
        this.total = response.data.total
      })
    },
    handleDelete({ row }) {
      this.$confirm('确认删除？', { type: 'warning' }).then(_ => {
        delReceipt(row.id).then(response => {
          if (response.code === 200) {
            this.handleCurrentChange(1)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      })
    },
    showReceipt({ row }) {
      getReceiptImg(row.id).then(response => {
        if (response.code === 200) {
          this.receiptImage = 'data:image/png;base64,' + response.data
          this.dialogVisible = true
        }
      })
    },
    createReceiptBatch() {
      createRecepitBatch(this.rooms).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '批量生成收据完成',
            type: 'success'
          })
          this.batchDialog = false
          this.getReceiptList()
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？', { type: 'warning' }).then(_ => {
        done()
        this.batchDialog = false
      }).catch(_ => {})
    },
    cancel() {
      this.batchDialog = false
    }
  }
}
</script>
