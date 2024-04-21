<template>
  <el-dialog :visible.sync="dialogVisible" :center="true" :before-close="handleClose" :title="dialogType==='edit'?'编辑角色':'新增角色'">
    <el-container>
      <el-aside>
        <el-input v-model="roleId" v-show="false"></el-input>
        角色名称：<el-input v-model="roleName"></el-input>
      </el-aside>
      <el-main>
        <el-tree :data="treeData" ref="privilegeTree" show-checkbox node-key="id" :props="defaultProps"/>
      </el-main>
    </el-container>
    <div slot="footer">
      <el-button type="danger" @click="cancel">
        {{ $t('permission.cancel') }}
      </el-button>
      <el-button type="primary" @click="submitRoleForm">
        {{ $t('permission.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addOrUpdate, getAllPrivileges, getRole } from '@/api/role'

export default {
  name: 'AddRole',
  data() {
    return {
      roleId: null,
      dialogType: 'new',
      dialogVisible: true,
      roleName: null,
      treeData: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  created() {
    getAllPrivileges().then(response => {
      if (response.code === 200) {
        this.treeData = response.data
      }
    })
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
    submitRoleForm() {
      const params = {}
      params.id = this.roleId
      params.roleName = this.roleName
      params.privilegeIdList = this.$refs.privilegeTree.getCheckedKeys()
      addOrUpdate(params).then(response => {
        if (response.code === 200) {
          this.$message({ message: '成功', type: 'success' })
          this.$parent.addbox = false
          this.$parent.getRoleList()
        }
      })
    },
    editRole(id) {
      getRole(id).then(response => {
        if (response.code === 200) {
          this.roleId = response.data.id
          this.roleName = response.data.roleName
          this.$refs.privilegeTree.setCheckedKeys(response.data.privilegeIdList)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
