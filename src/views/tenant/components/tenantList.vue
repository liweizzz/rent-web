<template>
  <div>
    <div>
      <el-button type="primary" icon="el-icon-search" @click="searchTenant">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="showTenantForm">增加</el-button>
    </div>
    <div>
      <el-table :data="tenantList" border fit highlight-current-row style="width: 100%" >
        <el-table-column align="center" width="60px" label="ID" prop="id">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="租户ID" prop="tenantId">
          <template slot-scope="scope">
            {{ scope.row.tenantId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="租户姓名" prop="userName">
          <template slot-scope="scope">
            {{ scope.row.tenantName }}
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
        <el-table-column align="center" label="户籍地址" prop="address">
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
            <el-button type="primary" icon = "el-icon-plus" size="small" @click="addRentInfo(scope.row.apartmentId, scope.row.tenantId)">
              {{ $t('permission.addRentInfo') }}
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
      @pagination="getTenantList"></el-pagination>
      <addTenantRentInfo v-if="rentDetailInfo" :tenantId = 'tenantId' :apartmentId = 'apartmentId'></addTenantRentInfo>
    </div>
  </div>
</template>

<script>
import { delTenant, getTenantList } from '@/api/tenant'
import addTenantRentInfo from '@/views/tenant/components/addTenantRentInfo.vue'

export default {
  components: { addTenantRentInfo },
  data() {
    return {
      tenantList: null,
      rentDetailInfo: false,
      tenantId: null,
      apartmentId: null,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      total: 1
    }
  },
  created() {
    this.getTenantList(this.listQuery)
  },
  methods: {
    searchTenant() {
      this.getTenantList(this.listQuery)
    },
    showTenantForm() {
      this.$parent.addbox = true
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getTenantList(this.listQuery)
    },
    getTenantList(val) {
      getTenantList(val).then(response => {
        this.tenantList = response.data.records
        this.tenantList.forEach(item => {
          if (item.status === '0') {
            item.status = '正常'
          }
          if (item.status === '1') {
            item.status = '锁定'
          }
          if (item.status === '2') {
            item.status = '失效'
          }
        })
        this.total = response.data.total
      })
    },
    handleDelete({ $index, row }) {
      delTenant(row.id).then(response => {
        if (response.code === 200) {
          this.getTenantList(this.listQuery)
          alert('删除成功')
        }
      })
    },
    addRentInfo(apartmentId, tenantId) {
      this.apartmentId = apartmentId
      this.tenantId = tenantId
      this.rentDetailInfo = true
    }
  }
}
</script>
