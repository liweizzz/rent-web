<template>
  <div>
    <div>
      <el-button type="primary" icon="el-icon-search" @click="searchReceipt">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addReceiptForm">创建收据</el-button>
    </div>
    <div>
      <el-table :data="receiptList" border fit highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="50px" sortable>
        </el-table-column>
        <el-table-column align="center" label="租户ID" prop="userId">
          <template slot-scope="scope">
            {{ scope.row.userId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="租户姓名" prop="tenantName">
          <template slot-scope="scope">
            {{ scope.row.tenantName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="房间号" prop="roomNum">
          <template slot-scope="scope">
            {{ scope.row.roomNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="房租起始日期" prop="rentStartDay">
          <template slot-scope="scope">
            {{ scope.row.rentStartDay }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="房租到期日期" prop="rentEndDay">
          <template slot-scope="scope">
            {{ scope.row.rentEndDay }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="房租金额" prop="rentMoney">
          <template slot-scope="scope">
            {{ scope.row.rentMoney }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="期初电表度数" prop="lastElecNum">
          <template slot-scope="scope">
            {{ scope.row.lastElecNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="期末电表度数" prop="curElecNum">
          <template slot-scope="scope">
            {{ scope.row.curElecNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="电费单价" prop="elecPrice">
          <template slot-scope="scope">
            {{ scope.row.elecPrice }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="电费" prop="elecMoney">
          <template slot-scope="scope">
            {{ scope.row.elecMoney }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="水费" prop="waterMoney">
          <template slot-scope="scope">
            {{ scope.row.waterMoney }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="网费" prop="internetMoney">
          <template slot-scope="scope">
            {{ scope.row.internetMoney }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收款人" prop="signature">
          <template slot-scope="scope">
            {{ scope.row.signature }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" prop="note">
          <template slot-scope="scope">
            {{ scope.row.note }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="createReceipt(scope)">
              {{ $t('permission.createReceipt') }}
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
  </div>
</template>

<script>
import { createReceipt, delReceipt, getReceiptList } from '@/api/receipt'
import store from '@/store'

export default {
  data() {
    return {
      receiptList: null,
      queryParam: {
        userId: store.getters.userId,
        pageNum: 1,
        pageSize: 10
      },
      total: 1
    }
  },
  created() {
    this.getReceiptList(this.queryParam)
  },
  methods: {
    addReceiptForm() {
      this.$parent.addbox = true
    },
    createReceipt($index) {
      createReceipt($index.row).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '收据成功生成！',
            type: 'success'
          })
        }
      })
    },
    searchReceipt() {
      this.getReceiptList(this.queryParam)
    },
    showLandLordForm() {
      this.$parent.addbox = true
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val
    },
    handleCurrentChange(val) {
      this.queryParam.pageNum = val
      this.getReceiptList(this.queryParam)
    },
    getReceiptList(val) {
      const queryForm = this.$parent.queryForm
      for (const key in queryForm) {
        this.$set(this.queryParam, key, queryForm[key])
      }
      getReceiptList(val).then(response => {
        this.receiptList = response.data.records
        this.total = response.data.total
      })
    },
    handleDelete({ row }) {
      delReceipt(row.id).then(response => {
        if (response.code === 200) {
          this.getReceiptList(this.queryParam)
          alert('删除成功')
        }
      })
    }
  }
}
</script>
