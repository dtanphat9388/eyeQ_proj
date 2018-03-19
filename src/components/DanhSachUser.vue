<template>
  <div class="compDanhSachUser">
    <NavForm>
        <template slot="header">
            Danh sach user
        </template>
        <template slot="body">
            content danh sach user
        </template>
    </NavForm>
  </div>
</template>

<script>
import NavForm from './NavForm.vue'
export default {
  components: {NavForm}
}
</script>

<style lang="stylus" scoped>
    .compDanhSachUser
      width 100%
</style>
