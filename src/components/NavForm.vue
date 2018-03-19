<template>
  <div class="compNavForm">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot name="body"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
  .compNavForm
      width: 100%
      border-top: 3px solid #18A55B
      border-radius: 5px
      background-color white

      .header
          font-size 30px
          font-weight bolder

      .body
          border-top 1px solid #80808024 
          border-bottom 1px solid #80808024
          text-align center
          padding 10px
        
      .footer
          height 70px
          padding 10px
          background-color white
</style>
