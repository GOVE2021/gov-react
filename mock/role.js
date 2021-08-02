import Mock from 'mockjs';

const responseData = (num) => {
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
          'userId|+1': 1,
          'realname': '@cname',
          'idNo': '@id()',
          'departmentName|1': ['绥德县人民法院','中共绥德县委史志研究室', '中国共产党绥德县纪律检查委员会', '中国人民政治协商会议陕西省绥德县委员会办公室'],
          'roleId|1': [1,2,3],
          'departments': [
            {
              "id": 2,
              "name": "绥德县人民法院"
            },
            {
              "id": 3,
              "name": "中共绥德县委史志研究室"
            },
            {
              "id": 4,
              "name": "中国共产党绥德县纪律检查委员会"
            }

          ],
        },
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
    name: '哈哈哈·买买提',
    role: 1,
    department: '临时工部门',
    address: '云南省 保山市 施甸县',
  },
};

export default {
  // 支持值为 Object 和 Array
  // 'GET /api/user/list': responseData,
  'POST /api/auth/v1/list': (req, res)=>{
    setTimeout(() => {  //延时
      res.status(200).send(responseData(10)); //status中输入想要返回的状态码，send中为返回的data
    },800);
  },
  'POST /api/auth/v1/edit': detailData,
}
