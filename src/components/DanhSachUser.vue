<template>
  <div class="compDanhSachUser">
    <NavForm>
        <!-- header -->
        <div slot="header">
            Danh sách user đã đăng ký
        </div>

        <!-- body -->
        <div slot="body">
          hiển thị: 
          <select>
            <option value="">10</option>
            <option value="">20</option>
            <option value="">30</option>
          </select>

          <table  style="width: 900px">
            <thead >
              <tr>
                <th>Hình chụp</th>
                <th>Tên</th>
                <th>Số điện thoại</th>
                <th>Thời gian</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, key) of users" :key="key">
                <td><img :src="'/upload/' + user.avatar" alt="k co hinh"/></td>
                <td>
                  <div v-if="userIndex === key">
                    <div v-if="action == 'update'">
                      <input type="text" :value="user.hoten" v-on:input="saveValue" >
                    </div>
                    <div v-else>{{user.hoten}}</div>
                  </div>
                  <div v-else>{{user.hoten}}</div>
                </td>
                <td>{{user.sdt}}</td>
                <td>{{timeInfo(user.createdAt)}}</td>
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
        <div slot="fppter"></div>
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
    newHoten: undefined,
    users: []
  }),

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
    },

    handleConform(){
      if (this.action == 'update') {
        let data = {
          _id: this.users[this.userIndex], 
          newValue: {
            hoten: this.newHoten
          }
        }

        axios.post('/updateUser', data)
          .then(res => res.data)
          .then(result => console.log(result))
          .then(() => this.hideConformBtn())
      }
      else if (action == 'delete'){}

      
    },

    saveValue(e){
      this.newHoten = e.target.value
    }
  },


  // hooks
  mounted(){
    axios.post('/getUsers').then(
      res => this.users = res.data
    )
  }
}
</script>



<style lang="stylus" scoped>
    .compDanhSachUser
      width 100%

    .body
      select
        height 50px
        width 40px

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

</style>
