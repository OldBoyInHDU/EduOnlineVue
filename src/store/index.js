import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isShowLoading: false, // 全局 loading
        // 左侧菜单栏数据
        menuItems: [
            {
                name: 'home', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-home', // icon类型
                text: '主页', // 文本内容
            },
            {
                text: '岗位学习',
                type: 'ios-book',
                children: [
                    {
                        size: 18, // icon大小
                        type: 'ios-cloud-upload', // icon类型
                        name: 'pageUpload',
                        text: '资料上传',
                        hidden: true,
                        // url: 'https://www.baidu.com',
                        // isExternal: true, // 外链 跳到一个外部的 URL 页面
                    },
                    {
                        size: 18, // icon大小
                        type: 'ios-search', // icon类型
                        name: 'pageManage',
                        text: '资料查询',
                        hidden: true,
                        // url: 'https://www.baidu.com',
                        // isExternal: true, // 外链 跳到一个外部的 URL 页面
                    },
                    {
                        size: 18,
                        type: 'ios-cloud-upload',
                        name: 'docUpload',
                        text: '文档上传',
                        hidden: true,
                        // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
                        //
                    },
                    {
                        size: 18, // icon大小
                        type: 'ios-albums', // icon类型
                        name: 'docManage',
                        text: '文档上传/管理',
                        // url: 'https://www.baidu.com',
                        // isExternal: true, // 外链 跳到一个外部的 URL 页面
                    },
                    {
                        size: 18, // icon大小
                        type: 'ios-albums', // icon类型
                        name: 'socManage',
                        text: 'SOC上传/管理',
                        // url: 'https://www.baidu.com',
                        // isExternal: true, // 外链 跳到一个外部的 URL 页面
                    },
                    {
                        size: 18, // icon大小
                        type: 'ios-cloud-upload', // icon类型
                        name: 'videoUpload',
                        text: '视频上传',
                        hidden: true,
                        // url: 'https://www.baidu.com',
                        // isExternal: true, // 外链 跳到一个外部的 URL 页面
                    },

                    {
                        size: 18, // icon大小
                        type: 'logo-youtube', // icon类型
                        name: 'videoManage',
                        text: '视频上传/管理',
                        // url: 'https://www.baidu.com',
                        // isExternal: true, // 外链 跳到一个外部的 URL 页面
                    },
                ],
            },
            {
                text: '新丝路讲坛',
                type: 'ios-paper',
                children: [
                    {
                        size: 18,
                        type: 'ios-cloud-upload',
                        name: 'coursewareUpload',
                        text: '课件上传',
                        // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
                        // hidden: true,
                    },
                    {
                        size: 18, // icon大小
                        type: 'ios-albums', // icon类型
                        name: 'coursewareManage',
                        text: '课件管理',
                        // url: 'https://www.baidu.com',
                        // isExternal: true, // 外链 跳到一个外部的 URL 页面
                    },
                ],
            },
            {
                size: 18, // icon大小
                type: 'md-arrow-forward', // icon类型
                text: '制丝在线教育平台',
                url: 'http://10.46.137.222:8080/index.html',
                isExternal: true, // 外链 跳到一个外部的 URL 页面
            },
            {
                name: 'other', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-egg-outline', // icon类型
                text: '单独的路由', // 点击侧边栏跳到一个单独的路由页面，需要提前在 router.js 定义
                hidden: true,
            },
            // {
            //     text: '系统设置',
            //     type: 'ios-settings',
            //     hidden: true,
            //     children: [
            //         {
            //             size: 18,
            //             type: 'ios-grid',
            //             name: 't1',
            //             text: '表格',
            //             // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
            //             hidden: true,
            //         },
            //         {
            //             size: 18,
            //             type: 'ios-notifications-outline',
            //             name: 'msg',
            //             text: '查看消息',
            //             hidden: true,
            //         },
            //         {
            //             size: 18,
            //             type: 'md-lock',
            //             name: 'password',
            //             text: '修改密码',
            //         },
            //         {
            //             size: 18,
            //             type: 'md-person',
            //             name: 'userinfo',
            //             text: '基本资料',
            //         },
            //         // {
            //         //     text: '三级菜单',
            //         //     type: 'ios-paper',
            //         //     children: [
            //         //         {
            //         //             type: 'ios-notifications-outline',
            //         //             name: 'msg',
            //         //             text: '查看消息',
            //         //         },
            //         //         {
            //         //             type: 'md-lock',
            //         //             name: 'password',
            //         //             text: '修改密码',
            //         //         },
            //         //         {
            //         //             type: 'md-person',
            //         //             name: 'userinfo',
            //         //             text: '基本资料',
            //         //         },
            //         //         {
            //         //             size: 18, // icon大小
            //         //             type: 'md-arrow-forward', // icon类型
            //         //             text: '外链',
            //         //             url: 'https://www.baidu.com',
            //         //             isExternal: true, // 外链 跳到一个外部的 URL 页面
            //         //         },
            //         //     ],
            //         // },
            //     ],
            // },
        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
        setLoading(state, isShowLoading) {
            state.isShowLoading = isShowLoading
        },
    },
})

export default store
