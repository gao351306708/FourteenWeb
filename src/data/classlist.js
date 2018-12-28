/**
 * 静态数据
 * Created by gaoju on 2018/11/8.
 */
const classData = {
  classList:{
    courseId:"",
    teacherId:"",
    teacherName:"",
    subjectId:"",
    subjectName:"",
    name:"",
    datetime: "",
    target: "",
    commits: "",
    studentGroup:{
      groupArray:[],//创建的组
      nowGroup:['学生列表','默认组'],//当前正在修改的组
      nowList:[],//当前正在修改的组的数据
      nowStudentData:[],
      groups:[]
    },
    source: [
    ],
    otherSource:[],
  },
  studentList:[
    {
    id:"00201",
    name:"学生1",
    pass:"123456",
    key:"1",
  },{
    id:"00202",
    name:"栗战书",
    pass:"123456",
    key:"2",
  },{
    id:"00203",
    name:"邵伟思",
    pass:"123456",
    key:"3",
  },{
    id:"00204",
    name:"濠江",
    pass:"123456",
    key:"4",
  },{
    id:"00205",
    name:"刘上传",
    pass:"123456",
    key:"5",
  },{
    id:"00206",
    name:"五七",
    pass:"123456",
    key:"6",
  },{
    id:"00207",
    name:"皇上",
    pass:"123456",
    key:"7",
  },{
    id:"00208",
    name:"三小",
    pass:"123456",
    key:"8",
  },{
    id:"00209",
    name:"王麻子",
    pass:"123456",
    key:"9",
  },{
    id:"002010",
    name:"李四",
    pass:"123456",
    key:"10",
  },{
    id:"002011",
    name:"张三",
    pass:"123456",
    key:"11",
  },],
  teacherList:[
    {
      id:"002011",
      name:"admin",
      pass:"123456",
      key:"1",
    }
  ]
}

export default classData
