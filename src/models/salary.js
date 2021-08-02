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
    isDetailLoading: false,
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
    setDetailLoading(state, { payload }) {
      return {
        ...state,
        isDetailLoading: payload
      }
    },
    setDetail(state, { payload }) {
      return {
        ...state,
        salaryDetail: payload,
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
      yield put({ type:'setDetailLoading', payload: true });
      const { data: { data, code } = {} } = yield call(salaryDetail);
      if(code === 200) {
        yield put({ type: 'setDetail', payload:  data})
        yield put({ type: 'setDetailLoading', payload:  false})
      }
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
