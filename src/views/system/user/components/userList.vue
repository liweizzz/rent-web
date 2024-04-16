<template>
  <div>
    <div>
      <el-button type="primary" icon="el-icon-search" @click="searchUser">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="showUserForm">增加</el-button>
    </div>
    <div>
      <el-table :data="userList" border fit highlight-current-row style="width: 100%" >
        <el-table-column type="index" label="序号" align="center" width="50px" sortable>
        </el-table-column>
        <el-table-column align="center" label="用户ID" prop="userId">
          <template slot-scope="scope">
            {{ scope.row.userId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户姓名" prop="userName">
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
        <el-table-column align="center" width="170px" label="操作">
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
        :page.sync="queryParam.pageNum"
        :limit.sync="queryParam.pageSize"
        @pagination="getUserList"></el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchList, delUser } from '@/api/user'

export default {
  data() {
    return {
      userList: null,
      queryParam: {
        pageNum: 1,
        pageSize: 10
      },
      total: 1
    }
  },
  created() {
    this.getUserList(this.queryParam)
  },
  methods: {
    searchUser() {
      const queryForm = this.$parent.queryForm
      for (const key in queryForm) {
        this.$set(this.queryParam, key, queryForm[key])
      }
      this.getUserList(this.queryParam)
    },
    showUserForm() {
      this.$parent.addbox = true
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val
    },
    handleCurrentChange(val) {
      this.queryParam.pageNum = val
      this.getUserList(this.queryParam)
    },
    getUserList(val) {
      fetchList(val).then(response => {
        this.userList = response.data.records
        this.userList.forEach(item => {
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
    handleDelete({ row }) {
      delUser(row.id).then(response => {
        if (response.code === 200) {
          this.getuserList(this.listQuery)
          alert('删除成功')
        }
      })
    }
  }
}
</script>
