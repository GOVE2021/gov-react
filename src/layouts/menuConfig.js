

export const menuList = [
  {
    name: '首页', //'首页',
    icon: 'home',
    url: '/',
    role: [1, 2, 3],
  },{
    name: '用户管理', //'用户管理',
    icon: 'user',
    url: '/users',
    role: [2, 3],
  },{
    name: '薪资档案管理', //'薪资档案管理',
    icon: 'money-collect',
    url: '/salary',
    role: [1, 2, 3],
  },{
    name: '部门管理', //部门管理',
    icon: 'apartment',
    url: '/department',
    role: [2, 3],
  },{
    name: '角色管理', //角色管理',
    icon: 'usergroup-add',
    url: '/role',
    role: [2, 3],
    // subMuen: [
    //   {
    //     name: '角色列表',
    //     url: '/role'
    //   },
    // ]
  },
]
