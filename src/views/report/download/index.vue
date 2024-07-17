<template>
  <div class="tab-container">
    <el-form :model="queryForm" :inline="true">
      <el-form-item label="公寓" prop="apartmentId">
        <el-select v-model="queryForm.apartmentId" placeholder="请选择">
          <el-option v-for="item in apartmentOption" :key="item.key" default-first-option="true" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="月份" prop="month">
        <el-date-picker v-model="queryForm.month" type="month" value-format="yyyy-MM" placeholder="选择月" />
      </el-form-item>
      <el-button type="primary" @click="downloadReport">下载报表</el-button>
      <el-button type="primary" @click="sendReport">发送报表</el-button>
    </el-form>
  </div>
</template>

<script>

import store from '@/store'
import { downloadReport } from '@/api/receipt'

export default {
  name: 'Report',
  data() {
    return {
      queryForm: {
        month: new Date().toISOString().substr(0, 7) // Set default value to current month
      },
      apartmentOption: store.getters.apartments
    }
  },
  created() {
    this.queryForm.apartmentId = this.apartmentOption[0].key
  },
  methods: {
    downloadReport() {
      downloadReport(this.queryForm).then(response => {
        const { headers, data } = response
        const contentDisposition = headers['content-disposition']
        const fileName = contentDisposition ? (contentDisposition.match(/filename=["']?([^'"\s]+)["']?/) || [])[1] : 'downloaded_file.xlsx'

        // const url = window.URL.createObjectURL(new Blob(JSON.parse(data)), { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const url = window.URL.createObjectURL(data)
        const link = document.createElement('a')

        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        window.URL.revokeObjectURL(url)

        this.$message({
          message: '下载成功',
          type: 'success'
        })
      }).catch(error => {
        const reader = new FileReader()
        reader.readAsText(error.response.data, 'utf-8')
        reader.onload = () => {
          const errorMsg = JSON.parse(reader.result)
          this.$message({
            message: errorMsg.message,
            type: 'error'
          })
        }
      })
    },
    sendReport() {
      alert('敬请期待~')
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 20px;
  }
</style>
