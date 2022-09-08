<template>
    <div class="btn-box">
<!--        {{filename1}}-->
<!--        {{filename2}}-->
<!--        {{filename3}}-->
        <h3>作业指导书：</h3>
        <input class="file-input" type="file" @change="getDocFile($event)" />
        <Button type="primary" @click="uploadDoc" :loading="loadingStatus1">{{ loadingStatus1 ? '上传中' : '上传文件' }}</Button>
        <Input v-model="docServerFileName" placeholder="文件名称 / 服务器文件名称" style="width: 300px; padding-left: 30px" disabled/>
        <h3>SOC文档：</h3>
        <input class="file-input" type="file" @change="getSOCFile($event)" />
        <Button type="primary" @click="uploadSOC" :loading="loadingStatus2">{{ loadingStatus2 ? '上传中' : '上传文件' }}</Button>
        <Input v-model="socServerFileName" placeholder="文件名称 / 服务器文件名称" style="width: 300px; padding-left: 30px" disabled/>
        <h3>教学视频：</h3>
        <input class="file-input" type="file" @change="getVidFile($event)" />
        <Button type="primary" @click="uploadVideo" :loading="loadingStatus3">{{ loadingStatus3 ? '上传中' : '上传文件' }}</Button>
        <Input v-model="vidServerFileName" placeholder="文件名称 / 服务器文件名称" style="width: 300px; padding-left: 30px" disabled/>
        <h3>工段岗位：</h3>
        <Select v-model="position" style="width:200px; margin: 20px" placeholder="请选择岗位" clearable>
            <OptionGroup label="1 片叶">
                <Option v-for="item in unit_pianye_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="2 烘丝">
                <Option v-for="item in unit_hongsi_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="3 参培加香">
                <Option v-for="item in unit_canpeijiaxiang_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="4 膨胀">
                <Option v-for="item in unit_pengzhang_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="5 梗丝">
                <Option v-for="item in unit_gengsi_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="6 残烟间">
                <Option v-for="item in unit_tangliaochufang_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
            unit_pianye_posList: [
                {
                    value: '片叶_解包',
                    label: '1-1 解包',
                },
                {
                    value: '片叶_回潮',
                    label: '1-2 回潮',
                },
                {
                    value: '片叶_风选',
                    label: '1-3 风选',
                },
                {
                    value: '片叶_加料',
                    label: '1-4 加料',
                },
                {
                    value: '片叶_糖料厨房',
                    label: '1-5 糖料厨房',
                },
            ],
            unit_hongsi_posList: [
                {
                    value: '2-1',
                    label: '2-1',
                },
                {
                    value: '2-2',
                    label: '2-2',
                },
                {
                    value: '2-3',
                    label: '2-3',
                },
            ],
            unit_canpeijiaxiang_posList: [
                {
                    value: '3-1',
                    label: '3-1',
                },
                {
                    value: '3-2',
                    label: '3-2',
                },
                {
                    value: '3-3',
                    label: '3-3',
                },
            ],
            unit_pengzhang_posList: [
                {
                    value: '4-1',
                    label: '4-1',
                },
                {
                    value: '4-2',
                    label: '4-2',
                },
                {
                    value: '4-3',
                    label: '4-3',
                },
            ],
            unit_gengsi_posList: [
                {
                    value: '5-1',
                    label: '5-1',
                },
                {
                    value: '5-2',
                    label: '5-2',
                },
                {
                    value: '5-3',
                    label: '5-3',
                },
            ],
            unit_tangliaochufang_posList: [
                {
                    value: '6-1',
                    label: '6-1',
                },
                {
                    value: '6-2',
                    label: '6-2',
                },
                {
                    value: '6-3',
                    label: '6-3',
                },
            ],
            loadingStatus1: false,
            loadingStatus2: false,
            loadingStatus3: false,
            position: '',
            type: '',
            file1: null,
            file2: null,
            file3: null,
            filename1: '',
            filename2: '',
            filename3: '',
            file: null,
            filename: '',
            docServerFileName: '',
            socServerFileName: '',
            vidServerFileName: '',
            posResponsibility: '',
        }
    },
    methods: {
        // 选取文件
        getDocFile(event) {
            this.file1 = event.target.files[0]
            this.filename1 = this.file1.name
            console.log(this.file1.name)
        },
        // 选取文件
        getSOCFile(event) {
            this.file2 = event.target.files[0]
            this.filename2 = this.file2.name
            console.log(this.file2.name)
        },
        // 选取文件
        getVidFile(event) {
            this.file3 = event.target.files[0]
            this.filename3 = this.file3.name
            console.log(this.file3.name)
        },
        // 上传文件(POST)
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
                url: 'http://localhost:8082/positionLearning/docUpload/uploadDoc',
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
        uploadSOC() {
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
                url: 'http://localhost:8082/positionLearning/docUpload/uploadDoc',
                headers: {
                    'content-type': 'multipart/form-data',
                },
                data: formData,
            }).then(res => {
                // console.log('成功了')
                console.log(res)
                this.loadingStatus2 = false
                this.socServerFileName = this.filename + ' / ' + res.data.data
            }, err => {
                // console.log('错误了')
                console.log(err)
                this.$Message.error('后台服务出问题，请联系技术人员')
            })
        },
        uploadVideo() {
            let uncheckedFile = this.file3
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
            this.loadingStatus3 = true
            axios({
                method: 'post',
                url: 'http://localhost:8082/positionLearning/videoUpload/uploadVideo',
                headers: {
                    'content-type': 'multipart/form-data',
                },
                data: formData,
            }).then(res => {
                // console.log('成功了')
                console.log(res)
                this.loadingStatus3 = false
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
                url: 'http://localhost:8082/page/submitPageInfo',
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
