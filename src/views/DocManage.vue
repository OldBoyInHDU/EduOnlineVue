<template>
    <div class="home-container">
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
            <Input v-model="title" placeholder="请输入文档标题" style="width: 300px;padding-left: 20px" clearable/>
            <Button type="primary" @click="search">查询</Button>
            <div class="form-content" style="padding-top: 20px">
                <Table border :columns="form_header" :data="form_list_content" :loading="loading">
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
    name: 'docManage',
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
            // 是否显示加载中
            loading: false,
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
                    title: '文档类别',
                    key: 'docFileType',
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
        show(index) {
            let path = this.form_list_content[index].storagePath
            console.log(path)
            window.open('http://localhost:8082/filestore/' + path, '_blank')
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
            axios.delete('http://localhost:8082/positionLearning/docManage/deleteDocInfo', {
                params: {
                    id: paramId,
                },
            }).then(
                res => {
                    console.log(res)
                },
                err => {
                    console.log(err)
                    this.$Message.error('后台服务出问题，请联系技术人员')
                }
            )
        },
        search() {
            let that = this
            axios({
                method: 'get',
                url: 'http://localhost:8082/positionLearning/docManage/getDocByPosOrTypeOrTitle',
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    pos: this.position,
                    type: this.type,
                    title: this.title,
                },
            }).then(res => {
                console.log('成功了')
                console.log(res)
                that.total = res.data.data.length
                that.form_total_content = res.data.data
                that.form_list_content = that.form_total_content.slice(
                    (that.page - 1) * that.pageSize,
                    that.page * that.pageSize
                )
            }, err => {
                console.log('错误了')
                console.log(err)
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
