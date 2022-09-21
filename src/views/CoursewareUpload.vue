<template>
    <div class="home-container">
        <div class="upload-content" style="padding: 20px">
            <Upload
                :before-upload="beforeUpload"
                type="drag"
                action="http://localhost:8080/eduonline/forum/coursewareUpload/submitCoursewareInfo">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或拖拽文件至此<br>文档限制pdf格式，视频限制mp4格式(大小不超过200MB)</p>
                </div>
            </Upload>
            <div style="height: 10px">
                <div v-if="file !== null">
                    上传文件: {{ file.name }}
                    <span style="padding-left: 10px">
                            <Button type="primary" @click="upload" :loading="loadingStatus" ghost size="small">
                                {{ loadingStatus ? '上传中' : '点击上传' }}
                            </Button>
                        </span>
                </div>
            </div>
        </div>
        <div class="searchParam" style="padding: 20px">
            <Input v-model="serverFileName" placeholder="文件名称 / 服务器文件名称" style="width: 300px;" disabled/>
            <span style="padding-left: 20px">
                    <Button type="primary" @click="submit">提交</Button>
                </span>
            <!--            <div>{{ position}}</div>-->
            <!--            <div>{{ type }}</div>-->
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'coursewareUpload',
    data() {
        return {
            file: null,
            filename: '',
            loadingStatus: false,
            serverFileName: '',
        }
    },
    methods: {
        beforeUpload(file) {
            let name = file.name
            // console.log(name)
            let suffix = name.substring(name.lastIndexOf('.'))
            // console.log(suffix)
            let isNameLegal = true
            let isLs2M = true
            let isRight = true
            isNameLegal = suffix === '.pdf'
            isLs2M = file.size / 1024 / 1024 < 200
            if (!isLs2M || !isNameLegal) {
                this.loadingStatus = false
                this.$Message.error('上传的文件大小不能超过200MB 且 格式为pdf！')
                isRight = false
            }
            this.filename = file.name
            this.file = file
            // 一定要return false 不然会直接上传
            return isRight
        },
        upload() {
            let uncheckedFile = this.file
            if (uncheckedFile == null) {
                this.$Message.error('未选择文件！请先选择文件！')
                return
            }
            let isRight = this.beforeUpload(uncheckedFile)
            if (!isRight) {
                this.$Message.error('请重新上传文件')
                return
            }
            let checkedFile = uncheckedFile
            let formData = new FormData()
            formData.append('file', checkedFile)
            this.loadingStatus = true
            axios({
                method: 'post',
                url: 'forum/coursewareUpload/uploadCourseware',
                headers: {
                    'content-type': 'multipart/form-data',
                },
                data: formData,
            }).then(res => {
                // console.log('成功了')
                // console.log(res)
                this.loadingStatus = false
                this.serverFileName = this.filename + ' / ' + res.data.data
            }, err => {
                // console.log('错误了')
                // console.log(err)
                this.$Message.error('后台服务出问题，请联系技术人员')
            })
            // setTimeout(() => {
            //     this.value = this.$data.filename
            //     this.file = null
            //     this.loadingStatus = false
            //     this.$Message.success('Success')
            // }, 1500)
        },
        submit() {
            if (this.serverFileName == '' || this.serverFileName == null || this.serverFileName.length == 0) {
                this.$Message.error('课件上传未完成，请先上传课件！')
                return
            }
            let formData = new FormData()
            formData.append('position', this.position)
            formData.append('type', this.type)
            formData.append('serverFileName', this.serverFileName)
            axios({
                method: 'post',
                url: 'forum/coursewareUpload/submitCoursewareInfo',
                headers: {
                    'content-type': 'application/json',
                },
                data: formData,
            }).then(res => {
                // console.log('成功了')
                this.$Message.success('提交成功')
                this.position = ''
                this.type = ''
                this.serverFileName = ''
                this.file = null
            }, err => {
                // console.log('错误了')
                // console.log(err)
                this.$Message.error('提交失败，请联系技术人员')
            })
        },
    },
}
</script>

<style scoped>

</style>
