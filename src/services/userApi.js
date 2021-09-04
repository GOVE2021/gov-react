import * as instance from "../utils/authAxios"

/** 获取用户列表 GET */
export const usersList = (params) => {
  return instance.POST('/api/employee/v1/page/list', params)
}
/**
 * 获取详情
 * @returns 
 */
export const getDetail = () => {
  return instance.POST('/api/employee/v1/userInfo')
}
/**
 * 修改员工信息
 */
export const editUserDetail = (params) => {
  return instance.POST('/api/employee/v1/profile/edit', params);
}
/**
 * 新增员工
 */
export const addUserInfo = (params) => {
  return instance.POST('/api/employee/v1/profile/add', params);
}
/**
 * 删除员工
 */
export const deleteUser = (params) => {
  return instance.POST('/api/employee/v1/profile/delete', params);
}
/**
 * 修改当前账户的密码
 */
export const updatePsd = (params) => {
  return instance.POST('/api/employee/v1/userInfo/updatepassword', params);
}
/**
 * 重置某个用户的密码
 */
export const resetUserPsd = (params) => {
  return instance.POST('/api/employee/v1/profile/resetpassword', params);
}
/**
 * 搜索人员信息
 */
 export const getPersonByKeywords = (params) => {
  return instance.POST('/api/employee/v1/simple/list', params);
}
//首页未完成列表
export const unfinishedList = (params)=>{
  return instance.POST('/api/salary/v1/unfinished/list',params)
}