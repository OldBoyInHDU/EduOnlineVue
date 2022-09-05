<template>
    <div class="home-container">
            <div class="upload-content" style="padding: 20px">
                <Upload
                    :before-upload="beforeUpload"
                    type="drag"
                    action="http://localhost:8082/positionLearning/docUpload/uploadDoc">
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
            <Select v-model="position" style="width:200px" placeholder="请选择岗位" clearable>
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
            <Select v-model="type" style="width:200px;padding-left: 20px" placeholder="请选择文档类别" clearable>
                <Option v-for="item in docTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="serverFileName" placeholder="文件名称 / 服务器文件名称" style="width: 300px; padding-left: 20px" disabled/>
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
    name: 'docUpload',
    data() {
        return {
            unit_pianye_posList: [
                {
                    value: '片叶_开箱',
                    label: '1-1 开箱',
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
            position: '',
            type: '',
            docTypeList: [
                {
                    value: '作业指导书',
                    label: '作业指导书',
                },
                {
                    value: '工艺指标',
                    label: '工艺指标',
                },
            ],
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
            return false
        },
        upload() {
            let formData = new FormData()
            formData.append('file', this.file)
            this.loadingStatus = true
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
                this.loadingStatus = false
                this.serverFileName = this.filename + ' / ' + res.data.data
            }, err => {
                // console.log('错误了')
                console.log(err)
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
            let formData = new FormData()
            formData.append('position', this.position)
            formData.append('type', this.type)
            formData.append('serverFileName', this.serverFileName)
            axios({
                method: 'post',
                url: 'http://localhost:8082/positionLearning/docUpload/submitDocInfo',
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
                console.log(err)
                this.$Message.error('提交失败，请联系技术人员')
            })
        },
    },
}
</script>

<style scoped>

</style>
