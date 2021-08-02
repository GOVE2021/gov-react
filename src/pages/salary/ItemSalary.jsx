import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Spin, Button, Input, message } from 'antd';
import { ADD_SALARY_MAP, REDUCE_SALARY_MAP } from './cont';

import style from './style.css';

class ItemSalary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
      isEdit: false,
      detailSalary: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { dispatch, itemData } = nextProps
    const { itemId } = prevState;
    if (itemData?.id !== itemId) {
      // dispatch({
      //   type: 'Salary/getSalaryDetail',
      //   payload: { id },
      // })
      return {
        itemId: itemData.id,
        isEdit: false,
        detailSalary: itemData
      };
    }
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
    const { detailSalary } = this.state;
    const newData = JSON.parse(JSON.stringify(detailSalary));
    newData[key] = value;
    this.setState({ detailSalary: newData });
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
    const { isEdit } = this.state;
    const { roleType } = this.props;
    return (
      <div className={style.modalFooter}>
        {isEdit ?
          <>
            <Button onClick={this.onCancleEdit}>取消调整</Button>
            <Button type="primary" onClick={this.onUpdateSalaryData}>保存修改</Button>
          </>
          :
          <>
            <Button onClick={this.closeModalChange}>取消</Button>
            {roleType !== 1 && <Button type="danger" onClick={() => {this.setState({ isEdit: true})}}>调整薪资</Button>}
          </>
        }
      </div>
    )
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
        this.setState({
          isEdit: false,
        })
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
    this.setState({
      isEdit: false,
      detailSalary: itemData,
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
      detailSalary: {},
    });
  }

  render() {
    const { itemVisible, isDetailLoading, itemData } = this.props;
    const { isEdit, detailSalary={} } = this.state;
    return (
      <div className={style.tableList}>
        <Modal
          title={`${itemData?.realname || '--'}的薪资详情`}
          width={800}
          height={800}
          visible={itemVisible}
          maskClosable={false}
          onCancel={this.closeModalChange}
          footer={this.renderFooterDom()}
        >
          <div className={style.salaryDetailModal}>
            {isDetailLoading ? 
              <div className={style.spinDom}>
                <Spin size="large" />
              </div>
              :
              <div>
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
                <div className={style.countSalary}>{detailSalary?.payment || ''}元</div>
              </div>
            }
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => state.Salary;

export default connect(mapStateToProps)(ItemSalary);
