import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Table,
  Input,
  Radio,
  DatePicker,
  Button,
  Modal,
  TreeSelect,
  Icon,
  ConfigProvider,
  Pagination,
  message
} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import ItemSalary from './ItemSalary';
import {
  BASE_TITLE_LIST,
  IN_WORK_TITLE_LIST,
  OUT_WORK_TITLE_LIST,
  ADD_TYPE,
  crerateTitleTotal,
} from './cont';
import { PERSON_TYPE_LIST, showPaginationString } from '../utils';
import zhCN from 'antd/es/locale/zh_CN'; 
import style from './style.css';

moment.locale('zh-cn');

const { MonthPicker } = DatePicker;
let timer = null;
class salary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectDpartment: null, // 部门关键字
      selectName: null, // 姓名关键字
      selectEmployeeStatus: null, // 搜索员工状态
      selectMounth:  moment().format('YYYY-MM'), // 月份筛选
      itemVisible: false, // 显示个人薪资
      deleteItem: null, // 删除个人薪资
      deleteVisible: false, // 删除薪资弹窗
      deleteLoading: false,
      pageSize: 10,
      pageNum: 1,
      loginUserId: null, // 登陆账号id
      tableTitle: [// 表格操作栏
        {
          title: '账号操作',
          align: 'center',
          width: 120,
          fixed: 'right',
          render: this.handelDom,
        }
      ],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'Department/getDepartmentList',
      payload: {},
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { userDetail, dispatch } = nextProps
    const {
      loginUserId, 
      pageNum,
      pageSize,
      selectDpartment,
      selectName,
      selectMounth
    } = prevState;
    if (userDetail?.id !== loginUserId && userDetail?.id) {
      dispatch({
        type: 'Salary/getList',
        payload: {
          salaryId: selectMounth, // 账期
          condition: selectName || '', // 关键字
          departmentIds: (selectDpartment || []).map(k => k.value), // 部门
          employeeStatus: userDetail?.employeeStatus,
          pageNum,
          pageSize,
        },
      });
      return {
        selectEmployeeStatus: userDetail?.employeeStatus,
        loginUserId: userDetail?.id,
      };
    }
  }

  getListByParams = () => {
    const { dispatch } = this.props;
    const { pageNum, pageSize, selectMounth, selectName, selectDpartment, selectEmployeeStatus } = this.state;
    dispatch({
      type: 'Salary/getList',
      payload: {
        salaryId: selectMounth, // 账期
        condition: selectName || '', // 关键字
        departmentIds: (selectDpartment || []).map(k => k.value), // 部门
        employeeStatus: selectEmployeeStatus,
        pageNum,
        pageSize,
      },
    });
  }
  /**
   * 姓名搜索输入
   * @param {String} ename
   */
  onNameChange = (name) => {
    this.setState({ selectName: name }, () => {
      clearTimeout(timer);
      setTimeout(() => {
        this.getListByParams();
      }, 800);
    });
  }
  /**
   * 部门搜索变化
   * @param {Array} value 
   */
  onDepartmentChange = value => {

    this.setState({ selectDpartment: value }, () => {
      this.getListByParams();
    });
  };
  /**
   * 月份变化
   * @returns null
   */
  mounthChange = (value) => {
    this.setState({ selectMounth: moment(value).format('YYYY-MM') }, () => {
      this.getListByParams();
    })
  }
  /**
   * 员工在职/退休状态改变
   * @param {Number} value 
   */
  employeeStatusChange = (value) =>{
    this.setState({ selectEmployeeStatus: value?.target?.value }, () => {
      this.getListByParams();
    });
  }
  /**
   * 查看单个人的薪资
   * @returns null
   */
  showItem = (data) => {
    this.setState({ itemVisible: true, itemData: data});
  }
  /**
   * 页码改变时触发
   * @param {number} page 
   * @param {number} pageSiz 
   */
  onShowNumChange = (page, pageSize) => {
    this.setState({
      pageSize,
      pageNum: page,
    }, ()=>{
      this.getListByParams();
    });
  }
  /**
   * 每页大小改变
   * @param {number} current 
   * @param {number} size 
   */
  onShowSizeChange = (current, size) => {
    this.setState({
      pageSize: size,
      pageNum: current,
    }, ()=>{
      this.getListByParams();
    });
  }
  /**
   * 渲染操作列
   * @returns Dom
   */
   handelDom = (item) => {
    return <div
        className={style.handleCss}
        onClick={(e) => {
          e.stopPropagation();// 阻止合成事件间的冒泡
          this.setState({
            deleteVisible: true,
            deleteItem: item,
          })
        }}
      >
        删除薪资
    </div>
  }
  /**
   * 删除薪资信息
   * @returns null
   */
  deleteSalartData = () => {
    const item = this.state.deleteItem;
    this.setState({deleteLoading: true});
    this.props.dispatch({
      type: 'Salary/deleteSalaryData',
      payload: {
        id: item?.id || '',
        employeeStatus: item?.employeeStatus || '',
      }
    }).then(({ code, msg }) => {
      this.setState({deleteLoading: false});
      if(code ===200){
        this.getListByParams();
        this.setState({deleteVisible: false});
        message.success(msg);
      } else {
        message.error(msg);
      }
    })
  }
  render() {
    const {
      salaryList,
      salaryListLoading,
      departmentList,
      userDetail,
    } = this.props;
    const {
      selectDpartment,
      selectName,
      selectMounth,
      itemData,
      itemVisible,
      tableTitle,
      selectEmployeeStatus,
      deleteVisible,
      deleteItem,
      deleteLoading,
      pageSize,
      pageNum,
    } = this.state;
    const employTitleList = selectEmployeeStatus === PERSON_TYPE_LIST[0].key ? IN_WORK_TITLE_LIST : OUT_WORK_TITLE_LIST;
    const coulmnsData = userDetail?.roleType !== 1 ? [...BASE_TITLE_LIST, ...employTitleList, ...tableTitle] : [...BASE_TITLE_LIST, ...employTitleList];
    const titleData = selectEmployeeStatus === PERSON_TYPE_LIST[0].key ? salaryList?.salaryInfoTotalDto : salaryList?.retireTotalDto;
    return (
      <div className={style.tableList}>
        <div className={style.selectBar}>
          {userDetail?.roleType !== 1 &&<>
            <Input
              allowClear
              placeholder="按姓名/身份证号搜索"
              onChange={(e) => this.onNameChange(e?.target?.value)}
              style={{ width: 200, height:30 }}
              value={selectName || undefined}
              suffix={<Icon type="user" />}
            />
            <TreeSelect
              allowClear
              multiple
              maxTagCount={3}
              showSearch={false}
              labelInValue={true}
              treeCheckStrictly={true}
              treeData={departmentList}
              value={selectDpartment}
              dropdownClassName={style.dropdownClass}
              onChange={this.onDepartmentChange}
              treeCheckable={true}
              placeholder={'按部门搜索'}
              style={{width: 200, marginLeft: 10 }}
            />
          </>}
          <MonthPicker
            allowClear={false}
            value={moment(selectMounth || new Date(), 'YYYY/MM')}
            format={'YYYY-MM'}
            placeholder="请选择账期"
            dropdownClassName={style.dropdownClass}
            style={{ marginLeft: 10,width: 120, height: 30 }} 
            onChange={this.mounthChange}
          />
          {userDetail?.roleType !== 1 && 
            <>
              <Radio.Group
                className={style.radioEmploy}
                onChange={this.employeeStatusChange}
                value={selectEmployeeStatus}
              >
                {(PERSON_TYPE_LIST || []).map(item => {
                  return <Radio value={item.key}>{item.title}</Radio>
                })}
              </Radio.Group>
              <Button
                type="primary"
                style={{marginLeft: 10}}
                onClick={() => {
                  this.showItem({ userId: ADD_TYPE })
                }}
              >添加薪资</Button>
            </>
          }
        </div>
        <ConfigProvider locale={zhCN}>
          <Table
            columns={crerateTitleTotal(titleData,coulmnsData,selectEmployeeStatus)} 
            dataSource={salaryList?.list || []} 
            rowKey={record => record._id} 
            scroll={{
              x: 1200,
              y: 'calc(100vh - 335px)',
              scrollToFirstRowOnChange: true,
            }}
            loading={salaryListLoading}
            onRow={record => {
              return {
                onClick: () => this.showItem(record), // 点击行
              };
            }}
            pagination={false}
          />
          <div className={style.bottomBar}>
            {showPaginationString(pageNum, pageSize, salaryList?.total)}
            <Pagination
              className={style.pagination}
              showSizeChanger={true}
              showQuickJumper={true}
              defaultCurrent={1}
              total={salaryList?.total}
              onChange={this.onShowNumChange}
              onShowSizeChange={this.onShowSizeChange}
            />
          </div>
        </ConfigProvider>
        {itemData && <ItemSalary 
          itemData={itemData} 
          itemVisible={itemVisible} 
          roleType={userDetail?.roleType}
          visibleChange={(boolean) => {
            this.getListByParams();
            this.setState({
              itemVisible:boolean,
              itemData: {},
            });
          }}
        />}

        <Modal
          title={`确认删除${deleteItem?.realname || '-'}的薪资？`}
          visible={deleteVisible}
          maskClosable={false}
          closable={false}
          onCancel={() => {
            this.setState({deleteVisible: false});
          }}
          onOk={this.deleteSalartData}
          cancelText={'取消'}
          okText={'删除'}
          okType={'danger'}
          okButtonProps={{
            disabled: deleteLoading,
            loading: deleteLoading
          }}
          cancelButtonProps={{disabled: deleteLoading}}
        >
          <p>{`确认删除${deleteItem?.salaryId}账期的薪资？`}</p>
          <p>
            <span style={{color: 'red',marginLeft: 10}}>
              {'删除后不可恢复！'}
            </span>
          </p>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userDetail: state.Users.userDetail || {},
  salaryList: state.Salary?.salaryList,
  salaryListLoading: state.Salary?.salaryListLoading,
  departmentList: state.Department?.departmentList,
});
export default connect(mapStateToProps)(salary);
