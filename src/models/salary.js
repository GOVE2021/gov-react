import {
  salaryList,
  salaryDetail,
  updateSalaryData,
  deleteSalaryData,
} from "../services/salary"

export default({
  namespace:"Salary",
  state:{
    salaryList:[],
    salaryListLoading: false,
    salaryDetail: {},
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
      const { data } = yield call(salaryDetail, payload);
      return data;
    },
    *updateSalaryData({ payload }, { call, put }) {
      const { data } = yield call(updateSalaryData, payload);
      return data;
    },
    *deleteSalaryData({ payload }, { call, put }) {
      const { data } = yield call(deleteSalaryData, payload);
      return data;
    }
  }
})
