<template>
  <v-app>

    <!-- Navigation bar -->
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app>
      <div id="dashboardTitle">DASHBOARD</div>
      <ul id="nav">
        <li>Main Navigation</li>
        <ul >
          <li 
            v-for="(value, key) in navLists" 
            :key="key" 
            :class="{active: value.active}" 
            @click.stop="setActive(key)">
            <img :src="value.img" alt="" />
            <span>{{value.title}}</span>
          </li>  
        </ul>  
      </ul>
    </v-navigation-drawer>


    <!-- Toolbar -->
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" v-text="title"></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div>Hello Guest</div>
    </v-toolbar>

    

    <!-- Content -->
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-left>
            <router-view></router-view>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>


    <!-- Footer -->
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
    
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        title: 'eyeQ_project',
        // handle active navigation
        currentActive: null,
        navLists: [
          {img: '', title: 'Danh sách User', route: '/danh_sach_user', active: false},
          {img: '', title: 'Chụp hình đăng ký', route: '/dang_ky_user', active: false},
        ],



        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Dashboard' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false
      }
    },

    methods: {
      setActive(key){
        if (this.currentActive !== null) {
          this.navLists[this.currentActive].active = false
        }
        this.navLists[key].active = true
        this.currentActive = key
        this.$router.push(this.navLists[key].route)
      }
    },

  }
</script>


<style lang="stylus" scoped>
  .navigation-drawer
    background-color #242D32

  #dashboardTitle
    height 64px
    text-align center
    line-height 64px
    font-size 40px
    vertical-align middle
    background-color #DB4C3F

  .toolbar
    background-color #DB4C3F

  ul#nav 
    font-weight bolder
    & li
      padding-left 20px
    & > li
      font-size: 16px
      height 36px
      line-height 36px
      color #4D666B
    & > ul
      color #B5C3C8
      width 100%
      user-select none
      & > li
        height 48px
        line-height 48px
        font-size 18px
      & > li.active
        border-left 4px solid #DB4C3F
        color white 
         

</style>

