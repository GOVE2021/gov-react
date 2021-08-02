import { postLogin } from "../services/login"
import { message } from "antd";
import {login,isLogined} from "../utils/authLocal"
import { routerRedux } from 'dva'

export default {
  namespace:"Login",
  state:{
    name:'',
  },
  reducers: { },
  effects:{
    *loginIn({ payload },{ call, put }){
      const { data:{ data, code } = {} } = yield call(postLogin, payload);
      // 测试代码
      if (code === 200) {
        if(isLogined()) {
          message.success(`欢迎回来`);
          yield put(routerRedux.replace("/"))
        } else {
          login(data)
          message.success(`欢迎回来`);
          yield put(routerRedux.replace("/"))
        }
      } else {
        message.error(`用户名或密码错误！`);
      }
      
    }
  }
}
