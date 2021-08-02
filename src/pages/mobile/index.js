import React,{ Component } from 'react';
import { connect } from 'dva';
import { Spin, message } from 'antd';
import moment from 'moment';
import { ROLE_LIST_MAP } from '../utils';
import DateModal from './DataModals';
import userInfoBG from '@assets/mobileBg.jpeg';

import style from './index.css';

class ownSalary extends Component {
  constructor (props){
    super(props);
    this.state = {
      isLoadingUserInfo: true,
      visible: false,
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
  clickDataModal =() => {
    this.setState({ visible: true });
  }
  render () {
    const { userDetail } = this.props;
    const { isLoadingUserInfo, visible, defDateStr } = this.state;
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

        <div className={style.salaryInfo}>
          <div>当前显示</div>
          <div className={style.salaryDate} onClick={this.clickDataModal}>
            {defDateStr}
            <span className={style.selectAfter}></span>
          </div>
          <div>月工资</div>
        </div>
        <DateModal
          visible={visible}
          value={defDateStr}
          onSubmit={(dateStr) => {
            this.setState({ defDateStr: dateStr });
          }} 
          onCancle={() => {
            this.setState({ visible: false });
          }}
        />
    </div>
  }
}

const mapStateToProps = (state) =>({
  userDetail: state.Users.userDetail || {},
})
export default connect(mapStateToProps)(ownSalary)

