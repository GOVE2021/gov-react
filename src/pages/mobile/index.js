import React,{ Component } from 'react';
import { connect } from 'dva';
import { Spin, message } from 'antd';
import moment from 'moment';
import { ROLE_LIST_MAP } from '../utils';
import DateModal from './DataModals';
import { ADD_SALARY_MAP, REDUCE_SALARY_MAP } from '../salary/cont'
import userInfoBG from '@assets/mobileBg.jpeg';

import style from './index.css';

class ownSalary extends Component {
  constructor (props){
    super(props);
    this.state = {
      isLoadingUserInfo: true,
      visible: false,
      loginUserId: null,
      selectEmployeeStatus: null,
      defDateStr: moment().format('YYYY-MM'),
      oldPsd: '',
      firstPsd: '',
      secondPsd: '',
    }
  }
  componentDidMount () {
    this.props.dispatch({
      type: 'Users/getDetail',
      payload: {},
    }).then(({ code, msg }) => {
      if (code === 200){
        this.setState({ isLoadingUserInfo: false });
      } else {
        message.error(msg);
      }
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { userDetail, dispatch } = nextProps
    const { loginUserId, defDateStr } = prevState;
    if (userDetail?.id !== loginUserId) {
      dispatch({
        type: 'Salary/getSalaryDetail',
        payload: { 
          "userId": userDetail?.id,
          "salaryId": defDateStr,
          "employeeStatus": userDetail?.employeeStatus,
        },
      });
      return {
        loginUserId: userDetail.id,
        selectEmployeeStatus: userDetail?.employeeStatus,
      };
    }
  }


  /**
   * 获取薪资详情
   */
  getSalaryDetail = () => {
    const { dispatch, userDetail } = this.props;
    const { defDateStr } = this.state;
    dispatch({
      type: 'Salary/getSalaryDetail',
      payload: { 
        "userId": userDetail?.id,
        "salaryId": defDateStr,
        "employeeStatus": userDetail?.employeeStatus,
      },
    })
    // .then(({ code, msg, data }) => {
    //   this.setState({ isLoadingDetail: false });
    //   if (code === 200){
    //     this.setState({
    //       detailSalary: data || {},
    //       isSalaryLoading : false,
    //     });
    //   }else{
    //     message.error(msg);
    //     this.setState({ detailSalary: {} });
    //   }
    // })
  }
  /**
   * 日期选择弹窗
   */
  clickDataModal = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  }
  /**
   * 账期确认函数
   * @returns 
   */
  onSubmitDate = (dateStr) => {
    this.setState({ defDateStr: dateStr },() => {
      this.getSalaryDetail();
    });
  }
  render () {
    const { userDetail, isSalaryLoading, detailSalary } = this.props;
    const {
      isLoadingUserInfo,
      visible,
      defDateStr,
    } = this.state;
    const roleTypeStr = ROLE_LIST_MAP?.find( i => i.key === userDetail?.roleType)?.name || '-';
    if (isLoadingUserInfo){
      return <div className={style.H5Dom}>
        <Spin className={style.spin} />
      </div>
    }
    return <div className={style.H5Dom}>
        <img className={style.userBg} src={userInfoBG} alt='' />
        <div className={style.userInfo}>
          <div className={style.title}>
              <div className={style.topTitle}>绥德县行政事业单位人员工资</div>
              <div className={style.roleType}>{roleTypeStr}</div>
          </div>
          <div className={style.name}>{`你好 ${userDetail?.realname}`}</div>
          <div className={style.depart}>{userDetail?.departmentName}</div>
        </div>

        <div className={style.salaryInfoSelect}>
          <div>当前显示</div>
          <div className={style.salaryDate} onClick={this.clickDataModal}>
            {defDateStr}
            <span className={style.selectAfter}></span>
          </div>
          <div>月工资</div>
        </div>
        {isSalaryLoading ?
          <div className={style.salaryList}>
            <Spin className={style.spin} />
          </div>
          :
          <>
            <div className={style.salaryList}>
              <div className={style.groupTitle}>
                <div className={style.line} style={{borderBottomColor: 'DarkGreen'}}></div>
                <div className={style.text} style={{backgroundColor: 'DarkGreen'}}>实发工资</div>
              </div>
              <div className={style.countCount} style={{color: 'DarkGreen'}}>
                {
                `${detailSalary?.payment ? detailSalary?.payment + ' 元' : ''}`
                }
              </div>
              <div className={style.groupTitle}>
                <div className={style.line} style={{borderBottomColor: 'Chocolate'}}></div>
                <div className={style.text} style={{backgroundColor: 'Chocolate'}}>工资构成</div>
              </div>
              <div>
                {
                  Object.keys(ADD_SALARY_MAP).map( item => {
                    if (!detailSalary?.[item]){
                      return null;
                    }
                    return (
                      <div className={style.salaryItem} key={item} style={{color:'Chocolate'}}>
                        <div className={style.label}>{ADD_SALARY_MAP[item]}:</div>
                        <div className={style.value}>{detailSalary?.[item]} 元</div>
                      </div>
                    )
                  })
                }
              </div>
              <div className={style.groupTitle}>
                <div className={style.line} style={{borderBottomColor: 'DarkMagenta'}}></div>
                <div className={style.text} style={{backgroundColor: 'DarkMagenta'}}>代扣项目</div>
              </div>
              <div>
                {
                  Object.keys(REDUCE_SALARY_MAP).map( item => {
                    if (!detailSalary?.[item]){
                      return null;
                    }
                    return (
                      <div className={style.salaryItem} key={item} style={{color:'DarkMagenta'}}>
                        <div className={style.label}>{REDUCE_SALARY_MAP[item]}:</div>
                        <div className={style.value}>{detailSalary?.[item]} 元</div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </>
        }
        
        <DateModal
          visible={visible}
          value={defDateStr}
          onSubmit={this.onSubmitDate} 
          onCancle={this.clickDataModal}
        />
    </div>
  }
}

const mapStateToProps = (state) =>({
  userDetail: state.Users.userDetail || {},
  isLoadingDetail: state.Users.isLoadingDetail || false,
  isSalaryLoading: state.Salary.isSalaryLoading || false,
  detailSalary: state.Salary.detailSalary || {},
})
export default connect(mapStateToProps)(ownSalary)

