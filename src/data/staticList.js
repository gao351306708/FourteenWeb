/**
 * 从属类型
 * **/
const dependenceMap = new Map();
dependenceMap.set("startFont", {
  label: "前端",
  value: "startFont"
})
dependenceMap.set("endFont", {
  label: "服务端",
  value: "endFont"
})
dependenceMap.set("oracle", {
  label: "数据库",
  value: "oracle"
})
dependenceMap.set("other", {
  label: "其他",
  value: "other"
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
