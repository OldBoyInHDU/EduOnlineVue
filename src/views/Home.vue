<template>
    <div class="header-background">
        <img src="../assets/imgs/Web_development_Flatline_01.png"  />
        <img src="../assets/imgs/World_wide_web_Flatline_01.png"  />
        <div class="title">
            <h1>欢迎使用宁波卷烟厂制丝车间在线教育后台管理系统</h1>
        </div>
    </div>

</template>

<script>
import { fetchUserData } from '@/api'

export default {
    name: 'home',
    data() {
        return {
            userInfo: '',
        }
    },
    methods: {
        getUserData() {
            fetchUserData().then(res => {
                this.userInfo = JSON.stringify(res, null, 4)
            })
        },
    },
}
</script>

<style scoped>
.header-background {
    /*position: absolute;*/
    margin: auto;
    text-align: center;
}


.home-container {
    padding: 10px;
    padding-top: 5px;
}
.home-content {
    padding: 10px;
    border-radius: 5px;
    background: #fff;
}
</style>
