<template>
  <div>
    <div>
      <el-button type="primary" icon="el-icon-search" @click="searchApartment">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addApartmentForm">增加</el-button>
    </div>
    <div>
      <el-table :data="apartmentList" border fit highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="50" sortable />
        <el-table-column align="center" label="公寓ID" prop="apartmentId">
          <template slot-scope="scope">
            {{ scope.row.apartmentId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="公寓名称" prop="apartmentName">
          <template slot-scope="scope">
            {{ scope.row.apartmentName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="公寓地址" prop="address">
          <template slot-scope="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
        <el-table-column width="400px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="addRoom(scope)">
              {{ $t('permission.addRoom') }}
            </el-button>
            <el-button type="primary" icon="el-icon-s-grid" size="small" @click="listRoom(scope)">
              {{ $t('permission.listRoom') }}
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="handleDelete(scope)">
              {{ $t('permission.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <addApartment v-if="addApartmentBox" />
    <add-room v-if="addRoomBox" :apartment-id="apartmentId" :apartment-name="apartmentName" />
    <room-list v-if="roomListBox" :apartment-id="apartmentId" />
  </div>
</template>

<script>
import { delApartment, listApartmentByUserId } from '@/api/apartment'
import addRoom from '@/views/apartment/components/addRoom.vue'
import store from '@/store'
import roomList from '@/views/apartment/components/roomList.vue'
import addApartment from '@/views/apartment/components/addApartment.vue'

export default {
  components: { addApartment, roomList, addRoom },
  data() {
    return {
      apartmentList: null,
      addApartmentBox: false,
      addRoomBox: false,
      roomListBox: false,
      apartmentId: null,
      apartmentName: null,
      param: {
        'userId': store.getters.userId
      }
    }
  },
  created() {
    this.getApartmentList()
  },
  methods: {
    addRoom({ row }) {
      this.apartmentId = row.apartmentId
      this.apartmentName = row.apartmentName
      this.addRoomBox = true
    },
    addApartmentForm() {
      this.addApartmentBox = true
    },
    searchApartment() {
      this.getApartmentList()
    },
    getApartmentList() {
      listApartmentByUserId(this.param).then(response => {
        this.apartmentList = response.data
      })
    },
    handleDelete({ row }) {
      this.$confirm('确认删除？', { type: 'warning' }).then(_ => {
        delApartment(row.id).then(response => {
          if (response.code === 200) {
            this.getApartmentList()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      })
    },
    listRoom({ row }) {
      this.apartmentId = row.apartmentId
      this.roomListBox = true
    }
  }
}
</script>
