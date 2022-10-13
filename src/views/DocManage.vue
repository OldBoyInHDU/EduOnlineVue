<template>
    <div class="home-container">
        <div class="searchParam" style="padding: 20px">
            <Button type="success" icon="md-add-circle" @click="uploadDocBtn">上传文档</Button>
            <span style="margin-left: 20px; margin-right: 20px">|</span>
<!--            文档查询：-->
            <Select v-model="position" style="width:200px" placeholder="请选择岗位" clearable>
                <OptionGroup label="0 公共">
                    <Option v-for="item in unit_public_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </OptionGroup>
                <OptionGroup label="1 制叶">
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
                <OptionGroup label="6 糖料厨房">
                    <Option v-for="item in unit_tangliaochufang_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </OptionGroup>
                <OptionGroup label="7 残烟间">
                    <Option v-for="item in unit_canyanjian_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </OptionGroup>
            </Select>
            <Input v-model="title" placeholder="请输入文档标题" style="width: 300px;padding-left: 20px" clearable/>
            <span style="padding-left: 20px">
                <Button type="primary" @click="search">查询</Button>
            </span>
            <Button type="primary" style="margin-left: 20px" @click="exportData">列表导出</Button>
            <div class="upload-modal" >
                <Modal
                    v-model="uploadDocModal"
                    title="上传文档"
                    width="520"
                    ok-text="提交"
                    @on-ok="submit"
                    @on-cancel="cancel">
                    <Form :model="formItem" :label-width="120">
                        <FormItem label="岗位" required prop="position" :rules="{required: true, message: '岗位不能为空', trigger: 'blur'}">
                            <Select v-model="formItem.position" style="width:200px" placeholder="请选择岗位" clearable>
                                <OptionGroup label="0 公共">
                                    <Option v-for="item in unit_public_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </OptionGroup>
                                <OptionGroup label="1 制叶">
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
                                <OptionGroup label="6 糖料厨房">
                                    <Option v-for="item in unit_tangliaochufang_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </OptionGroup>
                                <OptionGroup label="7 残烟间">
                                    <Option v-for="item in unit_canyanjian_posList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </OptionGroup>
                            </Select>
                        </FormItem>
                        <FormItem label="文档" required prop="doc" :rules="{required: true, message: '岗位不能为空', trigger: 'blur'}">
                            <Upload
                                ref="upload"
                                :show-upload-list="true"
                                :format="['pdf']"
                                :max-size="20480"
                                :on-success="handleSuccess"
                                :on-remove="handleRemove"
                                multiple
                                accept="application/pdf"
                                action="http://localhost:8080/eduonline/positionLearning/docUpload/uploadDoc">
                                <Button icon="ios-cloud-upload-outline">上传文件</Button>
                                <div slot="tip">支持文件类型:.pdf，文件大小不超过20mb</div>
                            </Upload>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
            <div class="form-content" style="padding-top: 20px">
                <Table border :columns="form_header" :data="form_list_content" :loading="loading" height="600">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">预览</Button>
                        <Button type="error" size="small" @click="remove(index)">删除</Button>
                    </template>
                </Table>
                <br>
                <Page :total="total" :current="page" @on-change="changePage" :page-size="pageSize" show-elevator/>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import request from "@/utils/request";

export default {
    name: 'docManage',
    data() {
        return {
            unit_public_posList: [],
            unit_pianye_posList: [],
            unit_hongsi_posList: [],
            unit_canpeijiaxiang_posList: [],
            unit_pengzhang_posList: [],
            unit_gengsi_posList: [],
            unit_canyanjian_posList: [],
            unit_tangliaochufang_posList: [],
            position: '', // 岗位
            type: '',
            uploadDocModal: false,
            formItem: {
                position: '',
                uploadList: [],
            },
            // 是否显示加载中
            loading: false,
            title: '', // 文档标题
            page: 1, // 当前页
            pageSize: 10, // 一页展示10条数据
            total: 0, // 数据总条数
            form_header: [
                {
                    title: '序号',
                    // key: 'id',
                    type: 'index',
                    width: 75,
                    render: (h, params) => h('span', {}, params.index + 1),
                },
                {
                    title: '文档标题',
                    key: 'docFileName',
                },
                {
                    title: '工段',
                    key: 'unit',
                },
                {
                    title: '岗位',
                    key: 'position',
                },
                {
                    title: '存储路径',
                    key: 'storagePath',
                },
                {
                    title: '上传时间',
                    key: 'uploadDate',
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center',
                },
            ], // 表头
            form_list_content: [], // 当前展示的数据
            form_total_content: [], // 一次性请求的所有数据
        }
    },
    methods: {
        getPositionList() {
            // let that = this
            axios({
                method: 'get',
                url: 'position/getPositionList',
                headers: {
                    'content-type': 'application/json',
                },
            }).then(res => {
                // console.log('成功了')
                // console.log(res)
                this.unit_public_posList = res.data.data.unit_public_posList
                this.unit_pianye_posList = res.data.data.unit_pianye_posList
                this.unit_hongsi_posList = res.data.data.unit_hongsi_posList
                this.unit_canpeijiaxiang_posList = res.data.data.unit_canpeijiaxiang_posList
                this.unit_pengzhang_posList = res.data.data.unit_pengzhang_posList
                this.unit_gengsi_posList = res.data.data.unit_gengsi_posList
                this.unit_canyanjian_posList = res.data.data.unit_canyanjian_posList
                this.unit_tangliaochufang_posList = res.data.data.unit_tangliaochufang_posList
            }, err => {
                // console.log('错误了')
                // console.log(err)
                this.$Message.error('后台服务出问题，请联系技术人员')
            })
        },
        resetForm() {
            let that = this
            that.formItem.position = ''
        },
        uploadDocBtn() {
            let that = this
            that.resetForm()
            that.uploadDocModal = true
        },
        handleSuccess (res, file) {
            // console.log(res)
            // console.log('file:' + file.name)
            let that = this
            let docStoragePath = '/doc/' + res.data
            that.formItem.uploadList.push({
                fileName: file.name,
                storagePath: docStoragePath,
            })
            // console.log(JSON.stringify(that.uploadList))
        },
        handleRemove(file) {
            // console.log(file.name)
            let that = this
            let tempFileList = that.formItem.uploadList
            that.formItem.uploadList.splice(tempFileList.indexOf(file), 1)
            // console.log(JSON.stringify(that.uploadList))
        },
        exportData() {

        },
        submit() {
            let that = this
            if(that.formItem.position === '' || that.formItem.position === null) {
                this.$Message.error('岗位为空！请选择岗位！')
                return
            }
            if(that.formItem.uploadList.length < 1) {
                this.$Message.error('文件为空！请选择要上传的文件！')
                return
            }
            let formData = new FormData()
            let uploadListJson = JSON.stringify(that.formItem.uploadList)
            formData.append('position', that.formItem.position)
            // formData.append('uploadList', that.formItem.uploadList)
            formData.append('uploadListStr', uploadListJson)
            console.log(JSON.stringify(that.formItem.uploadList))
            request.post(
                '/positionLearning/docUpload/submitDocInfo',
                formData,
                {
                    headers: {
                        'content-type': 'application/json'
                    }
                }
            ).then(
                res => {
                    console.log(res)
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        },
        cancel() {

        },
        show(index) {
            let path = this.form_list_content[index].storagePath
            // console.log(path)
            if (path == '待补充' || path == null || path.length == 0) {
                this.$Message.error('资料待补充')
            } else {
                window.open('http://localhost:8080/eduonline/filestore/' + path, '_blank')
            }
            // this.$Modal.info({
            //     title: 'User Info',
            //     content: `Name：${this.form_list_content[index].storagePath}<br>
            //                 // Age：${this.form_list_content[index].age}<br>
            //                 // Address：${this.form_list_content[index].address}`,
            // })
        },
        remove(index) {
            let paramId = this.form_list_content[index].id
            this.form_list_content.splice(index, 1)
            // console.log('index' + index)
            // console.log('paramId' + paramId)
            axios.delete('http://localhost:8080/eduonline/positionLearning/docManage/deleteDocInfo', {
                params: {
                    id: paramId,
                },
            }).then(
                res => {
                    // console.log(res)
                },
                err => {
                    // console.log(err)
                    this.$Message.error('后台服务出问题，请联系技术人员')
                }
            )
        },
        search() {
            let that = this
            axios({
                method: 'get',
                url: 'positionLearning/docManage/getDocByPosOrTitle',
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    pos: this.position,
                    // type: this.type,
                    title: this.title,
                },
            }).then(res => {
                // console.log('成功了')
                // console.log(res)
                that.total = res.data.data.length
                that.form_total_content = res.data.data
                that.form_list_content = that.form_total_content.slice(
                    (that.page - 1) * that.pageSize,
                    that.page * that.pageSize
                )
            }, err => {
                // console.log('错误了')
                // console.log(err)
                this.$Message.error('后台服务出问题，请联系技术人员')
            })
        },
        changePage(page) {
            let that = this
            if (page) {
                that.page = page
            }
            that.form_list_content = that.form_total_content.slice(
                (that.page - 1) * that.pageSize,
                that.page * that.pageSize
            )
        },
    },
    created() {
        this.getPositionList()
    },
}
</script>

<style scoped>

</style>
