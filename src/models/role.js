import { getRoleList, editRole } from "../services/role"
import { getDepartmentList } from '../services/department';
export default({
  namespace:"Role",
  state:{
    roleList:[],
    roleListLoading: false,
    departmentList: [],
  },
  reducers:{
    saveList(state,{payload: res}){
      return {
        ...state,
        roleList: res, 
        roleListLoading:false
      }
    },
    showListLoading(state, _){
      return{
        ...state,
        roleListLoading:true
      }
    },
    setDepartmentList(state, {payload: res}){
      return{
        ...state,
        departmentList:res
      }
    },
  },
  effects:{
    *getRoleList({ payload },{call,put}){
      yield put({type:'showListLoading'})
      const { data:{data,code} = {} } = yield call(getRoleList, payload);
      if (code === 200) {
        yield put({
          type:"saveList",
          payload: data || [],
        })
      }
    },
    *getDepartment(_,{call,put}){
      const { data: {data, code}} = yield call(getDepartmentList);
      if (code === 200) {
        yield put({
          type:"setDepartmentList",
          payload: data || [],
        })
      }
    },
    *editRole({ payload },{call,put}){
      const { data } = yield call(editRole, payload);
      return data;
    },
  }
});
