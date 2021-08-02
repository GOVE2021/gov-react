import Mock from 'mockjs';

// const responseData = Mock.mock({
//   'status': 'ok',
//   'code': 200,
//   'data|10':[{
//       '_id|+1': 1,
//       'name': '@cname',
//       'tel': '@integer(15067195657, 18067195657)',
//       'userName': '@email()',
//       'type|1': ['正式', '外包', '临时工', '合作商', '股东'],
//       'createdAt': '@date("yyyy-MM-dd")',
//   }]
// });


const treeData = {
    "departmentName": "绥德县财政局",
    "id": 1,
    "title": "绥德县财政局",
    "value": 1,
    "key": "0",
    "employeeNums": 1,
    "children": [
        {
            "departmentName": "绥德县人民代表大会常务委员会",
            "id": 2,
            "title": "绥德县人民代表大会常务委员会",
            "value": 2,
            "key": "0-0",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "中国人民政治协商会议陕西省绥德县委员会办公室",
            "id": 3,
            "title": "中国人民政治协商会议陕西省绥德县委员会办公室",
            "value": 3,
            "key": "0-1",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县人民检察院",
            "id": 4,
            "title": "绥德县人民检察院",
            "value": 4,
            "key": "0-2",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县人民法院",
            "id": 5,
            "title": "绥德县人民法院",
            "value": 5,
            "key": "0-3",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "中国共产党绥德县纪律检查委员会",
            "id": 6,
            "title": "中国共产党绥德县纪律检查委员会",
            "value": 6,
            "key": "0-4",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "中共绥德县委办公室",
            "id": 7,
            "title": "中共绥德县委办公室",
            "value": 7,
            "key": "0-5",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县档案馆",
            "id": 8,
            "title": "绥德县档案馆",
            "value": 8,
            "key": "0-6",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "中共绥德县委史志研究室",
            "id": 9,
            "key": "0-7",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "中共绥德县委组织部",
            "id": 10,
            "key": "0-8",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县老年大学",
            "id": 11,
            "key": "0-9",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县老干部活动中心",
            "id": 12,
            "key": "0-10",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "中共绥德县委宣传部",
            "id": 13,
            "key": "0-11",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县融媒体中心",
            "id": 14,
            "key": "0-12",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "中共绥德县委统一战线工作部",
            "id": 15,
            "key": "0-13",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "中共绥德县委政法委员会",
            "id": 16,
            "key": "0-14",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "中共绥德县委机构编制委员会办公室",
            "id": 17,
            "key": "0-15",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县事业单位登记管理局",
            "id": 18,
            "key": "0-16",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "中共绥德县委巡察工作办公室",
            "id": 19,
            "key": "0-17",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县总工会",
            "id": 20,
            "key": "0-18",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "中共绥德县委党校",
            "id": 21,
            "key": "0-19",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县人民政府办公室",
            "id": 22,
            "key": "0-20",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县金融风险防范服务中心",
            "id": 23,
            "key": "0-21",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县化解民间融资风险和打击处置非法集资工作领导小组办公室",
            "id": 24,
            "key": "0-22",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县人工影响天气服务中心",
            "id": 25,
            "key": "0-23",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县机关事务中心",
            "id": 26,
            "key": "0-24",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县土地统征储备服务中心",
            "id": 27,
            "key": "0-25",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县发展改革和科技局",
            "id": 28,
            "key": "0-26",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县招商服务中心",
            "id": 29,
            "key": "0-27",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县优化营商环境服务中心",
            "id": 30,
            "key": "0-28",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县价格服务中心",
            "id": 31,
            "key": "0-29",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县粮食质量检验站",
            "id": 32,
            "key": "0-30",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县智慧社会建设中心",
            "id": 33,
            "key": "0-31",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县粮食和物资收储中心",
            "id": 34,
            "key": "0-32",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县教育和体育局",
            "id": 35,
            "key": "0-33",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县招生考试中心",
            "id": 36,
            "key": "0-34",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县教学研究室",
            "id": 37,
            "key": "0-35",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县教育质量评估监测中心",
            "id": 38,
            "key": "0-36",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县体育培训中心",
            "id": 39,
            "key": "0-37",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "榆林市绥德县第九幼儿园",
            "id": 40,
            "key": "0-38",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县中小学后勤服务中心",
            "id": 41,
            "key": "0-39",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县继续教育服务中心",
            "id": 42,
            "key": "0-40",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县电化教育馆",
            "id": 43,
            "key": "0-41",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县职业技术教育中心",
            "id": 44,
            "key": "0-42",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "陕西省榆林市绥德县第十幼儿园",
            "id": 45,
            "key": "0-43",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县中小学生综合实践学校",
            "id": 46,
            "key": "0-44",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县青少年校外活动中心",
            "id": 47,
            "key": "0-45",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县特殊教育学校",
            "id": 48,
            "key": "0-46",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德中学",
            "id": 49,
            "key": "0-47",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县第一中学",
            "id": 50,
            "key": "0-48",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县远竹中学",
            "id": 51,
            "key": "0-49",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德实验中学",
            "id": 52,
            "key": "0-50",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县四十铺中学",
            "id": 53,
            "key": "0-51",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县义合中学",
            "id": 54,
            "key": "0-52",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县吉镇中学",
            "id": 55,
            "key": "0-53",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县崔家湾中学",
            "id": 56,
            "key": "0-54",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县辛店中学",
            "id": 57,
            "key": "0-55",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县张家砭中学",
            "id": 58,
            "key": "0-56",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县第一小学",
            "id": 59,
            "key": "0-57",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县第二小学",
            "id": 60,
            "key": "0-58",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县第三小学",
            "id": 61,
            "key": "0-59",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县第四小学",
            "id": 62,
            "key": "0-60",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县第五小学",
            "id": 63,
            "key": "0-61",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县第六小学",
            "id": 64,
            "key": "0-62",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县逸夫实验小学",
            "id": 65,
            "key": "0-63",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县江德小学",
            "id": 66,
            "key": "0-64",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县明德小学",
            "id": 67,
            "key": "0-65",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县第一幼儿园",
            "id": 68,
            "key": "0-66",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县第二幼儿园",
            "id": 69,
            "key": "0-67",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县第六幼儿园",
            "id": 70,
            "key": "0-68",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县第七幼儿园",
            "id": 71,
            "key": "0-69",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县第八幼儿园",
            "id": 72,
            "key": "0-70",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县郝家桥小学",
            "id": 73,
            "key": "0-71",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县第八小学",
            "id": 74,
            "key": "0-72",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县工业商贸局",
            "id": 75,
            "key": "0-73",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县中小企业发展服务中心",
            "id": 76,
            "key": "0-74",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县公安局",
            "id": 77,
            "key": "0-75",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县公安局",
            "id": 78,
            "key": "0-76",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县公安局交通管理大队",
            "id": 79,
            "key": "0-77",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "陕西省绥德县看守所",
            "id": 80,
            "key": "0-78",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县公安局森林派出所",
            "id": 81,
            "key": "0-79",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县民政局",
            "id": 82,
            "key": "0-80",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县社会救助服务中心",
            "id": 83,
            "key": "0-81",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县养老综合服务中心",
            "id": 84,
            "key": "0-82",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县婚姻登记中心",
            "id": 85,
            "key": "0-83",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县居民最低生活保障中心",
            "id": 86,
            "key": "0-84",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县司法局",
            "id": 87,
            "key": "0-85",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县公证处",
            "id": 88,
            "key": "0-86",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县财政局",
            "id": 89,
            "key": "0-87",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县农业财务所",
            "id": 90,
            "key": "0-88",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县财政内控评价中心",
            "id": 91,
            "key": "0-89",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县农村综合改革服务中心",
            "id": 92,
            "key": "0-90",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县财政资金评审评价中心",
            "id": 93,
            "key": "0-91",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县国库集中支付中心",
            "id": 94,
            "key": "0-92",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县非税收入事务中心",
            "id": 95,
            "key": "0-93",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县政府采购中心",
            "id": 96,
            "key": "0-94",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县财政信息中心",
            "id": 97,
            "key": "0-95",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县政府投资项目审核中心",
            "id": 98,
            "key": "0-96",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县人力资源和社会保障局",
            "id": 99,
            "key": "0-97",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县机关事业单位和居民社会养老保险经办中心",
            "id": 100,
            "key": "0-98",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县职业培训中心",
            "id": 101,
            "key": "0-99",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县人事档案信息中心(绥德县事业单位人员档案室)",
            "id": 102,
            "key": "0-100",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县公共就业创业服务中心",
            "id": 103,
            "key": "0-101",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县劳动人事争议仲裁院",
            "id": 104,
            "key": "0-102",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县劳动监察大队",
            "id": 105,
            "key": "0-103",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县工伤保险经办中心",
            "id": 106,
            "key": "0-104",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县自然资源和规划局",
            "id": 107,
            "key": "0-105",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县自然资源监察大队",
            "id": 108,
            "key": "0-106",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县脱贫攻坚移民搬迁办公室",
            "id": 109,
            "key": "0-107",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县不动产登记服务中心",
            "id": 110,
            "key": "0-108",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县自然资源开发服务中心",
            "id": 111,
            "key": "0-109",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县地质灾害防治站",
            "id": 112,
            "key": "0-110",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县土地统征储备服务中心",
            "id": 113,
            "key": "0-111",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县住房和城乡建设局",
            "id": 114,
            "key": "0-112",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县建设工程质量安全监督站",
            "id": 115,
            "key": "0-113",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县住房保障中心",
            "id": 116,
            "key": "0-114",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县房产交易与征收补偿服务中心",
            "id": 117,
            "key": "0-115",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县物业指导服务中心",
            "id": 118,
            "key": "0-116",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县交通运输局",
            "id": 119,
            "key": "0-117",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县交通运输事业发展服务中心",
            "id": 120,
            "key": "0-118",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县农村公路养护站",
            "id": 121,
            "key": "0-119",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县交通运输综合执法大队",
            "id": 122,
            "key": "0-120",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县城市客运管理办公室",
            "id": 123,
            "key": "0-121",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县农业农村局",
            "id": 124,
            "key": "0-122",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县农业机械化服务中心",
            "id": 125,
            "key": "0-123",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县园艺技术推广站",
            "id": 126,
            "key": "0-124",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县农业机械化学校",
            "id": 127,
            "key": "0-125",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县农业综合执法大队",
            "id": 128,
            "key": "0-126",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县农业技术服务中心",
            "id": 129,
            "key": "0-127",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县农业农村经营服务站",
            "id": 130,
            "key": "0-128",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县种子技术推广站",
            "id": 131,
            "key": "0-129",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县农产品质量检验检测中心",
            "id": 132,
            "key": "0-130",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县乡村振兴服务中心",
            "id": 133,
            "key": "0-131",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县名州区域农牧业综合服务站",
            "id": 134,
            "key": "0-132",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县崔家湾区域农牧业综合服务站",
            "id": 135,
            "key": "0-133",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县满堂川区域农牧业综合服务站",
            "id": 136,
            "key": "0-134",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县张家砭区域农业技术推广站",
            "id": 137,
            "key": "0-135",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县中角区域农牧业综合服务站",
            "id": 138,
            "key": "0-136",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县畜牧兽医服务中心",
            "id": 139,
            "key": "0-137",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县动物卫生监督所",
            "id": 140,
            "key": "0-138",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县动物疫病预防控制中心",
            "id": 141,
            "key": "0-139",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县水利局",
            "id": 142,
            "key": "0-140",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县水土保持重点工程建设中心",
            "id": 143,
            "key": "0-141",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县水旱灾害防治中心",
            "id": 144,
            "key": "0-142",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县水土保持工作站",
            "id": 145,
            "key": "0-143",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县水利水资源服务中心",
            "id": 146,
            "key": "0-144",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县水资源调度中心",
            "id": 147,
            "key": "0-145",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县水土保持监督检查站",
            "id": 148,
            "key": "0-146",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县水利工作队",
            "id": 149,
            "key": "0-147",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县河库服务站",
            "id": 150,
            "key": "0-148",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县二定渠养护站",
            "id": 151,
            "key": "0-149",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县绥惠渠养护站",
            "id": 152,
            "key": "0-150",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县织女渠养护站",
            "id": 153,
            "key": "0-151",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县跃进渠养护站",
            "id": 154,
            "key": "0-152",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县文化和旅游文物广电局",
            "id": 155,
            "key": "0-153",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县名州文化旅游街区建设工作领导小组办公室",
            "id": 156,
            "key": "0-154",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县文化馆",
            "id": 157,
            "key": "0-155",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县子洲图书馆",
            "id": 158,
            "key": "0-156",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县艺术研究院",
            "id": 159,
            "key": "0-157",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县旅游综合服务中心",
            "id": 160,
            "key": "0-158",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县广播电视转播台",
            "id": 161,
            "key": "0-159",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县博物馆",
            "id": 162,
            "key": "0-160",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县革命历史纪念馆",
            "id": 163,
            "key": "0-161",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县文化市场综合执法局",
            "id": 164,
            "key": "0-162",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县卫生健康局",
            "id": 165,
            "key": "0-163",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县疾病预防控制中心",
            "id": 166,
            "key": "0-164",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县妇幼保健计划生育服务中心",
            "id": 167,
            "key": "0-165",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县老龄健康与家庭发展服务中心",
            "id": 168,
            "key": "0-166",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县健康教育与培训中心",
            "id": 169,
            "key": "0-167",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县地方病防治中心",
            "id": 170,
            "key": "0-168",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县卫生学校",
            "id": 171,
            "key": "0-169",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县卫生监督所",
            "id": 172,
            "key": "0-170",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县公共卫生服务中心",
            "id": 173,
            "key": "0-171",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县名州镇卫生院",
            "id": 174,
            "key": "0-172",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县四十铺中心卫生院",
            "id": 175,
            "key": "0-173",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县崔家湾中心卫生院",
            "id": 176,
            "key": "0-174",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县定仙墕镇中心卫生院",
            "id": 177,
            "key": "0-175",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县义合中心卫生院",
            "id": 178,
            "key": "0-176",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县枣林坪中心卫生院",
            "id": 179,
            "key": "0-177",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县吉镇中心卫生院",
            "id": 180,
            "key": "0-178",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县田庄镇中心卫生院",
            "id": 181,
            "key": "0-179",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县名州镇辛店卫生院",
            "id": 182,
            "key": "0-180",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县白家硷镇卫生院",
            "id": 183,
            "key": "0-181",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县薛家峁镇卫生院",
            "id": 184,
            "key": "0-182",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县中角镇卫生院",
            "id": 185,
            "key": "0-183",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县满堂川镇卫生院",
            "id": 186,
            "key": "0-184",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县薛家河镇卫生院",
            "id": 187,
            "key": "0-185",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县张家砭镇卫生院",
            "id": 188,
            "key": "0-186",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县石家湾镇卫生院",
            "id": 189,
            "key": "0-187",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县名州镇艽园沟卫生院",
            "id": 190,
            "key": "0-188",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县健康教育与培训中心",
            "id": 191,
            "key": "0-189",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县退役军人事务局",
            "id": 192,
            "key": "0-190",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县退役军人服务中心",
            "id": 193,
            "key": "0-191",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县应急管理局",
            "id": 194,
            "key": "0-192",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县安全生产监察大队",
            "id": 195,
            "key": "0-193",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县应急救援保障中心",
            "id": 196,
            "key": "0-194",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县审计局",
            "id": 197,
            "key": "0-195",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县市场监督管理局",
            "id": 198,
            "key": "0-196",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县市场监管综合执法大队",
            "id": 199,
            "key": "0-197",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县市场服务中心",
            "id": 200,
            "key": "0-198",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县林业局",
            "id": 201,
            "key": "0-199",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县苗圃",
            "id": 202,
            "key": "0-200",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县林业工作站",
            "id": 203,
            "key": "0-201",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县森林病虫和火灾防治中心",
            "id": 204,
            "key": "0-202",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县林木种苗工作站",
            "id": 205,
            "key": "0-203",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县统计局",
            "id": 206,
            "key": "0-204",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县信访局",
            "id": 207,
            "key": "0-205",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县医疗保障局",
            "id": 208,
            "key": "0-206",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县医疗保险服务中心",
            "id": 209,
            "key": "0-207",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县新型农村合作医疗经办中心",
            "id": 210,
            "key": "0-208",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县药品采购与结算中心",
            "id": 211,
            "key": "0-209",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县扶贫开发办公室",
            "id": 212,
            "key": "0-210",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县城市管理执法局",
            "id": 213,
            "key": "0-211",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县城市管理综合执法大队",
            "id": 214,
            "key": "0-212",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县环境卫生所",
            "id": 215,
            "key": "0-213",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县城区园林站",
            "id": 216,
            "key": "0-214",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县行政审批服务局",
            "id": 217,
            "key": "0-215",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县政务服务中心",
            "id": 218,
            "key": "0-216",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县名州镇人民政府",
            "id": 219,
            "key": "0-217",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县名州镇艽园沟便民服务中心",
            "id": 220,
            "key": "0-218",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县白家硷镇人民政府",
            "id": 221,
            "key": "0-219",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县薛家峁镇人民政府",
            "id": 222,
            "key": "0-220",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县崔家湾镇人民政府",
            "id": 223,
            "key": "0-221",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县定仙墕镇人民政府",
            "id": 224,
            "key": "0-222",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县枣林坪镇人民政府",
            "id": 225,
            "key": "0-223",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县满堂川镇人民政府",
            "id": 226,
            "key": "0-224",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县义合镇人民政府",
            "id": 227,
            "key": "0-225",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县中角镇人民政府",
            "id": 228,
            "key": "0-226",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县四十里铺镇人民政府",
            "id": 229,
            "key": "0-227",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县薛家河镇人民政府",
            "id": 230,
            "key": "0-228",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县吉镇镇人民政府",
            "id": 231,
            "key": "0-229",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县张家砭镇人民政府",
            "id": 232,
            "key": "0-230",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县石家湾镇人民政府",
            "id": 233,
            "key": "0-231",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县田庄镇人民政府",
            "id": 234,
            "key": "0-232",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县计划生育协会",
            "id": 235,
            "key": "0-233",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县科学技术协会",
            "id": 236,
            "key": "0-234",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县文学艺术界联合会",
            "id": 237,
            "key": "0-235",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县妇女联合会",
            "id": 238,
            "key": "0-236",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县工商业联合会",
            "id": 239,
            "key": "0-237",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县残疾人联合会",
            "id": 240,
            "key": "0-238",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "中国共产主义青年团绥德县委员会",
            "id": 241,
            "key": "0-239",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县产业创新园区管理委员会",
            "id": 242,
            "key": "0-240",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县一城四创工作领导小组办公室",
            "id": 243,
            "key": "0-241",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县供销合作社联合社",
            "id": 244,
            "key": "0-242",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "中国人民解放军陕西省榆林军分区",
            "id": 245,
            "key": "0-243",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "国家税务总局绥德县税务局",
            "id": 246,
            "key": "0-244",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "榆林市财政局地方财政库款",
            "id": 247,
            "key": "0-245",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县消防救援大队",
            "id": 248,
            "key": "0-246",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县机关事业单位社会养老保险基金中心养老保险基金支出户",
            "id": 249,
            "key": "0-247",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县财政局城乡居民社会养老保险专户",
            "id": 250,
            "key": "0-248",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县财政局机关事业单位养老保险基金专户",
            "id": 251,
            "key": "0-249",
            "employeeNums": null,
            "children": []
        },
        {
            "departmentName": "绥德县财政局往来资金代管专户",
            "id": 252,
            "key": "0-250",
            "employeeNums": null,
            "children": []
        }
    ]
}

export default {
  // 支持值为 Object 和 Array
  // 'GET /api/user/reset',
  'POST /api/department/v1/page/list': (req, res)=>{
    setTimeout(() => {  //延时
      res.status(200).send({code: 200, data: [treeData], msg: '操作成功'}); //status中输入想要返回的状态码，send中为返回的data
    },800);
  },

  // GET POST 可省略 比如：
//   'POST /api/department/v1/edit': {code: 201, data: {}, msg: '操作成功'},
  'POST /api/department/v1/edit':  (req, res)=>{
    setTimeout(() => {  //延时
      res.status(200).send({code: 201, data: {}, msg: '操作成功'}); //status中输入想要返回的状态码，send中为返回的data
    },800);
  },
  'POST /api/department/v1/add': {code: 202, data: {}, msg: '操作成功'},
  'POST /api/department/v1/delete': {code: 203, data: {}, msg: '操作成功'},
}
