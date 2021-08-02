import * as instance from "../utils/authAxios"

/** 获取用户列表 GET */
export const salaryList = (params) => {
  return instance.POST('/api/salary/v1/page/list', params);
}
/**
 * 获取薪资详情
 * @returns JSON
 */
export const salaryDetail = () => {
  return instance.POST('/api/salary/detail');
}
/**
 * 修改薪资详情
 * @returns JSON
 */
export const updateSalaryData = (params) => {
  return instance.POST('/api/salary/v1/profile/edit', params);
}
/**
 * 修改薪资详情
 * @returns JSON
 */
export const deleteSalaryData = (params) => {
  return instance.POST('/api/salary/v1/profile/delete', params);
}