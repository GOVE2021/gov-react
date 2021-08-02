export const ADD_TYPE = 'add';
// 表格头
export const TABLE_COMMEN_TITLE_LIST = [
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
    width: 180,
  },{
    title: '单位',
    dataIndex: 'departmentName',
    align: 'center',
    width: 200,
  },
  {
    title: '薪资账期',
    dataIndex: 'salaryId',
    align: 'center',
    width: 80,
  },
  {
    title: '岗位工资(¥)',
    dataIndex: 'postSalary',
    align: 'center',
    width: 100,
  },
  {
    title: '薪级工资(¥)',
    dataIndex: 'levelSalary',
    align: 'center',
    width: 100,
  },
  {
    title: '实发工资(¥)',
    dataIndex: 'payment',
    align: 'center',
    width: 80,
  },
];
/**
* 工资基本信息构成
*/
export const ADD_SALARY_MAP = {
  // 'salaryId': '薪资账期',
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
  'ThirdWorkAward': '三等功等立功受奖类',
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

export const getAddSalaryDataList = () => {
  const sourceData = { ...ADD_SALARY_MAP, ...REDUCE_SALARY_MAP};
  let newData = {};
  Object.keys(sourceData).forEach((key) => {
    newData[key] = '';
  });
  newData['id'] = ADD_TYPE;
  return newData;
}