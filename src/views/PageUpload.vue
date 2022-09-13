<template>
    <div class="btn-box">
<!--        {{filename1}}-->
<!--        {{filename2}}-->
<!--        {{filename3}}-->
        <h3>作业指导书：</h3>
        <input class="file-input" type="file" @change="getDocFile($event)" />
        <Button type="primary" @click="uploadDoc" :loading="loadingStatus1">{{ loadingStatus1 ? '上传中' : '上传文件' }}</Button>
        <Input v-model="docServerFileName" placeholder="文件名称 / 服务器文件名称" style="width: 300px; padding-left: 30px" disabled/>
<!--        <h3>过程控制要求：</h3>-->
<!--        <input class="file-input" type="file" @change="getProcessFile($event)" />-->
<!--        <Button type="primary" @click="uploadProcess" :loading="loadingStatus2">{{ loadingStatus2 ? '上传中' : '上传文件' }}</Button>-->
<!--        <Input v-model="docProcessServerFileName" placeholder="文件名称 / 服务器文件名称" style="width: 300px; padding-left: 30px" disabled/>-->
<!--        <h3>工艺质量指标：</h3>-->
<!--        <input class="file-input" type="file" @change="getIndexFile($event)" />-->
<!--        <Button type="primary" @click="uploadIndex" :loading="loadingStatus3">{{ loadingStatus3 ? '上传中' : '上传文件' }}</Button>-->
<!--        <Input v-model="docIndexServerFileName" placeholder="文件名称 / 服务器文件名称" style="width: 300px; padding-left: 30px" disabled/>-->
        <h3>SOC文档：</h3>
        <input class="file-input" type="file" @change="getSOCFile($event)" />
        <Button type="primary" @click="uploadSOC" :loading="loadingStatus4">{{ loadingStatus4 ? '上传中' : '上传文件' }}</Button>
        <Input v-model="socServerFileName" placeholder="文件名称 / 服务器文件名称" style="width: 300px; padding-left: 30px" disabled/>
        <h3>教学视频：</h3>
        <input class="file-input" type="file" @change="getVidFile($event)" />
        <Button type="primary" @click="uploadVideo" :loading="loadingStatus5">{{ loadingStatus5 ? '上传中' : '上传文件' }}</Button>
        <Input v-model="vidServerFileName" placeholder="文件名称 / 服务器文件名称" style="width: 300px; padding-left: 30px" disabled/>
        <h3>工段岗位：</h3>
        <Select v-model="position" style="width:200px; margin: 20px" placeholder="请选择岗位" clearable>
            <OptionGroup label="1 片叶">
                <Option v-for="item in unit_pianye_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="2 烘丝">
                <Option v-for="item in unit_hongsi_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="3 掺配加香">
                <Option v-for="item in unit_canpeijiaxiang_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="4 膨胀">
                <Option v-for="item in unit_pengzhang_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="5 梗丝">
                <Option v-for="item in unit_gengsi_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="6 残烟间">
                <Option v-for="item in unit_canyanjian_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
        </Select>
        <h3>岗位职责：</h3>
        <Input v-model="posResponsibility" type="textarea" :rows="4" placeholder="请输入岗位职责" style="padding: 20px"/>
<!--        <divider />-->
        <Button type="primary" @click="submit" class="btn-submit">提交</Button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'attendPoint',
    data() {
        return {
            unit_pianye_posList: [],
            unit_hongsi_posList: [],
            unit_canpeijiaxiang_posList: [],
            unit_pengzhang_posList: [],
            unit_gengsi_posList: [],
            unit_canyanjian_posList: [],
            loadingStatus1: false,
            loadingStatus2: false,
            loadingStatus3: false,
            loadingStatus4: false,
            loadingStatus5: false,
            position: '',
            type: '',
            file1: null,
            file2: null,
            file3: null,
            file4: null,
            file5: null,
            filename1: '',
            filename2: '',
            filename3: '',
            filename4: '',
            filename5: '',
            file: null,
            filename: '',
            docServerFileName: '',
            docProcessServerFileName: '',
            docIndexServerFileName: '',
            socServerFileName: '',
            vidServerFileName: '',
            posResponsibility: '',
        }
    },
    methods: {
        getPositionList() {
            let that = this
            axios({
                method: 'get',
                url: 'position/getPositionList',
                headers: {
                    'content-type': 'application/json',
                },
            }).then(res => {
                console.log('成功了')
                console.log(res)
                that.unit_pianye_posList = res.data.data.unit_pianye_posList
                that.unit_hongsi_posList = res.data.data.unit_hongsi_posList
                that.unit_canpeijiaxiang_posList = res.data.data.unit_canpeijiaxiang_posList
                that.unit_pengzhang_posList = res.data.data.unit_pengzhang_posList
                that.unit_gengsi_posList = res.data.data.unit_gengsi_posList
                that.unit_canyanjian_posList = res.data.data.unit_canyanjian_posList
            }, err => {
                console.log('错误了')
                console.log(err)
                this.$Message.error('后台服务出问题，请联系技术人员')
            })
        },
        // 选取文件
        getDocFile(event) {
            this.file1 = event.target.files[0]
            this.filename1 = this.file1.name
            console.log(this.file1.name)
        },
        // 选取文件
        getProcessFile(event) {
            this.file2 = event.target.files[0]
            this.filename2 = this.file2.name
            console.log(this.file2.name)
        },
        // 选取文件
        getIndexFile(event) {
            this.file3 = event.target.files[0]
            this.filename3 = this.file3.name
            console.log(this.file3.name)
        },
        // 选取文件
        getSOCFile(event) {
            this.file4 = event.target.files[0]
            this.filename4 = this.file4.name
            console.log(this.file4.name)
        },
        // 选取文件
        getVidFile(event) {
            this.file5 = event.target.files[0]
            this.filename5 = this.file5.name
            console.log(this.file5.name)
        },
        // 上传文件 doc 作业指导书
        uploadDoc() {
            let uncheckedFile = this.file1
            if (uncheckedFile == null) {
                this.$Message.error('未选择文件！请先选择文件！')
                return
            }
            let isRight = this.beforeUploadDoc(uncheckedFile)
            if (!isRight) {
                this.$Message.error('请重新上传文件')
                return
            }
            let checkedFile = uncheckedFile
            let formData = new FormData()
            formData.append('file', checkedFile)
            this.loadingStatus1 = true
            axios({
                method: 'post',
                url: 'positionLearning/docUpload/uploadDoc',
                headers: {
                    'content-type': 'multipart/form-data',
                },
                data: formData,
            }).then(res => {
                // console.log('成功了')
                console.log(res)
                this.loadingStatus1 = false
                this.docServerFileName = this.filename + ' / ' + res.data.data
            }, err => {
                // console.log('错误了')
                console.log(err)
                this.$Message.error('后台服务出问题，请联系技术人员')
            })
        },
        // 上传文件 process过程控制要求
        uploadProcess() {
            let uncheckedFile = this.file2
            if (uncheckedFile == null) {
                this.$Message.error('未选择文件！请先选择文件！')
                return
            }
            let isRight = this.beforeUploadDoc(uncheckedFile)
            if (!isRight) {
                this.$Message.error('请重新上传文件')
                return
            }
            let checkedFile = uncheckedFile
            let formData = new FormData()
            formData.append('file', checkedFile)
            this.loadingStatus2 = true
            axios({
                method: 'post',
                url: 'positionLearning/docUpload/uploadDoc',
                headers: {
                    'content-type': 'multipart/form-data',
                },
                data: formData,
            }).then(res => {
                // console.log('成功了')
                console.log(res)
                this.loadingStatus2 = false
                this.docProcessServerFileName = this.filename + ' / ' + res.data.data
            }, err => {
                // console.log('错误了')
                console.log(err)
                this.$Message.error('后台服务出问题，请联系技术人员')
            })
        },
        // 上传文件 index 工艺指标
        uploadIndex() {
            let uncheckedFile = this.file3
            if (uncheckedFile == null) {
                this.$Message.error('未选择文件！请先选择文件！')
                return
            }
            let isRight = this.beforeUploadDoc(uncheckedFile)
            if (!isRight) {
                this.$Message.error('请重新上传文件')
                return
            }
            let checkedFile = uncheckedFile
            let formData = new FormData()
            formData.append('file', checkedFile)
            this.loadingStatus3 = true
            axios({
                method: 'post',
                url: 'positionLearning/docUpload/uploadDoc',
                headers: {
                    'content-type': 'multipart/form-data',
                },
                data: formData,
            }).then(res => {
                // console.log('成功了')
                console.log(res)
                this.loadingStatus3 = false
                this.docIndexServerFileName = this.filename + ' / ' + res.data.data
            }, err => {
                // console.log('错误了')
                console.log(err)
                this.$Message.error('后台服务出问题，请联系技术人员')
            })
        },
        uploadSOC() {
            let uncheckedFile = this.file4
            if (uncheckedFile == null) {
                this.$Message.error('未选择文件！请先选择文件！')
                return
            }
            let isRight = this.beforeUploadDoc(uncheckedFile)
            if (!isRight) {
                this.$Message.error('请重新上传文件')
                return
            }
            let checkedFile = uncheckedFile
            let formData = new FormData()
            formData.append('file', checkedFile)
            this.loadingStatus4 = true
            axios({
                method: 'post',
                url: 'positionLearning/docUpload/uploadDoc',
                headers: {
                    'content-type': 'multipart/form-data',
                },
                data: formData,
            }).then(res => {
                // console.log('成功了')
                console.log(res)
                this.loadingStatus4 = false
                this.socServerFileName = this.filename + ' / ' + res.data.data
            }, err => {
                // console.log('错误了')
                console.log(err)
                this.$Message.error('后台服务出问题，请联系技术人员')
            })
        },
        uploadVideo() {
            let uncheckedFile = this.file5
            if (uncheckedFile == null) {
                this.$Message.error('未选择文件！请先选择文件！')
                return
            }
            let isRight = this.beforeUploadVid(uncheckedFile)
            if (!isRight) {
                this.$Message.error('请重新上传文件')
                return
            }
            let formData = new FormData()
            formData.append('file', this.file)
            this.loadingStatus5 = true
            axios({
                method: 'post',
                url: 'positionLearning/videoUpload/uploadVideo',
                headers: {
                    'content-type': 'multipart/form-data',
                },
                data: formData,
            }).then(res => {
                // console.log('成功了')
                console.log(res)
                this.loadingStatus5 = false
                this.vidServerFileName = this.filename + ' / ' + res.data.data
            }, err => {
                // console.log('错误了')
                console.log(err)
                this.$Message.error('后台服务出问题，请联系技术人员')
            })
        },
        beforeUploadDoc(file) {
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
        beforeUploadVid(file) {
            let name = file.name
            // console.log(name)
            let suffix = name.substring(name.lastIndexOf('.'))
            // console.log(suffix)
            let isNameLegal = true
            let isLs2M = true
            let isRight = true
            isNameLegal = suffix === '.mp4'
            isLs2M = file.size / 1024 / 1024 < 200
            if (!isLs2M || !isNameLegal) {
                this.loadingStatus = false
                this.$Message.error('上传的文件大小不能超过200MB 且 格式为mp4！')
                isRight = false
            }
            this.filename = file.name
            this.file = file
            // 一定要return false 不然会直接上传
            return isRight
        },
        submit() {
            let formData = new FormData()
            formData.append('position', this.position)
            formData.append('docServerFileName', this.docServerFileName)
            formData.append('socServerFileName', this.socServerFileName)
            formData.append('vidServerFileName', this.vidServerFileName)
            formData.append('posResponsibility', this.posResponsibility)
            axios({
                method: 'post',
                url: 'page/submitPageInfo',
                headers: {
                    'content-type': 'application/json',
                },
                data: formData,
            }).then(res => {
                // console.log('成功了')
                this.$Message.success('提交成功')
                this.position = ''
                this.docServerFileName = ''
                this.socServerFileName = ''
                this.vidServerFileName = ''
                this.posResponsibility = ''
                this.file1 = null
                this.file2 = null
                this.file3 = null
                this.filename1 = ''
                this.filename2 = ''
                this.filename3 = ''
            }, err => {
                // console.log('错误了')
                console.log(err)
                this.$Message.error('提交失败，请联系技术人员')
            })
        },
    },
    created() {
        this.getPositionList()
    },
}
</script>

<style scoped>
.btn-box {
    padding: 20px;
}

input {
    /*max-width: fit-content;*/
    /*display: block;*/
    margin: 20px;
}

.btn-submit {
    vertical-align: middle;
    display: flex;
    align-items: center;
    /*justify-content:center;*/
    margin: 50px auto;
}
</style>
