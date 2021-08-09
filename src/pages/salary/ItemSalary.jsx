import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Spin, Button, Input, DatePicker, Select, message } from 'antd';
import {
  ADD_SALARY_MAP,
  REDUCE_SALARY_MAP,
  ADD_TYPE,
  OLD_WORKER_SALARY_MAP,
  getAddSalaryDataList,
  calculateTotal,
} from './cont';
import { PERSON_TYPE_LIST } from '../utils';
import moment from 'moment';

import style from './style.css';

const { MonthPicker } = DatePicker;
const { Option } = Select;
let timer = null;
class ItemSalary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
      isEdit: false,
      selectPersonKeyword: '', // 搜索人员关键字
      selectPersonId: null, // 当前选择的人员
      selectEmployeeStatus: null, // 选择人员的状态
      isLoadingDetail: false, // 是否在获取详情
      modalTitle: '',
      psrsonListLoading: false,
      detailSalary: null,
      editLoading: false,
      salaryId: null,
      personList: [], // 人员列表
      selectTotalPerson: 0, // 搜索结果匹配人数
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { itemData } = nextProps
    const { itemId } = prevState;
    if (itemData?.userId !== itemId) {
      return {
        itemId: itemData.userId,
        isEdit: itemData?.userId === ADD_TYPE ? true : false,
        detailSalary: itemData,
        modalTitle: itemData?.userId === ADD_TYPE ? `添加薪资` : `「${itemData?.realname || '--'}」的薪资详情`,
        salaryId: itemData?.salaryId || moment(new Date(), 'YYYY/MM'),
      };
    }
  }
  /**
   * 获取详情
   */
  getSalaryDetailForUserDetail = () => {
    const { salaryId, detailSalary } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'Salary/getSalaryDetail',
      payload: { 
        "userId": detailSalary?.userId,
        "salaryId": salaryId,
        "employeeStatus": detailSalary?.employeeStatus,
      },
    }).then(({ code, msg, data }) => {
      this.setState({ isLoadingDetail: false });
      if (code === 200){
        data.salaryId = salaryId;
        data.userId = detailSalary?.userId;
        this.setState({ detailSalary: data || {} });
      }else{
        message.error(msg);
        this.setState({ detailSalary: {} });
      }
    })
  }
  
  /**
   * 获取人员
   */
   getPersonByKeywords = (value) => {
    const { dispatch } = this.props;
    this.setState({ selectPersonKeyword: value });
    if(value.length === 0) return;
    this.setState({ psrsonListLoading: true });
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch({
        type: 'Users/getPersonByKeywords',
        payload: { 
          "keyWords": value,
        },
      }).then(({ code, msg, data }) => {
        this.setState({ psrsonListLoading: false });
        if (code === 200){
          this.setState({
            personList: (data?.list || []).slice(0,50),
            selectTotalPerson: data?.total || 0
          });
        }else{
          message.error(msg);
          this.setState({ personList: [] });
        }
      })
    }, 800);
  }
  
  /**
   * 渲染编辑效果
   * @param {*} object 
   * @returns 
   */
  renderSalaryForm = (dataMap,data) => {
    const object = JSON.parse(JSON.stringify(data));
    return Object.keys(dataMap).map((item) => {
      const showValue = object?.[item];
      return (
        <div className={style.userItem} key={item}>
            <div className={style.calssfiy}>{`${dataMap?.[item] || '--'}:`}</div>
            <div className={style.editValue}>
              <Input value={showValue} placeholder={'请输入金额'} onChange={(e) => {
                this.setNewItemData(item, e?.target?.value || '')
              }} />
            </div>
        </div>
      )
    });
  }
  /**
   * 数据改变时设值
   * @param {key} key 
   * @param {value} vale 
   */
  setNewItemData = (key, value) => {
    const lastChart = value.charAt(value.length-1);
    const isHasOneDot = value.indexOf('.') > 0 ? (value.split('.').length === 2 && value.split('.')?.[1]?.length <= 2) : true;
    if((!isNaN(lastChart) || lastChart === '.') && isHasOneDot ){
      const { detailSalary } = this.state;
      const newData = JSON.parse(JSON.stringify(detailSalary));
      newData[key] = value;
      this.setState({ detailSalary: newData });
    }
  }
  /**
   * 渲染薪资展示
   * @returns DOM
   */
  renderSalaryShowDom = (dataMap,data) => {
    const object = JSON.parse(JSON.stringify(data));
    return Object.keys(dataMap).map( (item) => {
      const showValue = object?.[item];
      if(!showValue){ return null };
      return (
        <div className={style.userItem} key={item}>
            <div className={style.calssfiy}>{`${dataMap?.[item] || '--'}:`}</div>
            <div className={style.value}>{showValue}</div>
        </div>
      )
    });
  }
  /**
   * 弹窗底部操作栏
   * @returns DOM
   */
  renderFooterDom = () => {
    const { isEdit, salaryId, isLoadingDetail, detailSalary, editLoading } = this.state;
    const { roleType } = this.props;
    return (
      <div className={style.modalFooter}>
        {isEdit ? 
          <div className={style.btnList}>
            <Button
              onClick={this.onCancleEdit}
              disabled={editLoading}
            >取消</Button>
            <Button
              type="primary"
              disabled={editLoading}
              loading={editLoading}
              onClick={() => {
                if(detailSalary?.userId === ADD_TYPE){
                  this.addSalaryData();
                }else{
                  this.onUpdateSalaryData()
                }
              }}
            >保存</Button>
          </div>
          :
          <>
            <div className={style.nextOrPre}>
              <Button 
                onClick={() => this.monthSalaryChange('-')}
                disabled={isLoadingDetail}
              >上一账期</Button>
              <MonthPicker
                allowClear={false}
                disabled={isLoadingDetail}
                value={moment(salaryId)}
                format={'YYYY-MM'}
                placeholder="请选择账期"
                style={{ margin: '0 10px', width: 110 }} 
                onChange={this.monthSalaryChange}
              />
              <Button
                onClick={() => this.monthSalaryChange('+')}
                disabled={isLoadingDetail}
              >下一账期</Button>
            </div>
            <div className={style.btnList}>
              <Button
                onClick={this.closeModalChange}
                disabled={isLoadingDetail}
              >取消</Button>
              {roleType !== 1 && 
                <Button
                type="danger"
                onClick={() => {this.setState({ isEdit: true})}}
                disabled={isLoadingDetail}
              >调整</Button>}
            </div>
          </>
        }
      </div>
    )
  }
  /**
   * 添加薪资信息
   */
  addSalaryData = () => {
    const { detailSalary, selectPersonId, selectEmployeeStatus } = this.state;
    const subData = JSON.parse(JSON.stringify(detailSalary));
    delete subData.id;
    subData.userId = selectPersonId;
    subData.employeeStatus = selectEmployeeStatus;
    this.setState({editLoading: true});
    this.props.dispatch({
      type: 'Salary/addSalaryData',
      payload: subData,
    }).then(({ code, msg }) => {
      this.setState({editLoading: false});
      if(code === 200){
        this.setState({ selectPersonId: null })
        this.closeModalChange()
      } else {
        message.error(msg);
      }
    })
  }
  /**
   * 保存修改数据
   */
  onUpdateSalaryData = () => {
    const { detailSalary } = this.state;
    this.setState({editLoading: true});
    this.props.dispatch({
      type: 'Salary/updateSalaryData',
      payload: detailSalary,
    }).then(({ code, msg }) => {
      this.setState({editLoading: false});
      if(code === 200){
        this.closeModalChange();
      } else {
        message.error(msg);
      }
    })
  }
  /**
   * 取消修改
   */
  onCancleEdit = () => {
    const { itemData } = this.props;
    if(itemData?.userId === ADD_TYPE){
      this.closeModalChange();
    }else{
      this.setState({
        isEdit: false,
        detailSalary: itemData,
        personList: [],
      });
    }
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
      salaryId: null,
      personList: [],
    });
  }
  /**
   * 薪资账期（上下）
   * @param {date} value 
   */
  monthSalaryChange = (value) =>{
    const { salaryId } = this.state;
    let newValue = value || new Date();
    if(value === '+'){
      newValue = moment(salaryId).add(1, 'month')
    }
    if (value === '-'){
      newValue = moment(salaryId).subtract(1, 'month');
    }
    this.setState({
      salaryId: moment(newValue).format('YYYY-MM'),
      isLoadingDetail: true,
    }, () => {
      this.getSalaryDetailForUserDetail();
    });
  }
  /**
   * 薪资账期（添加薪资）
   * @param {date} value 
   */
  addSalaryMonth = (value) => {
    const { detailSalary } = this.state;
    detailSalary.salaryId = moment(value).format('YYYY-MM');
    this.setState({ detailSalary });
  }
  /**
   * 选择人员
   */
  selectAddPersong = (e) => {
    const { personList } = this.state;
    const selectEmployeeObj = personList?.find(k => k?.userId === e) || {};
    this.setState({
      selectPersonId: e,
      detailSalary: getAddSalaryDataList(e),
      selectEmployeeStatus: selectEmployeeObj?.employeeStatus
    });
  }
  /**
   * 生成搜索人员列表
   * @param {array} list 
   */
  creatPersonOptingList = (list) => {
    if(list.length){
      return list.map(item => {
        return <Option value={item.userId} label={item.realname} text={item?.realname}>
          <div style={{fontSize: 14}}>{item?.realname || '-'}</div>
          <div style={{fontSize: 12,color: 'gray'}}>{item?.departmentName}</div>
          <div style={{fontSize: 12,color: 'gray'}}>{item?.idNo}</div>
        </Option>
      })
    }else{
      return <Option value="disabled" disabled >无结果</Option>
    }
  }
  render() {
    const { itemVisible } = this.props;
    const {
      isEdit,
      detailSalary = {},
      isLoadingDetail,
      modalTitle,
      selectPersonId,
      personList,
      selectTotalPerson,
      psrsonListLoading,
      selectEmployeeStatus,
    } = this.state;
    const isInWork = (selectEmployeeStatus || detailSalary?.employeeStatus) === PERSON_TYPE_LIST[0].key;
    const baseLabelList = isInWork ? ADD_SALARY_MAP : OLD_WORKER_SALARY_MAP
    return (
      <div className={style.tableList}>
        <Modal
          title={modalTitle}
          className={style.modal}
          visible={itemVisible}
          maskClosable={false}
          onCancel={this.closeModalChange}
          footer={this.renderFooterDom()}
        >
          <div className={style.salaryDetailModal}>
            {(() => {
              if(Object.keys(detailSalary)?.length === 0) return null;
              if(isLoadingDetail){
                return (
                  <div className={style.spinDom}>
                    <Spin size="large" />
                  </div>
                )
              }
              return (
                <div>
                  {/* 基本信息 */}
                  {
                    (detailSalary?.userId === ADD_TYPE) && 
                    <>
                      <div className={style.classifyTitle}>基本信息</div>
                      <div className={style.addSalaryDom}>
                        <div className={style.userItem} style={{width: 'auto'}} key={'userId'}>
                          <div className={style.calssfiy} style={{width: 'auto', marginLeft: '30px'}}>姓名:</div>
                          <div className={style.editValue}>
                            <Select
                              showSearch   
                              optionLabelProp={'label'}
                              style={{ width: 250 }}
                              getPopupContainer={(reactNode) => reactNode}
                              placeholder={'按姓名/身份证号搜索'}
                              dropdownClassName={style.dropdownClass}
                              value={selectPersonId || undefined}
                              onChange={this.selectAddPersong}
                              onSearch={this.getPersonByKeywords}
                              loading={psrsonListLoading}
                              filterOption={false}dropdownRender={menu => (
                              <div>
                                {menu}
                                {selectTotalPerson > 50 && <div className={style.personListTips}>
                                  <span>{`当前展示50/${selectTotalPerson}人，请输入全名/身份证号进行精确搜索`}</span>
                                </div>}
                              </div>
                            )}
                            >
                              {this.creatPersonOptingList(personList)}
                            </Select>
                          </div>
                        </div>
                        <div className={style.userItem} key={'salaryId'}>
                          <div className={style.calssfiy} style={{width: 'auto', marginLeft: '30px'}}>账期:</div>
                          <div className={style.editValue}>
                            <MonthPicker
                              allowClear={false}
                              style={{ width: 150 }}
                              disabled={isLoadingDetail}
                              value={detailSalary?.salaryId? moment(detailSalary?.salaryId) : undefined}
                              format={'YYYY-MM'}
                              placeholder="请选择账期"
                              onChange={this.addSalaryMonth}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  }
                  {/* 存在ID */}
                  {
                    (selectPersonId || detailSalary?.userId !== ADD_TYPE) &&
                    <>
                      <div className={style.classifyTitle}>
                        工资构成&nbsp;&nbsp;
                        (总计: {calculateTotal(baseLabelList,detailSalary)} 元)
                      </div>
                      <div className={style.addSalaryDom}>
                        {
                          isEdit ? this.renderSalaryForm(baseLabelList,detailSalary) : this.renderSalaryShowDom(baseLabelList,detailSalary)
                        }
                      </div>
                    
                      {isInWork && 
                        <>
                          <div className={style.classifyTitle}>
                            代扣项目&nbsp;&nbsp;
                            (总计: {calculateTotal(REDUCE_SALARY_MAP,detailSalary)} 元)
                          </div>
                          <div className={style.addSalaryDom}>
                            {
                              isEdit ? this.renderSalaryForm(REDUCE_SALARY_MAP,detailSalary) : this.renderSalaryShowDom(REDUCE_SALARY_MAP,detailSalary)
                            }
                          </div>
                        </>
                      }
                      <div className={style.classifyTitle}>实发工资</div>
                      <div className={style.countSalary}>
                        {
                          isEdit ? 
                            <Input
                              value={detailSalary?.payment || ''}
                              placeholder={'请输入金额'}
                              onChange={(e) => {
                                this.setNewItemData('payment', e?.target?.value || '')
                              }}
                            />
                          :
                          (`${detailSalary?.payment ? detailSalary?.payment + '元' : ''}`)
                        }
                      </div>
                    </>
                  }
                </div>
              )
            })()}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => state.Salary;

export default connect(mapStateToProps)(ItemSalary);
