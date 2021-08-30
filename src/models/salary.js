import { message } from "antd"
import {
  salaryList,
  salaryDetail,
  updateSalaryData,
  deleteSalaryData,
  addSalaryData,
  autoAddSalary,
} from "../services/salary"

export default({
  namespace:"Salary",
  state:{
    salaryList:[],
    salaryListLoading: false,
    detailSalary: {},
    isSalaryLoading: false,
  },
  reducers:{
    saveList(state,{ payload: res }) {
      return {
        ...state,
        salaryList: res, 
        salaryListLoading:false
      }
    },
    showListLoading(state, _) {
      return {
        ...state,
        salaryListLoading:true
      }
    },
    setSalaryDetail(state,{ payload: res }) {
      return {
        ...state,
        detailSalary: res,
      }
    },
    setSalaryIsLoading(state,{ payload: res }){
      return {
        ...state,
        isSalaryLoading: res,
      }
    }
  },
  effects:{
    *getList({ payload }, { call, put }) {
      yield put({ type:'showListLoading' });
      const { data: {data,code} = {} } = yield call(salaryList, payload);
      if (code === 200) {
        yield put({
          type:"saveList",
          payload: data || [],
        })
      }
    },
    *getSalaryDetail({ payload }, { call, put }) {
      yield put({type:'setSalaryIsLoading', payload: true});
      const { data } = yield call(salaryDetail, payload);
      if (data?.code === 200){
        yield put({type:'setSalaryIsLoading', payload: false});
        yield put({
          type:"setSalaryDetail",
          payload: data?.data || {},
        });
      }else{
        message.error(data?.msg || '')
      }
      return data;
    },
    *updateSalaryData({ payload }, { call, put }) {
      const { data } = yield call(updateSalaryData, payload);
      return data;
    },
    *deleteSalaryData({ payload }, { call, put }) {
      const { data } = yield call(deleteSalaryData, payload);
      return data;
    },
    *addSalaryData({ payload }, { call, put }) {
      const { data } = yield call(addSalaryData, payload);
      return data;
    },
    *autoAddSalary({ payload }, { call, put }) {
      const { data } = yield call(autoAddSalary, payload);
      return data;
    }
  }
})
