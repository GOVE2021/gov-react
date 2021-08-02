import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { TreeSelect, Modal, Select, Button, Input, DatePicker, message } from 'antd';
import { USER_TITLE_MAP } from './cont';

import {
  EDU_BG_LIST,
  SEX_LIST,
  DUTY_LIST,
  PERSON_TYPE_LIST,
  PERSON_STATUE_LIST,
  showTextString,
} from '../utils';

import style from './style.css';

const { Option } = Select;

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
      isEdit: false,
      itemData: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { itemData } = nextProps;
    const { itemId } = prevState;
    if (itemData?.id !== itemId){
      const newItemData = JSON.parse(JSON.stringify(itemData));
      delete newItemData.id
      return {
        itemId: itemData?.id,
        itemData: newItemData,
        // isEdit: isAddType,
      }
    }
  }
  /**
   * 渲染编辑效果
   * @param {*} object 
   * @returns 
   */
   renderUserForm = (data) => {
    const { departmentList } = this.props;
    const object = JSON.parse(JSON.stringify(data));
    return (
      <div className={style.form}>
        {Object.keys(USER_TITLE_MAP).map((item, index) => {
          const value = object?.[item];
          return <div className={style.formItem}>
            <div className={style.label}>{`${USER_TITLE_MAP?.[item] || '--'}:`}</div>
            <div className={style.value}>{(() => {
              switch(item) {
                case 'dutyId': 
                  const statueObj = PERSON_STATUE_LIST.find(n => Number(n.key) === Number(object.employeeType)) || {};
                  return (
                    <Select
                      value={value}
                      style={{width: '100%'}}
                      getPopupContainer={(reactNode) => reactNode}
                      placeholder={'请选择职务/职称'}
                      dropdownClassName={style.dropdownClass}
                      onChange={e => this.setNewItemData(item, e)}
                    >
                      {
                        (DUTY_LIST?.[statueObj?.subKey] || []).map(item => {
                          return <Option value={item.key}>{item.title}</Option>
                        })
                      }
                    </Select>
                  );
                case 'highestDegree':
                  return (
                    <Select
                      value={value}
                      style={{width: '100%'}}
                      getPopupContainer={(reactNode) => reactNode}
                      placeholder={'请选择学历'}
                      dropdownClassName={style.dropdownClass}
                      onChange={e => this.setNewItemData(item, e)}
                    >
                      {
                        EDU_BG_LIST.map(item => {
                          return <Option value={item.key}>{item.title}</Option>
                        })
                      }
                    </Select>
                  );
                case 'gender': 
                  return (
                    <Select
                      value={value}
                      style={{width: '100%'}}
                      getPopupContainer={(reactNode) => reactNode}
                      placeholder={'请选择性别'}
                      dropdownClassName={style.dropdownClass}
                      onChange={e => this.setNewItemData(item, e)}
                    >
                      {
                        SEX_LIST.map(item => {
                          return <Option value={item.key}>{item.title}</Option>
                        })
                      }
                    </Select>
                  );
                case 'employeeStatus': 
                  return (
                    <Select
                      style={{width: '100%'}}
                      value={value}
                      getPopupContainer={(reactNode) => reactNode}
                      placeholder={'请选择人员类别'}
                      dropdownClassName={style.dropdownClass}
                      onChange={e => this.setNewItemData(item, e)}
                    >
                      {
                        PERSON_TYPE_LIST.map(item => {
                          return <Option value={item.key}>{item.title}</Option>
                        })
                      }
                    </Select>
                  );
                case 'employeeType': 
                  return (
                    <Select
                      value={value}
                      style={{width: '100%'}}
                      getPopupContainer={(reactNode) => reactNode}
                      placeholder={'请选择人员身份'}
                      dropdownClassName={style.dropdownClass}
                      onChange={(e) => this.setNewItemData(item, e)}
                    >
                      {
                        PERSON_STATUE_LIST.map(item => {
                          return <Option value={item.key}>{item.title}</Option>
                        })
                      }
                    </Select>
                  );
                case 'department':
                  return (
                    <TreeSelect
                      allowClear
                      getPopupContainer={(reactNode) => reactNode}
                      dropdownClassName={style.dropdownClass}
                      treeData={departmentList}
                      value={value?.id || undefined}
                      style={{width: '100%'}}
                      onChange={(e, arr) => {
                        this.setNewItemData(item,{id:e, name: arr?.[0]||''});
                      }}
                      placeholder={'请选择部门'}
                    />
                  )
                case 'beginWorkTime':
                case 'birthday':
                  return (
                    <DatePicker 
                      value={value? moment(value,'YYYY-MM-DD') : undefined}
                      format={'YYYY-MM-DD'}
                      style={{width: '100%'}}
                      getPopupContainer={(reactNode) => reactNode}
                      placeholder={'请选日期'}
                      dropdownClassName={style.dropdownClass}
                      onChange={(e) => {
                        this.setNewItemData(item, moment(e).format('YYYY-MM-DD'));
                      }}
                    />
                  )
                default:
                  return (
                    <Input
                      value={value}
                      placeholder={'请输入姓名'}
                      onChange={(e) => this.setNewItemData(item, e?.target?.value || '')}
                    />
                  )
              }
            })()}</div>
          </div>
        })}
      </div>
    )
  }
  /**
   * 数据改变时设值
   * @param {key} key 
   * @param {value} vale 
   */
  setNewItemData = (key, value) => {
    const { itemData } = this.state;
    const newData = JSON.parse(JSON.stringify(itemData));
    newData[key] = value;
    if (key === 'employeeType') {
      newData['dutyId'] = undefined;
    }
    this.setState({ itemData: newData });
  }
  /**
   * 渲染员工展示
   * @returns DOM
   */
  renderUserShowDom = (data) => {
    const object = JSON.parse(JSON.stringify(data));
    if (Object.keys(USER_TITLE_MAP).length) {
      return Object.keys(USER_TITLE_MAP).map( (item, index) => {
        return (
          <div className={style.userItem} key={`${new Date().getTime()}-${index}`}>
              <div className={style.calssfiy}>{`${USER_TITLE_MAP?.[item] || '--'}:`}</div>
              <div className={style.value}>{(() => {
                const value = object[item];
                switch(item) {
                  case 'dutyId': 
                    const statueObj = PERSON_STATUE_LIST.find(n => Number(n.key) === Number(object.employeeType)) || {};
                    return showTextString(value, DUTY_LIST[statueObj?.subKey]);
                  case 'highestDegree': 
                    return showTextString(value, EDU_BG_LIST);
                  case 'gender': 
                    return showTextString(value, SEX_LIST);
                  case 'employeeStatus': 
                    return showTextString(value, PERSON_TYPE_LIST);
                  case 'employeeType': 
                    return showTextString(value, PERSON_STATUE_LIST);
                  case 'department':
                    return value?.name;
                  default:
                    return value;
                }
              })()}</div>
          </div>
        )
      })
    }else{
      return <div>没有数据...</div>
    }
  }
  /**
   * 弹窗底部操作栏
   * @returns DOM
   */
  renderFooterDom = () => {
    const { isEdit } = this.state;
    const { itemData, isAddType } = this.props;
    return (
      <div className={style.modalFooter}>
        {isEdit || isAddType ?
          <>
            <Button
              onClick={() => {
                if (isAddType){
                  this.closeModalChange();
                }else{
                  this.setState({
                    isEdit: false,
                    itemData,
                  }) 
                }
              }}>{isAddType?'取消':'取消编辑'}</Button>
            <Button type="primary" onClick={this.onSubmitData}>{isAddType?'保存':'保存修改'}</Button>
          </>
          :
          <>
            <Button onClick={this.closeModalChange}>取消</Button>
            <Button type="danger" onClick={() => this.setState({ isEdit: true })}>修改</Button>
          </>
        }
      </div>
    )
  }
  /**
   * 提交新员工数据
   */
  onSubmitData = () => {
    const { itemData, itemId } = this.state;
    const subItemData = JSON.parse(JSON.stringify(itemData));
    const { reflashList, isAddType } = this.props;
    let apiType = 'Users/addUserInfo';
    if(!isAddType){
      subItemData.id = itemId;
      apiType = 'Users/editUserDetail';
    }
    subItemData.departmentId = subItemData.department.id;
    delete subItemData.department;
    this.props.dispatch({
      type: apiType,
      payload: {...subItemData},
    }).then(({ code, msg }) => {
      if (code === 200){
        reflashList();
        this.closeModalChange();
      } else {
        message.error(msg)
      }
    })
  }
  /**
   * 关闭弹窗
   */
  closeModalChange = () => {
    const { visibleChange } = this.props;
    visibleChange(false)
    this.setState({
      isEdit: false,
      itemId: null,
      itemData: null,
    });
  }

  render() {
    const { itemVisible, isAddType } = this.props;
    const { isEdit, itemData } = this.state;
    return (
      <div className={style.tableList}>
        <Modal
          title={!isAddType ? `「${itemData?.realname || '--'}」的个人信息` : '添加新员工'}
          width={800}
          visible={itemVisible}
          maskClosable={false}
          onCancel={this.closeModalChange}
          footer={this.renderFooterDom()}
        >
          <div className={style.userDetailModal}>
            {isEdit || isAddType? this.renderUserForm(itemData || {}) : this.renderUserShowDom(itemData|| {})}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  // roleList: state.User?.roleList || []
  departmentList: state.Users?.departmentList || [],
})
export default connect(mapStateToProps)(UserDetail)
