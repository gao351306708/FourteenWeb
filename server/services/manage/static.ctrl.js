/**
 * @desc 管理员管理统计模块
 * @dateTime 2020-12-9
 **/

var express = require('express');
const {
  InterviewModel
} = require('../../database/manage/static.db.js');
const {
  BlogModel
} = require('../../database/manage/blog.db.js');
const staticRouter = express.Router();


/*
 * 查询访问记录
 * */
staticRouter.get('/interviewQuery', async (req, res) => {
  let count = await InterviewModel.count({});
  let count2 = await BlogModel.count({});
  console.log("count:", count, count2)
  res.json({
    code: 200,
    data: {
      interviewNum: count || 0,
      blogNum: count2 || 0
    }
  });
})
// 更新访问数
staticRouter.post('/updateInterview', function (req, res, next) {
  let params = req.body;
  let manageModel1 = new InterviewModel({
    name: params.name || "door",
    datetime: new Date().getTime()
  })
  manageModel1.save(function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: err.message
      });
    } else {
      res.json({
        code: 200,
        message: "访问数更新成功",
        data: doc
      });
    }
  })
});
module.exports = staticRouter;
