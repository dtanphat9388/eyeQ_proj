<template>
  <div class="compDanhSachUser">
    <div class="title">Danh sách user</div>
    <NavForm>
        <!-- header -->
        <div slot="header">
            Danh sách user đã đăng ký
        </div>

        <!-- body -->
        <div slot="body">
          <div class="rows">
            hiển thị: 
            <select class="pr-0" v-model="rowsPerPage">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
          

          <table  style="width: 100%">
            <thead>
              <tr>
                <th>Hình chụp</th>
                <th>Tên</th>
                <th>Số điện thoại</th>
                <th>Thời gian</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(user, key) of usersPerPage" :key="key">
                <!-- image -->
                <td><img :src="'./upload/' + user.avatar" alt="k co hinh"/></td>
                <!-- ho ten -->
                <td>
                  <div v-if="userIndex === key">
                    <div v-if="action == 'update'">
                      <input type="text" :value="user.hoten" v-on:input="saveHoten" >
                    </div>
                    <div v-else>{{user.hoten}}</div>
                  </div>
                  <div v-else>{{user.hoten}}</div>
                </td>
                <!-- sdt -->
                <td>
                  <div v-if="userIndex === key">
                    <div v-if="action == 'update'">
                      <input type="text" :value="user.sdt" v-on:input="saveSdt" >
                    </div>
                    <div v-else>{{user.sdt}}</div>
                  </div>
                  <div v-else>{{user.sdt}}</div>
                </td>
                <!-- thoi gian -->
                <td>{{timeInfo(user.createdAt)}}</td>
                <!-- hanh dong -->
                <td>
                  <div v-if="userIndex !== key" class="action">
                    <button @click="showConformBtn(key, 'update')">Update</button>
                    <button class="danger" @click="showConformBtn(key, 'delete')">Delete</button>
                  </div>
                  <div v-else class="conform">
                    <button class="danger" @click="handleConform">Confirm</button>
                    <button @click="hideConformBtn">Cancel</button>
                  </div>
                  
                </td>
              </tr>
            </tbody>

            <tfoot></tfoot>
          </table>
        </div>

        <!-- footer -->
        <div slot="footer">
            <span>Showing {{fromUser}} to {{toUser}} of {{users.length}} </span>
            <span>
              <button 
                v-for="page of pages" 
                :key="page"
                @click="setCurrentPage(page)">
                {{page}}
              </button>
            </span>
            
        </div>
    </NavForm>
  </div>
</template>



<script>
import axios from '../config/io.js'
import NavForm from './NavForm.vue'
export default {
  components: {NavForm},

  data: () => ({
    userIndex: false,
    action: '',
    newHoten: null,
    newSdt: null,
    users: [],

    rowsPerPage: 10, // default
    currentPage: 1,
  }),

  computed: {
    pages(){
      let eventPage = this.users.length % this.rowsPerPage
      let pages = parseInt(this.users.length / this.rowsPerPage)
      if (eventPage == 0) {
        return pages
      } else {
        return pages + 1
      } 
    },

    fromUser(){ return (this.currentPage - 1) * this.rowsPerPage + 1 },
    toUser(){ 
      let to =  this.currentPage * this.rowsPerPage
      if ( to > this.users.length ) return this.users.length;
      return to
    },
    usersPerPage(){
      let start = (this.currentPage - 1) * this.rowsPerPage 
      let end = this.currentPage * this.rowsPerPage

      let users = []
      while (start <= end) {
        let user = this.users[start]
        if (user == undefined) return users
        users.push(user)
        start += 1
      }
      return users
    }
  },

  methods: {
    timeInfo(date){
      let elapsedByMiliSeconds = Date.now() - Date.parse(date) // miliseconds
      let elapsedBySeconds = parseInt(elapsedByMiliSeconds / 1000)
      let elapsedByMinutes = parseInt(elapsedBySeconds / 60)
      let elapsedByHours = parseInt(elapsedByMinutes / 60)
      let elepsedByDays = parseInt(elapsedByHours / 24)

      let result;
      if (elepsedByDays > 0) {
        result = `${elepsedByDays} days`
      } 
      else if (elapsedByHours > 0) {
        result = `${elapsedByHours} hours`
      } 
      else if (elapsedByMinutes > 0) {
        result = `${elapsedByMinutes} minute`
      } 
      else if (elapsedBySeconds > 0) {
        result = `${elapsedBySeconds} sec`
      } 
      else {
        result = "just now"
      } 

      return result + " ago"
    },

    showConformBtn(key, action){
      this.userIndex = key
      this.action = action
    },

    hideConformBtn(){
      this.userIndex = false
      this.action = ''
      this.newSdt = null
      this.newSdt = null
    },

    handleConform(){
      if (this.action == 'update')  this.updateUser();
      else if (this.action == 'delete') this.deleteUser();
    },

    updateUser(){
      let data = {
          _id: this.users[this.userIndex]._id, 
          newValue: {
            hoten: this.newHoten,
            sdt: this.newSdt
          }
        }

        axios.post('/updateUser', data)
          .then(res => res.data)
          .then(result => {
            if (result) this.updateScreen()
          })
          .then(() => this.hideConformBtn())
    },

    deleteUser(){
      let data = {
        _id: this.users[this.userIndex]._id
      }
      axios.post('/deleteUser', data)
        .then( res => res.data )
        .then( success => { if (success) this.removeUserInSource() })
        .then( () => this.hideConformBtn())
    },

    saveHoten(e){
      this.newHoten = e.target.value
    },
    saveSdt(e){
      this.newSdt = e.target.value
    },

    updateScreen(){
      if (this.newHoten) this.users[this.userIndex].hoten = this.newHoten;
      if (this.newSdt) this.users[this.userIndex].sdt = this.newSdt;
    },

    removeUserInSource(){
      this.users.splice(this.userIndex, 1)
    },

    setCurrentPage(page){
      this.currentPage = page
    }
  },


  // hooks
  created(){
    axios.post('/getUsers').then(
      res => this.users = res.data
    )
  }
}
</script>


<style lang="stylus" scoped>
    .compDanhSachUser
      width 100%
      .title
        font-size 30px !important
        font-weight bolder
        padding 20px 0px

      select
        height 30px
        width 40px
        border 0.5px solid rgba(0,0,0, 0.5)
        border-radius 5px
        padding 5px

    tbody
        button
          height 40px
          width 64px
          padding 10px
          color white
          background-color gray
          &.danger
            background-color red
        .conform
          button
            width 74px



    .compNavForm
      .body
        .rows
          text-align left
          font-weight bolder
          margin 10px 0px 
      .footer
        div
          position relative
          width 100%
          span:nth-child(2)
            position absolute
            right 10px
            vertical-align middle
          button
            width 30px
            height 30px
            color white
            background-color #387bb5
            font-weight bolder
            border-radius 5px
            margin-left 5px
            

        


</style>
