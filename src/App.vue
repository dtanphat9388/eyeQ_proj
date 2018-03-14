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
    </v-navigation-drawer>


    <!-- Toolbar -->
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <div>Hello Guest</div>
    </v-toolbar>


    <!-- Content -->
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <img src="/public/v.png" alt="Vuetify.js" class="mb-5" />
            <blockquote>
              &#8220;First, solve the problem. Then, write the code.&#8221;
              <footer>
                <small>
                  <em>&mdash;John Johnson</em>
                </small>
              </footer>
            </blockquote>
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
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Dashboard' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: ''
      }
    }
  }
</script>


<style lang="stylus" scoped>
  #dashboardTitle
    height 48px
    text-align center
    line-height 48px
    font-size 40px
    vertical-align middle
    background-color #DB4C3F

  .toolbar
    background-color #DB4C3F
</style>

