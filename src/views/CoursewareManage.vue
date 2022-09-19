<template>
    <div class="home-container">
        <div class="searchParam" style="padding: 20px">
            <Input v-model="title" placeholder="请输入文档标题" style="width: 300px;" clearable/>
            <span style="padding-left: 20px">
                <Button type="primary" @click="search">查询</Button>
            </span>
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

export default {
    name: 'CoursewareManage',
    data() {
        return {
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
                    title: '课件标题',
                    key: 'coursewareName',
                },
                // {
                //     title: '工段',
                //     key: 'unit',
                // },
                // {
                //     title: '岗位',
                //     key: 'position',
                // },
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
        }
    },
    methods: {
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
            axios.delete('http://localhost:8080/eduonline/forum/coursewareManage/deleteCoursewareInfo', {
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
                url: 'forum/coursewareManage/getCoursewareByPosOrTitle',
                headers: {
                    'content-type': 'application/json',
                },
                params: {
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
}
</script>

<style scoped>

</style>
