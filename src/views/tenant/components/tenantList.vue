<template>
  <div>
    <div>
      <el-button type="primary" icon="el-icon-search" @click="searchTenant">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addTenantForm">增加</el-button>
    </div>
    <div>
      <el-table :data="tenantList" border height="600px" fit highlight-current-row style="width:100%;">
        <el-table-column type="index" label="序号" align="center" sortable />
        <el-table-column align="center" width="100px" label="租户姓名" prop="userName">
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
        <el-table-column width="300px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="addRentDetailInfo(scope)">
              {{ $t('permission.rentDetailInfo') }}
            </el-button>
            <el-button type="primary" icon="el-icon-edit" size="small" @click="editTenant(scope)">
              {{ $t('permission.edit') }}
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="handleDelete(scope)">
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
        @pagination="getTenantList"
      />
    </div>
    <addTenantRentInfo v-if="rentDetailInfo" :tenant-id="tenantId" :apartment-id="apartmentId" />
    <addTenant v-if="addbox" ref="addTenant" :apartment-id="apartmentId" />
  </div>
</template>

<script>
import { delTenant, getTenantList } from '@/api/tenant'
import addTenantRentInfo from '@/views/tenant/components/addTenantRentInfo.vue'
import addTenant from '@/views/tenant/components/addTenant.vue'

export default {
  name: 'TenantList',
  components: { addTenant, addTenantRentInfo },
  props: {
    apartmentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tenantList: null,
      rentDetailInfo: false,
      tenantId: null,
      addbox: false,
      queryParam: {
        pageNum: 1,
        pageSize: 10
      },
      total: 1
    }
  },
  created() {
    this.getTenantList()
  },
  methods: {
    searchTenant() {
      this.getTenantList()
    },
    addTenantForm() {
      this.addbox = true
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val
    },
    handleCurrentChange(val) {
      this.queryParam.pageNum = val
      this.getTenantList()
    },
    getTenantList() {
      const queryForm = this.$parent.queryForm
      for (const key in queryForm) {
        this.$set(this.queryParam, key, queryForm[key])
      }
      getTenantList(this.queryParam).then(response => {
        this.tenantList = response.data.records
        this.tenantList.forEach(item => {
          if (item.status === '0') {
            item.status = '在租'
          }
          if (item.status === '1') {
            item.status = '退租'
          }
        })
        this.total = response.data.total
      })
    },
    handleDelete({ row }) {
      this.$confirm('确认删除？', { type: 'warning' }).then(_ => {
        delTenant(row.id).then(response => {
          if (response.code === 200) {
            this.handleCurrentChange(1)
            alert('删除成功')
          }
        })
      }).catch(_ => {})
    },
    addRentDetailInfo({ row }) {
      this.apartmentId = row.apartmentId
      this.tenantId = row.tenantId
      this.rentDetailInfo = true
    },
    editTenant({ row }) {
      this.addbox = true
      // 使用 this.$nextTick 来确保在 DOM 更新完成后再访问 $refs,否则
      this.$nextTick(() => {
        this.$refs.addTenant.dialogType = 'edit'
        this.$refs.addTenant.getTenantInfo(row.id)
      })
    }
  }
}
</script>
