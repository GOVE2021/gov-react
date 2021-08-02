import { connect } from 'dva';
import router from 'umi/router';
import Login from './Login';
import MenuDom from './MenuDom';

import { isLogined } from '@utils/authLocal';
import { menuList } from './menuConfig';
import { isMobile } from './cont';


function BasicLayout(props) {
  const isH5 = isMobile();
  const urlIsH5 = props.location.pathname === '/mobile';// && pathname !== '/mobile'
  
  // h5打开
  if (isH5){
    // 路由不对
    if (!urlIsH5) {
      router.push('/mobile');
      return <></>
    }
    // 是否登陆过
    if (!isLogined()) {
      return <Login />
    } else {
      return (
        <>{props.children}</>
      );
    }
  }
  // pc打开
  if (!isH5){
    const pathUrl = props.location.pathname;
    const menuInfo = menuList?.find( n => n.url === pathUrl) || {};
    const roleKey = JSON.parse(sessionStorage.getItem('login_user_key') || 1)
    const isPermission = menuInfo?.role && (menuInfo?.role || []).includes(roleKey);
    
    // 路由不对 或 权限没有该路由的
    if (urlIsH5 || (!isPermission && pathUrl !=='/')) {
      router.push('/');
      return <></>
    }
    // 是否登陆过
    if (!isLogined()) {
      return <Login />
    } else {
      return (
        <div style={{minHeight: '100vh',background: '#f0f2f5'}}>
          <MenuDom {...props} isMobileStatue />
        </div>
      );
    }
  }
}

const mapStateToProps = state => state.Users;
export default connect(mapStateToProps)(BasicLayout);
