import { resetRouter } from '@/router'

export function resetTokenAndClearUser() {
    // 退出登陆 清除用户资料
    sessionStorage.setItem('token', '')
    sessionStorage.setItem('userImg', '')
    sessionStorage.setItem('userName', '')
    // 重设路由
    resetRouter()
}

export const defaultDocumentTitle = '在线教育后台'
export function getDocumentTitle(pageTitle) {
    if (pageTitle) return `${defaultDocumentTitle} - ${pageTitle}`
    return `${defaultDocumentTitle}`
}
