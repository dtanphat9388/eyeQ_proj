<template>
    <div class="compDangKyUser">
        <img id='Test' src="" alt="">
        <NavForm class="camera">
            <template slot="header">
                Camera chụp hình
            </template>
            <template slot="body">
                <video id="video" width="320" height="240" autoplay></video>
            </template>
            <template slot="footer">
                <button @click="takepicture">Chụp Hình</button>
            </template>
        </NavForm>

        <NavForm class="form">
            <template slot="header">
                Thêm thông tin khách hàng
            </template>
            <template slot="body">
                <div class="submitForm">
                    <div>
                        <canvas id="canvas" width="150" height="120"></canvas>
                    </div>
                    <div class="userInput">
                        <div>
                            <label for="hoten">Họ tên: </label>
                            <input type="text" id="hoten" v-model="userInfo.hoten" placeholder="Nhập họ tên ...">
                        </div>
                        <div>
                            <label for="sdt">Số điện thoại: </label>
                            <input type="text" id="sdt" v-model="userInfo.sdt" placeholder="Nhập số điện thoại ...">
                        </div>
                    </div>
                </div>
            </template>
            <template slot="footer">
                <button @click="submit_DangKyUser">Đăng ký</button>
            </template>
        </NavForm>
    </div>
</template>

<script>
import axios from '../config/io.js'
import NavForm from './NavForm.vue'

export default {
    data: () => ({
        userInfo: {
            avatar: null,
            hoten: '',
            sdt: ''
        }
    }),

    components: {NavForm},

    methods: {

        submit_DangKyUser(){

            let formData = new FormData()
            formData.append("hoten", this.userInfo.hoten)
            formData.append("sdt", this.userInfo.sdt)
            formData.append("avatar", this.userInfo.avatar, `avatar_${this.userInfo.sdt}.jpeg`)

            axios.post('/dangky', formData).then(data => console.log(data))
        },

        takepicture() {
            var video = document.getElementById('video');
            var canvas = document.getElementById('canvas');
            let width = canvas.clientWidth
            let height = canvas.clientHeight

            var context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, width, height);
            canvas.toBlob(this.savePicture, 'image/png', 1)
            // let data = canvas.toDataURL()
            // this.savePicture(data)
        },

        savePicture(data){
            this.userInfo.avatar = data
        }

    },
  

    //hooks
    mounted(){
        // [get laptop camera]
        var video = document.getElementById('video');
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                video.src = window.URL.createObjectURL(stream);
                video.play();
            });
        }
    }
}
</script>

<style lang="stylus" scoped>

    .compDangKyUser
        display flex
        justify-content space-between
        .compNavForm
            flex  0 0 49%
            align-self flex-start
            button
                color white
                font-weight bold
                border-radius 2px
                height 50px
                padding 10px

            &.camera    
                button
                    width 100%
                    background-color #18a55b

            &.form
                position relative
                button
                    position absolute
                    right 10px
                    background-color #408eba
                    text-align right
                .body
                    .submitForm
                        text-align left
                        .userInput
                            margin-left 10px
                        > div
                            display inline-block
                            vertical-align middle
                            text-align center  
                            > div
                                margin-top  10px
                                text-align right
                            label
                                text-align left
                            input
                                width 200px
                                padding 5px
                                border 1px solid gray
</style>