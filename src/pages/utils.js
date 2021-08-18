/**
 * home页显示的字段信息
 */
export const USER_KEY_MAP = [
  {
    label: '姓名',
    key: 'realname',
  },
  {
    label: '类别',
    key: 'employeeStatus',
  },
  {
    label: '部门',
    key: 'departmentName',
  },
  {
    label: '权限',
    key: 'roleType',
  },
];
/**
 * 性别
 */
export const SEX_LIST = [
  {
    title: '男',
    key: 1,
  },
  {
    title: '女',
    key: 2,
  }
]
/**
 * 单位类别
 * 2-“公检法司”
 * 1-普通单位
 */
export const DEPART_TYPE_LIST = [
  {
    title: '公检法司',
    key: 2,
  },
  {
    title: '普通单位',
    key: 1,
  }
]
/**
 * 权限字段
 */
export const ROLE_LIST_MAP = [
  {
    name: '超级管理员',
    key: 3,
  },{
    name: '管理员',
    key: 2,
  },{
    name: '普通员工',
    key: 1,
  },
];
/**
 * 人员类别
 * （在职、退休）
 */
export const PERSON_TYPE_LIST = [
  {
    title: '在职',
    key: 1,
  },
  {
    title: '退休',
    key: 2,
  }
];
/**
 * 人员身份
 * （公务员、参照公务员管理人员、事业专业技术、事业管理、技术工人）
 */
export const PERSON_STATUE_LIST = [
  {
    title: '公务员',
    key: 1,
    subKey: 'GOV_PERSON_LIST',
  },
  {
    title: '参照公务员管理人员',
    key: 2,
    subKey: 'GOV_PERSON_LIST',
  },
  {
    title: '事业专业技术',
    key: 3,
    subKey: 'TECHNIQUE_LIST',
  },
  {
    title: '事业管理',
    key: 4,
    subKey: 'CAREER_LIST',
  },
  {
    title: '技术工人',
    key: 5,
    subKey: 'WORKER_LIST',
  },
];
/**
 * 公务员、参照公务员管理人员
 * 正厅以上、副厅、正处、副处、正科、副科、科员、办事员
 */
export const GOV_PERSON_LIST = [{
    title: '正厅以上',
    key: 1,
  },
  {
    title: '副厅',
    key: 2,
  },
  {
    title: '正处',
    key: 3,
  },
  {
    title: '副处',
    key: 4,
  },
  {
    title: '正科',
    key: 5,
  },
  {
    title: '副科',
    key: 6,
  },
  {
    title: '科员',
    key: 7,
  },
  {
    title: '办事员',
    key: 8,
  },
];
/**
 * 事业专业技术
 * 专业技术（5-13级）
 */
export const TECHNIQUE_LIST = [
  {
    title: '专业技术5级',
    key: 9,
  },
  {
    title: '专业技术6级',
    key: 10,
  },
  {
    title: '专业技术7级',
    key: 11,
  },
  {
    title: '专业技术8级',
    key: 12,
  },
  {
    title: '专业技术9级',
    key: 13,
  },
  {
    title: '专业技术10级',
    key: 14,
  },
  {
    title: '专业技术11级',
    key: 15,
  },
  {
    title: '专业技术12级',
    key: 16,
  },
  {
    title: '专业技术13级',
    key: 17,
  },
];
/**
 * 事业管理
 * 管理岗（1-10级）、初级工、中级工、高级工
 */
export const CAREER_LIST = [
  {
    title: '管理岗1级',
    key: 18,
  },
  {
    title: '管理岗2级',
    key: 19,
  },
  {
    title: '管理岗3级',
    key: 20,
  },
  {
    title: '管理岗4级',
    key: 21,
  },
  {
    title: '管理岗5级',
    key: 22,
  },
  {
    title: '管理岗6级',
    key: 23,
  },
  {
    title: '管理岗7级',
    key: 24,
  },
  {
    title: '管理岗8级',
    key: 25,
  },
  {
    title: '管理岗9级',
    key: 26,
  },
  {
    title: '管理岗10级',
    key: 27,
  },
];
/**
 * 技术工人
 * 初级工、中级工、高级工
 */
export const WORKER_LIST = [
  {
    title: '初级工',
    key: 28,
  },
  {
    title: '中级工',
    key: 29,
  },
  {
    title: '高级工',
    key: 30,
  },
];
/**
 * 学历
 */
export const EDU_BG_LIST = [
  {
    title: '小学',
    key: 1,
  },
  {
    title: '初中',
    key: 2,
  },
  {
    title: '高中',
    key: 3,
  },
  {
    title: '中专',
    key: 4,
  },
  {
    title: '大专',
    key: 5,
  },
  {
    title: '本科',
    key: 6,
  },
  {
    title: '硕士研究生',
    key: 7,
  },
  {
    title: '博士研究生',
    key: 8,
  },
];

/**
 * 职务/职称
 */
export const DUTY_LIST = {
  'GOV_PERSON_LIST': GOV_PERSON_LIST,
  'TECHNIQUE_LIST': TECHNIQUE_LIST,
  'CAREER_LIST': CAREER_LIST,
  'WORKER_LIST': WORKER_LIST,
}
/**
 * 转译中文名称
 * @param {当前数据} key 
 * @param {转译列表} list 
 * @returns string
 */
export const showTextString = (key,list) => {
  if(list && Array.isArray(list)){
    const dataItem = (list || []).find(n => Number(n.key) === Number(key)) || {};
    return dataItem?.title || dataItem?.name || '--';
  }else{
    return key?.length ? key : '--';
  }
}
/**
 * 转换部门数据
 * @param {Array} arr 
 * @returns 
 */
export const transDepartmentIds = (arr) => {
  let idsArr = [];
  (arr || []).forEach((k, i) => {
    idsArr.push({
      label: k?.name,
      value: k?.id,
    })
  });
  return idsArr;
}

// 统计字符长度
export const getByteLen = (string) => {
  let len = 0;
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) > 127 || string.charCodeAt(i) === 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
};
/**
 * 页码显示
 */
export const showPaginationString = (pageNum,pageSize,total) => {
  const startNum = (pageNum - 1) * pageSize + 1;
  const endNum = (pageNum * pageSize) > total? total: (pageNum * pageSize);
  return <div style={{paddingTop: 25}}>
    {`共 ${total} 条数据, 当前页显示第 ${startNum}-${endNum} 条`}
  </div>
} 