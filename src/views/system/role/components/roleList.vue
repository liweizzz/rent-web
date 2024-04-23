<template>
  <div>
    <div>
      <el-button type="primary" icon="el-icon-plus" @click="addRoleForm">增加</el-button>
    </div>
    <div>
      <el-table :data="roleList" border fit highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="50px" sortable />
        <el-table-column align="center" label="角色名称" prop="roleName">
          <template slot-scope="scope">
            {{ scope.row.roleName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" prop="delFlag">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.delFlag" :active-value="0" :inactive-value="1" @change="handleStatusChange(scope)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="300px" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="handleEdit(scope)">
              {{ $t('permission.edit') }}
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="handleDelete(scope)">
              {{ $t('permission.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <addRole v-if="addbox" ref="addRole"/>
  </div>
</template>

<script>
import addRole from '@/views/system/role/components/addRole.vue'
import { changeStatus, deleteRole, getRoles } from '@/api/role'

export default {
  components: { addRole },
  data() {
    return {
      roleList: null,
      addbox: false
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    addRoleForm() {
      this.addbox = true
    },
    getRoleList() {
      getRoles().then(response => {
        this.roleList = response.data
      })
    },
    handleEdit({ row }) {
      this.addbox = true
      this.$nextTick(() => {
        this.$refs.addRole.dialogType = 'edit'
        this.$refs.addRole.editRole(row.id)
      })
    },
    handleStatusChange({ row }) {
      changeStatus(row.id, row.delFlag)
    },
    handleDelete({ row }) {
      this.$confirm('确认删除？', { type: 'warning' }).then(_ => {
        deleteRole(row.id).then(response => {
          if (response.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getRoleList()
          }
        })
      })
    }
  }
}
</script>
