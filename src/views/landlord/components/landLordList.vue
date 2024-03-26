<template>
  <div>
    <div>
      <el-button type="primary" icon="el-icon-search" @click="searchLandLord">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="showLandLordForm">增加</el-button>
    </div>
    <div>
      <el-table :data="landLordlist" border fit highlight-current-row style="width: 100%" >
        <el-table-column align="center" width="60px" label="ID" prop="id">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="房东ID" prop="userId">
          <template slot-scope="scope">
            {{ scope.row.userId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="房东姓名" prop="userName">
          <template slot-scope="scope">
            {{ scope.row.userName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="身份证" prop="idCard">
          <template slot-scope="scope">
            {{ scope.row.idCard }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="电话" prop="phone">
          <template slot-scope="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="省份" prop="province">
          <template slot-scope="scope">
            {{ scope.row.province }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="城市" prop="city">
          <template slot-scope="scope">
            {{ scope.row.city }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="详细地址" prop="address">
          <template slot-scope="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" prop="status">
          <template slot-scope="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">
              {{ $t('permission.editPermission') }}
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope)">
              {{ $t('permission.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageSize"
        @pagination="getLandLordList"></el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchList, delLandlord } from '@/api/article'

export default {
  data() {
    return {
      landLordlist: null,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      total: 1
    }
  },
  created() {
    this.getLandLordList(this.listQuery)
  },
  methods: {
    searchLandLord() {
      this.getLandLordList(this.listQuery)
    },
    showLandLordForm() {
      this.$parent.addbox = true
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getLandLordList(this.listQuery)
    },
    getLandLordList(val) {
      fetchList(val).then(response => {
        this.landLordlist = response.data.records
        this.landLordlist.forEach(item => {
          if (item.status === '0') {
            item.status = '正常'
          }
          if (item.status === '1') {
            item.status = '锁定'
          }
        })
        this.total = response.data.total
      })
    },
    handleDelete({ $index, row }) {
      delLandlord(row.id).then(response => {
        if (response.code === 200) {
          this.getLandLordList(this.listQuery)
          alert('删除成功')
        }
      })
    }
  }
}
</script>
