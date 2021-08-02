import * as instance from "../utils/authAxios"

//获取登录接口
export const postLogin = (params)=>{
  return instance.POST('/api/login',params)
}
