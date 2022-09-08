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

            <span style="padding-left: 20px">
                <Button type="primary" @click="search">查询</Button>
            </span>
            <div class="form-content" style="padding-top: 20px">
                <Table border :columns="form_header" :data="form_list_content" :loading="loading">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
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
    name: 'videoManage',
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
            position: '',
            loading: false,
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
                    fixed: 'left',
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
                    title: '岗位职责',
                    key: 'posResponsibility',
                },
                {
                    title: '作业指导书',
                    key: 'docFileName',
                },
                {
                    title: '作业指导书地址',
                    key: 'docStoragePath',
                },
                {
                    title: 'SOC文档',
                    key: 'socFileName',
                },
                {
                    title: 'SOC文档地址',
                    key: 'socStoragePath',
                },
                {
                    title: '教学视频',
                    key: 'videoFileName',
                },
                {
                    title: '视频地址',
                    key: 'videoStoragePath',
                },
                {
                    title: '最近更新时间',
                    key: 'lastUpdateDate',
                    fixed: 'right',
                },
            ],
            form_list_content: [], // 当前展示的数据
            form_total_content: [], // 一次性请求的所有数据
        }
    },
    methods: {
        search() {
            let that = this
            axios({
                method: 'get',
                url: 'http://localhost:8082/page/getPageInfo',
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    pos: this.position,
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
