import React,{ Component } from 'react';
import { connect } from 'dva';
import { Modal, Table, Select, TreeSelect, Input, Icon, ConfigProvider, Pagination, message } from 'antd';
import { ROLE_LIST_MAP, transDepartmentIds, showPaginationString } from '../utils';
import { TABLE_COMMEN_TITLE_LIST } from './cont'
import zhCN from 'antd/es/locale/zh_CN'; 

import style from './style.css';

const { Option } = Select;
let timer = null;
class department extends Component {
  constructor (props){
    super(props);
    this.state = {
      itemData: null, //当前账号数据
      visible: false,
      selectDpartment: undefined, // 编辑权限的部门
      editRoleValue: undefined, // 编辑权限的id
      pageSize: 10,
      pageNum: 1,
      keywords: '', // 搜索关键字
      selectRoleValue: undefined, // 搜索选择的角色
      selectDepartIds: [], // 搜索选择的部门
      editLoading: false,
      titleArray: [ // 操作栏
        {
          title: '权限操作',
          align: 'center',
          width: 100,
          render: this.resetRoleRender,
        },
      ],
    }
  }
  componentDidMount () {
    this.getRoleList();
    this.props.dispatch({
      type: 'Role/getDepartment',
      payload: {},
    });
  };
  /**
   * 获取列表
   */
  getRoleList = () => {
    const {
      pageSize,
      pageNum,
      keywords,
      selectDepartIds,
      selectRoleValue,
    } = this.state;
    this.props.dispatch({
      type: 'Role/getRoleList',
      payload: {
        keywords: keywords,
        roleId: selectRoleValue, 
        departmentIds: (selectDepartIds || []).map(k => k?.value),  
        pageSize,
        pageNum,
      },
    });
  }
  /**
   * 渲染操作列
   * @returns Dom
   */
   resetRoleRender = (item) => {
    return <div className={style.handleCss}>
      <span 
        onClick={(e) => {
          // 阻止合成事件间的冒泡
          e.stopPropagation();
          this.setState({
            itemData: item,
            visible: true,
            editRoleValue: item?.roleId,
            selectDpartment: transDepartmentIds(item?.departments),
          })
        }}
      >
        编辑
      </span>
    </div>
  }
  /**
   * 提交修改权限数据
   */
  handleOk = () => {
    const {
      itemData, //当前账号数据
      editRoleValue, // 当前选择的角色
      selectDpartment,
    } = this.state;
    this.setState({editLoading: true});
    this.props.dispatch({
      type: 'Role/editRole',
      payload: {
        "roleId": editRoleValue,
        "userId": itemData?.userId,
        "departmentIds": (selectDpartment || []).map(k=> k?.value),
      }
    }).then(({ code, msg }) => {
      this.setState({editLoading: false});
      if (code === 200) {
        this.setState({ 
          itemData: null,
          visible: false,
          editRoleValue: undefined,
          selectDpartment: [],
         });
         this.getRoleList();
      } else {
        message.error(msg);
      }
    });
  }
  /**
   * 编辑权限部门变化
   * @param {Array} value 
   */
  onDepartmentChange = value => {
    this.setState({ selectDpartment: value });
  };
  /**
   * 编辑权限select变化
   * @param {id} value 
   */
  editRoleChange = (value) => {
    if (ROLE_LIST_MAP[1].key !== Number(value)){
      this.setState({
        editRoleValue: value,
        selectDpartment: [],
      })
    } else {
      this.setState({editRoleValue: value})
    }
  };
  /**
   * 搜索关键字
   * @param {string}} e 
   */
  onKeywordsChange = (e) => {
    this.setState({
      keywords: e?.target?.value
    }, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.getRoleList();
      }, 800);
    });
  }
  /**
   * 搜索改变角色触发事件
   * @param {number} e 
   */
  selectRoleChange =(value) => {
    this.setState({
      selectRoleValue: value
    }, () => {
      this.getRoleList();
    })
  }
  /**
   * 搜索选择的部门
   * @param {array} value 
   */
  onSelectDepartmentChange = (value) => {
    this.setState({
      selectDepartIds: value
    }, () => {
      this.getRoleList();
    });
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
      this.getRoleList();
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
      this.getRoleList();
    });
  }
  render () {
    const {
      roleList,
      roleListLoading,
      departmentList,
      userDetail,
    } = this.props;
    const {
      itemData, //当前账号数据
      visible,
      editRoleValue,
      selectDpartment,
      keywords,
      selectRoleValue,
      selectDepartIds,
      titleArray,
      editLoading,
      pageSize,
      pageNum,
    } = this.state;
    const roleOptionList = ROLE_LIST_MAP.filter(n => n.key <= userDetail?.roleType);
    return <div className={style.content}>
      <div className={style.selectBar}>
        <Input
          allowClear
          placeholder="按姓名/身份证号搜索"
          onChange={this.onKeywordsChange}
          style={{ width: 200, height:30 }}
          value={keywords || undefined}
          suffix={<Icon type="search" />}
        />
        <Select
          allowClear
          id='roleSelectBar'
          value={selectRoleValue || undefined}
          getPopupContainer={() => document.getElementById('roleSelectBar')}
          style={{ width: 200, marginLeft: 15, height: 30, zIndex: 99 }}
          onChange={this.selectRoleChange}
          placeholder={'请选择角色'}
        >
          {
            roleOptionList.map(item => {
              return <Option value={item.key}>{item.name}</Option>
            })
          }
        </Select>
        <TreeSelect
          allowClear
          multiple
          maxTagCount={3}
          showSearch={false}
          treeData={departmentList}
          labelInValue={true}
          treeCheckStrictly={true}
          value={selectDepartIds}
          dropdownClassName={style.dropdownClass}
          onChange={this.onSelectDepartmentChange}
          treeCheckable={true}
          placeholder={'按部门搜索'}
          style={{width: 200, marginLeft: 10}}
        />
      </div>
      <ConfigProvider locale={zhCN}>
        <Table
          columns={[...TABLE_COMMEN_TITLE_LIST,...titleArray]} 
          dataSource={roleList?.list} 
          rowKey={record => record.userId} 
          width={'100%'}
          loading={roleListLoading}
          pagination={false}
          scroll={{
            x: 1200,
            y: 'calc(100vh - 300px)',
            scrollToFirstRowOnChange: false,
          }}
        />
        <div className={style.bottomBar}>
          {showPaginationString(pageNum, pageSize, roleList?.total)}
          <Pagination
            className={style.pagination}
            showSizeChanger={true}
            showQuickJumper={true}
            defaultCurrent={1}
            total={roleList?.total}
            onChange={this.onShowNumChange}
            onShowSizeChange={this.onShowSizeChange}
          />
        </div>
      </ConfigProvider>
      <Modal
        title={`编辑「${itemData?.realname || '-'}」的权限`}
        visible={visible}
        maskClosable={false}
        getPopupContainer={(reactNode) => reactNode}
        closable={false}
        okText={'确认'}
        cancelText={'取消'}
        onOk={this.handleOk}
        onCancel={() => {this.setState({ visible: false })}}
        okButtonProps={{
          disabled: editLoading,
          loading: editLoading
        }}
        cancelButtonProps={{disabled: editLoading}}
      >
        <div className={style.modalLine}>
            <div className={style.label}>角色类型：</div>
            <div className={style.value}>
              <Select
                value={editRoleValue}
                dropdownClassName={style.dropdownClass}
                getPopupContainer={(reactNode) => reactNode}
                style={{ width: 200 }}
                onChange={this.editRoleChange}
                placeholder={'请选择角色'}
              >
                {
                  roleOptionList.map(item => {
                    return <Option value={item.key}>{item.name}</Option>
                  })
                }
              </Select>
            </div>
        </div>
        {ROLE_LIST_MAP[1].key === Number(editRoleValue) && 
          <div className={style.modalLine}>
            <div className={style.label}>管理部门：</div>
            <div className={style.value}>
              <TreeSelect
                allowClear
                multiple
                labelInValue={true}
                treeCheckStrictly={true}
                getPopupContainer={(reactNode) => reactNode}
                dropdownClassName={style.dropdownClass}
                treeData={departmentList}
                value={selectDpartment}
                onChange={this.onDepartmentChange}
                treeCheckable={true}
                placeholder={'按部门搜索'}
                style={{width: 200 }}
                suffixIcon={<Icon type="search" />}
              />
            </div>
          </div>
        }
        {ROLE_LIST_MAP[0].key === Number(editRoleValue) && 
          <div className={style.rootTips}>超级管理员将拥有所有部门权限</div>
        }
      </Modal>
    </div>
  }
}

const mapStateToProps = (state) =>({
  userDetail: state.Users.userDetail || {},
  roleList: state.Role?.roleList || [],
  roleListLoading: state.Role?.roleListLoading || false,
  departmentList: state.Role?.departmentList || [],
})
export default connect(mapStateToProps)(department)