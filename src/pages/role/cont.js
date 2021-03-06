
import { 
  ROLE_LIST_MAP,
  showTextString
} from '../utils';
// 表格头
export const TABLE_COMMEN_TITLE_LIST = [
  {
    title: '用户名',
    dataIndex: 'realname',
    align: 'center',
    width: 100,
    fixed: 'left',
  },
  {
    title: '身份证号码',
    dataIndex: 'idNo',
    align: 'center',
    width: 200,
  },{
    title: '管理部门',
    dataIndex: 'departments',
    align: 'center',
    width: '30%',
    ellipsis: true,
    render: (arr, item) => {
      let partString = '';
      if(item.roleId === ROLE_LIST_MAP[0].key){
        return '全部部门';
      }
      if(item.roleId === ROLE_LIST_MAP[2].key){
        return '-';
      }
      (arr || []).forEach((k, i) => {
        partString = partString + (k?.name||'')
        if(i !== arr.length-1){
          partString = partString + ', ';
        }
      });
      return partString;
    }
  },
  {
    title: '角色',
    dataIndex: 'roleId',
    align: 'center',
    width: 150,
    render: (e) => {
      let text = showTextString(e, ROLE_LIST_MAP);
      if (e === 1) {
        return text;
      }
      if(e === 2){
        return <span style={{color: '#D2691E'}}>{text}</span>
      }
      return <span style={{color: '#800080'}}>{text}</span>
    }
  },
];