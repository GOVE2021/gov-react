import {
  usersList,
  getDetail,
  editUserDetail,
  addUserInfo,
  deleteUser,
  updatePsd,
  resetUserPsd,
  getPersonByKeywords,
} from "../services/userApi";
import { getDepartmentList } from '../services/department';
export default({
  namespace:"Users",
  state:{
    userList:[],
    userListLoading: false,
    departmentList: [],
    userDetail: {},
  },
  reducers:{
    saveList(state,{payload: res}){
      return {
        ...state,
        userList: res, 
        userListLoading:false
      }
    },
    showListLoading(state, _){
      return{
        ...state,
        userListLoading:true
      }
    },
    setDepartmentList(state, {payload: res}){
      return{
        ...state,
        departmentList:res
      }
    },
    setUserDetail(state, {payload: res}){
      return {
        ...state,
        userDetail: res,
      }
    }
  },
  effects:{
    *getList({ payload },{call,put}){
      yield put({type:'showListLoading'})
      const { data:{ data, code } = {} } = yield call(usersList, payload);
      if (code === 200) {
        yield put({
          type:"saveList",
          payload: data || [],
        })
      }
    },
    *getDepartment(_,{call,put}){
      const { data: { data, code }} = yield call(getDepartmentList);
      if (code === 200) {
        yield put({
          type:"setDepartmentList",
          payload: data || [],
        })
      }
    },
    *getDetail(_, { call, put }){
      const { data :{ data, code, msg } } = yield call(getDetail);
      if(code === 200){
        yield put({
          type:"setUserDetail",
          payload: data || {},
        })
        sessionStorage.setItem('login_user_key', JSON.stringify(data?.roleType));
      }
      return { code, msg };
    },
    *editUserDetail({ payload }, { call, put }){
      const { data } = yield call(editUserDetail, payload);
      return data;
    },
    *addUserInfo({ payload }, { call, put }){
      const { data } = yield call(addUserInfo, payload);
      return data;
    },
    *deleteUser({ payload }, { call, put }){
      const { data } = yield call(deleteUser, payload);
      return data;
    },
    *updatePsd({ payload }, { call, put }){
      const { data } = yield call(updatePsd, payload);
      return data;
    },
    *resetUserPsd({ payload }, { call, put }){
      const { data } = yield call(resetUserPsd, payload);
      return data;
    },
    *getPersonByKeywords({ payload }, { call, put }){
      const { data } = yield call(getPersonByKeywords, payload);
      return data;
    }
  }
})
