import Mock from 'mockjs';

const responseData = () => {
  // Random.date();
  return Mock.mock({
    'status': 'ok',
    'code': 200,
    'data':{
        'endRow': 0,
        'firstPage': 0,
        'hasNextPage': false,
        'hasPreviousPage': false,
        'isFirstPage': true,
        'isLastPage': true,
        'lastPage': 0,
        'list|20': [
          {
            'censorateAward|50-300.1-2': 1, // 法检绩效奖金
            'coolingAllowance': 200, // 降温费
            'createTime': "2021-08-01T13:34:47.000+0000",
            'creater': 3,
            'department': null,
            'departmentName|1': ["绥德县人民代表大会常务委员会", "绥德县人民检察院", "绥德县机关事务中心", "绥德县政府采购中心"],
            'disabledAllowance|23-99.1-2': 100, // 伤残补助
            'dutySalary': '@integer(2000,2500)', // 职务岗位工资
            'hardshipAllowance|50-300.1-2': 100, // 艰苦边远地区津贴
            'heatingAllowance|150-300.1-2': 100,
            'housingFund': '@integer(1000,2000)',
            'id': '@id',
            'idNo': '@id',
            'inspectAllowance|100-199': 300,
            'levelSalary|23-99.1-2': 500,
            'medicalInsurance|23-99.1-2': 299,
            'normalAward|23-99.1-2': 100,
            'nursesTeachersSalary|23-99.1-2': 1000,
            'occupationalAnnuity|1-99.1-2': 20,
            'oneChildAllowance|1-99.1-2': 500,
            'otherAllowance|1-99.1-2': 9,
            'otherWithhold|1-99.1-2': 290,
            'outstandingAward|1-99.1-2': 87,
            'payment|4000-8999.1-2': 23233,
            'pension|1-99.1-2': 90,
            'performanceAllowance|1-99.1-2': 300,
            'personalTax|1-99.1-2': 200,
            'policeRankAllowance|1-99.1-2': 88,
            'postSalary|1': [3300, 3600, 4500, 3900, 5400, 5500],
            'realname': '@cname',
            'retainedAllowance|1-99.1-2': 200,
            'salaryId': '@date("yyyy-MM")',
            'status': 1,
            'teachingNursingAllowance|1-99.1-2': 550.23,
            'technicalSalary|1-99.1-2': 100,
            'telephone': "",
            'thirdWorkAward|1-99.1-2': 100,
            'townshipAllowance|50-300.1-2': 1,//乡镇津贴
            'traffic|1-99.1-2': 200,
            'updateTime': "2021-08-01T13:34:47.000+0000",
            'updater': 3,
            'userId｜+1': 1,
            'workAllowance|1-99.1-2': 500,
            'yearAward|1-99.1-2': 1000,
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
        'total': '@integer(30,100)',
    }
  })
};

const userSalaryDetail = () => {
  return Mock.mock({
    'censorateAward|50-300.1-2': 1, // 法检绩效奖金
    'coolingAllowance': 200, // 降温费
    'createTime': "2021-08-01T13:34:47.000+0000",
    'creater': 3,
    'department': null,
    'departmentName|1': ["绥德县人民代表大会常务委员会", "绥德县人民检察院", "绥德县机关事务中心", "绥德县政府采购中心"],
    'disabledAllowance|23-99.1-2': 100, // 伤残补助
    'dutySalary': '@integer(2000,2500)', // 职务岗位工资
    'hardshipAllowance|50-300.1-2': 100, // 艰苦边远地区津贴
    'heatingAllowance|150-300.1-2': 100,
    'housingFund': '@integer(1000,2000)',
    'id': '@id',
    'idNo': '@id',
    'inspectAllowance|100-199': 300,
    'levelSalary|23-99.1-2': 500,
    'medicalInsurance|23-99.1-2': 299,
    'normalAward|23-99.1-2': 100,
    'nursesTeachersSalary|23-99.1-2': 1000,
    'occupationalAnnuity|1-99.1-2': 20,
    'oneChildAllowance|1-99.1-2': 500,
    'otherAllowance|1-99.1-2': 9,
    'otherWithhold|1-99.1-2': 290,
    'outstandingAward|1-99.1-2': 87,
    'payment|4000-8999.1-2': 23233,
    'pension|1-99.1-2': 90,
    'performanceAllowance|1-99.1-2': 300,
    'personalTax|1-99.1-2': 200,
    'policeRankAllowance|1-99.1-2': 88,
    'postSalary|1': [3300, 3600, 4500, 3900, 5400, 5500],
    'realname': '@cname',
    'retainedAllowance|1-99.1-2': 200,
    'salaryId': '@date("yyyy-MM")',
    'status': 1,
    'teachingNursingAllowance|1-99.1-2': 550.23,
    'technicalSalary|1-99.1-2': 100,
    'telephone': "",
    'thirdWorkAward|1-99.1-2': 100,
    'townshipAllowance|50-300.1-2': 1,//乡镇津贴
    'traffic|1-99.1-2': 200,
    'updateTime': "2021-08-01T13:34:47.000+0000",
    'updater': 3,
    'userId': 3,
    'workAllowance|1-99.1-2': 500,
    'yearAward|1-99.1-2': 1000,
  })
};

export default {
  // 支持值为 Object 和 Array
  // 'GET /api/user/list': responseData,
  'POST /api/salary/v1/page/list': (req, res)=>{
    setTimeout(() => {  //延时
      res.status(200).send(responseData()); //status中输入想要返回的状态码，send中为返回的data
    },300);
  },
  'POST /api/salary/v1/profile':  (req, res)=>{
    setTimeout(() => {  //延时
      res.status(200).send({ code: 200, msg: 'ok', data: userSalaryDetail() }); //status中输入想要返回的状态码，send中为返回的data
    },500);
  },
  'POST /api/salary/v1/profile/edit': (req, res) => {
    setTimeout(() => {  //延时
      res.status(200).send({ code: 200, msg: '操作成功', data: {} }); //status中输入想要返回的状态码，send中为返回的data
    },1000);
  }
}
