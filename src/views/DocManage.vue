<template>
    <div class="home-container">
        <div class="searchParam" style="padding: 20px">
            <Select v-model="model7" style="width:200px" placeholder="请选择岗位" clearable="true">
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
            <Select v-model="model1" style="width:200px;padding-left: 20px" placeholder="请选择文档类别">
                <Option v-for="item in docTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="value" placeholder="请输入文档标题" style="width: 300px;padding-left: 20px" />
            <Button type="primary" >查询</Button>
            <div class="form-content" style="padding-top: 20px">
                <Table border :columns="columns12" :data="data6" :loading="loading">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">预览</Button>
                        <Button type="error" size="small" @click="remove(index)">删除</Button>
                    </template>
                </Table>
                <br>
                <Page :total="100" show-sizer show-elevator/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'docManage',
    data() {
        return {
            unit_pianye_posList: [
                {
                    value: '1-1_kaixiang',
                    label: '1-1 开箱',
                },
                {
                    value: '1-2_huichao',
                    label: '1-2 回潮',
                },
                {
                    value: '1-3_fengxuan',
                    label: '1-3 风选',
                },
                {
                    value: '1-4_jialiao',
                    label: '1-4 加料',
                },
                {
                    value: '1-5_tangliaochufang',
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
            model7: '岗位',
            model1: '',
            // 是否显示加载中
            loading: false,
            docTypeList: [
                {
                    value: 'operation_instruction',
                    label: '作业指导书',
                },
                {
                    value: 'process_index',
                    label: '工艺指标',
                },
            ],
            value: '',
            columns12: [
                {
                    title: '序号',
                    key: 'rank',
                    width: 75,
                },
                {
                    title: '文档标题',
                    key: 'docName',
                },
                {
                    title: '文档类别',
                    key: 'docType',
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
                    key: 'uploadTime',
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center',
                },
            ],
            data6: [
                {
                    rank: 1,
                    docName: '开箱作业指导书',
                    docType: '作业指导书',
                    unit: '片叶',
                    position: '开箱操作工',
                    storagePath: 'doc/zuoyezhidao',
                    uploadTime: '2022-08-01',
                },
            ],
        }
    },
    methods: {
        show(index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`,
            })
        },
        remove(index) {
            this.data6.splice(index, 1)
        },
    },
}
</script>

<style scoped>

</style>
