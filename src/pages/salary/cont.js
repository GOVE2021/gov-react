import { PERSON_TYPE_LIST, getByteLen } from '../utils';
import { cloneDeep } from 'lodash';


export const ADD_TYPE = 'add';
const transDeductDom = (k) => {
  const showStr = k ? '-' + k : '--';
  return <span style={{color: 'DarkMagenta'}}>{showStr}</span>
}
const transAddDom = (k) => { 
  return <span style={{ color: 'Chocolate' }}>{k || '--'}</span>
}
const allPayDom  =  (k) => { 
  return <span style={{ color: 'DarkGreen' }}>{k || '--'}</span>
}
/** 
 * 基本信息表格头
 * */ 
export const BASE_TITLE_LIST = [
  {
    title: '姓名',
    dataIndex: 'realname',
    align: 'center',
    width: 100,
    ellipsis: true,
    fixed: 'left',
  },
  {
    title: '身份证号码',
    dataIndex: 'idNo',
    align: 'center',
    ellipsis: true,
    width: 200,
  },{
    title: '单位',
    dataIndex: 'departmentName',
    align: 'center',
    ellipsis: true,
    width: 200,
  },
  {
    title: '薪资账期',
    dataIndex: 'salaryId',
    align: 'center',
    width: 120,
  },
]
/**
 * 在职员工表头
 */
export const IN_WORK_TITLE_LIST = [
  {
    dataIndex: 'shouldPayment',
    title: '应发总计',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'withhold',
    title: '代扣总计',
    align: 'center',
    width: 100,
    render: transDeductDom,
  },
  {
    dataIndex: 'payment',
    title: '实发总计',
    align: 'center',
    width: 120,
    render: allPayDom,
  },
  {
    title: '职务岗位工资',
    dataIndex: 'dutySalary',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    title: '级别技术等级工资',
    dataIndex: 'technicalSalary',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'postSalary',
    title: '岗位工资',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'levelSalary',
    title: '薪级工资',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'workAllowance',
    title: '工作津贴(基础绩效)',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'performanceAllowance',
    title: '生活津贴(奖励绩效)',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'retainedAllowance',
    title: '保留地区工资补贴',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'traffic',
    title: '交通费',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'nursesTeachersSalary',
    title: '教护职工工资提高10%',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'policeRankAllowance',
    title: '警衔津贴',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'teachingNursingAllowance',
    title: '教龄津贴',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'hardshipAllowance',
    title: '艰苦边远地区津贴',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'townshipAllowance',
    title: '乡镇津贴',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'inspectAllowance',
    title: '纪检监察办案人员补贴',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'coolingAllowance',
    title: '降温费',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'heatingAllowance',
    title: '取暖费',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'oneChildAllowance',
    title: '独生子女费',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'yearTargetAward',
    title: '平时考核奖',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'normalAward',
    title: '年度目标责任考核奖',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'yearAward',
    title: '年终一次性奖金',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'outstandingAward',
    title: '年度考核优秀公务员',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'thirdWorkAward',
    title: '三等功等立功受奖类',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'censorateAward',
    title: '法检绩效奖金',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'disabledAllowance',
    title: '伤残补助',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'otherAllowance',
    title: '代发其他',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'pension',
    title: '养老金',
    align: 'center',
    width: 100,
    render: transDeductDom,
  },
  {
    dataIndex: 'occupationalAnnuity',
    title: '职业年金',
    align: 'center',
    width: 100,
    render: transDeductDom,
  },
  {
    dataIndex: 'housingFund',
    title: '住房公积金',
    align: 'center',
    width: 100,
    render: transDeductDom,
  },
  {
    dataIndex: 'personalTax',
    title: '个税',
    align: 'center',
    width: 100,
    render: transDeductDom,
  },
  {
    dataIndex: 'medicalInsurance',
    title: '医疗保险',
    align: 'center',
    width: 100,
    render: transDeductDom,
  },
  {
    dataIndex: 'otherWithhold',
    title: '代扣其他',
    align: 'center',
    width: 100,
    render: transDeductDom,
  },
];
/**
 * 退休人员表头
 */
export const OUT_WORK_TITLE_LIST = [
  {
    dataIndex: 'shouldPayment',
    title: '应发总计',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'payment',
    title: '实发总计',
    align: 'center',
    width: 120,
    render: allPayDom,
  },
  {
    dataIndex: 'pension',
    title: '基础养老金',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'personalPension',
    title: '个人账户养老金',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'transitionalPension',
    title: '过渡性养老金',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'basePension',
    title: '基本养老金',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'subsidyTotal',
    title: '补贴总额',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'lifeSubsidy',
    title: '生活补贴',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'reformSubsidy',
    title: '改革性补贴',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'financeSubsidy',
    title: '财政代发金额',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'retainedAllowance',
    title: '保留地区补贴',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
  {
    dataIndex: 'withholding',
    title: '补扣发',
    align: 'center',
    width: 100,
    render: transAddDom,
  },
]
/**
* 工资基本信息构成
*/
export const ADD_SALARY_MAP = {
  'dutySalary': '职务岗位工资',
  'technicalSalary': '级别技术等级工资',
  'postSalary': '岗位工资',
  'levelSalary': '薪级工资',
  'workAllowance': '工作津贴（基础绩效)',
  'performanceAllowance': '生活津贴（奖励绩效）',
  'retainedAllowance': '保留地区工资补贴',
  'traffic': '交通费',
  'nursesTeachersSalary': '教护职工工资提高10%',
  'policeRankAllowance': '警衔津贴',
  'teachingNursingAllowance': '教龄津贴',
  'hardshipAllowance': '艰苦边远地区津贴',
  'townshipAllowance': '乡镇津贴',
  'inspectAllowance': '纪检监察办案人员补贴',
  'coolingAllowance': '降温费',
  'heatingAllowance': '取暖费',
  'oneChildAllowance': '独生子女费',
  'yearTargetAward': '平时考核奖',
  'normalAward': '年度目标责任考核奖',
  'yearAward': '年终一次性奖金',
  'outstandingAward': '年度考核优秀公务员',
  'thirdWorkAward': '三等功等立功受奖类',
  'censorateAward': '法检绩效奖金',
  'disabledAllowance': '伤残补助',
  'otherAllowance': '其他',
}
/**
 * 代扣项目信息
 */
export const REDUCE_SALARY_MAP = {
  'pension': '养老金',
  'occupationalAnnuity': '职业年金',
  'housingFund': '住房公积金',
  'personalTax': '个税',
  'medicalInsurance': '医疗保险',
  'otherWithhold': '其他',
}
/**
 * 退休人员薪资
 */
 export const OLD_WORKER_SALARY_MAP = {
  // 'id': '薪资ID',
  // 'userId': '员工ID',
  // 'payment': '实发金',
  // 'salaryId': '薪资账期',
  'pension': '基础养老金',
  'personalPension': '个人账户养老金',
  'transitionalPension': '过渡性养老',
  'basePension': '基本养老金',
  'subsidyTotal': '补贴总额',
  'lifeSubsidy': '生活补贴',
  'reformSubsidy': '改革性补贴',
  'financeSubsidy': '财政代发金',
  'retainedAllowance': '保留地区补贴',
  'withholding': '补扣',
};

export const getAddSalaryDataList = (e) => {
  const sourceData = PERSON_TYPE_LIST[1].key === e ? OLD_WORKER_SALARY_MAP : { ...ADD_SALARY_MAP, ...REDUCE_SALARY_MAP};
  let newData = {};
  Object.keys(sourceData).forEach((key) => {
    newData[key] = '';
  });
  newData['userId'] = ADD_TYPE;
  return newData;
}
/**
 * 计算合计金额
 */
export const calculateTotal = (objKey,detail) => {
  let countPay = 0;
  Object.keys(objKey).forEach( key => {
    if(Number(detail[key])){
      countPay = countPay + (Number(detail[key]) * 100);
    }
  });
  return countPay/100;
}
/**
 * 生成总计表头
 */
export const crerateTitleTotal = (data = {},titleArr,status) => {
  const newTitleArr = [];
  const currentSorceList = status === PERSON_TYPE_LIST[0].key ? IN_WORK_TITLE_LIST : OUT_WORK_TITLE_LIST;
  cloneDeep(titleArr).forEach(k => {
    const isShow = currentSorceList.some(n => n?.dataIndex === k.dataIndex);
    const salaryStr = `总计: ${data?.[k.dataIndex + 'Total'] || '--'}`;
    const titleLen = getByteLen(k.title);
    const salaryLen = getByteLen(salaryStr);
    const showLen = titleLen > salaryLen ? titleLen : salaryLen;
    if(isShow){
      k.title = (
        <div>
          <div>{k.title}</div>
          <div style={{color: '#1890ff',fontSize: 15, transform: 'scale(0.8)', fontWeight: 400}}>{salaryStr}</div>
        </div>
      )
      k.width = Math.ceil(showLen * 12);
    }
    newTitleArr.push(k);
  })
  return newTitleArr;
}
