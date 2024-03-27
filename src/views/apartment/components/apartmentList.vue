<template>
  <div>
    <div>
      <el-button type="primary" icon="el-icon-search" @click="searchApartment">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addApartmentForm">增加</el-button>
    </div>
    <div>
      <el-table :data="apartmentList" border fit highlight-current-row style="width: 100%" >
        <el-table-column type="index" label="序号" align="center" width="50" sortable>
        </el-table-column>
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
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="addRoom(scope)">
              {{ $t('permission.addRoom') }}
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope)">
              {{ $t('permission.delete') }}
            </el-button>
            <add-room v-if="addRoomBox" :apartmentId = 'scope.row.apartmentId' :apartmentName = 'scope.row.apartmentName'></add-room>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { delApartment, listApartmentByUserId } from '@/api/apartment'
import addRoom from '@/views/apartment/components/addRoom.vue'
import store from '@/store'

export default {
  components: { addRoom },
  data() {
    return {
      apartmentList: null,
      addRoomBox: false,
      param: {
        'userId': store.getters.userId
      }
    }
  },
  created() {
    this.getApartmentList()
  },
  methods: {
    addRoom() {
      this.addRoomBox = true
    },
    addApartmentForm() {
      this.$parent.addbox = true
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
      delApartment(row.id).then(response => {
        if (response.code === 200) {
          this.getApartmentList()
          alert('删除成功')
        }
      })
    }
  }
}
</script>
