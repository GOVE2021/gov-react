import {
  EDU_BG_LIST,
  SEX_LIST,
  DUTY_LIST,
  PERSON_TYPE_LIST,
  PERSON_STATUE_LIST,
  showTextString,
} from '../utils';


/**
 * 个人信息字典
 */
export const USER_TITLE_MAP = {
  // 'id': '工号',
  'realname': '姓名',
  'idNo': '身份证号',
  'gender': '性别',
  'birthday': '出生年月',
  'employeeStatus': '人员类别',
  'employeeType': '人员身份',
  'dutyId': '职务/职称',
  'highestDegree': '学历',
  'beginWorkTime': '参加工作时间',
  'department': '所属部门',
}
export const HANDEL_MAP = [
  {
    name: '重置密码',
    key: 'reset',
    type: 'primary',
    sub: '点击确认进行重置密码',
    sub1: '重置后密码默认为:',
    defPsd: '身份证后 6位',
  },
  {
    name: '删除用户',
    key: 'delete',
    type: 'danger',
    sub: '点击确认后，删除账号',
    sub1: '',
    defPsd: '注意，删除后账号不可恢复！',
  }
]
export const USER_TABLE_DEFU_ARR = [
  {
    title: '姓名',
    dataIndex: 'realname',
    align: 'center',
    width: 80,
    ellipsis: true,
    fixed: 'left',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    align: 'center',
    width: 60,
    render: (i) => showTextString(i, SEX_LIST),
  },
  {
    title: '身份证号码',
    dataIndex: 'idNo',
    align: 'center',
    width: 150,
  },
  {
    title: '单位',
    dataIndex: 'departmentName',
    align: 'center',
    width: 200,
  },
  {
    title: '人员类别',
    dataIndex: 'employeeStatus',
    align: 'center',
    width: 80,
    render: (i) => showTextString(i, PERSON_TYPE_LIST),
  },
  // {
  //   title: '人员身份',
  //   dataIndex: 'employeeType',
  //   align: 'center',
  //   width: 80,
  //   render: (i) => showTextString(i, PERSON_STATUE_LIST),
  // },
  // {
  //   title: '职务/职称',
  //   dataIndex: 'dutyId',
  //   align: 'center',
  //   width: 100,
  //   render: (i, record) => {
  //     const statueObj = PERSON_STATUE_LIST.find(n => Number(n.key) === Number(record.employeeType)) || {};
  //     return showTextString(i, DUTY_LIST[statueObj?.subKey]);
  //   }
  // },
  {
    title: '出生年月',
    dataIndex: 'birthday',
    align: 'center',
    width: 100,
  },
  {
    title: '参加工作时间',
    dataIndex: 'beginWorkTime',
    align: 'center',
    width: 100,
  },
  {
    title: '学历',
    dataIndex: 'highestDegree',
    align: 'center',
    width: 80,
    render: (i) => showTextString(i, EDU_BG_LIST),
  },
]