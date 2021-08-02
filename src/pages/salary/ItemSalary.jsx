import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Spin, Button, Input, DatePicker, Select, message } from 'antd';
import { ADD_SALARY_MAP, REDUCE_SALARY_MAP, ADD_TYPE } from './cont';
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
      isLoadingDetail: false, // 是否在获取详情
      modalTitle: '',
      psrsonListLoading: false,
      detailSalary: null,
      salaryId: null,
      personList: [], // 人员列表
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { itemData } = nextProps
    const { itemId } = prevState;
    if (itemData?.id !== itemId) {
      return {
        itemId: itemData.id,
        isEdit: itemData?.id === ADD_TYPE ? true : false,
        detailSalary: itemData,
        modalTitle: itemData?.id === ADD_TYPE ? `添加薪资` : `「${itemData?.realname || '--'}」的薪资详情`,
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
          this.setState({ personList: data?.list || [] });
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
    const regNum = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
    if(regNum.test(value) || (value.charAt(value.length-1) === '.' && value.indexOf('.') === value.length-1) || value.length === 0){
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
            <div className={style.value}>{showValue}元</div>
        </div>
      )
    });
  }
  /**
   * 弹窗底部操作栏
   * @returns DOM
   */
  renderFooterDom = () => {
    const { isEdit, salaryId, isLoadingDetail, detailSalary } = this.state;
    const { roleType } = this.props;
    return (
      <div className={style.modalFooter}>
        {isEdit ? 
          <div className={style.btnList}>
            <Button
              onClick={this.onCancleEdit}
            >取消</Button>
            <Button
              type="primary"
              onClick={() => {
                if(detailSalary?.id === ADD_TYPE){
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
    const { detailSalary, selectPersonId } = this.state;
    delete detailSalary.id;
    detailSalary.userId = selectPersonId;
    this.props.dispatch({
      type: 'Salary/addSalaryData',
      payload: detailSalary,
    }).then(({ code, msg }) => {
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
    this.props.dispatch({
      type: 'Salary/updateSalaryData',
      payload: detailSalary,
    }).then(({ code, msg }) => {
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
    if(itemData?.id === ADD_TYPE){
      this.closeModalChange();
    }else{
      this.setState({
        isEdit: false,
        detailSalary: itemData,
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
  render() {
    const { itemVisible } = this.props;
    const {
      isEdit,
      detailSalary = {},
      isLoadingDetail,
      modalTitle,
      selectPersonId,
      personList,
      psrsonListLoading,
    } = this.state;
    
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
                  {
                    (detailSalary?.id === ADD_TYPE) && 
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
                              placeholder={'请输入关键字查询'}
                              dropdownClassName={style.dropdownClass}
                              value={selectPersonId || undefined}
                              onChange={(e) => {
                                this.setState({ selectPersonId: e });
                              }}
                              onSearch={(e) => {
                                this.getPersonByKeywords(e)
                              }}
                              loading={psrsonListLoading}
                              filterOption={false}
                            >{
                              personList.map(item => {
                                return <Option value={item.userId} label={item.realname} text={item?.realname}>
                                  <div style={{fontSize: 14}}>{item?.realname || '-'}</div>
                                  <div style={{fontSize: 12,color: 'gray'}}>{item?.departmentName}</div>
                                  <div style={{fontSize: 12,color: 'gray'}}>{item?.idNo}</div>
                                </Option>
                              })
                            }
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
                  
                  <div className={style.classifyTitle}>工资构成</div>
                  <div className={style.addSalaryDom}>
                    {
                      isEdit? this.renderSalaryForm(ADD_SALARY_MAP,detailSalary) : this.renderSalaryShowDom(ADD_SALARY_MAP,detailSalary)
                    }
                  </div>
                
                  <div className={style.classifyTitle}>代扣项目</div>
                  <div className={style.addSalaryDom}>
                    {
                      isEdit? this.renderSalaryForm(REDUCE_SALARY_MAP,detailSalary) : this.renderSalaryShowDom(REDUCE_SALARY_MAP,detailSalary)
                    }
                  </div>
                  <div className={style.classifyTitle}>实发工资</div>
                  <div className={style.countSalary}>{`${detailSalary?.payment ? detailSalary?.payment + '元' : ''}`}</div>
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
