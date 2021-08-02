import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Input, TreeSelect, Icon, Modal, Button, ConfigProvider, Pagination, message } from 'antd';
import { HANDEL_MAP, USER_TABLE_DEFU_ARR } from './cont';
import UserDetail from './UserDetail';
import zhCN from 'antd/es/locale/zh_CN'; 

import style from './style.css';

let nameTimer = null;
class users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resetOrDelectBtnLoading: false, // 重置或删除按钮状态
      selectDpartment: [], // 部门关键字
      selectName: '', // 姓名关键字
      isAddType: false, // 是否为编辑状态
      itemVisible: false, // 是否显示弹窗
      itemData: null, // 当前个人信息
      resetOrDeleteVisible: false, // 重置或删除弹窗状态
      handelKeyItem: null, // 弹窗类型：obj {name: '重置',key: 'reset'} or {name: '删除',key: 'delete'}
      pageSize: 10,
      pageNum: 1,
      tableTitle: [// 表格头
        {
          title: '账号操作',
          align: 'center',
          width: 180,
          fixed: 'right',
          render: this.resetPsdRender,
        }
      ],
    };
  }

  componentDidMount() {
    this.getUserList();
    this.props.dispatch({
      type: 'Users/getDepartment',
      payload: {},
    });
  }
  /**
   * 根据条件获取列表
   */
  getUserList = () => {
    const {
      pageSize,
      pageNum,
      selectDpartment, // 部门关键字
      selectName, // 姓名关键字
    } = this.state;
    this.props.dispatch({
      type: 'Users/getList',
      payload: {
        pageSize,
        pageNum,
        departmentIds: selectDpartment,
        keyWords: selectName,
      },
    });
  }
  /**
   * 姓名搜索输入
   * @param {String} ename
   */
  onNameChange = (name) => {
    this.setState({
      selectName: name
    }, () => {
      clearTimeout(nameTimer);
      nameTimer = setTimeout(() => {
        this.getUserList();
      }, 800);
    })
  }
  /**
   * 部门搜索变化
   * @param {Array} value 
   */
  onDepartmentChange = value => {
    this.setState({
      selectDpartment: value
    }, () => {
      this.getUserList();
    });
  };
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
      this.getUserList();
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
      this.getUserList();
    });
  }
  /**
   * 渲染重置重置账号列
   * @returns Dom
   */
   resetPsdRender = (item) => {
    return <div className={style.handleCss}>
      {
        HANDEL_MAP.map(keyItem => {
          return (
            <span 
              onClick={(e) => {
                // 阻止合成事件间的冒泡
                e.stopPropagation();
                this.setState({
                  itemData: item,
                  handelKeyItem: keyItem,
                  resetOrDeleteVisible: true,
                })
              }}
            >
              {keyItem.name}
            </span>
          )
        })
      }
    </div>
  }
  /**
   * 重置账号
   * @returns null
   */
  resetUserPassword = () => {
    const { itemData } = this.state;
    this.props.dispatch({
      type: 'Users/resetUserPsd',
      payload: {
        userId: itemData?.id || null,
      },
    }).then(({ code, msg }) => {
      this.setState({ resetOrDelectBtnLoading: false });
      if (code === 200) {
        message.success(msg);
        this.setState({ resetOrDeleteVisible: false });
      } else {
        message.error(msg);
      }
    });
   }
   /**
    * 删除账号
    * @param {item} boolean 
    */
  deleateUser = () => {
    const { itemData } = this.state;
    this.props.dispatch({
      type: 'Users/deleteUser',
      payload: {
        id: itemData?.id || null,
      },
    }).then(({ code, msg }) => {
      this.setState({ resetOrDelectBtnLoading: false });
      if (code === 200) {
        this.setState({ resetOrDeleteVisible: false });
        this.getUserList();
      } else {
        message.error(msg);
      }
    });
  };

  /**
   * 弹窗底部操作栏
   * @returns DOM
   */
  renderFooterDom = () => {
    const { handelKeyItem, resetOrDelectBtnLoading } = this.state;
    return (
      <div>
        <Button 
          onClick={() => {this.setState({resetOrDeleteVisible: false})}}
          disabled={resetOrDelectBtnLoading}
        >取消</Button>
        <Button 
          type={handelKeyItem?.type}
          loading={resetOrDelectBtnLoading}
          onClick={() => {
            this.setState({ resetOrDelectBtnLoading: true })
            if (handelKeyItem?.key === HANDEL_MAP[0]?.key) {
              this.resetUserPassword();
            } else {
              this.deleateUser();
            }
          }}
        >确认</Button>
      </div>
    )
  }
  render() {
    const {
      userList,
      userListLoading,
      departmentList,
    } = this.props;
    const {
      selectDpartment,
      selectName,
      isAddType,
      itemData,
      itemVisible,
      resetOrDeleteVisible,
      handelKeyItem,
      tableTitle
    } = this.state;
    return (
      <div className={style.tableList}>
        <div className={style.selectBar}>
          <Input
            allowClear
            placeholder="按关键字搜索"
            onChange={(e) => this.onNameChange(e?.target?.value)}
            style={{ width: 200, height:30 }}
            value={selectName || undefined}
            suffix={<Icon type="user" />}
          />
          <TreeSelect
            allowClear
            multiple
            treeData={departmentList}
            value={selectDpartment}
            dropdownClassName={style.dropdownClass}
            onChange={this.onDepartmentChange}
            treeCheckable={true}
            treeNodeLabelProp={'departmentName'}
            showCheckedStrategy={'SHOW_PARENT'}
            searchPlaceholder={'按部门搜索'}
            style={{width: 200, marginLeft: 10}}
            suffixIcon={<Icon type="search" />}
          />
          <Button
            type="primary"
            style={{marginLeft: 10}}
            onClick={() => {
              this.setState({
                itemData: {
                  'realname': '',
                  'idNo': '',
                  'gender': undefined,
                  'birthday': undefined,
                  'employeeStatus': undefined,
                  'employeeType': undefined,
                  'dutyId': undefined,
                  'highestDegree': undefined,
                  'beginWorkTime': undefined,
                  'department': {
                    id: undefined,
                    name: '',
                  },
                },
                itemVisible: true,
                isAddType: true,
              })
            }}
          >
            添加员工
          </Button>
        </div>
        {/* 列表页 */}
        <ConfigProvider locale={zhCN}>
          <Table
            columns={[...USER_TABLE_DEFU_ARR, ...tableTitle]} 
            dataSource={userList?.list || []} 
            rowKey={record => record._id} 
            scroll={{ x: 1200, y: '100%' }}
            loading={userListLoading}
            pagination={false}
            onRow={record => {
              return {
                onClick: () => this.showItem(record), // 点击行
              };
            }}
          />
          <div className={style.bottomBar}>
            <Pagination
              className={style.pagination}
              showSizeChanger={true}
              showQuickJumper={true}
              defaultCurrent={1}
              total={userList?.total}
              onChange={this.onShowNumChange}
              onShowSizeChange={this.onShowSizeChange}
            />
          </div>
        </ConfigProvider>
        
        <Modal
          title={`确认${handelKeyItem?.name ||''}${itemData?.realname || '-'}的账号？`}
          visible={resetOrDeleteVisible}
          maskClosable={false}
          closable={false}
          footer={this.renderFooterDom()}
        >
          <p>{handelKeyItem?.sub || ''}</p>
          <p>
            <span>{handelKeyItem?.sub1 || ''}</span>
            <span style={{color: 'red',marginLeft: 10}}>{handelKeyItem?.defPsd || ''}</span>
          </p>
        </Modal>
        {itemData && <UserDetail 
          itemData={itemData} 
          itemVisible={itemVisible}
          reflashList={this.getUserList}
          isAddType={isAddType}
          visibleChange={(boolean) => {
            this.setState({
              itemVisible:boolean,
              isAddType: false,
            });
          }}
        />}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userList: state.Users.userList || [],
  userListLoading: state.Users?.userListLoading || false,
  departmentList: state.Users?.departmentList || [],
});
export default connect(mapStateToProps)(users);
