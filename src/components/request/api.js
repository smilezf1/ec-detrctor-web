//http://192.168.3.58:9980/ec_detector
// 58 9980
// 100 8080
const baseUrl = "http://192.168.3.58:9980/ec_detector";
import { fetchGet, fetchPost, uploadFile } from './http'
//登录
let userService = {
    //登录
    login(params) {
        return fetchGet(`/login?userName=${params.userName}&password=${params.password}&vercode=${params.verCode}&guid=${params.guid}`).then(
            res => res.data)
    },
    //退出登录
    logout(params) {
        return fetchGet("/logout").then(res => res.data)
    },
    getUserMenuTree(params) {
        return fetchGet("/user/userMenuTree", params).then(res => res.data)
    }
}
//上传
let uploadService = {
    uploadFile(params, config) {
        return uploadFile("/detector/android/uploadAppFile", params, config).then(res => res.data)
    }

}
//首页检测任务
let detrctorTaskService = {
    //列表数据
    detrctorTaskList(params) {
        return fetchPost("/detector/android/page", params).then(res => res.data)
    },
    //查询策略列表根据strategyType不同(android,ios)
    findStrategyList(params) {
        return fetchPost("/api/detection/strategy/findStrategyListByStrategyType?strategyType=" + params).then(res => res.data)
    },
    //查询检测策略列表
    findStrategyPage(params) {
        return fetchPost("/api/detection/strategy/findStrategyPage", params).then(res => res.data)
    }

}
//android
let androidService = {
    androidList(params) {
        return fetchPost("/detector/android/page", params).then(res => res.data)
    },
    deleteAndroidListById(params) {
        return fetchGet("/detector/android/deleteTask?id=" + params).then(res => res.data)
    },
    detailAndroidListById(params) {
        return fetchGet("/detector/android/detail?id=" + params).then(res => res.data)
    },
    //检测具体结果
    detailItemAndroidListById(id, terminalType) {
        return fetchGet("/detector/android/itemDetail?id=" + id + "&terminalType=" + terminalType).then(res => res.data)
    },
    //保存应用并开始检测
    saveAndStartDetection(params) {
        return fetchPost("/detector/android/saveAndStartDetection", params).then(res => res.data)
    },
    //查询策略详情
    getStrategyDetail(params) {
        return fetchGet("/api/detection/strategy/getStrategyDetail?strategyId=" + params).then(res => res.data)
    }

}
//检测项配置服务
let detectorItemService = {
    findDetectionItemList(params) {

        return fetchPost("/api/detection/item/findDetectionItemPage", params).then(res => res.data)

    }
}
//检测策略配置服务
let detectorStrategyService = {
    //查询检测项列表
    getDetectionItemList(params) {
        return fetchPost("/api/detection/item/findDetectionItemList?terminalType=" + params).then(res => res.data)
    },
    //根据终端类型查询检测项类型列表
    getDetectionItemTypeList(params) {
        return fetchPost("/api/detection/item/findDetectionTypeList?terminalType=" + params).then(res => res.data)
    },
    //新增或修改检测策略
    saveOrUpdateStrategy(params) {
        return fetchPost("/api/detection/strategy/saveOrUpdateStrategy", params).then(res => res.data)
    }
}
let systemService = {
    //系统介绍
    systemAbout() {
        return fetchGet("/about/findAbout").then(res => res.data)
    },
    //角色管理开始--
    roleManageList(params) {
        return fetchPost("/role/page", params).then(res => res.data)
    },
    //保存角色
    roleManageSave(params) {
        return fetchPost("/role/save", params).then(res => res.data)
    },
    //角色详情
    roleManageDetail(params) {
        return fetchGet("/role/detail?id=" + params).then(res => res.data)
    },
    //设置菜单
    roleManageSettingMenu(params) {
        return fetchGet("/menu/menuTree?roleId=" + params).then(res => res.data)
    },
    //保存更新的菜单
    roleManageSettingMenuSave(params) {
        return fetchPost("/role/saveRoleItem", params).then(res => res.data)
    },
    //停用菜单
    roleManageBolockUp(params) {
        return fetchGet("/role/invalid?id=" + params).then(res => res.data)
    },
    //启用菜单
    roleManageLaunch(params) {
        return fetchGet("/role/active?id=" + params).then(res => res.data)
    },
    //角色管理结束--
    //菜单管理开始--
    menuManageList(params) {
        return fetchGet('/menu/list', params).then(res => res.data)
    },
    //菜单详情
    menuManageEdit(params) {
        return fetchGet("/menu/detail/?id=" + params).then(res => res.data)
    },
    //菜单保存编辑
    menuManageEditSave(params) {
        return fetchPost("/menu/save", params).then(res => res.data)
    },
    //新增目录与新增链接接口相同传的参数type不同
    menuManageSaveAddCatalogue(params) {
        return fetchPost("menu/save", params).then(res => res.data)
    },
    //停用
    menuManageBlockUp(params) {
        return fetchGet('/menu/invalid?id=' + params).then(res => res.data)
    },
    //启用
    menuManageLaunch(params) {
        return fetchGet('/menu/active?id=' + params).then(res => res.data)
    },
    //菜单管理结束--
    //用户管理开始--
    userManageList(params) {
        return fetchPost("/user/page", params).then(res => res.data)
    },
    //检查用户名
    userManageCheckUserName(params) {
        return fetchGet("/user/checkUserName?userName=" + params).then(res => res.data)
    },
    //用户详细
    userManageDetail(params) {
        return fetchGet("/user/detail?id=" + params).then(res => res.data)
    },
    userManageSave(params) {
        return fetchPost("/user/save", params).then(res => res.data)
    },
    userManageResetPwd(params) {
        return fetchPost('/user/resetPwd', params).then(res => res.data)
    },
    userManageSaveUserRole(params) {
        return fetchPost('/user/saveUserRole', params).then(res => res.data)
    },
    userManageSetRole(params) {
        return fetchGet("/role/roleTree?userId=" + params).then(res => res.data)
    },
    //停用
    userManageBolockUp(params) {
        return fetchGet('/user/invalid?id=' + params).then(res => res.data)
    },
    //启用
    userManageLaunch(params) {
        return fetchGet("/user/active?id=" + params).then(res => res.data)
    },
    //用户管理结束--
}
export default { baseUrl, userService, detrctorTaskService, detectorItemService, detectorStrategyService, androidService, uploadService, systemService }