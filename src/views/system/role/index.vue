<template>
  <div class="tab-container">
    <keep-alive>
      <roleList v-if="roleTab" />
    </keep-alive>
  </div>
</template>

<script>
import roleList from './components/roleList.vue'

export default {
  name: 'Role',
  components: { roleList },
  data() {
    return {
      roleTab: true
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 20px;
  }
</style>
