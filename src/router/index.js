import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('../components/Login.vue'),
    },
    {
        path: '/other', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'other',
        meta: { title: '单独的路由' },
        component: () => import('../views/Other.vue'),
    },
    {
        path: '/404',
        name: '404',
        meta: { title: '404' },
        component: () => import('../components/404.vue'),
    },
    { path: '/', redirect: '/home' },
]

// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = {
    home: {
        path: 'home',
        name: 'home',
        meta: { title: '主页' },
        component: () => import('../views/Home.vue'),
    },
    t1: {
        path: 't1',
        name: 't1',
        meta: { title: '表格' },
        component: () => import('../views/T1.vue'),
    },
    password: {
        path: 'password',
        name: 'password',
        meta: { title: '修改密码' },
        component: () => import('../views/Password.vue'),
    },
    msg: {
        path: 'msg',
        name: 'msg',
        meta: { title: '通知消息' },
        component: () => import('../views/Msg.vue'),
    },
    userinfo: {
        path: 'userinfo',
        name: 'userinfo',
        meta: { title: '用户信息' },
        component: () => import('../views/UserInfo.vue'),
    },
    docUpload: {
        path: 'docUpload',
        name: 'docUpload',
        meta: { title: '文档上传' },
        component: () => import('../views/DocUpload.vue'),
    },
    docManage: {
        path: 'docManage',
        name: 'docManage',
        meta: { title: '文档上传/管理' },
        component: () => import('../views/DocManage.vue'),
    },
    socManage: {
        path: 'socManage',
        name: 'socManage',
        meta: { title: 'SOC上传/管理' },
        component: () => import('../views/SocManage.vue'),
    },
    videoUpload: {
        path: 'videoUpload',
        name: 'videoUpload',
        meta: { title: '视频上传' },
        component: () => import('../views/VideoUpload.vue'),
    },
    videoManage: {
        path: 'videoManage',
        name: 'videoManage',
        meta: { title: '视频上传/管理' },
        component: () => import('../views/VideoManage.vue'),
    },
    coursewareUpload: {
        path: 'coursewareUpload',
        name: 'coursewareUpload',
        meta: { title: '课件上传' },
        component: () => import('../views/CoursewareUpload.vue'),
    },
    coursewareManage: {
        path: 'coursewareManage',
        name: 'coursewareManage',
        meta: { title: '课件管理' },
        component: () => import('../views/CoursewareManage.vue'),
    },
    pageManage: {
        path: 'pageManage',
        name: 'pageManage',
        meta: { title: '资料管理' },
        component: () => import('../views/PageManage.vue'),
    },
    pageUpload: {
        path: 'pageUpload',
        name: 'pageUpload',
        meta: { title: '资料上传' },
        component: () => import('../views/PageUpload.vue'),
    },
}

const createRouter = () => new Router({
    routes: commonRoutes,
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
