import React,{ Component } from 'react';
import { Input, message } from 'antd';
import { connect } from 'dva';
import md5 from 'blueimp-md5';
import router from 'umi/router';
import { logOut } from '@utils/authLocal';

import style from './index.css';


class DataModal extends Component {
  constructor (props){
    super(props);
    this.state = { 
      oldPsd: '',
      firstPsd: '',
      secondPsd: '',
      showEditPds: false,
      editLoading: false,
    }
  }
  /**
   * 退出账号
   */
   logOut = () => {
    this.setState({editVisible: true});
    logOut();
    router.replace('/');
  }

  onBtnCancle = (e) => {
    this.setState({
      oldPsd: '',
      firstPsd: '',
      secondPsd: '',
      showEditPds: false,
    });
    this.props.onCancle();
    e.stopPropagation();
  }

  /**
   * 确认修改的密码变化时
   * @param {string} e 
   * @param {string} type 
   */
  newPsdChange = (e,type) => {
    const psd = e?.target?.value || '';
    if (type === 'first'){
      this.setState({ firstPsd: psd});
    }else{
      this.setState({ secondPsd: psd});
    }
  }
  /**
   * 打开修改密码
   * @returns 
   */
  editPsd = (e) => {
     this.setState({showEditPds: true});
     e.stopPropagation();
   }
  /**
   * 提交修改密码
   */
  handleOk = (e) => {
    // 130102199003073730
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
          this.logOut();
        },1000)
      }else{
        message.error(msg);
      }
    });
    e.stopPropagation();
  }
  render () {
    const { visible } = this.props;
    const { oldPsd, firstPsd, secondPsd, showEditPds, editLoading } = this.state;
    if (!visible){
      return null;
    }
    return <div className={style.modalDom} onClick={this.onBtnCancle}>
      <div className={style.bottorBar} onClick={e => e.stopPropagation()}>
        {
          showEditPds ? 
            <>
              <div className={style.title}>修改密码</div>
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
              <div 
                className={style.submitPSD}
                style={editLoading ? {backgroundColor: 'gainsboro'}: {}}
                onClick={e => this.handleOk(e)}
              >
                保存修改
              </div>
          </>
          :
          <>
            <div className={style.bottomDom} style={{color: 'red'}} onClick={e => this.editPsd(e)}>修改密码</div>
            <div className={style.bottomDom} onClick={e => this.logOut()}>退出登陆</div>
          </>
        }
      </div>
    </div>
  }
}

export default connect()(DataModal)

