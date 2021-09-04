import React,{ Component } from 'react';
import { connect } from 'dva';
import {
  Button,
  Modal,
  Input,
  DatePicker,
  ConfigProvider,
  Table,
  Radio,
  Pagination,
  TreeSelect,
  message
} from 'antd';
import md5 from 'blueimp-md5';
import { logOut } from '@utils/authLocal';
import router from 'umi/router';
import {
  USER_KEY_MAP,
  ROLE_LIST_MAP,
  PERSON_TYPE_LIST,
  COMPLETE_PROGRESS_TITLE_LIST,
  COMPLETE_PROGRESS,
  showPaginationString,
} from './utils';
import moment from 'moment';

import zhCN from 'antd/es/locale/zh_CN'; 

import style from './index.css';
const { MonthPicker } = DatePicker;

class department extends Component {
  constructor (props){
    super(props);
    this.state = {
      visible: false,
      oldPsd: '',
      firstPsd: '',
      secondPsd: '',
      selectMounth:  moment().format('YYYY-MM'), // 月份筛选
      loadProcessStatus: false,
      editLoading: false,
      selectDpartment: [],
      unfinishedStatus: COMPLETE_PROGRESS[0].key,
      pageSize: 10,
      pageNum: 1,
      unfinishedData: {},
    }
  }
  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'Users/getDetail',
      payload: {},
    });
    dispatch({
      type: 'Department/getDepartmentList',
      payload: {},
    });
    this.getListByParams();
  }
  /**
   * 提交修改密码
   */
  handleOk = () => {
    const { oldPsd, firstPsd, secondPsd, editLoading } = this.state;
    const rag = /[\u4e00-\u9fa5]/;
    if (editLoading) {
      return null;
    }
    if (rag.test(firstPsd) || rag.test(oldPsd)) {
      message.error("密码不能包含中文！");
      return null;
    }
    if (firstPsd.length === 0 || oldPsd.length === 0){
      message.error('密码不能为空');
      return null
    }
    if (firstPsd !== secondPsd) {
      message.error('两次密码不一致');
      return null
    }
    this.setState({editLoading: true});
    this.props.dispatch({
      type: 'Users/updatePsd',
      payload: {
        password: md5(oldPsd),
        newPassword1: md5(firstPsd),
        newPassword2: md5(secondPsd),
      }
    }).then(({ code, msg }) => {
      this.setState({editLoading: false});
      if (code === 200) {
        this.setState({ visible: false });
        message.success('密码修改成功，请重新登陆');
        setTimeout(() => {
          logOut(); // 退出登陆
          router.replace('/');
        },1000)
      }else{
        message.error(msg);
      }
    });
  }
  /**
   * 首页未完成列表
   */
  getListByParams = () => {
    const { dispatch } = this.props;
    const { selectMounth, selectDpartment, unfinishedStatus, pageNum, pageSize } = this.state;
    this.setState({ loadProcessStatus: true });
    dispatch({
      type: 'Users/unfinishedList',
      payload: {
        "salaryId": selectMounth,
        "departmentIds": (selectDpartment || []).map(k => k.value), // 部门
        "unfinishedStatus": unfinishedStatus,
        "pageNum": pageNum,
        "pageSize": pageSize,
      },
    }).then(({data, code, msg}) => {
      this.setState({ loadProcessStatus: false });
      if (code === 200) {
        this.setState({unfinishedData: data});
      } else {
        message.error(msg)
      }
    });
  }
  /**
   * 确认修改的密码变化时
   * @param {string} e 
   * @param {string} type 
   */
  newPsdChange = (e,type) => {
    if (type === 'first'){
      this.setState({ firstPsd: e?.target?.value || ''});
    }else{
      this.setState({ secondPsd: e?.target?.value || ''});
    }
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
   * 月份变化
   * @returns null
   */
  mounthChange = (value) => {
    this.setState({ selectMounth: moment(value).format('YYYY-MM') }, () => {
      this.getListByParams();
    })
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
   * 员工在职/退休状态改变
   * @param {Number} value 
   */
   unfinishedStatusChange = (value) =>{
    this.setState({ unfinishedStatus: value?.target?.value }, () => {
      this.getListByParams();
    });
  }
  render () {
    const { userDetail, departmentList } = this.props;
    const {
      visible,
      oldPsd,
      firstPsd,
      secondPsd,
      editLoading,
      loadProcessStatus,
      selectMounth,
      selectDpartment,
      unfinishedStatus,
      unfinishedData,
      pageNum,
      pageSize,
    } = this.state;
    return <>
      {userDetail.roleType === ROLE_LIST_MAP[0].key ? 
      <div>
        <div className={style.topBar}>
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
          <MonthPicker
            allowClear={false}
            value={moment(selectMounth || new Date(), 'YYYY/MM')}
            format={'YYYY-MM'}
            placeholder="请选择账期"
            dropdownClassName={style.dropdownClass}
            style={{ marginLeft: 10,width: 120, height: 30 }} 
            onChange={this.mounthChange}
          />
          <Radio.Group
            className={style.radioEmploy}
            onChange={this.unfinishedStatusChange}
            value={unfinishedStatus}
          >
            {(COMPLETE_PROGRESS || []).map(item => {
              return <Radio value={item.key}>{item.title}</Radio>
            })}
          </Radio.Group>
        </div>
        <ConfigProvider locale={zhCN}>
          <Table
            columns={COMPLETE_PROGRESS_TITLE_LIST} 
            dataSource={unfinishedData?.list || []} 
            rowKey={record => record._id} 
            scroll={{
              x: 900,
              y: 'calc(100vh - 335px)',
              scrollToFirstRowOnChange: true,
            }}
            loading={loadProcessStatus}
            onRow={() => {}}
            pagination={false}
          />
          <div className={style.bottomBar}>
            {showPaginationString(pageNum, pageSize, 100)}
            <Pagination
              className={style.pagination}
              showSizeChanger={true}
              showQuickJumper={true}
              defaultCurrent={1}
              total={unfinishedData?.total || 0}
              onChange={this.onShowNumChange}
              onShowSizeChange={this.onShowSizeChange}
            />
          </div>
        </ConfigProvider>
      </div>
        :
        <>
          <div className={style.content}>
            {
              USER_KEY_MAP.map((item) => {
                return (
                  <div className={style.itemDom} key={USER_KEY_MAP.key}>
                    <div className={style.label}>{`${item.label}:`}</div>
                    {
                      (() => {
                        let showText = userDetail?.[item.key];
                        if (item?.key === 'roleType'){
                          showText = ROLE_LIST_MAP.find((n) => n?.key === userDetail?.[item.key])?.name;
                        }
                        if (item?.key === 'employeeStatus') {
                          showText =  PERSON_TYPE_LIST.find( m => m?.key === userDetail?.[item.key])?.title;
                        }
                        return <div className={style.value}>{showText || '-'}</div>
                      })()
                    }
                  </div>
                )
              })
            }
          </div>
          <Button
            style={{ marginLeft: 150, marginTop: 10 }}
            onClick={() => {this.setState({ visible: true })}}
          >
            修改密码
          </Button>
        </>
      }
      <Modal
          title={`修改密码`}
          visible={visible}
          maskClosable={false}
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
          {/* 原密码 */}
          <div className={style.formDom}>
            <div className={style.label}>原密码:</div>
            <div className={style.value}>
            <Input.Password
              allowClear
              type="password"
              placeholder="请输入当前密码"
              onChange={(e)=>this.setState({ oldPsd: e?.target?.value ||'' })}
              style={{ width: 200, marginLeft: 10, height:30 }}
              value={oldPsd}
            />
            </div>
          </div>

          {/* 新密码 */}
          <div className={style.formDom}>
            <div className={style.label}>新密码:</div>
            <div className={style.value}>
            <Input
              allowClear
              // type="password"
              placeholder="请输入新密码"
              onChange={e => this.newPsdChange(e, 'first')}
              style={{ width: 200, marginLeft: 10, height:30 }}
              value={firstPsd}
            />
            </div>
          </div>
          {/* 确认密码 */}
          <div className={style.formDom}>
            <div className={style.label}>确认密码:</div>
            <div className={style.value}>
            <Input
              allowClear
              // type="password"
              placeholder="请再次输入密码"
              onChange={e => this.newPsdChange(e, 'second')}
              style={{ width: 200, marginLeft: 10, height:30 }}
              value={secondPsd}
            />
            </div>
          </div>
        </Modal>
    </>
  }
}

const mapStateToProps = (state) =>({
  userDetail: state.Users.userDetail || {},
  departmentList: state.Department?.departmentList,
})
export default connect(mapStateToProps)(department)

