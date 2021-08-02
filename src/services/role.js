import * as instance from "../utils/authAxios"

//获取权限列表
export const getRoleList = (params) => {
  return instance.POST('/api/auth/v1/list', params);

}
/**
 * 编辑权限
 * @param {obj} params 
 * @returns 
 */
export const editRole = (params) => {
  return instance.POST('/api/auth/v1/edit', params);
}