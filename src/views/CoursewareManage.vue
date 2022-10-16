<template>
    <div class="home-container">
        <div class="searchParam" style="padding: 20px">
            <Button type="success" icon="md-add-circle" @click="uploadCoursewareBtn">上传文档</Button>
            <span style="margin-left: 20px; margin-right: 20px">|</span>
            <Input v-model="seminar" placeholder="请输入培训会议名称" style="width: 300px;" clearable/>
            <Input v-model="title" placeholder="请输入文档标题" style="width: 300px; margin-left: 20px" clearable/>
            <span style="padding-left: 20px">
                <Button type="primary" @click="search">查询</Button>
            </span>
            <Button type="primary" style="margin-left: 20px" @click="exportData">列表导出</Button>
            <div class="upload-modal" >
                <Modal
                    v-model="uploadCoursewareModal"
                    title="上传课件"
                    width="520"
                    ok-text="提交"
                    @on-ok="submit"
                    @on-cancel="cancel">
                    <Form :model="formItem" :label-width="120">
                        <FormItem label="培训名称" required prop="seminar" :rules="{required: true, message: '岗位不能为空', trigger: 'blur'}">
                            <Input v-model="formItem.seminar" placeholder="请输入培训名称" style="width: 250px"></Input>
                        </FormItem>
                        <FormItem label="课件" required prop="courseware" :rules="{required: true, message: '岗位不能为空', trigger: 'blur'}">
                            <Upload
                                ref="upload"
                                :show-upload-list="true"
                                :format="['pdf']"
                                :max-size="20480"
                                :on-success="handleSuccess"
                                :on-remove="handleRemove"
                                multiple
                                accept="application/pdf"
                                action="http://localhost:8080/eduonline/forum/coursewareUpload/uploadCourseware">
                                <Button icon="ios-cloud-upload-outline">上传课件</Button>
                                <div slot="tip">支持文件类型:.pdf，文件大小不超过20mb</div>
                            </Upload>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
            <div class="form-content" style="padding-top: 20px">
                <Table border :columns="form_header" :data="form_list_content" :loading="loading" height="600" ref="table">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">预览</Button>
                        <Button type="error" size="small" @click="confirm(index)">删除</Button>
                    </template>
                </Table>
                <br>
                <Page :total="total" :current="page" @on-change="changePage" :page-size="pageSize" show-elevator/>
            </div>
            <Modal
                v-model="confirmModal"
                title="删除确认"
                @on-ok="remove()"
                ok-text="删除"
                @on-cancel="cancel">
                <p>确定删除《{{toDeleteCourseware}}》文档吗？</p>
            </Modal>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import request from "@/utils/request";

export default {
    name: 'CoursewareManage',
    data() {
        return {
            // 是否显示加载中
            loading: false,
            seminar: '', // 会议名称
            title: '', // 文档标题
            // showUploadListFlag: true,
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
                    title: '培训会议',
                    key: 'seminar',
                },{
                    title: '课件标题',
                    key: 'coursewareName',
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
            ],
            form_list_content: [], // 当前展示的数据
            form_total_content: [], // 一次性请求的所有数据
            uploadCourwareModal: false,
            formItem: {
                seminar: '', // 培训名称
                uploadList: [],
            },
            uploadCoursewareModal: false, // 上传modal
            confirmModal: false, // 删除确认modal
            toDeleteCourseware: '',
            delCoursewareIndex: -1,
        }
    },
    methods: {
        resetForm() {
            let that = this
            this.$refs.upload.clearFiles()
            that.formItem.position = ''
            that.formItem.uploadList = []
        },
        uploadCoursewareBtn() {
            let that = this
            that.resetForm()
            that.uploadCoursewareModal = true
        },
        handleSuccess (res, file) {
            // console.log(res)
            // console.log('file:' + file.name)
            let that = this
            let coursewareStoragePath = '/courseware/' + res.data
            that.formItem.uploadList.push({
                fileName: file.name,
                storagePath: coursewareStoragePath,
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
            this.$refs.table.exportCsv({
                filename: '表格数据'
            })
        },
        submit() {
            let that = this
            if(that.formItem.seminar === '' || that.formItem.seminar === null) {
                this.$Message.error('培训名称为空！请填写会议名称！')
                return
            }
            if(that.formItem.uploadList.length < 1) {
                this.$Message.error('文件为空！请选择要上传的文件！')
                return
            }
            let formData = new FormData()
            let uploadListJson = JSON.stringify(that.formItem.uploadList)
            formData.append('seminar', that.formItem.seminar)
            // formData.append('uploadList', that.formItem.uploadList)
            formData.append('uploadListStr', uploadListJson)
            console.log(JSON.stringify(that.formItem.uploadList))
            request.post(
                '/forum/coursewareUpload/submitCoursewareInfo',
                formData,
                {
                    headers: {
                        'content-type': 'application/json'
                    }
                }
            ).then(
                res => {
                    console.log(res)
                    that.$Message.success('课件上传成功')
                    // that.showUploadListFlag = false
                }
            ).catch(
                err => {
                    console.log(err)
                    that.$Message.error('课件上传失败，请联系技术人员')
                    // that.showUploadListFlag = false
                }
            )
        },
        cancel() {
            let that = this
            that.confirmModal = false
            this.$Message.info('已取消')
        },
        show(index) {
            let path = this.form_list_content[index].storagePath
            // console.log(path)
            if (path == '待补充' || path == null || path.length == 0) {
                this.$Message.error('资料待补充')
            } else {
                window.open('http://localhost:8080/eduonline/filestore' + path, '_blank')
            }
            // this.$Modal.info({
            //     title: 'User Info',
            //     content: `Name：${this.form_list_content[index].storagePath}<br>
            //                 // Age：${this.form_list_content[index].age}<br>
            //                 // Address：${this.form_list_content[index].address}`,
            // })
        },
        confirm(index) {
            let that = this
            that.confirmModal = true
            that.toDeleteCourseware = that.form_list_content[index].coursewareName
            that.delCoursewareIndex = index
            // that.remove(index)
        },
        remove() {
            let index = this.delCoursewareIndex
            // console.log(index)
            let paramId = this.form_list_content[index].id
            this.form_list_content.splice(index, 1)
            // console.log('index' + index)
            // console.log('paramId' + paramId)
            axios.delete('http://localhost:8080/eduonline/forum/coursewareManage/deleteCoursewareInfo', {
                params: {
                    id: paramId,
                },
            }).then(
                res => {
                    // console.log(res)
                    this.$Message.success('删除成功！')
                },
                err => {
                    // console.log(err)
                    this.$Message.error('删除失败，请联系技术人员')
                }
            )
        },
        search() {
            let that = this
            axios({
                method: 'get',
                url: '/forum/coursewareManage/getCoursewareByPosOrTitle',
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    seminar: that.seminar,
                    title: that.title,
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
}
</script>

<style scoped>

</style>
