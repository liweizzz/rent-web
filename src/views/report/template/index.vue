<template>
  <div class="tab-container">
    <el-upload
      class="upload-demo"
      action="http://localhost:8080/rent/uploadFile"
      :before-remove="beforeRemove"
      multiple
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>

export default {
  name: 'Template',
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 20px;
  }
</style>
