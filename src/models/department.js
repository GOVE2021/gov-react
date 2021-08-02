import { message } from 'antd';
import {
  getDepartmentList,
  editDepartment,
  addDepartment,
  deleteDepartment,
} from '../services/department';

export default({
  namespace: 'Department',
  state: {
    departmentList: [], //部门列表
    departmentIsLoading: false, // 是否在刷新列表
  },
  reducers: {
    setIsLoad(state, _){
      return {
        ...state,
        departmentIsLoading: true,
      }
    },
    setDepartmentList(state, {payload: res}){
      return {
        ...state,
        departmentList: res,
        departmentIsLoading: false,
      }
    },
  },
  effects: {
    *getDepartmentList({ payload }, { call, put }) {
      yield put({type: 'setIsLoad'});
      const { data: { code, data, msg } = {} } = yield call(getDepartmentList, payload);
      if(code === 200){
        yield put({type: 'setDepartmentList', payload: data});
      } else {
        message.error(msg);
      }
      return [data];
    },
    *editDepartment({ payload }, { call, put }) {
      const { data } = yield call(editDepartment, payload);
      return data;
    },
    *addDepartment({ payload }, { call, put }) {
      const { data } = yield call(addDepartment, payload);
      return data;
    },
    *deleteDepartment({ payload }, { call, put }) {
      const { data } = yield call(deleteDepartment, payload);
      return data;
    }
  }
})