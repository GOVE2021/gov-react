import React,{ Component } from 'react';
import { getYearList } from './cont';
import moment from 'moment';

import style from './index.css';

const createSubmintDate = (year, month) => {
  const dateStr =  year + '-' + (month > 9 ? month : '0' + month); // 生成日期
  return dateStr;
}

class DataModal extends Component {
  constructor (props){
    super(props);
    this.state = { 
      selectMonth: '',
      selectYear: '',
      submitDate: '',
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = nextProps;
    const { selectMonth, selectYear } = prevState;
    const valueArr = value?.split('-') || []
    const defYear = Number(valueArr?.[0]) || moment().year();
    const defMonth = Number(valueArr?.[1]) || moment().month() + 1;
    
    if (!selectMonth || !selectYear){
      return {
        selectMonth: defMonth,
        selectYear: defYear,
        submitDate: value || moment().format('YYYY-MM'),
      }
    }
    return null;
  }
  selectDate = (value, type) => {
    const { selectMonth, selectYear } = this.state;
    if(type === 'year'){
      this.setState({ 
        selectYear: value,
        submitDate: createSubmintDate(value, selectMonth),
      });
    }else{
      this.setState({
        selectMonth: value,
        submitDate: createSubmintDate(selectYear, value),
      })
    }
  }
  onBtnCancle = () => {
    this.setState({
      selectMonth: '',
      selectYear: '',
      submitDate: '',
    });
    this.props.onCancle();
  }
  onBtnSubmit = () => {
    const { submitDate } = this.state;
    this.props.onSubmit(submitDate);
    this.onBtnCancle();
  }
  render () {
    const { visible } = this.props;
    const { selectMonth, selectYear, submitDate } = this.state;
    const { yearList, monthList } = getYearList();
    if (!visible){
      return null;
    }
    return <div className={style.modalDom} onClick={this.onBtnCancle}>
      <div className={style.modal} onClick={e => e.stopPropagation()}>
        <div className={style.titleBar}>
          <div className={style.btn} onClick={this.onBtnSubmit}>确定</div>
          <div className={style.selectValueShow}>{submitDate}</div>
          <div className={style.btn} onClick={this.onBtnCancle}>取消</div>
        </div>
        <div className={style.selectBar} ref={ ref => this.bindHandleScroll }>
          <div className={style.selectYear}>
            <div className={style.list}>
              {
                (yearList || []).reverse().map((year) => {
                  return <div
                    className={style.yearItem}
                    key={`${year}-y`}
                    style={selectYear === year ? { backgroundColor: '#6495ED' } : {}}
                    onClick={() => this.selectDate(year, 'year')}
                  >{year}</div>
                })
              }
            </div>
          </div>
          <div className={style.selectMonth}>
            {
              (monthList || []).map((month) => {
                return <div
                  className={style.monthItem}
                  key={`${month}-m`}
                  onClick={() => this.selectDate(month, 'month')}
                >
                  <div
                    className={style.item}
                    style={selectMonth === month? { backgroundColor: '#6495ED' } : {}}
                  >{month}月</div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
   
  }
}

export default DataModal

