import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Input, DatePicker, Button, TreeSelect, Icon, ConfigProvider, Pagination, message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import ItemSalary from './ItemSalary';
import { TABLE_COMMEN_TITLE_LIST, getAddSalaryDataList } from './cont';
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
      selectMounth:  moment().format('YYYY-MM'), // 月份筛选
      itemVisible: false, // 显示个人薪资
      pageSize: 10,
      pageNum: 1,
      tableTitle: [// 表格操作栏
        {
          title: '账号操作',
          align: 'center',
          width: 180,
          fixed: 'right',
          render: this.handelDom,
        }
      ],
    };
  }

  componentDidMount() {
    this.getListByParams();
    this.props.dispatch({
      type: 'Department/getDepartmentList',
      payload: {},
    });
  }
  getListByParams = () => {
    const { dispatch } = this.props;
    const { pageNum, pageSize, selectMounth, selectName, selectDpartment } = this.state;
    dispatch({
      type: 'Salary/getList',
      payload: {
        salaryId: selectMounth, // 账期
        condition: selectName || '', // 关键字
        departmentIds: (selectDpartment || []).map(k => k.value), // 部门
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
          this.deleteSalartData(item);
        }}
      >
        删除薪资信息
    </div>
  }
  /**
   * 删除薪资信息
   * @returns null
   */
  deleteSalartData = (item) => {
    this.props.dispatch({
      type: 'Salary/deleteSalaryData',
      payload: {
        id: item?.id || '',
      }
    }).then(({ code, msg }) => {
      if(code ===200){
        this.getListByParams();
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
    } = this.state;
    const coulmnsData = userDetail?.roleType !== 1 ? [...TABLE_COMMEN_TITLE_LIST, ...tableTitle] : TABLE_COMMEN_TITLE_LIST;
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
              labelInValue={true}
              treeCheckStrictly={true}
              treeData={departmentList}
              value={selectDpartment}
              onChange={this.onDepartmentChange}
              treeCheckable={true}
              showCheckedStrategy={'SHOW_PARENT'}
              searchPlaceholder={'按部门搜索'}
              style={{width: 200, marginLeft: 10}}
              suffixIcon={<Icon type="search" />}
            />
          </>}
          <MonthPicker
            allowClear={false}
            value={moment(selectMounth || new Date(), 'YYYY/MM')}
            format={'YYYY-MM'}
            placeholder="请选择账期"
            style={{ marginLeft: 10,width: 120 }} 
            onChange={this.mounthChange}
          />
          {userDetail?.roleType !== 1 && 
            <Button
              type="primary"
              style={{marginLeft: 10}}
              onClick={() => {
                this.showItem(getAddSalaryDataList() || {})
              }}
            >添加薪资</Button>
          }
        </div>
        <ConfigProvider locale={zhCN}>
          <Table
            columns={coulmnsData} 
            dataSource={salaryList?.list || []} 
            rowKey={record => record._id} 
            scroll={{ x: 1200, y: '100%' }}
            loading={salaryListLoading}
            onRow={record => {
              return {
                onClick: () => this.showItem(record), // 点击行
              };
            }}
            pagination={false}
          />
          <div className={style.bottomBar}>
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
