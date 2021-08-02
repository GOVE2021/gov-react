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
            censorateAward: 1,
            coolingAllowance: 200,
            createTime: "2021-08-01T13:34:47.000+0000",
            creater: 3,
            department: null,
            departmentName: "绥德县人民代表大会常务委员会",
            disabledAllowance: 0,
            dutySalary: 5000,
            hardshipAllowance: 888,
            heatingAllowance: 300,
            housingFund: 600,
            id: 1,
            idNo: "63232319060526988X",
            inspectAllowance: 300,
            levelSalary: 500,
            medicalInsurance: 299,
            normalAward: 100,
            nursesTeachersSalary: 1000,
            occupationalAnnuity: 20,
            oneChildAllowance: 500,
            otherAllowance: 9,
            otherWithhold: 290,
            outstandingAward: 87,
            payment: 23233,
            pension: 90,
            performanceAllowance: 300,
            personalTax: 200,
            policeRankAllowance: 88.92,
            postSalary: 99,
            realname: "李四",
            retainedAllowance: 200,
            salaryId: "2021-07",
            status: 1,
            teachingNursingAllowance: 550.23,
            technicalSalary: 100,
            telephone: "",
            thirdWorkAward: 0,
            townshipAllowance: 232,
            traffic: 200,
            updateTime: "2021-08-01T13:34:47.000+0000",
            updater: 3,
            userId: 3,
            workAllowance: 500,
            yearAward: 1000,
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


 /**
  * 护士和教师提高10%
  * nursesTeachersSalary;
  */
 /**
  * 岗位津贴
  * dutyAllowance;
  */
 /**
  * 教护龄津贴
  * teachingNursingAllowance;
  */
 

 
 const detailData = {
  code: 200,
  statues: 'ok',
  data: {
    add: {
      dutySalary: 2000, // 职务岗位工资
      levelSalary: 230, // 级别技术等级工资
      positionSalary: 600, // 薪级工资
      subSalary: 130, // 艰苦边缘津贴
      citySalary: 354, // 乡镇补贴
      subSalary1: 245, // 保留的津补贴
      sizeSalary: 875, // 岗位工资
      policeLevelSalary: 279, // 警衔津贴
      subSalary2: 200, // 津补贴
      subSalary3: 500, // 提前离岗补贴
      tripSalary2: 800, // 交通费
    },
    delete: {
      baseSalary: 200, // 基本养老金
      workSalary: 200, // 职业年金
      homeSalary: 200, // 住房公积金
      personSalary: 200, // 个税
    }
  }
}
export default {
  // 支持值为 Object 和 Array
  // 'GET /api/user/list': responseData,
  'POST /api/salary/v1/page/list': (req, res)=>{
    setTimeout(() => {  //延时
      res.status(200).send(responseData()); //status中输入想要返回的状态码，send中为返回的data
    },300);
  },
  'POST /api/salary/detail':  (req, res)=>{
    setTimeout(() => {  //延时
      res.status(200).send(detailData); //status中输入想要返回的状态码，send中为返回的data
    },1000);
  },
}
