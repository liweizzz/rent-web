<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" :title="dialogType==='edit'?'编辑房间':'新增房间'">
    <el-form :model="roomForm" label-position="left">
      <el-row v-for="(row, index) in rows" :key="index">
        <el-col :span="4">
          <el-form-item label="房间号" prop="roomNum">
            <el-input v-model="row.roomNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="备注" prop="note">
            <el-input v-model="row.note"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align:right;">
      <el-button type="danger" @click="cancel">
        {{ $t('permission.cancel') }}
      </el-button>
      <el-button type="primary" @click="sumbitRoomForm(roomForm)">
        {{ $t('permission.confirm') }}
      </el-button>
      <el-button @click="addRow">添加表格</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { saveOrUpdateRoom } from '@/api/room'

export default {
  name: 'AddRoom',
  props: {
    apartmentId: {
      type: String,
      required: true
    },
    apartmentName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: true,
      dialogType: 'new',
      roomForm: {},
      rows: [{}]
    }
  },
  methods: {
    addRow() {
      this.rows.push({})
    },
    cancel() {
      this.$parent.$parent.$parent.addRoomBox = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.$parent.$parent.$parent.addRoomBox = false
        }).catch(_ => {})
    },
    sumbitRoomForm(formName) {
      this.$set(this.roomForm, 'apartmentId', this.$props.apartmentId)
      this.$set(this.roomForm, 'apartmentName', this.$props.apartmentName)
      this.$set(this.roomForm, 'roomBaseInfoList', this.rows)
      saveOrUpdateRoom(this.roomForm).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.$parent.$parent.$parent.addRoomBox = false
        }
      })
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //   } else {
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style scoped>
  .el-form-item {
    margin-right: 20px;
  }
</style>
