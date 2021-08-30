import * as instance from "../utils/authAxios"

/** 获取用户列表 GET */
export const salaryList = (params) => {
  return instance.POST('/api/salary/v1/page/list', params);
}
/**
 * 获取薪资详情
 * @returns JSON
 */
export const salaryDetail = (params) => {
  return instance.POST('/api/salary/v1/profile', params);
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
/**
 * 添加薪资详情
 * @returns JSON
 */
export const addSalaryData = (params) => {
  return instance.POST('/api/salary/v1/profile/add', params);
}
/**
 * 批量生成薪资
 * @returns JSON
 */
export const autoAddSalary = (params) => {
  return instance.POST('/api/salary/v1/autoCreate', params);
}