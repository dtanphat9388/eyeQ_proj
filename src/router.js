import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter)

import Home from './components/Home.vue'
import dsUser from './components/DanhSachUser.vue'
import DangKyUser from './components/DangKyUser.vue'


export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/', name: 'home', component: Home
        },
        {
            path: '/danh_sach_user', 
            name: 'listUser',
            component: dsUser
        },
        {
            path: '/dang_ky_user',
            name: 'dangKyUser',
            component: DangKyUser
        }
    ]
})