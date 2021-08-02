import * as instance from "../utils/authAxios"

/** 
 * 获取部门树 
 * GET
 * */
export const getDepartmentList = (params) => {
  return instance.POST('/api/department/v1/page/list', params);
}
/**
 * 编辑部门树
 * @param {Object} params 
 * @returns
 */
export const editDepartment = (params) => {
  return instance.POST('/api/department/v1/edit', params);
}
/**
 * 添加部门树
 * @param {Object} params 
 * @returns
 */
export const addDepartment = (params) => {
  return instance.POST('/api/department/v1/add', params);
}
/**
 * 删除部门树
 * @param {Object} params 
 * @returns
 */
export const deleteDepartment = (params) => {
  return instance.POST('/api/department/v1/delete', params);
}
