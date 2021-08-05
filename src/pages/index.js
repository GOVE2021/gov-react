import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, Modal, Input, message } from 'antd';
import md5 from 'blueimp-md5';
import { logOut } from '@utils/authLocal';
import router from 'umi/router';
import { USER_KEY_MAP, ROLE_LIST_MAP, PERSON_TYPE_LIST } from './utils';

import style from './index.css';

class department extends Component {
  constructor (props){
    super(props);
    this.state = {
      visible: false,
      oldPsd: '',
      firstPsd: '',
      secondPsd: '',
    }
  }
  componentDidMount () {
    this.props.dispatch({
      type: 'Users/getDetail',
      payload: {},
    });
  }
  /**
   * 提交修改密码
   */
  handleOk = () => {
    const {
      oldPsd,
      firstPsd,
      secondPsd,
    } = this.state;
    if (firstPsd !== secondPsd) {
      message.error('两次密码不一致');
      return null
    }
    this.props.dispatch({
      type: 'Users/updatePsd',
      payload: {
        password: md5(oldPsd),
        newPassword1: md5(firstPsd),
        newPassword2: md5(secondPsd),
      }
    }).then(({ code, msg }) => {
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
  render () {
    const { userDetail } = this.props;
    const {
      visible,
      oldPsd,
      firstPsd,
      secondPsd,
    } = this.state;
    return <>
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
      
      <Modal
          title={`修改密码`}
          visible={visible}
          maskClosable={false}
          closable={false}
          okText={'确认'}
          cancelText={'取消'}
          onOk={this.handleOk}
          onCancel={() => {this.setState({ visible: false })}}
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
})
export default connect(mapStateToProps)(department)

