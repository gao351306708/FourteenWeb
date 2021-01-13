/**
 * 从属类型
 * **/
const dependenceMap = new Map();
dependenceMap.set(1, {
  label: "前端",
  value: 1
})
dependenceMap.set(2, {
  label: "服务端",
  value: 2
})
dependenceMap.set(3, {
  label: "数据库",
  value: 3
})
dependenceMap.set(4, {
  label: "其他",
  value: 4
})

const dependenceList = [{
    label: "前端",
    value: 1
  },
  {
    label: "服务端",
    value: 2
  },
  {
    label: "数据库",
    value: 3
  },
  {
    label: "其他",
    value: 4
  }
]

export default {
  dependenceMap,
  dependenceList
}
