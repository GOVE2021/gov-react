import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { connect } from 'dva';
import { menuList } from './menuConfig';
import { logOut } from '@utils/authLocal';
import router from 'umi/router';
import userIcon from '@assets/userIcon.svg';

import styles from './index.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class MenuDom extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'Users/getDetail',
      payload: {},
    });
  }
  renderLogOut = () => {
    return <Menu>
      <Menu.Item>
      <div 
        className={styles.logOut}
        onClick={() => {
          logOut();
          router.replace('/');
        }
      }>退出登陆</div>
      </Menu.Item>
    </Menu>
  }
  render() {
    const {children, userDetail, location } = this.props;
    const selectKey = menuList.findIndex( m => m.url === location.pathname );
    return (
      <div>
        <Header className={styles.header} style={{ position: 'fixed', zIndex:2, width: '100%' }}>
          <div className={styles.logo}>绥德县行政事业单位人员工资查询系统</div>
          <Dropdown overlay={this.renderLogOut()} trigger={['hover']} placement='bottomCenter' overlayClassName={styles.logOutDrop}>
            <div className={styles.btnBox} onClick={e => e.preventDefault()}>
              <img src={userIcon} alt=''/>
              {userDetail?.realname || '-'}
              <Icon type="down" />
            </div>
          </Dropdown>
        </Header>
        <Layout style={{paddingTop: 64}}>
          <Sider
            className={styles.lefBar}
            theme="dark"
            width={180}
          >
            {/* <div className="logo" /> */}
            <Menu theme="dark" mode="inline" selectedKeys={[selectKey.toString()]}>
                {menuList.map((k, i) => {
                  if(!k.role.includes(userDetail?.roleType)){
                    return null;
                  }
                  if (k?.subMuen?.length){
                    return (
                      <SubMenu 
                        key="sub3" 
                        title={
                          <>
                            <Icon type={k.icon} />
                            <span>{k.name}</span>
                          </>
                        }>
                        {k.subMuen.map((s,j) => {
                          return (
                            <Menu.Item
                              key={`${i}-${j}`}
                              onClick={() => {
                                router.replace(s.url);
                              }}
                            >
                              {s.name}
                            </Menu.Item>
                          )
                        })}
                        </SubMenu>
                    )
                  }
                  return (
                    <Menu.Item key={i} onClick={() => { router.replace(k.url); }}>
                      <Icon type={k.icon} />
                      <span>{k.name}</span>
                    </Menu.Item>
                  )
                })}
              </Menu>
          </Sider>
          <Layout className={styles.contentLayout}>
            <Content style={{ background:'#FFF'}}>
              <div className={styles.content}>{children}</div>
            </Content>
            {/* <Footer
              style={{ 
                textAlign: 'center',
                position:'absolute',
                bottom: -5,
                left: '50%',
                transform: 'translate(-50%,0%)',
                width:'100%',
                background: '#FFF',
              }}
            >Gov ©2021</Footer> */}
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  userDetail: state.Users.userDetail || {},
})
export default connect(mapStateToProps)(MenuDom);