<template>
  <div>
    <el-dialog :visible.sync="roomListVisible" :before-close="handleClose" title="房间列表">
      <el-table :data="roomList" border fit height="400px" highlight-current-row style="width: 100%;">
        <el-table-column type="index" label="序号" align="center" width="50px" sortable>
        </el-table-column>
        <el-table-column align="center" label="房间号" prop="roomNum">
          <template slot-scope="scope">
            {{ scope.row.roomNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" prop="note">
          <template slot-scope="scope">
            {{ scope.row.note }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

import { listRoomFromApartment } from '@/api/room'

export default {
  name: 'RoomList',
  props: {
    apartmentId: {
      type: String
    }
  },
  data() {
    return {
      roomList: null,
      roomListVisible: true
    }
  },
  created() {
    this.listRoom()
  },
  methods: {
    listRoom() {
      const param = { 'apartmentId': this.apartmentId }
      listRoomFromApartment(param).then(response => {
        this.roomList = response.data
      })
    },
    handleClose(done) {
      this.$parent.roomListBox = false
    }
  }
}
</script>

<style scoped>
</style>
