import Mock from 'mockjs';

const responseData = () => {
  return Mock.mock({
    'status': 'ok',
    'code': 200,
    'data': {
      'endRow': 0,
      'firstPage': 0,
      'hasNextPage': false,
      'hasPreviousPage': false,
      'isFirstPage': true,
      'isLastPage': true,
      'lastPage': 0,
      'list|10': [
        {
          'id': '@integer(2442343213,4213412412)',
          'realname': '@cname',
          'idNo': '@integer(2442343213,4213412412)',
          'dutyId': '@integer(1, 8)',// 职务/职称
          'highestDegree|1': [1,2,3,4,5,6,7,8],
          'gender|1': [1,2],
          'birthday': '@date("yyyy-MM-dd")',
          'employeeStatus|1': [1,2],
          'employeeType': 1, // 人员身份
          'beginWorkTime': '@date("yyyy-MM-dd")',
          'departmentName': '临时工部门',
          "department":{
            'id':4,
            'name': '临时工部门',
          },
        }
      ],
      'navigateFirstPage': 0,
      'navigateLastPage': 0,
      'navigatePages': 8,
      'navigatepageNums': [],
      'nextPage': 0,
      'pageNum': 1,
      'pageSize': 10,
      'pages': 0,
      'prePage': 0,
      'size': 0,
      'startRow': 0,
      'total': 300,
    }
  })
};
const detailData = {
  code: 200,
  status: 'ok',
  data:{
    id: 1,
    realname: '哈·买买提',
    roleType: 3,
    departmentName: '临时工部门',
    address: '云南省 保山市 施甸县',
    employeeStatus: 2,
  },
};

const userSelectList = () => {
  return Mock.mock({
    'endRow': 1,
    'hasNextPage': false,
    'hasPreviousPage': false,
    'isFirstPage': true,
    'isLastPage': true,
    'list|10': [
      {
        'departmentName': "绥德县一城四创工作领导小组办公室",
        'idNo': "632323190605266400",
        'employeeStatus|1': [1,2],
        'userId': '@integer(2442343213,4213412412)',
        'realname': '@cname',
      }
    ],
    'navigateFirstPage': 1,
    'navigateLastPage': 1,
    'navigatePages': 8,
    'navigatepageNums': [1],
    'nextPage': 0,
    'pageNum': 1,
    'pageSize': 2,
    'pages': 1,
    'prePage': 0,
    'size': 2,
    'startRow': 0,
    'total': 300,
  });
}

export default {
  // 支持值为 Object 和 Array
  // 'GET /api/user/list': responseData,
  'POST /api/employee/v1/page/list': (req, res)=>{
    setTimeout(() => {  //延时
      res.status(200).send(responseData()); //status中输入想要返回的状态码，send中为返回的data
    },800);
  },
  'POST /api/employee/v1/userInfo': (req, res)=>{
    setTimeout(() => {  //延时
      res.status(200).send(detailData); //status中输入想要返回的状态码，send中为返回的data
    },300);
  },
  'POST /api/employee/v1/profile/edit': (req, res)=>{
    setTimeout(() => {  //延时
      res.status(200).send(detailData); //status中输入想要返回的状态码，send中为返回的data
    },300);
  },
  'POST /api/employee/v1/profile/resetpassword': (req, res)=>{
    setTimeout(() => {  //延时
      res.status(200).send({code: 200, msg: '操作成功', data: {}}); //status中输入想要返回的状态码，send中为返回的data
    },300);
  },
  'POST /api/employee/v1/profile/delete': (req, res)=>{
    setTimeout(() => {  //延时
      res.status(200).send({code: 200, msg: '操作成功', data: {}}); //status中输入想要返回的状态码，send中为返回的data
    },300);
  },
  'POST /api/salary/v1/profile/add': (req, res)=>{
    setTimeout(() => {  //延时
      res.status(200).send({code: 200, msg: '操作成功', data: {}}); //status中输入想要返回的状态码，send中为返回的data
    },300);
  },
  'POST /api/employee/v1/simple/list': (req, res) => {
    setTimeout(() => {  //延时
      res.status(200).send({code: 200, msg: '操作成功', data: userSelectList() }); //status中输入想要返回的状态码，send中为返回的data
    },300);

  }
}
